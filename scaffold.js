#!/usr/bin/env node
'use strict';

const fs   = require('fs');
const path = require('path');

const ROOT        = __dirname;
const ITEM_DIRS   = ['flows', 'snippets'];
const NON_SERVICE = new Set(['scaffold.js', 'README.md', 'package.json']);

const c = {
  green:  s => `\x1b[32m${s}\x1b[0m`,
  orange: s => `\x1b[33m${s}\x1b[0m`,
  red:    s => `\x1b[31m${s}\x1b[0m`,
  dim:    s => `\x1b[2m${s}\x1b[0m`,
};

// ─── Schema ──────────────────────────────────────────────────────────────────

const SLUG_RE   = /^[a-z0-9]+(-[a-z0-9]+)*$/;
const JS_IDENT  = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/;

const s = {
  string: (opts = {}) => ({ _type: 'string', _optional: !!opts.optional }),
  slug:   (opts = {}) => ({ _type: 'slug',   _optional: !!opts.optional }),
  object: (props, opts = {}) => ({ _type: 'object', _props: props, _optional: !!opts.optional }),
};

const METADATA_SCHEMA = s.object({
  namespace: s.slug(),
  icon:      s.string(),
  author: s.object({
    name:     s.string(),
    homepage: s.string({ optional: true }),
  }, { optional: true }),
});

function checkSchema(value, schema, base = '') {
  const errors = [];
  for (const [key, rule] of Object.entries(schema._props)) {
    const loc = base ? `${base}.${key}` : key;
    const val = value?.[key];

    if (val == null) {
      if (!rule._optional) errors.push(`missing required field: "${loc}"`);
      continue;
    }

    if (rule._type === 'string') {
      if (typeof val !== 'string') errors.push(`"${loc}" must be a string (got: ${typeof val})`);
      else if (!val.trim())        errors.push(`"${loc}" must not be empty`);
    } else if (rule._type === 'slug') {
      if (typeof val !== 'string')   errors.push(`"${loc}" must be a string (got: ${typeof val})`);
      else if (!val.trim())          errors.push(`"${loc}" must not be empty`);
      else if (!SLUG_RE.test(val))   errors.push(`"${loc}" must be a kebab-case slug (lowercase, digits, hyphens only, e.g. "my-service") got: "${val}"`);
    } else if (rule._type === 'object') {
      if (typeof val !== 'object' || Array.isArray(val)) errors.push(`"${loc}" must be an object`);
      else errors.push(...checkSchema(val, rule, loc));
    }
  }
  return errors;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function firstComment(filePath) {
  const first = fs.readFileSync(filePath, 'utf8').split('\n')[0].trim();
  if (!first.startsWith('//')) return null;
  const label = first.slice(2).trim();
  if (!label || label.toUpperCase().startsWith('TODO')) return null;
  return label;
}

const PNG_SIG       = [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a];
const ICON_MIN      = 128;
const ICON_MAX      = 512;

function readPngDimensions(filePath) {
  try {
    const buf = Buffer.alloc(24);
    const fd  = fs.openSync(filePath, 'r');
    fs.readSync(fd, buf, 0, 24, 0);
    fs.closeSync(fd);
    if (!PNG_SIG.every((b, i) => buf[i] === b)) return null;
    return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) };
  } catch {
    return null;
  }
}

function isDir(p) {
  return fs.existsSync(p) && fs.statSync(p).isDirectory();
}

function jsFiles(dir) {
  return isDir(dir)
    ? fs.readdirSync(dir).filter(f => f.endsWith('.js'))
    : [];
}

// ─── Validate ────────────────────────────────────────────────────────────────

function validateService(name) {
  const dir      = path.join(ROOT, name);
  const errors   = [];
  const warnings = [];

  const metaPath = path.join(dir, 'metadata.json');
  if (!fs.existsSync(metaPath)) {
    errors.push('missing metadata.json');
  } else {
    let meta;
    try { meta = JSON.parse(fs.readFileSync(metaPath, 'utf8')); }
    catch { errors.push('metadata.json: invalid JSON'); }
    if (meta) errors.push(...checkSchema(meta, METADATA_SCHEMA));
  }

  const iconPath = path.join(dir, 'icon.png');
  if (!fs.existsSync(iconPath)) {
    errors.push('icon.png missing (required for the store)');
  } else {
    const dim = readPngDimensions(iconPath);
    if (!dim) {
      errors.push('icon.png: not a valid PNG file');
    } else if (dim.width !== dim.height) {
      errors.push(`icon.png: must be square (got ${dim.width}x${dim.height})`);
    } else if (dim.width < ICON_MIN || dim.width > ICON_MAX) {
      errors.push(`icon.png: size must be between ${ICON_MIN}x${ICON_MIN} and ${ICON_MAX}x${ICON_MAX} (got ${dim.width}x${dim.height})`);
    }
  }

  for (const sub of ITEM_DIRS) {
    const subDir = path.join(dir, sub);
    if (!isDir(subDir)) continue;

    for (const file of jsFiles(subDir)) {
      const ref = file.slice(0, -3);
      if (!JS_IDENT.test(ref))
        errors.push(`${sub}/${file}: filename must be a valid JS identifier (no hyphens or spaces, e.g. "myFlow")`);

      const label = firstComment(path.join(subDir, file));
      if (!label)
        errors.push(`${sub}/${file}: first line must be a non-empty comment (// label of the flow/snippet)`);
    }
  }

  const hasItems = ITEM_DIRS.some(sub => jsFiles(path.join(dir, sub)).length > 0);
  if (!hasItems)
    warnings.push('no flows or snippets found. Add at least one .js file in flows/ or snippets/');

  return { errors, warnings };
}

function runValidate() {
  const services = fs.readdirSync(ROOT)
    .filter(f => !NON_SERVICE.has(f) && isDir(path.join(ROOT, f)));

  if (services.length === 0) {
    console.log('No services found in library/.');
    process.exit(0);
  }

  let totalErrors = 0;

  for (const name of services) {
    const { errors, warnings } = validateService(name);

    if (errors.length === 0 && warnings.length === 0) {
      const counts = ITEM_DIRS.map(sub => {
        const n = jsFiles(path.join(ROOT, name, sub)).length;
        return n ? `${n} ${sub.slice(0, -1)}${n > 1 ? 's' : ''}` : null;
      }).filter(Boolean).join(', ');
      console.log(`${c.green('✓')}  ${name}  ${c.dim(`(${counts || 'empty'})`)}`);
    } else {
      console.log(`${errors.length > 0 ? c.red('Package ' + name) : c.orange('Package ' + name)}`);
      for (const e of errors)   console.log(`  ${c.red('❌')} ${e}`);
      for (const w of warnings) console.log(`  ${c.orange('⚠️ ')} ${w}`);
      totalErrors += errors.length;
    }
  }

  console.log(
    totalErrors > 0
      ? c.red(`\n${totalErrors} error(s). Fix them before merging the PR.\n`)
      : c.green('\nAll good.\n')
  );
  process.exit(totalErrors > 0 ? 1 : 0);
}

// ─── Scaffold ────────────────────────────────────────────────────────────────

function kebab(name) { return SLUG_RE.test(name); }

function newService(name) {
  if (!name)         { console.error('Usage: node scaffold.js new service <name>'); process.exit(1); }
  if (!kebab(name))  { console.error('Name must be kebab-case.'); process.exit(1); }
  const dir = path.join(ROOT, name);
  if (fs.existsSync(dir)) { console.error(`"${name}" already exists.`); process.exit(1); }

  fs.mkdirSync(path.join(dir, 'flows'),    { recursive: true });
  fs.mkdirSync(path.join(dir, 'snippets'), { recursive: true });
  fs.writeFileSync(path.join(dir, 'metadata.json'),
    JSON.stringify({ namespace: name, icon: 'icon.png' }, null, 2) + '\n');

  console.log(`${c.green('✓')}  ${name}/ created`);
  console.log(c.dim('   → Add icon.png (128×128 px)'));
  console.log(c.dim(`   → npm run new:flow ${name} <reference>`));
}

function newItem(type, service, reference) {
  if (!reference) {
    console.error(`Usage: node scaffold.js new ${type} <service> <reference>`);
    process.exit(1);
  }
  if (!JS_IDENT.test(reference)) { console.error('Reference must be a valid JS identifier (no hyphens or spaces, e.g. "myFlow").'); process.exit(1); }

  const sub  = type === 'flow' ? 'flows' : 'snippets';
  const dir  = path.join(ROOT, service, sub);
  const file = path.join(dir, `${reference}.js`);

  if (!isDir(path.join(ROOT, service))) {
    console.error(`Service "${service}" not found. Create it first: npm run new:service ${service}`);
    process.exit(1);
  }
  if (!isDir(dir)) fs.mkdirSync(dir, { recursive: true });
  if (fs.existsSync(file)) { console.error(`"${reference}.js" already exists in ${service}/${sub}/`); process.exit(1); }

  const template = type === 'flow'
    ? `// TODO: describe what this flow does\nasync function run($page, $input) {\n  // ...\n  return $generateResponseSuccess('Done', {});\n}\n`
    : `// TODO: describe what this snippet does\nreturn {\n  // ...\n};\n`;

  fs.writeFileSync(file, template);
  console.log(`${c.green('✓')}  ${service}/${sub}/${reference}.js created`);
  console.log(c.dim('   → Replace the TODO comment with a real description (it becomes the label)'));
}

// ─── CLI ─────────────────────────────────────────────────────────────────────

const [,, cmd, ...rest] = process.argv;

if (!cmd || cmd === 'validate') {
  runValidate();
} else if (cmd === 'new') {
  const [type, ...args] = rest;
  if (type === 'service')      newService(args[0]);
  else if (type === 'flow')    newItem('flow',    args[0], args[1]);
  else if (type === 'snippet') newItem('snippet', args[0], args[1]);
  else {
    console.error('Usage: node scaffold.js new <service|flow|snippet> ...');
    process.exit(1);
  }
} else {
  console.error(`Unknown command: "${cmd}"`);
  console.error('Usage: node scaffold.js [validate]');
  console.error('       node scaffold.js new service <name>');
  console.error('       node scaffold.js new flow    <service> <reference>');
  console.error('       node scaffold.js new snippet <service> <reference>');
  process.exit(1);
}

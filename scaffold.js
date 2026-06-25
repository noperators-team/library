#!/usr/bin/env node
'use strict';

const fs   = require('fs');
const path = require('path');

const ROOT        = __dirname;
const BLUEPRINTS  = path.join(ROOT, 'blueprints');
const ITEM_DIRS   = ['flows', 'snippets'];

const c = {
  green:  s => `\x1b[32m${s}\x1b[0m`,
  orange: s => `\x1b[33m${s}\x1b[0m`,
  red:    s => `\x1b[31m${s}\x1b[0m`,
  dim:    s => `\x1b[2m${s}\x1b[0m`,
};

// ─── Schema ──────────────────────────────────────────────────────────────────

const NAMESPACE_RE = /^[a-z_][a-z0-9_]*$/;
const JS_IDENT   = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/;
const CATEGORIES = ['auth', 'scraping', 'files', 'notifications', 'data'];
const COLORS     = ['green', 'blue', 'cyan', 'purple', 'pink', 'orange', 'amber', 'slate'];

const s = {
  string: (opts = {}) => ({ _type: 'string', _optional: !!opts.optional }),
  namespace: (opts = {}) => ({ _type: 'namespace', _optional: !!opts.optional }),
  enum:   (values, opts = {}) => ({ _type: 'enum', _values: values, _optional: !!opts.optional }),
  object: (props, opts = {}) => ({ _type: 'object', _props: props, _optional: !!opts.optional }),
};

const METADATA_SCHEMA = s.object({
  title:       s.string(),
  namespace:   s.namespace(),
  description: s.string(),
  category:    s.enum(CATEGORIES),
  color:       s.enum(COLORS, { optional: true }),
  icon:        s.string(),
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
    } else if (rule._type === 'namespace') {
      if (typeof val !== 'string')   errors.push(`"${loc}" must be a string (got: ${typeof val})`);
      else if (!val.trim())          errors.push(`"${loc}" must not be empty`);
      else if (!NAMESPACE_RE.test(val)) errors.push(`"${loc}" must be a variable-style namespace (lowercase letters, digits, underscores, and must not start with a digit, e.g. "my_service") got: "${val}"`);
    } else if (rule._type === 'enum') {
      if (typeof val !== 'string')        errors.push(`"${loc}" must be a string (got: ${typeof val})`);
      else if (!rule._values.includes(val)) errors.push(`"${loc}" must be one of: ${rule._values.join(', ')} (got: "${val}")`);
    } else if (rule._type === 'object') {
      if (typeof val !== 'object' || Array.isArray(val)) errors.push(`"${loc}" must be an object`);
      else errors.push(...checkSchema(val, rule, loc));
    }
  }
  return errors;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function codeHeader(filePath) {
  const lines = fs.readFileSync(filePath, 'utf8').split('\n');
  const first = lines.find(line => line.trim() !== '')?.trim() ?? '';
  const tags = {};

  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed === '') continue;
    if (!trimmed.startsWith('//')) break;

    const match = trimmed.match(/^\/\/\s*@([a-z]+)\s+(.+)$/i);
    if (match) tags[match[1].toLowerCase()] = match[2].trim();
  }

  return { first, tags };
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
  const dir      = path.join(BLUEPRINTS, name);
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

      const header = codeHeader(path.join(subDir, file));
      if (!header.first.startsWith('// @title '))
        errors.push(`${sub}/${file}: first non-empty line must be "// @title <title>"`);
      if (!header.tags.title || header.tags.title.toUpperCase().startsWith('TODO'))
        errors.push(`${sub}/${file}: missing non-empty "// @title <title>" header`);
      if (!header.tags.description || header.tags.description.toUpperCase().startsWith('TODO'))
        errors.push(`${sub}/${file}: missing non-empty "// @description <description>" header`);
    }
  }

  const hasItems = ITEM_DIRS.some(sub => jsFiles(path.join(dir, sub)).length > 0);
  if (!hasItems)
    warnings.push('no flows or snippets found. Add at least one .js file in flows/ or snippets/');

  return { errors, warnings };
}

function runValidate() {
  const services = fs.readdirSync(BLUEPRINTS)
    .filter(f => isDir(path.join(BLUEPRINTS, f)));

  if (services.length === 0) {
    console.log('No blueprints found in library/blueprints/.');
    process.exit(0);
  }

  let totalErrors = 0;

  for (const name of services) {
    const { errors, warnings } = validateService(name);

    if (errors.length === 0 && warnings.length === 0) {
      const counts = ITEM_DIRS.map(sub => {
        const n = jsFiles(path.join(BLUEPRINTS, name, sub)).length;
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

function validNamespace(name) { return NAMESPACE_RE.test(name); }

function newService(name) {
  if (!name)         { console.error('Usage: node scaffold.js new service <name>'); process.exit(1); }
  if (!validNamespace(name))  { console.error('Name must use lowercase letters, digits, and underscores, and must not start with a digit.'); process.exit(1); }
  const dir = path.join(BLUEPRINTS, name);
  if (fs.existsSync(dir)) { console.error(`"${name}" already exists.`); process.exit(1); }

  fs.mkdirSync(path.join(dir, 'flows'),    { recursive: true });
  fs.mkdirSync(path.join(dir, 'snippets'), { recursive: true });
  fs.writeFileSync(path.join(dir, 'metadata.json'),
    JSON.stringify({ title: name, namespace: name, description: `Describe what ${name} provides.`, category: CATEGORIES[0], color: COLORS[0], icon: 'icon.png' }, null, 2) + '\n');

  console.log(`${c.green('✓')}  blueprints/${name}/ created`);
  console.log(c.dim(`   → Set "category" to one of: ${CATEGORIES.join(', ')}`));
  console.log(c.dim(`   → Set "color" to one of: ${COLORS.join(', ')}`));
  console.log(c.dim('   → Add icon.png (128x128 px)'));
  console.log(c.dim(`   → npm run new:flow ${name} <reference>`));
}

function newItem(type, service, reference) {
  if (!reference) {
    console.error(`Usage: node scaffold.js new ${type} <service> <reference>`);
    process.exit(1);
  }
  if (!JS_IDENT.test(reference)) { console.error('Reference must be a valid JS identifier (no hyphens or spaces, e.g. "myFlow").'); process.exit(1); }

  const sub  = type === 'flow' ? 'flows' : 'snippets';
  const dir  = path.join(BLUEPRINTS, service, sub);
  const file = path.join(dir, `${reference}.js`);

  if (!isDir(path.join(BLUEPRINTS, service))) {
    console.error(`Service "${service}" not found. Create it first: npm run new:service ${service}`);
    process.exit(1);
  }
  if (!isDir(dir)) fs.mkdirSync(dir, { recursive: true });
  if (fs.existsSync(file)) { console.error(`"${reference}.js" already exists in ${service}/${sub}/`); process.exit(1); }

  const template = type === 'flow'
    ? `// @title TODO: title of this flow\n// @description TODO: describe what this flow does\nasync function run($page, $input) {\n  // ...\n  return $generateResponseSuccess('Done', {});\n}\n`
    : `// @title TODO: title of this snippet\n// @description TODO: describe what this snippet does\nreturn {\n  // ...\n};\n`;

  fs.writeFileSync(file, template);
  console.log(`${c.green('✓')}  ${service}/${sub}/${reference}.js created`);
  console.log(c.dim('   → Replace @title and @description with real store copy'));
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

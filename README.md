# Library

Public library of Noperators flows and snippets, consumed by the in-app store via GitHub.

## Structure

```
library/
├── scaffold.js
└── blueprints/
    └── [service]/
        ├── metadata.json     # title, namespace, icon, author
        ├── icon.png          # 128×128 px
        ├── flows/
        │   └── [reference].js
        └── snippets/
            └── [reference].js
```

- **Service**: service or domain name (`salesforce`, `gmail`, `linkedin`...)
- **Namespace**: variable-style identifier, lowercase letters, digits, and underscores. It must not start with a digit.
- **Reference**: filename without `.js`, valid JS identifier (e.g. `scrapeProfile`)
- **Title**: `// @title` header in each flow/snippet file
- **Description**: `// @description` header in each flow/snippet file

## metadata.json

```json
{
  "title": "My Service",
  "namespace": "my_service",
  "description": "Short description shown in the store",
  "category": "scraping",
  "color": "green",
  "icon": "icon.png",
  "author": {
    "name": "Your name",
    "homepage": "https://yoursite.com"
  }
}
```

`author` and `color` are optional. `title`, `namespace`, `description`, `category`, and `icon` are required. `namespace` must match `^[a-z_][a-z0-9_]*$`. `category` must be one of: `auth`, `scraping`, `files`, `notifications`, `data`. `color` must be one of: `green`, `blue`, `cyan`, `purple`, `pink`, `orange`, `amber`, `slate`.

## Item headers

Every `.js` file must start with `@title` and include `@description` before the code:

```js
// @title Scrape LinkedIn profile data
// @description Extracts public profile details from a LinkedIn page.
async function run($page, $input) { ... }
```

## Commands

```bash
# Validate the whole library (exit 1 on errors — hook into CI)
npm run validate

# Create a new service
npm run new:service <name>

# Add a flow or snippet to an existing service
npm run new:flow    <service> <reference>
npm run new:snippet <service> <reference>
```

## PR checklist

- [ ] Service name and reference in `kebab-case`
- [ ] `icon.png` provided (128×128 px)
- [ ] First line is a descriptive comment (`// ...`)
- [ ] No credentials or secrets in the code
- [ ] Tested before merge
- [ ] `npm run validate` passes with no errors

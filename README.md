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
- **Reference**: filename without `.js`, valid JS identifier (e.g. `scrapeProfile`)
- **Label**: first comment line of the file (`// My flow`)

## metadata.json

```json
{
  "title": "My Service",
  "namespace": "my-service",
  "description": "Optional short description shown in the store",
  "category": "scraping",
  "icon": "icon.png",
  "author": {
    "name": "Your name",
    "homepage": "https://yoursite.com"
  }
}
```

`description` and `author` are optional. `category` must be one of: `auth`, `scraping`, `files`, `notifications`, `data`.

## Label convention

The **first line** of every `.js` file must be a comment — it becomes the label shown in the store:

```js
// Scrape the LinkedIn profile data
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

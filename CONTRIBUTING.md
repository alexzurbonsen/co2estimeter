# Contributing

## Set Up

### Requirements

The following software is required for working on the repository:

- [node.js](https://nodejs.org/) 22,
- [pnpm](https://pnpm.io/),

This repo was initially created with [sapling](https://git-scm.com/). But you are free to use whatever version control solution you like that is compatible with GitHub.

### Setting up VSCode

#### Sapling

If you want to use sapling in VS Code, you can install the [Sapling Extension](https://marketplace.visualstudio.com/items?itemName=meta.sapling-scm) from Meta.
It helps to add a shortcut to the "Sapling SCM: Open Interactive Smartlog" action which opens Sapling's interactive smartlog.

#### Settings

Add the following entry to your `settings.json` to tell VS Code that comments are allowed in manifest.json

```json
// .vscode/settings.json
{
  "files.associations": {
    "manifest.json": "jsonc"
  }
}
```

### Creating a release

When all PRs are merged:
1. adjust package.json version (and merge)
2. create tag, e.g. `sl push --to tags/v1.0.3`
3. build the extension
4. create release on GH with the tag, upload build artifacts
5. submit on
  * Mozilla Add On platform (https://addons.mozilla.org/de/developers/addon/co2estimeter/edit)
  * Chrome Web Store (https://chrome.google.com/webstore/devconsole/)

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

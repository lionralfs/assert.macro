<div align="center">

# assert.macro [![Babel Macro](https://img.shields.io/badge/babel--macro-%F0%9F%8E%A3-f5da55.svg)](https://github.com/kentcdodds/babel-plugin-macros)

A babel macro to add assertions for development/testing purposes.

</div>

## Installation

This project relies on [babel-plugin-macros](https://github.com/kentcdodds/babel-plugin-macros), you can install both from npm:

```sh
npm install --save-dev assert.macro babel-plugin-macros
```

#### Babel config

In your babel config, add `"macros"` to your plugins:

```json
{
  "plugins": ["macros"]
}
```

## Usage

```js
import assert from 'assert.macro';

class ShoppingCart {
  applyDiscount(discount) {
    assert(discount > 0, "Discount can't be 0 or negative.");
    assert(discount <= 1, "The discount shouldn't make it more expensive.");

    this._total *= discount;
  }
}
```

## Why

- Documents intent
- More explicit than comments
- Able to catch bugs

## Removing it in production

`assert()` is only meant to be used during development. To disable it in production, set either `BABEL_ENV` or `NODE_ENV` to `production`.

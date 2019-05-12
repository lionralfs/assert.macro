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

#### Enabling the assertions

To include the assertions in the babel output, make sure you set the `ENABLE_ASSERTIONS` environment variable to `"true"`. For example:

```sh
ENABLE_ASSERTIONS=true npm run build
```

All usages of of the call to `assert`, including the import will be removed completely, if `ENABLE_ASSERTIONS` is **not** `"true"`.

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

## License

[MIT](LICENSE) © Lion Ralfs

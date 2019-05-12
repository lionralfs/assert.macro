const pluginTester = require('babel-plugin-tester');
const plugin = require('babel-plugin-macros');

pluginTester({
  plugin,
  snapshot: true,
  babelOptions: { filename: __filename },
  pluginName: 'assert.macro - enabled',
  tests: [
    {
      title: 'Remove import if unused',
      code: `import assert from '../dist/assert.macro';`
    },
    {
      title: 'Keep and rewrite import if used',
      code: `
        import assert from '../dist/assert.macro';
        
        function doSomething(val) {
          assert(val > 0, 'Custom error message');
        }
      `
    },
    {
      title: 'Throws if anything other than the default export is used',
      code: `import assert, { nonExistentExport } from '../dist/assert.macro';`,
      error: function(error) {
        return error instanceof MacroError && /only import assert as default/.test(error.message) && /nonExistentExport/.test(error.message);
      }
    }
  ]
});

const pluginTester = require('babel-plugin-tester').default;
const plugin = require('babel-plugin-macros');

pluginTester({
  plugin,
  snapshot: true,
  babelOptions: { filename: __filename },
  pluginName: 'assert.macro - disabled',
  tests: [
    {
      title: 'Remove import if unused',
      code: `import assert from '../dist/assert.macro';`
    },
    {
      title: 'Remove import & references even if used',
      code: `
        import assert from '../dist/assert.macro';
        
        function doSomething(val) {
            assert(val > 0, 'Custom error message');
        }`
    },
    {
      title: 'Throws if anything other than the default export is used',
      code: `import assert, { nonExistentExport } from '../dist/assert.macro';`,
      // don' use a snapshot for this one because the error message includes the absolute file path
      snapshot: false,
      error: function(error) {
        return error instanceof plugin.MacroError && /only import assert as default/.test(error.message) && /nonExistentExport/.test(error.message);
      }
    },
    {
      title: "Doesn't throw if used without condition argument",
      code: `
        import assert from '../dist/assert.macro';

        assert();
      `
    },
    {
      title: "Doesn't throw if not used as a call expression",
      code: `
        import assert from '../dist/assert.macro';

        assert;
      `
    }
  ]
});

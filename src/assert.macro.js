const { createMacro, MacroError } = require('babel-plugin-macros');

module.exports = createMacro(assertMacro, MacroError);

function assertMacro({ references, state, babel }) {
  const { template } = babel;
  const { default: defaultImport = [], ...otherReferences } = references;
  const enabled = process.env.ENABLE_ASSERTIONS === 'true';

  const invalidImports = Object.keys(otherReferences);
  if (invalidImports.length > 0) {
    throw new MacroError(`You should only import assert as default. You are also importing ${invalidImports.join(', ')}.`);
  }

  if (defaultImport.length < 1) {
    return;
  }

  const assertTemplate = template(`const assert = require('assert.macro/impl');`);

  if (enabled) {
    state.file.ast.program.body.unshift(assertTemplate());
  }

  defaultImport.forEach(referencePath => {
    if (referencePath.parentPath.type !== 'CallExpression') {
      throw new MacroError('you must call the macro');
    }

    const args = referencePath.parentPath.get('arguments');
    if (args.length < 1) {
      throw new MacroError(`assert() needs at least 1 argument (the assertion condition).`);
    }

    if (!enabled) {
      referencePath.parentPath.remove();
    }
  });
}

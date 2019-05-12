const { createMacro, MacroError } = require('babel-plugin-macros');

module.exports = createMacro(myMacro, MacroError);

function myMacro({ references, state, babel }) {
  const { template, getEnv } = babel;
  const { default: defaultImport = [], ...otherReferences } = references;
  const isDev = getEnv() !== 'production';

  const invalidImports = Object.keys(otherReferences);
  if (invalidImports.length > 0) {
    throw new MacroError(`You should only import assert as default. You are also importing ${invalidImports.join(', ')}.`);
  }

  const assertTemplate = template(`
    function assert(condition, message) {
      if (!Boolean(condition)) {
        var error = new Error(message || 'Unknown reason');
        error.name = 'AssertionError';
        // error.stack = (error.stack || '').split(/\\n/g).slice(1).join('\\n');
        throw error;
      }
    }
  `);

  if (isDev) {
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

    if (!isDev) {
      referencePath.parentPath.remove();
    }
  });
}

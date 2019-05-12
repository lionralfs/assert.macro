export default function assert(condition, message) {
  if (!Boolean(condition)) {
    var error = new Error(message || 'Unknown reason');
    error.name = 'AssertionError';
    // error.stack = (error.stack || '').split(/\\n/g).slice(1).join('\\n');
    throw error;
  }
}

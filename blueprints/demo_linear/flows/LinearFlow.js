// @title Linear Groomer flow
// @description Classify issues and prepare sprint planning notes.
async function run($page, $input) {
  return $generateResponseSuccess('Linear Groomer completed', {
    namespace: 'demo_linear',
    input: $input,
  });
}

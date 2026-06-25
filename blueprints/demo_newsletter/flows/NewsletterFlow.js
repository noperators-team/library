// @title Newsletter Builder flow
// @description Gather links and draft newsletter sections.
async function run($page, $input) {
  return $generateResponseSuccess('Newsletter Builder completed', {
    namespace: 'demo_newsletter',
    input: $input,
  });
}

// @title Finance Snapshot flow
// @description Collect financial tables and normalize report data.
async function run($page, $input) {
  return $generateResponseSuccess('Finance Snapshot completed', {
    namespace: 'demo_finance',
    input: $input,
  });
}

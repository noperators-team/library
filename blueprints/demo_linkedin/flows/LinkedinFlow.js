// @title LinkedIn Scout flow
// @description Collect public profile data and prepare lead summaries.
async function run($page, $input) {
  return $generateResponseSuccess('LinkedIn Scout completed', {
    namespace: 'demo_linkedin',
    input: $input,
  });
}

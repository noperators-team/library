// @title GitHub Pull Request Review Summary Pack Flow 2
// @description Collect pull request metadata, summarize changed files, identify risky areas, and prepare concise review notes for engineering teams. This variant intentionally has a longer description so the store detail view can be tested with wrapping text, multiple rows, and dense content layouts.
async function run($page, $input) {
  return $generateResponseSuccess('GitHub Pull Request Review Summary Pack Flow 2 completed', {
    namespace: 'demo_github',
    variant: 2,
    input: $input,
  });
}

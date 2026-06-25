// @title GitHub Pull Request Review Summary Pack Flow 1
// @description Collect pull request metadata, summarize changed files, identify risky areas, and prepare concise review notes for engineering teams. Variant 1.
async function run($page, $input) {
  return $generateResponseSuccess('GitHub Pull Request Review Summary Pack Flow 1 completed', {
    namespace: 'demo_github',
    variant: 1,
    input: $input,
  });
}

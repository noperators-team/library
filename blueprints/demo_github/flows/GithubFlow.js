// @title GitHub Reviewer flow
// @description Collect pull request metadata and summarize changes.
async function run($page, $input) {
  return $generateResponseSuccess('GitHub Reviewer completed', {
    namespace: 'demo_github',
    input: $input,
  });
}

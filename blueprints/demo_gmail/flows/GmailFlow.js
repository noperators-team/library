// @title Gmail Assistant flow
// @description Read, classify, and draft replies from Gmail threads.
async function run($page, $input) {
  return $generateResponseSuccess('Gmail Assistant completed', {
    namespace: 'demo_gmail',
    input: $input,
  });
}

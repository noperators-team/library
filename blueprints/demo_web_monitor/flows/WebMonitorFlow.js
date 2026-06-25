// @title Web Monitor flow
// @description Watch public web pages and detect content changes.
async function run($page, $input) {
  return $generateResponseSuccess('Web Monitor completed', {
    namespace: 'demo_web_monitor',
    input: $input,
  });
}

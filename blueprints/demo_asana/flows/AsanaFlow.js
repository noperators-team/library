// @title Asana Reporter flow
// @description Build weekly task summaries from project activity.
async function run($page, $input) {
  return $generateResponseSuccess('Asana Reporter completed', {
    namespace: 'demo_asana',
    input: $input,
  });
}

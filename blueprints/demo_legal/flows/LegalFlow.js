// @title Legal Intake flow
// @description Summarize intake forms and extract key legal entities.
async function run($page, $input) {
  return $generateResponseSuccess('Legal Intake completed', {
    namespace: 'demo_legal',
    input: $input,
  });
}

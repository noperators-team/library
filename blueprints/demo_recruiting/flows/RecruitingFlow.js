// @title Recruiting Pipeline flow
// @description Review candidate pages and build shortlist summaries.
async function run($page, $input) {
  return $generateResponseSuccess('Recruiting Pipeline completed', {
    namespace: 'demo_recruiting',
    input: $input,
  });
}

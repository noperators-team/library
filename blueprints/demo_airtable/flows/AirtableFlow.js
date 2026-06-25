// @title Airtable Sync flow
// @description Sync records between Airtable bases and browser workflows.
async function run($page, $input) {
  return $generateResponseSuccess('Airtable Sync completed', {
    namespace: 'demo_airtable',
    input: $input,
  });
}

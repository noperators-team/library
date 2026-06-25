// @title HubSpot CRM Data Enrichment Suite Flow 2
// @description Enrich contacts and companies using public web sources, normalize lifecycle fields, and create a preview of proposed CRM updates. This variant intentionally has a longer description so the store detail view can be tested with wrapping text, multiple rows, and dense content layouts.
async function run($page, $input) {
  return $generateResponseSuccess('HubSpot CRM Data Enrichment Suite Flow 2 completed', {
    namespace: 'demo_hubspot',
    variant: 2,
    input: $input,
  });
}

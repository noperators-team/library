// @title HubSpot Enrichment flow
// @description Enrich CRM contacts with public website and company data.
async function run($page, $input) {
  return $generateResponseSuccess('HubSpot Enrichment completed', {
    namespace: 'demo_hubspot',
    input: $input,
  });
}

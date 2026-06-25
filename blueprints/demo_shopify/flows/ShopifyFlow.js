// @title Shopify Ops flow
// @description Automate product checks, order lookups, and stock reports.
async function run($page, $input) {
  return $generateResponseSuccess('Shopify Ops completed', {
    namespace: 'demo_shopify',
    input: $input,
  });
}

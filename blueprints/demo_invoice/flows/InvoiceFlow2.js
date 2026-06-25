// @title Invoice Extraction And Vendor Normalization Flow 2
// @description Extract invoice fields from documents and web portals, normalize vendor names, detect totals, and prepare accounting payloads. This variant intentionally has a longer description so the store detail view can be tested with wrapping text, multiple rows, and dense content layouts.
async function run($page, $input) {
  return $generateResponseSuccess('Invoice Extraction And Vendor Normalization Flow 2 completed', {
    namespace: 'demo_invoice',
    variant: 2,
    input: $input,
  });
}

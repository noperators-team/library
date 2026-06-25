// @title Invoice Extraction And Vendor Normalization Flow 1
// @description Extract invoice fields from documents and web portals, normalize vendor names, detect totals, and prepare accounting payloads. Variant 1.
async function run($page, $input) {
  return $generateResponseSuccess('Invoice Extraction And Vendor Normalization Flow 1 completed', {
    namespace: 'demo_invoice',
    variant: 1,
    input: $input,
  });
}

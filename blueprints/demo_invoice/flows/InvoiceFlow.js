// @title Invoice Extractor flow
// @description Extract invoice fields from web pages and documents.
async function run($page, $input) {
  return $generateResponseSuccess('Invoice Extractor completed', {
    namespace: 'demo_invoice',
    input: $input,
  });
}

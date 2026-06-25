// @title Real Estate Listing Watch And Property Highlight Extractor Flow 2
// @description Monitor property listings, extract price changes, summarize amenities, and generate alerts for matching buyer criteria. This variant intentionally has a longer description so the store detail view can be tested with wrapping text, multiple rows, and dense content layouts.
async function run($page, $input) {
  return $generateResponseSuccess('Real Estate Listing Watch And Property Highlight Extractor Flow 2 completed', {
    namespace: 'demo_real_estate',
    variant: 2,
    input: $input,
  });
}

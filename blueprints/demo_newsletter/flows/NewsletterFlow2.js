// @title Newsletter Research Builder With Source Collection Flow 2
// @description Gather links, extract key points, cluster stories by theme, and draft newsletter sections with editorial notes. This variant intentionally has a longer description so the store detail view can be tested with wrapping text, multiple rows, and dense content layouts.
async function run($page, $input) {
  return $generateResponseSuccess('Newsletter Research Builder With Source Collection Flow 2 completed', {
    namespace: 'demo_newsletter',
    variant: 2,
    input: $input,
  });
}

// @title LinkedIn Sales Prospect Research With Long Company Context Flow 4
// @description Collect public profile details, company snippets, recent activity, and role signals to prepare a richer lead summary for outbound sales workflows. This variant intentionally has a longer description so the store detail view can be tested with wrapping text, multiple rows, and dense content layouts.
async function run($page, $input) {
  return $generateResponseSuccess('LinkedIn Sales Prospect Research With Long Company Context Flow 4 completed', {
    namespace: 'demo_linkedin',
    variant: 4,
    input: $input,
  });
}

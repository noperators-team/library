// @title LinkedIn Sales Prospect Research With Long Company Context Flow 1
// @description Collect public profile details, company snippets, recent activity, and role signals to prepare a richer lead summary for outbound sales workflows. Variant 1.
async function run($page, $input) {
  return $generateResponseSuccess('LinkedIn Sales Prospect Research With Long Company Context Flow 1 completed', {
    namespace: 'demo_linkedin',
    variant: 1,
    input: $input,
  });
}

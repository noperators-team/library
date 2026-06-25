// @title Linear Issue Grooming And Sprint Planning Assistant Flow 2
// @description Classify issues, detect duplicates, rewrite vague tickets, and generate sprint planning notes from a backlog of product work. This variant intentionally has a longer description so the store detail view can be tested with wrapping text, multiple rows, and dense content layouts.
async function run($page, $input) {
  return $generateResponseSuccess('Linear Issue Grooming And Sprint Planning Assistant Flow 2 completed', {
    namespace: 'demo_linear',
    variant: 2,
    input: $input,
  });
}

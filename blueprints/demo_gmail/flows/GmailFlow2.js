// @title Gmail Inbox Triage Flow 2
// @description Classify new threads, identify urgent customer requests, draft suggested replies, and extract follow-up tasks from long email conversations. This variant intentionally has a longer description so the store detail view can be tested with wrapping text, multiple rows, and dense content layouts.
async function run($page, $input) {
  return $generateResponseSuccess('Gmail Inbox Triage Flow 2 completed', {
    namespace: 'demo_gmail',
    variant: 2,
    input: $input,
  });
}

// @title Gmail Inbox Triage Flow 1
// @description Classify new threads, identify urgent customer requests, draft suggested replies, and extract follow-up tasks from long email conversations. Variant 1.
async function run($page, $input) {
  return $generateResponseSuccess('Gmail Inbox Triage Flow 1 completed', {
    namespace: 'demo_gmail',
    variant: 1,
    input: $input,
  });
}

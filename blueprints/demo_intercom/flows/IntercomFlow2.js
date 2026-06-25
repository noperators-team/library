// @title Intercom Conversation Triage And Reply Drafting Flow 2
// @description Review support conversations, classify intent and priority, identify missing customer context, and draft concise support replies with next actions. This variant intentionally has a longer description so the store detail view can be tested with wrapping text, multiple rows, and dense content layouts.
async function run($page, $input) {
  return $generateResponseSuccess('Intercom Conversation Triage And Reply Drafting Flow 2 completed', {
    namespace: 'demo_intercom',
    variant: 2,
    input: $input,
  });
}

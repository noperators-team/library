// @title Intercom Conversation Triage And Reply Drafting Flow 1
// @description Review support conversations, classify intent and priority, identify missing customer context, and draft concise support replies with next actions. Variant 1.
async function run($page, $input) {
  return $generateResponseSuccess('Intercom Conversation Triage And Reply Drafting Flow 1 completed', {
    namespace: 'demo_intercom',
    variant: 1,
    input: $input,
  });
}

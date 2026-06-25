// @title Intercom Triage flow
// @description Classify conversations and suggest support replies.
async function run($page, $input) {
  return $generateResponseSuccess('Intercom Triage completed', {
    namespace: 'demo_intercom',
    input: $input,
  });
}

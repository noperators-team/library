// @title Zendesk Helper flow
// @description Summarize tickets and suggest next support actions.
async function run($page, $input) {
  return $generateResponseSuccess('Zendesk Helper completed', {
    namespace: 'demo_zendesk',
    input: $input,
  });
}

// @title Slack Digest flow
// @description Post summaries and alerts into selected Slack channels.
async function run($page, $input) {
  return $generateResponseSuccess('Slack Digest completed', {
    namespace: 'demo_slack',
    input: $input,
  });
}

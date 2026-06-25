// @title Slack Incident Digest And Notification Pack Flow 2
// @description Create channel digests, escalate important alerts, summarize noisy conversations, and post clean updates to the right operational channels. This variant intentionally has a longer description so the store detail view can be tested with wrapping text, multiple rows, and dense content layouts.
async function run($page, $input) {
  return $generateResponseSuccess('Slack Incident Digest And Notification Pack Flow 2 completed', {
    namespace: 'demo_slack',
    variant: 2,
    input: $input,
  });
}

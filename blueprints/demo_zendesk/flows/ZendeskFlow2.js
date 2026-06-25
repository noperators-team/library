// @title Zendesk Support Queue Assistant Flow 2
// @description Summarize tickets, detect sentiment, group recurring issues, and suggest next support actions for busy helpdesk teams. This variant intentionally has a longer description so the store detail view can be tested with wrapping text, multiple rows, and dense content layouts.
async function run($page, $input) {
  return $generateResponseSuccess('Zendesk Support Queue Assistant Flow 2 completed', {
    namespace: 'demo_zendesk',
    variant: 2,
    input: $input,
  });
}

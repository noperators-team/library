// @title Public Website Change Monitoring With Screenshot Evidence Flow 2
// @description Watch public web pages, detect meaningful content changes, capture screenshot evidence, and send summarized change reports. This variant intentionally has a longer description so the store detail view can be tested with wrapping text, multiple rows, and dense content layouts.
async function run($page, $input) {
  return $generateResponseSuccess('Public Website Change Monitoring With Screenshot Evidence Flow 2 completed', {
    namespace: 'demo_web_monitor',
    variant: 2,
    input: $input,
  });
}

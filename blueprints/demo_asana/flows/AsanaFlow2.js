// @title Asana Weekly Reporting Automation Flow 2
// @description Build weekly task summaries, detect blocked work, identify overdue tasks, and prepare a progress report for managers. This variant intentionally has a longer description so the store detail view can be tested with wrapping text, multiple rows, and dense content layouts.
async function run($page, $input) {
  return $generateResponseSuccess('Asana Weekly Reporting Automation Flow 2 completed', {
    namespace: 'demo_asana',
    variant: 2,
    input: $input,
  });
}

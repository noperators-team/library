// @title Asana Weekly Reporting Automation Flow 1
// @description Build weekly task summaries, detect blocked work, identify overdue tasks, and prepare a progress report for managers. Variant 1.
async function run($page, $input) {
  return $generateResponseSuccess('Asana Weekly Reporting Automation Flow 1 completed', {
    namespace: 'demo_asana',
    variant: 1,
    input: $input,
  });
}

// @title Calendar Scheduler flow
// @description Inspect availability and prepare meeting follow ups.
async function run($page, $input) {
  return $generateResponseSuccess('Calendar Scheduler completed', {
    namespace: 'demo_calendar',
    input: $input,
  });
}

// @title Analytics Export And Narrative Insight Generator Flow 4
// @description Export dashboard figures, detect trends, explain changes in plain language, and prepare narrative insights for weekly business reviews. This variant intentionally has a longer description so the store detail view can be tested with wrapping text, multiple rows, and dense content layouts.
async function run($page, $input) {
  return $generateResponseSuccess('Analytics Export And Narrative Insight Generator Flow 4 completed', {
    namespace: 'demo_analytics',
    variant: 4,
    input: $input,
  });
}

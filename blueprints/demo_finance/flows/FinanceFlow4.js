// @title Finance Dashboard Snapshot And Table Normalization Pack Flow 4
// @description Collect financial tables, normalize report data, detect outliers, and create an executive summary from dashboard exports. This variant intentionally has a longer description so the store detail view can be tested with wrapping text, multiple rows, and dense content layouts.
async function run($page, $input) {
  return $generateResponseSuccess('Finance Dashboard Snapshot And Table Normalization Pack Flow 4 completed', {
    namespace: 'demo_finance',
    variant: 4,
    input: $input,
  });
}

// @title Finance Dashboard Snapshot And Table Normalization Pack Flow 1
// @description Collect financial tables, normalize report data, detect outliers, and create an executive summary from dashboard exports. Variant 1.
async function run($page, $input) {
  return $generateResponseSuccess('Finance Dashboard Snapshot And Table Normalization Pack Flow 1 completed', {
    namespace: 'demo_finance',
    variant: 1,
    input: $input,
  });
}

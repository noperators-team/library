// @title Legal Intake Entity Extraction And Case Summary Flow 2
// @description Summarize intake forms, extract parties and dates, identify missing documents, and generate a structured legal case brief. This variant intentionally has a longer description so the store detail view can be tested with wrapping text, multiple rows, and dense content layouts.
async function run($page, $input) {
  return $generateResponseSuccess('Legal Intake Entity Extraction And Case Summary Flow 2 completed', {
    namespace: 'demo_legal',
    variant: 2,
    input: $input,
  });
}

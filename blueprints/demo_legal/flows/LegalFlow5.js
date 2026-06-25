// @title Legal Intake Entity Extraction And Case Summary Flow 5
// @description Summarize intake forms, extract parties and dates, identify missing documents, and generate a structured legal case brief. Variant 5.
async function run($page, $input) {
  return $generateResponseSuccess('Legal Intake Entity Extraction And Case Summary Flow 5 completed', {
    namespace: 'demo_legal',
    variant: 5,
    input: $input,
  });
}

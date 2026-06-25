// @title Legal Intake Entity Extraction And Case Summary Flow 1
// @description Summarize intake forms, extract parties and dates, identify missing documents, and generate a structured legal case brief. Variant 1.
async function run($page, $input) {
  return $generateResponseSuccess('Legal Intake Entity Extraction And Case Summary Flow 1 completed', {
    namespace: 'demo_legal',
    variant: 1,
    input: $input,
  });
}

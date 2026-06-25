// @title Recruiting Pipeline Research And Candidate Shortlist Flow 1
// @description Review candidate profiles, extract relevant experience, compare role fit, and build recruiter-friendly shortlist summaries. Variant 1.
async function run($page, $input) {
  return $generateResponseSuccess('Recruiting Pipeline Research And Candidate Shortlist Flow 1 completed', {
    namespace: 'demo_recruiting',
    variant: 1,
    input: $input,
  });
}

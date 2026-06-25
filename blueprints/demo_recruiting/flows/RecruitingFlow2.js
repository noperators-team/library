// @title Recruiting Pipeline Research And Candidate Shortlist Flow 2
// @description Review candidate profiles, extract relevant experience, compare role fit, and build recruiter-friendly shortlist summaries. This variant intentionally has a longer description so the store detail view can be tested with wrapping text, multiple rows, and dense content layouts.
async function run($page, $input) {
  return $generateResponseSuccess('Recruiting Pipeline Research And Candidate Shortlist Flow 2 completed', {
    namespace: 'demo_recruiting',
    variant: 2,
    input: $input,
  });
}

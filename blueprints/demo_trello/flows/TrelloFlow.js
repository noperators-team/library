// @title Trello Planner flow
// @description Create cards and organize project boards automatically.
async function run($page, $input) {
  return $generateResponseSuccess('Trello Planner completed', {
    namespace: 'demo_trello',
    input: $input,
  });
}

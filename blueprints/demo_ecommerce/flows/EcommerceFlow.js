// @title Ecommerce QA flow
// @description Check product pages, pricing, and checkout availability.
async function run($page, $input) {
  return $generateResponseSuccess('Ecommerce QA completed', {
    namespace: 'demo_ecommerce',
    input: $input,
  });
}

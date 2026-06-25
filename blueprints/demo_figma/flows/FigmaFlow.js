// @title Figma Exporter flow
// @description Collect design metadata and export handoff notes.
async function run($page, $input) {
  return $generateResponseSuccess('Figma Exporter completed', {
    namespace: 'demo_figma',
    input: $input,
  });
}

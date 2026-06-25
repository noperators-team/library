// @title Dropbox Auditor flow
// @description Scan shared folders and generate file inventory reports.
async function run($page, $input) {
  return $generateResponseSuccess('Dropbox Auditor completed', {
    namespace: 'demo_dropbox',
    input: $input,
  });
}

// @title Dropbox Shared Folder Auditor Flow 1
// @description Scan shared folders, detect large files, identify risky public links, and produce a file inventory report for workspace admins. Variant 1.
async function run($page, $input) {
  return $generateResponseSuccess('Dropbox Shared Folder Auditor Flow 1 completed', {
    namespace: 'demo_dropbox',
    variant: 1,
    input: $input,
  });
}

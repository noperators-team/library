// @title Google Drive File Discovery And Cleanup Assistant Flow 4
// @description Find documents across nested folders, detect stale files, summarize key documents, and generate cleanup recommendations for shared workspaces. This variant intentionally has a longer description so the store detail view can be tested with wrapping text, multiple rows, and dense content layouts.
async function run($page, $input) {
  return $generateResponseSuccess('Google Drive File Discovery And Cleanup Assistant Flow 4 completed', {
    namespace: 'demo_google_drive',
    variant: 4,
    input: $input,
  });
}

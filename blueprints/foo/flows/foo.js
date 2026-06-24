// Minimal example flow - navigates to a URL and returns the page title
async function run($page, $input) {
  await $goto('https://example.com');

  const title = await $page.title();

  return $generateResponseSuccess('Done', { title });
}

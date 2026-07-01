// @title Minimal example snippet
// @description Greets a user by name.
// @param $input Input payload passed by the caller.
return {
  greeting: `hello, ${$input.name ?? 'world'}!`,
};

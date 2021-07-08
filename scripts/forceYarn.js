/* eslint-disable no-console */

// eslint-disable-next-line spellcheck/spell-checker
if (!process.env.npm_execpath.includes('yarn')) {
  console.error('You must use Yarn to install dependencies:');
  console.error('$ yarn install');
  console.error('');
  process.exit(1);
}


const [ , , ...args ] = process.argv

let config = {
  browserContext: 'default',
  launch: {
    timeout: 30000,
    dumpio: true, // Whether to pipe the browser process stdout and stderr 
    product: 'chrome',
  },
  server: {
    command: 'yarn serve',
    port: 5000,
    launchTimeout: 10000,
    debug: true,
  },
}

const isDebugMode = args.includes('--debug')
const keepOpen = args.includes('-k')
const showDevtools = args.includes('-d')

if (isDebugMode) {
  config.launch.devtools = showDevtools
  config.launch.headless = false; // for debug:  to see what the browser is displaying
  config.launch.slowMo = 250;  // slow down by 250ms for each step
  config.launch.devtools = true; // This lets you debug code in the application code browser
  config.launch.args = [ '--start-maximized' ]; // full screen
  config.exitOnPageError = !keepOpen
}

module.exports = config;
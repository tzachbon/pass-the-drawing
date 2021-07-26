const cp = require('child_process')

const MASTER = 'master'
const branch = cp.execSync('git branch --show-current').toString().trim()

if (branch !== MASTER) {
  process.exit(1)
}
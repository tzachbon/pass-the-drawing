const { recursive } = require('merge')
const jestCommon = require('./jest.common')

/** @type {import('@jest/types').Config.ProjectConfig} */
const config = recursive(jestCommon, {
  globalSetup: "jest-environment-puppeteer/setup",
  globalTeardown: "jest-environment-puppeteer/teardown",
  testEnvironment: "jest-environment-puppeteer",
  setupFilesAfterEnv: [ '<rootDir>/tests/e2e-setup.tsx' ],
  testRegex: '(/__tests__/.*|(\\.|/)(e2e))\\.(ts?|tsx?)$',
})

module.exports = config
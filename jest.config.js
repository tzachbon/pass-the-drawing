const { recursive } = require('merge')
const jestCommon = require('./jest.common')

/** @type {import('@jest/types').Config.ProjectConfig} */
const config = recursive(jestCommon, {
    setupFilesAfterEnv: [
        '@testing-library/jest-dom/extend-expect',
        '<rootDir>/tests/test-setup.tsx',
    ],
})

module.exports = config
/** @type {import('@jest/types').Config.ProjectConfig} */
module.exports = {
    // The root of your source code, typically /src
    // `<rootDir>` is a token Jest substitutes
    roots: ['<rootDir>/src'],

    // Jest transformations -- this adds support for TypeScript
    // using ts-jest
    transform: {
        '\\.[t|j]sx?$': 'ts-jest',
        '\\.st\\.css?$': require.resolve('@stylable/jest'),
    },
    transformIgnorePatterns: [
        '/node_modules/(?!(.*?\\.st\\.css$))', // libraries publish .st.css files in their dist
    ],
    // Runs special logic, such as cleaning up components
    // when using React Testing Library and adds special
    // extended assertions to Jest
    setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],

    // Test spec file resolution pattern
    // Matches parent folder `__tests__` and filename
    // should contain `test` or `spec`.
    testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',

    // Module file extensions for importing
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    moduleNameMapper: { 'test-utils': '<rootDir>/tests/test-utils' },
    testPathIgnorePatterns: ['<rootDir>/dist/', '<rootDir>/node_modules/'],
}

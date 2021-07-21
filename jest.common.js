/** @type {import('@jest/types').Config.ProjectConfig} */
module.exports = {
  // The root of your source code, typically /src
  // `<rootDir>` is a token Jest substitutes

  roots: [ '<rootDir>/src', '<rootDir>/tests' ],

  // Jest transformations -- this adds support for TypeScript
  // using ts-jest
  transform: {
    '\\.[t|j]sx?$': 'ts-jest',
    '\\.st\\.css?$': require.resolve('@stylable/jest'),
  },
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(ts?|tsx?)$',
  transformIgnorePatterns: [
    '/node_modules/(?!(.*?\\.st\\.css$))',
  ],
  // Module file extensions for importing
  moduleFileExtensions: [ 'ts', 'tsx', 'js', 'jsx', 'json', 'node' ],
  moduleNameMapper: {
    ".+\\.(png|jpg)$": '<rootDir>/tests/__mocks__/asset.ts',
    '@test-utils': '<rootDir>/tests/test-utils',
    '@api': '<rootDir>/src/api',
    '^@screens(.*)$': '<rootDir>/src/screens$1',
    '^@components(.*)$': '<rootDir>/src/components$1',
    '^@hooks(.*)$': '<rootDir>/src/hooks$1',
    '^@utils(.*)$': '<rootDir>/src/utils$1',
    '^@pages(.*)$': '<rootDir>/src/pages$1',
    '@types': '<rootDir>/src/types',
    '@constants': '<rootDir>/src/constants',
    '@styles': '<rootDir>/src/styles',
  },
  testPathIgnorePatterns: [ '<rootDir>/dist/', '<rootDir>/node_modules/' ],
}

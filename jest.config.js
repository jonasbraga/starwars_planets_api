module.exports = {
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  testEnvironment: 'node',
  collectCoverageFrom: [
    '<rootDir>/**/controllers/**',
    '<rootDir>/**/helpers/**',
    '<rootDir>/**/validations/**',
    '!<rootDir>/**/controllers/**/index.js',
    '!**/mocks/**',
    '!**/config/**',
    '!**/routes.js/**'
  ]
}

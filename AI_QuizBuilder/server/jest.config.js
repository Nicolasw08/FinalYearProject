module.exports = {
  collectCoverageFrom: ['src/**/*.js'],
  coverageDirectory: 'coverage',
  reporters: ['default'],
  projects: [
    {
      displayName: 'unit',
      testEnvironment: 'node',
      testMatch: ['<rootDir>/tests/unit/**/*.test.js']
    },
    {
      displayName: 'integration',
      testEnvironment: 'node',
      testMatch: ['<rootDir>/tests/integration/**/*.test.js']
    }
  ]
};

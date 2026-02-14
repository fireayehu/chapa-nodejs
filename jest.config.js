module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/**/*.d.ts',
    '!src/index.ts',
  ],
  coverageThreshold: {
    global: {
      branches: 30,
      functions: 50,
      lines: 69,
      statements: 70,
    },
  },
  transformIgnorePatterns: [
    'node_modules/(?!(axios|nanoid|nanoid-dictionary)/)',
  ],
  moduleNameMapper: {
    '^axios$': require.resolve('axios'),
  },
};

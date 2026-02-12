module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  transformIgnorePatterns: [
    'node_modules/(?!(axios|nanoid|nanoid-dictionary)/)',
  ],
  moduleNameMapper: {
    '^axios$': require.resolve('axios'),
  },
};

const path = require('path');

module.exports = {
  clearMocks: true,
  coverageProvider: 'v8',
  preset: 'ts-jest',
  setupFilesAfterEnv: ['core-js/features/reflect'],
  testEnvironment: 'jest-environment-node',
  moduleNameMapper: {
    '@lib/const': path.resolve(__dirname, 'projects/libs/enum/src/index.ts'),
    '@lib/utils': path.resolve(__dirname, 'projects/libs/utils/src/index.ts')
  }
};

// import type { Config } from 'jest';

// const config: Config = {
//   preset: 'jest-preset-angular',
//   testEnvironment: 'jsdom',
//   setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
//   testMatch: ['**/+(*.)+(spec).+(ts)'],
//   transform: {
//     '^.+\\.(ts|js|html)$': 'jest-preset-angular',
//   },
//   moduleFileExtensions: ['ts', 'html', 'js', 'json'],
//   collectCoverage: true,
//   coverageReporters: ['html', 'lcov', 'text'],
//   coverageDirectory: '<rootDir>/coverage/',
// };

// export default config;

// import type { Config } from 'jest';

// const config: Config = {
//   preset: 'jest-preset-angular',
//   testEnvironment: 'jsdom',
//   setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
//   testMatch: ['**/+(*.)+(spec).+(ts)'],
//   transform: {
//     '^.+\\.(ts|js)$': 'jest-preset-angular',
//     '^.+\\.mjs$': 'babel-jest',
//   },
//   transformIgnorePatterns: ['\\.html$'],
//   moduleFileExtensions: ['ts', 'html', 'js', 'json', 'mjs'],
//   collectCoverage: true,
//   coverageReporters: ['html', 'lcov', 'text'],
//   coverageDirectory: '<rootDir>/coverage/',
// };

// export default config;

module.exports = {
  preset: 'jest-preset-angular',
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageProvider: "v8",
  globalSetup: 'jest-preset-angular/global-setup',
  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/src/$1',
    '^app/(.*)$': '<rootDir>/src/app/$1',
    '^assets/(.*)$': '<rootDir>/src/assets/$1',
    '^environments/(.*)$': '<rootDir>/src/environments/$1',
    '^@shared/(.*)$': '<rootDir>/src/app/shared/$1',
  },
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts']
}
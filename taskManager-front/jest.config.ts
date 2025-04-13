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
module.exports = {
  setupFilesAfterEnv: ['<rootDir>/test/e2e/setup.js'],
  verbose: true,
  preset: 'jest-puppeteer',
  testSequencer: '<rootDir>/test/e2e/testSequencer.js',
}

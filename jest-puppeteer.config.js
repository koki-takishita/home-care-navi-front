module.exports = {
  launch: {
    headless: false,
    slowMo: 250,
  },
  server: {
    command: 'yarn testServer',
    port: 9000,
    launchTimeout: 50000,
  },
}

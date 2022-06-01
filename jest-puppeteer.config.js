module.exports = {
  launch: {
    headless: true,
    slowMo: 250,
  },
  server: {
    command: 'yarn testServer',
    port: 9000,
    launchTimeout: 50000,
  },
}

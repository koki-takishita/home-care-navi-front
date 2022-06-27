module.exports = {
  launch: {
    headless: false,
    slowMo: 250,
    defaultViewport: {
      width: 1280,
      height: 720,
    },
  },
  server: {
    command: 'yarn testServer',
    port: 9000,
    launchTimeout: 50000,
  },
}

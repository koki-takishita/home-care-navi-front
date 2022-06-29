module.exports = {
  launch: {
    headless: false,
    slowMo: 250,
    innerWidth: 1280,
    innerHeight: 800,
    defaultViewport: {
      width: 1280,
      height: 800,
    },
    args: [
      '--disable-gpu',
      '--disable-dev-shm-usage',
      '--disable-setuid-sandbox',
      '--no-first-run',
      '--no-sandbox',
      '--no-zygote',
      '--single-process',
    ],
  },
  server: {
    command: 'yarn testServer',
    port: 9000,
    launchTimeout: 100000,
  },
}

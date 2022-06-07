export default function ({ $axios }, inject) {
  const apiToAddress = $axios.create({
    headers: {
      common: {
        Accept: 'text/plain, */*',
      },
    },
  })
  apiToAddress.setBaseURL('https://geoapi.heartrails.com/api/')
  inject('apiToAddressJson', apiToAddress)
}

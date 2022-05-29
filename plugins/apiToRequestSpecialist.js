export default function ({ $axios }, inject) {
  const apiToSpecialist = $axios.create({
    headers: {
      common: {
        Accept: 'text/plain, */*',
      },
    },
  })
  apiToSpecialist.setBaseURL('http://localhost:3000/api/specialists')
  inject('apiToSpecialistJson', apiToSpecialist)
}

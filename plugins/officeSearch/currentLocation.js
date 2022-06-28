const CurrentArea = {
  prefecture: '',
  city: '',
}

const searchLocation = function (x, y, coordinate) {
  return new Promise(function (resolve) {
    const res = coordinate.$get(`json?method=searchByGeoLocation&x=${x}&y=${y}`)
    resolve(res)
  })
}

const getPosition = function (options) {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject, options)
  })
}

export default function ({ $apiToAddressJson }, inject) {
  inject('currentLocation', function () {
    return new Promise(function (resolve) {
      getPosition()
        .then((position) => {
          const x = position.coords.longitude
          const y = position.coords.latitude
          searchLocation(x, y, $apiToAddressJson).then((res) => {
            const response = res.response.location[0]
            CurrentArea.prefecture = response.prefecture
            CurrentArea.city = response.city
            resolve(CurrentArea)
          })
        })
        .catch((error) => {
          console.error(error.message)
        })
    })
  })
}

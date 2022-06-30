const exist = function (obj) {
  return obj.length > 0
}

const objCount = function (obj) {
  let count = obj[0].count
  count = count / 10 || 0
  count = Math.ceil(count)
  if (count === 0) {
    count = 1
  }
  return count
}

const searchOfficesFromSelectedArea = async function (searchInfo, axios) {
  try {
    const prefecture = searchInfo.prefecture
    const cities = searchInfo.cities
    const offsetPage = searchInfo.offsetPage
    const offices = await axios.$get(
      `offices?prefecture=${prefecture}&cities=${cities}&page=${offsetPage}`
    )
    if (exist(offices)) {
      const count = objCount(offices)
      return {
        offices,
        count,
      }
    } else {
      return alert('選択したエリアにオフィスは存在しません')
    }
  } catch (error) {
    // console.log(error)
    return error
  }
}

export default function ({ $axios }, inject) {
  inject('searchOffices', (searchInfo) => {
    const response = searchOfficesFromSelectedArea(searchInfo, $axios)
    return response
  })
}

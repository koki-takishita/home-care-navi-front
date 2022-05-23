export const state = () => ({
  prefectures: [],
  cities: [],
  towns: [],
})

const areas = {
  hokaido: ['北海道'],
  touhoku: ['青森県', '岩手県', '宮城県', '秋田県', '山形県', '福島県'],
  koushinetsuHokuriku: [
    '新潟県',
    '富山県',
    '石川県',
    '福井県',
    '山梨県',
    '長野県',
  ],
  kanto: [
    '東京都',
    '神奈川県',
    '埼玉県',
    '千葉県',
    '茨城県',
    '栃木県',
    '群馬県',
  ],
  kansai: ['滋賀県', '京都府', '大阪府', '兵庫県', '奈良県', '和歌山県'],
  tokai: ['岐阜県', '静岡県', '愛知県', '三重県'],
  tyugoku: ['鳥取県', '島根県', '岡山県', '広島県', '山口県'],
  shikoku: ['徳島県', '香川県', '愛媛県', '高知県'],
  kyusyuOkinawa: [
    '福岡県',
    '佐賀県',
    '長崎県',
    '熊本県',
    '大分県',
    '宮崎県',
    '鹿児島県',
    '沖縄',
  ],
}

const requestMethods = {
  cities: 'json?method=getCities&prefecture=',
  towns: 'json?method=getTowns&city=',
}

export const getters = {
  getPrefectures: (state) => state.prefectures,
  getCities: (state) => state.cities,
}

export const mutations = {
  setPrefectures(state, prefectures) {
    state.prefectures = prefectures
  },
  setCities(state, cities) {
    state.cities = cities
  },
  clearCities(state) {
    state.cities = []
  },
  setTowns(state, towns) {
    state.towns = towns
  },
  clearTowns(state) {
    state.towns = []
  },
}

export const actions = {
  setPrefectures({ commit }, chooseArea) {
    if (chooseArea === '北海道') {
      commit('setPrefectures', areas.hokaido)
    } else if (chooseArea === '東北') {
      commit('setPrefectures', areas.touhoku)
    } else if (chooseArea === '甲信越北陸') {
      commit('setPrefectures', areas.koushinetsuHokuriku)
    } else if (chooseArea === '関東') {
      commit('setPrefectures', areas.kanto)
    } else if (chooseArea === '関西') {
      commit('setPrefectures', areas.kansai)
    } else if (chooseArea === '東海') {
      commit('setPrefectures', areas.tokai)
    } else if (chooseArea === '中国') {
      commit('setPrefectures', areas.tyugoku)
    } else if (chooseArea === '四国') {
      commit('setPrefectures', areas.shikoku)
    } else if (chooseArea === '九州沖縄') {
      commit('setPrefectures', areas.kyusyuOkinawa)
    }
  },
  async setCities({ commit }, chooseCity) {
    try {
      const encodeString = encodeURI(chooseCity)
      const res = await this.$apiToAddressJson.$get(
        requestMethods.cities + encodeString
      )
      const fetchCities = res.response.location
      commit('setCities', fetchCities)
    } catch (error) {
      return error
    }
  },
  clearCities({ commit }) {
    commit('clearCities')
  },
  async setTowns({ commit }, chooseTown) {
    try {
      const encodeString = encodeURI(chooseTown)
      const res = await this.$apiToAddressJson.$get(
        requestMethods.towns + encodeString
      )
      const fetchTowns = res.response.location
      commit('setTowns', fetchTowns)
    } catch (error) {
      return error
    }
  },
  clearTowns({ commit }) {
    commit('clearTowns')
  },
}

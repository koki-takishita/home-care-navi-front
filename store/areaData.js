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
}

export const state = () => ({
  prefectures: [],
  currentPrefecture: '',
  cities: [],
  count_area: 0,
  count_prefecture: 0,
})

export const getters = {
  getPrefectures: (state) => state.prefectures,
  getCurrentPrefecture: (state) => state.currentPrefecture,
  getCities: (state) => state.cities,
  getCount_area: (state) => state.count_area,
  getCount_prefecture: (state) => state.count_prefecture,
}

export const mutations = {
  setPrefectures(state, prefectures) {
    state.prefectures = prefectures
  },
  setCurrentPrefecture(state, prefecture) {
    state.currentPrefecture = prefecture
  },
  clearCurrentPrefecture(state) {
    state.currentPrefecture = ''
  },
  setCities(state, cities) {
    state.cities = cities
  },
  clearCities(state) {
    state.cities = []
  },
  increment_area(state) {
    state.count_area++
  },
  decrement_area(state) {
    state.count_area--
  },
  set_one_area(state) {
    state.count_area = 1
  },
  increment_prefecture(state) {
    state.count_prefecture++
  },
  decrement_prefecture(state) {
    state.count_prefecture--
  },
  set_one_prefecture(state) {
    state.count_prefecture = 1
  },
}

export const actions = {
  setPrefectures({ commit }, chooseArea) {
    commit('increment_area')
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
  setCurrentPrefecture({ commit }, prefecture) {
    commit('setCurrentPrefecture', prefecture)
  },
  clearCurrentPrefecture({ commit }) {
    commit('clearCurrentPrefecture')
  },
  async setCities({ commit }, choosePrefecture) {
    try {
      const encodeString = encodeURI(choosePrefecture)
      const res = await this.$apiToAddressJson.$get(
        requestMethods.cities + encodeString
      )
      const fetchCities = res.response.location
      commit('increment_prefecture')
      commit('setCities', fetchCities)
      commit('setCurrentPrefecture', choosePrefecture)
    } catch (error) {
      return error
    }
  },
  clearCities({ commit }) {
    commit('clearCities')
  },
  increment_area({ commit }) {
    commit('increment_area')
  },
  decrement_area({ commit }) {
    commit('decrement_area')
  },
  increment_prefecture({ commit }) {
    commit('increment_prefecture')
  },
  decrement_prefecture({ commit }) {
    commit('decrement_prefecture')
  },
  set_one_area({ commit }) {
    commit('set_one_area')
  },
  set_one_prefecture({ commit }) {
    commit('set_one_prefecture')
  },
}

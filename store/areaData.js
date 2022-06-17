const Areas = {
  Hokaido: {
    name: '北海道',
    prefectures: ['北海道'],
  },
  Tohoku: {
    name: '東北',
    prefectures: ['青森県', '岩手県', '宮城県', '秋田県', '山形県', '福島県'],
  },
  KoushinetsuHokuriku: {
    name: '甲信越北陸',
    prefectures: ['新潟県', '富山県', '石川県', '福井県', '山梨県', '長野県'],
  },
  Kanto: {
    name: '関東',
    prefectures: [
      '東京都',
      '神奈川県',
      '埼玉県',
      '千葉県',
      '茨城県',
      '栃木県',
      '群馬県',
    ],
  },
  Kansai: {
    name: '関西',
    prefectures: ['滋賀県', '京都府', '大阪府', '兵庫県', '奈良県', '和歌山県'],
  },
  Tokai: {
    name: '東海',
    prefectures: ['岐阜県', '静岡県', '愛知県', '三重県'],
  },
  Tyugoku: {
    name: '中国',
    prefectures: ['鳥取県', '島根県', '岡山県', '広島県', '山口県'],
  },
  Shikoku: {
    name: '四国',
    prefectures: ['徳島県', '香川県', '愛媛県', '高知県'],
  },
  KyusyuOkinawa: {
    name: '九州沖縄',
    prefectures: [
      '福岡県',
      '佐賀県',
      '長崎県',
      '熊本県',
      '大分県',
      '宮崎県',
      '鹿児島県',
      '沖縄',
    ],
  },
}

const requestMethods = {
  cities: 'json?method=getCities&prefecture=',
}

export const state = () => ({
  prefectures: [],
  currentPrefecture: '',
  currentArea: '',
  cities: [],
  count_area: 0,
  count_prefecture: 0,
  count_city: 0,
})

export const getters = {
  getCurrentArea: (state) => state.currentArea,
  getPrefectures: (state) => state.prefectures,
  getCurrentPrefecture: (state) => state.currentPrefecture,
  getCities: (state) => state.cities,
  getCount_area: (state) => state.count_area,
  getCount_prefecture: (state) => state.count_prefecture,
  getCount_city: (state) => state.count_city,
}

export const mutations = {
  setCurrentArea(state, area) {
    state.currentArea = area
  },
  clearCurrentArea(state) {
    state.currentArea = ''
  },
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
    console.log('muataion countup')
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
  increment_city(state) {
    state.count_city++
  },
  set_one_city(state) {
    state.count_city = 1
  },
  reset_store(state) {
    state.prefecturesi = []
    state.currentPrefecture = ''
    state.currentArea = ''
    state.cities = ''
    state.count_area = 0
    state.count_prefecture = 0
    state.count_city = 0
  },
}

export const actions = {
  resetStore({ commit }) {
    commit('reset_store')
  },
  setCurrentArea({ commit }, chooseArea) {
    commit('setCurrentPrefecture', chooseArea)
  },
  clearCurrentArea({ commit }) {
    commit('clearCurrentArea')
  },
  setPrefectures({ commit }, chooseArea) {
    commit('clearCurrentArea')
    commit('setCurrentArea', chooseArea)
    commit('increment_area')
    if (chooseArea === '北海道') {
      commit('setPrefectures', Areas.Hokaido.prefectures)
    } else if (chooseArea === '東北') {
      commit('setPrefectures', Areas.Tohoku.prefectures)
    } else if (chooseArea === '甲信越北陸') {
      commit('setPrefectures', Areas.KoushinetsuHokuriku.prefectures)
    } else if (chooseArea === '関東') {
      commit('setPrefectures', Areas.Kanto.prefectures)
    } else if (chooseArea === '関西') {
      commit('setPrefectures', Areas.Kansai.prefectures)
    } else if (chooseArea === '東海') {
      commit('setPrefectures', Areas.Tokai.prefectures)
    } else if (chooseArea === '中国') {
      commit('setPrefectures', Areas.Tyugoku.prefectures)
    } else if (chooseArea === '四国') {
      commit('setPrefectures', Areas.Shikoku.prefectures)
    } else if (chooseArea === '九州沖縄') {
      commit('setPrefectures', Areas.KyusyuOkinawa.prefectures)
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
    console.log('action countup')
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
  increment_city({ commit }) {
    commit('increment_city')
  },
  set_one_city({ commit }) {
    commit('set_one_city')
  },
}

// import createPersistedState from 'vuex-persistedstate'

export const state = () => ({
  message: 'Hello World',
  specialist: '',
})

export const mutations = {
  loginSpecialist(state) {
    state.specialist = 'true'
  },
  logoutSpecialist(state) {
    state.specialist = ''
  },
}

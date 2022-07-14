// import createPersistedState from 'vuex-persistedstate'

export const state = () => ({
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

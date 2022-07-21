// import createPersistedState from 'vuex-persistedstate'

export const state = () => ({
  specialist: false,
  customer: false,
})

export const mutations = {
  loginSpecialist(state) {
    state.specialist = true
  },
  logoutUser(state) {
    state.specialist = false
    state.customer = false
  },
  loginCustomer(state) {
    state.customer = true
  },
}

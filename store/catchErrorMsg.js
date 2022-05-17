export const state = () => ({
  msg: [],
})
export const getters = {
  getMsg: (state) => state.msg,
  emptyState: (state) => state.msg.length,
}
export const mutations = {
  setMsg(state, msg) {
    state.msg = msg
  },
  clearMsg(state) {
    state.msg = ''
  },
}
export const actions = {
  setMsg({ commit }, msg) {
    commit('setMsg', msg)
  },
  clearMsg({ commit }) {
    commit('clearMsg')
  },
}

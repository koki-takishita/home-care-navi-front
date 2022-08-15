export const state = () => ({
  msg: [],
  type: '',
})
export const getters = {
  getMsg: (state) => state.msg,
  emptyState: (state) => state.msg.length,
  getType: (state) => state.type,
}
export const mutations = {
  setMsg(state, msg) {
    state.msg = msg
  },
  clearMsg(state) {
    state.msg = ''
  },
  setType(state, type) {
    state.type = type
  },
}
export const actions = {
  setMsg({ commit }, msg) {
    commit('setMsg', msg)
  },
  clearMsg({ commit }) {
    commit('clearMsg')
  },
  setType({ commit }, type) {
    commit('setType', type)
  },
}

export const state = () => ({
  msg: [],
})
export const getters = {
  getMsg: (state) => state.msg,
  emptyState: (state) => state.msg.length,
}
export const mutations = {
  setMsg(state, msg) {
    console.log(`[LOG::mutations::setMsg]::レスポンスメッセージ ${msg}`)
    console.log(`[LOG::mutations::setMsg]::state.msg ${state.msg}`)
    state.msg = msg
  },
  clearMsg(state) {
    state.msg = ''
    console.log(`[LOG::mutatins::clearMsg]::state.msg ${state.msg}`)
  },
}
export const actions = {
  setMsg({ commit }, msg) {
    console.log(`[LOG::actions::setMsg]::レスポンスメッセージ ${msg}`)
    commit('setMsg', msg)
  },
  clearMsg({ commit }) {
    console.log(`[LOG::actions::clearMsg]::state.msg ${state.msg}`)
    commit('clearMsg')
  },
}

export default function ({ $auth, redirect, store }, inject) {
  inject('logout', (logoutInfo) => {
    logout(logoutInfo)
  })
  async function logout(logoutInfo) {
    try {
      const response = await $auth.logout(logoutInfo)
      authDataDeleteToStore()
      // TODO 成功時にstoreにtype入れ込む
      store.commit('catchErrorMsg/setType', 'success')
      store.commit('catchErrorMsg/setMsg', ['ログアウトしました'])
      redirect(logoutInfo.redirectUrl)
      store.commit('logoutUser')
      store.commit('deleteOfficeDate')
      return response
    } catch (error) {
      // TODO 失敗時にstoreにtype入れ込む
      return error
    }
  }

  function authDataDeleteToStore() {
    store.commit('clearAuthData')
  }
}

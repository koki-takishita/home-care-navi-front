export default function ({ $auth, redirect, store }, inject) {
  inject('logout', (logoutInfo) => {
    logout(logoutInfo)
    // console.log(logoutInfo)
  })
  async function logout(logoutInfo) {
    try {
      const response = await $auth.logout(logoutInfo)
      authDataDeleteToLocalStorage()
      // TODO 成功時にstoreにtype入れ込む
      store.commit('catchErrorMsg/setType', 'success')
      store.commit('catchErrorMsg/setMsg', ['ログアウトしました'])
      redirect(logoutInfo.redirectUrl)
      store.commit('logoutSpecialist')
      return response
    } catch (error) {
      // TODO 失敗時にstoreにtype入れ込む
      return error
    }
  }

  function authDataDeleteToLocalStorage() {
    localStorage.removeItem('access-token')
    localStorage.removeItem('expiry')
    localStorage.removeItem('client')
    localStorage.removeItem('uid')
    localStorage.removeItem('office_data')
  }
}

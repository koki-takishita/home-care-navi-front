export default function ({ $auth, redirect, store }, inject) {
  inject('logout', () => {
    logout()
  })

  async function logout() {
    try {
      const response = await $auth.logout()
      authDataDeleteToLocalStorage()
      // TODO 成功時にstoreにtype入れ込む
      store.commit('catchErrorMsg/setType', 'success')
      store.commit('catchErrorMsg/setMsg', ['ログアウトしました'])
      redirect('/top')
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
  }
}

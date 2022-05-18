export default function ({ $auth, redirect, store }, inject) {
  inject('login', (loginInfo) => {
    login(loginInfo)
  })

  async function login(loginInfo) {
    try {
      const response = await $auth.loginWith('local', {
        data: loginInfo,
      })
      store.commit('catchErrorMsg/setType', 'success')
      store.commit('catchErrorMsg/setMsg', ['ログインしました'])
      redirect('/top')
      return response
    } catch (error) {
      return error
    }
  }
}

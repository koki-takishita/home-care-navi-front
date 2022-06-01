export default function ({ $auth, redirect, store, $axios }, inject) {
  inject('login', (loginInfo) => {
    login(loginInfo)
  })

  inject('specialistLogin', (loginInfo) => {
    specialistLogin(loginInfo)
  })

  $axios.onRequest((config) => {
    if (config.url === '/login' || config.url === '/specialists/login') {
      setAuthInfoToHeader(config)
    }
  })

  async function specialistLogin(loginInfo) {
    try {
      const response = await $axios.$post('/specialists/login', {
        email: loginInfo.email,
        password: loginInfo.password,
        redirecttUrl: loginInfo.redirecttUrl,
        user_type: 'specialists',
        valid: true,
      })
      $auth.setUser(true)
      store.commit('catchErrorMsg/setType', 'success')
      store.commit('catchErrorMsg/setMsg', ['ログインしました'])
      redirect(loginInfo.redirecttUrl)
      return response
    } catch (error) {
      return error
    }
  }
  async function login(loginInfo) {
    try {
      const response = await $auth.loginWith('local', {
        data: loginInfo,
      })
      store.commit('catchErrorMsg/setType', 'success')
      store.commit('catchErrorMsg/setMsg', ['ログインしました'])
      redirect(loginInfo.redirecttUrl)
      return response
    } catch (error) {
      return error
    }
  }
}

function setAuthInfoToHeader(config) {
  config.headers.client = window.localStorage.client
  config.headers['access-token'] = window.localStorage.getItem('access-token')
  config.headers.uid = window.localStorage.uid
  config.headers.expiry = window.localStorage.expiry
}

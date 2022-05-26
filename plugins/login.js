export default function ({ $auth, redirect, store, $axios }, inject) {
  inject('login', (loginInfo) => {
    login(loginInfo)
  })

  $axios.onRequest((config) => {
    // console.log(config)
    if (config.url === '/login') {
      setAuthInfoToHeader(config)
    }
  })

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

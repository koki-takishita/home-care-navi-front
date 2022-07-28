export default function ({ $auth, redirect, store, $axios }, inject) {
  inject('login', (loginInfo) => {
    login(loginInfo)
  })

  $axios.onRequest((config) => {
    if (config.url === '/login') {
      setAuthInfoToHeader(config, store)
    }
  })

  async function login(loginInfo) {
    try {
      const response = await $auth.loginWith('local', {
        data: loginInfo,
      })
      store.commit('catchErrorMsg/setType', 'success')
      store.commit('catchErrorMsg/setMsg', ['ログインしました'])
      redirect(loginInfo.redirectUrl)
      if (loginInfo.user_type === 'specialist') {
        store.commit('loginSpecialist')
      } else if (loginInfo.user_type === 'customer') {
        store.commit('loginCustomer')
      }
      return response
    } catch (error) {
      return error
    }
  }
}

function setAuthInfoToHeader(config, store) {
  config.headers.client = store.state.client
  config.headers['access-token'] = store.state.accessToken
  config.headers.uid = store.state.uid
  config.headers.expiry = store.state.expiry
}

export default function (
  { $auth, redirect, store, $axios, $apiToSpecialistJson },
  inject
) {
  inject('login', (loginInfo) => {
    login(loginInfo)
  })

  $axios.onRequest((config) => {
    console.log(config)
    if (
      config.url === '/login' ||
      $apiToSpecialistJson === 'specialists/login'
    ) {
      setAuthInfoToHeader(config)
    }
  })

  async function login(loginInfo) {
    if (loginInfo.user_type === 'customer') {
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
    } else if (loginInfo.user_type === 'specialist') {
      try {
        console.log(loginInfo)
        const response = await $apiToSpecialistJson.$post('login', {
          email: loginInfo.email,
          password: loginInfo.password,
          redirecttUrl: loginInfo.redirecttUrl,
          user_type: 'specialists',
          valid: true,
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
}

function setAuthInfoToHeader(config) {
  config.headers.client = window.localStorage.client
  config.headers['access-token'] = window.localStorage.getItem('access-token')
  config.headers.uid = window.localStorage.uid
  config.headers.expiry = window.localStorage.expiry
}

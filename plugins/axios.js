export default function ({ $axios, store }) {
  $axios.onError((error) => {
    networkError(store, error)
    authError422and401(store, error)
  })

  $axios.onRequest((config) => {
    config.headers.client = window.localStorage.client
    config.headers['access-token'] = window.localStorage.getItem('access-token')
    config.headers.uid = window.localStorage.uid
    config.headers.expiry = window.localStorage.expiry
  })

  $axios.onResponse((response) => {
    store.commit('catchErrorMsg/clearMsg')
    const headers = response.headers
    if (
      headers.client &&
      headers.uid &&
      headers.expiry &&
      headers['access-token']
    ) {
      localStorage.setItem('access-token', headers['access-token'])
      localStorage.setItem('client', headers.client)
      localStorage.setItem('uid', headers.uid)
      localStorage.setItem('expiry', headers.expiry)
    }
  })
}

export const networkError = function (store, error) {
  if (error.response === undefined) {
    store.commit('catchErrorMsg/clearMsg')
    const msg = ['送信ができませんでした。しばらく経ってから再度お願いします。']
    store.commit('catchErrorMsg/setMsg', msg)
  }
}

export const authError422and401 = function (store, error) {
  const code = error.response.status
  if (code === 422) {
    error422(store, error)
  } else if (code === 401) {
    error401(store, error)
  }
}

export const error422 = function (store, error) {
  const msg = error.response.data.errors.full_messages
  store.commit('catchErrorMsg/clearMsg')
  store.commit('catchErrorMsg/setMsg', msg)
}

export const error401 = function (store, error) {
  const msg = error.response.data.errors
  store.commit('catchErrorMsg/clearMsg')
  store.commit('catchErrorMsg/setMsg', msg)
}

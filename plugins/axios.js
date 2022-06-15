const networkError = function (store, error) {
  if (error.response === undefined) {
    store.commit('catchErrorMsg/clearMsg')
    const msg = ['送信ができませんでした。しばらく経ってから再度お願いします。']
    store.commit('catchErrorMsg/setMsg', msg)
  }
}

const authError422and401 = function (store, error) {
  const code = error.response.status
  if (code === 422) {
    error422(store, error)
  } else if (code === 401) {
    error401(store, error)
  } else if (code === 500) {
    error500(store)
  }
}

/* const setAuthInfoToHeader = function (config) {
  config.headers.client = window.localStorage.client
  config.headers['access-token'] = window.localStorage.getItem('access-token')
  config.headers.uid = window.localStorage.uid
  config.headers.expiry = window.localStorage.expiry
} */

const setAuthInfoToHeader = function (config) {
  const client = window.localStorage.client
  const accessToken = window.localStorage.getItem('access-token')
  const uid = window.localStorage.uid
  const expiry = window.localStorage.expiry
  if (client && accessToken && uid && expiry) {
    config.headers.client = window.localStorage.client
    config.headers['access-token'] = window.localStorage.getItem('access-token')
    config.headers.uid = window.localStorage.uid
    config.headers.expiry = window.localStorage.expiry
  }
}

const error422 = function (store, error) {
  const msg = error.response.data.errors.full_messages
  store.commit('catchErrorMsg/clearMsg')
  store.commit('catchErrorMsg/setMsg', msg)
}

const error401 = function (store, error) {
  const msg = error.response.data.errors
  store.commit('catchErrorMsg/clearMsg')
  store.commit('catchErrorMsg/setMsg', msg)
}

const error500 = function (store) {
  const msg = ['サーバー側のエラーです。しばらく経ってから再度お願いします。']
  store.commit('catchErrorMsg/clearMsg')
  store.commit('catchErrorMsg/setMsg', msg)
}

const setAuthInfoToLocalStorage = function (response) {
  // TODO メソッドの名前が適切でないかも、ログイン処理が成功したらみたいなのがほしい
  const headers = response.headers
  if (headers.office_data) {
    localStorage.setItem('office_data', headers.office_data)
  }
  if (
    headers.client &&
    headers.uid &&
    headers.expiry &&
    headers['access-token']
  ) {
    // TODO ログイン処理が成功したら、localstorageに保存されるというのを表現する
    localStorage.setItem('access-token', headers['access-token'])
    localStorage.setItem('client', headers.client)
    localStorage.setItem('uid', headers.uid)
    localStorage.setItem('expiry', headers.expiry)
  }
}

export default function ({ $axios, store }) {
  // TODO onResponseError onRequestErrorで分けたい
  $axios.onError((error) => {
    networkError(store, error)
    authError422and401(store, error)
    // console.log("[LOG]::onError")
  })

  $axios.onResponse((response) => {
    store.commit('catchErrorMsg/clearMsg')
    setAuthInfoToLocalStorage(response)
    // console.log("[LOG]::onResponse")
  })

  $axios.onRequest((config) => {
    setAuthInfoToHeader(config)
  })
}

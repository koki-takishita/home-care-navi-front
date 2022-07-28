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

const setAuthInfoToHeader = function (config, store) {
  const client = store.state.client
  const accessToken = store.state.accessToken
  const uid = store.state.uid
  const expiry = store.state.expiry
  if (client && accessToken && uid && expiry) {
    config.headers.client = client
    config.headers['access-token'] = accessToken
    config.headers.uid = uid
    config.headers.expiry = expiry
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

const setAuthInfoToStore = function (response, store) {
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
    // TODO ログイン処理が成功したら、vuexに保存されるというのを表現する
    store.commit('setAccessToken', headers['access-token'])
    store.commit('setClient', headers.client)
    store.commit('setUid', headers.uid)
    store.commit('setExpiry', headers.expiry)
  }
}

export default function ({ $axios, store }) {
  // TODO onResponseError onRequestErrorで分けたい
  $axios.onResponseError((error) => {
    networkError(store, error)
    authError422and401(store, error)
  })

  $axios.onResponse((response) => {
    store.commit('catchErrorMsg/clearMsg')
    setAuthInfoToStore(response, store)
  })

  $axios.onRequest((config) => {
    setAuthInfoToHeader(config, store)
  })
}

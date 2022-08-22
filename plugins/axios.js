const networkError = function (store, error) {
  if (error.response === undefined) {
    store.commit('catchErrorMsg/clearMsg')
    const msg = ['送信ができませんでした。しばらく経ってから再度お願いします。']
    store.commit('catchErrorMsg/setMsg', msg)
    store.commit('catchErrorMsg/setType', 'error')
    const e = new Error('Apiと通信できませんでした')
    e.name = 'NetworkError'
    throw e
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
  store.commit('catchErrorMsg/setType', 'error')
}

const error401 = function (store, error) {
  const msg = error.response.data.errors
  store.commit('catchErrorMsg/clearMsg')
  store.commit('catchErrorMsg/setMsg', msg)
  store.commit('catchErrorMsg/setType', 'error')
}

const error500 = function (store) {
  const msg = ['サーバー側のエラーです。しばらく経ってから再度お願いします。']
  store.commit('catchErrorMsg/clearMsg')
  store.commit('catchErrorMsg/setMsg', msg)
  store.commit('catchErrorMsg/setType', 'error')
}

const setOfficeDate = function (officeData) {
  localStorage.setItem('office_data', officeData)
}

const setAuthToStore = function (headers, store) {
  store.commit('setAccessToken', headers['access-token'])
  store.commit('setClient', headers.client)
  store.commit('setUid', headers.uid)
  store.commit('setExpiry', headers.expiry)
}

const isAuthInfo = function (obj) {
  if (obj.client && obj.uid && obj.expiry && obj['access-token']) {
    return true
  } else {
    return false
  }
}

const setAuthInfoToStore = function (response, store) {
  const headers = response.headers
  if (headers.office_data) {
    setOfficeDate(headers.office_data)
  }

  if (isAuthInfo(headers)) {
    setAuthToStore(headers, store)
  }
}

export default function ({ $axios, store, query }) {
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
    // TODO urlに認証情報が存在するか？
    const authInfo = query
    if (isAuthInfo(authInfo)) {
      setAuthToStore(authInfo, store)
    }
    setAuthInfoToHeader(config, store)
  })
}

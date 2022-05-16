export default function ({ $axios, store }) {
  $axios.onError((error) => {
    console.log(`[LOG]::onError::${error}`)
    if (error.response === undefined) {
      store.commit('catchErrorMsg/clearMsg')
      const msg = [
        '送信ができませんでした。しばらく経ってから再度お願いします。',
      ]
      store.commit('catchErrorMsg/setMsg', msg)
      return
    }
    const code = error.response.status
    const msg = error.response.data.errors.full_messages
    if (code === 422) {
      store.commit('catchErrorMsg/clearMsg')
      store.commit('catchErrorMsg/setMsg', msg)
    }
  })

  $axios.onRequest((config) => {
    config.headers.client = window.localStorage.client
    config.headers['access-token'] = window.localStorage.getItem('access-token')
    config.headers.uid = window.localStorage.uid
    config.headers.expiry = window.localStorage.expiry
  })

  $axios.onResponse((response) => {
    console.log(`[LOG]::onResponse::${response}`)
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

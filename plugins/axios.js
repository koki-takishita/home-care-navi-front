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
  $axios.onResponse((response) => {
    console.log(`[LOG]::onResponse::${response}`)
    store.commit('catchErrorMsg/clearMsg')
  })
}

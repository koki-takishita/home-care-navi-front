export default function ({ $axios, store }) {
  $axios.onError((error) => {
    if (error.response === undefined) {
      store.clearMsg()
      const msg = [
        '送信ができませんでした。しばらく経ってから再度お願いします。',
      ]
      store.commit('catchErrorMsg/setMsg', msg)
    }
    const code = error.response.status
    const msg = error.response.data.errors.full_messages
    if (code === 422) {
      store.commit('catchErrorMsg/setMsg', msg)
    }
  })
}

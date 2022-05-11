export default function ({ $axios, store }) {
  $axios.onError((error) => {
    const code = error.response.status
    const message = error.response.data.errors.full_messages
    if (code === 422) {
      store.commit('message/setMessage', message)
    }
  })
}

export default async function ({ $auth, store, redirect, route }) {
  if (
    route.path !== '/specialists/login' &&
    route.path !== '/specialists/users/new' &&
    route.path !== '/specialists/users/send' &&
    store.state.specialist !== 'true'
  ) {
    await $auth.logout()
    return redirect('/specialists/login')
  }
}

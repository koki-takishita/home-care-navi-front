export default async function ({ $auth, store, redirect, route }) {
  if (
    route.path !== '/specialists/login' &&
    route.path !== '/specialists/users/new' &&
    route.path !== '/specialists/users/send' &&
    route.path !== '/reset-passwords' &&
    route.path !== '/reset-passwords/edit' &&
    store.state.specialist !== true
  ) {
    await $auth.logout()
    return redirect('/specialists/login')
  }
}

export default async function ({ $auth, store, redirect, route }) {
  if (
    route.path !== '/users/login' &&
    route.path !== '/top' &&
    route.path !== '/offices' &&
    route.name !== 'offices-id' &&
    route.path !== '/users/privacy_policy' &&
    route.path !== '/users/terms' &&
    route.path !== '/users/contacts/new' &&
    route.path !== '/users/contacts/confirm' &&
    route.path !== '/users/contacts/success' &&
    route.path !== '/users/new' &&
    route.path !== '/users/send' &&
    route.path !== '/' &&
    store.state.customer !== 'true'
  ) {
    await $auth.logout()
    return redirect('/users/login')
  }
}

export default function ({ store, redirect, route }) {
  if (
    route.path !== '/specialists/login/' &&
    route.path !== '/specialists/users/new' &&
    route.path !== '/specialists/users/send' &&
    store.state.specialist !== 'true'
  ) {
    return redirect('/specialists/login/')
  }
}

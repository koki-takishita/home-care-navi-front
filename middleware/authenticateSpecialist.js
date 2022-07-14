export default function ({ store, redirect, route }) {
  if (
    route.path !== '/specialists/login' &&
    route.path !== '/specialists/login/' &&
    route.path !== '/specialists/users/new' &&
    route.path !== '/specialists/users/send' &&
    store.state.specialist !== 'true'
  ) {
    console.log('ミドルウェア')
    return redirect('/specialists/login')
  }
}

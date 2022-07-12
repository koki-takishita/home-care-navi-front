export default function ({ store, redirect, route }) {
  if (
    route.path !== '/specialists/login' &&
    route.path !== '/specialists/users/new' &&
    store.state.specialist !== 'true'
  ) {
    console.log('ミドルウェア')
    return redirect('/specialists/login')
  }
}

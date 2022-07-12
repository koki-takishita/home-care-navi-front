export default function ({ store, redirect, route }) {
  if (
    route.path !== '/specialists/login' &&
    store.state.specialist !== 'true'
  ) {
    console.log('ミドルウェア')
    return redirect('/specialists/login')
  }
}

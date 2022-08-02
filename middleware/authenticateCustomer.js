export default async function ({ $auth, store, redirect, route }) {
  const permissionPaths = [
    `/users/login`,
    '/users/login',
    '/top',
    '/offices',
    '/users/privacy_policy',
    '/users/terms',
    '/users/contacts/new',
    '/users/contacts/confirm',
    '/users/contacts/success',
    '/users/new',
    '/users/send',
    '/reset-passwords',
    '/reset-passwords/edit',
    '/',
  ]
  if (
    route.name !== 'offices-id' &&
    !permissionPaths.includes(route.path) &&
    store.state.customer !== true
  ) {
    await $auth.logout()
    return redirect('/users/login')
  }
}

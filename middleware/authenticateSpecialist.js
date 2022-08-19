export default async function ({ $auth, store, redirect, route }) {
  const permissionPaths = [
    '/specialists/login',
    '/specialists/login/',
    '/specialists/users/new',
    '/specialists/users/send',
    '/reset-passwords',
    '/reset-passwords/edit',
    '/specialists/privacy_policy',
    '/specialists/terms',
    '/specialists/contacts/new',
    '/specialists/contacts/confirm',
    '/specialists/contacts/success',
  ]
  if (
    !permissionPaths.includes(route.path) &&
    store.state.specialist !== true
  ) {
    await $auth.logout()
    return redirect('/specialists/login')
  }
}

export default async ({ $auth, redirect }) => {
  // ログイン前ユーザー処理
  if (!$auth.loggedIn) {
    // ユーザー以外の値が存在する可能性があるので全てを削除する
    await $auth.logout()
    return redirect('/users/login')
  }
}

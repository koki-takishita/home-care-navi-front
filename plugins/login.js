export default function ({ $auth, redirect }, inject) {
  inject('login', (loginInfo) => {
    login(loginInfo)
  })

  async function login(loginInfo) {
    try {
      const response = await $auth.loginWith('local', {
        data: loginInfo,
      })
      redirect('/top')
      return response
    } catch (error) {
      return error
    }
  }
}

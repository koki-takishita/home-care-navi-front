export default function ({ $auth }, inject) {
  /* eslint-disable */
  inject('logout', (tmp) => {
    logout($auth)

    async function logout(auth) {
      try {
        const response = await auth.logout()
        authDataDeleteToLocalStorage()
        return response
      } catch (error) {
        return error
      }
    }

    function authDataDeleteToLocalStorage() {
      localStorage.removeItem('access-token')
      localStorage.removeItem('expiry')
      localStorage.removeItem('client')
      localStorage.removeItem('uid')
    }
  })
}

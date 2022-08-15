export const state = () => ({
  specialist: false,
  customer: false,
  client: '',
  accessToken: '',
  uid: '',
  expiry: '',
})

// stateの初期値としたい任意のデータを定義する
function setDefaultState() {
  return {
    client: '',
    accessToken: '',
    uid: '',
    expiry: '',
  }
}

export const getters = {
  getCustomerFlag: (state) => state.customer,
}

export const mutations = {
  loginSpecialist(state) {
    state.specialist = true
  },

  logoutUser(state) {
    state.specialist = false
    state.customer = false
  },

  loginCustomer(state) {
    state.customer = true
  },

  setClient(state, client) {
    state.client = client
  },

  setAccessToken(state, accessToken) {
    state.accessToken = accessToken
  },

  setUid(state, uid) {
    state.uid = uid
  },

  setExpiry(state, expiry) {
    state.expiry = expiry
  },

  clearAuthData(state) {
    Object.assign(state, setDefaultState())
  },
}

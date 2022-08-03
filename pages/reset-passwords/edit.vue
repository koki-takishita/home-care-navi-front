<template>
  <v-container class="base-width">
    <resetPasswordsEdit
      :password.sync="password"
      :password-confirmation.sync="passwordConfirmation"
      :btn-color="btnColor"
      :text-color="textColor"
      :type="type"
      @clickResetBtn="resetPassword"
    />
  </v-container>
</template>
<script>
export default {
  // queryであるtypeの値によってlayoutを切り替える
  // type = customer -> application
  // type = specialist -> application/specialists
  layout(context) {
    const type = context.query.type
    let layout
    switch (type) {
      case 'customer':
        layout = 'application'
        break
      case 'specialist':
        layout = 'application_specialists'
        break
      default:
        layout = 'application'
        break
    }
    return layout
  },
  asyncData({ query }) {
    const type = query.type || ''
    return { type }
  },
  data() {
    return {
      password: '',
      passwordConfirmation: '',
    }
  },
  computed: {
    btnColor() {
      return this.type === 'specialist' ? 'warning' : 'error'
    },
    textColor() {
      return this.type === 'specialist' ? this.yellow : this.red
    },
    yellow() {
      return '#F09C3C'
    },
    red() {
      return '#F06364'
    },
  },
  methods: {
    async resetPassword() {
      try {
        await this.$axios.$put(`customer/password`, {
          password: this.password,
          password_confirmation: this.passwordConfirmation,
        })
        // TODO layoutによって切り替え
        this.togglePage()
      } catch (error) {
        // console.log(error)
        this.$router.push('/reset-passwords')
        return error
      }
    },
    togglePage() {
      this.type === 'specialist' ? this.moveSpecialist() : this.moveCustomer()
    },
    moveSpecialist() {
      this.$router.push('/specialists/login')
    },
    moveCustomer() {
      this.$router.push('/users/login')
    },
  },
}
</script>
<style scoped>
.base-width {
  max-width: 750px;
}
</style>

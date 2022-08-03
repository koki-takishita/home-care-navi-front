<template>
  <v-container class="base-width">
    <resetPasswordsEdit
      :password.sync="password"
      :password-confirmation.sync="passwordConfirmation"
      @clickResetBtn="resetPassword"
    />
  </v-container>
</template>
<script>
export default {
  layout: 'application',
  data() {
    return {
      password: '',
      passwordConfirmation: '',
    }
  },
  methods: {
    async resetPassword() {
      try {
        await this.$axios.$put(`customer/password`, {
          password: this.password,
          password_confirmation: this.passwordConfirmation,
        })
        // TODO layoutによって切り替え
        this.$router.push('/users/login')
      } catch (error) {
        // console.log(error)
        this.$router.push('/reset-passwords')
        return error
      }
    },
  },
}
</script>
<style scoped>
.base-width {
  max-width: 990px;
}
</style>

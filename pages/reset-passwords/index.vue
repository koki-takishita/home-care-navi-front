<template>
  <v-container class="base-width pa-0">
    <v-stepper v-model="e1" outlined class="reset-password-card">
      <v-stepper-items>
        <v-stepper-content step="1" class="pb-16">
          <resetPasswordsNew
            v-model="email"
            @clickResetBtn="applyForPasswordReset"
          />
        </v-stepper-content>
        <v-stepper-content step="2">
          <resetPasswordsSend />
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  </v-container>
</template>
<script>
export default {
  layout: 'application',
  data() {
    return {
      e1: 1,
      email: null,
    }
  },
  methods: {
    async applyForPasswordReset() {
      // TODO 環境によって切り替える 環境変数で行う
      // https://github.com/nuxt-community/dotenv-module
      const redirectUrl = 'http://localhost:8000/reset-passwords/edit'
      try {
        await this.$axios.$post(`customer/password`, {
          email: this.email,
          redirect_url: redirectUrl,
        })
        this.e1 = 2
      } catch (error) {
        // emailがデータベースに存在しない時に404エラーになる
        // emailが存在しないことを確かめられないように
        // 404エラーの時は成功したように装う
        if (error.response.status === 404) {
          this.e1 = 2
        } else {
          return error
        }
      }
    },
  },
}
</script>
<style scoped>
.base-width {
  max-width: 750px;
}

.reset-password-card {
  border: 0;
}
</style>

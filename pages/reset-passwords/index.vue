<template>
  <v-container class="base-width pa-0">
    <v-stepper v-model="e1" outlined class="reset-password-card">
      <v-stepper-items>
        <v-stepper-content step="1" class="pb-16 pt-8">
          <resetPasswordsNew
            v-model="email"
            :btn-color="btnColor"
            @clickResetBtn="applyForPasswordReset"
          />
        </v-stepper-content>
        <v-stepper-content step="2" class="pb-16 pt-8">
          <resetPasswordsSend />
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
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
  data() {
    return {
      e1: 1,
      email: null,
    }
  },
  computed: {
    btnColor() {
      return '#F09C3C'
    },
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

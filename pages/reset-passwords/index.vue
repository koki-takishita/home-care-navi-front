<template>
  <v-container class="base-width pa-0">
    <v-stepper v-model="e1" outlined class="reset-password-card">
      <v-stepper-items>
        <v-stepper-content step="1" class="pb-16 pt-8">
          <resetPasswordsNew
            v-model="email"
            :btn-color="btnColor"
            :text-color="textColor"
            :type="type"
            @clickResetBtn="applyForPasswordReset"
          />
        </v-stepper-content>
        <v-stepper-content step="2" class="pb-16 pt-8">
          <resetPasswordsSend :text-color="textColor" :type="type" />
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
  asyncData({ $config, query }) {
    const envRedirectUrl = $config.passwordResetRedirectUrl
    const type = query.type || ''

    // queryであるtypeの値によってredirectQueryを切り替える
    // type = customer -> customer
    // type = '' -> customer
    // type = specialist -> specialist
    const redirectQuery = type === 'specialist' ? 'specialist' : 'customer'
    const redirectUrl = `${envRedirectUrl}?type=${redirectQuery}`
    return { redirectUrl, type }
  },
  data() {
    return {
      e1: 1,
      email: '',
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
    async applyForPasswordReset() {
      const type = this.type === 'specialist' ? 'specialists/users' : 'customer'
      try {
        await this.$axios.$post(`${type}/password`, {
          email: this.email,
          redirect_url: this.redirectUrl,
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

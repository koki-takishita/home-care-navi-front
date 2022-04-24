<template>
  <div :class="marginTop">
    <v-card
      max-width="750"
      min-width="375"
      min-height="432"
      :height="cardHeight"
      outlined
      class="mx-auto pa-4"
    >
      <v-card max-width="520" class="mx-auto" outlined>
        <div class="d-md-none">
          <div class="d-flex justify-space-between mb-6">
            <v-card-title class="pa-0 font-weight-bold text-18px"
              >ログイン</v-card-title
            >
            <NuxtLink to="#" class="text-decoration-none text-body-2 color-red"
              >ケアマネジャーの方はこちら</NuxtLink
            >
          </div>
        </div>
        <div class="d-none d-md-block mb-6">
          <NuxtLink
            to="#"
            class="d-block text-right text-decoration-none text-body-2 md-99 color-red"
            >ケアマネジャーの方はこちら</NuxtLink
          >
          <p class="pa-0 mb-12 font-weight-bold text-18px text-center">
            ログイン
          </p>
        </div>
        <div>
          <Form />
        </div>
        <div class="btn mt-8">
          <Btn />
        </div>
        <div class="text-center mt-2">
          <NuxtLink
            class="login__sign-link text-decoration-none text-subtitle-2"
            to="/users/new"
            >新規登録はこちら</NuxtLink
          >
        </div>
      </v-card>
    </v-card>
  </div>
</template>
<script>
export default {
  layout: 'top',
  computed: {
    marginTop() {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs':
          return 'mt-2'
        case 'sm':
          return 'mt-2'
        case 'md':
          return 'mt-10'
        case 'lg':
          return 'mt-10'
        case 'xl':
          return 'mt-10'
      }
    },
    cardHeight() {
      switch (this.$vuetify.breakpoint.name) {
        case 'sm':
          return 432
        case 'md':
          return 487
        case 'lg':
          return 487
        case 'xl':
          return 487
      }
    },
  },
}
</script>

<style lang="sass" scoped>
.color-red
   color: #F06364
.v-card
   border: none
.text-18px
  font-size: 18px
.login
  &__specialist-login-link
    color: #F06364
    margin-right: -99px
  &__sign-link
    color: #F06364
.md-99
  margin-right: -99px
</style>
<!-- 【>>>】この記法が、sassだとうまく動かないため -->
<style scoped>
.v-text-field--outlined >>> fieldset {
  border-color: #d9dede;
}
</style>

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
        <FormTitle
          :title="FormTitle.title"
          :link="FormTitle.link"
          :path="FormTitle.path"
        />
        <div>
          <Form
            v-for="(item, i) in inputItems"
            :key="i"
            :index="i"
            :item="item"
          />
          <div class="p-foget-wrapper text-right">
            <NuxtLink
              to="#"
              class="form__link-password-forget text-decoration-none"
              >パスワードを忘れた</NuxtLink
            >
          </div>
        </div>
        <div class="btn mt-8">
          <Btn :name="Btn.name" />
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
  data() {
    return {
      inputItems: [
        {
          name: 'email',
          label: 'メールアドレス',
          placeholder: '例）homecarenavi@mail.com',
        },
        {
          name: 'password',
          label: 'パスワード',
          placeholder: '半角英数字8文字',
        },
      ],
      FormTitle: {
        title: 'ログイン',
        link: 'ケアマネージャーの方はこちら',
        path: '#',
      },
      Btn: {
        name: 'ログイン',
      },
    }
  },
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
.form__link-password-forget
  color: #6D7570
  font-size: 14px
  position: relative
  z-index: 1
.p-foget-wrapper
  margin-top: -18px
</style>
<!-- 【>>>】この記法が、sassだとうまく動かないため -->
<style scoped>
.v-text-field--outlined >>> fieldset {
  border-color: #d9dede;
}
</style>

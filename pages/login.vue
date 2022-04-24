<template>
  <div class="login mx-auto">
    <div class="login__header">
      <div class="login__link text-right">
        <NuxtLink
          class="login__specialist-login-link text-decoration-none text-subtitle-2"
          to="#"
          >ケアマネージャーの方はこちら</NuxtLink
        >
      </div>
      <p class="login__title text-h6 text-center">ログイン</p>
    </div>
    <v-form class="form">
      <div class="form__list email-list">
        <p class="form__email-label">メールアドレス</p>
        <v-text-field
          placeholder="例) homecarenavi@mail.com"
          class="form__email-field"
          dense
          outlined
          height="44"
        ></v-text-field>
      </div>
      <div class="form__list password-list">
        <p class="form__password-label">パスワード</p>
        <v-text-field
          placeholder="例) 半角英数文字8文字以上"
          class="form__password-field"
          dense
          outlined
          height="44"
        ></v-text-field>
      </div>
      <NuxtLink
        to="#"
        class="form__link-password-forget text-decoration-none d-block text-right"
        >パスワード忘れた</NuxtLink
      >
    </v-form>
    <div class="btn mt-8">
      <v-btn class="btn__login" block depressed color="#F06364" height="60">
        <p class="btn__text mb-0 text-h6">ログイン</p>
      </v-btn>
    </div>
    <div class="text-center mt-2">
      <NuxtLink
        class="login__sign-link text-decoration-none text-subtitle-2"
        to="#"
        >新規登録はこちら</NuxtLink
      >
    </div>
  </div>
</template>
<script>
export default {
  layout: 'top',
}
</script>
<style lang="sass" scoped>
.login
  width: 750px
  height: 487px
  padding: 16px 115px 64px
  margin-top: 28px
  background-color: white
  border-radius: 5px
  &__header
    margin-bottom: 48px
  &__title
    margin: 0
    font-weight: bold
  &__specialist-login-link
    color: #F06364
    margin-right: -99px
  &__sign-link
    color: #F06364
.form
  width: 520px
  &__list
    color: #6D7570
    font-size: 13px
  &__form-password-list
  &__email-label
    margin-bottom: 8px
    font-weight: bold
  &__password-label
    margin-bottom: 8px
    font-weight: bold
  &__link-password-forget
    color: #6D7570
    font-size: 14px
    margin-top: -18px
    position: relative
    z-index: 1
.password-list
  margin-top: -2px
.btn
  &__text
    color: white
    font-weight: bold
</style>
<!-- 【>>>】この記法が、sassだとうまく動かないため -->
<style scoped>
.v-text-field--outlined >>> fieldset {
  border-color: #d9dede;
}

.v-text-field--slot >>> input {
  border-color: #d9dede;
}
</style>

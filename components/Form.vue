<template>
  <v-form class="form">
    <div class="form__list email-list">
      <label class="font-weight-bold d-block">
        お名前
        <v-text-field
          v-model="setName"
          placeholder="田中太郎"
          class="form__email-field mt-2"
          dense
          outlined
          height="44"
        >
        </v-text-field>
      </label>
      <label class="font-weight-bold d-block">
        メールアドレス
        <v-text-field
          v-model="setEmail"
          placeholder="例）homecarenavi@mail.com"
          class="form__email-field mt-2"
          dense
          outlined
          height="44"
        >
        </v-text-field>
      </label>
      <label class="font-weight-bold d-block">
        パスワード
        <v-text-field
          v-model="setPassword"
          placeholder="半角英数字8文字以上"
          class="form__email-field mt-2"
          dense
          outlined
          height="44"
        >
        </v-text-field>
      </label>
      <label class="font-weight-bold d-block">
        電話番号
        <v-text-field
          v-model="setPhone"
          placeholder="000-0000-0000"
          class="form__email-field mt-2"
          dense
          outlined
          height="44"
        >
        </v-text-field>
      </label>
    </div>
    <!--
    <div class="form__list password-list">
      <p class="mb-2 font-weight-bold">パスワード</p>
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
      >パスワードを忘れた</NuxtLink
    >
-->
  </v-form>
</template>
<script>
export default {
  name: 'Form',
  props: ['item', 'index', 'width'],
  computed: {
    setName: {
      get() {
        return this.item
      },
      set(newValue) {
        return this.$emit('update:name', newValue)
      },
    },
    setEmail: {
      get() {
        return this.item
      },
      set(newValue) {
        return this.$emit('update:email', newValue)
      },
    },
    setPassword: {
      get() {
        return this.item
      },
      set(newValue) {
        return this.$emit('update:password', newValue)
      },
    },
    setPhone: {
      get() {
        return this.item
      },
      set(newValue) {
        return this.$emit('update:phone', newValue)
      },
    },
  },
}
</script>
<style lang="sass" scoped>
.form
  &__list
    color: #6D7570
    font-size: 13px
  &__link-password-forget
    color: #6D7570
    font-size: 14px
    margin-top: -18px
    position: relative
    z-index: 1
/* .password-list
  margin-top: -2px */
</style>

<template>
  <v-form class="form">
    <div class="form__list email-list">
      <label :for="link" class="font-weight-bold d-block">
        {{ item.label }}
        <v-text-field
          :id="link"
          :placeholder="item.placeholder"
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
    link() {
      return this.item.name + '-' + this.index
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

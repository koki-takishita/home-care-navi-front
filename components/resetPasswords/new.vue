<template>
  <v-form ref="form" v-model="valid" class="rest-password-card mx-auto">
    <p class="text-center text-h6 font-weight-black mb-10">
      パスワードのリセット
    </p>
    <label class="font-color-gray font-weight-black text-caption"
      ><font :color="gray">メールアドレス</font>
      <v-text-field
        id="email"
        v-model="Email"
        class="mt-2 font-weight-regular"
        outlined
        dense
        placeholder="例) homecarenavi@mail.com"
        type="email"
        height="44"
        :rules="[formValidates.required, formValidates.email]"
    /></label>
    <v-btn
      block
      :color="BtnColor"
      :disabled="!valid"
      height="60"
      class="font-weight-black text-h6"
      @click="clickResetBtn"
      depressed
    >
      パスワードをリセットする</v-btn
    >
    <ThankBackLink :text="backText" class="text-center" @movePage="goTop" />
  </v-form>
</template>
<script>
export default {
  props: {
    value: {
      type: String,
      default: null,
    },
    btnColor: {
      type: String,
      default: 'error',
    },
  },
  data() {
    return {
      formValidates: {
        required: (value) => !!value || '必須項目です',
        email: (value) => {
          const format =
            // eslint-disable-next-line no-control-regex
            /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0B\x0C\x0E-\x1F\x21\x23-\x5B\x5D-\x7F]|\\[\x01-\x09\x0B\x0C\x0E-\x7F])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0B\x0C\x0E-\x1F\x21-\x5A\x53-\x7F]|\\[\x01-\x09\x0B\x0C\x0E-\x7F])+)\])$/g
          return format.test(value) || '正しいメールアドレスを入力してください'
        },
      },
      valid: false,
    }
  },
  computed: {
    Email: {
      get() {
        return this.value
      },
      set(Email) {
        this.$emit('input', Email)
      },
    },
    BtnColor() {
      return this.btnColor
    },
    backText() {
      return 'リセットせずにもどる'
    },
    gray() {
      return '#6D7570'
    },
  },
  methods: {
    clickResetBtn() {
      this.$emit('clickResetBtn')
    },
    goTop() {
      this.$router.push('/')
    },
  },
}
</script>
<style scoped>
/* stylelint-disable */
.v-text-field--outlined >>> fieldset {
  border-color: #d9dede;
}

::v-deep input::placeholder {
  color: #d9dede !important;
}
/* stylelint-enable */

.rest-password-card {
  max-width: 520px;
}
</style>

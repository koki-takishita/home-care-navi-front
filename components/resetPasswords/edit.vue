<template>
  <v-form ref="form" v-model="valid">
    <label class="font-color-gray font-weight-black text-caption"
      >パスワード
      <v-text-field
        id="email"
        v-model="Password"
        class="mt-2 font-weight-regular"
        outlined
        dense
        type="password"
        height="44"
        :rules="[
          formValidates.required,
          formValidates.typeCheckString,
          formValidates.password,
        ]"
    /></label>

    <label class="font-color-gray font-weight-black text-caption"
      >パスワード確認
      <v-text-field
        id="email"
        v-model="PasswordConfirmation"
        class="mt-2 font-weight-regular"
        outlined
        dense
        type="password"
        height="44"
        :rules="[
          formValidates.required,
          formValidates.typeCheckString,
          formValidates.confirmCheck,
        ]"
    /></label>

    <v-btn block :color="BtnColor" :disabled="!valid" @click="clickResetBtn"
      >パスワードをリセットする
    </v-btn>
  </v-form>
</template>
<script>
export default {
  props: {
    password: {
      type: String,
      default: null,
    },
    passwordConfirmation: {
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
        typeCheckString: (value) => {
          const format = /^[a-zA-Z0-9]+$/g
          return format.test(value) || '入力できるのは半角英数字のみです'
        },
        password: (value) =>
          (value.length >= 8 && value.length <= 16) ||
          '8文字以上16文字未満で入力してください',
        confirmCheck: (value) =>
          value === this.Password || 'パスワードが一致しません',
      },
      valid: false,
    }
  },
  computed: {
    Password: {
      get() {
        return this.password
      },
      set(Password) {
        this.$emit('update:password', Password)
      },
    },
    PasswordConfirmation: {
      get() {
        return this.passwordConfirmation
      },
      set(PasswordConfirmation) {
        this.$emit('update:passwordConfirmation', PasswordConfirmation)
      },
    },
    BtnColor() {
      return this.btnColor
    },
  },
  methods: {
    clickResetBtn() {
      this.$emit('clickResetBtn')
    },
  },
}
</script>

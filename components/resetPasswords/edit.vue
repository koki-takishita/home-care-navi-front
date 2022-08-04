<template>
  <v-card class="pt-8 pb-16 reset-password-card" outlined>
    <v-form ref="form" v-model="valid" class="reset-password-form mx-auto">
      <p :class="titleClass">パスワード再設定</p>
      <label class="font-color-gray font-weight-black text-caption"
        ><font color="gray">パスワード</font>
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
        ><font color="gray">パスワード確認</font>
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
      <v-btn
        block
        :color="BtnColor"
        :disabled="!valid"
        height="60"
        class="text-h6 font-weight-black"
        depressed
        @click="clickResetBtn"
        >パスワードをリセットする
      </v-btn>
      <ThankBackLink
        :text="textLink"
        class="text-center"
        :color="TextColor"
        @movePage="goPage"
      />
    </v-form>
  </v-card>
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
    textColor: {
      type: String,
      default: '#F06364',
    },
    type: {
      type: String,
      default: 'customer',
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
          (value.length >= 8 && value.length <= 32) ||
          '8文字以上32文字未満で入力してください',
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
    TextColor() {
      return this.textColor
    },
    textLink() {
      return 'リセットせずにもどる'
    },
    gray() {
      return '#6D7570'
    },
    Type() {
      return this.type
    },
    titleClass() {
      if (this.isMobile) {
        return 'text-left text-h6 font-weight-black mb-10'
      } else {
        return 'text-center text-h6 font-weight-black mb-10'
      }
    },
    isMobile() {
      return this.$vuetify.breakpoint.smAndDown
    },
  },
  methods: {
    clickResetBtn() {
      this.$emit('clickResetBtn')
    },
    goPage() {
      this.Type === 'specialist' ? this.goAppointment() : this.goLogin()
    },
    goLogin() {
      this.$router.push('/users/login')
    },
    goAppointment() {
      this.$router.push('/specialists/login')
    },
  },
}
</script>
<style scoped>
/* stylelint-disable */
.v-text-field--outlined >>> fieldset {
  border-color: #d9dede;
}
/* stylelint-enable */

.reset-password-form {
  max-width: 520px;
}

.reset-password-card {
  border: 0;
}
</style>

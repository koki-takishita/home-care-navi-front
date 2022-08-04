<template>
  <v-form ref="form" v-model="valid" class="rest-password-card mx-auto">
    <p :class="titleClass">パスワードのリセット</p>
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
      depressed
      @click="clickResetBtn"
    >
      次にすすむ</v-btn
    >
    <ThankBackLink
      :text="backText"
      class="text-center"
      :color="TextColor"
      @movePage="goPage"
    />
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
    TextColor() {
      return this.textColor
    },
    Type() {
      return this.type
    },
    backText() {
      return 'リセットせずにもどる'
    },
    gray() {
      return '#6D7570'
    },
    // breakpointで中央揃え、左揃えに切り替える
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
      this.$router.push('specialists/login')
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

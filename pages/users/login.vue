<template>
  <v-card
    min-width="375"
    max-width="750"
    min-height="400"
    max-height="487"
    class="mx-auto my-2"
  >
    <div class="px-4 pt-4 d-none d-sm-block">
      <p class="mb-0 text-right">
        <NuxtLink
          to="/specialists/login"
          class="text-overline text-decoration-none link-color"
          >ケアマネージャーの方はこちら</NuxtLink
        >
      </p>
      <h6 class="display-1 text-center text-h6 font-weight-black">ログイン</h6>
    </div>
    <div class="px-4 pt-4 d-flex justify-space-between d-sm-none">
      <h6 class="display-1 text-center text-h6 font-weight-black">ログイン</h6>
      <p class="mb-0 text-right">
        <NuxtLink
          to="/specialists/login"
          class="text-overline text-decoration-none link-color"
          >ケアマネージャーの方はこちら</NuxtLink
        >
      </p>
    </div>

    <div class="pa-4 pt-0 mt-6">
      <div class="form-wrapper mx-auto">
        <v-form v-model="loginInfo.valid">
          <label class="font-color-gray font-weight-black text-caption"
            >メールアドレス
            <v-text-field
              v-model="loginInfo.email"
              :rules="[formValidates.required, formValidates.email]"
              outlined
              dense
              height="44"
              placeholder="homecarenavi@mail.com"
              class="font-weight-regular mt-2"
          /></label>

          <label class="font-color-gray font-weight-black text-caption"
            >パスワード
            <v-text-field
              v-model="loginInfo.password"
              :rules="[
                formValidates.required,
                formValidates.password,
                formValidates.typeCheckString,
              ]"
              outlined
              dense
              height="44"
              placeholder="半角英数字8文字以上"
              class="font-weight-regular mt-2"
              type="password"
          /></label>

          <p class="ma-0 text-right mt-n3 mb-7">
            <NuxtLink
              to="#"
              class="text-overline text-decoration-none font-color-gray"
              >パスワードを忘れた</NuxtLink
            >
          </p>

          <v-card-actions class="pa-0">
            <v-btn
              class="error pa-0 text-h6 d-none d-sm-block"
              block
              :disabled="!loginInfo.valid"
              max-width="520"
              min-width="343"
              height="60"
              @click.prevent="$login(loginInfo)"
              >ログイン</v-btn
            >

            <v-btn
              class="error pa-0 ma-0 text-h6 d-block d-sm-none"
              block
              :disabled="!loginInfo.valid"
              max-width="520"
              min-width="343"
              height="48"
              @click.prevent="$login(loginInfo)"
              >ログイン</v-btn
            >
          </v-card-actions>
          <p class="ma-0 pb-7 text-center d-block d-sm-none">
            <NuxtLink
              to="/users/new"
              class="text-overline text-decoration-none link-color"
              >新規登録はこちら</NuxtLink
            >
          </p>

          <p class="ma-0 pb-16 text-center d-none d-sm-block">
            <NuxtLink
              to="/users/new"
              class="text-overline text-decoration-none link-color"
              >新規登録はこちら</NuxtLink
            >
          </p>
        </v-form>
      </div>
    </div>
  </v-card>
</template>

<script>
export default {
  layout: 'application',
  data() {
    return {
      loginInfo: {
        email: '',
        password: '',
        redirecttUrl: '/top',
        user_type: 'customer',
        valid: false,
      },
      formValidates: {
        required: (value) => !!value || '必須項目です',
        email: (value) => {
          const format =
            // eslint-disable-next-line no-control-regex
            /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0B\x0C\x0E-\x1F\x21\x23-\x5B\x5D-\x7F]|\\[\x01-\x09\x0B\x0C\x0E-\x7F])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0B\x0C\x0E-\x1F\x21-\x5A\x53-\x7F]|\\[\x01-\x09\x0B\x0C\x0E-\x7F])+)\])$/g
          return format.test(value) || '正しいメールアドレスを入力してください'
        },
        password: (value) =>
          (value.length >= 8 && value.length <= 16) ||
          '8文字以上16文字未満で入力してください',
        typeCheckString: (value) => {
          const format = /^[a-zA-Z0-9]+$/g
          return format.test(value) || '入力できるのは半角英数字のみです'
        },
      },
    }
  },
}
</script>
<style scoped>
.link-color {
  color: #f06364;
}

.form-wrapper {
  max-width: 520px;
}
/* stylelint-disable */
.v-text-field--outlined >>> fieldset {
  border-color: #d9dede;
}
::v-deep input::placeholder {
  color: #d9dede !important;
}
.font-color-gray {
  color: #6d7570;
}
</style>

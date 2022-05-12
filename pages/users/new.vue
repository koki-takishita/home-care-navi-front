<template>
  <v-card width="750" class="mx-auto mt-2">
    <v-card-title>
      <h1 class="display-1">新規登録</h1>
    </v-card-title>
    <v-card-text>
      <v-form v-model="form.valid">
        <div class="">
          <label class="font-color-gray font-weight-black text-caption"
            >お名前
            <v-text-field
              v-model="form.name"
              class="set-width-343 overwrite-fieldset-border-top-width mt-2 font-weight-regular"
              placeholder="田中 太郎"
              outlined
              dense
              height="44"
              :rules="[formValidates.required]"
          /></label>
        </div>

        <div class="mt-n-2 email-field">
          <label class="font-color-gray font-weight-black text-caption"
            >メールアドレス
            <v-text-field
              v-model="form.email"
              class="overwrite-fieldset-border-top-width mt-2 font-weight-regular"
              outlined
              dense
              placeholder="例) homecarenavi@mail.com"
              type="email"
              height="44"
              :rules="[formValidates.required, formValidates.email]"
          /></label>
        </div>

        <div class="mt-n-2 password-field">
          <label class="font-color-gray font-weight-black text-caption"
            >パスワード
            <v-text-field
              v-model="form.password"
              outlined
              dense
              class="overwrite-fieldset-border-top-width mt-2 font-weight-regular"
              type="password"
              placeholder="半角英数字8文字以上"
              :rules="[
                formValidates.required,
                formValidates.typeCheckString,
                formValidates.password,
              ]"
          /></label>
        </div>

        <div class="mt-n-2 password-confirmation-field">
          <label class="font-color-gray font-weight-black text-caption"
            >パスワード確認
            <v-text-field
              v-model="form.password_confirmation"
              outlined
              dense
              class="overwrite-fieldset-border-top-width mt-2 font-weight-regular"
              type="password"
              :rules="[
                formValidates.required,
                formValidates.typeCheckString,
                formValidates.confirmCheck,
              ]"
          /></label>
        </div>

        <div class="mt-n-2 phnone-number-field">
          <label class="font-color-gray font-weight-black text-caption"
            >電話番号
            <v-text-field
              v-model="form.phone_number"
              outlined
              dense
              placeholder="080-1234-5678"
              class="overwrite-fieldset-border-top-width mt-2 font-weight-regular"
              type="tel"
              :rules="[formValidates.required, formValidates.phoneNumber]"
          /></label>
        </div>

        <div>
          <v-text-field
            v-model="form.post_code"
            outlined
            dense
            height="44"
            class="post-form"
            :rules="[formValidates.required, formValidates.postCode]"
            placeholder="123-4567"
          >
            <template #prepend>
              <v-icon class="text-decoration-none mt-2" tag="div" size="16">
                〒
              </v-icon>
            </template>
          </v-text-field>
        </div>

        <div class="mt-n2">
          <v-text-field
            v-model="form.address"
            outlined
            dense
            height="44"
            class="address-form"
            :rules="[formValidates.required]"
            placeholder="123-4567"
          >
          </v-text-field>
        </div>

        <v-card-actions>
          <v-btn class="info" :disabled="!form.valid" @click="sign_up()"
            >新規登録</v-btn
          >
        </v-card-actions>
      </v-form>
    </v-card-text>
  </v-card>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  layout: 'application',
  data() {
    return {
      form: {
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        phone_number: '',
        post_code: '',
        address: '',
        valid: false,
      },
      formValidates: {
        required: (value) => !!value || '必須項目です',
        typeCheckString: (value) => {
          const format = /^[a-zA-Z0-9]+$/g
          return format.test(value) || '入力できるのは半角英数字のみです'
        },
        email: (value) => {
          const format =
            // eslint-disable-next-line no-control-regex
            /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0B\x0C\x0E-\x1F\x21\x23-\x5B\x5D-\x7F]|\\[\x01-\x09\x0B\x0C\x0E-\x7F])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0B\x0C\x0E-\x1F\x21-\x5A\x53-\x7F]|\\[\x01-\x09\x0B\x0C\x0E-\x7F])+)\])$/g
          return format.test(value) || '正しいメールアドレスを入力してください'
        },
        password: (value) =>
          (value.length >= 8 && value.length <= 16) ||
          '8文字以上16文字未満で入力してください',
        confirmCheck: (value) =>
          value === this.form.password || 'パスワードが一致しません',
        phoneNumber: (value) => {
          const format = /^\d{2,4}-\d{2,4}-\d{4}$/g
          return format.test(value) || '正しい電話番号ではありません'
        },
        postCode: (value) => {
          const format = /^[0-9]{3}-[0-9]{4}$/g
          return (
            format.test(value) || '正しい郵便番号ではありません 例) 000-0000'
          )
        },
      },
    }
  },
  methods: {
    ...mapActions('catchErrorMsg', ['clearMsg']),
    async sign_up() {
      try {
        const response = await this.$axios.$post(`users`, {
          name: this.form.name,
          email: this.form.email,
          password: this.form.password,
          password_confirmation: this.form.password_confirmation,
          phone_number: this.form.phone_number,
          post_code: this.form.post_code,
          address: this.form.address,
          confirm_success_url: 'http://localhost:8000',
        })
        this.clearMsg()
        this.$router.push('/users/send')
        return response
      } catch (error) {
        console.log(error)
        return error
      }
    },
  },
}
</script>
<style scoped>
.set-width-343 {
  width: 343px;
}

.set-height-44 {
  height: 44px;
}

/* stylelint-disable */
.v-text-field--outlined >>> fieldset {
  border-color: #d9dede;
}

.post-form >>> fieldset {
  width: 107px;
}

.post-form >>> .v-text-field__slot {
  max-width: 82px;
}

.mt-n-2 {
  margin-top: -2px;
}

.font-color-gray {
  color: #6d7570;
}

::v-deep input::placeholder {
  color: #d9dede !important;
}
</style>

<template>
  <v-card flat width="750" class="mx-auto mb-2 mt-2">
    <div class="px-4 pt-4 d-none d-sm-block">
      <p class="mb-0 text-right">
        <NuxtLink
          to="/specialists/login"
          class="text-overline text-decoration-none link-color"
          >ログインはこちら</NuxtLink
        >
      </p>
      <h6 class="display-1 text-center text-h6 font-weight-black">新規登録</h6>
    </div>
    <div class="px-4 pt-4 d-flex justify-space-between d-sm-none">
      <h6 class="display-1 text-center text-h6 font-weight-black">新規登録</h6>
      <p class="mb-0 text-right">
        <NuxtLink
          to="/specialists/login"
          class="text-overline text-decoration-none link-color"
          >ログインはこちら</NuxtLink
        >
      </p>
    </div>

    <v-card-text>
      <div class="form-wrapper mx-auto">
        <v-form v-model="form.valid">
          <div class="set-width-343">
            <label class="font-color-gray font-weight-black text-caption"
              >お名前
              <v-text-field
                id="name"
                v-model="form.name"
                class="overwrite-fieldset-border-top-width mt-2 font-weight-regular"
                placeholder="田中 太郎"
                outlined
                dense
                height="44"
                :rules="[formValidates.required, formValidates.nameMaxlength]"
            /></label>
          </div>

          <div class="mt-n-2">
            <label class="font-color-gray font-weight-black text-caption"
              >メールアドレス
              <v-text-field
                id="email"
                v-model="form.email"
                class="overwrite-fieldset-border-top-width mt-2 font-weight-regular set-max-width-520"
                outlined
                dense
                placeholder="例) homecarenavi@mail.com"
                type="email"
                height="44"
                :rules="[
                  formValidates.required,
                  formValidates.emailMaxlength,
                  formValidates.email,
                ]"
            /></label>
          </div>

          <div class="mt-n-2 password-field">
            <label class="font-color-gray font-weight-black text-caption"
              >パスワード
              <v-text-field
                id="password"
                v-model="form.password"
                outlined
                dense
                class="overwrite-fieldset-border-top-width mt-2 font-weight-regular set-max-width-520"
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
                id="password_confirm"
                v-model="form.password_confirmation"
                outlined
                dense
                class="overwrite-fieldset-border-top-width mt-2 font-weight-regular set-max-width-520"
                type="password"
                :rules="[
                  formValidates.required,
                  formValidates.typeCheckString,
                  formValidates.confirmCheck,
                ]"
            /></label>
          </div>

          <div class="mt-n-2 phnone-number-field">
            <label
              class="font-color-gray font-weight-black text-caption set-max-width-520"
              >電話番号
              <v-text-field
                id="phone_number"
                v-model="form.phone_number"
                outlined
                dense
                :error-messages="errors"
                placeholder="080-1234-5678"
                class="overwrite-fieldset-border-top-width mt-2 font-weight-regular set-max-width-520"
                type="tel"
                :rules="[formValidates.required, formValidates.phoneNumber]"
            /></label>
          </div>

          <div>
            <v-text-field
              id="post_code"
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
              id="address"
              v-model="form.address"
              outlined
              dense
              height="44"
              class="address-form set-max-width-520"
              :rules="[formValidates.required]"
              placeholder="東京都世田谷区祖父谷4-3-15"
            >
            </v-text-field>
          </div>

          <v-card-actions class="pa-0">
            <v-btn
              id="send"
              class="warning pa-0 text-h6 d-none d-sm-block"
              block
              :disabled="isValid"
              max-width="520"
              min-width="343"
              height="60"
              @click="sign_up()"
              >新規登録</v-btn
            >
            <v-btn
              id="send"
              class="warning pa-0 ma-0 text-h6 d-block d-sm-none"
              block
              :disabled="isValid"
              max-width="520"
              min-width="343"
              height="48"
              @click="sign_up()"
              >新規登録</v-btn
            >
          </v-card-actions>
        </v-form>
      </div>
    </v-card-text>
  </v-card>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  layout: 'application_specialists',
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
        phoneNumberCheck: false,
      },
      errors: [],
      formValidates: {
        required: (value) => !!value || '必須項目です',
        nameMaxlength: (value) =>
          value.length <= 30 || '名前は30文字以下で入力してください',
        emailMaxlength: (value) =>
          value.length <= 255 ||
          'メールアドレスは255文字以下で入力してください',
        email: (value) => {
          const format =
            // eslint-disable-next-line no-control-regex
            /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0B\x0C\x0E-\x1F\x21\x23-\x5B\x5D-\x7F]|\\[\x01-\x09\x0B\x0C\x0E-\x7F])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0B\x0C\x0E-\x1F\x21-\x5A\x53-\x7F]|\\[\x01-\x09\x0B\x0C\x0E-\x7F])+)\])$/g
          return format.test(value) || '正しいメールアドレスを入力してください'
        },
        password: (value) =>
          (value.length >= 8 && value.length <= 32) ||
          '8文字以上32文字以下で入力してください',
        confirmCheck: (value) =>
          value === this.form.password || 'パスワードが一致しません',
        phoneNumber: (value) => {
          const format = /^\d{2,4}-\d{2,4}-\d{4}$/g
          return format.test(value) || '正しい電話番号ではありません'
        },
        typeCheckString: (value) => {
          const format = /^[a-zA-Z0-9]+$/g
          return format.test(value) || '入力できるのは半角英数字のみです'
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
  computed: {
    // 新規登録ボタン押せる状態   false
    // 新規登録ボタン押せない状態 true
    isValid() {
      // formのバリテーションルールをすべて突破している && 電話番号に被りがない
      const flag = this.form.valid && this.form.phoneNumberCheck

      // flag = false 新規登録ボタン押せる状態
      // flag = true  新規登録ボタン押せない状態
      return !flag
    },
  },
  watch: {
    // form.phone_numberの値がusersテーブルとofficesテーブルの被りがないかチェック
    // 被りがあったら、'登録済みの電話番号です。'を表示 エラーメッセージはapiのレスポンスを使用している
    async 'form.phone_number'() {
      // form.phone_numberの値が変化したらだたちにfalseにする
      // apiとの通信で、結果がNGでも一瞬だけtrueになってしまうため
      this.form.phoneNumberCheck = false
      const format = /^\d{2,4}-\d{2,4}-\d{4}$/g
      if (format.test(this.form.phone_number)) {
        let msg

        // apiへリクエスト
        // 200 case 'string'
        // 403 case 'object'
        try {
          const res = await this.checkPhoneNumber()
          switch (typeof res) {
            case 'string':
              msg = res
              this.form.phoneNumberCheck = true
              break
            case 'object':
              msg = res.response.data.message
              this.errors.push(msg)
              break
          }
        } catch (error) {
          // console.dir(error)
          return error
        }
      } else {
        this.errors.pop()
      }
    },
  },
  methods: {
    ...mapActions('catchErrorMsg', ['clearMsg']),
    async checkPhoneNumber() {
      const params = {
        phone_number: this.form.phone_number,
      }
      try {
        const res = await this.$axios.$get('check-phone-number', { params })
        return res.message
      } catch (error) {
        return error
      }
    },
    async sign_up() {
      try {
        const response = await this.$axios.$post(`specialists/users`, {
          name: this.form.name,
          email: this.form.email,
          password: this.form.password,
          password_confirmation: this.form.password_confirmation,
          phone_number: this.form.phone_number,
          post_code: this.form.post_code,
          address: this.form.address,
          confirm_success_url: `${this.$config.frontTopUrl}/specialists/login`,
        })
        this.$router.push('/specialists/users/send')
        return response
      } catch (error) {
        return error
      }
    },
  },
}
</script>
<style scoped>
.link-color {
  color: #f09c3c;
}

.form-wrapper {
  max-width: 520px;
}

.px-px-115 {
  padding: 0 115px;
}

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

.set-max-width-520 {
  max-width: 520px;
  min-width: 343px;
}
</style>

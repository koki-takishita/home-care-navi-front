<template>
  <v-card flat width="750" class="mx-auto mb-2 mt-4">
    <div class="px-4 pt-4 d-none d-sm-block mt-6">
      <h6 class="display-1 text-center text-h6 font-weight-black mt-4">
        登録情報変更
      </h6>
    </div>
    <div class="px-4 pt-4 d-flex justify-space-between d-sm-none">
      <h6 class="display-1 text-center text-h6 font-weight-black">
        登録情報変更
      </h6>
      <p class="mb-0 text-right">
        <NuxtLink
          to="/users/login"
          class="text-overline text-decoration-none link-color"
          >ログインはこちら</NuxtLink
        >
      </p>
    </div>

    <v-card-text class="mt-6">
      <div class="form-wrapper mx-auto">
        <v-form v-model="user.valid">
          <label class="font-color-gray font-weight-black text-caption"
            >お名前
            <v-text-field
              id="name"
              v-model="user.name"
              class="overwrite-fieldset-border-top-width mt-2 font-weight-regular"
              placeholder="田中 太郎"
              outlined
              dense
              height="44"
              :rules="[formValidates.required, formValidates.nameCountCheck]"
          /></label>

          <div class="mt-n-2">
            <label class="font-color-gray font-weight-black text-caption"
              >メールアドレス
              <v-text-field
                v-model="user.email"
                class="overwrite-fieldset-border-top-width mt-2 font-weight-regular set-max-width-520"
                outlined
                dense
                placeholder="例) homecarenavi@mail.com"
                type="email"
                height="44"
                :rules="[
                  formValidates.required,
                  formValidates.email,
                  formValidates.emailCountCheck,
                ]"
            /></label>
          </div>

          <div class="mt-n-2 password-field">
            <label class="font-color-gray font-weight-black text-caption"
              >新しいパスワード
              <v-text-field
                v-model="form.password"
                outlined
                dense
                class="overwrite-fieldset-border-top-width mt-2 font-weight-regular set-max-width-520"
                type="password"
                placeholder="半角英数字8文字以上"
                :rules="[formValidates.password, formValidates.passwordCheck]"
            /></label>
          </div>

          <div class="mt-n-2 password-confirmation-field">
            <label class="font-color-gray font-weight-black text-caption"
              >新しいパスワード確認
              <v-text-field
                v-model="form.password_confirmation"
                outlined
                dense
                class="overwrite-fieldset-border-top-width mt-2 font-weight-regular set-max-width-520"
                type="password"
                :rules="[
                  formValidates.confirmCheck,
                  formValidates.passwordCheck,
                ]"
            /></label>
          </div>

          <div class="mt-n-2 phnone-number-field">
            <label
              class="font-color-gray font-weight-black text-caption set-max-width-520"
              >電話番号
              <v-text-field
                v-model="user.phone_number"
                outlined
                dense
                placeholder="080-1234-5678"
                class="overwrite-fieldset-border-top-width mt-2 font-weight-regular set-max-width-520"
                type="tel"
                :rules="[formValidates.required, formValidates.phoneNumber]"
            /></label>
          </div>

          <div>
            <v-text-field
              v-model="user.post_code"
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
              v-model="user.address"
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
              class="error pa-0 text-h6 d-none d-sm-block"
              block
              :disabled="!user.valid || !passwordCheck"
              max-width="520"
              min-width="343"
              height="60"
              @click="edit"
              >変更する</v-btn
            >
            <v-btn
              class="error pa-0 ma-0 text-h6 d-block d-sm-none"
              block
              :disabled="!user.valid || !passwordCheck"
              max-width="520"
              min-width="343"
              height="48"
              @click="edit"
              >変更する</v-btn
            >
          </v-card-actions>
          <div class="mx-auto mt-4 text-center top-link mb-4">
            <a
              style="color: #f06364"
              class="text-decoration-none"
              href="/users/profile"
            >
              変更せずに戻る
            </a>
          </div>
        </v-form>
      </div>
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
        password: '',
        password_confirmation: '',
        // test: 'false',
      },
      user: {
        name: '',
        email: '',
        phone_number: '',
        post_code: '',
        address: '',
        valid: false,
      },
      formValidates: {
        nameCountCheck: (value) =>
          value.length <= 30 || '30文字以下で入力してください',
        required: (value) => !!value || '必須項目です',
        typeCheckString: (value) => {
          const format = /^[a-zA-Z0-9]+$/g
          return format.test(value) || '入力できるのは半角英数字のみです'
        },
        emailCountCheck: (value) =>
          value.length <= 255 || '255文字以下で入力してください',
        email: (value) => {
          const format =
            // eslint-disable-next-line no-control-regex
            /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0B\x0C\x0E-\x1F\x21\x23-\x5B\x5D-\x7F]|\\[\x01-\x09\x0B\x0C\x0E-\x7F])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0B\x0C\x0E-\x1F\x21-\x5A\x53-\x7F]|\\[\x01-\x09\x0B\x0C\x0E-\x7F])+)\])$/g
          return format.test(value) || '正しいメールアドレスを入力してください'
        },
        password: (value) => {
          if (value === '' || (value.length >= 8 && value.length <= 16)) {
            return true
          } else {
            return '8文字以上16文字未満で入力してください'
          }
        },
        // confirmCheck: (value) =>
        //   value.match(this.form.password) || 'パスワードが一致しません',
        confirmCheck: (value) => {
          if (value === '' || value === this.form.password) {
            return true
          } else {
            return 'パスワードが一致しません'
          }
        },
        phoneNumber: (value) => {
          const format = /^\d{2,4}-\d{2,4}-\d{4,5}$/g
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
  computed: {
    passwordCheck() {
      if (this.form.password === this.form.password_confirmation) {
        return true
      } else {
        return false
      }
    },
  },
  mounted() {
    this.getUsers()
  },
  methods: {
    ...mapActions('catchErrorMsg', ['clearMsg']),
    async edit() {
      if (this.form.password_confirmation === '') {
        this.form.password = localStorage.getItem('current_password')
      }
      try {
        const response = await this.$axios.$put(`customer`, {
          name: this.user.name,
          email: this.user.email,
          password: this.form.password,
          password_confirmation: this.form.password_confirmation,
          phone_number: this.user.phone_number,
          post_code: this.user.post_code,
          address: this.user.address,
          // 本番環境では変更しなければなりません
          redirect_url: 'http://localhost:8000/users/login',
        })
        if (window.localStorage.current_email === this.user.email) {
          this.$router.push('/users/profile')
        } else {
          this.$router.push('/users/edit_user_send')
        }
        return response
      } catch (error) {
        this.form.password = ''
        return error
      }
    },
    async getUsers() {
      try {
        const response = await this.$axios.$get(`users`)
        this.user = response
        localStorage.setItem('current_email', this.user.email)
      } catch (error) {
        return error
      }
    },
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

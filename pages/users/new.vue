<template>
  <v-card width="750" class="mx-auto mt-2">
    <v-card-title>
      <h1 class="display-1">新規登録</h1>
    </v-card-title>
    <v-card-text>
      <v-form v-model="form.valid">
        <v-text-field
          v-model="form.name"
          label="お名前"
          :rules="[formValidates.required]"
        />

        <v-text-field
          v-model="form.email"
          type="email"
          label="メールアドレス"
          :rules="[formValidates.required, formValidates.email]"
        />

        <v-text-field
          v-model="form.password"
          label="パスワード"
          type="password"
          :rules="[
            formValidates.required,
            formValidates.typeCheckString,
            formValidates.password,
          ]"
        />

        <v-text-field
          v-model="form.password_confirmation"
          label="パスワード確認"
          type="password"
          :rules="[
            formValidates.required,
            formValidates.typeCheckString,
            formValidates.confirmCheck,
          ]"
        />

        <v-text-field
          v-model="form.phone_number"
          maxlength="13"
          type="tel"
          label="電話番号"
          :rules="[formValidates.required, formValidates.phoneNumber]"
          placeholder="080-1234-5678"
          persistent-placeholder
        />

        <v-text-field
          v-model="form.post_code"
          label="郵便番号"
          :rules="[formValidates.required, formValidates.postCode]"
          placeholder="123-4567"
          persistent-placeholder
        />

        <v-text-field
          v-model="form.address"
          label="住所"
          :rules="[formValidates.required]"
        />

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
          return format.test(value) || '正しい郵便番号ではありません'
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

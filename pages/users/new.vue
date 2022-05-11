<template>
  <v-card width="750" class="mx-auto mt-2">
    <v-card-title>
      <h1 class="display-1">新規登録</h1>
    </v-card-title>
    <v-card-text>
      <v-form ref="form">
        <v-text-field v-model="name" :rules="nameRules" label="お名前" />
        <v-text-field
          v-model="email"
          :rules="emailRules"
          type="email"
          label="メールアドレス"
        />
        <v-text-field
          v-model="password"
          :rules="passwordRules"
          type="password"
          label="パスワード"
        />
        <v-text-field
          v-model="password_confirmation"
          :rules="password_confirmationRules"
          type="password"
          label="パスワード確認"
        />
        <v-text-field
          v-model="phone_number"
          :rules="phone_numberRules"
          maxlength="13"
          type="tel"
          label="電話番号"
        />
        <v-text-field
          v-model="post_code"
          :rules="post_codeRules"
          label="郵便番号"
        />
        <v-text-field v-model="address" :rules="addressRules" label="住所" />
        <v-card-actions>
          <v-btn class="info" @click="submit">新規登録</v-btn>
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
      match: 'Foobar',
      name: '',
      nameRules: [
        (value) => !!value || 'お名前は必須項目です',
        (value) => value.length <= 30 || '名前は30文字以下で入力してください',
      ],
      email: '',
      emailRules: [
        (value) => !!value || 'メールアドレスは必須項目です',
        (value) =>
          /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]+.[A-Za-z0-9]+$/.test(
            value
          ) || '有効なメールアドレスではありません',
        (value) =>
          value.length <= 256 ||
          'メールアドレスは255文字以下で入力してください',
      ],
      password: '',
      passwordRules: [
        (value) => !!value || 'パスワードは必須項目です',
        (value) =>
          value.length <= 32 ||
          'パスワードは8文字以上32文字以下で入力してください',
        (value) =>
          value.length >= 8 ||
          'パスワードは8文字以上32文字以下で入力してください',
      ],
      password_confirmation: '',
      password_confirmationRules: [
        (value) => !!value || 'パスワード確認は必須項目です',
        (value) => value === this.password || 'パスワードが一致していません',
      ],
      phone_number: '',
      phone_numberRules: [
        (value) => !!value || '電話番号は必須項目です',
        (value) => /^0\d{9,10}$/.test(value) || '有効な電話番号ではありません',
      ],
      post_code: '',
      post_codeRules: [
        (value) => !!value || '郵便番号は必須項目です',
        (value) => /^[0-9]{7}$/.test(value) || '有効な郵便番号ではありません',
      ],
      address: '',
      addressRules: [(value) => !!value || '住所は必須項目です'],
      response: '',
    }
  },
  methods: {
    ...mapActions('catchErrorMsg', ['clearMsg']),
    async submit() {
      if (this.$refs.form.validate()) {
        this.success = true
        try {
          const response = await this.$axios.$post(`users`, {
            name: this.name,
            email: this.email,
            password: this.password,
            password_confirmation: this.password_confirmation,
            phone_number: this.phone_number,
            post_code: this.post_code,
            address: this.address,
            confirm_success_url: 'http://localhost:8000',
          })
          this.clearMsg()
          this.$router.push('/users/send')
          return response
        } catch (error) {
          return error
        }
      } else {
        this.success = false
      }
    },
  },
}
</script>

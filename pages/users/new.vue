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
          :counter="max"
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
export default {
  layout: 'application',
  data() {
    return {
      match: 'Foobar',
      name: '',
      nameRules: [
        (v) => !!v || 'お名前は必須項目です',
        (v) => v.length <= 30 || '名前は30文字以下で入力してください',
      ],
      email: '',
      emailRules: [
        (v) => !!v || 'メールアドレスは必須項目です',
        (v) =>
          /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]+.[A-Za-z0-9]+$/.test(
            v
          ) || '有効なメールアドレスではありません',
        (v) =>
          v.length <= 256 || 'メールアドレスは255文字以下で入力してください',
      ],
      password: '',
      passwordRules: [
        (v) => !!v || 'パスワードは必須項目です',
        (v) =>
          v.length <= 32 || 'パスワードは8文字以上32文字以下で入力してください',
        (v) =>
          v.length >= 8 || 'パスワードは8文字以上32文字以下で入力してください',
      ],
      password_confirmation: '',
      password_confirmationRules: [
        (v) => !!v || 'パスワード確認は必須項目です',
        (v) => v === this.password || 'パスワードが一致していません',
      ],
      phone_number: '',
      phone_numberRules: [
        (v) => !!v || '電話番号は必須項目です',
        (v) =>
          /^(0[5-9]0[0-9]{8}|0[1-9][1-9][0-9]{7})$/.test(v) ||
          '有効な電話番号ではありません',
      ],
      post_code: '',
      post_codeRules: [
        (v) => !!v || '郵便番号は必須項目です',
        (v) => /^\d{7}$/.test(v) || '有効な郵便番号ではありません',
      ],
      address: '',
      addressRules: [(v) => !!v || '住所は必須項目です'],
      response: '',
    }
  },
  methods: {
    async submit() {
      if (this.$refs.form.validate()) {
        this.success = true
        this.response = await this.$http.$post(
          'http://localhost:3000/api/users',
          {
            user: {
              name: this.name,
              email: this.email,
              password: this.password,
              password_confirmation: this.password_confirmation,
              phone_number: this.phone_number,
              post_code: this.post_code,
              address: this.address,
            },
          }
        )
      } else {
        this.success = false
      }
    },
  },
}
</script>

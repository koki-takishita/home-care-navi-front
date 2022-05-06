<template>
  <v-card width="750" class="mx-auto mt-2">
    <v-card-title>
      <h1 class="display-1">ログイン</h1>
    </v-card-title>
    <v-card-text>
      <v-form>
        <v-text-field v-model="form.email" label="メールアドレス" />
        <v-text-field
          v-model="form.password"
          label="パスワード"
          type="password"
        />
        <v-card-actions>
          <v-btn class="info" @click="login()">ログイン</v-btn>
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
      form: {
        email: '',
        password: '',
      },
    }
  },
  methods: {
    // loginメソッドの呼び出し
    async login() {
      try {
        const response = await this.$auth.loginWith('local', {
          data: this.form,
        })
        console.log('try')
        console.log(response)
      } catch (error) {
        console.log('エラー')
        console.log(this.$auth)
        console.log(error)
      }
    },
  },
}
</script>

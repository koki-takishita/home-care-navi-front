<template>
  <v-card width="750" class="mx-auto mt-2">
    <v-card-title>
      <h1 class="display-1">ログイン</h1>
    </v-card-title>
    <v-card-text>
      <v-form>
        <v-text-field v-model="loginInfo.email" label="メールアドレス" />
        <v-text-field
          v-model="loginInfo.password"
          label="パスワード"
          type="password"
        />
        <v-card-actions>
          <v-btn class="info" @click.prevent="login">ログイン</v-btn>
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
      loginInfo: {
        email: '',
        password: '',
      },
    }
  },
  methods: {
    login() {
      this.$login(this.loginInfo)
    },
    logout() {
      this.$logout(this.loginInfo)
    },
  },
}
</script>

<template>
  <v-card width="750" class="mx-auto mt-2">
    <v-card-title>
      <h1 class="display-1">新規登録</h1>
    </v-card-title>
    <v-card-text>
      <v-form>
        <div v-for="item in errors" :key="item.id">
          <p>{{ item }}</p>
        </div>
        <v-text-field v-model="name" label="お名前" />
        <v-text-field v-model="email" type="email" label="メールアドレス" />
        <v-text-field v-model="password" type="password" label="パスワード" />
        <v-text-field
          v-model="password_confirmation"
          type="password"
          label="パスワード確認"
        />
        <v-text-field v-model="phone_number" type="tel" label="電話番号" />
        <v-text-field v-model="post_code" label="郵便番号" />
        <v-text-field v-model="address" label="住所" />
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
      name: '',
      email: '',
      password: '',
      password_confirmation: '',
      phone_number: '',
      post_code: '',
      address: '',
      errors: '',
    }
  },
  methods: {
    async submit() {
      try {
        const response = await this.$axios.$post('/api/users', {
          user: {
            name: this.name,
            email: this.email,
            password: this.password,
            password_confirmation: this.password_confirmation,
            phone_number: this.phone_number,
            post_code: this.post_code,
            address: this.address,
          },
        })
        console.log(response)
        window.location.href = 'http://localhost:8000/users/send'
      } catch (error) {
        this.errors = error.response.data
        console.log(error.response.data)
      }
    },
  },
}
</script>

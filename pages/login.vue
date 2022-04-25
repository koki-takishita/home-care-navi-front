<template>
  <v-card width="750" class="mx-auto mt-2">
    <v-card-title>
      <h1 class="display-1">ログイン</h1>
    </v-card-title>
    <v-card-text>
      <v-form>
        <v-text-field v-model="email" label="メールアドレス" />
        <v-text-field v-model="password" label="パスワード" type="password" />
        <v-card-actions>
          <v-btn class="info" @click="submit">ログイン</v-btn>
        </v-card-actions>
      </v-form>
    </v-card-text>
  </v-card>
</template>
<script>
export default {
  layout: 'application',
  /*
  async asyncData({ params, $http }) {
    const post = await $http.$post(`http://localhost:3000/api/users`,
      { user: { name: 'bar',
                email: 'foobar@example.com',
                password: 'foo',
                password_confirmation: 'foo',
                phone_number: 111,
                post_code: 111,
                address: "aiueo",
                user_type: 0,
              }
        }
     )
    return { post }
  },
*/
  data() {
    return {
      email: '',
      password: '',
    }
  },
  methods: {
    submit() {
      console.log(this.email, this.password)
    },
  },
}
</script>

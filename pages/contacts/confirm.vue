<template>
  <v-card width="750" class="mx-auto my-6">
    <v-card-title>
      <h4 class="display-1">入力内容をご確認ください。</h4>
    </v-card-title>
    <v-card-text>
      <v-form>
        <p>お名前</p>

        <p>返信用メールアドレス</p>

        <p>利用者区分</p>

        <p>お問い合わせ内容</p>

        <div class="text-center mt-12">
          <p>この内容で送信してよろしいですか？</p>
        </div>
        <v-card-actions>
          <v-btn to="/contacts/sucsess" class="info" block large @click="submit"
            >送信する</v-btn
          >
        </v-card-actions>
        <v-card-actions>
          <v-btn to="/contacts/new" class="info" block large @click="submit"
            >戻る</v-btn
          >
        </v-card-actions>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  layout: 'application',
  methods: {
    contact() {
      this.$router.push('/contacts/sucsses')
    },
  },
}
/*      methods: {
    async submit() {
      /* this.response = await this.$http.$get('http://localhost:3000/api/users') */

/*      this.response = await this.$http.$post(
        'http://localhost:3000/api/contacts',
        {
          user: {
            name: this.name,
            email: this.email,
          },
        }
        */
</script>

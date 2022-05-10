<template>
  <v-card width="750" class="mx-auto my-6">
    <v-card-title>
      <h4 class="display-1">お問い合わせ</h4>
    </v-card-title>
    <v-card-text>
      <v-form solo>
        <p>お名前</p>
        <v-text-field
          v-model="name"
          filled
          required="required"
          placeholder="田中太郎"
          solo
          label="田中太郎"
        />
        <p>返信用メールアドレス</p>
        <v-text-field
          v-model="email"
          required="required"
          placeholder="homecarenavi@mail.com"
          solo
          label="homecarenavi@mail.com"
        />
        <p>利用者区分</p>
        <v-row>
          <v-col class="d-flex" cols="12" sm="4">
            <v-select :items="items" label="ユーザー"></v-select>
          </v-col>
        </v-row>
        <p>お問い合わせ内容</p>
        <v-textarea
          outlined
          required="required"
          placeholder="入力してください"
          solo
          label="入力してください"
          type="password"
        />
        <v-card-actions>
          <v-btn to="/contacts/confirm" class="info" block large @click="submit"
            >この内容で問い合わせる</v-btn
          >
        </v-card-actions>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  layout: 'application',
  data: () => ({
    items: ['ユーザー', 'ケアマネージャー', '事業所', 'その他'],
  }),
  methods: {
    contact() {
      this.$router.push('/contacts/comfirm')
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

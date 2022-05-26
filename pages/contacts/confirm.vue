<template>
  <v-card width="750" class="mx-auto my-6">
    <v-card-title>
      <h4 class="display-1">入力内容をご確認ください。</h4>
    </v-card-title>
    <v-card-text>
      <v-form>
        <p>
          お名前<br />
          {{ name }}
        </p>

        <p>
          返信用メールアドレス<br />
          {{ email }}
        </p>
        <p>
          利用者区分<br />
          {{ types }}
        </p>

        <p>
          お問い合わせ内容<br />
          {{ content }}
        </p>

        <div class="text-center mt-12">
          <p>この内容で送信してよろしいですか？</p>
        </div>
        <v-card-actions>
          <v-btn to="/contacts/sucsess" class="info" block large>
            送信する
          </v-btn>
        </v-card-actions>
        <v-card-actions>
          <NuxtLink class="text-decoration-none text-senter" to="/contacts/new">
            もどる
          </NuxtLink>
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
      types: '',
      content: '',
    }
  },
  methods: {
    setParameter() {
      this.name = this.$route.query.name
      this.email = this.$route.query.email
      this.types = this.$route.query.types
      this.content = this.$route.query.content
    },
  },
  mounted() {
    this.setParameter()
  },
}
</script>

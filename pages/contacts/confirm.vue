<template>
  <v-card width="750" class="mx-auto my-2">
    <div class="px-4 pt-4 d-sm-block">
      <h4 class="display-1 text-h6 font-weight-black">
        入力内容をご確認ください
      </h4>
    </div>
    <v-card-text>
      <v-form>
        <p class="font-color-gray font-weight-black">お名前</p>
        <p>
          {{ name }}
        </p>

        <p class="font-color-gray font-weight-black">返信用メールアドレス</p>
        <p>
          {{ email }}
        </p>

        <p class="font-color-gray font-weight-black">利用者区分</p>
        <p>
          {{ types }}
        </p>

        <p class="font-color-gray font-weight-black">お問い合わせ内容</p>
        <p>
          {{ content }}
        </p>

        <div class="text-center mt-12">
          <p class="font-color-gray font-weight-black">
            この内容で送信してよろしいですか？
          </p>
        </div>
        <v-card-actions>
          <v-btn
            block
            large
            class="error text-h6 block"
            max-width="520"
            min-width="343"
            height="60"
            @click="SendSuccessPage(), test()"
          >
            <!--@click="SendSuccessPage()"-->
            送信する
          </v-btn>
        </v-card-actions>
        <div class="mx-auto mt-4 text-center top-link mb-4">
          <a
            style="color: #f06364"
            class="text-decoration-none"
            href="/contacts/new"
          >
            もどる
          </a>
        </div>
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

  mounted() {
    if (localStorage.getItem('name')) {
      this.name = localStorage.getItem('name')
    } else {
      this.name = ''
    }
    if (localStorage.getItem('email')) {
      this.email = localStorage.getItem('email')
    } else {
      this.email = ''
    }
    if (localStorage.getItem('types')) {
      this.types = localStorage.getItem('types')
    } else {
      this.types = ''
    }
    if (localStorage.getItem('content')) {
      this.content = localStorage.getItem('content')
    } else {
      this.content = ''
    }
  },
  methods: {
    async SendSuccessPage() {
      try {
        const response = await this.$axios.$post(`contacts`, {
          name: this.name,
          email: this.email,
          types: this.types,
          content: this.content,
        })
        this.$router.push('/contacts/success')
        return response
      } catch (error) {
        return error
      }
    },
    test() {
      localStorage.removeItem('name')
      localStorage.removeItem('email')
      localStorage.removeItem('types')
      localStorage.removeItem('content')
    },
  },
}
</script>

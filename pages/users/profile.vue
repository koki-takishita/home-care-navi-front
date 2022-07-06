<template>
  <v-col cols="12" md="8" lg="7" xl="7" class="mx-auto">
    <v-card flat width="750" class="mx-auto mb-2">
      <div class="px-4 pt-4 d-none d-sm-block">
        <div class="px-4 pt-4 d-flex justify-center relative">
          <div class="margin-0">
            <h6 class="display-1 text-center text-h6 font-weight-black">
              登録情報
            </h6>
          </div>
          <p class="absolute text-right right-0">
            <NuxtLink
              to="/users/password_confirmation"
              class="text-overline text-decoration-none link-color"
              >変更する</NuxtLink
            >
          </p>
        </div>
      </div>
      <div class="px-4 pt-4 d-flex justify-space-between d-sm-none">
        <h6 class="display-1 text-center text-h6 font-weight-black">
          登録情報
        </h6>
        <p class="mb-0 text-right">
          <NuxtLink
            to="/users/password_confirmation"
            class="text-overline text-decoration-none link-color"
            >変更する</NuxtLink
          >
        </p>
      </div>

      <v-card-text>
        <div class="font-color-gray font-weight-black text-caption mb-2">
          お名前
        </div>
        <div class="mb-6">{{ user.name }}</div>
        <div class="font-color-gray font-weight-black text-caption">
          メールアドレス
        </div>
        {{ user.email }}
        <div class="font-color-gray font-weight-black text-caption">
          パスワード
        </div>
        非表示
        <div class="font-color-gray font-weight-black text-caption">
          電話番号
        </div>
        {{ user.phone_number }}
        <div class="font-color-gray font-weight-black text-caption">住所</div>
        <div>〒{{ user.post_code }}</div>
        {{ user.address }}

        <div class="text-center">
          <v-btn
            href="/users/login"
            :width="120"
            :height="36"
            color="error"
            class="mr-2"
            text
            plain
            @click.prevent="$logout(logoutInfo)"
            >ログアウト</v-btn
          >
        </div>
      </v-card-text>
    </v-card>

    <v-card-text>
      <v-row justify="center">
        <v-btn
          depressed
          large
          color="white"
          class="mt-8 mb-10 text-center mx-auto"
          to="#"
          width="750"
        >
          <div class="delete-button font-weight-bold link-color">退会する</div>
        </v-btn>
      </v-row>
    </v-card-text>
  </v-col>
</template>
<script>
export default {
  layout: 'application',
  data() {
    return {
      logoutInfo: {
        redirectUrl: '/top',
        valid: false,
      },
      user: {
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        phone_number: '',
        post_code: '',
        address: '',
        valid: false,
      },
    }
  },
  created() {
    this.getUsers()
  },
  methods: {
    async sign_up() {
      try {
        const response = await this.$axios.$post(`users`, {
          name: this.user.name,
          email: this.user.email,
          password: this.user.password,
          password_confirmation: this.user.password_confirmation,
          phone_number: this.user.phone_number,
          post_code: this.user.post_code,
          address: this.user.address,
          confirm_success_url: 'http://localhost:8000/top',
        })
        this.$router.push('/users/send')
        return response
      } catch (error) {
        return error
      }
    },
    async getUsers() {
      try {
        const response = await this.$axios.$get(`users`)
        this.user = response
      } catch (error) {
        return error
      }
    },
  },
}
</script>
<style scoped>
.link-color {
  color: #f06364;
}

.margin-115 {
  margin-left: 115px;
}

.margin-0 {
  margin: 0;
}

.absolute {
  position: absolute;
}

.right-0 {
  right: 32px;
}
</style>

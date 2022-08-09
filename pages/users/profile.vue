<template>
  <v-col cols="12" md="8" lg="7" xl="7" class="mx-auto">
    <v-card flat width="750" class="mx-auto mb-2">
      <div class="px-4 pt-4 d-none d-sm-block mb-6">
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
      <div class="px-4 pt-4 d-flex justify-space-between d-sm-none mb-6">
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

      <v-card-text class="ml-2">
        <div class="font-color-gray font-weight-black text-caption mb-2">
          お名前
        </div>
        <div class="mb-6">{{ user.name }}</div>
        <div class="font-color-gray font-weight-black text-caption mb-2">
          メールアドレス
        </div>
        <div class="mb-6">
          {{ user.email }}
        </div>
        <div class="font-color-gray font-weight-black text-caption mb-2">
          パスワード
        </div>
        <div class="mb-6">非表示</div>
        <div class="font-color-gray font-weight-black text-caption mb-2">
          電話番号
        </div>
        <div class="mb-6">
          {{ user.phone_number }}
        </div>
        <div class="font-color-gray font-weight-black text-caption mb-2">
          住所
        </div>
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

    <v-card
      flat
      link
      height="40"
      width="750"
      class="pt-2 text-center mx-auto mb-2"
      to="/users/exit"
    >
      <div class="delete-button font-weight-bold link-color">退会する</div>
    </v-card>
  </v-col>
</template>
<script>
export default {
  layout: 'application',
  async asyncData({ $axios }) {
    try {
      const res = await $axios.$get(`users`)
      return {
        user: res,
      }
    } catch (error) {
      return error
    }
  },
  data() {
    return {
      logoutInfo: {
        redirectUrl: '/top',
        valid: false,
      },
    }
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

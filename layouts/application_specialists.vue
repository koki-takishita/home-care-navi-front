<template>
  <v-app>
    <v-divider color="#F09C3C" class="ctr-p-1"></v-divider>
    <div class="d-none d-md-flex">
      <v-app-bar :color="color_w" flat>
        <v-container>
          <v-row>
            <v-col md="4" class="d-flex align-center">
              <div class="red--text">
                <p class="ma-0">
                  <img
                    class=""
                    src="~/assets/images/header-icon.svg"
                    width="157.44"
                    height="28"
                    @click="topPage"
                  />
                  <img
                    class="mb-1"
                    src="~/assets/images/staff-header-icon.svg"
                    width="36"
                    height="16"
                    @click="topPage"
                  />
                </p>
              </div>
            </v-col>
            <v-col md="8" class="ml-auto">
              <div class="d-flex justify-end">
                <div class="red--text line-style">
                  <v-btn
                    href="/specialists/login"
                    :width="120"
                    :height="36"
                    outlined
                    :color="color_g"
                    >ログイン</v-btn
                  >
                  <v-btn
                    href="new"
                    :width="120"
                    :height="36"
                    color="warning"
                    depressed
                    >新規登録</v-btn
                  >
                </div>
              </div>
            </v-col>
          </v-row>
        </v-container>
      </v-app-bar>
    </div>

    <div class="d-md-none d-sm-flex">
      <v-app-bar class="py-0" :color="color_w" max-height="52">
        <v-row>
          <v-col sm="6">
            <v-toolbar-title class="fill-height d-flex">
              <div>
                <img
                  class="mt-2"
                  src="~/assets/images/header-icon.svg"
                  width="157.44"
                  height="28"
                />
                <img
                  class="mb-1"
                  src="~/assets/images/staff-header-icon.svg"
                  width="36"
                  height="16"
                  @click="topPage"
                />
              </div>
            </v-toolbar-title>
          </v-col>
          <v-col sm="6">
            <div class="d-flex">
              <v-app-bar-nav-icon
                class="ml-auto"
                color="#AEB5B2"
                @click="drawer = true"
              ></v-app-bar-nav-icon>
            </div>
          </v-col>
        </v-row>
      </v-app-bar>
    </div>
    <v-navigation-drawer
      v-model="drawer"
      width="296"
      color="#FFFFFF"
      absolute
      temporary
    >
      <div>
        <v-card height="198" color="#F5F7F7" :tile="tile" outlined>
          <v-list-item>
            <v-list-item-content class="text-center pa-0">
              <v-list-item-title class="header-style ma-0 mt-6">
                <img
                  src="~/assets/images/header-icon.svg"
                  width="137.76"
                  height="28"
                />
                <img
                  class="mb-1"
                  src="~/assets/images/staff-header-icon.svg"
                  width="36"
                  height="16"
                  @click="topPage"
                />
              </v-list-item-title>
              <div class="header-style mt-3 text-caption ma-0">ゲストさん</div>
              <div class="d-flex justify-center ma-0 mt-6">
                <v-btn
                  href="/specialists/login"
                  :width="120"
                  :height="36"
                  :color="color_g"
                  outlined
                  class="mr-2"
                  >ログイン</v-btn
                >
                <v-btn
                  color="warning"
                  href="new"
                  :width="120"
                  :height="36"
                  depressed
                  >新規登録</v-btn
                >
              </div>
              <div class="mt-3">
                <NuxtLink
                  to="/users/login"
                  class="link-style text-overline mr-5 text-decoration-none mr-5"
                  >利用者の方はこちら</NuxtLink
                >
              </div>
            </v-list-item-content>
          </v-list-item>
        </v-card>
      </div>
    </v-navigation-drawer>

    <!-- アプリケーションのコンポーネントに基づいてコンテンツのサイズを決定 -->
    <v-main class="color-gray">
      <!-- アプリケーションに適切なgutterを提供 -->
      <v-container fluid class="pa-0">
        <!-- vue-routerを使用する場合 -->
        <!--<router-view></router-view>-->
        <ErrorMsg />
        <Nuxt />
      </v-container>
    </v-main>

    <v-footer :color="color_w">
      <v-container class="lighten-5">
        <div class="d-none d-md-flex">
          <v-row>
            <v-col md="4">
              <div class="d-flex justify-start">
                <p
                  class="line-height black--text text-subtitle-2 ma-0 mr-6 d-inline"
                >
                  <span class="font-weight-bold">ホームケアナビ</span>
                </p>
                <p class="line-height text-10 ma-0">
                  <span class="copy-right d-inline">&copy; hogehoge</span>
                </p>
              </div>
            </v-col>
            <v-col md="8" class="ml-auto text-11">
              <div class="d-flex justify-end">
                <div>
                  <NuxtLink
                    to="#"
                    class="text-overline mr-5 link-style text-decoration-none"
                    >プライバシーポリシー</NuxtLink
                  >
                  <NuxtLink
                    to="#"
                    class="text-overline mr-5 link-style text-decoration-none"
                    >利用規約</NuxtLink
                  >
                  <NuxtLink
                    to="#"
                    class="text-overline link-style text-decoration-none"
                    >お問い合わせ</NuxtLink
                  >
                </div>
              </div>
            </v-col>
          </v-row>
        </div>
        <div class="d-md-none d-sm-block">
          <div>
            <div class="d-flex justify-center">
              <NuxtLink
                to="#"
                class="text-overline mr-5 link-style text-decoration-none"
                >プライバシーポリシー</NuxtLink
              >
              <NuxtLink
                to="#"
                class="text-overline mr-5 link-style text-decoration-none"
                >利用規約</NuxtLink
              >
              <NuxtLink
                to="#"
                class="text-overline link-style text-decoration-none"
                >お問い合わせ</NuxtLink
              >
            </div>
            <div class="d-flex justify-space-between">
              <p
                class="line-height black--text text-subtitle-2 ma-0 mr-6 d-inline"
              >
                <span class="font-weight-bold">ホームケアナビ</span>
              </p>
              <p class="line-height text-10 ma-0">
                <span class="copy-right d-inline">&copy; hogehoge</span>
              </p>
            </div>
          </div>
        </div>
      </v-container>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  layout: 'top',
  data() {
    return {
      justify: [],
      color_w: '#FFFFFF',
      color_y: '#F09C3C',
      color_g: '#6D7570',
      color_r: '#F06364',
      drawer: false,
      group: null,
      tile: false,
    }
  },
  methods: {
    topPage() {
      window.location.href = 'http://localhost:8000/top'
    },
  },
}
</script>
<style scoped>
.text-10 {
  font-size: 10px;
}

.line-height {
  line-height: 32px;
}

.line-height-48 {
  line-height: 48px;
  color: #aeb5b2;
}

.copy-right {
  vertical-align: baseline;
  color: #98a6b5;
}

.link-style {
  color: #f09c3c;
}

.btn-style {
  vertical-align: baseline;
}

.header-style {
  color: #6d7570;
}

.navi-style {
  color: #2e3331;
}

.min-height-20 {
  min-height: 20px;
}

.ctr-p-1 {
  padding-top: 1px;
}

.color-gray {
  background-color: #d9dede;
}
</style>

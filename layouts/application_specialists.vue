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
                <div v-if="$auth.loggedIn">
                  <div class="mr-8 d-flex align-center">
                    <div class="text-center mr-7">
                      <v-menu offset-y>
                        <template #activator="{ on, attrs }">
                          <v-btn
                            id="menu"
                            text
                            color="#808080"
                            dark
                            v-bind="attrs"
                            v-on="on"
                          >
                            メニュー
                            <v-icon>mdi-menu-down</v-icon>
                          </v-btn>
                        </template>
                        <v-list>
                          <div v-if="office !== true">
                            <v-list-item to="/specialists/office/new">
                              <v-list-item-title
                                class="header-style text-overline text-decoration-none mr-5"
                              >
                                事業所登録</v-list-item-title
                              >
                            </v-list-item>
                          </div>
                          <div v-else>
                            <v-list-item to="/specialists/office/edit">
                              <v-list-item-title
                                class="header-style text-overline text-decoration-none mr-5"
                              >
                                事業所情報編集</v-list-item-title
                              >
                            </v-list-item>
                            <v-list-item to="/specialists/office/staffs?page=1">
                              <v-list-item-title
                                class="header-style text-overline text-decoration-none mr-5"
                              >
                                スタッフ情報</v-list-item-title
                              >
                            </v-list-item>
                            <v-list-item to="/specialists/office/thanks">
                              <v-list-item-title
                                class="header-style text-overline text-decoration-none mr-5"
                              >
                                お礼一覧</v-list-item-title
                              >
                            </v-list-item>
                            <v-list-item
                              to="/specialists/office/appointments?page=1"
                            >
                              <v-list-item-title
                                class="header-style text-overline text-decoration-none mr-5"
                              >
                                予約状況確認
                              </v-list-item-title>
                            </v-list-item>
                            <v-list-item
                              to="/specialists/office/care-recipients?page=1"
                            >
                              <v-list-item-title
                                class="header-style text-overline text-decoration-none mr-5"
                              >
                                利用者情報管理</v-list-item-title
                              >
                            </v-list-item>
                          </div>
                          <v-list-item>
                            <v-list-item-title>
                              <NuxtLink
                                to="#"
                                class="header-style text-overline text-decoration-none mr-5"
                                >登録情報</NuxtLink
                              ></v-list-item-title
                            >
                          </v-list-item>
                        </v-list>
                      </v-menu>
                    </div>
                    <div class="red--text line-style">
                      <v-btn
                        id="header-logout"
                        :width="120"
                        :height="36"
                        color="warning"
                        depressed
                        @click.prevent="$logout(logoutInfo)"
                        >ログアウト</v-btn
                      >
                    </div>
                  </div>
                </div>

                <div v-else class="red--text line-style">
                  <v-btn
                    id="header-login"
                    href="/specialists/login"
                    :width="120"
                    :height="36"
                    outlined
                    :color="color_g"
                    >ログイン</v-btn
                  >
                  <v-btn
                    id="header-signup"
                    href="/specialists/users/new"
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
              <div
                v-if="$auth.loggedIn"
                class="d-flex justify-center ma-0 mt-6"
              >
                <v-btn
                  id="header-logout"
                  href="/users/login"
                  :width="120"
                  :height="36"
                  color="warning"
                  class="mr-2"
                  depressed
                  @click.prevent="$logout(logoutInfo)"
                  >ログアウト</v-btn
                >
              </div>
              <div v-else class="d-flex justify-center ma-0 mt-6">
                <v-btn
                  id="header-login"
                  href="/specialists/login"
                  :width="120"
                  :height="36"
                  :color="color_g"
                  outlined
                  class="mr-2"
                  >ログイン</v-btn
                >
                <v-btn
                  id="header-signup"
                  color="warning"
                  href="/specialists/users/new"
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
                  >一般の方はこちら</NuxtLink
                >
              </div>
            </v-list-item-content>
          </v-list-item>
        </v-card>
        <v-list v-if="$auth.loggedIn" nav dense class="pa-0">
          <v-list-item-group v-model="group">
            <div v-if="office !== true">
              <v-list-item
                class="pa-0 ma-0 px-6 py-4 min-height-20"
                to="/specialists/office/new"
              >
                <v-list-item-title
                  class="text-decoration-none text-body-2 navi-style"
                >
                  事業所登録
                </v-list-item-title>
                <v-list-item-icon class="ma-0 mt-2">
                  <v-icon rage :color="color_g">mdi-chevron-right</v-icon>
                </v-list-item-icon>
              </v-list-item>
              <v-divider color="#D9DEDE"></v-divider>
            </div>
            <div v-else>
              <v-list-item
                class="pa-0 ma-0 px-6 py-4 min-height-20"
                to="/specialists/office/edit"
              >
                <v-list-item-title
                  class="text-decoration-none text-body-2 navi-style"
                >
                  事業所情報編集
                </v-list-item-title>
                <v-list-item-icon class="ma-0 mt-2">
                  <v-icon rage :color="color_g">mdi-chevron-right</v-icon>
                </v-list-item-icon>
              </v-list-item>
              <v-divider color="#D9DEDE"></v-divider>
              <v-list-item
                class="pa-0 ma-0 px-6 py-4 min-height-20"
                to="/specialists/office/staffs?page=1"
              >
                <v-list-item-title
                  class="text-decoration-none text-body-2 navi-style"
                >
                  スタッフ情報
                </v-list-item-title>
                <v-list-item-icon class="ma-0 mt-2">
                  <v-icon rage :color="color_g">mdi-chevron-right</v-icon>
                </v-list-item-icon>
              </v-list-item>
              <v-divider color="#D9DEDE"></v-divider>
              <v-list-item
                class="pa-0 ma-0 px-6 py-4 min-height-20"
                to="/specialists/office/thanks"
              >
                <v-list-item-title
                  class="text-decoration-none text-body-2 navi-style"
                >
                  お礼一覧
                </v-list-item-title>
                <v-list-item-icon class="ma-0 mt-2">
                  <v-icon rage :color="color_g">mdi-chevron-right</v-icon>
                </v-list-item-icon>
              </v-list-item>
              <v-divider color="#D9DEDE"></v-divider>
              <v-list-item
                class="pa-0 ma-0 px-6 py-4 min-height-20"
                to="/specialists/office/appointments?page=1"
              >
                <v-list-item-title
                  class="text-decoration-none text-body-2 navi-style"
                >
                  予約状況確認
                </v-list-item-title>
                <v-list-item-icon class="ma-0 mt-2">
                  <v-icon rage :color="color_g">mdi-chevron-right</v-icon>
                </v-list-item-icon>
              </v-list-item>
              <v-divider color="#D9DEDE"></v-divider>
              <v-list-item
                class="pa-0 ma-0 px-6 py-4 min-height-20"
                to="/specialists/office/care-recipients?page=1"
              >
                <v-list-item-title
                  class="text-decoration-none text-body-2 navi-style"
                >
                  利用者情報管理
                </v-list-item-title>
                <v-list-item-icon class="ma-0 mt-2">
                  <v-icon rage :color="color_g">mdi-chevron-right</v-icon>
                </v-list-item-icon>
              </v-list-item>
              <v-divider color="#D9DEDE"></v-divider>
            </div>
            <v-list-item class="pa-0 ma-0 px-6 py-4 min-height-20">
              <v-list-item-title>
                <NuxtLink
                  to="#"
                  class="text-decoration-none text-body-2 navi-style"
                  >登録情報</NuxtLink
                >
              </v-list-item-title>
              <v-list-item-icon class="ma-0 mt-2">
                <v-icon rage :color="color_g">mdi-chevron-right</v-icon>
              </v-list-item-icon>
            </v-list-item>
            <v-divider color="#D9DEDE"></v-divider>
          </v-list-item-group>
        </v-list>
      </div>
    </v-navigation-drawer>

    <!-- アプリケーションのコンポーネントに基づいてコンテンツのサイズを決定 -->
    <v-main class="color-gray">
      <!-- アプリケーションに適切なgutterを提供 -->
      <v-container fluid class="pa-0 pt-10">
        <!-- vue-routerを使用する場合 -->
        <!--<router-view></router-view>-->
        <ErrorMsg class="flash-msg-component" />
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
                    to="/specialists/privacy_policy"
                    class="text-overline mr-3 link-style text-decoration-none"
                    >プライバシーポリシー</NuxtLink
                  >
                  <NuxtLink
                    to="/specialists/terms"
                    class="text-overline mr-3 link-style text-decoration-none"
                    >利用規約</NuxtLink
                  >
                  <NuxtLink
                    to="/specialists/contacts/new"
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
                to="/specialists/privacy_policy"
                class="text-overline mr-3 link-style text-decoration-none"
                >プライバシーポリシー</NuxtLink
              >
              <NuxtLink
                to="/specialists/terms"
                class="text-overline mr-3 link-style text-decoration-none"
                >利用規約</NuxtLink
              >
              <NuxtLink
                to="/specialists/contacts/new"
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
  middleware: 'authenticateSpecialist',
  data() {
    return {
      logoutInfo: {
        redirectUrl: '/specialists/login',
        valid: false,
      },
      justify: [],
      color_w: '#FFFFFF',
      color_y: '#F09C3C',
      color_g: '#6D7570',
      color_r: '#F06364',
      drawer: false,
      group: null,
      tile: false,
      office: '',
      office_id: '',
    }
  },
  watch: {
    $route() {
      if (typeof window.localStorage.office_data !== 'undefined') {
        this.office = true
      } else {
        this.office = false
      }
    },
  },
  mounted() {
    if (typeof window.localStorage.office_data !== 'undefined') {
      this.office = true
    } else {
      this.office = false
    }
  },

  methods: {
    topPage() {
      this.$auth.loggedIn ? this.goAppointmentsPage() : this.goLoginPage()
    },
    goLoginPage() {
      this.$router.push('/specialists/login')
    },
    goAppointmentsPage() {
      // TODO ルーティングを specialists/office/appointmentsに変える
      this.$router.push(`/specialists/office/appointments`)
    },
  },
}
</script>
<style scoped>
/* stylelint-disable */
.flash-msg-component {
  position: absolute;
  top: -60px;
  left: 50%;
  transform: translateX(-50%);
  -webkit-transform: translateX(-50%);
  -ms-transform: translateX(-50%);
  z-index: 999;
}
/* stylelint-enable */

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
  background-color: #f5f7f7;
}
</style>

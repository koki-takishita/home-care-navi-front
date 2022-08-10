<template>
  <v-card flat width="750" class="mx-auto mb-2 mt-8">
    <div class="px-4 pt-4 d-none d-sm-block mt-8">
      <h6 class="display-1 text-center text-h6 font-weight-black mt-4">退会</h6>
    </div>
    <div class="px-4 pt-4 d-flex justify-space-between d-sm-none">
      <h6 class="display-1 text-center text-h6 font-weight-black ml-4">退会</h6>
    </div>

    <v-card-text class="mt-2">
      <div class="form-wrapper mx-auto">
        <div class="px-4 pt-4 d-none d-sm-block mt-6 mb-8 text-center">
          <div class="mb-8">
            <p class="grey--text text--darken-4">
              退会後はこれまでの予約情報などは全て削除されます。
            </p>
          </div>
          <div class="mb-2">
            <p class="grey--text text--darken-4">
              また、以下の機能が使用できなくなります。
            </p>
          </div>
          <div class="grey--text text--darken-4">
            <li>ブックマーク</li>
            <li>予約</li>
            <li>お礼投稿</li>
          </div>
        </div>
        <div class="d-flex d-sm-none">
          <div class="px-4 mt-6 mb-8">
            <div class="mb-8">
              <p class="grey--text text--darken-4">
                退会後はこれまでの予約情報などは全て削除されます。
              </p>
            </div>
            <div class="mb-2">
              <p class="grey--text text--darken-4">
                また、以下の機能が使用できなくなります。
              </p>
            </div>
            <div class="grey--text text--darken-4">
              <li>ブックマーク</li>
              <li>予約</li>
              <li>お礼投稿</li>
            </div>
          </div>
        </div>

        <v-card-actions class="pa-0">
          <v-dialog v-model="dialog" persistent max-width="300">
            <template #activator="{ on, attrs }">
              <v-btn
                class="error pa-0 text-h6 d-none d-sm-block"
                block
                max-width="520"
                min-width="343"
                height="60"
                v-bind="attrs"
                v-on="on"
                >退会する</v-btn
              >
              <v-btn
                class="error pa-0 ma-0 text-h6 d-block d-sm-none"
                block
                max-width="520"
                min-width="343"
                height="48"
                v-bind="attrs"
                v-on="on"
                >退会する</v-btn
              >
            </template>
            <v-card class="pa-3 pt-10">
              <p class="text-center mb-8">本当に退会しますか？</p>
              <v-row dense>
                <v-col cols="5" @click="dialog = false">
                  <v-btn block outlined :color="lightGray"
                    ><font class="font-weight-black" :color="red"
                      >キャンセル</font
                    ></v-btn
                  >
                </v-col>
                <v-col cols="7">
                  <v-btn block outlined class="error" @click="deleteUser"
                    ><font class="font-weight-black" color="white"
                      >退会する</font
                    ></v-btn
                  >
                </v-col>
              </v-row>
            </v-card>
          </v-dialog>
        </v-card-actions>
        <div class="mx-auto mt-4 text-center top-link mb-4">
          <nuxt-link
            style="color: #f06364"
            class="text-decoration-none"
            to="/users/profile"
          >
            退会せずに戻る
          </nuxt-link>
        </div>
      </div>
    </v-card-text>
  </v-card>
</template>
<script>
export default {
  layout: 'application',
  data() {
    return {
      dialog: false,
    }
  },
  computed: {
    red() {
      return '#F06364'
    },
    gray() {
      return '#6D7570'
    },
    lightGray() {
      return '#D9DEDE'
    },
  },
  methods: {
    async deleteUser() {
      try {
        await this.$axios.$delete(`users`)
        this.$auth.reset()
        this.$router.push(`/top`)
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

.form-wrapper {
  max-width: 520px;
}

.px-px-115 {
  padding: 0 115px;
}

.set-width-343 {
  width: 343px;
}

.set-height-44 {
  height: 44px;
}

/* stylelint-disable */
.v-text-field--outlined >>> fieldset {
  border-color: #d9dede;
}

.post-form >>> fieldset {
  width: 107px;
}

.post-form >>> .v-text-field__slot {
  max-width: 82px;
}

.mt-n-2 {
  margin-top: -2px;
}

.font-color-gray {
  color: #6d7570;
}

::v-deep input::placeholder {
  color: #d9dede !important;
}

.set-max-width-520 {
  max-width: 520px;
  min-width: 343px;
}
</style>

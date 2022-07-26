<template>
  <v-card outlined class="thank-card px-2 pt-3 pb-4">
    <v-card-title class="font-weight-black text-h6 pa-0">{{
      ReadOffice.name
    }}</v-card-title>
    <div class="d-flex align-center mt-2">
      <v-avatar>
        <img :src="imageUrl" />
      </v-avatar>
      <div class="staff-name ml-2 font-weight-black text-subtitle-2">
        {{ staffName }}
      </div>
    </div>
    <v-divider class="my-4"></v-divider>
    <div class="thank-comment-wrapper">
      <div class="d-flex justify-space-between">
        <p class="mb-0 font-weight-black">
          <font :color="gray">お礼の内容</font>
        </p>
        <p>
          <font :color="gray">{{ updateDate | created_at }}</font>
        </p>
      </div>
      <div class="thank-comment mb-4">
        <p class="mb-0">{{ ReadThank.comments }}</p>
      </div>
    </div>
    <v-row dense>
      <v-col cols="4">
        <v-dialog v-model="dialog" persistent max-width="300">
          <template #activator="{ on, attrs }">
            <v-btn
              block
              outlined
              height="40"
              :color="lightGray"
              v-bind="attrs"
              v-on="on"
              ><font class="font-weight-black" :color="red">削除</font>
            </v-btn>
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
                <v-btn block outlined class="error" @click="deleteThank"
                  ><font class="font-weight-black" color="white"
                    >削除する</font
                  ></v-btn
                >
              </v-col>
            </v-row>
          </v-card>
        </v-dialog>
      </v-col>
      <v-col cols="8">
        <v-btn block depressed height="40" class="error" @click="goEditPage"
          ><font class="font-weight-black">お礼を編集する</font>
        </v-btn>
      </v-col>
    </v-row>
  </v-card>
</template>
<script>
export default {
  props: {
    thank: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      dialog: false,
    }
  },
  computed: {
    ReadThank() {
      return this.thank
    },
    ReadStaff() {
      return this.ReadThank.staff
    },
    ReadOffice() {
      return this.ReadStaff.office
    },
    staffName() {
      return `${this.ReadStaff.name} さんへのお礼`
    },
    updateDate() {
      return this.ReadThank.created_at
    },
    imageUrl() {
      return (
        this.ReadStaff.image_url || require('~/assets/images/account_icon.svg')
      )
    },
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
    goEditPage() {
      const id = this.ReadThank.id
      this.$router.push(`thanks/${id}/edit`)
    },
    async deleteThank() {
      const id = this.ReadThank.id
      try {
        await this.$axios.$delete(`thanks/${id}`)
        this.dialog = false
        this.$emit('clickDeleteBtn')
      } catch (error) {
        // console.log(error)
        return error
      }
    },
  },
}
</script>
<style scoped>
.thank-comment {
  height: 80px;
}

.thank-card {
  border: 0;
}
</style>

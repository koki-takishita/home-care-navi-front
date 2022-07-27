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
        <v-btn block outlined height="40" :color="lightGray"
          ><font class="font-weight-black" :color="red">削除</font></v-btn
        >
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

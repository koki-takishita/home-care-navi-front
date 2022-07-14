<template>
  <v-card class="mt-6" tile height="599">
    <v-card id="staff-card" outlined class="d-flex justify-space-between pa-4">
      <v-card-title class="pa-0 font-weight-black">スタッフ紹介</v-card-title>
      <ThankBackLink
        class="my-auto"
        :object="ReadOffice"
        :text="linkText"
        @movePage="moveThankNewPage"
      />
    </v-card>
  </v-card>
</template>

<script>
export default {
  props: {
    office: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ReadOffice() {
      return this.office
    },
    linkText() {
      return 'お礼を投稿する'
    },
  },
  methods: {
    moveThankNewPage() {
      this.$auth.loggedIn ? this.thankPagePath() : this.shouldLoginAlert()
    },
    thankPagePath() {
      this.$router.push(`/offices/${this.ReadOffice.id}/thanks/new`)
    },
    shouldLoginAlert() {
      alert('お礼をするにはログインしてください')
    },
  },
}
</script>
<style scoped>
#staff-card {
  border: 0;
}
</style>

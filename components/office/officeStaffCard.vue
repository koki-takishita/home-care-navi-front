<template>
  <v-card class="mt-6 overflow-auto" tile max-height="600">
    <v-card id="staff-card" outlined class="d-flex justify-space-between pa-4">
      <v-card-title class="pa-0 font-weight-black">スタッフ紹介</v-card-title>
      <ThankBackLink
        v-if="ReadStaffs.length"
        class="my-auto"
        :object="ReadOffice"
        :text="linkText"
        @movePage="moveThankNewPage"
      />
      <p v-else class="my-auto">スタッフはまだ登録されていません</p>
    </v-card>
    <template v-for="staff in ReadStaffs">
      <StaffIntroductionCard :key="staff.id" class="pa-4 pt-0" :staff="staff" />
    </template>
  </v-card>
</template>

<script>
export default {
  props: {
    office: {
      type: Object,
      required: true,
    },
    staffs: {
      type: Array,
      default: null,
    },
  },
  computed: {
    ReadOffice() {
      return this.office
    },
    ReadStaffs() {
      return this.staffs
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
      alert('ログインをする必要があります')
    },
  },
}
</script>
<style scoped>
#staff-card {
  border: 0;
}
</style>

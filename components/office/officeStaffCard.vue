<template>
  <v-card class="mt-6 overflow-auto" tile max-height="600">
    <v-card id="staff-card" outlined class="d-flex justify-space-between pa-4">
      <v-card-title class="pa-0 font-weight-black">スタッフ紹介</v-card-title>
      <ThankBackLink
        class="my-auto"
        :object="ReadOffice"
        :text="linkText"
        @movePage="moveThankNewPage"
      />
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
      this.$router.push(`/offices/${this.ReadOffice.id}/thanks/new`)
    },
  },
}
</script>
<style scoped>
#staff-card {
  border: 0;
}
</style>

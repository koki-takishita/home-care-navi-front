<template>
  <v-container class="pt-10">
    <v-row>
      <v-col cols="12" sm="12" md="6">
        <office-images-card :images="officeImages" />
        <office-data-card-sp
          :office-id="office.id"
          :office="office"
          :staffs="staffs"
        />
        <office-detail-card :office="office" />
        <office-staff-card :office="office" :staffs="staffs" />
      </v-col>
      <v-col cols="12" sm="12" md="6">
        <office-data-card-pc
          :office-id="office.id"
          :office="office"
          :staffs="staffs"
        />
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  layout: 'application',
  async asyncData({ $axios, params }) {
    const id = params.id
    try {
      const res = await $axios.$get(`offices/${id}`)
      return {
        office: res.office,
        officeImages: res.officeImages,
        staffs: res.staffs,
      }
    } catch (error) {
      // console.log(error)
      return error
    }
  },
}
</script>

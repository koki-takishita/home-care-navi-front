<template>
  <v-container class="pt-10">
    <v-row>
      <v-col cols="12" sm="12" md="6">
        <office-images-card :images="office.images" />
        <office-data-card-sp
          :office-id="office_id"
          :office="office.office"
          :staffs="office.staffs"
        />
        <office-detail-card :office="office.office" />
        <office-staff-card :office="office.office" />
      </v-col>
      <v-col cols="12" sm="12" md="6">
        <office-data-card-pc
          :office-id="office_id"
          :office="office.office"
          :staffs="office.staffs"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  layout: 'application',
  async asyncData({ $axios, params }) {
    let officeArray = []
    const id = `${params.id}`
    await $axios.$get(`offices/${id}`).then((res) => (officeArray = res))
    return { office: officeArray }
  },
  data() {
    return {
      office_id: this.$route.params.id,
    }
  },
}
</script>

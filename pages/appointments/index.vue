<template>
  <v-col cols="12" md="8" lg="7" xl="7" class="mx-auto">
    <h3 class="pb-3">予約履歴</h3>
    <v-row>
      <v-col
        v-for="(appointment, index) in appointments"
        :key="index"
        cols="12"
        md="6"
        class="px-0 pb-0 pt-0"
        @click="moveShow(appointment.office)"
      >
        <AppointmentOfficeCard
          :appointment="appointment"
          :office="appointment.office"
        />
      </v-col>
      <v-col v-if="appointments.length === 0">予約履歴はありません</v-col>
    </v-row>
  </v-col>
</template>

<script>
export default {
  layout: 'application',
  middleware: 'authentication',
  async asyncData({ $axios }) {
    try {
      const res = await $axios.$get(`appointments`)
      return {
        appointments: res.appointment,
      }
    } catch (error) {
      return error
    }
  },
  methods: {
    moveShow(office) {
      this.$router.push({ path: `/offices/${office.id}` })
    },
  },
}
</script>

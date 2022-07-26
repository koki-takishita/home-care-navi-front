<template>
  <v-card class="mx-auto mb-2 p-0" width="750" height="338">
    <div>事業所編集画面<br /></div>
    <div>事業所名：{{ office.name }}</div>
  </v-card>
</template>

<script>
export default {
  layout: 'application_specialists',
  middleware: 'authentication',
  data() {
    return {
      office_id: this.$route.params.office_id,
      office: [],
    }
  },
  mounted() {
    this.getOffice()
  },
  methods: {
    async getOffice() {
      try {
        const response = await this.$axios.$get(
          `specialists/offices/${this.office.id}`
        )
        if (response.id - this.office_id !== 0) {
          this.$router.push(`/specialists/office/${response.id}/edit`)
        } else {
          this.office = response
        }
      } catch (error) {
        return error
      }
    },
  },
}
</script>

<template>
  <v-container class="pt-10">
    <v-row>
      <v-col cols="12" sm="12" md="6">
        <office-images-card :images="office.images" />
        <office-data-card-sp
          :office-id="office_id"
          :office="office.office"
          :staffs="office.staffs"
          :bookmark="bookmark"
          @submitBookmark="submitBookmark"
          @destroyBookmark="destroyBookmark"
        />
        <office-detail-card :office="office.office" />
        <office-staff-card :office="office.office" />
        <office-outline />
      </v-col>
      <v-col cols="12" sm="12" md="6">
        <office-data-card-pc
          :office-id="office_id"
          :office="office.office"
          :staffs="office.staffs"
          :bookmark="bookmark"
          @submitBookmark="submitBookmark"
          @destroyBookmark="destroyBookmark"
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
      bookmark: [],
    }
  },
  mounted() {
    this.getBookmark()
  },
  methods: {
    async getBookmark() {
      try {
        const response = await this.$axios.$get(
          `offices/${this.office_id}/bookmarks`
        )
        this.getAPI = response
        this.bookmark = this.getAPI.bookmark.find((item) => item)
      } catch (error) {
        return error
      }
    },
    async submitBookmark(officeId) {
      try {
        await this.$axios.$post(`offices/${officeId}/bookmarks`, {
          office_id: officeId,
        })
        this.getBookmark()
      } catch (error) {
        const msg = error.response.data.message
        this.$store.commit('catchErrorMsg/setType', 'error')
        this.$store.commit('catchErrorMsg/setMsg', [msg])
        return error
      }
    },
    async destroyBookmark(officeId, bookmarkId) {
      try {
        await this.$axios.$delete(
          `offices/${officeId}/bookmarks/${bookmarkId}`,
          {
            office_id: officeId,
          }
        )
        this.getBookmark()
      } catch (error) {
        const msg = error.response.data.message
        this.$store.commit('catchErrorMsg/setType', 'error')
        this.$store.commit('catchErrorMsg/setMsg', [msg])
        return error
      }
    },
  },
}
</script>

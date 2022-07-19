<template>
  <v-container class="pt-10">
    <v-row>
      <v-col cols="12" sm="12" md="6">
        <office-images-card :images="officeImages" />
        <office-data-card-sp
          :office-id="office.id"
          :office="office"
          :staffs="staffs"
          :bookmark="bookmark"
          @submitBookmark="submitBookmark"
          @destroyBookmark="destroyBookmark"
        />
        <office-detail-card :office="office" />
        <office-staff-card :office="office" :staffs="staffs" />
      </v-col>
      <v-col cols="12" sm="12" md="6">
        <office-data-card-pc
          :office-id="office.id"
          :office="office"
          :staffs="staffs"
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
        return error
      }
    },
  },
}
</script>

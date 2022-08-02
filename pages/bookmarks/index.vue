<template>
  <v-col cols="12" md="8" lg="7" xl="7" class="mx-auto">
    <h3>ブックマーク</h3>
    <p class="font-weight-black">{{ conversionStringToOfficeCount }}</p>
    <v-row class="mt-4">
      <v-col v-for="(office, index) in offices" :key="index" cols="12" md="6">
        <officeCard :office="office" @child-event-refresh="refresh" />
      </v-col>
    </v-row>
    <div v-if="officeCount !== 0" class="mt-2 text-center">
      <v-pagination
        v-model="page"
        :length="count"
        color="#D9DEDE"
        class="page-nation"
      ></v-pagination>
    </div>
  </v-col>
</template>

<script>
export default {
  layout: 'application',
  middleware: 'authentication',
  async asyncData({ $axios, query }) {
    try {
      const page = Number(query.page) || 1
      const offsetPage = page - 1
      const res = await $axios.$get(`bookmarks?page=${offsetPage}`)
      let count = 0
      let officeCount = 0
      if (res.length !== 0) {
        count = res[0].count
        officeCount = res[0].count
      }
      count = count / 10 || 0
      count = Math.ceil(count)
      if (count === 0) {
        count = 1
      }
      return {
        page,
        count,
        officeCount,
        offices: res,
      }
    } catch (error) {
      return error
    }
  },
  computed: {
    conversionStringToOfficeCount() {
      return this.officeCount + '件'
    },
  },
  watch: {
    page() {
      this.getBookmarks(this.page)
      this.scrollTop()
      this.$router.push({
        path: `/bookmarks`,
        query: {
          page: this.page,
        },
      })
    },
  },
  methods: {
    async getBookmarks(page = 1) {
      try {
        const offsetPage = page - 1
        const res = await this.$axios.$get(`bookmarks?page=${offsetPage}`)
        this.offices = res
        let count = this.count
        let officeCount = 0
        if (res.length !== 0) {
          count = res[0].count
          officeCount = res[0].count
        }
        count = count / 10
        count = Math.ceil(count)
        if (count === 0) {
          count = 1
        }
        this.count = count
        this.officeCount = officeCount
      } catch (error) {
        return error
      }
    },
    moveShow(id) {
      this.$router.push({ path: `/offices/${id}` })
    },
    scrollTop() {
      this.$vuetify.goTo(0)
    },
    refresh() {
      if (this.offices.length <= 2) {
        this.$router.push({ query: { page: this.page - 1 } })
      }
      this.$nuxt.refresh()
      this.scrollTop()
    },
  },
}
</script>
<style scoped>
.cursor-pointer {
  cursor: pointer;
}

.set-max-layout {
  max-height: 50px;
  line-height: normal;
}

/* stylelint-disable */
::v-deep .v-pagination i.v-icon.notranslate.mdi.mdi-chevron-left.theme--light {
  color: #f06364;
}

::v-deep .v-pagination i.v-icon.notranslate.mdi.mdi-chevron-right.theme--light {
  color: #f06364;
}

.pa-2.remove-bottom-border-radius.v-card.v-sheet.v-sheet--outlined.theme--light.rounded-0 {
  border: 0;
}

::v-deep button.v-pagination__navigation.v-pagination__navigation {
  box-shadow: none;
}

::v-deep button.v-pagination__item {
  box-shadow: none;
}
::v-deep button.v-pagination__item.v-pagination__item--active {
  box-shadow: none;
}
/* stylelint-enable */
</style>

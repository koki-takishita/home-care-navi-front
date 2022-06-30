<template>
  <div class="w-990 mx-auto mt-n2 mb-2">
    <TopSubTitle
      v-model="searchIcon.keyword"
      @clickKeywordsAndPostCodes="searchOfficeKeywordsAndPostCodes()"
    />
    <div class="mx-auto h-74 d-none d-md-flex align-end">
      <p class="color-dark-gray font-weight-black text-body-1">
        エリアから探す
      </p>
    </div>
    <v-card
      class="d-none d-md-flex justify-space-between"
      color="grey"
      flat
      tile
    >
      <TopAreaCard :item="selectedArea" @sendArea="setSelectedArea" />
      <TopPrefectureCard />
      <TopCityCard />
    </v-card>
    <div class="d-md-none pa-4">
      <officeAreaList :area="selectedArea" @sendArea="setSelectedArea" />
    </div>
  </div>
</template>
<script>
export default {
  layout: 'application',
  data() {
    return {
      toggleSize: 960,
      mobileStyle: '',
      pcStyle: 'd-flex justify-space-between',
      searchIcon: {
        keyword: '',
      },
      selectedArea: '',
      test1: '',
    }
  },
  methods: {
    setSelectedArea(area) {
      this.selectedArea = area
    },
    async searchOfficeKeywordsAndPostCodes() {
      try {
        const res = await this.$conversionKeywords(this.searchIcon.keyword)
        this.$router.push({
          path: '/offices',
          query: {
            keywords: res.keywords,
            postCodes: res.postCodes,
          },
        })
      } catch (error) {
        // console.log(error)
        alert(error)
        return error
      }
    },
    searchOfficeFromArea(prefecture, city, location) {
      this.$router.push({
        path: '/offices',
        query: {
          prefecture,
          cities: city,
          location,
        },
      })
    },
  },
}
</script>
<style scoped>
.w-990 {
  max-width: 990px;
}

.h-74 {
  min-height: 74px;
}

.color-dark-gray {
  color: #2e3331;
}
</style>

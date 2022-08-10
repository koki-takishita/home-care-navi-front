<template>
  <div class="w-990 mx-auto mt-n2 mb-2">
    <SubTitle
      v-model="searchIcon.keyword"
      @clickKeywordsAndPostCodes="searchOfficeKeywordsAndPostCodes()"
    />
    <div class="mx-auto h-74 d-none d-md-flex align-end">
      <p class="color-dark-gray font-weight-black text-body-1">
        エリアから探す
      </p>
    </div>
    <div :class="toggleClassByBreakpoints">
      <ChooseAreaCard @clickCurrentLocationBtn="searchOfficeLocation()" />
      <ChoosePrefectureCard />
      <ChooseCityCard />
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
    }
  },
  computed: {
    toggleClassByBreakpoints() {
      // TODO mountedでやろうと思ったけど、mountedだとページの幅を変えた時が検知しない
      if (this.$vuetify.breakpoint.smAndDown) {
        return this.mobileStyle
      } else {
        return this.pcStyle
      }
    },
  },
  methods: {
    async searchOfficeKeywordsAndPostCodes() {
      try {
        const res = await this.$conversionKeywords(this.searchIcon.keyword)
        // officeのレスポンスが空だったら、アラートメッセージ表示
        if (res.offices.length === 0) {
          throw new Error(
            '検索ワードに一致するオフィスは、見つかりませんでした'
          )
        }
        this.$router.push({
          path: '/offices',
          query: {
            keywords: res.keywords,
            postCodes: res.postCodes,
          },
        })
      } catch (error) {
        // console.dir(error)
        if (error.message) {
          alert(error.message)
        }
        return error
      }
    },
    async searchOfficeLocation() {
      try {
        const res = await this.$currentLocation()
        const prefecture = res.prefecture
        const city = res.city
        this.searchOfficeFromArea(encodeURI(prefecture), encodeURI(city), true)
      } catch (error) {
        // console.log(error)
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

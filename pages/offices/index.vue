<template>
  <v-container class="base-width my-4 px-0">
    <v-row no-gutters>
      <v-col cols="12" sm="4" md="3">
        <v-card class="pa-2 remove-bottom-border-radius" tile outlined>
          <officeSearchWind
            v-model="searchIcon.keyword"
            @clickLocationAreaBtn="backTop()"
            @clickCurrentLocationBtn="searchOfficeLocation()"
            @clickSearchBtn="searchOfficeKeyword()"
          />
        </v-card>
        <officeAreaList
          v-if="!$vuetify.breakpoint.xs"
          :area="area"
          :cities="cities"
          :prefecture="prefecture"
          :selected-list="selectedList"
          :search-wind="searchWind"
          :location="location"
          @child-event="searchOfficeFromArea"
        />
      </v-col>
      <v-col cols="12" sm="8" md="9">
        <v-container class="pt-0">
          <div>
            <h3>検索結果</h3>
            <p class="font-weight-black">{{ officeCount }}件</p>
          </div>
          <v-row v-if="offices.length">
            <v-col v-for="(office, i) in offices" :key="i" cols="12" md="6">
              <officeCard :office="office" @getOffice="getOffice" />
            </v-col>
          </v-row>
          <p v-else class="ma-0">条件にマッチする事業所は存在しません</p>
        </v-container>
        <div class="text-center">
          <v-pagination
            v-model="page"
            :length="count"
            color="#D9DEDE"
            class="page-nation"
          ></v-pagination>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  layout: 'application',
  data() {
    return {
      offices: [],
      getObj: {},
      area: [],
      prefecture: [],
      cities: [],
      selectedList: [],
      location: false,
      page: 0,
      count: 0,
      keywords: '',
      postCodes: '',
      searchWind: '',
      searchIcon: {
        keyword: '',
      },
    }
  },
  computed: {
    officeCount() {
      if (this.offices.length > 0) {
        // console.log(`log::${this.offices[0].name}`)
        return this.offices[0].count
      } else {
        return '読込中'
      }
    },
  },
  watch: {
    page() {
      const page = this.page
      const offsetPage = this.page - 1
      const prefecture = this.prefecture
      const cities = this.cities
      const keywords = this.keywords
      const postCodes = this.postCodes
      try {
        if (this.searchWind) {
          this.requestApiKeywords(keywords, postCodes, offsetPage)
          this.$router.push({
            path: '/offices',
            query: {
              keywords: this.keywords,
              postCodes: this.postCodes,
              page: this.page,
            },
          })
        } else {
          this.requestApiSelectedArea(prefecture, cities, offsetPage)
          this.$router.push({
            path: '/offices',
            query: {
              area: this.area,
              prefecture: this.prefecture,
              cities: this.cities,
              selectedList: this.selectedList,
              location: this.location,
              page,
            },
          })
        }
        this.scrollTop()
      } catch (error) {
        // console.log(error)
        return error
      }
    },
  },
  mounted() {
    this.getOffice()
  },
  methods: {
    ...mapActions('areaData', ['resetStore']),
    async getOffice() {
      // console.log(query)
      // ここにkeywordの内容も追記すればリロードも対応できる
      const query = this.$route.query
      const area = query.area || ''
      const prefecture = query.prefecture || ''
      const cities = query.cities || ''
      const selectedList = query.selectedList || 0
      const page = Number(query.page) || 1
      const keywords = query.keywords || ''
      const postCodes = query.postCodes || ''
      let searchWind
      let offsetPage
      let offices
      if (page > 1) {
        offsetPage = page - 1
      } else {
        offsetPage = 0
      }
      try {
        if (postCodes === '' && keywords === '') {
          offices = await this.$axios.$get(
            `offices?prefecture=${prefecture}&cities=${cities}&page=${offsetPage}`
          )
          searchWind = false
        }
        // OK
        if (!!postCodes.length > 0 || !!keywords.length > 0) {
          offices = await this.$axios.$get(
            `offices?keywords=${encodeURI(
              keywords
            )}&postCodes=${postCodes}&page=${offsetPage}`
          )
          searchWind = true
        }
        // OK
        if (offices.length === 0) {
          alert('選択したエリアにオフィスは存在しません')
          redirect('/top')
        }
        // OK
        let searchIcon = { keyword: '' }
        if (keywords.length > 0 && postCodes.length > 0) {
          searchIcon.keyword = `${keywords},${postCodes}`
        } else if (keywords.length > 0) {
          searchIcon.keyword = `${keywords}`
        } else if (postCodes.length > 0) {
          searchIcon.keyword = `${postCodes}`
        } else {
          searchIcon = { keyword: '' }
        }

        let count = offices[0].count
        count = count / 10 || 0
        count = Math.ceil(count)
        if (count === 0) {
          count = 1
        }
        this.offices = offices
        this.area = area
        this.prefecture = prefecture
        this.cities = cities
        this.keywords = keywords
        this.postCodes = postCodes
        this.selectedList = selectedList
        this.count = count
        this.page = page
        this.searchWind = searchWind
        this.searchIcon = searchIcon
      } catch (error) {
        // リロードして消えるようだったら有効化 console.log(error)
        // console.log(error)
        return error
      }
    },
    areaSearching(query) {
      const prefecture = query.prefecture
      const cities = query.cities
      if (typeof prefecture === 'string' && typeof cities === 'string') {
        return true
      } else {
        return false
      }
    },
    // 検索窓に入力された内容で検索
    async requestApiKeywords(keywords, postCodes, offsetPage) {
      try {
        const offices = await this.$axios.$get(
          `offices?keywords=${keywords}&postCodes=${postCodes}&page=${offsetPage}`
        )
        this.offices = offices
      } catch (error) {
        // console.log(error)
        return error
      }
    },
    async requestApiSelectedArea(prefecture, cities, offsetPage) {
      try {
        const res = await this.$searchOffices({
          prefecture,
          cities,
          offsetPage,
        })
        this.offices = res.offices
      } catch (error) {
        // console.log(error)
        return error
      }
    },
    async searchOfficeKeyword() {
      try {
        const res = await this.$conversionKeywords(this.searchIcon.keyword)
        const offices = res.offices
        const keywords = res.keywords
        const postCodes = res.postCodes
        if (!this.exist(offices))
          return alert('検索結果にマッチするオフィスは存在しません')
        this.offices = offices
        this.keywords = keywords
        this.postCodes = postCodes
        let count = offices[0].count
        count = count / 10 || 0
        count = Math.ceil(count)
        this.count = count
        if (count === 0) {
          count = 1
        }
        this.page = 1
        this.searchWind = true
        this.$router.push({
          path: '/offices',
          query: {
            keywords: this.keywords,
            postCodes: this.postCodes,
          },
        })
      } catch (error) {
        alert(error)
        return error
      }
    },
    exist(obj) {
      if (!!obj && obj.length > 0) {
        return true
      } else {
        return false
      }
    },
    scrollTop() {
      this.$vuetify.goTo(0)
    },
    backTop() {
      this.resetStore()
      this.$router.push('/top')
    },
    async searchOfficeLocation() {
      try {
        const { prefecture, city } = await this.$currentLocation()
        this.searchOfficeFromArea(
          '',
          encodeURI(prefecture),
          encodeURI(city),
          '',
          true
        )
      } catch (error) {
        // console.error(error.message)
        return error
      }
    },
    async searchOfficeFromArea(
      area,
      prefecture,
      cities,
      selectedList,
      location = false,
      searchWind = false
    ) {
      if (!this.exist(cities))
        return alert('市町村を１つ以上選択してください。')
      try {
        const { offices, count } = await this.$searchOffices({
          prefecture,
          cities,
          offsetPage: 0,
        })
        if (this.exist(offices)) {
          this.offices = offices
          this.area = area
          this.prefecture = prefecture
          this.cities = cities
          this.selectedList = selectedList
          this.count = count
          this.location = location
          this.searchWind = searchWind
          this.scrollTop()
          this.page = 1
          // router.push({ path: '/register', query: { plan: 'private' } })
          this.$router.push({
            path: '/offices',
            query: {
              area: this.area,
              prefecture: this.prefecture,
              cities: this.cities,
              selectedList: this.selectedList,
              location: this.location,
            },
          })
        }
      } catch (error) {
        // console.log(error)
        return error
      }
    },
  },
}
</script>
<style scoped>
.base-width {
  max-width: 990px;
}

.remove-bottom-border-radius {
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
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

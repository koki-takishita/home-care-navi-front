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
              <officeCard :office="office" />
            </v-col>
          </v-row>
          <p v-else class="ma-0">条件にマッチする事業所は存在しません</p>
        </v-container>

        <!-- <client-only></client-only>
        リロードするとページネーション崩れるエラー対応のため
        ハイドレーションとは？: https://zenn.dev/00_/articles/c5130802d384b8238e4c
        原因と思われる記事: https://zenn.dev/motoishimotoi/articles/5a6642d8790eaa -->
        <client-only>
          <v-pagination
            v-model="page"
            color="#D9DEDE"
            :length="count"
            class="page-nation"
          ></v-pagination>
        </client-only>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  layout: 'application',
  async asyncData({ $axios, query, redirect, store }) {
    // console.log(query)
    // ここにkeywordの内容も追記すればリロードも対応できる
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
        offices = await $axios.$get(
          `offices?prefecture=${prefecture}&cities=${cities}&page=${offsetPage}`
        )
        searchWind = false
        if (offices.length === 0) {
          throw new Error('選択したエリアにオフィスは存在しません')
        }
      }
      if (!!postCodes.length > 0 || !!keywords.length > 0) {
        offices = await $axios.$get(
          `offices?keywords=${encodeURI(
            keywords
          )}&postCodes=${postCodes}&page=${offsetPage}`
        )
        searchWind = true
        if (offices.length === 0) {
          throw new Error(
            '検索ワードに一致するオフィスは、見つかりませんでした'
          )
        }
      }
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
      return {
        offices,
        area,
        prefecture,
        cities,
        keywords,
        postCodes,
        selectedList,
        count,
        page,
        searchWind,
        searchIcon,
      }
    } catch (error) {
      // console.dir(error)
      const msg = [
        '不明なエラーです。consoleを確認してください。 page/offices/index.vue',
      ]
      switch (error.name) {
        case 'Error': // officeが見つからない
          alert(error.message)
          redirect('/')
          break
        case 'NetworkError': // 通信エラー
          redirect('/')
          break
        default:
          // console.dir(error)
          store.commit('catchErrorMsg/clearMsg')
          store.commit('catchErrorMsg/setMsg', msg)
          store.commit('catchErrorMsg/setType', 'error')
          redirect('/')
      }

      return error
    }
  },
  data() {
    return {
      offices: {},
      getObj: {},
      area: [],
      prefecture: [],
      cities: [],
      selectedList: [],
      location: false,
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
  methods: {
    ...mapActions('areaData', ['resetStore']),
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
        const msg = [
          '不明なエラーです。consoleを確認してください。 page/offices/index.vue',
        ]
        switch (error.name) {
          case 'Error': // officeが見つからない
            alert(error.message)
            break
          case 'NetworkError': // 通信エラー
            break
          default:
            // console.dir(error)
            store.commit('catchErrorMsg/clearMsg')
            store.commit('catchErrorMsg/setMsg', msg)
            store.commit('catchErrorMsg/setType', 'error')
        }
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

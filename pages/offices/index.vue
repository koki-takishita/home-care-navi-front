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
  async asyncData({ $axios, query, redirect }) {
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
    if (page > 1) {
      offsetPage = page - 1
    } else {
      offsetPage = 0
    }
    let offices
    try {
      if (postCodes === '' && keywords === '') {
        offices = await $axios.$get(
          `offices?prefecture=${prefecture}&cities=${cities}&page=${offsetPage}`
        )
        searchWind = false
      }
      if (!!postCodes.length > 0 || !!keywords.length > 0) {
        offices = await $axios.$get(
          `offices?keywords=${encodeURI(
            keywords
          )}&postCodes=${postCodes}&page=${offsetPage}`
        )
        searchWind = true
      }
      if (offices.length === 0) {
        redirect('/top')
        return alert('選択したエリアにオフィスは存在しません')
      }
      let count = offices[0].count
      count = count / 10 || 0
      count = Math.ceil(count)
      if (count === 0) {
        count = 1
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
      // リロードして消えるようだったら有効化 console.log(error)
      // console.log(error)
      return error
    }
  },
  data() {
    return {
      offices: [],
      getObj: {},
      area: [],
      prefecture: [],
      cities: [],
      selectedList: [],
      location: false,
      page: '',
      count: '',
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
        const offices = await this.$axios.$get(
          `offices?prefecture=${prefecture}&cities=${cities}&page=${offsetPage}`
        )
        this.offices = offices
      } catch (error) {
        // console.log(error)
        return error
      }
    },
    searchOfficeKeyword() {
      try {
        // 何も入力されてなかったらalert
        const keyword = this.keywordExist(this.searchIcon.keyword)
        /* "サンプル１ サンプル2, さんぷる３  ,さんぷる"
           => ["サンプル1", "サンプル2", "サンプル3", "さんぷる"] */
        const keywordsArry = this.removeDelimiter(keyword)
        // 郵便番号があるかどうか判定
        if (this.postalCodeExist(keywordsArry)) {
          /* 郵便番号からハイフンを削除した配列を出力
          ["さんぷる", "113-5511", "2-11-39", "080-1111-1111", "014-4155", "さんぷる3"]
          => [1135511, 0144155] */
          const requestPostalCodes = this.conversionSevenNumber(keywordsArry)
          /* keywordsArryから郵便番号のみ削除
          ["さんぷる", "113-5511", "2-11-39", "080-1111-1111", "014-4155", "さんぷる3"]
          => ['サンプル', 'サンプル3'] */
          const requestKeywords = this.removePostCode(keywordsArry)
          this.searchOfficeKeywords(requestKeywords, requestPostalCodes)
        } else {
          this.searchOfficeKeywords(keywordsArry)
        }
      } catch (error) {
        // console.log(error)
        alert(error)
        return error
      }
    },
    /* arryから郵便番号のみを削除
    ['111-1111', '1234567', 'sample', 'aaa']
    => ['sample', 'aaa'] */
    removePostCode(arry) {
      const re =
        /^[0-9|０-９]{3}[-|−|ー|‐]{1}[0-9|０-９]{4}$|^[0-9|０-９]{3}[0-9|０-９]{4}$/g
      const keywords = this.takeOutArray(arry, re)
      return keywords
    },
    // arryからre(正規表現)にマッチした要素を削除
    takeOutArray(arry, re) {
      const replaced = []
      arry.forEach((word) => {
        const repace = word.replace(re, '')
        replaced.push(repace)
      })
      return replaced.filter(Boolean)
    },
    /* 郵便番号からハイフンを削除した配列を出力
       ["さんぷる", "113-5511", "2-11-39", "080-1111-1111", "014-4155", "さんぷる3"]
       => [1135511, 0144155] */
    conversionSevenNumber(arry) {
      const conversionArry = []
      const re = /[-|−|ー|‐]/
      const postCodes = this.extractPostalCode(arry)
      postCodes.forEach((code) => {
        const removeHyphen = code.replace(re, '')
        let number
        // codeが全角英数値の場合、半角数値へ変換
        if (!this.isAlphanumericNumbers(removeHyphen)) {
          number = this.conversionAlphanumericNumbers(removeHyphen)
        } else {
          number = Number(removeHyphen)
        }
        conversionArry.push(number)
      })
      return conversionArry
    },
    /* stringを半角の英数値に変換
      '１１１２２２２' => '1112222'
      '123ー４５６７'  => '1234567' */
    conversionAlphanumericNumbers(string) {
      const numbers = []
      const hafe = '1'.charCodeAt() - 1
      const full = '１'.charCodeAt() - 1
      for (let i = 0; i < string.length; i++) {
        const utfCode = this.isNumber(string[i]) ? hafe : full
        const number = string[i].charCodeAt(0) - utfCode
        numbers.push(number)
      }
      return numbers.join('')
    },
    isNumber(obj) {
      return !!obj.match(/\d/)
    },
    /* stringが半角数字ならtrue
       true:  '111' '1112224'
       false: '１１１' 'aaa' '１１５５５５１' */
    isAlphanumericNumbers(string) {
      const re = /^[0-9]{7}$/
      return !!string.match(re)
    },
    /* 配列からから郵便番号抽出
       ["さんぷる", "113-5511", "2-11-39", "080-1111-1111", "014-4155", "１１１ー１１１１"]
       => [113-5511, 014-4155, １１１ー１１１１] */
    extractPostalCode(arry) {
      const postCode = []
      const re =
        /^[0-9|０-９]{3}[-|−|ー|‐]{1}[0-9|０-９]{4}$|^[0-9|０-９]{3}[0-9|０-９]{4}$/g
      arry.forEach((ele) => {
        const matchEle = ele.match(re)
        if (matchEle) postCode.push(matchEle[0])
      })
      return postCode
    },
    /* arryに郵便番号が存在すればture
       true:  '000-0000' '0000000'
       false: '000-000-0000 '00000000' */
    postalCodeExist(arry) {
      const postCodeArry = this.extractPostalCode(arry)
      // return !!postCode_arry.filter(Boolean).length
      return !!postCodeArry.length
    },
    async searchOfficeKeywords(keywords = null, postCodes = null) {
      try {
        const offices = await this.$axios.$get(
          `offices?keywords=${keywords}&postCodes=${postCodes}&page=${0}`
        )
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
        // console.log(error)
        return error
      }
    },
    /* "サンプル１ サンプル2, さんぷる３  ,さんぷる"
       => ["サンプル1", "サンプル2", "サンプル3", "さんぷる"] */
    removeDelimiter(keyword) {
      const re = /[,、]{1}|[,、]{1}\s+|\s+/
      const split = keyword.split(re)
      // split内の空白を削除
      // ["sampple", "sampl1", "", "sam", ""] => ["sample", "sampl", "sam"]
      const filtered = split.filter(Boolean)
      return filtered
    },
    keywordExist(char) {
      if (this.exist(char)) {
        return char
      } else {
        throw new Error('検索ワードを入力してください')
      }
    },
    exist(obj) {
      return obj.length > 0
    },
    alertMsg(msg) {
      return alert(msg)
    },
    scrollTop() {
      this.$vuetify.goTo(0)
    },
    backTop() {
      this.resetStore()
      this.$router.push('/top')
    },
    searchOfficeLocation() {
      this.getPositon()
    },
    getPositon() {
      navigator.geolocation.getCurrentPosition(this.success)
    },
    success(pos) {
      const crd = pos.coords
      this.searchLocation(crd.longitude, crd.latitude)
    },
    async searchLocation(x, y) {
      try {
        const response = await this.$apiToAddressJson.$get(
          `json?method=searchByGeoLocation&x=${x}&y=${y}`
        )
        const prefecture = response.response.location[0].prefecture
        const city = response.response.location[0].city
        this.searchOfficeFromArea(
          '',
          encodeURI(prefecture),
          encodeURI(city),
          '',
          true
        )
      } catch (error) {
        // console.log(error)
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
        const offices = await this.$axios.$get(
          `offices?prefecture=${prefecture}&cities=${cities}&page=${0}`
        )
        if (!this.exist(offices))
          return alert('選択したエリアにオフィスは存在しません')
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

<template>
  <v-container class="base-width my-4 px-0">
    <v-row no-gutters>
      <v-col cols="12" sm="4" md="3">
        <v-card class="pa-2 remove-bottom-border-radius" tile outlined>
          <officeSearchWind
            @clickLocation="backTop()"
            @clickBtnLocation="searchOfficeLocation"
          />
        </v-card>
        <officeAreaList
          v-if="!$vuetify.breakpoint.xs"
          :area="area"
          :cities="cities"
          :prefecture="prefecture"
          :selected-list="selectedList"
          :location="location"
          @child-event="searchOfficeFromArea"
        />
      </v-col>
      <v-col cols="12" sm="8" md="9">
        <v-container class="pt-0">
          <div>
            <h3>検索結果</h3>
            <p class="font-weight-black">{{ offices[0].count }}件</p>
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
    const area = query.area || ''
    const prefecture = query.prefecture || ''
    const cities = query.cities || ''
    const selectedList = query.selectedList || 0
    try {
      const offices = await $axios.$get(
        `offices?prefecture=${prefecture}&cities=${cities}&page=${0}`
      )
      if (offices.length === 0) {
        redirect('/top')
        return alert('選択したエリアにオフィスは存在しません')
      }
      let count = offices[0].count
      count = (count / 10) | 0
      if (count === 0) {
        count = 1
      }
      return {
        offices,
        area,
        prefecture,
        cities,
        selectedList,
        count,
      }
    } catch (error) {
      // リロードして消えるようだったら有効化 console.log(error)
      console.log(error)
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
      page: 1,
      count: '',
    }
  },
  watch: {
    async page() {
      try {
        const offices = await this.$axios.$get(
          `offices?prefecture=${this.prefecture}&cities=${this.cities}&page=${this.page}`
        )
        this.offices = offices
      } catch (error) {
        console.log(error)
        return error
      }
    },
  },
  methods: {
    ...mapActions('areaData', ['resetStore']),
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
        return error
      }
    },
    async searchOfficeFromArea(
      area,
      prefecture,
      cities,
      selectedList,
      location = false
    ) {
      try {
        const offices = await this.$axios.$get(
          `offices?prefecture=${prefecture}&cities=${cities}&page=${0}`
        )
        if (offices.length === 0) {
          return alert('選択したエリアにオフィスは存在しません')
        }
        let count = offices[0].count
        count = (count / 10) | 0
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

        this.$router.push({
          path: '/offices',
          query: {
            area,
            prefecture,
            cities,
            selectedList,
            location,
          },
        })
      } catch (error) {
        console.log(error)
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

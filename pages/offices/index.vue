<template>
  <v-container class="grey lighten-5 base-width my-4 px-0">
    <v-row no-gutters>
      <v-col cols="12" sm="4" md="3">
        <!--コンポーネントにする エリア選択-->
        <v-card class="pa-2" outlined tile @click="backTop()">test1</v-card>
        <officeAreaList
          v-if="!$vuetify.breakpoint.xs"
          :area="area"
          :cities="cities"
          :prefecture="prefecture"
          :selected-list="selectedList"
          @child-event="searchOfficeFromArea"
        />
      </v-col>
      <v-col cols="12" sm="8" md="9">
        <v-container class="grey lighten-1 pt-0">
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
          <v-pagination v-model="page" :length="count"></v-pagination>
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
    async searchOfficeFromArea(area, prefecture, cities, selectedList) {
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

        this.$router.push({
          path: '/offices',
          query: {
            area,
            prefecture,
            cities,
            selectedList,
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
</style>

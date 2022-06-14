<template>
  <v-container class="grey lighten-5 base-width my-4 px-0">
    <v-row no-gutters>
      <v-col cols="12" sm="4" md="3">
        <!--コンポーネントにする エリア選択-->
        <v-card class="pa-2" outlined tile>test1</v-card>
        <officeAreaList
          v-if="!$vuetify.breakpoint.xs"
          :cities="cities"
          :prefecture="prefecture"
          :selected-list="selectedList"
        />
        <!---->
      </v-col>
      <v-col cols="12" sm="8" md="9">
        <v-container class="grey lighten-1 pt-0">
          <div>
            <h3>検索結果</h3>
            <p class="font-weight-black">{{ offices.length }}件</p>
          </div>
          <v-row v-if="offices.length">
            <v-col v-for="(office, i) in offices" :key="i" cols="12" md="6">
              <officeCard :office="office" />
            </v-col>
          </v-row>
          <p v-else class="ma-0">条件にマッチする事業所は存在しません</p>
        </v-container>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  layout: 'application',
  async asyncData({ $axios, query }) {
    const prefecture = query.prefecture
    const cities = query.cities
    const selectedList = query.selectedList
    console.log(query)
    try {
      const offices = await $axios.$get(
        `offices?prefecture=${prefecture}&cities=${cities}`
      )
      return {
        offices,
        prefecture,
        cities,
        selectedList,
      }
    } catch (error) {
      // リロードして消えるようだったら有効化 console.log(error)
      return error
    }
  },
  data() {
    return {
      offices: [],
      getObj: {},
      prefecture: [],
      cities: [],
    }
  },
}
</script>
<style scoped>
.base-width {
  max-width: 990px;
}
</style>

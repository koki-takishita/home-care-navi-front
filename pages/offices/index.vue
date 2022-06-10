<template>
  <v-container class="grey lighten-5 base-width my-4 px-0">
    <v-row no-gutters>
      <v-col cols="12" sm="4" md="3">
        <!--コンポーネントにする エリア選択-->
        <v-card class="pa-2" outlined tile>test1</v-card>
        <v-card class="pa-2" outlined tile>test2</v-card>
        <!---->
      </v-col>
      <v-col cols="12" sm="8" md="9">
        <v-container class="grey lighten-1 pt-0">
          <div>
            <h3>検索結果</h3>
            <p>999件(仮)</p>
          </div>
          <v-row v-if="empty">
            <v-col v-for="(office, i) in offices" :key="i" cols="12" md="6">
              <officeCard :office="office" />
            </v-col>
          </v-row>
          <p v-else>条件にマッチする事業所は存在しません</p>
        </v-container>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  layout: 'application',
  async asyncData({ $axios, query }) {
    // console.log(`県の情報::${query.prefecture}`)
    // console.log(`市の情報::${query.cities}`)
    try {
      const res = await $axios.$get(
        `offices?prefecture=${query.prefecture}&cities=${query.cities}`
      )
      return { offices: res }
    } catch (error) {
      // リロードして消えるようだったら有効化 console.log(error)
      return error
    }
  },
  data() {
    return {
      offices: [],
      empty: true,
      getObj: {},
    }
  },
}
</script>
<style scoped>
.base-width {
  max-width: 990px;
}
</style>

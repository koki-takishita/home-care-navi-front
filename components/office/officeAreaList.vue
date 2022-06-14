<template>
  <v-stepper v-model="e1" tile outlined class="reset-border-style">
    <v-stepper-items>
      <v-stepper-content step="1" class="pa-0">
        <v-card
          class="mb-12 reset-border-style"
          color="grey lighten-1"
          tile
          outlined
        >
          <v-list>
            <v-list-item-group
              v-model="selectedAreaNum"
              active-class="font-weight-black"
            >
              <v-list-item
                v-for="(area, i) in areas"
                :key="i"
                dense
                @click="movePrefecturesList(area)"
              >
                <v-list-item-content>
                  <span class="">{{ area }}</span>
                </v-list-item-content>
                <v-list-item-icon>
                  <v-icon block>mdi-chevron-right</v-icon>
                </v-list-item-icon>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-card>
        <v-btn color="primary" @click="e1 = 2"> Continue </v-btn>
      </v-stepper-content>
      <v-stepper-content step="2" class="pa-0">
        <v-card
          class="mb-12 reset-border-style"
          color="grey lighten-1"
          tile
          outlined
        >
          <v-list>
            <v-chip pill outlined @click="backAreaList()">{{
              areas[selectedAreaNum]
            }}</v-chip>
            <v-list-item-group
              v-model="selectedPrefectureNum"
              active-class="font-weight-black"
            >
              <v-list-item
                v-for="(prefecture, i) in fetchPrefectures"
                :key="i"
                dense
                @click="moveCitiesList(prefecture)"
              >
                <v-list-item-content>
                  <span class="">{{ prefecture }}</span>
                </v-list-item-content>
                <v-list-item-icon>
                  <v-icon block>mdi-chevron-right</v-icon>
                </v-list-item-icon>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-card>
        <v-btn color="primary" @click="e1 = 3"> Continue </v-btn>
      </v-stepper-content>
      <v-stepper-content step="3" class="pa-0">
        <v-card tile outlined class="reset-border-style" color="grey lighten-1">
          <v-list class="overflow-auto" max-height="500">
            <v-chip pill outlined @click="backAreaList()">{{
              areas[selectedAreaNum]
            }}</v-chip>
            <v-chip pill outlined @click="backPrefectureList()">{{
              fetchPrefectures[selectedPrefectureNum]
            }}</v-chip>
            <v-list-item-group
              v-model="selectedCityNum"
              active-class="font-weight-black"
              multiple
            >
              <v-list-item v-for="(city, i) in fetchCities" :key="i" dense>
                <template #default="{ active }">
                  <v-list-item-action>
                    <v-checkbox
                      class="mt-n1"
                      dense
                      hide-details
                      :input-value="active"
                      color="red"
                    >
                    </v-checkbox>
                  </v-list-item-action>
                  <v-list-item-content class="text-button pa-0 ml-n7">
                    {{ city.city }}
                  </v-list-item-content>
                  <v-icon block>mdi-chevron-right</v-icon>
                </template>
              </v-list-item>
            </v-list-item-group>
          </v-list>
          <div class="d-flex ml-n3">
            <v-btn
              min-width="80"
              min-height="40"
              class="mr-2"
              outlined
              depressed
            >
              <span class="color-red">クリア</span></v-btn
            >
            <v-btn
              min-width="160"
              min-height="40"
              color="error"
              depressed
              class="font-weight-black"
              >検索する</v-btn
            >
          </div>
        </v-card>
        <v-btn color="primary" @click="e1 = 1"> Continue </v-btn>
      </v-stepper-content>
    </v-stepper-items>
  </v-stepper>
</template>
<script>
export default {
  layout: 'application',
  props: ['cities', 'prefecture', 'selectedList'],
  data() {
    return {
      areas: [
        '関東',
        '関西',
        '東海',
        '北海道',
        '東北',
        '甲信越北陸',
        '中国',
        '四国',
        '九州沖縄',
      ],
      fetchPrefectures: [],
      fetchCities: [],
      e1: 1,
      selectedAreaNum: '',
      selectedPrefectureNum: '',
      selectedCityNum: [],
    }
  },
  async fetch() {
    /*  ケースA 県ある・市町村ある
        - 市町村のリスト表示 チェック済み
        渡された市町村で、該当する市町村リクエスト

        ケースB 県ある・市町村ない
        - 市町村リスト表示 チェックなし
        ケースC 県ない・市町村ない
        - エリアリスト表示
     */
    // [Mdn Doc about Accept header] https://developer.mozilla.org/ja/docs/Web/HTTP/Headers/Accept
    const list = this.selectedList.map((string) => Number(string))
    this.selectedCityNum = list
    try {
      const prefecture = this.prefecture
      const res = await this.$apiToAddressJson.$get(
        `json?method=getCities&prefecture=${prefecture}`
      )
      this.fetchCities = res.response.location
      this.e1 = 3
    } catch (error) {
      console.log(error)
      return error
    }
  },
  methods: {
    backAreaList() {
      this.selectedCityNum = []
      this.e1 = 1
    },
    backPrefectureList() {
      this.selectedCityNum = []
      this.e1 = 2
    },
    movePrefecturesList(area) {
      this.FetchPrefectures(area)
      this.e1 = 2
    },
    moveCitiesList(prefecture) {
      this.FetchCities(prefecture)
      this.e1 = 3
    },
    async FetchPrefectures(area) {
      switch (area) {
        case '甲信越北陸':
          this.fetchPrefectures = [
            '新潟県',
            '富山県',
            '石川県',
            '福井県',
            '長野県',
            '山梨県',
          ]
          break
        case '東海':
          this.fetchPrefectures = ['静岡県', '愛知県', '三重県', '岐阜県']
          break
        case '関西':
          this.fetchPrefectures = [
            '大阪府',
            '京都府',
            '兵庫県',
            '滋賀県',
            '奈良県',
            '和歌山県',
          ]
          break
        default:
          if (area === '九州沖縄') {
            area = '九州'
          }
          try {
            const res = await this.$apiToAddressJson.$get(
              `json?method=getPrefectures&area=${area}`
            )
            this.fetchPrefectures = res.response.prefecture
          } catch (error) {
            console.log(error)
            return error
          }
      }
    },
    async FetchCities(prefecture) {
      try {
        const res = await this.$apiToAddressJson.$get(
          `json?method=getCities&prefecture=${prefecture}`
        )
        this.fetchCities = res.response.location
      } catch (error) {
        console.log(error)
        return error
      }
    },
  },
}
</script>
<style scoped>
/* stylelint-disable */
.reset-border-style.v-card.v-sheet.v-sheet--outlined.theme--light.rounded-0.grey.lighten-1 {
  border: 0;
}
.v-stepper.reset-border-style.v-sheet.v-sheet--outlined.theme--light.rounded-0 {
  border: 0;
}
/* stylelint-enable */
</style>

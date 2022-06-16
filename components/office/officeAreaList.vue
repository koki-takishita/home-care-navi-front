<template>
  <v-stepper
    v-model="e1"
    tile
    outlined
    class="reset-border-style remove-top-border-radius"
  >
    <v-stepper-items>
      <v-stepper-content step="1" class="pa-0">
        <v-card class="mb-12 reset-border-style" color="#F5F7F7" tile outlined>
          <v-list flat outlined>
            <v-list-item-group
              v-model="selectedAreaNum"
              active-class="font-weight-black"
            >
              <v-list-item
                v-for="(area, i) in areas"
                :key="i"
                dense
                :ripple="false"
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
      </v-stepper-content>
      <v-stepper-content step="2" class="pa-0">
        <v-card class="mb-12 reset-border-style" color="#F5F7F7" tile outlined>
          <div class="px-3">
            <v-chip
              class="hover-remove font-weight-black px-0"
              :ripple="false"
              pill
              outlined
              label
              @click.native="backAreaList()"
              >{{ selectedArea() }}</v-chip
            >
          </div>
          <v-list flat>
            <v-list-item-group
              v-model="selectedPrefectureNum"
              active-class="font-weight-black"
            >
              <v-list-item
                v-for="(prefecture, i) in fetchPrefectures"
                :key="i"
                dense
                :ripple="false"
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
      </v-stepper-content>
      <v-stepper-content step="3" class="pa-0">
        <v-card tile outlined class="reset-border-style" color="#F5F7F7">
          <div class="px-5">
            <v-chip
              class="hover-remove px-0 font-weight-black"
              :ripple="false"
              pill
              outlined
              label
              @click.native="backAreaList()"
              >{{ selectedArea() }}</v-chip
            >
            <v-icon block>mdi-chevron-right</v-icon>
            <v-chip
              class="hover-remove px-0 font-weight-black"
              :ripple="false"
              pill
              outlined
              label
              @click.native="backPrefectureList()"
              >{{ selectedPrefecture() }}</v-chip
            >
          </div>
          <v-list flat class="overflow-auto" max-height="500">
            <v-list-item-group
              v-model="selectedCityNum"
              active-class="font-weight-black"
              multiple
            >
              <template v-for="(city, i) in fetchCities">
                <v-list-item
                  :key="i"
                  dense
                  :ripple="false"
                  class="set-height-40"
                >
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
                    <v-list-item-content class="pa-0 ml-n7">
                      {{ city.city }}
                    </v-list-item-content>
                    <v-icon block>mdi-chevron-right</v-icon>
                  </template>
                </v-list-item>
                <v-divider :key="i" class="mx-5"></v-divider>
              </template>
            </v-list-item-group>
          </v-list>
          <div class="pa-3">
            <v-btn
              min-height="40"
              color="error"
              block
              depressed
              class="font-weight-black"
              @click="searchOffice()"
              >検索する</v-btn
            >
          </div>
        </v-card>
      </v-stepper-content>
    </v-stepper-items>
  </v-stepper>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  layout: 'application',
  props: ['area', 'prefecture', 'cities', 'selectedList', 'location'],
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
      stampArea: '',
      stampPrefecture: '',
    }
  },
  async fetch() {
    if (this.propsUndefined()) {
      this.e1 = 1
      return
    }
    const list = []
    for (let i = 0; i < this.selectedList.length; i++) {
      list.push(Number(this.selectedList[i]))
    }
    this.selectedCityNum = list
    if (!(this.area === undefined && this.area === '')) {
      this.FetchPrefectures(decodeURI(this.area))
    }
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
  watch: {
    location() {
      if (this.location === true) {
        this.e1 = 1
        this.selectedAreaNum = []
        this.selectedPrefectureNum = []
        this.selectedCityNum = []
      }
    },
  },
  computed: {
    ...mapGetters('areaData', ['getCurrentArea', 'getCurrentPrefecture']),
  },
  methods: {
    searchOffice() {
      const arry = []
      for (let i = 0; i < this.selectedCityNum.length; i++) {
        arry.push(this.selectedCityNum[i])
      }
      let selectedCities = []
      const cityArry = this.fetchCities
      selectedCities = arry.map(function (num) {
        return encodeURI(cityArry[num].city)
      })
      const area = encodeURI(this.selectedArea())
      const prefecture = encodeURI(this.selectedPrefecture())
      const cities = selectedCities.join()
      const selectedList = this.selectedCityNum
      this.$emit('child-event', area, prefecture, cities, selectedList)
    },
    propsUndefined() {
      return this.area === 'undefined' || this.area === ''
    },
    selectedArea() {
      const area = decodeURI(this._props.area)
      if (this.selectedAreaNum === '') {
        return area
      } else if (this.selectedAreaNum === undefined) {
        return this.areas[this.getIndex(this.areas, this.stampArea)]
      }
      return this.areas[this.selectedAreaNum]
    },
    selectedPrefecture() {
      const prefecture = decodeURI(this.prefecture)
      if (this.selectedPrefectureNum === '') {
        return prefecture
      } else if (this.selectedPrefectureNum === undefined) {
        return this.fetchPrefectures[
          this.getIndex(this.fetchPrefectures, this.stampPrefecture)
        ]
      }
      return this.fetchPrefectures[this.selectedPrefectureNum]
    },
    backAreaList() {
      const area = this.selectedArea()
      this.selectedAreaNum = this.getIndex(this.areas, area)
      this.selectedCityNum = []
      this.selectedPrefectureNum = []
      this.e1 = 1
    },
    backPrefectureList() {
      if (this.fetchPrefectures.length === 0) {
        this.FetchPrefectures(decodeURI(this._props.area))
      }
      const prefecture = this.selectedPrefecture()
      this.selectedPrefectureNum = this.getIndex(
        this.fetchPrefectures,
        prefecture
      )
      this.selectedCityNum = []
      this.e1 = 2
    },
    getIndex(arry, target) {
      for (let i = 0; i < arry.length; i++) {
        if (arry[i] === target) {
          return i
        }
      }
    },
    movePrefecturesList(area) {
      this.stampArea = area
      this.FetchPrefectures(area)
      this.e1 = 2
    },
    moveCitiesList(prefecture) {
      this.stampPrefecture = prefecture
      this.FetchCities(prefecture)
      this.e1 = 3
    },
    FetchPrefectures(area) {
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
          this.FetchPrefecture(area)
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
    async FetchPrefecture(area) {
      try {
        const res = await this.$apiToAddressJson.$get(
          `json?method=getPrefectures&area=${area}`
        )
        this.fetchPrefectures = res.response.prefecture
      } catch (error) {
        console.log(error)
        return error
      }
    },
  },
}
</script>
<style scoped>
.set-height-40 {
  height: 40px;
}

.hover-remove::before {
  display: none;
}

.hover-remove:hover {
  cursor: pointer;
}

/* stylelint-disable */
.mb-12.reset-border-style.v-card.v-sheet.v-sheet--outlined.theme--light.rounded-0 {
  border: 0;
}

.v-list.v-sheet.v-sheet--outlined.theme--light.v-list--flat {
  border: 0;
}

.reset-border-style.v-card.v-sheet.v-sheet--outlined.theme--light.rounded-0.grey.lighten-1 {
  border: 0;
}

.v-stepper.reset-border-style.v-sheet.v-sheet--outlined.theme--light.rounded-0 {
  border: 0;
}

.v-stepper.reset-border-style.remove-top-border-radius.v-stepper--is-booted.v-sheet.theme--light {
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  box-shadow: none;
}

span.hover-remove.v-chip.v-chip--label.v-chip--no-color.v-chip--outlined.v-chip--pill.theme--light.v-size--default {
  border: 0;
}
/* stylelint-enable */
</style>

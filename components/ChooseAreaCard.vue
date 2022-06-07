<template>
  <div v-if="displayControll()">
    <div class="d-none d-md-block">
      <div class="w-390">
        <v-card min-height="324" max-width="375" class="pa-4" outlined>
          <v-btn block color="error" min-height="48" outlined>
            <v-icon small>mdi-map-marker</v-icon>
            <span class="font-weight-black ml-2">現在地から探す</span>
          </v-btn>
          <div class="mt-3 d-flex justify-space-between flex-wrap w-343 h-232">
            <v-card
              v-for="(area, i) in areas"
              :key="i"
              hover
              outlined
              max-height="72"
              min-width="109"
              class="d-flex align-center"
              @click="fetchAreas(area)"
            >
              <v-card-text class="text-center font-weight-black">
                {{ area }}
              </v-card-text>
            </v-card>
          </div>
        </v-card>
      </div>
    </div>
    <div class="d-block d-md-none mt-4">
      <v-card min-height="377" max-width="960" class="pa-4" outlined>
        <div class="mt-3">
          <v-text-field
            placeholder="事業所名、市町村など"
            append-icon="mdi-magnify"
            outlined
            rounded
            hide-details
          ></v-text-field>
        </div>
        <v-divider class="pa-0 mt-5 mb-5"></v-divider>
        <v-btn block color="error" min-height="48" outlined>
          <v-icon small>mdi-map-marker</v-icon>
          <span class="font-weight-black ml-2">現在地から探す</span>
        </v-btn>
        <div
          class="mt-3 d-flex justify-space-between flex-wrap w-343 h-232 mx-auto"
        >
          <v-card
            v-for="(area, i) in areas"
            :key="i"
            hover
            outlined
            max-height="72"
            min-width="109"
            class="d-flex align-center"
            @click="fetchAreas(area)"
          >
            <v-card-text class="text-center font-weight-black">
              {{ area }}
            </v-card-text>
          </v-card>
        </div>
      </v-card>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
export default {
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
      display: true,
    }
  },
  computed: {
    ...mapGetters('areaData', [
      'getCount_area',
      'getCount_prefecture',
      'getCount_city',
    ]),
  },
  methods: {
    ...mapActions('areaData', [
      'setPrefectures',
      'setCities',
      'clearCities',
      'clearCurrentPrefecture',
      'set_one_city',
      'set_one_prefecture',
    ]),
    fetchAreas(chooseArea) {
      this.set_one_city()
      this.set_one_prefecture()
      this.setPrefectures(chooseArea)
      this.clearCities()
      this.clearCurrentPrefecture()
      // if(this.vuetify.breakpoint.mobile){ this.router.push('') }
    },
    fetchAreaToTokyo() {
      this.setPrefectures('関東')
      this.setCities('東京都')
    },
    displayControll() {
      // TODO ブレイキングポイントがモバイル用 + countが2以上
      if (this.$vuetify.breakpoint.mdAndUp) {
        return true
      } else if (
        (this.$vuetify.breakpoint.smAndDown && this.getCount_area > 1) ||
        this.getCount_prefecture > 1 ||
        this.getCount_city > 1
      ) {
        return false
      }
      return true
    },
  },
  mounted() {
    this.fetchAreaToTokyo()
  },
}
</script>
<style scoped>
.w-390 {
  min-width: 390px;
}

.w-343 {
  width: 342px;
}

.h-232 {
  height: 232px;
}
</style>

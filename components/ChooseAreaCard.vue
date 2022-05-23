<template>
  <div class="w-390">
    <v-card min-height="324" max-width="375" class="pa-4">
      <v-btn block color="error" min-height="48" outlined>
        現在地から探す
      </v-btn>
      <div class="mt-3 d-flex justify-space-between flex-wrap w-343 h-232">
        <v-card
          v-for="(area, i) in areas"
          :key="i"
          hover
          outlined
          max-height="72"
          min-width="109"
          @click="fetchAreas(area)"
        >
          {{ area }}
        </v-card>
      </div>
    </v-card>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
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
    }
  },
  methods: {
    ...mapActions('areaData', [
      'setPrefectures',
      'setCities',
      'clearCities',
      'clearTowns',
    ]),
    fetchAreas(chooseArea) {
      this.setPrefectures(chooseArea)
      this.clearCities()
      this.clearTowns()
    },
    fetchAreaToTokyo() {
      this.setPrefectures('関東')
      this.setCities('東京都')
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

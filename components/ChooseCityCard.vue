<template>
  <div v-if="displayControll()">
    <div class="d-none d-md-block">
      <v-card
        min-height="324"
        max-width="268"
        outlined
        class="pa-6 pt-5 pb-3 d-flex flex-column"
      >
        <v-list class="overflow-auto mb-auto" max-height="240">
          <v-list-item-group v-model="chooseItems" multiple active-class="">
            <v-list-item v-for="(city, i) in cities" :key="i" dense>
              <template #default="{ active }">
                <v-checkbox
                  :input-value="active"
                  class="mt-n1"
                  dense
                  hide-details
                  color="red"
                  @click="countUp()"
                >
                </v-checkbox>
                <v-list-item-content class="text-button pa-0 ml-n2">
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
            @click="clearChoosenItems()"
          >
            <span class="color-red">クリア</span></v-btn
          >
          <v-btn
            min-width="160"
            min-height="40"
            color="error"
            depressed
            class="font-weight-black"
            @click="SearchForOfficesChosenByAddress()"
            >検索する</v-btn
          >
        </div>
      </v-card>
    </div>
    <div class="d-block d-md-none pa-4">
      <h3 class="mb-4">エリアを選択してください</h3>
      <v-card
        color="grey lighten-1"
        outlined
        class="d-flex pl-2"
        min-height="40"
        hover
        @click="backPrefecture()"
      >
        <v-icon block>mdi-chevron-left</v-icon>
        <p class="text-body-2 my-auto">{{ choosePrefecture }}</p>
      </v-card>

      <v-card
        min-height="361"
        outlined
        class="pa-6 pt-5 pb-3 d-flex flex-column"
      >
        <v-list class="overflow-auto mb-auto pt-0" max-height="240">
          <v-list-item-group v-model="chooseItems" multiple active-class="">
            <v-list-item v-for="(city, i) in cities" :key="i" dense>
              <template #default="{ active }">
                <v-checkbox
                  :input-value="active"
                  class="mt-n1"
                  dense
                  hide-details
                  color="red"
                  @click="countUp()"
                >
                </v-checkbox>
                <v-list-item-content class="text-button pa-0 ml-n2">
                  {{ city.city }}
                </v-list-item-content>
                <v-icon block>mdi-chevron-right</v-icon>
              </template>
            </v-list-item>
          </v-list-item-group>
        </v-list>
        <div class="wrapper">
          <v-btn
            min-height="40"
            class="mr-2"
            outlined
            depressed
            @click="clearChoosenItems()"
          >
            <span class="color-red">クリア</span></v-btn
          >
          <v-btn
            min-height="40"
            color="error"
            depressed
            class="font-weight-black"
            @click="SearchForOfficesChosenByAddress()"
            >検索する</v-btn
          >
        </div>
      </v-card>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  data() {
    return {
      cities: [],
      // TODO 複数対応
      choosePrefecture: '',
      chooseItems: [],
      chooseArea: '',
    }
  },
  computed: {
    ...mapGetters('areaData', [
      '',
      'getCities',
      'getCurrentArea',
      'getCurrentPrefecture',
      'getCount_prefecture',
      'getCount_city',
    ]),
  },
  watch: {
    getCities() {
      this.cities = this.getCities
      this.chooseItems = []
    },
    getCurrentPrefecture() {
      this.choosePrefecture = this.getCurrentPrefecture
    },
    getCurrentArea() {
      this.chooseArea = this.getCurrentArea
    },
  },
  mounted() {
    if (this.cities.length === 0) {
      this.prefectures = this.getCities
    }
    this.chooseArea = this.getCurrentArea
    this.choosePrefecture = this.getCurrentPrefecture
  },
  methods: {
    ...mapActions('areaData', [
      'set_one_prefecture',
      'set_one_city',
      'increment_city',
      'increment_prefecture',
      'increment_area',
    ]),
    SearchForOfficesChosenByAddress() {
      if (this.chooseItems.length === 0) {
        alert('市町村を１つ以上選択してください。')
        return
      } else if (this.choosePrefecture.length === 0) {
        this.choosePrefecture = '東京都'
      }
      const arry = []
      Array.prototype.forEach.call(Object(this.chooseItems), (value) => {
        arry.push(encodeURI(this.cities[value].city))
      })
      this.$router.push({
        path: '/offices',
        query: {
          area: encodeURI(this.chooseArea),
          prefecture: encodeURI(this.choosePrefecture),
          cities: arry.join(),
          selectedList: this.chooseItems,
        },
      })
    },
    clearChoosenItems() {
      this.chooseItems = []
    },
    displayControll() {
      if (this.$vuetify.breakpoint.mdAndUp || this.getCount_city > 1) {
        return true
      } else if (
        (this.$vuetify.breakpoint.smAndDown &&
          this.getCount_prefecture === 1) ||
        this.getCount_prefecture === 1
      ) {
        return false
      }
      return true
    },
    backPrefecture() {
      this.chooseItems = []
      this.set_one_city()
      this.set_one_prefecture()
      this.increment_area()
    },
    countUp() {
      if (this.chooseItems.length >= 1) {
        this.increment_city()
      } else if (this.chooseItems.length === 0) {
        this.set_one_city()
      }
    },
  },
}
</script>
<style>
.color-red {
  color: red;
}

.wrapper {
  display: grid;
  grid-template-columns: 1fr 2fr;
}
</style>

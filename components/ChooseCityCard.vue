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
          <v-list-item v-for="(city, i) in cities" :key="i" dense>
            <v-checkbox
              v-model="chooseItems"
              class="mt-n1"
              multiple
              dense
              :value="cities[i].city"
              hide-details
              color="red"
            >
            </v-checkbox>
            <v-list-item-content class="text-button pa-0 ml-n2">
              {{ city.city }}
            </v-list-item-content>
            <v-icon block>mdi-chevron-right</v-icon>
          </v-list-item>
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
            @click="SearchForOfficesChosenByAddress"
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
          <p>{{ choosePrefecture }}</p>
          <v-list-item v-for="(city, i) in cities" :key="i" dense>
            <v-checkbox
              v-model="chooseItems"
              class="mt-n1"
              multiple
              dense
              :value="cities[i].city"
              hide-details
              color="red"
            >
            </v-checkbox>
            <v-list-item-content class="text-button pa-0 ml-n2">
              {{ city.city }}
            </v-list-item-content>
            <v-icon block>mdi-chevron-right</v-icon>
          </v-list-item>
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
            @click="SearchForOfficesChosenByAddress"
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
    }
  },
  watch: {
    getCities() {
      this.cities = this.getCities
      this.chooseItems = []
    },
    getCurrentPrefecture() {
      this.choosePrefecture = this.getCurrentPrefecture
    },
  },
  computed: {
    ...mapGetters('areaData', [
      'getCities',
      'getCurrentPrefecture',
      'getCount_prefecture',
    ]),
  },
  methods: {
    ...mapActions('areaData', ['set_one_prefecture']),
    async SearchForOfficesChosenByAddress() {
      if (this.chooseItems.length === 0) {
        alert('市町村を１つ以上選択してください。')
        return
      }
      try {
        const prefecture = encodeURI(this.choosePrefecture)
        const arry = []
        Array.prototype.forEach.call(Object(this.chooseItems), (value) => {
          arry.push(encodeURI(value))
        })
        const requestUrl = `offices?prefecture=${prefecture}&city=${arry}`
        await this.$axios.$get(requestUrl)
      } catch (error) {
        return error
      }
    },
    clearChoosenItems() {
      this.chooseItems = []
    },
    displayControll() {
      // vuexにcheckboxにチェックが入ったかを記録
      if (
        this.$vuetify.breakpoint.mdAndUp /* || this.chooseItems.length > 0 */
      ) {
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
      this.set_one_prefecture()
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

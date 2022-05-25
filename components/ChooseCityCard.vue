<template>
  <v-card
    min-height="324"
    max-width="268"
    outlined
    class="pa-6 pt-5 pb-3 d-flex flex-column"
  >
    <v-list class="overflow-auto mb-auto" max-height="240">
      <v-list-item-group>
        <v-list-item v-for="(city, i) in cities" :key="i" dense>
          <v-checkbox
            v-model="chooseItems"
            class="mt-n1"
            multiple
            dense
            :value="cities[i].city"
            hide-details
          >
          </v-checkbox>
          <v-list-item-content class="text-button pa-0">
            {{ city.city }}
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
    <div class="d-flex ml-n3">
      <v-btn min-width="80" min-height="40" class="mr-2" outlined depressed>
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
</template>
<script>
import { mapGetters } from 'vuex'
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
    ...mapGetters('areaData', ['getCities', 'getCurrentPrefecture']),
  },
  methods: {
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
  },
}
</script>
<style>
.color-red {
  color: red;
}
</style>

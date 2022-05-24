<template>
  <v-card
    min-height="324"
    max-width="268"
    class="pa-6 pt-5 pb-3 d-flex flex-column"
  >
    <v-list class="overflow-auto mb-auto" max-height="240">
      <v-list-item
        v-for="(city, i) in cities"
        :key="i"
        @click="checkItem(city.city)"
      >
        {{ city.city }}
      </v-list-item>
    </v-list>
    <div class="d-flex ml-n3">
      <v-btn min-width="80" min-height="40" class="mr-2">クリア</v-btn>
      <v-btn
        min-width="160"
        min-height="40"
        color="error"
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
      chooseCity: '',
      choosePrefecture: '',
    }
  },
  watch: {
    getCities() {
      this.cities = this.getCities
    },
    getCurrentPrefecture() {
      this.choosePrefecture = this.getCurrentPrefecture
    },
  },
  computed: {
    ...mapGetters('areaData', ['getCities', 'getCurrentPrefecture']),
  },
  methods: {
    checkItem(chooseItem) {
      this.chooseCity = chooseItem
    },
    async SearchForOfficesChosenByAddress() {
      try {
        const prefecture = encodeURI(this.choosePrefecture)
        const city = encodeURI(this.chooseCity)
        const requestUrl = `offices?prefecture=${prefecture}&city=${city}`
        await this.$axios.$get(requestUrl)
      } catch (error) {
        return error
      }
    },
  },
}
</script>

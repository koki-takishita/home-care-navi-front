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
      <v-btn min-width="160" min-height="40" color="error" @click="fetchTowns()"
        >検索する</v-btn
      >
    </div>
  </v-card>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  data() {
    return {
      cities: [],
      selectedCity: '',
    }
  },
  watch: {
    getCities() {
      this.cities = this.getCities
    },
  },
  computed: {
    ...mapGetters('areaData', ['getCities']),
  },
  methods: {
    ...mapActions('areaData', ['setTowns']),
    fetchTowns() {
      const chooseCity = this.selectedCity
      this.setTowns(chooseCity)
    },
    checkItem(chooseItem) {
      this.selectedCity = chooseItem
    },
  },
}
</script>

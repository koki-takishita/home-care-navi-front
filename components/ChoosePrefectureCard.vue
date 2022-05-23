<template>
  <div class="w-283">
    <v-card min-height="324" max-width="268" class="pa-6 pt-5">
      <v-list class="overflow-auto" max-height="270">
        <v-list-item
          v-for="(prefecture, i) in prefectures"
          :key="i"
          @click="fetchCities(prefecture)"
        >
          {{ prefecture }}
        </v-list-item>
      </v-list>
    </v-card>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  data() {
    return {
      prefectures: [],
    }
  },
  watch: {
    getPrefectures() {
      this.prefectures = this.getPrefectures
    },
  },
  computed: {
    ...mapGetters('areaData', ['getPrefectures']),
  },
  methods: {
    ...mapActions('areaData', ['setCities', 'clearTowns']),
    fetchCities(choosePrefecture) {
      this.setCities(choosePrefecture)
      this.clearTowns()
    },
  },
}
</script>
<style scoped>
.w-283 {
  min-width: 283px;
}
</style>

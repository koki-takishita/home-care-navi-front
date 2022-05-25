<template>
  <div class="w-283">
    <v-card min-height="324" max-width="268" class="pa-6 pt-5" outlined>
      <v-list dense class="overflow-auto" max-height="270">
        <v-list-item
          v-for="(prefecture, i) in prefectures"
          :key="i"
          @click="fetchCities(prefecture)"
        >
          <v-list-item-content>
            {{ prefecture }}
          </v-list-item-content>
          <v-list-item-icon>
            <v-icon block>mdi-chevron-right</v-icon>
          </v-list-item-icon>
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
    ...mapActions('areaData', ['setCities']),
    fetchCities(choosePrefecture) {
      this.setCities(choosePrefecture)
    },
  },
}
</script>
<style scoped>
.w-283 {
  min-width: 283px;
}
</style>

<template>
  <div v-if="displayControll()">
    <div class="d-none d-md-block">
      <div class="w-283">
        <v-card min-height="324" max-width="268" class="pa-6 pt-5" outlined>
          <v-list dense class="overflow-auto" max-height="270">
            <v-list-item
              v-for="(prefecture, i) in prefectures"
              :key="i"
              @click="fetchCities(prefecture)"
            >
              <v-list-item-content class="text-button">
                <span class="">{{ prefecture }}</span>
              </v-list-item-content>
              <v-list-item-icon>
                <v-icon block>mdi-chevron-right</v-icon>
              </v-list-item-icon>
            </v-list-item>
          </v-list>
        </v-card>
      </div>
    </div>
    <div class="d-block d-md-none pa-4">
      <h3 class="mb-4">エリアを選択してください</h3>
      <div class="w-283">
        <v-card
          color="grey lighten-1"
          outlined
          class="d-flex pl-2"
          min-height="40"
          hover
          @click="backArea()"
        >
          <v-icon block>mdi-chevron-left</v-icon>
          <p class="text-body-2 my-auto">{{ selectedArea }}地方</p>
        </v-card>
        <v-card max-width="960" class="pa-6 pt-5" outlined>
          <v-list dense class="overflow-auto pt-0">
            <p>{{ selectedArea }}</p>
            <v-list-item
              v-for="(prefecture, i) in prefectures"
              :key="i"
              @click="fetchCities(prefecture)"
            >
              <v-list-item-content class="text-button">
                <span class="">{{ prefecture }}</span>
              </v-list-item-content>
              <v-list-item-icon>
                <v-icon block>mdi-chevron-right</v-icon>
              </v-list-item-icon>
            </v-list-item>
          </v-list>
        </v-card>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  data() {
    return {
      prefectures: [],
      selectedArea: '',
    }
  },
  watch: {
    getPrefectures() {
      this.prefectures = this.getPrefectures
    },
    getCurrentArea() {
      this.selectedArea = this.getCurrentArea
    },
  },
  mounted() {
    if (this.prefectures.length === 0) {
      this.prefectures = this.getPrefectures
    }
  },
  computed: {
    ...mapGetters('areaData', [
      'getCurrentArea',
      'getPrefectures',
      'getCount_prefecture',
      'getCount_area',
    ]),
  },
  methods: {
    ...mapActions('areaData', [
      'setCities',
      'set_one_area',
      'set_one_city',
      'set_one_prefecture',
    ]),
    fetchCities(choosePrefecture) {
      this.set_one_city()
      this.set_one_prefecture()
      this.setCities(choosePrefecture)
    },
    displayControll() {
      if (this.$vuetify.breakpoint.mdAndUp) {
        return true
      } else if (
        (this.$vuetify.breakpoint.smAndDown && this.getCount_prefecture > 1) ||
        this.getCount_area === 1
      ) {
        return false
      }
      return true
    },
    backArea() {
      this.set_one_area()
    },
  },
}
</script>
<style scoped>
.w-283 {
  min-width: 283px;
}
</style>

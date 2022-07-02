<template>
  <v-card rounded flat tile class="pa-4 pt-5">
    <div>
      <!--
        v-model="keyword"
-->
      <v-text-field
        append-icon="mdi-magnify"
        outlined
        rounded
        dense
        height="44"
        hide-details
        @click:append="clickBtn(btnType.search)"
      ></v-text-field>
    </div>
    <v-divider class="my-5"></v-divider>
    <v-btn
      block
      color="error"
      min-height="48"
      outlined
      @click="clickBtn(btnType.location)"
    >
      <v-icon small>mdi-map-marker</v-icon>
      <span class="font-weight-black ml-2">現在地から探す</span>
    </v-btn>
    <div class="mt-4"></div>
    <v-row dense justify="space-between">
      <v-col v-for="(area, i) in areas" :key="i" cols="4">
        <TopAreaPanel
          :item="area"
          :selected-item="selectedArea"
          @sendArea="setSelectedArea"
        />
      </v-col>
    </v-row>
  </v-card>
</template>
<script>
export default {
  props: {
    item: {
      type: String,
      required: true,
    },
  },
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
      isActive: false,
      selectedArea: '',
    }
  },
  computed: {
    selectedItem: {
      get() {
        return this.item
      },
    },
  },
  watch: {
    selectedItem() {
      this.selectedArea = this.selectedItem
    },
  },
  methods: {
    setSelectedArea(area) {
      this.selectedArea = area
      this.$emit('sendArea', this.selectedArea)
    },
  },
}
</script>

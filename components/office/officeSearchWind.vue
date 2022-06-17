<template>
  <div>
    <p class="font-weight-black mt-3">検索条件</p>
    <v-text-field
      append-icon="mdi-magnify"
      outlined
      rounded
      dense
      height="44"
      hide-details
    ></v-text-field>
    <v-divider class="my-4"></v-divider>
    <v-card outlined class="d-flex" :ripple="false" @click="clickEvent()">
      <p class="mb-0 text-body-2">
        <font color="#6D7570" class="text-caption font-weight-black mr-4"
          >エリア</font
        >現在地周辺 (3km)
      </p>
      <v-icon class="ml-auto">mdi-chevron-right</v-icon>
    </v-card>
    <v-btn
      block
      color="error"
      min-height="40"
      outlined
      class="my-4"
      @click="clickBtn"
    >
      <v-icon small>mdi-map-marker</v-icon>
      <span class="font-weight-black ml-2">現在地から探す</span>
    </v-btn>
  </div>
</template>
<script>
export default {
  methods: {
    clickEvent() {
      this.$emit('clickLocation')
    },
    clickBtn() {
      this.$emit('clickBtnLocation')
    },
  },
}
</script>
<style scoped>
/* stylelint-disable */
.d-flex.v-card.v-sheet.v-sheet--outlined.theme--light {
  border: 0;
}

.d-flex.v-card.v-sheet.v-sheet--outlined.theme--light:hover {
  cursor: pointer;
}

/* stylelint-enable */
</style>

<template>
  <div :class="setSpaceY">
    <v-card
      v-if="isIndexNumZero"
      min-height="61"
      tile
      outlined
      :color="lightGreen"
    >
      <v-row no-gutters>
        <v-col cols="1" class="text-center">
          <v-icon color="#AEB5B2">mdi-account</v-icon>
        </v-col>
        <v-col cols="11">
          <v-card-title class="pa-0">
            <p class="text-caption font-weight-black mb-0">
              ユーザーからのお礼のコメント
            </p>
          </v-card-title>
          <v-card-text class="pa-0 text-caption min-line-height">
            <p class="mb-0">{{ ReadThankComments }}</p>
          </v-card-text>
        </v-col>
      </v-row>
    </v-card>
    <p
      v-if="isIndexNumOne"
      class="ma-0 text-right my-1 text-caption font-weight-black"
      @click="toggleList"
    >
      <font :color="linkColor">{{ toggleMessage }}</font>
      <v-icon :color="linkColor" class="mt-n1">{{ toggleIcon }}</v-icon>
    </p>
  </div>
</template>
<script>
export default {
  props: {
    thank: {
      type: [Object, Number],
      default: null,
    },
    indexNum: {
      type: Number,
      default: null,
    },
    count: {
      type: Number,
      default: null,
    },
    isOpen: {
      type: Boolean,
      default: null,
    },
  },
  computed: {
    ReadThank() {
      return this.thank
    },
    ReadIndexNum() {
      return this.indexNum
    },
    ReadOpen() {
      return this.isOpen
    },
    ReadCount() {
      return this.count
    },
    ReadThankComments() {
      let msg
      if (typeof this.ReadThank === 'number') {
        msg = 'お礼はまだ投稿されていません'
      } else {
        msg = this.ReadThank.comments
      }
      return msg
    },
    lightGreen() {
      return 'rgba(169, 240, 209, 16%)'
    },
    linkColor() {
      return '#F06364'
    },
    setSpaceY() {
      let margin
      if (this.ReadIndexNum === 0) {
        if (this.$vuetify.breakpoint.xs) {
          margin = 'mt-4'
        } else {
          margin = 'mt-n6'
        }
      } else if (
        this.ReadOpen &&
        this.ReadIndexNum > 0 &&
        this.ReadCount - 1 !== this.ReadIndexNum
      ) {
        margin = 'mb-2'
      }
      return margin
    },
    toggleMessage() {
      let msg
      if (this.isOpen) {
        msg = '閉じる'
      } else {
        msg = `ほかの${this.ReadCount - 1}件のお礼を見る`
      }
      return msg
    },
    toggleIcon() {
      let icon
      if (this.isOpen) {
        icon = 'mdi-chevron-up'
      } else {
        icon = 'mdi-chevron-down'
      }
      return icon
    },
    isIndexNumOne() {
      if (this.ReadIndexNum === 0 && this.ReadCount > 1) {
        return true
      } else {
        return false
      }
    },
    isIndexNumZero() {
      if (this.ReadIndexNum === 0) {
        return true
      } else {
        return this.ReadOpen
      }
    },
  },
  methods: {
    toggleList() {
      this.$emit('thanksListOpen', this.ReadOpen)
    },
  },
}
</script>
<style scoped>
.min-line-height {
  line-height: 1.1;
}
</style>

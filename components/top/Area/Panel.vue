<template>
  <v-card
    height="72"
    rounded
    outlined
    ripple
    class="cursor-pointer text-center py-6 font-weight-black"
    @click.native="clickArea(area)"
  >
    <font :color="setActiveClass">{{ area }}</font>
  </v-card>
</template>
<script>
export default {
  props: {
    item: {
      type: String,
      required: true,
    },
    selectedItem: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      isActive: false,
    }
  },
  computed: {
    area: {
      get() {
        return this.item
      },
    },
    selectedArea: {
      get() {
        return this.selectedItem
      },
    },
    setActiveClass() {
      return this.isActive ? 'black' : '#6D7570'
    },
  },
  watch: {
    selectedArea() {
      this.setIsActive(this.area, this.selectedArea)
    },
  },
  methods: {
    clickArea(area) {
      this.$emit('sendArea', area)
    },
    setIsActive(area, selectedArea) {
      if (area === selectedArea) {
        this.isActive = true
      } else {
        this.isActive = false
      }
    },
  },
}
</script>
<style scoped>
.cursor-pointer {
  cursor: pointer;
}
</style>

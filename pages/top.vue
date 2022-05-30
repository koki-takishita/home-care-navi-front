<template>
  <div class="w-990 mx-auto mt-n2 mb-2">
    <SubTitle />
    <div class="mx-auto h-74 d-none d-md-flex align-end">
      <p class="color-dark-gray font-weight-black text-body-1">
        エリアから探す
      </p>
    </div>
    <div :class="toggleClassByBreakpoints">
      <ChooseAreaCard />
      <ChoosePrefectureCard />
      <ChooseCityCard />
    </div>
  </div>
</template>
<script>
export default {
  layout: 'application',
  data() {
    return {
      toggleSize: 960,
      mobileStyle: '',
      pcStyle: 'd-flex justify-space-between',
    }
  },
  computed: {
    toggleClassByBreakpoints() {
      // TODO mountedでやろうと思ったけど、mountedだとページの幅を変えた時が検知しない
      if (this.$vuetify.breakpoint.smAndDown) {
        return this.mobileStyle
      } else {
        return this.pcStyle
      }
    },
  },
}
</script>
<style scoped>
.w-990 {
  max-width: 990px;
}

.h-74 {
  min-height: 74px;
}

.color-dark-gray {
  color: #2e3331;
}
</style>

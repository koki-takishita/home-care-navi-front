<template>
  <div class="w-990 mx-auto mt-n2 mb-2">
    <SubTitle />
    <div class="mx-auto h-74">
      <!--親要素の下に配置-->
      <p>エリアから探す</p>
    </div>
    <div class="d-flex justify-space-between">
      <ChooseAreaCard />
      <ChoosePrefectureCard />
      <ChooseCityCard />
    </div>
  </div>
</template>
<script>
export default {
  layout: 'application',
}
</script>
<style scoped>
.w-990 {
  max-width: 990px;
}

.h-74 {
  min-height: 74px;
}
</style>

<template>
  <div>
    <div class="d-md-none">
      <div class="d-flex justify-space-between mb-6">
        <v-card-title class="pa-0 font-weight-bold text-18px">{{
          title
        }}</v-card-title>
        <NuxtLink
          :to="path"
          class="text-decoration-none text-body-2 color-red"
          >{{ link }}</NuxtLink
        >
      </div>
    </div>
    <div class="d-none d-md-block mb-6">
      <NuxtLink
        :to="path"
        class="link-style d-block text-right text-decoration-none text-body-2 md-99 color-red"
        >{{ link }}</NuxtLink
      >
      <p class="pa-0 mb-12 font-weight-bold text-18px text-center">
        {{ title }}
      </p>
    </div>
  </div>
</template>
<script>
export default {
  name: 'FormTitle',
  props: ['title', 'link', 'path'],
}
</script>
<style lang="sass" scoped>
.color-red
   color: #F06364
.link-style
   margin-right: -99px
</style>

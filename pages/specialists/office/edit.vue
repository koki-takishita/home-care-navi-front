<template>
  <v-card class="mx-auto mb-2 p-0" width="750" height="338">
    <div>事業所編集画面<br /></div>
    <div>事業所名：{{ office.name }}</div>
  </v-card>
</template>

<script>
export default {
  layout: 'application_specialists',
  middleware: 'authentication',
  async asyncData({ $axios }) {
    try {
      const res = await $axios.$get(`/specialists/offices`)
      return {
        office: res,
      }
    } catch (error) {
      return error
    }
  },
  data() {
    return {}
  },
}
</script>

<template>
  <v-col cols="12" md="8" lg="7" xl="7" class="mx-auto">
    <h3>閲覧履歴</h3>
    <p class="font-weight-black">{{ conversionStringToOfficeCount }}</p>
    <v-row class="mt-4">
      <v-col v-for="(office, index) in offices" :key="index" cols="12" md="6">
        <officeCard :office="office" />
      </v-col>
    </v-row>
  </v-col>
</template>

<script>
export default {
  layout: 'application',
  middleware: 'authentication',
  async asyncData({ $axios }) {
    try {
      const res = await $axios.$get(`histories`)
      let officeCount = 0
      if (res.length !== 0) {
        officeCount = res.length
      }
      return {
        officeCount,
        offices: res,
      }
    } catch (error) {
      return error
    }
  },
  computed: {
    conversionStringToOfficeCount() {
      return '最新' + this.officeCount + '件'
    },
  },
  methods: {
    moveShow(id) {
      this.$router.push({ path: `/offices/${id}` })
    },
  },
}
</script>
<style scoped>
.cursor-pointer {
  cursor: pointer;
}

.set-max-layout {
  max-height: 50px;
  line-height: normal;
}
</style>

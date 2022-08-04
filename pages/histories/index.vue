<template>
  <v-col cols="12" md="8" lg="7" xl="7" class="mx-auto">
    <h3>閲覧履歴</h3>
    <div v-if="historiesExist">
      <p class="font-weight-black">{{ conversionStringToOfficeCount }}</p>
      <v-row class="mt-4">
        <v-col v-for="(office, index) in offices" :key="index" cols="12" md="6">
          <officeCard :office="office" />
        </v-col>
      </v-row>
    </div>
    <div v-else class="not-histories-comment mt-16">
      <p class="text-center text-subtitle-1">閲覧履歴はありません</p>
      <ThankBackLink class="text-center" :text="backText" @movePage="moveTop" />
    </div>
  </v-col>
</template>

<script>
export default {
  layout: 'application',
  middleware: 'authentication',
  async asyncData({ $axios }) {
    try {
      const res = await $axios.$get(`histories`)
      return {
        officeCount: res.length,
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
    historiesExist() {
      return this.officeCount > 0
    },
    backText() {
      return 'ホームケアナビトップに戻る'
    },
  },
  methods: {
    moveShow(id) {
      this.$router.push({ path: `/offices/${id}` })
    },
    moveTop() {
      this.$router.push('/')
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

.not-histories-comment {
  color: #6d7570;
}
</style>

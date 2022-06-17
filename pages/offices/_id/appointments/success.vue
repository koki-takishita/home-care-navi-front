<template>
  <v-card outlined width="750" class="mx-auto mt-10">
    <v-card-text>
      <div>
        <h1 class="text-center mt-8 title-text d-none d-sm-block">
          Web予約完了
        </h1>
      </div>
      <div>
        <h1 class="mt-8 title-text d-sm-none">Web予約完了</h1>
      </div>
      <div class="text-center mt-12">
        <p>ご予約が完了しました。<br />事業所からの連絡をお待ちください。</p>
      </div>
      <p class="mb-16 text-center">
        <NuxtLink to=".." class="text-overline text-decoration-none link-color"
          >事業所のページに戻る</NuxtLink
        >
      </p>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  layout: 'application',
  middleware: 'authentication',
  data() {
    return {}
  },
}
</script>
<style scoped>
.link-color {
  color: #e44343;
}
</style>

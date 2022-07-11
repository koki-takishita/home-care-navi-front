<template>
  <v-card class="pb-8">
    <v-card-title class="pb-0 pt-8 font-weight-black justify-center"
      >お礼の投稿完了</v-card-title
    >
    <v-card-text class="mt-12 text-center">
      お礼の投稿が完了しました。<br />
      投稿いただきありがとうございました。
      <ThankBackLink class="mt-8 mb-4" :object="office" />
    </v-card-text>
  </v-card>
</template>
<script>
export default {
  props: {
    object: {
      type: Object,
      required: true,
    },
  },
  computed: {
    labelColor() {
      return '#6D7570'
    },
    linkColor() {
      return '#F06364'
    },
    office() {
      return this.object
    },
  },
}
</script>

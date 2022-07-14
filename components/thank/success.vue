<template>
  <v-card class="pb-8">
    <v-card-title class="pb-0 pt-8 font-weight-black justify-center"
      >お礼の投稿完了</v-card-title
    >
    <v-card-text class="mt-12 text-center">
      お礼の投稿が完了しました。<br />
      投稿いただきありがとうございました。
      <ThankBackLink
        class="mt-8 mb-4"
        :object="office"
        :text="linkText"
        @movePage="backPage"
      />
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
    linkText() {
      return `${this.office.name}に戻る`
    },
    linkColor() {
      return '#F06364'
    },
    office() {
      return this.object
    },
  },
  methods: {
    backPage() {
      this.$router.push(`/offices/${this.office.id}`)
    },
  },
}
</script>

<template>
  <div class="send-card mx-auto">
    <p :class="titleClass">パスワードのリセット完了</p>
    <v-card-text class="text-center pt-0">
      入力いただいたメールアドレスに<br />新しいパスワードを送付いたしました。
    </v-card-text>
    <ThankBackLink class="text-center" :text="linkText" @movePage="goTop" />
  </div>
</template>
<script>
export default {
  layout: 'application',
  computed: {
    linkText() {
      return 'ホームケアナビトップにもどる'
    },
    // breakpointで中央揃え、左揃えに切り替える
    titleClass() {
      if (this.isMobile) {
        return 'text-left text-h6 font-weight-black mb-10'
      } else {
        return 'text-center text-h6 font-weight-black mb-10'
      }
    },
    isMobile() {
      return this.$vuetify.breakpoint.smAndDown
    },
  },
  methods: {
    goTop() {
      this.$router.push('/')
    },
  },
}
</script>
<style scoped>
.send-card {
  max-width: 520px;
}
</style>

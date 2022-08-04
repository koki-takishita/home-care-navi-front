<template>
  <div class="send-card mx-auto">
    <p :class="titleClass">パスワードのリセット完了</p>
    <v-card-text class="text-center pt-0">
      <font
        >確認メールを送付しました。<br />リンクをクリックして新しいパスワードを設定してください。</font
      >
    </v-card-text>
    <ThankBackLink
      class="text-center"
      :text="linkText"
      :color="TextColor"
      @movePage="goPage"
    />
  </div>
</template>
<script>
export default {
  layout: 'application',
  props: {
    textColor: {
      type: String,
      default: '#F06364',
    },
    type: {
      type: String,
      default: 'customer',
    },
  },
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
    TextColor() {
      return this.textColor
    },
    Type() {
      return this.type
    },
  },
  methods: {
    goPage() {
      this.Type === 'specialist' ? this.goAppointment() : this.goTop()
    },
    goTop() {
      this.$router.push('/users/login')
    },
    goAppointment() {
      this.$router.push('/specialists/login')
    },
  },
}
</script>
<style scoped>
.send-card {
  max-width: 520px;
}
</style>

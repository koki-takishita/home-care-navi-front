<template>
  <v-btn
    class="btn__login"
    block
    depressed
    color="#F06364"
    :height="btnHeight"
    min-height="48"
  >
    <p class="btn__text mb-0 text-h6 font-weight-bold">ログイン</p>
  </v-btn>
</template>
<script>
export default {
  layout: 'btn',
  computed: {
    btnHeight() {
      switch (this.$vuetify.breakpoint.name) {
        case 'sm':
          return 48
        case 'md':
          return 60
        case 'lg':
          return 60
        case 'xl':
          return 60
      }
    },
  },
}
</script>
<style lang="sass" scoped>
.btn__text
  color: white
</style>

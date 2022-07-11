<template>
  <v-card
    id="back-link"
    outlined
    class="text-decoration-none"
    @click.native="movePage"
  >
    <v-icon v-if="iconFlag" size="20" :color="linkColor"
      >mdi-chevron-left</v-icon
    >
    <font size="2" :color="linkColor">{{ linkText }}</font>
  </v-card>
</template>
<script>
export default {
  props: {
    object: {
      type: Object,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    icon: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    id() {
      return this.object.id
    },
    linkText() {
      return this.text
    },
    linkColor() {
      return '#F06364'
    },
    iconFlag() {
      return this.icon
    },
  },
  methods: {
    movePage() {
      this.$emit('movePage')
    },
  },
}
</script>
<style scoped>
#back-link {
  background: none;
  cursor: pointer;
  border: 0;
}
</style>

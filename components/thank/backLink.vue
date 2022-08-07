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
    <font :size="textSize" :color="linkColor">{{ linkText }}</font>
  </v-card>
</template>
<script>
export default {
  props: {
    object: {
      type: Object,
      default: null,
    },
    text: {
      type: String,
      required: true,
    },
    icon: {
      type: Boolean,
      default: false,
    },
    size: {
      type: Number,
      default: 2,
    },
    color: {
      type: String,
      default: '#F06364',
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
      return this.color
    },
    iconFlag() {
      return this.icon
    },
    textSize() {
      return this.size
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

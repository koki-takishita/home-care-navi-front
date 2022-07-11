<template>
  <v-card
    id="back-link"
    outlined
    class="text-decoration-none"
    @click.native="backPage"
  >
    <v-icon size="20" :color="linkColor">mdi-chevron-left</v-icon>
    <font size="2" :color="linkColor">{{ backText }}</font>
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
    id() {
      return this.object.id
    },
    backText() {
      return `${this.object.name} にもどる`
    },
    linkColor() {
      return '#F06364'
    },
  },
  methods: {
    backPage() {
      this.$router.push(`/offices/${this.id}`)
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

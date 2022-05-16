<template>
  <div class="my-2">
    <v-alert
      v-for="(msg, i) in msgs"
      :key="i"
      type="error"
      max-width="750"
      min-width="350"
      class="mx-auto mb-2"
    >
      {{ msg }}
    </v-alert>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      msgs: [],
    }
  },
  computed: {
    ...mapGetters('catchErrorMsg', ['getMsg', 'emptyState']),
  },
  watch: {
    emptyState() {
      this.msgs = this.getMsg
    },
  },
}
</script>

<template>
  <div class="my-2">
    <v-alert
      v-for="(msg, i) in msgs"
      :key="i"
      :type="type"
      max-width="750"
      min-width="350"
      v-model="alert"
      dismissible
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
      type: 'error',
    }
  },
  computed: {
    ...mapGetters('catchErrorMsg', ['getMsg', 'getType', 'emptyState']),
  },
  watch: {
    getMsg() {
      this.msgs = this.getMsg
    },
    getType() {
      this.type = this.getType
    },
  },
}
</script>

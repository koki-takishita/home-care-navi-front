<template>
  <div class="my-2">
    <v-alert
      v-for="(msg, i) in GetMsg"
      :key="i"
      :type="GetType"
      max-width="750"
      min-width="350"
      dismissible
      class="mx-auto mb-2"
      :value="alert"
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
      // v-alertコンポネント表示するかしないかのフラグ
      // vale props 参照
      // https://vuetifyjs.com/ja/api/v-alert/
      alert: false,
    }
  },
  computed: {
    ...mapGetters('catchErrorMsg', ['getMsg', 'getType']),
    GetMsg() {
      return this.getMsg
    },
    GetType() {
      return this.getType
    },
  },
  watch: {
    // リクエストが成功: 指定した時間後にフラッシュ消える
    // リクエストが失敗: 残り続ける ※エラー内容を読んでもらうたため
    GetMsg() {
      this.alert = true
      if (this.GetType === 'success') {
        setTimeout(() => {
          this.alert = false
        }, 5000)
      }
    },
  },
}
</script>

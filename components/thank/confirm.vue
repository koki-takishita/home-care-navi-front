<template>
  <v-card class="pb-8">
    <v-card-title class="pb-0 font-weight-black">お礼の投稿</v-card-title>
    <p class="px-4 mt-6 mb-0 font-weight-black">
      <font :color="labelColor" size="2">事業所名</font>
    </p>
    <v-card-text class="text-subtitle-1 pt-2"
      ><font color="Black">{{ ReadOffice.name }}</font></v-card-text
    >
    <div class="px-4">
      <label class="font-color-gray font-weight-black text-subtitle-2">
        <font :color="labelColor">お礼をするスタッフ</font>
        <p class="font-weight-light mt-2">
          <font size="3">{{ ReadSelectedStaff.name }}</font>
        </p>
      </label>
    </div>
    <div class="px-4 mb-8">
      <label class="font-color-gray text-subtitle-2">
        <font :color="labelColor" class="font-weight-black">お礼の内容</font>
        <v-textarea
          :value="ReadComment"
          hide-details
          outlined
          readonly
          class="font-weight-light mt-2"
          auto-grow
        >
        </v-textarea>
      </label>
    </div>
    <div class="px-4">
      <v-btn
        block
        depressed
        height="60"
        color="error"
        class="font-weight-black"
        @click="clickCreateThank"
        ><font size="4">お礼を投稿する</font>
      </v-btn>
    </div>
    <p class="mt-1 mb-0 text-center" @click="backPage">
      <font :color="linkColor" class="link-color" size="2">もどる</font>
    </p>
  </v-card>
</template>
<script>
export default {
  props: {
    office: {
      type: Object,
      default: null,
    },
    staff: {
      type: Object,
      default: null,
    },
    comment: {
      type: String,
      default: null,
    },
  },
  computed: {
    ReadOffice() {
      return this.office
    },
    ReadSelectedStaff() {
      return this.staff
    },
    ReadComment() {
      return this.comment
    },
    replaceComment() {
      const str = String(this.ReadComment)
      const res = str.replace(/\r?\n/g, '<br>')
      return res
    },
    labelColor() {
      return '#6D7570'
    },
    linkColor() {
      return '#F06364'
    },
  },
  methods: {
    clickCreateThank() {
      this.$emit('createThank')
    },
    backPage() {
      const obj = {}
      obj.step = 1
      obj.staff = this.ReadSelectedStaff
      obj.comment = this.ReadComment
      this.$emit('moveConfirmPage', obj)
    },
  },
}
</script>
<style scoped>
.link-color {
  cursor: pointer;
}

/* stylelint-disable */
.v-text-field--outlined >>> fieldset {
  border: 0;
}
/* stylelint-enable */
</style>

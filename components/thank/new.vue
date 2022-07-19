<template>
  <v-card class="pb-6">
    <v-card-title class="pb-0 font-weight-black">お礼の投稿</v-card-title>
    <p class="px-4 mt-6 mb-0 font-weight-black">
      <font :color="labelColor" size="2">事業所名</font>
    </p>
    <v-card-text class="text-subtitle-1 pt-2"
      ><font color="Black">{{ ReadOffice.name }}</font></v-card-text
    >
    <v-form ref="form" v-model="valid">
      <div class="px-4">
        <label class="font-color-gray font-weight-black text-subtitle-2">
          <font :color="labelColor">お礼をするスタッフ</font>
          <v-select
            v-model="SelectedStaff"
            :rules="[formValidates.objRequired]"
            return-object
            class="mt-2 font-weight-regular"
            :items="ReadStaffs"
            item-text="name"
            item-value="id"
            outlined
            dense
            placeholder="選択してください"
          ></v-select>
        </label>
      </div>
      <div class="px-4">
        <label class="font-color-gray font-weight-black text-subtitle-2">
          <font :color="labelColor">お礼の内容</font>
          <v-textarea
            v-model="Comment"
            :rules="[formValidates.required]"
            class="font-weight-light mt-2"
            height="140"
            placeholder="入力してください"
            outlined
          >
          </v-textarea>
        </label>
      </div>
    </v-form>
    <div class="px-4">
      <v-btn
        :disabled="!valid"
        block
        depressed
        height="60"
        color="error"
        class="font-weight-black"
        @click="clickConfirmBtn"
        ><font size="4">確認へ進む</font>
      </v-btn>
    </div>
  </v-card>
</template>
<script>
export default {
  props: {
    office: {
      type: Object,
      required: true,
    },
    staffs: {
      type: Array,
      default: null,
    },
    selectedStaff: {
      type: Object,
      default: null,
    },
    comment: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      formValidates: {
        required: (value) => !!value || '必須項目です',
        objRequired: (value) => !!value.id || '必須項目です',
      },
      valid: false,
    }
  },
  computed: {
    ReadOffice() {
      return this.office
    },
    ReadStaffs() {
      return this.staffs
    },
    SelectedStaff: {
      get() {
        return this.selectedStaff
      },
      set(SelectedStaff) {
        this.$emit('update:selectedStaff', SelectedStaff)
      },
    },
    Comment: {
      get() {
        return this.comment
      },
      set(Comment) {
        this.$emit('update:comment', Comment)
      },
    },
    labelColor() {
      return '#6D7570'
    },
  },
  methods: {
    clickConfirmBtn() {
      const obj = {}
      obj.step = 2
      obj.staff = this.SelectedStaff
      obj.comment = this.Comment
      this.$emit('moveConfirmPage', obj)
    },
  },
}
</script>
<style scoped>
/* stylelint-disable */
.v-text-field--outlined >>> fieldset {
  border-color: #d9dede;
}
/* stylelint-enable */
</style>

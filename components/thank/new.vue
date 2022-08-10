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
        <v-row>
          <v-col>
            <label class="font-color-gray font-weight-black text-subtitle-2">
              <font :color="labelColor">利用者名</font>
              <v-text-field
                v-model="Name"
                :rules="[formValidates.required, formValidates.nameLength]"
                class="font-weight-light mt-2"
                placeholder="田中 太郎"
                outlined
              >
              </v-text-field>
            </label>
          </v-col>
          <v-col>
            <label class="font-color-gray font-weight-black text-subtitle-2">
              <font :color="labelColor">年齢</font>
              <v-select
                v-model="Age"
                :items="ageList"
                :rules="[formValidates.required]"
                type="number"
                class="font-weight-light mt-2"
                placeholder="60歳"
                outlined
              ></v-select>
            </label>
          </v-col>
        </v-row>
      </div>
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
            :rules="[formValidates.required, formValidates.strLength]"
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
    age: {
      type: String,
      default: null,
    },
    name: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      formValidates: {
        required: (value) => !!value || '必須項目です',
        objRequired: (value) => !!value.id || '必須項目です',
        strLength: (value) =>
          value.length <= 120 || '120文字以内で入力してください',
        nameLength: (value) =>
          value.length < 31 || '30文字以内で入力してください',
      },
      valid: false,
    }
  },
  computed: {
    ageList() {
      const array = new Array(61)
      for (let i = 0; i < 61; ++i) {
        array[i] = `${60 + i}歳`
      }
      return array
    },
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
    Name: {
      get() {
        return this.name
      },
      set(Name) {
        this.$emit('update:name', Name)
      },
    },
    Age: {
      get() {
        return this.age
      },
      set(Age) {
        const age = Age
        this.$emit('update:age', age)
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
      obj.age = this.Age
      obj.name = this.Name
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

<template>
  <div>
    <v-card class="mx-auto mb-2 p-0" width="750">
      <v-col cols="12"><h3>事業所登録</h3></v-col>
      <v-form v-model="valid">
        <v-col cols="12">
          <label class="font-color-gray font-weight-black text-caption"
            >事業所名
            <v-text-field
              v-model="name"
              :rules="[formValidates.required, formValidates.nameCountCheck]"
              class="mt-2 font-weight-regular"
              placeholder="ケアパークむかい風"
              outlined
              dense
              height="44"
          /></label>
          <label class="font-color-gray font-weight-black text-caption"
            >特徴タイトル
            <v-text-field
              v-model="title"
              :rules="[formValidates.required, formValidates.titleCountCheck]"
              class="mt-2 font-weight-regular"
              placeholder="事業所紹介タイトル"
              outlined
              dense
              height="44"
          /></label>
          <v-file-input
            v-model="officeImages"
            multiple
            :rules="[formValidates.fileSizeCheck]"
            truncate-length="20"
            accept="image/*"
            prepend-icon="mdi-camera"
            label="事業所画像をアップロードする"
            class="image-form"
          >
          </v-file-input>
          <label class="font-color-gray font-weight-black text-caption"
            >休業日
          </label>
          <v-row class="mt-2 mb-2 mx-auto">
            <v-col cols="1" class="mx-5"
              ><label
                >日<input
                  v-model="selected"
                  value="日"
                  type="checkbox"
                  class="mr-3" /></label
            ></v-col>
            <v-col cols="1" class="mx-5"
              ><label
                >月<input
                  v-model="selected"
                  value="月"
                  type="checkbox"
                  class="mr-3" /></label
            ></v-col>
            <v-col cols="1" class="mx-5"
              ><label
                >火<input
                  v-model="selected"
                  value="火"
                  type="checkbox"
                  class="mr-3" /></label
            ></v-col>
            <v-col cols="1" class="mx-5"
              ><label
                >水<input
                  v-model="selected"
                  value="水"
                  type="checkbox"
                  class="mr-3" /></label
            ></v-col>
            <v-col cols="1" class="mx-5"
              ><label
                >木<input
                  v-model="selected"
                  value="木"
                  type="checkbox"
                  class="mr-3" /></label
            ></v-col>
            <v-col cols="1" class="mx-5"
              ><label
                >金<input
                  v-model="selected"
                  value="金"
                  type="checkbox"
                  class="mr-3" /></label
            ></v-col>
            <v-col cols="1" class="mx-5"
              ><label
                >土<input
                  v-model="selected"
                  value="土"
                  type="checkbox"
                  class="mr-3" /></label
            ></v-col>
          </v-row>
          <label class="font-color-gray font-weight-black text-caption"
            >営業日に関する説明
            <v-textarea
              v-model="business_day_detail"
              :rules="[
                formValidates.required,
                formValidates.businessDayDetailCountCheck,
              ]"
              class="mt-2 font-weight-regular"
              placeholder="例｝ 第ニと第三土曜日は営業しています"
              height="105"
              outlined
              dense
            >
            </v-textarea
          ></label>
          <label class="font-color-gray font-weight-black text-caption"
            >電話番号
            <v-text-field
              v-model="phone_number"
              :rules="[formValidates.required, formValidates.phoneNumber]"
              class="mt-2 font-weight-regular"
              placeholder="080-1234-5678"
              outlined
              dense
              height="44"
          /></label>
          <label class="font-color-gray font-weight-black text-caption"
            >FAX
            <v-text-field
              v-model="fax_number"
              :rules="[formValidates.required, formValidates.phoneNumber]"
              class="mt-2 font-weight-regular"
              placeholder="090-8765-4321"
              outlined
              dense
              height="44"
          /></label>
        </v-col>
        <v-text-field
          v-model="post_code"
          :rules="[formValidates.required, formValidates.postCode]"
          outlined
          dense
          height="44"
          class="post-form"
          placeholder="123-4567"
        >
          <template #prepend>
            <v-icon class="text-decoration-none mt-2 ml-3" tag="div" size="16">
              〒
            </v-icon>
          </template>
        </v-text-field>
        <v-col cols="12" class="pt-0">
          <div class="mt-n2">
            <v-text-field
              v-model="address"
              outlined
              dense
              height="44"
              class="address-form set-max-width-520"
              placeholder="東京都世田谷区祖父谷4-3-15"
            >
            </v-text-field>
          </div>
          <v-btn
            x-large
            block
            depressed
            :disabled="!valid"
            color="warning"
            @click="send"
          >
            登録する
          </v-btn>
        </v-col>
      </v-form>
    </v-card>
  </div>
</template>

<script>
export default {
  layout: 'application_specialists',
  data() {
    return {
      formValidates: {
        required: (value) => !!value || '必須項目です',
        nameCountCheck: (value) =>
          value.length <= 30 || '30文字以下で入力してください',
        titleCountCheck: (value) =>
          value.length <= 50 || '50文字以下で入力してください',
        fileSizeCheck: (value) => {
          console.log(`value.log:::${value}`)
          console.log(`valueLength.log:::${value.length}`)
          console.log(`valueSize.log:::${value.size}`)
        },
        businessDayDetailCountCheck: (value) =>
          value.length <= 120 || '120文字以下で入力してください',
        phoneNumber: (value) => {
          const format = /^\d{2,4}-\d{2,4}-\d{4}$/g
          return format.test(value) || '正しい電話番号ではありません'
        },
        postCode: (value) => {
          const format = /^[0-9]{3}-[0-9]{4}$/g
          return (
            format.test(value) || '正しい郵便番号ではありません 例) 000-0000'
          )
        },
      },
      name: '',
      title: '',
      officeImages: [],
      flags: 0,
      business_day_detail: '',
      phone_number: '',
      fax_number: '',
      post_code: '',
      address: '',
      selected: [],
      valid: false,
    }
  },
  methods: {
    send() {
      if (this.selected.includes('日')) {
        this.flags += 1
      }
      if (this.selected.includes('月')) {
        this.flags += 2
      }
      if (this.selected.includes('火')) {
        this.flags += 4
      }
      if (this.selected.includes('水')) {
        this.flags += 8
      }
      if (this.selected.includes('木')) {
        this.flags += 16
      }
      if (this.selected.includes('金')) {
        this.flags += 32
      }
      if (this.selected.includes('土')) {
        this.flags += 64
      }
      const params = new FormData()
      const officeImagesNum = this.officeImages.length
      params.append('name', this.name)
      params.append('title', this.title)
      if (officeImagesNum >= 6) {
        this.$store.commit('catchErrorMsg/setType', 'error')
        this.$store.commit('catchErrorMsg/setMsg', [
          '事業所画像は5枚以下でアップロードしてください',
        ])
      } else {
        params.append('officeImages', this.officeImages)
      }
      params.append('flags', this.flags)
      params.append('business_day_detail', this.business_day_detail)
      params.append('phone_number', this.phone_number)
      params.append('fax_number', this.fax_number)
      params.append('post_code', this.post_code)
      params.append('address', this.address)
      console.log(officeImagesNum)
      this.flags = 0
    },
  },
}
</script>
<style scoped>
.font-color-gray {
  color: #6d7570;
}

input[type='checkbox'] {
  transform: scale(1.8);
  margin: 0 6px 0 0;
}

/* stylelint-disable */
.post-form >>> fieldset {
  width: 107px;
}

.post-form >>> .v-text-field__slot {
  max-width: 82px;
}

.image-form >>> .v-input__slot {
  width: 300px;
}
</style>

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
            v-model="images"
            multiple
            :rules="[formValidates.fileLengthCheck]"
            truncate-length="30"
            accept="image/*"
            prepend-icon="mdi-camera"
            label="事業所画像をアップロード（5枚まで）"
            class="image-form"
          >
          </v-file-input>
          <label class="font-color-gray font-weight-black text-caption"
            >休業日
          </label>
          <v-row class="mt-2 mb-2 mx-auto">
            <v-col cols="1" class="mx-5"
              ><div class="ml-1">日</div>
              <v-checkbox
                v-model="selected"
                :rules="[formValidates.holidayLengthCheck]"
                value="日"
                class="mr-3"
              >
              </v-checkbox>
            </v-col>
            <v-col cols="1" class="mx-5"
              >月
              <v-checkbox
                v-model="selected"
                :rules="[formValidates.holidayLengthCheck]"
                value="月"
                class="mr-3"
              >
              </v-checkbox>
            </v-col>
            <v-col cols="1" class="mx-5"
              >火
              <v-checkbox
                v-model="selected"
                :rules="[formValidates.holidayLengthCheck]"
                value="火"
                class="mr-3"
              >
              </v-checkbox>
            </v-col>
            <v-col cols="1" class="mx-5"
              >水
              <v-checkbox
                v-model="selected"
                :rules="[formValidates.holidayLengthCheck]"
                value="水"
                class="mr-3"
              >
              </v-checkbox>
            </v-col>
            <v-col cols="1" class="mx-5"
              >木
              <v-checkbox
                v-model="selected"
                :rules="[formValidates.holidayLengthCheck]"
                value="木"
                class="mr-3"
              >
              </v-checkbox>
            </v-col>
            <v-col cols="1" class="mx-5"
              >金
              <v-checkbox
                v-model="selected"
                :rules="[formValidates.holidayLengthCheck]"
                value="金"
                class="mr-3"
              >
              </v-checkbox>
            </v-col>
            <v-col cols="1" class="mx-5"
              >土
              <v-checkbox
                v-model="selected"
                :rules="[formValidates.holidayLengthCheck]"
                value="土"
                class="mr-3"
              >
              </v-checkbox>
            </v-col>
          </v-row>
          <div v-show="isShow" class="holiday-error-text mb-3">
            休業日を選択してください
          </div>
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
              :rules="[formValidates.faxNumber]"
              class="mt-2 mb-2 font-weight-regular"
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
              :rules="[formValidates.required]"
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
        /* fileSizeCheck: (values) =>
          !values ||
          !values.some((value) => value.size >= 10000000) ||
          '画像サイズは10MB以下でアップロードしてください', */
        fileLengthCheck: (value) =>
          value.length <= 5 || '画像は5枚以下にしてください',
        holidayLengthCheck: (values) => {
          const array = []
          Array.prototype.forEach.call(Object(values), (value) => {
            array.push(value)
            /* console.log(`arry::${array}`)
            console.log(array)
            console.log(typeof array) */
            this.isShow = false
          })
          return values.length >= 1
        },
        businessDayDetailCountCheck: (value) =>
          value.length <= 120 || '120文字以下で入力してください',
        phoneNumber: (value) => {
          const format = /^\d{2,4}-\d{2,4}-\d{4}$/g
          return format.test(value) || '正しい電話番号ではありません'
        },
        faxNumber: (value) => {
          if (value === '' || value.match(/^\d{2,4}-\d{2,4}-\d{4}$/g)) {
            return true
          } else {
            return '正しいFAXではありません'
          }
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
      images: [],
      imageArray: [],
      flags: 0,
      business_day_detail: '',
      phone_number: '',
      fax_number: '',
      post_code: '',
      address: '',
      selected: [],
      valid: false,
      imageFlag: false,
      isShow: true,
    }
  },
  watch: {
    selected: {
      handler() {
        if (this.selected.length === 0) {
          this.isShow = true
        }
        console.log(this.selected)
      },
    },
  },
  methods: {
    async send() {
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
      const array = []
      Array.prototype.forEach.call(Object(this.images), (value) => {
        array.push(value)
        console.log(`arry::${array}`)
        console.log(array)
        console.log(typeof array)
        this.isShow = false
      })
      /* console.log(`for前のlength::${this.images.length}`)
      for(let i = 0; i <= this.images.length; i++){
              this.images = this.images[i]
              console.log(i)
              console.log(`for最中のlength::${this.images.length}`)
              console.log(this.images)
              console.log('発火')
        } */
      const params = new FormData()
      params.append('name', this.name)
      params.append('title', this.title)
      params.append('images', array)
      params.append('flags', this.flags)
      params.append('business_day_detail', this.business_day_detail)
      params.append('phone_number', this.phone_number)
      params.append('fax_number', this.fax_number)
      params.append('post_code', this.post_code)
      params.append('address', this.address)
      try {
        await this.$axios.$post(`offices`, params)
      } catch (error) {
        return error
      }
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

.holiday-error-text {
  color: red;
  text-align: center;
}

/* stylelint-disable */
.post-form >>> fieldset {
  width: 107px;
}

.post-form >>> .v-text-field__slot {
  max-width: 82px;
}

.image-form >>> .v-input__slot {
  width: 320px;
}
</style>

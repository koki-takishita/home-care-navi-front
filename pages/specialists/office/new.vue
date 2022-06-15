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
          <label class="font-color-gray font-weight-black text-caption"
            >特徴詳細
            <v-textarea
              v-model="title_detail"
              :rules="[formValidates.businessDayDetailCountCheck]"
              class="mt-2 font-weight-regular"
              placeholder="特徴詳細のテキストを入れてください"
              height="105"
              outlined
              dense
            >
            </v-textarea
          ></label>
          <v-file-input
            v-model="images"
            multiple
            :rules="[
              formValidates.fileLengthCheck,
              formValidates.fileSizeCheck,
            ]"
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

          <label class="font-color-gray font-weight-black text-caption"
            >類型
            <v-text-field
              v-model="service_type"
              :rules="[
                formValidates.required,
                formValidates.serviceTypeCountCheck,
              ]"
              class="mt-2 font-weight-regular"
              placeholder="例）介護付きホーム"
              outlined
              dense
              height="44"
          /></label>

          <v-expansion-panels accordion multiple class="mb-10">
            <v-expansion-panel>
              <v-expansion-panel-header
                class="detail-panel-header"
                color="warning"
              >
                施設概要を登録する（任意）
              </v-expansion-panel-header>
              <v-expansion-panel-content class="mt-6">
                <v-sheet class="pa-3">
                  <v-form ref="form">
                    <v-avatar
                      size="320"
                      color="grey lighten-3"
                      tile
                      class="ml-8 mb-4"
                    >
                      <v-img
                        v-if="uploadImageUrl_1 !== null"
                        :src="uploadImageUrl_1"
                      />
                    </v-avatar>

                    <v-file-input
                      v-model="image_detail_1"
                      truncate-length="30"
                      accept="image/*"
                      show-size
                      label="特徴画像1をアップロード"
                      prepend-icon="mdi-camera"
                      class="image-form"
                      @change="detailImage_1Picked"
                    ></v-file-input>
                  </v-form>
                </v-sheet>
                <label class="font-color-gray font-weight-black text-caption"
                  >特徴画像1の説明（任意）
                  <v-textarea
                    v-model="text_detail_1"
                    :rules="[formValidates.businessDayDetailCountCheck]"
                    class="mt-2 font-weight-regular"
                    placeholder="特徴画像1に関する説明テキストを入れてください"
                    height="105"
                    outlined
                    dense
                  >
                  </v-textarea
                ></label>
                <v-sheet class="pa-3">
                  <v-form ref="form">
                    <v-avatar
                      size="320"
                      color="grey lighten-3"
                      tile
                      class="ml-8 mb-4"
                    >
                      <v-img
                        v-if="uploadImageUrl_2 !== null"
                        :src="uploadImageUrl_2"
                      />
                    </v-avatar>
                    <v-file-input
                      v-model="image_detail_2"
                      truncate-length="30"
                      accept="image/*"
                      show-size
                      label="特徴画像2をアップロード"
                      prepend-icon="mdi-camera"
                      class="image-form"
                      @change="detailImage_2Picked"
                    ></v-file-input>
                  </v-form>
                </v-sheet>
                <label class="font-color-gray font-weight-black text-caption"
                  >特徴画像2の説明（任意）
                  <v-textarea
                    v-model="text_detail_2"
                    :rules="[formValidates.businessDayDetailCountCheck]"
                    class="mt-2 font-weight-regular"
                    placeholder="特徴画像2に関する説明テキストを入れてください"
                    height="105"
                    outlined
                    dense
                  >
                  </v-textarea
                ></label>
                <v-form>
                  <label class="font-color-gray font-weight-black text-caption"
                    >開設年月（任意）
                  </label>
                  <label>
                    <div>
                      <v-menu
                        ref="menu"
                        v-model="menu"
                        :close-on-content-click="false"
                        transition="scale-transition"
                        offset-y
                        min-width="auto"
                      >
                        <template #activator="{ on, attrs }">
                          <v-text-field
                            v-model="open_date"
                            label="開設年月"
                            prepend-icon="mdi-calendar"
                            readonly
                            v-bind="attrs"
                            v-on="on"
                          ></v-text-field>
                        </template>
                        <v-date-picker
                          v-model="open_date"
                          locale="jp-ja"
                          :day-format="(date) => new Date(date).getDate()"
                          :active-picker.sync="activePicker"
                          :max="
                            new Date(
                              Date.now() -
                                new Date().getTimezoneOffset() * 60000
                            )
                              .toISOString()
                              .substr(0, 10)
                          "
                          min="1950-01-01"
                          @change="save"
                        ></v-date-picker>
                      </v-menu>
                    </div>
                  </label>
                  <label class="font-color-gray font-weight-black text-caption"
                    >居室数（任意）
                    <v-select
                      v-model="rooms"
                      :items="items"
                      height="44"
                      class="room-form"
                    ></v-select>
                  </label>
                  <label class="font-color-gray font-weight-black text-caption"
                    >入居時の要件（任意）
                    <v-text-field
                      v-model="requirement"
                      class="overwrite-fieldset-border-top-width mt-2 font-weight-regular"
                      placeholder="例）満60歳以上の方"
                      outlined
                      dense
                      height="44"
                      :rules="[formValidates.requirementCountCheck]"
                  /></label>
                  <label class="font-color-gray font-weight-black text-caption"
                    >共用設備（任意）
                    <v-text-field
                      v-model="facility"
                      class="overwrite-fieldset-border-top-width mt-2 font-weight-regular"
                      placeholder="例）エントランス、個浴、大浴場"
                      outlined
                      dense
                      height="44"
                      :rules="[formValidates.facilityCountCheck]"
                  /></label>
                  <label class="font-color-gray font-weight-black text-caption"
                    >経営・事業主体（任意）
                    <v-text-field
                      v-model="management"
                      class="overwrite-fieldset-border-top-width mt-2 font-weight-regular"
                      placeholder="例）株式会社ホームケアナビ"
                      outlined
                      dense
                      height="44"
                      :rules="[formValidates.managementCountCheck]"
                  /></label>
                  <label class="font-color-gray font-weight-black text-caption"
                    >公式サイトURL（任意）
                    <v-text-field
                      v-model="link"
                      class="overwrite-fieldset-border-top-width mt-2 font-weight-regular"
                      placeholder="例）https://www.google.co.jp/"
                      outlined
                      dense
                      height="44"
                      :rules="[formValidates.linkNameCheck]"
                  /></label>
                </v-form>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
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
const maxRoom = 101
const totalRooms = [...Array(maxRoom).keys()]

export default {
  layout: 'application_specialists',
  middleware: 'authentication',
  data() {
    return {
      formValidates: {
        required: (value) => !!value || '必須項目です',
        nameCountCheck: (value) =>
          value.length <= 30 || '30文字以下で入力してください',
        titleCountCheck: (value) =>
          value.length <= 50 || '50文字以下で入力してください',
        fileSizeCheck: (values) =>
          !values ||
          !values.some((value) => value.size >= 10000000) ||
          '画像サイズは10MB以下でアップロードしてください',
        fileLengthCheck: (value) =>
          value.length <= 5 || '画像は5枚以下にしてください',
        fileDetailLengthCheck: (value) =>
          value.length <= 2 || '画像は2枚以下にしてください',
        holidayLengthCheck: (values) => {
          const array = []
          Array.prototype.forEach.call(Object(values), (value) => {
            array.push(value)
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
        serviceTypeCountCheck: (value) =>
          value.length <= 50 || '50文字以下で入力してください',
        roomsNumberCheck: (value) => {
          const format = /^[1-9]{1}[0-9]{0,2}$/g
          return format.test(value) || '正しく数字を入れてください'
        },
        requirementCountCheck: (value) =>
          value.length <= 50 || '50文字以下で入力してください',
        facilityCountCheck: (value) =>
          value.length <= 50 || '50文字以下で入力してください',
        managementCountCheck: (value) =>
          value.length <= 50 || '50文字以下で入力してください',
        linkNameCheck: (value) => {
          const format = /^https?:\/{2}[\w/:%#$&?()~.=+-]+/g
          return (
            format.test(value) ||
            'WEBサイトのURLを入力して下さい 例) http://example.com'
          )
        },
      },
      name: '',
      title: '',
      title_detail: '',
      images: [],
      flags: 0,
      business_day_detail: '',
      phone_number: '',
      fax_number: '',
      post_code: '',
      address: '',
      detail: '',
      service_type: '',
      input_image: null,
      uploadImageUrl_1: '',
      image_detail_1: [],
      text_detail_1: '',
      uploadImageUrl_2: '',
      image_detail_2: [],
      text_detail_2: '',
      open_date: '',
      activePicker: null,
      date: null,
      menu: false,
      items: totalRooms,
      rooms: '',
      requirement: '',
      facility: '',
      management: '',
      link: '',
      selected: [],
      valid: false,
      isShow: true,
    }
  },
  watch: {
    selected: {
      handler() {
        if (this.selected.length === 0) {
          this.isShow = true
        }
      },
    },
  },
  methods: {
    detailImage_1Picked(file) {
      if (file !== undefined && file !== null) {
        if (file.name.lastIndexOf('.') <= 0) {
          return
        }
        const detailImage = new FileReader()
        detailImage.readAsDataURL(file)
        detailImage.addEventListener('load', () => {
          this.uploadImageUrl_1 = detailImage.result
        })
      } else {
        this.uploadImageUrl_1 = ''
      }
    },
    detailImage_2Picked(file) {
      if (file !== undefined && file !== null) {
        if (file.name.lastIndexOf('.') <= 0) {
          return
        }
        const detailImage = new FileReader()
        detailImage.readAsDataURL(file)
        detailImage.addEventListener('load', () => {
          this.uploadImageUrl_2 = detailImage.result
        })
      } else {
        this.uploadImageUrl_2 = ''
      }
    },
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
      const params = new FormData()
      params.append('name', this.name)
      params.append('title', this.title)
      for (let index = 0; index <= 5; index++) {
        if (this.images[index] === undefined) {
          continue
        }
        params.append('images[]', this.images[index])
      }
      params.append('flags', this.flags)
      params.append('business_day_detail', this.business_day_detail)
      params.append('phone_number', this.phone_number)
      params.append('fax_number', this.fax_number)
      params.append('post_code', this.post_code)
      params.append('address', this.address)
      try {
        await this.$axios.$post(`specialists/offices`, params, {
          headers: { 'Content-Type': 'multipart/form-data' },
        })
      } catch (error) {
        return error
      }
      this.flags = 0
    },
    save(date) {
      this.$refs.menu.save(date)
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
.room-form >>> .v-input__slot {
  width: 82px;
}
.detail-panel-header {
  color: white;
  font-weight: bold;
}
</style>

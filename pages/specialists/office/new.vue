<template>
  <div>
    <v-card class="mx-auto mb-2 p-0" width="750">
      <v-col cols="12"><h3>事業所登録</h3></v-col>
      <v-form v-model="valid">
        <v-col cols="12">
          <label class="font-color-gray font-weight-black text-caption"
            >事業所名
            <v-text-field
              id="name"
              v-model.trim="name"
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
              id="title"
              v-model.trim="title"
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
              id="title_detail"
              v-model.trim="title_detail"
              :rules="[formValidates.required, formValidates.textCountCheck]"
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
            accept="image/png, image/jpeg, image/jpg, image/gif"
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
                id="日"
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
                id="月"
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
                id="火"
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
                id="水"
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
                id="木"
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
                id="金"
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
                id="土"
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
              id="business_day_detail"
              v-model.trim="business_day_detail"
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
              id="phone_number"
              v-model.trim="phone_number"
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
              id="fax_number"
              v-model.trim="fax_number"
              :rules="[formValidates.faxNumber]"
              class="mt-2 mb-2 font-weight-regular"
              placeholder="090-8765-4321"
              outlined
              dense
              height="44"
          /></label>
        </v-col>
        <v-text-field
          id="post_code"
          v-model.trim="post_code"
          :rules="[formValidates.requiredPostcode, formValidates.postCode]"
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
              id="address"
              v-model.trim="address"
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
              id="service_type"
              v-model.trim="service_type"
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
                  <div class="d-none d-sm-block">
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
                  </div>
                  <div class="d-sm-none d-block">
                    <v-avatar
                      size="200"
                      color="grey lighten-3"
                      tile
                      class="mb-4"
                    >
                      <v-img
                        v-if="uploadImageUrl_1 !== null"
                        :src="uploadImageUrl_1"
                      />
                    </v-avatar>
                  </div>
                  <v-file-input
                    v-model="detail_image_1"
                    truncate-length="20"
                    accept="image/png, image/jpeg, image/jpg, image/gif"
                    show-size
                    label="特徴画像1をアップロード"
                    :rules="[formValidates.fileDetailSizeCheck]"
                    prepend-icon="mdi-camera"
                    class="detail-image-form"
                    @change="detailImage_1Picked"
                  ></v-file-input>
                  <p v-if="inputImageNoComment_1" class="image-text-link-error">
                    特徴画像１を登録する場合、特徴画像1の説明は必須となります
                  </p>
                </v-sheet>
                <label class="font-color-gray font-weight-black text-caption"
                  >特徴画像1の説明（任意）
                  <v-text-field
                    v-model.trim="comment_1"
                    :rules="[formValidates.textDetailCountCheck]"
                    class="mt-2 font-weight-regular"
                    placeholder="特徴画像1に関する説明テキストを入れてください"
                    height="44"
                    outlined
                    dense
                  >
                  </v-text-field
                ></label>
                <p v-if="noImageInputComment_1" class="image-text-link-error">
                  特徴画像1の説明を登録する場合、特徴画像１は必須となります
                </p>
                <v-sheet class="pa-3">
                  <div class="d-none d-sm-block">
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
                  </div>
                  <div class="d-sm-none d-block">
                    <v-avatar
                      size="200"
                      color="grey lighten-3"
                      tile
                      class="mb-4"
                    >
                      <v-img
                        v-if="uploadImageUrl_2 !== null"
                        :src="uploadImageUrl_2"
                      />
                    </v-avatar>
                  </div>
                  <v-file-input
                    v-model="detail_image_2"
                    truncate-length="20"
                    accept="image/png, image/jpeg, image/jpg, image/gif"
                    show-size
                    label="特徴画像2をアップロード"
                    :rules="[formValidates.fileDetailSizeCheck]"
                    prepend-icon="mdi-camera"
                    class="detail-image-form"
                    @change="detailImage_2Picked"
                  ></v-file-input>
                </v-sheet>
                <p v-if="inputImageNoComment_2" class="image-text-link-error">
                  特徴画像2を登録する場合、特徴画像2の説明は必須となります
                </p>
                <label class="font-color-gray font-weight-black text-caption"
                  >特徴画像2の説明（任意）
                  <v-text-field
                    v-model.trim="comment_2"
                    :rules="[formValidates.textDetailCountCheck]"
                    class="mt-2 font-weight-regular"
                    placeholder="特徴画像2に関する説明テキストを入れてください"
                    height="44"
                    outlined
                    dense
                  >
                  </v-text-field
                ></label>
                <p v-if="noImageInputComment_2" class="image-text-link-error">
                  特徴画像2の説明を登録する場合、特徴画像2は必須となります
                </p>
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
                      v-model.trim="requirement"
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
                      v-model.trim="facility"
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
                      v-model.trim="management"
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
                      v-model.trim="link"
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
            id="send"
            x-large
            block
            depressed
            :disabled="!valid || detail_image_Check_1 || detail_image_Check_2"
            color="warning"
            @click="send()"
          >
            登録する
          </v-btn>
        </v-col>
      </v-form>
    </v-card>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
const maxRoom = 101
const totalRooms = [...Array(maxRoom).keys()]

export default {
  layout: 'application_specialists',
  middleware: ['authentication', 'existenceOffice'],
  data() {
    return {
      formValidates: {
        /* value.match(/^\s+?$/) 半角・全角スペースを感知、スペースのみの登録NG */
        required: (value) =>
          (!!value && !value.match(/^\s+?$/)) || '必須項目です',
        requiredPostcode: (value) => !!value || '必須項目です',
        nameCountCheck: (value) =>
          value.length <= 30 || '30文字以下で入力してください',
        titleCountCheck: (value) =>
          value.length <= 50 || '50文字以下で入力してください',
        textCountCheck: (value) =>
          value.length <= 200 || '200文字以下で入力してください',
        fileSizeCheck: (values) =>
          !values ||
          !values.some((value) => value.size > 10485760) ||
          '画像サイズは10MB以下でアップロードしてください',
        fileDetailSizeCheck: (value) =>
          !value ||
          value.size <= 10485760 ||
          '画像サイズは10MB以下でアップロードしてください',
        fileLengthCheck: (value) =>
          value.length <= 5 || '画像は5枚以下にしてください',
        textDetailCountCheck: (value) =>
          value.length <= 30 || '30文字以下で入力してください',
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
          if (
            value === '' ||
            value.match(/^https?:\/{2}[\w/:%#$&?()~.=+-]+/g)
          ) {
            return true
          } else {
            return 'WEBサイトのURLを入力して下さい 例) http://example.com'
          }
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
      service_type: '',

      input_image: null,
      uploadImageUrl_1: '',
      detail_image_1: null,
      comment_1: '',
      uploadImageUrl_2: '',
      detail_image_2: null,
      comment_2: '',

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
  computed: {
    inputImageNoComment_1() {
      return this.detail_image_1 !== null && this.comment_1 === ''
    },
    inputImageNoComment_2() {
      return this.detail_image_2 !== null && this.comment_2 === ''
    },
    noImageInputComment_1() {
      return this.detail_image_1 === null && this.comment_1 !== ''
    },
    noImageInputComment_2() {
      return this.detail_image_2 === null && this.comment_2 !== ''
    },
    detail_image_Check_1() {
      if (this.detail_image_1 !== null && this.comment_1 === '') {
        return true
      } else if (this.detail_image_1 === null && this.comment_1 !== '') {
        return true
      } else {
        return false
      }
    },
    detail_image_Check_2() {
      if (this.detail_image_2 !== null && this.comment_2 === '') {
        return true
      } else if (this.detail_image_2 === null && this.comment_2 !== '') {
        return true
      } else {
        return false
      }
    },
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
    ...mapActions('catchErrorMsg', ['clearMsg']),
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

      const officeParams = new FormData()
      for (let index = 0; index <= 5; index++) {
        if (this.images[index] === undefined) {
          continue
        }
        officeParams.append('officeImages[]', this.images[index])
      }

      const officeData = {
        name: this.name,
        title: this.title,
        flags: this.flags,
        business_day_detail: this.business_day_detail,
        phone_number: this.phone_number,
        fax_number: this.fax_number,
        post_code: this.post_code,
        address: this.address,
      }
      const officeJson = JSON.stringify(officeData)

      if (this.detail_image_1 !== null) {
        officeParams.append('detailImages[]', this.detail_image_1)
      }
      if (this.detail_image_2 !== null) {
        officeParams.append('detailImages[]', this.detail_image_2)
      }

      const officeDetail = {
        detail: this.title_detail,
        service_type: this.service_type,
        open_date: this.open_date,
        rooms: this.rooms,
        requirement: this.requirement,
        facility: this.facility,
        management: this.management,
        link: this.link,
        comment_1: this.comment_1,
        comment_2: this.comment_2,
      }
      const detailJson = JSON.stringify(officeDetail)

      officeParams.append('office', officeJson)
      officeParams.append('detail', detailJson)

      try {
        await this.$axios.$post(`specialists/offices`, officeParams)
        this.$store.commit('setHasOffice', true)

        this.$router.push('/specialists/office/edit')
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

.image-text-link-error {
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

.detail-image-form >>> .v-input__slot {
  width: 260px;
}

.room-form >>> .v-input__slot {
  width: 82px;
}
.detail-panel-header {
  color: white;
  font-weight: bold;
}
</style>

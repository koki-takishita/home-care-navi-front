<template>
  <div>
    <p class="mb-0 text-left link-width mx-auto">
      <NuxtLink
        to=".."
        class="text-overline text-decoration-none link-color sm-under-no"
        >＜ 利用者情報一覧にもどる</NuxtLink
      >
    </p>
    <v-card class="mx-auto mb-2 p-0" width="750">
      <v-col cols="12"><h3>利用者情報編集</h3></v-col>
      <v-form v-model="valid">
        <v-row>
          <v-avatar size="100" color="grey lighten-3" class="ml-6 my-4"
            ><v-img
              v-if="care_recipient.image_url !== null"
              :src="care_recipient.image_url"
            ></v-img>
            <v-icon v-else size="60" color="white">mdi-account</v-icon>
          </v-avatar>
          <v-file-input
            v-model="image"
            truncate-length="20"
            :rules="[formValidates.fileSizeCheck]"
            accept="image/png, image/jpeg, image/jpg, image/gif"
            prepend-icon="mdi-camera"
            label="画像をアップロードする"
            class="mt-15 ml-3 image-form"
          >
          </v-file-input>
        </v-row>
        <v-col cols="12">
          <label class="font-color-gray font-weight-black text-caption"
            >利用者名
            <v-text-field
              v-model="care_recipient.name"
              :rules="[formValidates.required, formValidates.nameCountCheck]"
              class="mt-2 font-weight-regular"
              placeholder="田中 太郎"
              outlined
              dense
              height="44"
          /></label>
          <label class="font-color-gray font-weight-black text-caption"
            >利用者名(ふりがな)
            <v-text-field
              v-model="care_recipient.kana"
              :rules="[
                formValidates.required,
                formValidates.nameCountCheck,
                formValidates.kanaCheck,
              ]"
              class="mt-2 font-weight-regular"
              placeholder="たなか たろう"
              outlined
              dense
              height="44"
          /></label>
          <label class="font-color-gray font-weight-black text-caption">
            年齢
            <v-row>
              <v-col class="d-flex" cols="12" sm="3">
                <v-select
                  v-model="age"
                  class="mt-2 font-weight-regular"
                  :items="items"
                  item-text="state"
                  item-value="abbr"
                  outlined
                  dense
                  placeholder="--"
                  :rules="[formValidates.required]"
                ></v-select>
              </v-col>
            </v-row>
          </label>
          <div>
            <label class="font-color-gray font-weight-black text-caption"
              >利用者住所
              <v-text-field
                v-model="care_recipient.post_code"
                outlined
                dense
                height="44"
                class="post-form mt-2 font-weight-regular"
                :rules="[formValidates.required, formValidates.postCode]"
                placeholder="123-4567"
              >
                <template #prepend>
                  <v-icon class="text-decoration-none mt-2" tag="div" size="16">
                    〒
                  </v-icon>
                </template>
              </v-text-field>
            </label>
          </div>

          <div class="mt-n2">
            <v-text-field
              v-model="care_recipient.address"
              outlined
              dense
              height="44"
              class="address-form set-max-width-520"
              :rules="[formValidates.required]"
              placeholder="東京都世田谷区祖父谷4-3-15"
            >
            </v-text-field>
          </div>
          <label class="font-color-gray font-weight-black text-caption"
            >家族情報
            <v-textarea
              v-model="care_recipient.family"
              :rules="[formValidates.familyCountCheck, formValidates.required]"
              class="mt-2 font-weight-regular"
              height="80"
              outlined
              dense
            >
            </v-textarea
          ></label>
          <label class="font-color-gray font-weight-black text-caption">
            担当スタッフ
            <v-row>
              <v-col>
                <v-select
                  v-model="care_recipient.staff_id"
                  class="mt-2 font-weight-regular"
                  :items="staffs"
                  item-value="id"
                  item-text="name"
                  outlined
                  dense
                  placeholder="--"
                  :rules="[formValidates.required]"
                ></v-select>
              </v-col>
            </v-row>
          </label>
          <v-btn
            x-large
            block
            depressed
            :disabled="!valid"
            color="warning"
            @click="send"
          >
            変更する
          </v-btn>
          <p class="mb-0 text-center">
            <NuxtLink
              to="..?page=1"
              class="text-overline text-decoration-none link-color"
              >もどる</NuxtLink
            >
          </p>
        </v-col>
      </v-form>
    </v-card>
  </div>
</template>

<script>
export default {
  layout: 'application_specialists',
  async asyncData({ $axios, params }) {
    const id = params.care_recipient_id
    try {
      const careRecipientResponse = await $axios.$get(
        `specialists/offices/care_recipients/${id}`
      )
      const staffsResponse = await $axios.$get(`specialists/offices/staffs`)
      return {
        care_recipient: careRecipientResponse,
        staffs: staffsResponse.staffs,
        age: careRecipientResponse.age + '歳',
      }
    } catch (error) {
      return error
    }
  },
  data() {
    return {
      staffs: [],
      formValidates: {
        required: (value) => !!value || '必須項目です',
        fileSizeCheck: (value) =>
          !value ||
          value.size <= 10000000 ||
          '画像サイズは10MB以下でアップロードしてください',
        nameCountCheck: (value) =>
          value.length <= 30 || '30文字以下で入力してください',
        kanaCheck: (value) => {
          const format = /^[ぁ-んー　 ]*$/ // eslint-disable-line
          return format.test(value) || 'ひらがなで入力してください'
        },
        familyCountCheck: (value) =>
          value.length <= 30 || '30文字以下で入力してください',
        postCode: (value) => {
          const format = /^[0-9]{3}-[0-9]{4}$/g
          return (
            format.test(value) || '正しい郵便番号ではありません 例) 000-0000'
          )
        },
      },
      care_recipient_id: this.$route.params.care_recipient_id,
      image: null,
      valid: false,
      items: [
        { state: '60歳', abbr: '60歳' },
        { state: '61歳', abbr: '61歳' },
        { state: '62歳', abbr: '62歳' },
        { state: '63歳', abbr: '63歳' },
        { state: '64歳', abbr: '64歳' },
        { state: '65歳', abbr: '65歳' },
        { state: '66歳', abbr: '66歳' },
        { state: '67歳', abbr: '67歳' },
        { state: '68歳', abbr: '68歳' },
        { state: '69歳', abbr: '69歳' },
        { state: '70歳', abbr: '70歳' },
        { state: '71歳', abbr: '71歳' },
        { state: '72歳', abbr: '72歳' },
        { state: '73歳', abbr: '73歳' },
        { state: '74歳', abbr: '74歳' },
        { state: '75歳', abbr: '75歳' },
        { state: '76歳', abbr: '76歳' },
        { state: '77歳', abbr: '77歳' },
        { state: '78歳', abbr: '78歳' },
        { state: '79歳', abbr: '79歳' },
        { state: '80歳', abbr: '80歳' },
        { state: '81歳', abbr: '81歳' },
        { state: '82歳', abbr: '82歳' },
        { state: '83歳', abbr: '83歳' },
        { state: '84歳', abbr: '84歳' },
        { state: '85歳', abbr: '85歳' },
        { state: '86歳', abbr: '86歳' },
        { state: '87歳', abbr: '87歳' },
        { state: '88歳', abbr: '88歳' },
        { state: '89歳', abbr: '89歳' },
        { state: '90歳', abbr: '90歳' },
        { state: '91歳', abbr: '91歳' },
        { state: '92歳', abbr: '92歳' },
        { state: '93歳', abbr: '93歳' },
        { state: '94歳', abbr: '94歳' },
        { state: '95歳', abbr: '95歳' },
        { state: '96歳', abbr: '96歳' },
        { state: '97歳', abbr: '97歳' },
        { state: '98歳', abbr: '98歳' },
        { state: '99歳', abbr: '99歳' },
        { state: '100歳', abbr: '100歳' },
        { state: '101歳', abbr: '101歳' },
        { state: '102歳', abbr: '102歳' },
        { state: '103歳', abbr: '103歳' },
        { state: '104歳', abbr: '104歳' },
        { state: '105歳', abbr: '105歳' },
        { state: '106歳', abbr: '106歳' },
        { state: '107歳', abbr: '107歳' },
        { state: '108歳', abbr: '108歳' },
        { state: '109歳', abbr: '109歳' },
        { state: '110歳', abbr: '110歳' },
        { state: '111歳', abbr: '111歳' },
        { state: '112歳', abbr: '112歳' },
        { state: '113歳', abbr: '113歳' },
        { state: '114歳', abbr: '114歳' },
        { state: '115歳', abbr: '115歳' },
        { state: '116歳', abbr: '116歳' },
        { state: '117歳', abbr: '117歳' },
        { state: '118歳', abbr: '118歳' },
        { state: '119歳', abbr: '119歳' },
        { state: '120歳', abbr: '120歳' },
      ],
    }
  },
  methods: {
    async send() {
      const careRecipientId = this.care_recipient_id
      const params = new FormData()
      params.append('name', this.care_recipient.name)
      params.append('kana', this.care_recipient.kana)
      params.append('age', this.age)
      params.append('family', this.care_recipient.family)
      params.append('post_code', this.care_recipient.post_code)
      params.append('address', this.care_recipient.address)
      params.append('staff_id', this.care_recipient.staff_id)
      if (this.image !== null) {
        params.append('image', this.image)
      }
      try {
        await this.$axios.$put(
          `specialists/offices/care_recipients/${careRecipientId}`,
          params,
          {
            headers: { 'Content-Type': 'multipart/form-data' },
          }
        )
        this.$router.push('..?page=1')
      } catch (error) {
        return error
      }
    },
  },
}
</script>
<style scoped>
.link-color {
  color: #ee7b1a;
}

.font-color-gray {
  color: #6d7570;
}

.link-width {
  width: 750px;
}

@media screen and (max-width: 959px) {
  /* sm以下で表示しない */
  .sm-under-no {
    display: none;
  }
}
/* stylelint-disable */
.image-form >>> .v-input__slot {
  width: 200px;
}

.post-form >>> fieldset {
  width: 107px;
}

.post-form >>> .v-text-field__slot {
  max-width: 82px;
}
</style>

<template>
  <div>
    <p class="mb-0 text-left link-width mx-auto">
      <NuxtLink
        to="."
        class="text-overline text-decoration-none link-color sm-under-no"
        >＜ 利用者情報一覧にもどる</NuxtLink
      >
    </p>
    <v-card class="mx-auto mb-2 p-0" width="750">
      <v-col cols="12"><h3>利用者登録</h3></v-col>
      <v-form v-model="valid">
        <v-row>
          <v-avatar size="100" color="grey lighten-3" class="ml-6 my-4">
            <v-icon size="70" color="white">mdi-account</v-icon>
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
              v-model="name"
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
              v-model="kana"
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
                v-model="post_code"
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
              v-model="address"
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
              v-model="family"
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
                  v-model="staff_id"
                  class="mt-2 font-weight-regular"
                  :items="staffs"
                  item-value="id"
                  item-text="name"
                  outlined
                  dense
                  placeholder="--"
                  no-data-text="スタッフの登録をしてください"
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
            登録する
          </v-btn>
          <p class="mb-0 text-center">
            <NuxtLink
              to=".?page=1"
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
  async asyncData({ $axios }) {
    try {
      const res = await $axios.$get(`specialists/offices/staffs`)
      return {
        staffs: res.staffs,
      }
    } catch (error) {
      return error
    }
  },
  data() {
    return {
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
      name: '',
      kana: '',
      family: '',
      post_code: '',
      address: '',
      staff_id: '',
      image: null,
      valid: false,
      age: '',
      items: [
        { state: '60歳', abbr: '60' },
        { state: '61歳', abbr: '61' },
        { state: '62歳', abbr: '62' },
        { state: '63歳', abbr: '63' },
        { state: '64歳', abbr: '64' },
        { state: '65歳', abbr: '65' },
        { state: '66歳', abbr: '66' },
        { state: '67歳', abbr: '67' },
        { state: '68歳', abbr: '68' },
        { state: '69歳', abbr: '69' },
        { state: '70歳', abbr: '70' },
        { state: '71歳', abbr: '71' },
        { state: '72歳', abbr: '72' },
        { state: '73歳', abbr: '73' },
        { state: '74歳', abbr: '74' },
        { state: '75歳', abbr: '75' },
        { state: '76歳', abbr: '76' },
        { state: '77歳', abbr: '77' },
        { state: '78歳', abbr: '78' },
        { state: '79歳', abbr: '79' },
        { state: '80歳', abbr: '80' },
        { state: '81歳', abbr: '81' },
        { state: '82歳', abbr: '82' },
        { state: '83歳', abbr: '83' },
        { state: '84歳', abbr: '84' },
        { state: '85歳', abbr: '85' },
        { state: '86歳', abbr: '86' },
        { state: '87歳', abbr: '87' },
        { state: '88歳', abbr: '88' },
        { state: '89歳', abbr: '89' },
        { state: '90歳', abbr: '90' },
        { state: '91歳', abbr: '91' },
        { state: '92歳', abbr: '92' },
        { state: '93歳', abbr: '93' },
        { state: '94歳', abbr: '94' },
        { state: '95歳', abbr: '95' },
        { state: '96歳', abbr: '96' },
        { state: '97歳', abbr: '97' },
        { state: '98歳', abbr: '98' },
        { state: '99歳', abbr: '99' },
        { state: '100歳', abbr: '100' },
        { state: '101歳', abbr: '101' },
        { state: '102歳', abbr: '102' },
        { state: '103歳', abbr: '103' },
        { state: '104歳', abbr: '104' },
        { state: '105歳', abbr: '105' },
        { state: '106歳', abbr: '106' },
        { state: '107歳', abbr: '107' },
        { state: '108歳', abbr: '108' },
        { state: '109歳', abbr: '109' },
        { state: '110歳', abbr: '110' },
        { state: '111歳', abbr: '111' },
        { state: '112歳', abbr: '112' },
        { state: '113歳', abbr: '113' },
        { state: '114歳', abbr: '114' },
        { state: '115歳', abbr: '115' },
        { state: '116歳', abbr: '116' },
        { state: '117歳', abbr: '117' },
        { state: '118歳', abbr: '118' },
        { state: '119歳', abbr: '119' },
        { state: '120歳', abbr: '120' },
      ],
    }
  },
  methods: {
    async send() {
      const params = new FormData()
      params.append('name', this.name)
      params.append('kana', this.kana)
      params.append('age', this.age)
      params.append('family', this.family)
      params.append('post_code', this.post_code)
      params.append('address', this.address)
      params.append('staff_id', this.staff_id)
      if (this.image !== null) {
        params.append('image', this.image)
      }
      try {
        await this.$axios.$post(`specialists/offices/care_recipients`, params, {
          headers: { 'Content-Type': 'multipart/form-data' },
        })
        this.$router.push('.')
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

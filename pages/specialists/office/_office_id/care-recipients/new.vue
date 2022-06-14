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
            accept="image/*"
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
              :rules="[formValidates.familyCountCheck]"
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
            登録する
          </v-btn>
          <p class="mb-0 text-center">
            <NuxtLink
              to="."
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
const ageRange = [...Array(117).keys()]
export default {
  layout: 'application_specialists',
  data() {
    return {
      staffs: [],
      officeId: this.$route.params.office_id,
      items: ageRange,
      formValidates: {
        required: (value) => !!value || '必須項目です',
        fileSizeCheck: (value) =>
          !value ||
          value.size <= 10000000 ||
          '画像サイズは10MB以下でアップロードしてください',
        nameCountCheck: (value) =>
          value.length <= 31 || '30文字以下で入力してください',
        kanaCheck: (value) => {
          const format = /^[ぁ-んー　 ]*$/ // eslint-disable-line
          return format.test(value) || 'ひらがなで入力してください'
        },
        familyCountCheck: (value) =>
          value.length <= 31 || '30文字以下で入力してください',
        postCode: (value) => {
          const format = /^[0-9]{3}-[0-9]{4}$/g
          return (
            format.test(value) || '正しい郵便番号ではありません 例) 000-0000'
          )
        },
      },
      office_id: this.$route.params.office_id,
      name: '',
      kana: '',
      age: '',
      family: '',
      post_code: '',
      address: '',
      staff_id: '',
      image: null,
      valid: false,
    }
  },
  mounted() {
    this.getStaffs()
  },
  methods: {
    async getStaffs() {
      try {
        // this.$setId(this.office_id)
        const response = await this.$axios.$get(
          `specialists/offices/${this.office_id}/staffs`
        )
        this.staffs = response
        console.log(this.staffs)
      } catch (error) {
        return error
      }
    },
    async send() {
      const id = this.office_id
      const params = new FormData()
      params.append('office_id', this.office_id)
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
        await this.$axios.$post(
          `specialists/offices/${id}/care_recipients`,
          params,
          {
            headers: { 'Content-Type': 'multipart/form-data' },
          }
        )
        this.$store.commit('catchErrorMsg/setType', 'success')
        this.$store.commit('catchErrorMsg/setMsg', ['登録しました'])
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

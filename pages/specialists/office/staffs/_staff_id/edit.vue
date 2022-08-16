<template>
  <div>
    <p class="mb-0 text-left link-width mx-auto">
      <NuxtLink
        to=".."
        class="text-overline text-decoration-none link-color sm-under-no"
        >＜ スタッフ情報一覧にもどる</NuxtLink
      >
    </p>
    <v-card class="mx-auto mb-2 p-0" width="750">
      <v-col cols="12"><h3>スタッフ情報編集</h3></v-col>
      <v-form v-model="valid">
        <v-row>
          <v-avatar size="100" color="grey lighten-3" class="ml-6 my-4">
            <v-img
              v-if="staff.image_url !== null"
              :src="staff.image_url"
            ></v-img>
            <v-icon v-else size="60" color="white">mdi-account</v-icon>
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
            >スタッフ名
            <v-text-field
              v-model="staff.name"
              :rules="[formValidates.required, formValidates.nameCountCheck]"
              class="mt-2 font-weight-regular"
              placeholder="田中 太郎"
              outlined
              dense
              height="44"
          /></label>
          <label class="font-color-gray font-weight-black text-caption"
            >スタッフ名(ふりがな)
            <v-text-field
              v-model="staff.kana"
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
          <label class="font-color-gray font-weight-black text-caption"
            >スタッフ紹介文
            <v-textarea
              id="introduction"
              v-model="staff.introduction"
              :rules="[
                formValidates.required,
                formValidates.introductionCountCheck,
              ]"
              class="mt-2 font-weight-regular"
              height="80"
              outlined
              dense
            >
            </v-textarea
          ></label>
          <v-btn
            id="send"
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
  middleware: 'authentication',
  async asyncData({ $axios, params }) {
    const id = params.staff_id
    try {
      const res = await $axios.$get(`specialists/offices/staffs/${id}`)
      return {
        staff: res,
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
        introductionCountCheck: (value) =>
          value.length <= 80 || '80文字以下で入力してください',
      },
      staff_id: this.$route.params.staff_id,
      image: null,
      valid: false,
    }
  },
  methods: {
    async send() {
      const staffId = this.staff_id
      const params = new FormData()
      params.append('office_id', this.staff.office_id)
      params.append('name', this.staff.name)
      params.append('kana', this.staff.kana)
      params.append('introduction', this.staff.introduction)
      if (this.image !== null) {
        params.append('image', this.image)
      }
      try {
        await this.$axios.$put(
          `specialists/offices/staffs/${staffId}`,
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
</style>

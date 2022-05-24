<template>
  <v-col cols="12" md="8" lg="7" xl="7" class="mx-auto">
    <p class="mb-0 text-left">
      <NuxtLink
        to=""
        class="text-overline text-decoration-none link-color sm-under-no"
        >＜ スタッフ情報一覧にもどる</NuxtLink
      >
    </p>
    <v-card class="mx-auto mb-2 p-0">
      <v-col cols="12"><h3>スタッフ登録</h3></v-col>
      <v-form v-model="valid">
        <v-col md="10">
          <v-row>
            <v-avatar size="100" color="grey lighten-3" class="ml-3">
              <v-icon size="70" color="white">mdi-account</v-icon>
            </v-avatar>
            <v-file-input
              v-model="image"
              :rules="[formValidates.fileSizeCheck]"
              accept="image/*"
              prepend-icon="mdi-camera"
              label="画像をアップロードする"
              class="mt-6 mr-4 ml-3"
            >
            </v-file-input>
          </v-row>
        </v-col>
        <v-col cols="12">
          <label class="font-color-gray font-weight-black text-caption"
            >スタッフ名
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
            >スタッフ名(ふりがな)
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
          <label class="font-color-gray font-weight-black text-caption"
            >スタッフ紹介文
            <v-textarea
              v-model="introduction"
              :rules="[formValidates.introductionCountCheck]"
              class="mt-2 font-weight-regular"
              height="80"
              outlined
              dense
            >
            </v-textarea
          ></label>
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
              to=""
              class="text-overline text-decoration-none link-color"
              >もどる</NuxtLink
            >
          </p>
        </v-col>
      </v-form>
    </v-card>
  </v-col>
</template>

<script>
export default {
  layout: 'application_specialists',
  data() {
    return {
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
        introductionCountCheck: (value) =>
          value.length <= 81 || '80文字以下で入力してください',
      },
      office_id: this.$route.params.id,
      name: '',
      kana: '',
      introduction: '',
      image: null,
      valid: false,
    }
  },
  methods: {
    async send() {
      const id = this.office_id
      const params = new FormData()
      params.append('office_id', this.office_id)
      params.append('name', this.name)
      params.append('kana', this.kana)
      params.append('introduction', this.introduction)
      if (this.image !== null) {
        params.append('image', this.image)
      }
      try {
        // `specialists/offices/${id}/staffs`
        await this.$axios.$post(`specialists/offices/${id}/staffs`, params, {
          headers: { 'Content-Type': 'multipart/form-data' },
        })
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

.max-width {
  max-width: 750px;
}

@media screen and (max-width: 959px) {
  /* sm以下で表示しない */
  .sm-under-no {
    display: none;
  }
}
</style>

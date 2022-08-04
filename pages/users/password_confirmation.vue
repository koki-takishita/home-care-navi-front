<template>
  <v-card
    min-width="375"
    max-width="750"
    min-height="400"
    max-height="487"
    class="mx-auto my-2 mt-8"
    flat
  >
    <div class="px-4 pt-4 d-sm-block mt-2">
      <h6 class="display-1 text-center text-h6 font-weight-black mt-4">
        パスワード確認
      </h6>
    </div>

    <div class="pa-4 pt-0 mt-6">
      <div class="form-wrapper mx-auto">
        <v-form v-model="form.valid">
          <label class="font-color-gray font-weight-black text-caption"
            >パスワード
            <v-text-field
              v-model="form.current_password"
              :rules="[
                formValidates.required,
                formValidates.password,
                formValidates.typeCheckString,
              ]"
              outlined
              dense
              height="44"
              placeholder="半角英数字8文字以上"
              class="font-weight-regular mt-2"
              type="password"
          /></label>

          <p class="ma-0 text-right mt-n3 mb-7">
            <NuxtLink
              to="/reset-passwords?type=customer"
              class="text-overline text-decoration-none font-color-gray"
              >パスワードを忘れた</NuxtLink
            >
          </p>

          <v-card-actions class="pa-0">
            <v-btn
              class="error pa-0 text-h6 d-none d-sm-block"
              block
              :disabled="!form.valid"
              max-width="520"
              min-width="343"
              height="60"
              @click.prevent="edit"
              >確認</v-btn
            >

            <v-btn
              class="error pa-0 ma-0 text-h6 d-block d-sm-none"
              block
              :disabled="!form.valid"
              max-width="520"
              min-width="343"
              height="48"
              @click.prevent="edit"
              >確認</v-btn
            >
          </v-card-actions>
          <p class="ma-0 pb-7 text-center d-block d-sm-none">
            <NuxtLink
              to="/users/profile"
              class="text-overline text-decoration-none link-color"
              >戻る</NuxtLink
            >
          </p>

          <p class="ma-0 pb-16 text-center d-none d-sm-block">
            <NuxtLink
              to="/users/profile"
              class="text-overline text-decoration-none link-color"
              >戻る</NuxtLink
            >
          </p>
        </v-form>
      </div>
    </div>
  </v-card>
</template>

<script>
export default {
  layout: 'application',
  data() {
    return {
      form: {
        current_password: '',
      },
      formValidates: {
        required: (value) => !!value || '必須項目です',
        password: (value) =>
          (value.length >= 8 && value.length <= 32) ||
          'パスワードは8文字以上32文字以下で入力してください',
        typeCheckString: (value) => {
          const format = /^[a-zA-Z0-9]+$/g
          return format.test(value) || '入力できるのは半角英数字のみです'
        },
      },
    }
  },
  methods: {
    async edit() {
      try {
        const response = await this.$axios.$post(`users`, {
          current_password: this.form.current_password,
        })
        localStorage.setItem('current_password', this.form.current_password)
        this.$router.push('/users/edit')
        return response
      } catch (error) {
        return error
      }
    },
  },
}
</script>
<style scoped>
.link-color {
  color: #f06364;
}

.form-wrapper {
  max-width: 520px;
}
/* stylelint-disable */
.v-text-field--outlined >>> fieldset {
  border-color: #d9dede;
}
::v-deep input::placeholder {
  color: #d9dede !important;
}
.font-color-gray {
  color: #6d7570;
}
</style>

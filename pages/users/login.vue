<template>
  <v-card width="750" class="mx-auto mt-2">
    <v-card-title>
      <h1 class="display-1">ログイン</h1>
    </v-card-title>
    <v-card-text>
      <v-form v-model="loginInfo.valid">
        <v-text-field
          v-model="loginInfo.email"
          label="メールアドレス"
          :rules="[formValidates.required, formValidates.email]"
        />
        <v-text-field
          v-model="loginInfo.password"
          label="パスワード"
          type="password"
          :rules="[
            formValidates.required,
            formValidates.password,
            formValidates.typeCheckString,
          ]"
        />
        <v-card-actions>
          <v-btn
            class="info"
            :disabled="!loginInfo.valid"
            @click.prevent="$login(loginInfo)"
            >ログイン</v-btn
          >
        </v-card-actions>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  layout: 'application',
  data() {
    return {
      loginInfo: {
        email: '',
        password: '',
        valid: false,
      },
      formValidates: {
        required: (value) => !!value || '必須項目です',
        email: (value) => {
          const format =
            // eslint-disable-next-line no-control-regex
            /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0B\x0C\x0E-\x1F\x21\x23-\x5B\x5D-\x7F]|\\[\x01-\x09\x0B\x0C\x0E-\x7F])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0B\x0C\x0E-\x1F\x21-\x5A\x53-\x7F]|\\[\x01-\x09\x0B\x0C\x0E-\x7F])+)\])$/g
          return format.test(value) || '正しいメールアドレスを入力してください'
        },
        password: (value) =>
          (value.length >= 8 && value.length <= 16) ||
          '8文字以上16文字未満で入力してください',
        typeCheckString: (value) => {
          const format = /^[a-zA-Z0-9]+$/g
          return format.test(value) || '入力できるのは半角英数字のみです'
        },
      },
    }
  },
}
</script>

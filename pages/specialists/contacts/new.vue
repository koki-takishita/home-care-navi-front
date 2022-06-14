<template>
  <v-card width="750" class="mx-auto mb-2">
    <div class="px-4 pt-4 d-sm-block">
      <h4 class="display-1 text-h6 font-weight-black">お問い合わせ</h4>
    </div>
    <v-card-text>
      <v-form v-model="contact.valid">
        <div>
          <label class="font-color-gray font-weight-black text-caption"
            >お名前
            <v-text-field
              id="name"
              v-model="contact.name"
              class="overwrite-fieldset-border-top-width mt-2 font-weight-regular"
              placeholder="田中 太郎"
              outlined
              dense
              height="44"
              :rules="[formValidates.required]"
          /></label>
        </div>

        <div class="mt-n-2">
          <label class="font-color-gray font-weight-black text-caption"
            >返信用メールアドレス
            <v-text-field
              v-model="contact.email"
              class="overwrite-fieldset-border-top-width mt-2 font-weight-regular"
              outlined
              dense
              placeholder="homecarenavi@mail.com"
              type="email"
              height="44"
              :rules="[formValidates.required, formValidates.email]"
          /></label>
        </div>

        <label class="font-color-gray font-weight-black text-caption">
          利用者区分
          <v-row>
            <v-col>
              <v-select
                v-model="contact.types"
                :items="items"
                outlined
                dense
                placeholder="ユーザー"
                :rules="[formValidates.required]"
              ></v-select>
            </v-col>
          </v-row>
        </label>
        <label class="font-color-gray text-caption"
          >お問い合わせ内容
          <v-textarea
            v-model="contact.content"
            outlined
            required="required"
            placeholder="入力してください"
            :rules="[formValidates.required]"
          />
        </label>

        <v-card-actions class="pa-0">
          <v-btn
            class="warning text-h6 block"
            block
            :disabled="!contact.valid"
            max-width="520"
            min-width="343"
            height="60"
            href="/specialists/contacts/confirm"
            @click="SendConfirmPage"
            >この内容で問い合わせる</v-btn
          >
        </v-card-actions>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  layout: 'application_specialists',
  data() {
    return {
      items: ['ユーザー', 'ケアマネージャー', '事業所', 'その他'],
      contact: {
        name: '',
        email: '',
        types: '',
        content: '',
        valid: false,
      },
      formValidates: {
        required: (value) => !!value || '必須項目です',
        typeCheckString: (value) => {
          const format = /^[a-zA-Z0-9]+$/g
          return format.test(value) || '入力できるのは半角英数字のみです'
        },
        email: (value) => {
          const format =
            // eslint-disable-next-line no-control-regex
            /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0B\x0C\x0E-\x1F\x21\x23-\x5B\x5D-\x7F]|\\[\x01-\x09\x0B\x0C\x0E-\x7F])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0B\x0C\x0E-\x1F\x21-\x5A\x53-\x7F]|\\[\x01-\x09\x0B\x0C\x0E-\x7F])+)\])$/g
          return format.test(value) || '正しいメールアドレスを入力してください'
        },
      },
    }
  },
  mounted() {
    const name = sessionStorage.getItem('name')
    const email = sessionStorage.getItem('email')
    const types = sessionStorage.getItem('types')
    const content = sessionStorage.getItem('content')
    if (name != null && email != null && types != null && content != null) {
      this.contact.name = sessionStorage.getItem('name')
      this.contact.email = sessionStorage.getItem('email')
      this.contact.types = sessionStorage.getItem('types')
      this.contact.content = sessionStorage.getItem('content')
    }
  },

  methods: {
    SendConfirmPage() {
      sessionStorage.setItem('name', this.contact.name)
      sessionStorage.setItem('email', this.contact.email)
      sessionStorage.setItem('types', this.contact.types)
      sessionStorage.setItem('content', this.contact.content)
    },
  },
}
</script>

<style scoped>
.form-wrapper {
  max-width: 520px;
}

.px-px-115 {
  padding: 0 115px;
}

.set-width-343 {
  width: 343px;
}

.set-height-44 {
  height: 44px;
}

/* stylelint-disable */
.post-form >>> fieldset {
  width: 107px;
}

.post-form >>> .v-text-field__slot {
  max-width: 82px;
}

.v-text-field--outlined >>> fieldset {
  border-color: #d9dede;
}

.mt-n-2 {
  margin-top: -2px;
}

.font-color-gray {
  color: #6d7570;
}

::v-deep input::placeholder {
  color: #d9dede !important;
}

.set-max-width-520 {
  max-width: 520px;
  min-width: 343px;
}
</style>

<template>
  <v-stepper v-model="e1" class="mb-4 mx-auto" max-width="750" flat>
    <v-stepper-items>
      <v-stepper-content step="1">
        <ContactNew
          :name.sync="name"
          :email.sync="email"
          :types.sync="types"
          :content.sync="content"
          @moveConfirmPage="changeStep"
        />
      </v-stepper-content>

      <v-stepper-content step="2">
        <ContactConfirm
          :name.sync="name"
          :email.sync="email"
          :types.sync="types"
          :content.sync="content"
          @createContact="createContact"
          @moveConfirmPage="changeStep"
        />
      </v-stepper-content>

      <v-stepper-content step="3">
        <ContactSuccess />
      </v-stepper-content>
    </v-stepper-items>
  </v-stepper>
</template>
<script>
export default {
  layout: 'application',
  asyncData({ query }) {
    const currentE1 = query.step
    const name = query.name || ''
    const types = query.types || ''
    const email = query.email || ''
    const content = query.content || ''
    try {
      return {
        name,
        types,
        email,
        e1: currentE1,
        content,
      }
    } catch (error) {
      return error
    }
  },
  data() {
    return {
      e1: 1,
      items: ['ユーザー', 'ケアマネージャー', '事業所', 'その他'],
      name: '',
      email: '',
      types: '',
      content: '',
      valid: false,
      formValidates: {
        required: (value) => !!value || '必須項目です',
        nameCountCheck: (value) =>
          value.length <= 30 || '30文字以下で入力してください',
        emailCountCheck: (value) =>
          value.length <= 255 || '255文字以下で入力してください',
        email: (value) => {
          const format =
            // eslint-disable-next-line no-control-regex
            /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0B\x0C\x0E-\x1F\x21\x23-\x5B\x5D-\x7F]|\\[\x01-\x09\x0B\x0C\x0E-\x7F])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0B\x0C\x0E-\x1F\x21-\x5A\x53-\x7F]|\\[\x01-\x09\x0B\x0C\x0E-\x7F])+)\])$/g
          return format.test(value) || '正しいメールアドレスを入力してください'
        },
      },
    }
  },
  methods: {
    changeStep(obj) {
      const content = obj.content || ''
      const name = obj.name
      const step = obj.step
      const email = obj.email
      const types = obj.types
      this.e1 = step
      this.$router.push({
        path: `/users/contacts/new`,
        query: {
          step,
          name,
          content,
          types,
          email,
        },
      })
    },
    async createContact() {
      try {
        await this.$axios.$post(`contacts`, {
          name: this.name,
          email: this.email,
          types: this.types,
          content: this.content,
        })
        this.e1 = 3
        this.$router.push({
          path: `/users/contacts/new`,
          query: {
            step: this.e1,
          },
        })
      } catch (error) {
        return error
      }
    },
  },
}
</script>

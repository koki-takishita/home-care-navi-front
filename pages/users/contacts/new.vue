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
  data() {
    return {
      e1: 1,
      items: ['ユーザー', 'ケアマネージャー', '事業所', 'その他'],
      name: '',
      email: '',
      types: '',
      content: '',
    }
  },
  methods: {
    backPage() {
      this.$router.push(`/offices/${this.office.id}`)
    },
    changeStep(obj) {
      const content = obj.content || ''
      const name = obj.name
      const step = obj.step
      this.e1 = step
      this.$router.push({
        path: `/users/contacts/new`,
        query: {
          step,
          name,
          content,
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

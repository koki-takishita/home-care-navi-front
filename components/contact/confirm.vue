<template>
  <v-card flat width="750" class="mx-auto my-2">
    <div class="px-4 pt-4 d-sm-block">
      <h4 class="display-1 text-h6 font-weight-black">
        入力内容をご確認ください
      </h4>
    </div>
    <v-card-text>
      <v-form>
        <p class="font-color-gray font-weight-black">お名前</p>
        <p>
          {{ ReadName }}
        </p>

        <p class="font-color-gray font-weight-black">返信用メールアドレス</p>
        <p>
          {{ ReadEmail }}
        </p>

        <p class="font-color-gray font-weight-black">利用者区分</p>
        <p>
          {{ ReadTypes }}
        </p>

        <p class="font-color-gray font-weight-black">お問い合わせ内容</p>
        <p>
          {{ ReadContent }}
        </p>

        <div class="text-center mt-12">
          <p class="font-color-gray font-weight-black">
            この内容で送信してよろしいですか？
          </p>
        </div>
        <v-card-actions>
          <v-btn
            block
            large
            class="error text-h6 block"
            max-width="520"
            min-width="343"
            height="60"
            @click="clickCreateContact()"
          >
            送信する
          </v-btn>
        </v-card-actions>
        <div class="mx-auto mt-4 text-center top-link mb-4">
          <p class="mx-auto mt-4 text-center top-link mb-4" @click="backPage">
            <font :color="linkColor" class="link-color" size="2">もどる</font>
          </p>
        </div>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  layout: 'application',
  props: {
    types: {
      type: String,
      default: null,
    },
    email: {
      type: String,
      default: null,
    },
    name: {
      type: String,
      default: null,
    },
    content: {
      type: String,
      default: null,
    },
  },
  computed: {
    ReadName() {
      return this.name
    },
    ReadEmail() {
      return this.email
    },
    ReadContent() {
      return this.content
    },
    ReadTypes() {
      return this.types
    },
    linkColor() {
      return '#F06364'
    },
  },
  methods: {
    backPage() {
      const obj = {}
      obj.step = 1
      obj.name = this.name
      obj.content = this.content
      obj.types = this.types
      this.$emit('moveConfirmPage', obj)
    },
    clickCreateContact() {
      this.$emit('createContact')
    },
    async SendSuccessPage() {
      try {
        const response = await this.$axios.$post(`contacts`, {
          name: this.name,
          email: this.email,
          types: this.types,
          content: this.content,
        })
        this.$router.push('/users/contacts/success')
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
  cursor: pointer;
}
</style>

<template>
  <div :class="marginTop">
    <v-card
      max-width="750"
      min-width="375"
      min-height="681"
      max-height="768"
      class="pa-4 mx-auto"
      outlined
    >
      <v-card max-width="520" class="mx-auto" outlined>
        <FormTitle
          :title="FormTitle.title"
          :link="FormTitle.link"
          :path="FormTitle.path"
        />
        <Form
          v-for="(item, i) in inputsItem"
          :key="i"
          :index="i"
          :item="item"
        />
        <Btn :name="Btn.name" />
      </v-card>
    </v-card>
  </div>
</template>
<script>
export default {
  layout: 'top',
  data() {
    return {
      inputsItem: [
        { name: 'name', label: 'お名前', placeholder: '田中太郎' },
        {
          name: 'email',
          label: 'メールアドレス',
          placeholder: '例）homecarenavi@mail.com',
        },
        { name: 'password', label: 'パスワード', placeholder: 'パスワード' },
        { name: 'phone-number', label: '電話番号', placeholder: '000-0000' },
      ],
      FormTitle: {
        title: '新規登録',
        link: 'ログインはこちら',
        path: '/login',
      },
      Btn: {
        name: '新規登録',
      },
    }
  },
  computed: {
    marginTop() {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs':
          return 'mt-2'
        case 'sm':
          return 'mt-2'
        case 'md':
          return 'mt-10'
        case 'lg':
          return 'mt-10'
        case 'xl':
          return 'mt-10'
      }
    },
  },
}
</script>
<style lang="sass" scoped>
.v-card
  border: none
</style>

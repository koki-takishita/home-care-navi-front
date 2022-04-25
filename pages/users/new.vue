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
          :name.sync="name"
          :email.sync="email"
          :password.sync="password"
          :phone.sync="phone"
        />
        <FormPost :post_code.sync="post_code" :address.sync="address" />
        <Btn :name="Btn.name" @click="registerUser" />
      </v-card>
    </v-card>
  </div>
</template>
<script>
export default {
  layout: 'top',
  data() {
    return {
      name: '',
      email: '',
      password: '',
      phone: '',
      post_code: '',
      address: '',

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
  methods: {
    async registerUser() {
      try {
        await this.$axios.post('/api/users', {
          name: this.name,
          email: this.email,
          password: this.password,
          phone: this.phone,
          post_code: this.post_code,
          address: this.address,
        })
      } catch (error) {
        this.error = e.response.data.errors.full_messages
      }
    },
  },
}
</script>
<style lang="sass" scoped>
.v-card
  border: none
.w-107
  width: 107px
</style>

<template>
  <v-container class="base-width">
    <v-card class="pb-6">
      <v-card-title class="pb-0 font-weight-black">お礼の編集</v-card-title>
      <p class="px-4 mt-6 mb-0 font-weight-black">
        <font :color="labelColor" size="2">事業所名</font>
      </p>
      <v-card-text class="text-subtitle-1 pt-2"
        ><font color="Black">{{ officeName }}</font></v-card-text
      >
      <v-form ref="form" v-model="valid">
        <div class="px-4">
          <label class="font-color-gray font-weight-black text-subtitle-2">
            <font :color="labelColor">お礼をするスタッフ</font>
          </label>
          <v-card-text class="text-subtitle-1 pa-0 pt-2 mb-4"
            ><font color="Black">{{ staffName }}</font></v-card-text
          >
        </div>
        <div class="px-4">
          <label class="font-color-gray font-weight-black text-subtitle-2">
            <font :color="labelColor">お礼の内容</font>
            <v-textarea
              v-model="thank.comments"
              :rules="rules"
              class="font-weight-light mt-2"
              height="140"
              placeholder="入力してください"
              outlined
            >
            </v-textarea>
          </label>
        </div>
      </v-form>
      <div class="px-4">
        <v-btn
          :disabled="!valid"
          block
          depressed
          height="60"
          color="error"
          class="font-weight-black"
          @click="updateThank"
          ><font size="4">更新する</font>
        </v-btn>
      </div>
      <ThankBackLink
        class="text-center mt-1"
        text="もどる"
        @movePage="goThankPage"
      />
    </v-card>
  </v-container>
</template>
<script>
export default {
  layout: 'application',
  async asyncData({ params, $axios }) {
    const id = params.id
    try {
      const res = await $axios.$get(`thanks/${id}`)
      const thank = res
      const copyComment = res.comments
      const officeName = res.office.name
      const staffName = res.staff.name
      return { thank, copyComment, officeName, staffName }
    } catch (error) {
      // console.log(error)
      return error
    }
  },
  data() {
    return {
      valid: false,
      thank: {},
      copyComment: '',
    }
  },
  computed: {
    labelColor() {
      return '#6D7570'
    },
    comment() {
      return this.thank.comments
    },
    notMatch() {
      return this.copyComment !== this.comment
    },
    rules() {
      const rules = []
      const requiredRule = (value) => !!value || '必須項目です'
      rules.push(requiredRule)
      const updateRule = () => this.notMatch || '更新してください'
      rules.push(updateRule)
      const maxLength = () =>
        this.comment.length <= 120 || 'お礼は120文字以下で入力してください'
      rules.push(maxLength)
      return rules
    },
  },
  watch: {
    comment: 'validateField',
  },
  methods: {
    async updateThank() {
      try {
        const id = this.thank.id
        const params = {
          thank: {
            comments: this.thank.comments,
          },
        }
        await this.$axios.$put(`thanks/${id}`, params)
        this.$router.push('/thanks')
      } catch (error) {
        // console.log(error)
        return error
      }
    },
    validateField() {
      this.$refs.form.validate()
    },
    goThankPage() {
      this.$router.push('/thanks')
    },
  },
}
</script>
<style scoped>
.base-width {
  max-width: 990px;
}
</style>

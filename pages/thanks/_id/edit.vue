<template>
  <v-container class="base-width">
    <v-card class="pb-6">
      <v-card-title class="pb-0 font-weight-black">お礼の編集</v-card-title>
      <p class="px-4 mt-6 mb-0 font-weight-black">
        <font :color="labelColor" size="2">事業所名</font>
      </p>
      <v-card-text class="text-subtitle-1 pt-2"
        ><font color="Black">オフィスの名前が入る</font></v-card-text
      >
      <v-form ref="form" v-model="valid">
        <div class="px-4">
          <label class="font-color-gray font-weight-black text-subtitle-2">
            <font :color="labelColor">お礼をするスタッフ</font>
          </label>
          <v-card-text class="text-subtitle-1 pa-0 pt-2 mb-4"
            ><font color="Black">スタッフの名前が入る</font></v-card-text
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
    </v-card>
  </v-container>
</template>
<script>
export default {
  layout: 'application',
  asyncData({ params }) {
    const id = params.id
    /* TODO async data移行用 いきなりバリテーションがかからないver
		const thank = {
			comments: 'hogehoge'
		}
		const copyComment = thank.comments
    return { id, thank, copyComment }
		*/
    return { id }
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
      if (!this.comment) {
        const rule = (value) => !!value || '必須項目です'
        rules.push(rule)
      }

      if (!this.notMatch) {
        const rule = () => this.notMatch || '更新してください'
        rules.push(rule)
      }

      return rules
    },
  },
  watch: {
    comment: 'validateField',
  },
  mounted() {
    this.fetchThank()
  },
  methods: {
    async fetchThank() {
      try {
        const res = await this.$axios.$get(`thanks/${this.id}`)
        this.thank = res
        this.copyComment = res.comments
      } catch (error) {
        // console.log(error)
        // TODO async dataでalert出すように設定
        this.$router.push('/thanks')
        return error
      }
    },
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
  },
}
</script>
<style scoped>
.base-width {
  max-width: 990px;
}
</style>

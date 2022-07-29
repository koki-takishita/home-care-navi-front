<template>
  <v-container class="base-width">
    <v-card outlined class="cards-wrapper">
      <v-card-title class="text-h6 font-weight-black pl-0"
        >お礼一覧
      </v-card-title>
      <v-row v-if="thanksExist">
        <v-col v-for="thank in thanks" :key="thank.id" cols="12" md="6">
          <ThankCardForOffice :thank="thank" @refresh="refresh" />
        </v-col>
        <v-col cols="12">
          <v-pagination
            v-model="page"
            :length="count"
            color="#D9DEDE"
            class="page-nation"
          ></v-pagination>
        </v-col>
      </v-row>
      <div v-else class="not-thanks-comment mt-16">
        <p class="text-center text-subtitle-1">お礼投稿履歴はありません</p>
        <ThankBackLink
          class="text-center"
          :text="backText"
          @movePage="moveTop"
        />
      </div>
    </v-card>
  </v-container>
</template>
<script>
export default {
  layout: 'application_specialists',
  async asyncData({ $axios, query }) {
    const page = Number(query.page) || 1
    const offsetPage = page - 1
    try {
      const res = await $axios.$get(
        `specialists/offices/thanks?page=${offsetPage}`
      )
      const thanks = res.thanks
      let count = res.thank_total
      count = count / 10 || 0
      count = Math.ceil(count)
      if (count === 0) {
        count = 1
      }
      return { page, thanks, count }
    } catch (error) {
      // console.log(error)
      return error
    }
  },
  computed: {
    thanksExist() {
      return this.thanks.length > 0
    },
    backText() {
      return '予約状況に戻る'
    },
  },
  methods: {
    moveTop() {
      this.$router.push('/specialists/office/appointments')
    },
    refresh() {
      if (this.thanks.length <= 2) {
        this.$router.push({ query: { page: this.page - 1 } })
      }
      this.$nuxt.refresh()
    },
  },
}
</script>
<style scoped>
.base-width {
  max-width: 990px;
}

.cards-wrapper {
  border: 0;
  background-color: #f5f7f7;
}

.not-thanks-comment {
  color: #6d7570;
}

/* stylelint-disable */
.loading-element {
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 2;
  transform: translate(-50%, -50%);
  -webkit-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
}

::v-deep button.v-pagination__navigation {
  box-shadow: none;
  border: 1px solid #d9dede;
}

::v-deep button.v-pagination__item {
  box-shadow: none;
  border: 1px solid #d9dede;
}

::v-deep i.v-icon.notranslate.mdi {
  color: #f06364;
}
/* stylelint-enable */
</style>

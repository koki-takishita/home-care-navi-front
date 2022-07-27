<template>
  <v-container class="base-width">
    <v-card outlined class="cards-wrapper">
      <v-card-title class="text-h6 font-weight-black pl-0"
        >お礼投稿履歴</v-card-title
      >
      <v-row v-if="thanksExist">
        <v-col v-for="thank in thanks" :key="thank.id" cols="12" md="6"
          ><ThankCard :thank="thank" @clickDeleteBtn="refresh" />
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
  layout: 'application',
  async asyncData({ query, $axios }) {
    const page = Number(query.page) || 1
    const offsetPage = page - 1
    try {
      const res = await $axios.$get(`thanks?page=${offsetPage}`)
      const thanks = res.thank
      let count = res.count
      count = count / 10 || 0
      count = Math.ceil(count)
      if (count === 0) {
        count = 1
      }

      return {
        page,
        count,
        thanks,
      }
    } catch (error) {
      // console.log(error)
      return error
    }
  },
  data() {
    return {
      thanks: [],
      page: 1,
      count: '',
      loading: true,
    }
  },
  computed: {
    thanksExist() {
      return this.thanks.length > 0
    },
    backText() {
      return 'ホームケアナビトップに戻る'
    },
  },
  watch: {
    page() {
      this.fetchThanks(this.page)
      this.scrollTop()
      this.$router.push({
        path: '/thanks',
        query: {
          page: this.page,
        },
      })
    },
  },
  methods: {
    async fetchThanks(page = 1) {
      try {
        const offsetPage = page - 1
        const res = await this.$axios.$get(`thanks?page=${offsetPage}`)
        this.thanks = res.thank
        let count = res.count
        count = count / 10 || 0
        count = Math.ceil(count)
        if (count === 0) {
          count = 1
        }
        this.count = count
      } catch (error) {
        // console.log(error)
        return error
      }
    },
    refresh() {
      // ページ上のすべてのお礼を削除したら、ページネーションを1つまえにずらす
      // https://i.gyazo.com/08c761f92acc27d049db5263e04e88d7.mp4
      if (this.thanks.length <= 2) {
        this.$router.push({ query: { page: this.page - 1 } })
      }
      this.$nuxt.refresh()
      this.scrollTop()
    },
    moveTop() {
      this.$router.push('/')
    },
    scrollTop() {
      this.$vuetify.goTo(0)
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

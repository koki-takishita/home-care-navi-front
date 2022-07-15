<template>
  <v-col cols="12" md="8" lg="7" xl="7" class="mx-auto">
    <h3>利用者情報管理</h3>
    <v-row class="mt-4">
      <v-col
        v-for="(care_recipient, index) in care_recipients"
        :key="index"
        cols="12"
        md="6"
      >
        <v-card class="mx-auto mb-4">
          <v-row>
            <v-avatar size="80" color="grey lighten-3" class="ml-5 mt-3 mr-0">
              <v-img
                v-if="care_recipient.image_url !== null"
                :src="care_recipient.image_url"
              ></v-img>
              <v-icon v-else size="60" color="white">mdi-account</v-icon>
            </v-avatar>
            <v-col cols="8" class="ml-0">
              <h3 class="name-limit">
                {{ care_recipient.name }}&nbsp;&nbsp;({{ care_recipient.age }})
              </h3>
              <div class="font-color-gray text-caption name-limit">
                {{ care_recipient.kana }}
              </div>
              <div class="font-color-gray text-caption name-limit mt-2">
                〒{{ care_recipient.post_code }}
              </div>
              <div class="font-color-gray text-caption name-limit">
                {{ care_recipient.address }}
              </div>
              <div class="font-color-gray text-caption name-limit mt-2 mb-2">
                家族情報&nbsp;:&nbsp;{{ care_recipient.family }}
              </div>
            </v-col>
          </v-row>
          <div
            class="font-color-gray font-weight-black text-caption name-limit ml-3 mb-2"
          >
            担当スタッフ&nbsp;:&nbsp;{{ care_recipient.staff.name }}
          </div>
          <v-row>
            <v-col cols="4" class="pl-6 pr-0">
              <v-btn
                block
                depressed
                outlined
                color="blue-grey lighten-4"
                @click="openModal(care_recipient.id)"
                ><div class="delete-button font-weight-bold">削除</div></v-btn
              >
            </v-col>
            <v-col cols="8" class="pr-6">
              <v-btn
                block
                depressed
                color="warning"
                :to="`care-recipients/${care_recipient.id}/edit`"
                class="font-weight-bold"
                >編集する</v-btn
              >
              <v-col v-for="(staff, i) in staffs" :key="i" cols="12" md="6">
                {{ staff.name }}
              </v-col>
            </v-col>
          </v-row>
        </v-card>
        <Modal v-if="modalFlag">
          <v-col class="mb-4">本当に削除してもよろしいですか？</v-col>
          <v-btn
            width="120"
            color="warning"
            depressed
            class="ml-2 mr-4"
            @click="closeModal"
            >キャンセル</v-btn
          >
          <v-btn
            id="delete"
            width="120"
            depressed
            outlined
            @click="deleteCareRecipients(currentCareRecipientId)"
            ><div class="delete-button">OK</div></v-btn
          >
        </Modal>
      </v-col>
    </v-row>
    <v-btn
      block
      depressed
      large
      color="white"
      class="mt-8 mb-10"
      to="care-recipients/new"
    >
      <div class="delete-button font-weight-bold">
        <v-icon class="mb-1">mdi-plus</v-icon>
        利用者を追加する
      </div>
    </v-btn>
    <div class="mt-2 text-center">
      <v-pagination
        v-model="page"
        :length="count"
        color="#D9DEDE"
        class="page-nation"
      ></v-pagination>
    </div>
  </v-col>
</template>

<script>
export default {
  layout: 'application_specialists',
  middleware: 'authentication',
  data() {
    return {
      care_recipients: [],
      staffs: [],
      office: [],
      office_id: this.$route.params.office_id,
      count: 0,
      page: Number(this.$route.query.page) || 1,
      offsetPage: 0,
      currentCareRecipientId: 0,
      modalFlag: false,
    }
  },
  watch: {
    page() {
      this.$router.push({
        path: `/specialists/office/${this.office_id}/care-recipients`,
        query: {
          page: this.page,
        },
      })
      this.scrollTop()
    },
  },
  mounted() {
    this.$watch(
      'page',
      function () {
        this.getCareRecipients()
      },
      {
        immediate: true,
      }
    )
    this.getCareRecipients()
    this.getOffice()
  },
  methods: {
    async getOffice() {
      try {
        const response = await this.$axios.$get(
          `specialists/offices/${this.office.id}`
        )
        if (response.id - this.office_id !== 0) {
          this.$router.push(
            `/specialists/office/${response.id}/care-recipients?page=1`
          )
        }
      } catch (error) {
        return error
      }
    },
    async getCareRecipients() {
      if (this.page > 1) {
        this.offsetPage = this.page - 1
      } else {
        this.offsetPage = 0
      }
      try {
        const response = await this.$axios.$get(
          `specialists/offices/${this.office_id}/care_recipients?page=${this.offsetPage}`
        )
        this.care_recipients = response.care_recipients
        this.count = response.data_length
        this.count = this.count / 10
        this.count = Math.ceil(this.count)
        if (this.count === 0) {
          this.count = 1
        }
      } catch (error) {
        return error
      }
    },
    openModal(id) {
      this.currentCareRecipientId = id
      this.modalFlag = true
    },
    closeModal() {
      this.modalFlag = false
    },
    scrollTop() {
      this.$vuetify.goTo(0)
    },
    async deleteCareRecipients(id) {
      try {
        await this.$axios.$delete(
          `specialists/offices/${this.office_id}/care_recipients/${id}`
        )
        window.location.reload()
      } catch (error) {
        return error
      }
    },
  },
}
</script>
<style lang="scss" scoped>
.name-limit {
  /*  -webkit-boxを指定します */
  display: -webkit-box;
  /*  行数を指定します */
  -webkit-line-clamp: 1;
  /*  合わせてこの指定も必要です */
  -webkit-box-orient: vertical;
  /*  はみ出すものは隠します */
  overflow: hidden;
}

.introduction-limit {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.font-color-gray {
  color: #6d7570;
}

.delete-button {
  color: #ff9800;
}

.modal {
  &__overlay {
    background: rgba(0, 0, 0, 0.5);
  }
}

/* stylelint-disable */
::v-deep .v-pagination i.v-icon.notranslate.mdi.mdi-chevron-left.theme--light {
  color: #ff9800;
}

::v-deep .v-pagination i.v-icon.notranslate.mdi.mdi-chevron-right.theme--light {
  color: #ff9800;
}

.pa-2.remove-bottom-border-radius.v-card.v-sheet.v-sheet--outlined.theme--light.rounded-0 {
  border: 0;
}

::v-deep button.v-pagination__navigation.v-pagination__navigation {
  box-shadow: none;
}

::v-deep button.v-pagination__item {
  box-shadow: none;
}

::v-deep button.v-pagination__item.v-pagination__item--active {
  box-shadow: none;
}
/* stylelint-enable */
</style>

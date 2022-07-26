<template>
  <v-col cols="12" md="8" lg="7" xl="7" class="mx-auto">
    <h3>スタッフ情報</h3>
    <v-row class="mt-4">
      <v-col v-for="(staff, index) in staffs" :key="index" cols="12" md="6">
        <v-card class="mx-auto mb-4">
          <v-row>
            <v-avatar size="80" color="grey lighten-3" class="ml-5 mt-3 mr-0">
              <v-img
                v-if="staff.image_url !== null"
                :src="staff.image_url"
              ></v-img>
              <v-icon v-else size="60" color="white">mdi-account</v-icon>
            </v-avatar>
            <v-col cols="8" class="ml-0">
              <h3 class="name-limit">
                {{ staff.name }}
              </h3>
              <div
                class="font-color-gray font-weight-black text-caption name-limit"
              >
                {{ staff.kana }}
              </div>
              <div class="mt-2 font-color-gray introduction-limit">
                {{ staff.introduction }}
              </div>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="4" class="pl-6 pr-0">
              <v-btn
                id="modal"
                block
                depressed
                outlined
                @click="openModal(staff.id)"
                ><div class="delete-button">削除</div></v-btn
              >
            </v-col>
            <v-col cols="8" class="pr-6">
              <v-btn
                id="edit"
                block
                depressed
                color="warning"
                :to="`staffs/${staff.id}/edit`"
                >編集する</v-btn
              >
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
            @click="deleteStaff(currentStaffId)"
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
      to="staffs/new"
    >
      <div class="delete-button">
        <v-icon class="mb-1">mdi-plus</v-icon>
        スタッフを追加する
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
  async asyncData({ $axios, query }) {
    try {
      const res = await $axios.$get(
        `specialists/offices/staffs?page=${query.page - 1}`
      )
      return {
        staffs: res.staffs,
        data_length: res.data_length,
      }
    } catch (error) {
      return error
    }
  },
  data() {
    return {
      count: 0,
      page: Number(this.$route.query.page) || 1,
      offsetPage: 0,
      modalFlag: false,
      currentStaffId: 0,
    }
  },
  watch: {
    page() {
      this.$router.push({
        path: `/specialists/office/staffs`,
        query: {
          page: this.page,
        },
      })
      this.scrollTop()
    },
  },
  mounted() {
    this.calcCountAndOffsetPage()
  },
  methods: {
    calcCountAndOffsetPage() {
      if (this.page > 1) {
        this.offsetPage = this.page - 1
      } else {
        this.offsetPage = 0
      }
      this.count = this.data_length
      this.count = this.count / 10
      this.count = Math.ceil(this.count)
      if (this.count === 0) {
        this.count = 1
      }
    },
    openModal(id) {
      this.currentStaffId = id
      this.modalFlag = true
    },
    closeModal() {
      this.modalFlag = false
    },
    scrollTop() {
      this.getStaffs()
      this.$vuetify.goTo(0)
    },
    async getStaffs() {
      if (this.page > 1) {
        this.offsetPage = this.page - 1
      } else {
        this.offsetPage = 0
      }
      try {
        const response = await this.$axios.$get(
          `specialists/offices/staffs?page=${this.offsetPage}`
        )
        this.staffs = response.staffs
        this.count = response.data_length
        this.count = this.count / 10
        this.count = Math.ceil(this.count)
        if (this.count === 0) {
          this.count = 1
        }
        this.apiCallFlag = false
      } catch (error) {
        return error
      }
    },
    async deleteStaff(id) {
      this.modalFlag = false
      try {
        await this.$axios.$delete(`specialists/offices/staffs/${id}`)
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

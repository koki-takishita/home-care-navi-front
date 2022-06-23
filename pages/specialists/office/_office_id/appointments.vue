<template>
  <v-col cols="12" md="8" lg="7" xl="7" class="mx-auto">
    <h3 class="pb-3">予約状況確認</h3>
    <v-row>
      <v-col
        v-for="(appointment, index) in appointments"
        :key="index"
        cols="12"
        sm="6"
        xl="4"
      >
        <v-card class="mx-auto">
          <v-col>
            <v-row>
              <v-col cols="5">
                <v-chip
                  class="text-caption font-weight-bold"
                  :color="switchBackgroundColor(appointment.called_status)"
                  label
                  small
                >
                  <font :color="switchTextColor(appointment.called_status)">
                    <div v-if="appointment.called_status === 'need_call'">
                      未連絡
                    </div>
                    <div v-else-if="appointment.called_status === 'called'">
                      連絡済み
                    </div>
                    <div v-else-if="appointment.called_status === 'cancel'">
                      キャンセル済み
                    </div>
                  </font>
                </v-chip>
              </v-col>
              <v-col cols="7">
                <div class="text-right font-color-gray text-caption">
                  {{ appointment.created_at | created_at }}
                </div>
              </v-col>
            </v-row>
            <h3 class="mt-3">
              {{ appointment.name }}（{{
                appointment.age.replace(/[^0-9]/g, '')
              }}）
            </h3>
            <div class="mt-2 font-color-gray font-weight-black text-caption">
              面談希望日時
            </div>
            <div class="py-0">
              {{ appointment.meet_date | meet_date }}
              {{ appointment.meet_time }}
            </div>
            <div class="mt-2 font-color-gray font-weight-black text-caption">
              連絡先電話番号
            </div>
            <div class="font-color-orange text-caption">
              {{ appointment.phone_number }}
            </div>
            <div v-if="appointment.called_status === 'need_call'">
              <v-btn block class="mt-3 mb-2" color="warning" @click="call"
                >連絡済みにする</v-btn
              >
              <v-btn block color="error" @click="cancel">キャンセルする</v-btn>
            </div>
          </v-col>
        </v-card>
      </v-col>
      <v-col v-show="isShow">予約はありません</v-col>
    </v-row>
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
  beforeRouteUpdate() {
    console.log('test')
    console.log(this.page)
  },
  layout: 'application_specialists',
  middleware: 'authentication',
  data() {
    return {
      office_id: this.$route.params.office_id,
      appointments: [],
      isShow: false,
      count: 0,
      page: Number(this.$route.query.page) || 1,
      offsetPage: 0,
    }
  },
  watch: {
    page() {
      if (this.page > 1) {
        this.offsetPage = this.page - 1
      } else {
        this.offsetPage = 0
      }
      this.$router.push({
        path: `/specialists/office/${this.office_id}/appointments`,
        query: {
          page: this.page,
        },
      })
      this.scrollTop()
    },
  },
  mounted() {
    this.getAppointmentsStatus()
  },
  methods: {
    async getAppointmentsStatus() {
      try {
        const response = await this.$axios.$get(
          `specialists/offices/${this.office_id}/appointments?page=${this.offsetPage}`
        )
        this.appointments = response.appointments
        this.count = response.data_length
        this.count = this.count / 10
        this.count = Math.ceil(this.count)
        if (this.count === 0) {
          this.count = 1
        }
        if (this.appointments.length === 0) {
          this.isShow = true
        } else {
          this.isShow = false
        }
      } catch (error) {
        return error
      }
    },
    scrollTop() {
      this.$vuetify.goTo(0)
    },
    switchBackgroundColor(calledStatus) {
      switch (calledStatus) {
        case 'need_call':
          return '#F0636433'
        default:
          return '#EEEEEE'
      }
    },
    switchTextColor(calledStatus) {
      switch (calledStatus) {
        case 'need_call':
          return '#F06364'
        default:
          return '#666666'
      }
    },
    call() {
      const isCalled = '連絡済みにしますか？'
      if (window.confirm(isCalled)) {
        return true
      }
    },
    cancel() {
      const isCanceled = '本当にキャンセルしてもよろしいですか？'
      if (window.confirm(isCanceled)) {
        return true
      }
    },
  },
}
</script>
<style scoped>
.font-color-gray {
  color: #6d7570;
}

.font-color-orange {
  color: #ff773e;
}

/* stylelint-disable */
::v-deep .v-pagination i.v-icon.notranslate.mdi.mdi-chevron-left.theme--light {
  color: #f06364;
}

::v-deep .v-pagination i.v-icon.notranslate.mdi.mdi-chevron-right.theme--light {
  color: #f06364;
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

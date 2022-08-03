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
              <v-btn
                block
                class="mt-3 mb-2"
                color="warning"
                @click="openCallModal(appointment.id)"
                >連絡済みにする</v-btn
              >
              <v-btn
                block
                color="error"
                @click="openCancelModal(appointment.id)"
                >キャンセルする</v-btn
              >
            </div>
          </v-col>
        </v-card>
        <Modal v-if="modalFlag">
          <v-col class="mb-4 text-center">{{ modalMsg }}</v-col>
          <div class="text-center">
            <v-btn
              width="120"
              color="warning"
              depressed
              class="ml-2 mr-4"
              @click="closeModal"
              >キャンセル</v-btn
            >
            <v-btn
              v-if="callMethod === 'call'"
              id="call"
              width="120"
              depressed
              outlined
              @click="call(currentAppointmentId)"
              ><div class="delete-button">OK</div></v-btn
            >
            <v-btn
              v-else
              id="cancel"
              width="120"
              depressed
              outlined
              @click="cancel(currentAppointmentId)"
              ><div class="delete-button">OK</div></v-btn
            >
          </div>
        </Modal>
      </v-col>
      <v-col v-if="noAppointments">予約はありません</v-col>
    </v-row>
    <div class="mt-2 text-center">
      <v-pagination
        v-if="appointmentsExist"
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
      const page = Number(query.page) || 1
      const offsetPage = page - 1
      const res = await $axios.$get(
        `/specialists/offices/appointments?page=${offsetPage}`
      )
      const appointments = res.appointments
      let count = res.data_length
      count = count / 10 || 0
      count = Math.ceil(count)
      if (count === 0) {
        count = 1
      }
      return {
        page,
        count,
        appointments,
      }
    } catch (error) {
      return error
    }
  },
  data() {
    return {
      callMethod: '',
      modalFlag: false,
      modalMsg: '',
      currentAppointmentId: 0,
    }
  },
  computed: {
    appointmentsExist() {
      return this.appointments.length > 0
    },
    noAppointments() {
      return this.appointments.length === 0
    },
  },
  watch: {
    page() {
      this.getAppointmentsStatus(this.page)
      this.scrollTop()
      this.$router.push({
        path: `/specialists/office/appointments`,
        query: {
          page: this.page,
        },
      })
    },
  },
  methods: {
    openCallModal(id) {
      this.currentAppointmentId = id
      this.modalMsg = '連絡済みにしますか？'
      this.callMethod = 'call'
      this.modalFlag = true
    },
    openCancelModal(id) {
      this.currentAppointmentId = id
      this.modalMsg = '本当にキャンセルしてもよろしいですか？'
      this.callMethod = 'cancel'
      this.modalFlag = true
    },
    closeModal() {
      this.callMethod = ''
      this.modalFlag = false
    },
    async getAppointmentsStatus(page = 1) {
      try {
        const offsetPage = page - 1
        const res = await this.$axios.$get(
          `specialists/offices/appointments?page=${offsetPage}`
        )
        this.appointments = res.appointments
        let count = res.data_length
        count = count / 10 || 0
        count = Math.ceil(count)
        if (count === 0) {
          count = 1
        }
        this.count = count
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
    async call(id) {
      this.modalFlag = false
      try {
        await this.$axios.$put(`specialists/offices/appointments/${id}`, {
          called_status: 1,
        })
        this.$nuxt.refresh()
        this.scrollTop()
      } catch (error) {
        return error
      }
    },
    async cancel(id) {
      this.modalFlag = false
      try {
        await this.$axios.$put(`specialists/offices/appointments/${id}`, {
          called_status: 2,
        })
        this.$nuxt.refresh()
        this.scrollTop()
      } catch (error) {
        return error
      }
    },
  },
}
</script>
<style lang="scss" scoped>
.font-color-gray {
  color: #6d7570;
}

.font-color-orange {
  color: #ff773e;
}

.delete-button {
  color: #ff9800;
}

.modal {
  &__overlay {
    background: rgba(0, 0, 0, 0.1);
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

<template>
  <v-card class="md-over-no" tile>
    <v-card-title class="py-2 px-3 d-flex flex-nowrap">
      <h3 class="set-max-layout">{{ office.name }}</h3>
      <office-bookmark-btn
        :bookmark="bookmark"
        :office-id="officeId"
        @grandChild-event-submit-bookmark="childEventSubmitBookmark"
        @grandChild-event-destroy-bookmark="childEventDestroyBookmark"
      />
    </v-card-title>
    <v-col cols="12">
      <div class="office-tel">
        〒{{ office.post_code }}
        <br />
        {{ office.address }}
      </div>
      <div class="mt-3 d-flex access-and-staff">
        <v-icon>mdi-map-marker</v-icon>
        <div class="my-auto">東京駅 徒歩5分</div>
        <v-icon>mdi-account</v-icon>
        <div class="my-auto">スタッフ数 {{ staffs.length }}人</div>
      </div>
    </v-col>
    <v-col class="pt-0" md="12" xs="6">
      <v-icon large>mdi-phone</v-icon>{{ office.phone_number }}
      <div class="d-flex">
        <div class="fax pr-1">FAX</div>
        <div class="my-auto">{{ office.fax_number }}</div>
      </div>
    </v-col>
    <v-col cols="12"
      ><v-btn x-large block depressed color="error" @click="goAppointmentsPage"
        >WEB予約する</v-btn
      >
    </v-col>
    <v-row no-gutters align="center" class="mt-3">
      <v-col cols="2">
        <p class="font-weight-black text-caption mb-0 text-center">
          <font color="#6D7570">営業日</font>
        </p>
      </v-col>
      <v-col cols="10">
        <v-card min-height="56" tile outlined class="reset-border-style mr-3">
          <table rules="cols" frame="border">
            <thead>
              <tr>
                <th v-for="(day, i) in week" :key="i">
                  <font size="1" :color="switchColor(day)">{{ day }}</font>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td v-for="(item, i) in holidayArray" :key="i" align="center">
                  <v-icon small :color="switchColor(item)">
                    {{ toggleSymbol(item) }}
                  </v-icon>
                </td>
              </tr>
            </tbody>
          </table>
        </v-card>
      </v-col>
    </v-row>
    <v-col class="mt-4 md-over-no holiday-detail">
      {{ office.business_day_detail }}
    </v-col>
  </v-card>
</template>

<script>
export default {
  props: {
    officeId: {
      type: Number,
      default() {
        return null
      },
    },
    office: {
      type: Object,
      default() {
        return null
      },
    },
    staffs: {
      type: Array,
      default() {
        return null
      },
    },
    bookmark: {
      type: [Array, Object],
      default() {
        return null
      },
    },
  },
  data() {
    return {
      week: ['日', '月', '火', '水', '木', '金', '土'],
      binaryNumber: [64, 32, 16, 8, 4, 2, 1],
    }
  },
  computed: {
    holidayArray() {
      return this.conversionBinaryToHolidayArray(this.office.flags)
    },
  },
  methods: {
    goAppointmentsPage() {
      if (!this.$auth.loggedIn) {
        return alert('ログインをする必要があります')
      } else {
        this.$router.push(`/offices/${this.officeId}/appointments`)
      }
    },
    conversionBinaryToHolidayArray(holiday) {
      const array = []
      this.binaryNumber.forEach((n) => {
        if (holiday >= n) {
          holiday = holiday - n
          array.push(1)
        } else {
          array.push(0)
        }
      })
      return array.reverse()
    },
    toggleSymbol(n) {
      return n === 1 ? 'mdi-close' : 'mdi-circle-outline'
    },
    switchColor(item) {
      if (typeof item === 'string') {
        // 曜日の色を切替
        switch (item) {
          case '土':
            return '#2E6EE6'
          case '日':
            return '#E23E5D'
          default:
            return '#2E3331'
        }
      } else {
        // 1,0で色切替
        switch (item) {
          case 0:
            return '#F09C3C'
          default:
            return '#AEB5B2'
        }
      }
    },
    childEventSubmitBookmark(officeId) {
      this.$emit('submit-bookmark', officeId)
    },
    childEventDestroyBookmark(officeId, bookmarkId) {
      this.$emit('destroy-bookmark', officeId, bookmarkId)
    },
  },
}
</script>

<style lang="scss" scoped>
.set-max-layout {
  max-height: 50px;
  line-height: normal;
}

.office-tel {
  font-size: 13px;
  color: #707f89;
}

.access-and-staff {
  font-size: 13px;
}

.fax {
  font-size: 18px;
  color: #707f89;
  font-weight: bold;
}

.holiday-detail {
  font-size: 11px;
  color: #707f89;
}

/* stylelint-disable */
.reset-border-style.v-card.v-sheet.v-sheet--outlined.theme--light.rounded-0 {
  border: 0px;
}
/* stylelint-enable */

table {
  width: 100%;
  height: 100%;
  border-color: #d9dede;
}

th {
  background-color: #f5f5f5;
}

td {
  height: 35px;
}

@media screen and (min-width: 961px) {
  /* md以上で表示しない */
  .md-over-no {
    display: none;
  }
  .office-name {
    font-size: 28px;
    font-weight: bold;
  }
}
</style>

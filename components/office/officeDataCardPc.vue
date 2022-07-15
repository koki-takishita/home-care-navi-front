<template>
  <v-card class="sm-under-no sticky" tile>
    <v-row class="mx-auto mt-auto max-width">
      <v-col class="office-name" cols="10">{{ getOffice.name }} </v-col>
      <v-col class="pl-0" ols="2">
        <v-btn fab depressed>
          <v-icon large color="white">mdi-star</v-icon>
        </v-btn>
      </v-col>
      <v-col cols="12">
        <div class="office-tel">
          〒{{ getOffice.post_code }}
          <br />
          {{ getOffice.address }}
        </div>
        <div class="mt-3 d-flex access-and-staff">
          <v-icon>mdi-map-marker</v-icon>
          <div class="my-auto">東京駅 徒歩5分</div>
          <v-icon>mdi-account</v-icon>
          <div class="my-auto">スタッフ数 {{ getStaffs.length }}人</div>
        </div>
      </v-col>
      <v-col class="pt-0" md="12" xs="6">
        <div><v-icon large>mdi-phone</v-icon>{{ getOffice.phone_number }}</div>
        <div class="d-flex">
          <div class="fax pr-1">FAX</div>
          <div class="my-auto">{{ getOffice.fax_number }}</div>
        </div>
      </v-col>
      <v-col cols="12">
        <v-btn
          x-large
          block
          depressed
          color="error"
          @click="goAppointmentsPage"
        >
          WEB予約する
        </v-btn>
      </v-col>
      <v-col cols="12">
        <div class="font-weight-black text-caption mb-0">
          <font color="#6D7570">営業日</font>
        </div>
      </v-col>
      <v-row no-gutters align="center" class="mt-3">
        <v-col>
          <v-card min-height="56" tile outlined class="reset-border-style mx-3">
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
    </v-row>
    <v-col class="mt-4 md-over-no holiday-detail">
      {{ getOffice.business_day_detail }}
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
  },
  data() {
    return {
      getOfficeId: this.officeId,
      getOffice: this.office,
      getStaffs: this.staffs,
      icon: {
        state: 'fa-regular fa-star',
        color: '#D9DEDE',
      },
      week: ['日', '月', '火', '水', '木', '金', '土'],
      binaryNumber: [64, 32, 16, 8, 4, 2, 1],
    }
  },
  computed: {
    holidayArray() {
      return this.conversionBinaryToHolidayArray(this.getOffice.flags)
    },
  },
  methods: {
    goAppointmentsPage() {
      if (!this.$auth.loggedIn) {
        return alert('ログインをする必要があります')
      } else {
        this.$router.push(`/offices/${this.getOfficeId}/appointments`)
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
  },
}
</script>
<style lang="scss" scoped>
.sticky {
  position: sticky;
  top: 40px;
}

.office-name {
  font-size: 28px;
  font-weight: bold;
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

@media screen and (max-width: 959px) {
  /* md以上で表示しない */
  .sm-under-no {
    display: none;
  }
}
</style>

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
      <v-col class="py-1" cols="12">
        <div class="holiday-pc">営業日</div>
      </v-col>
      <v-col>
        <div>
          <table>
            <tbody>
              <tr>
                <th>日</th>
                <th>月</th>
                <th>火</th>
                <th>水</th>
                <th>木</th>
                <th>金</th>
                <th>土</th>
              </tr>
              <tr>
                <td class="py-2">
                  <v-icon
                    v-if="getOffice.selected_flags.includes('sunday')"
                    class="d-flex"
                    >mdi-close</v-icon
                  >
                  <v-icon v-else class="d-flex" color="orange"
                    >mdi-circle-outline</v-icon
                  >
                </td>
                <td class="py-2">
                  <v-icon
                    v-if="getOffice.selected_flags.includes('monday')"
                    class="d-flex"
                    >mdi-close</v-icon
                  >
                  <v-icon v-else class="d-flex" color="orange"
                    >mdi-circle-outline</v-icon
                  >
                </td>
                <td class="py-2">
                  <v-icon
                    v-if="getOffice.selected_flags.includes('tuesday')"
                    class="d-flex"
                    >mdi-close</v-icon
                  >
                  <v-icon v-else class="d-flex" color="orange"
                    >mdi-circle-outline</v-icon
                  >
                </td>
                <td class="py-2">
                  <v-icon
                    v-if="getOffice.selected_flags.includes('wednesday')"
                    class="d-flex"
                    >mdi-close</v-icon
                  >
                  <v-icon v-else class="d-flex" color="orange"
                    >mdi-circle-outline</v-icon
                  >
                </td>
                <td class="py-2">
                  <v-icon
                    v-if="getOffice.selected_flags.includes('thursday')"
                    class="d-flex"
                    >mdi-close</v-icon
                  >
                  <v-icon v-else class="d-flex" color="orange"
                    >mdi-circle-outline</v-icon
                  >
                </td>
                <td class="py-2">
                  <v-icon
                    v-if="getOffice.selected_flags.includes('friday')"
                    class="d-flex"
                    >mdi-close</v-icon
                  >
                  <v-icon v-else class="d-flex" color="orange"
                    >mdi-circle-outline</v-icon
                  >
                </td>
                <td class="py-2">
                  <v-icon
                    v-if="getOffice.selected_flags.includes('saturday')"
                    class="d-flex"
                    >mdi-close</v-icon
                  >
                  <v-icon v-else class="d-flex" color="orange"
                    >mdi-circle-outline</v-icon
                  >
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="mt-4 mb-4 holiday-detail">
          {{ getOffice.business_day_detail }}
        </div>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
export default {
  props: {
    officeId: {
      type: String,
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
    }
  },
  methods: {
    goAppointmentsPage() {
      if (!this.$auth.loggedIn) {
        return alert('ログインをする必要があります')
      } else {
        this.$router.push(`/offices/${this.getOfficeId}/appointments`)
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

.holiday-pc {
  font-size: 13px;
}

.holiday-detail {
  font-size: 11px;
  color: #707f89;
}

table {
  width: 100%;
  border-top: 1px solid #e0e0e0;
  border-left: 1px solid #e0e0e0;
  word-break: break-word;
  border-spacing: 0;
}

th {
  background: #f5f5f5;
  border-right: 1px solid #e0e0e0;
  border-bottom: 1px solid #e0e0e0;
  box-shadow: 1px 1px 0 0 #fff inset, -1px -1px 0 0 #fff inset;
  padding: 4px 12px;
  white-space: nowrap;
  font-weight: bold;
}

td {
  border-right: 1px solid #e0e0e0;
  border-bottom: 1px solid #e0e0e0;
  box-shadow: 1px 1px 0 0 #fff inset, -1px -1px 0 0 #fff inset;
}

@media screen and (max-width: 959px) {
  /* md以上で表示しない */
  .sm-under-no {
    display: none;
  }
}
</style>

<template>
  <v-card
    outlined
    tile
    min-height="418"
    :min-width="toggleClassByRoute"
    class="cursor-pointer"
    @click.native="moveShow()"
  >
    <v-container>
      <v-chip
        class="text-caption px-1 font-weight-bold"
        color="#F0636433"
        label
        small
      >
        <font color="#F06364">web予約可</font>
      </v-chip>
      <v-card-title class="py-2 px-0 d-flex flex-nowrap">
        <h5 class="set-max-layout">{{ office.name }}</h5>
        <office-bookmark-btn
          :bookmark="office.bookmark"
          :office-id="office.id"
          @grandChild-event-submit-bookmark="submitBookmark"
          @grandChild-event-destroy-bookmark="destroyBookmark"
        />
      </v-card-title>
      <div class="d-flex">
        <v-img
          :src="displayImg"
          tile
          outlined
          max-height="90"
          min-height="90"
          max-width="120"
          min-width="120"
          class="reset-border-style"
        >
        </v-img>
        <v-list dense class="pt-0">
          <v-list-item
            v-for="(item, i) in listItems"
            :key="i"
            class="min-height-20"
          >
            <v-icon
              small
              class="mr-2 mt-n1"
              color="grey lighten-1"
              v-text="item.icon"
            ></v-icon>
            <v-list-item-title
              class="text-caption"
              v-text="item.title"
            ></v-list-item-title>
          </v-list-item>
        </v-list>
      </div>
      <v-card-text class="px-0 text-caption min-line-height py-3">
        <div class="height-64 overflow-hidden">
          <font color="#6D7570">{{ displayDetail }}</font>
        </div>
      </v-card-text>
      <v-card min-height="61" tile outlined color="rgba(169, 240, 209, 16%)">
        <v-row no-gutters>
          <v-col cols="1" class="text-center">
            <v-icon color="#AEB5B2">mdi-account</v-icon>
          </v-col>
          <v-col cols="11">
            <v-card-title class="pa-0">
              <p class="text-caption font-weight-black mb-0">
                ユーザーからのお礼のコメント
              </p>
            </v-card-title>
            <v-card-text class="pa-0 text-caption min-line-height">
              <p class="mb-0">{{ displayComments }}</p>
            </v-card-text>
          </v-col>
        </v-row>
      </v-card>
      <v-row no-gutters align="center" class="mt-3">
        <v-col cols="2">
          <p class="font-weight-black text-caption mb-0 text-center">
            <font color="#6D7570">営業日</font>
          </p>
        </v-col>
        <v-col cols="10">
          <v-card min-height="56" tile outlined class="reset-border-style">
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
    </v-container>
  </v-card>
</template>
<script>
export default {
  layout: 'application',
  props: {
    office: {
      type: Object,
      default() {
        return { message: 'からです。' }
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
    toggleClassByRoute() {
      // localhost:8000以降のパスを取得する
      return this.$route.path.includes('/bookmarks') ||
        this.$route.path.includes('/histories')
        ? ''
        : 355
    },
    displayImg() {
      return this.office.image.length > 0
        ? this.office.image
        : require('~/assets/images/no-image.png')
    },
    displayDetail() {
      return this.office.detail.detail === undefined
        ? this.office.detail.message
        : this.office.detail.detail
    },
    displayComments() {
      return this.office.thank.comments === undefined
        ? this.office.thank.message
        : this.office.thank.comments
    },
    listItems() {
      return [
        {
          name: '住所情報',
          icon: 'mdi-map-marker',
          title: '〇〇駅から何分',
        },
        {
          name: 'スタッフ情報',
          icon: 'mdi-account',
          title: `スタッフ数${this.office.staffCount}人`,
        },
        {
          name: '電話番号',
          icon: 'mdi-phone',
          title: this.office.phone_number,
        },
      ]
    },
    holidayArray() {
      return this.conversionBinaryToHolidayArray(this.office.flags)
    },
  },
  methods: {
    moveShow() {
      this.$router.push({ path: `/offices/${this.office.id}` })
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
    async submitBookmark(officeId) {
      try {
        await this.$axios.$post(`offices/${officeId}/bookmarks`, {
          office_id: officeId,
        })
        this.switchCallMethodByRoute()
      } catch (error) {
        return error
      }
    },
    async destroyBookmark(officeId, bookmarkId) {
      try {
        await this.$axios.$delete(
          `offices/${officeId}/bookmarks/${bookmarkId}`,
          {
            office_id: officeId,
          }
        )
        this.switchCallMethodByRoute()
      } catch (error) {
        return error
      }
    },
    switchCallMethodByRoute() {
      if (this.$route.path.includes('/bookmarks')) {
        this.$emit('child-event-refresh')
      } else {
        this.$nuxt.refresh()
      }
    },
  },
}
</script>
<style scoped>
.set-max-layout {
  max-height: 50px;
  line-height: normal;
}

.min-height-20 {
  min-height: 20px;
}

.min-line-height {
  line-height: 1.1;
}

.height-64 {
  height: 64px;
}

/* stylelint-disable */
.reset-border-style.v-card.v-sheet.v-sheet--outlined.theme--light.rounded-0 {
  border: 0px;
}

.cursor-pointer.v-card.v-sheet.v-sheet--outlined.theme--light.rounded-0 {
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

.cursor-pointer {
  cursor: pointer;
}
</style>

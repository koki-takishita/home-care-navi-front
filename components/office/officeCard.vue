<template>
  <v-card outlined tile min-height="418" min-width="355">
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
        <v-avatar
          color="#F5F7F7"
          class="ml-auto"
          @mouseover="hoverActive()"
          @mouseleave="hoverRelease()"
          @click="toggleBookmark()"
        >
          <v-icon :color="icon.color">{{ icon.state }}</v-icon>
        </v-avatar>
      </v-card-title>
      <div class="d-flex">
        <v-card
          tile
          outlined
          max-height="90"
          min-height="90"
          max-width="120"
          min-width="120"
          class="reset-border-style"
          >写真が入る</v-card
        >
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
  props: ['office'],
  data() {
    return {
      icon: {
        state: 'fa-regular fa-star',
        color: '#D9DEDE',
      },
      listItems: [
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
      ],
      week: ['日', '月', '火', '水', '木', '金', '土'],
      binaryNumber: [64, 32, 16, 8, 4, 2, 1],
      holidayArray: [],
    }
  },
  computed: {
    displayDetail() {
      return this.office.detail.detail === undefined
        ? this.office.detail.message
        : this.office.detail.detail
    },
    displayComments() {
      return this.office.thank.comments === undefined
        ? this.office.detail.message
        : this.office.thank.comments
    },
  },
  mounted() {
    this.listItems[0].text = this.office.name
    this.conversionBinaryToholidayArray(this.office.flags)
  },
  methods: {
    hoverActive() {
      this.icon.color = '#F09C3C'
    },
    hoverRelease() {
      // お気に入り済みなら、なにもしない
      this.icon.color = '#D9DEDE'
    },
    toggleBookmark() {
      // お気に入り済みなら、解除処理
      // お気に入りしてないなら、登録処理
      if (this.$auth.loggedIn) {
        alert('お気に入り機能はまだ実装されていません。')
      } else {
        alert('お気に入り機能はログインしたら利用できます。')
      }
    },
    conversionBinaryToholidayArray(holiday) {
      this.binaryNumber.forEach((n) => {
        if (holiday >= n) {
          holiday = holiday - n
          this.holidayArray.push(1)
        } else {
          this.holidayArray.push(0)
        }
      })
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
</style>

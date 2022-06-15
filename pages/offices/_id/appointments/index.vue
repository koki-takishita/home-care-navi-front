<template>
  <div>
    <p class="mb-0 text-left link-width mx-auto">
      <NuxtLink
        to="."
        class="text-overline text-decoration-none link-color sm-under-no"
        >＜ {{ office.name }}にもどる</NuxtLink
      >
    </p>
    <v-card class="mx-auto mb-2 p-0" width="750">
      <v-col cols="12"><h3>WEB予約</h3></v-col>
      <v-col cols="12" class="pb-1">
        <label class="font-color-gray font-weight-black text-caption"
          >事業所名</label
        >
        <div class="mt-2">{{ office.name }}</div>
      </v-col>
      <v-form v-model="valid">
        <v-col cols="12">
          <label class="font-color-gray font-weight-black text-caption"
            >面談希望日時</label
          >
        </v-col>
        <div v-show="isShow" class="ml-3 error-text">
          明日以降の日付を選択してください
        </div>
        <v-row>
          <v-col cols="5" class="ml-3">
            <v-menu
              ref="menu"
              v-model="menu"
              :close-on-content-click="false"
              :return-value.sync="meet_date"
              transition="scale-transition"
              offset-y
              min-width="auto"
            >
              <template #activator="{ on, attrs }">
                <v-text-field
                  v-model="meet_date"
                  :rules="[formValidates.required, formValidates.dateCheck]"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="meet_date"
                locale="jp-ja"
                :day-format="(meet_date) => new Date(meet_date).getDate()"
                no-title
                scrollable
              >
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="menu = false">
                  Cancel
                </v-btn>
                <v-btn text color="primary" @click="$refs.menu.save(meet_date)">
                  OK
                </v-btn>
              </v-date-picker>
            </v-menu>
          </v-col>
          <v-col cols="6">
            <label class="font-color-gray font-weight-black text-caption">
              <v-select
                v-model="meet_time"
                :items="timeItems"
                :rules="[formValidates.required]"
                class="mt-2 font-weight-regular"
                outlined
              ></v-select>
            </label>
          </v-col>
        </v-row>
        <v-col cols="12" class="pt-0 pb-0">
          <label class="font-color-gray font-weight-black text-caption"
            >利用者のお名前
            <v-text-field
              v-model="name"
              class="mt-2 font-weight-regular"
              :rules="[formValidates.required, formValidates.nameCountCheck]"
              placeholder="田中 太郎"
              outlined
              dense
              height="44"
          /></label>
        </v-col>
        <v-col cols="5" class="pt-0 pb-0">
          <label class="font-color-gray font-weight-black text-caption"
            >利用者の年齢
            <v-select
              v-model="age"
              :items="ageItems"
              :rules="[formValidates.required]"
              class="mt-2 font-weight-regular"
              outlined
            ></v-select>
          </label>
        </v-col>
        <v-col cols="12" class="pt-0">
          <label class="font-color-gray font-weight-black text-caption"
            >連絡先電話番号
            <v-text-field
              v-model="phone_number"
              :rules="[formValidates.required, formValidates.phoneNumber]"
              class="mt-2 font-weight-regular"
              placeholder="080-1234-5678"
              outlined
              dense
              height="44"
          /></label>
          <label class="font-color-gray font-weight-black text-caption"
            >お困りごと
            <v-textarea
              v-model="comment"
              :rules="[formValidates.required]"
              class="mt-2 font-weight-regular"
              height="150"
              outlined
              dense
            >
            </v-textarea
          ></label>
        </v-col>
      </v-form>
      <v-col cols="12" class="pt-0">
        <v-btn
          :disabled="!valid"
          x-large
          block
          depressed
          color="error"
          @click="sendConfirmPage"
        >
          確認へ進む
        </v-btn>
      </v-col>
    </v-card>
  </div>
</template>

<script>
export default {
  layout: 'application',
  middleware: 'authentication',
  data() {
    return {
      formValidates: {
        required: (value) => !!value || '必須項目です',
        dateCheck: () => {
          // 現在日時(形式:: Tue Jun 14 2022 22:03:16 GMT+0900 (日本標準時))
          this.today = new Date()
          this.currentYear = this.today.getFullYear()
          this.currentMonth = `0${this.today.getMonth() + 1}`.slice(-2)
          this.currentDay = this.today.getDate()
          // todayから年月日を取得したものを組み合わせる(20220101)
          this.todaySum = this.currentYear + this.currentMonth + this.currentDay
          // カレンダーから取得した値を、年月日を個別に取得する(2022-01-01)
          this.yearSlice = `${this.meet_date.slice(0, 4)}`
          this.monthSlice = `${this.meet_date.slice(5, 7)}`
          this.daySlice = `${this.meet_date.slice(8, 10)}`
          // meet_dateをハイフン抜きにしたものを組み合わせる(2022-01-01から20220101)
          this.dateSliceSum = this.yearSlice + this.monthSlice + this.daySlice
          // 選択された日付が今日以前の日付なら、バリデーションかける
          if (Number(this.dateSliceSum) - Number(this.todaySum) < 1) {
            this.isShow = true
            return false
            // 選択された日付が明日以降の日付なら、バリデーション突破
          } else {
            this.isShow = false
            return true
          }
        },
        nameCountCheck: (value) =>
          value.length <= 31 || '30文字以下で入力してください',
        phoneNumber: (value) => {
          const format = /^\d{2,4}-\d{2,4}-\d{4}$/g
          return format.test(value) || '正しい電話番号ではありません'
        },
      },
      // 入力フォームに関するもの
      office_id: this.$route.params.id,
      name: '',
      meet_date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
      meet_time: '',
      age: '',
      phone_number: '',
      comment: '',
      called_status: 0,
      valid: false,
      isShow: false,
      menu: false,
      // 計算や値の取得に使用する
      startTime: -2,
      endTime: 0,
      currentYear: 0,
      currentMonth: 0,
      currentDay: 0,
      currentTime: new Date().getTime(),
      today: 0,
      todaySum: 0,
      yearSlice: '',
      monthSlice: '',
      dateSliceSum: '',
      daySlice: '',
      office: [],
      timeItems: [],
      ageItems: [],
    }
  },
  mounted() {
    this.addItems()
    this.getOffice()
    // もし、ローカルストレージに保存した値が有効期限を過ぎていたら、すべて削除
    if (
      Math.floor(this.currentTime / 1000) >=
      parseInt(localStorage.getItem('appointments.expiry'))
    ) {
      localStorage.removeItem('appointments.meet_date')
      localStorage.removeItem('appointments.meet_time')
      localStorage.removeItem('appointments.name')
      localStorage.removeItem('appointments.age')
      localStorage.removeItem('appointments.phone_number')
      localStorage.removeItem('appointments.comment')
      localStorage.removeItem('appointments.expiry')
    }
    const meetDate = localStorage.getItem('appointments.meet_date')
    const meetTime = localStorage.getItem('appointments.meet_time')
    const name = localStorage.getItem('appointments.name')
    const age = localStorage.getItem('appointments.age')
    const phoneNumber = localStorage.getItem('appointments.phone_number')
    const comment = localStorage.getItem('appointments.comment')
    if (
      meetDate != null &&
      meetTime != null &&
      name != null &&
      age != null &&
      phoneNumber != null &&
      comment != null
    ) {
      this.meet_date = localStorage.getItem('appointments.meet_date')
      this.meet_time = localStorage.getItem('appointments.meet_time')
      this.name = localStorage.getItem('appointments.name')
      this.age = localStorage.getItem('appointments.age')
      this.phone_number = localStorage.getItem('appointments.phone_number')
      this.comment = localStorage.getItem('appointments.comment')
    }
  },
  methods: {
    addItems() {
      // 年齢のリストを配列にプッシュする
      for (let i = 60; i <= 120; i++) {
        this.ageItems.push(`${i}歳`)
      }
      // 面談希望時間を配列にプッシュする
      for (let i = 0; i <= 11; i++) {
        this.startTime += 2
        this.endTime += 2
        this.timeItems.push(`${this.startTime}:00〜${this.endTime}:00`)
      }
    },
    async getOffice() {
      try {
        const response = await this.$axios.$get(`offices/${this.office_id}`)
        this.office = response
      } catch (error) {
        return error
      }
    },
    sendConfirmPage() {
      this.currentTime = new Date().getTime()
      // 現在のUNIX時間から、有効期限を設定する(UNIX時間は単位が秒なので、秒数を足す)
      // https://keisan.casio.jp/exec/system/1526004418
      const expiry = Math.floor(this.currentTime / 1000) + 180
      localStorage.setItem('appointments.meet_date', this.meet_date)
      localStorage.setItem('appointments.meet_time', this.meet_time)
      localStorage.setItem('appointments.name', this.name)
      localStorage.setItem('appointments.age', this.age)
      localStorage.setItem('appointments.phone_number', this.phone_number)
      localStorage.setItem('appointments.comment', this.comment)
      localStorage.setItem('appointments.expiry', expiry)

      this.$router.push(`/offices/${this.office_id}/appointments/confirm`)
    },
  },
}
</script>
<style scoped>
.link-color {
  color: #ee7b1a;
}

.font-color-gray {
  color: #6d7570;
}

.link-width {
  width: 750px;
}

.error-text {
  color: #fc5454;
  font-size: 13px;
}

@media screen and (max-width: 959px) {
  /* sm以下で表示しない */
  .sm-under-no {
    display: none;
  }
}
</style>

<template>
  <v-container class="pt-10">
    <v-row>
      <v-col cols="12" sm="12" md="6">
        <v-card outlined tile height="338">
          <v-img :src="office.images[active]" height="338">
            <v-row>
              <v-col cols="6">
                <v-btn
                  class="prev ml-3"
                  fab
                  depressed
                  color="#0000004F"
                  small
                  @click="prev"
                >
                  <v-icon color="white" x-large>mdi-chevron-left</v-icon>
                </v-btn>
              </v-col>
              <v-col cols="6">
                <div class="text-right">
                  <v-btn
                    class="next mr-3"
                    fab
                    depressed
                    color="#0000004F"
                    small
                    @click="next"
                  >
                    <v-icon color="white" x-large>mdi-chevron-right</v-icon>
                  </v-btn>
                </div>
              </v-col>
            </v-row>
          </v-img>
        </v-card>
        <v-card class="sm-under-no" outlined tile height="85">
          <div class="thumbnails">
            <li
              v-for="index in office.images.length"
              :key="index"
              :class="{ current: active === index - 1 }"
              class="mx-1"
              @click="current(index)"
            >
              <v-img
                :src="office.images[index - 1]"
                height="50"
                width="70"
              ></v-img>
            </li>
          </div>
        </v-card>
        <v-card class="md-over-no" outlined tile>
          <v-row class="mx-auto mt-auto max-width">
            <v-col class="office-name" cols="10">{{ office.name }}</v-col>
            <v-col cols="2">
              <v-btn fab depressed small>
                <v-icon color="white">mdi-star</v-icon>
              </v-btn>
            </v-col>
          </v-row>
          <v-col cols="12">
            <div class="office-tel">
              〒{{ office.post_code }}
              <br />
              {{ office.address }}
            </div>
            <div class="mt-3 flex access-and-staff">
              <v-icon>mdi-map-marker</v-icon>
              <div class="my-auto">東京駅 徒歩5分</div>
              <v-icon>mdi-account</v-icon>
              <div class="my-auto">スタッフ数 人</div>
            </div>
          </v-col>
          <v-col class="pt-0" md="12" xs="6">
            <v-icon large>mdi-phone</v-icon>{{ office.phone_number }}
            <div class="flex">
              <div class="fax pr-1">FAX</div>
              <div class="my-auto">{{ office.fax_number }}</div>
            </div>
          </v-col>
          <v-col cols="12"
            ><v-btn x-large block depressed color="error">WEB予約する</v-btn>
          </v-col>
          <v-col>
            <v-row class="md-over-no">
              <v-col class="pr-0 my-auto" cols="2">
                <div class="holiday-sp">営業日</div>
              </v-col>
              <v-col class="pl-0" cols="10">
                <div></div>
              </v-col>
            </v-row>
            <div class="mt-4 md-over-no holiday-detail">
              {{ office.business_day_detail }}
            </div>
          </v-col>
        </v-card>
        <v-card class="mt-6" outlined tile height="491">
          <v-col class="office-title" cols="12">{{ office.title }} </v-col>
          <v-col class="title_detail" cols="12"
            >{{ office.title_detail }}
          </v-col>
        </v-card>
        <v-card class="mt-6" outlined tile height="599">
          <v-card-title> スタッフ紹介 </v-card-title>
        </v-card>
        <v-card class="mt-6 mb-10" outlined tile height="513">
          <v-card-title> 施設概要 </v-card-title>
        </v-card>
      </v-col>
      <v-col cols="12" sm="12" md="6">
        <v-card class="sm-under-no sticky" outlined tile>
          <v-row class="mx-auto mt-auto max-width">
            <v-col class="office-name" cols="10">{{ office.name }} </v-col>
            <v-col class="pl-0" ols="2">
              <v-btn fab depressed>
                <v-icon large color="white">mdi-star</v-icon>
              </v-btn>
            </v-col>
            <v-col cols="12">
              <div class="office-tel">
                〒{{ office.post_code }}
                <br />
                {{ office.address }}
              </div>
              <div class="mt-3 flex access-and-staff">
                <v-icon>mdi-map-marker</v-icon>
                <div class="my-auto">東京駅 徒歩5分</div>
                <v-icon>mdi-account</v-icon>
                <div class="my-auto">スタッフ数 人</div>
              </div>
            </v-col>
            <v-col class="pt-0" md="12" xs="6">
              <div>
                <v-icon large>mdi-phone</v-icon>{{ office.phone_number }}
              </div>
              <div class="flex">
                <div class="fax pr-1">FAX</div>
                <div class="my-auto">{{ office.fax_number }}</div>
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
              <div></div>
              <div class="mt-4 mb-4 holiday-detail">
                {{ office.business_day_detail }}
              </div>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  layout: 'application',
  data() {
    return {
      office_id: this.$route.params.id,
      active: 0, // 事業所画像が現在何番目か
      office: {
        selected_flags: '',
        images: [],
      },
    }
  },
  mounted() {
    this.getOffice()
  },
  methods: {
    async getOffice() {
      try {
        const response = await this.$axios.$get(`offices/${this.office_id}`)
        this.office = response
      } catch (error) {
        return error
      }
    },
    // サムネイルをクリックしたらその番号にする
    // indexは1から始まるので、-1として配列の番号と合わせる
    current(index) {
      this.active = index - 1
    },
    // 左矢印（前へ）
    prev() {
      // activeが0以下なら一番最後の画像へもどる
      if (this.active <= 0) {
        this.active = this.office.images.length - 1
      } else {
        this.active--
      }
    },
    // 右矢印（次へ）
    next() {
      // 配列の数が0~5つで6つになるので、-1とする
      // 5番目のときにnextしたら0番目に戻る
      if (this.active >= this.office.images.length - 1) {
        this.active = 0
      } else {
        this.active++
      }
    },
    goAppointmentsPage() {
      if (!this.$auth.loggedIn) {
        return alert('ログインをする必要があります')
      } else {
        this.$router.push(`/offices/${this.office_id}/appointments`)
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

.flex {
  display: flex;
}

.office-tel {
  font-size: 13px;
  color: #707f89;
}

.title_detail {
  font-size: 14px;
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

.holiday-sp {
  text-align: center;
  font-size: 13px;
}

.holiday-pc {
  font-size: 13px;
}

.holiday-detail {
  font-size: 11px;
  color: #707f89;
}

.office-title {
  font-size: 20px;
  font-weight: bold;
}

@media screen and (max-width: 959px) {
  /* sm以下で表示しない */
  .sm-under-no {
    display: none;
  }
  .office-name {
    font-size: 20px;
    font-weight: bold;
  }
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

.thumbnails {
  display: flex;
  justify-content: center;
  list-style: none;
  margin-top: 16px;
  margin-bottom: 16px;
  & li {
    cursor: pointer;
    &.current {
      border: solid;
      border-color: #f8615e;
    }
  }
}

.prev {
  margin-top: 150px;
}

.next {
  margin-top: 150px;
}

.active {
  &-enter {
    opacity: 0;
    &-to {
      opacity: 1;
    }
    &-active {
      transition: opacity 0.5s;
    }
  }
  &-leave {
    opacity: 1;
    &-to {
      opacity: 0;
    }
    &-active {
      transition: opacity 0.5s;
    }
  }
}
</style>

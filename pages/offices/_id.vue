<template>
  <v-container class="pt-10">
    <v-row>
      <v-col cols="12" sm="12" md="6">
        <v-card outlined tile height="338">
          <v-card-title>画像大</v-card-title>
        </v-card>
        <v-card class="sm-under-no" outlined tile height="85">
          <v-card-title>事業所画像（小５枚）</v-card-title>
        </v-card>
        <v-card class="md-over-no" outlined tile>
          <v-row class="mx-auto mt-auto max-width">
            <v-col class="office-name" cols="10">{{ office.name }}</v-col>
            <v-col cols="2">
              <v-btn class="" fab depressed>
                <v-icon>mdi-star</v-icon>
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
              <div class="my-auto">スタッフ数 5人</div>
            </div>
          </v-col>
          <v-col class="pt-0" md="12" xs="6">
            <div><v-icon large>mdi-phone</v-icon>{{ office.phone_number }}</div>
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
                <div>
                  <table>
                    <table>
                      <tbody>
                        <template v-for="n in 1">
                          <tr v-if="n % 10 === 1" :key="n">
                            <th>日</th>
                            <th>月</th>
                            <th>火</th>
                            <th>水</th>
                            <th>木</th>
                            <th>金</th>
                            <th>土</th>
                          </tr>
                          <tr
                            :key="n"
                            :class="{ even: n % 2 === 0, odd: n % 2 === 1 }"
                          >
                            <td>{{ n }}</td>
                            <td>{{ n }}</td>
                            <td>{{ n }}</td>
                            <td>{{ n }}</td>
                            <td>{{ n }}</td>
                            <td>{{ n }}</td>
                            <td>{{ n }}</td>
                          </tr>
                        </template>
                      </tbody>
                    </table>
                  </table>
                </div>
              </v-col>
            </v-row>
            <div class="mt-4 md-over-no holiday-detail">
              営業日の説明が入ります
            </div>
          </v-col>
        </v-card>
        <v-card class="mt-6" outlined tile height="491">
          <v-card-title>事業所タイトル</v-card-title>
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
            <v-col cols="2">
              <v-btn class="" fab depressed>
                <v-icon>mdi-star</v-icon>
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
                <div class="my-auto">スタッフ数 5人</div>
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
              <v-btn x-large block depressed color="error"> WEB予約する </v-btn>
            </v-col>
            <v-col cols="12">
              <div class="holiday-pc">営業日</div>
            </v-col>
            <v-col>
              <div>
                <table>
                  <table>
                    <tbody>
                      <template v-for="n in 1">
                        <tr v-if="n % 10 === 1" :key="n">
                          <th>日</th>
                          <th>月</th>
                          <th>火</th>
                          <th>水</th>
                          <th>木</th>
                          <th>金</th>
                          <th>土</th>
                        </tr>
                        <tr
                          :key="n"
                          :class="{ even: n % 2 === 0, odd: n % 2 === 1 }"
                        >
                          <td>{{ n }}</td>
                          <td>{{ n }}</td>
                          <td>{{ n }}</td>
                          <td>{{ n }}</td>
                          <td>{{ n }}</td>
                          <td>{{ n }}</td>
                          <td>{{ n }}</td>
                        </tr>
                      </template>
                    </tbody>
                  </table>
                </table>
              </div>
              <div class="mt-4 mb-4 holiday-detail">営業日の説明が入ります</div>
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
  async asyncData({ $axios, params }) {
    let office = []
    const id = `${params.id}`
    await $axios.$get(`offices/${id}`).then((res) => (office = res))
    return { office }
  },

  data() {
    return {}
  },
}
</script>

<style scoped>
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
  padding: 4px 12px;
}

.even {
  background-color: #fafafa;
}

.flex {
  display: flex;
}

.height {
  max-height: none;
  min-height: min-content;
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
</style>

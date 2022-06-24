<template>
  <v-col cols="12" md="8" lg="7" xl="7" class="mx-auto">
    <h3 class="pb-3">予約履歴</h3>
    <v-col
      v-for="(office, index) in getAPI"
      :key="index"
      @click="moveShow(office.id)"
    >
      <v-row>
        <v-col
          v-for="(appointments, i) in office.appointments"
          :key="i"
          cols="12"
          md="6"
        >
          <v-card class="mx-auto">
            <v-col
              ><h3>{{ office.name }}</h3></v-col
            >
            <v-row>
              <v-avatar tile width="120" height="90" class="ml-6 mt-4 mb-8">
                <v-img
                  v-if="office.image_url !== null"
                  :src="office.image_url[0]"
                ></v-img>
                <v-img
                  v-else
                  src="https://home-care-navi-bucket.s3.ap-northeast-1.amazonaws.com/no_image.jpeg"
                ></v-img>
              </v-avatar>
              <v-col cols="6" class="pl-5 pr-0 access-and-staff">
                <v-row class="mt-1">
                  <v-icon small>mdi-map-marker</v-icon>
                  <div class="my-auto pl-1">東京駅 徒歩5分</div>
                </v-row>
                <v-row class="pt-1">
                  <v-icon small>mdi-account</v-icon>
                  <div class="my-auto pl-1">
                    スタッフ数 {{ office.staffs.length }}人
                  </div>
                </v-row>
                <v-row class="pt-1">
                  <v-icon small>mdi-phone</v-icon>
                  <div class="my-auto pl-1">{{ office.phone_number }}</div>
                </v-row>
              </v-col>
            </v-row>
            <v-divider class="mx-3"></v-divider>
            <v-col class="mt-2 font-color-gray text-caption"
              >予約した日時：{{ appointments.created_at | created_at }}</v-col
            >
            <v-col class="pb-0 font-color-gray font-weight-black text-caption"
              >面談希望日時</v-col
            >
            <v-col class="py-0"
              >{{ appointments.meet_date | meet_date }}
              {{ appointments.meet_time }}</v-col
            >
            <v-col class="text-center pt-4 pb-6 font-color-gray"
              >事業所からの連絡をお待ち下さい</v-col
            >
          </v-card>
        </v-col>
      </v-row>
    </v-col>
    <v-col v-show="isShow">予約履歴はありません</v-col>
  </v-col>
</template>
<script>
export default {
  layout: 'application',
  middleware: 'authentication',
  data() {
    return {
      getAPI: [],
      isShow: false,
    }
  },
  mounted() {
    this.getAppointments()
  },
  methods: {
    async getAppointments() {
      try {
        const response = await this.$axios.$get(`appointments`)
        this.getAPI = response
        if (this.getAPI.length === 0) {
          this.isShow = true
        } else {
          this.isShow = false
        }
      } catch (error) {
        return error
      }
    },
    moveShow(id) {
      this.$router.push({ path: `/offices/${id}` })
    },
  },
}
</script>
<style scoped>
.font-color-gray {
  color: #6d7570;
}

.access-and-staff {
  font-size: 12px;
}
</style>

<template>
  <v-col>
    <v-card class="mx-auto">
      <v-col
        ><h3>{{ getOffice.name }}</h3></v-col
      >
      <v-row>
        <v-avatar tile width="120" height="90" class="ml-6 mt-4 mb-8">
          <v-img :src="displayImg"></v-img>
        </v-avatar>
        <v-col cols="6" class="pl-5 pr-0 access-and-staff">
          <v-row class="mt-1">
            <v-icon small>mdi-map-marker</v-icon>
            <div class="my-auto pl-1">東京駅 徒歩5分</div>
          </v-row>
          <v-row class="pt-1">
            <v-icon small>mdi-account</v-icon>
            <div class="my-auto pl-1">
              スタッフ数 {{ getOffice.staff_count }}人
            </div>
          </v-row>
          <v-row class="pt-1">
            <v-icon small>mdi-phone</v-icon>
            <div class="my-auto pl-1">{{ getOffice.phone_number }}</div>
          </v-row>
        </v-col>
      </v-row>
      <v-divider class="mx-3"></v-divider>
      <v-col class="mt-2 font-color-gray text-caption"
        >予約した日時：{{ getAppointment.created_at | created_at }}</v-col
      >
      <v-col class="pb-0 font-color-gray font-weight-black text-caption"
        >面談希望日時</v-col
      >
      <v-col class="py-0"
        >{{ getAppointment.meet_date | meet_date }}
        {{ getAppointment.meet_time }}</v-col
      >
      <v-col class="text-center pt-4 pb-6 font-color-gray">
        <div v-if="getAppointment.called_status === 'need_call'">
          事業所からの連絡をお待ち下さい
        </div>
        <div v-else-if="getAppointment.called_status === 'called'">
          連絡済み
        </div>
        <div v-else>キャンセル済み</div>
      </v-col>
    </v-card>
  </v-col>
</template>

<script>
export default {
  props: {
    appointment: {
      type: Object,
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
  },
  computed: {
    getAppointment() {
      return this.appointment
    },
    getOffice() {
      return this.office
    },
    displayImg() {
      return this.getOffice.first_image_url !== null
        ? this.getOffice.first_image_url
        : require('~/assets/images/no-image.png')
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

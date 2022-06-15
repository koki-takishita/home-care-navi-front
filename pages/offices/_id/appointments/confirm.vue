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
      <v-col><h3>WEB予約</h3></v-col>
      <v-col class="pb-1">
        <label class="font-color-gray font-weight-black text-caption"
          >事業所名</label
        >
        <div class="mt-2">{{ office.name }}</div>
      </v-col>
      <v-col>
        <label class="font-color-gray font-weight-black text-caption"
          >面談希望日時</label
        ><br />
        <!-- eslint-disable-next -->
        <div class="d-flex mt-2">
          <div>{{ meet_date }}</div>
          <div class="ml-3">{{ meet_time }}</div>
        </div>
      </v-col>
      <v-col>
        <label class="font-color-gray font-weight-black text-caption"
          >利用者のお名前</label
        ><br />
        <div class="mt-2">{{ name }}</div>
      </v-col>
      <v-col class="">
        <label class="font-color-gray font-weight-black text-caption"
          >利用者の年齢</label
        ><br />
        <div class="mt-2">{{ age }}</div>
      </v-col>
      <v-col>
        <label class="font-color-gray font-weight-black text-caption"
          >連絡先電話番号</label
        ><br />
        <div class="mt-2">{{ phone_number }}</div>
      </v-col>
      <v-col>
        <label class="font-color-gray font-weight-black text-caption"
          >お困りごと</label
        ><br />
        <div class="mt-2">{{ comment }}</div>
      </v-col>
      <v-col>
        <v-btn x-large block depressed color="error">
          この内容で予約する
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
      office_id: this.$route.params.id,
      office: [],
      meet_date: '',
      meet_time: '',
      name: '',
      age: '',
      phone_number: '',
      comment: '',
    }
  },
  mounted() {
    const meetDate = localStorage.getItem('appointments.meet_date')
    const meetTime = localStorage.getItem('appointments.meet_time')
    const name = localStorage.getItem('appointments.name')
    const age = localStorage.getItem('appointments.age')
    const phoneNumber = localStorage.getItem('appointments.phone_number')
    const comment = localStorage.getItem('appointments.comment')
    this.getOffice()
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
    async getOffice() {
      try {
        const response = await this.$axios.$get(`offices/${this.office_id}`)
        this.office = response
      } catch (error) {
        return error
      }
    },
  },
}
</script>
<style scoped>
.link-color {
  color: #e44343;
}

.font-color-gray {
  color: #6d7570;
}

.link-width {
  width: 750px;
}

@media screen and (max-width: 959px) {
  /* sm以下で表示しない */
  .sm-under-no {
    display: none;
  }
}
</style>

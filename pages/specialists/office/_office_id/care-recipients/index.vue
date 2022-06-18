<template>
  <v-col cols="12" md="8" lg="7" xl="7" class="mx-auto">
    <h3>利用者情報管理</h3>
    <v-row class="mt-4">
      <v-col
        v-for="(care_recipient, index) in care_recipients"
        :key="index"
        cols="12"
        md="6"
      >
        <v-card class="mx-auto mb-4">
          <v-row>
            <v-avatar size="80" color="grey lighten-3" class="ml-5 mt-3 mr-0">
              <v-img
                v-if="care_recipient.image_url !== null"
                :src="care_recipient.image_url"
              ></v-img>
              <v-icon v-else size="60" color="white">mdi-account</v-icon>
            </v-avatar>
            <v-col cols="8" class="ml-0">
              <h3 class="name-limit">
                {{ care_recipient.name }}
              </h3>
              <div
                class="font-color-gray font-weight-black text-caption name-limit"
              >
                {{ care_recipient.kana }}
              </div>
              <div class="mt-2 font-color-gray introduction-limit">
                家族情報:{{ care_recipient.family }} <br />スタッフ名:{{
                  care_recipient.staff.name
                }}
              </div>
            </v-col>
          </v-row>
          <div class="mb-6">
            <br />スタッフ名:{{ care_recipient.staff.name }}
          </div>
          <v-row>
            <v-col cols="4" class="pl-6 pr-0">
              <v-btn
                block
                depressed
                outlined
                @click="deleteCareRecipients(care_recipient.id)"
                ><div class="delete-button">削除</div></v-btn
              >
            </v-col>
            <v-col cols="8" class="pr-6">
              <v-btn
                block
                depressed
                color="warning"
                :to="`cares/${care_recipient.id}/edit`"
                >編集する</v-btn
              >
              <v-col
                v-for="(staff, index) in staffs"
                :key="index"
                cols="12"
                md="6"
              >
                {{ staff.name }}
              </v-col>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
    <v-btn
      block
      depressed
      large
      color="white"
      class="mt-8 mb-10"
      to="care-recipients/new"
    >
      <div class="delete-button">
        <v-icon class="mb-1">mdi-plus</v-icon>
        利用者を追加する
      </div>
    </v-btn>
  </v-col>
</template>

<script>
export default {
  layout: 'application_specialists',
  middleware: 'authentication',
  data() {
    return {
      care_recipients: [],
      staffs: [],
      office_id: this.$route.params.office_id,
    }
  },
  mounted() {
    this.getCareRecipients()
    // this.getStaffs()
  },
  methods: {
    async getCareRecipients() {
      try {
        // this.$setId(this.office_id)
        const response = await this.$axios.$get(
          `specialists/offices/${this.office_id}/care_recipients`
        )
        this.care_recipients = response
      } catch (error) {
        return error
      }
    },
    //  async getStaffs() {
    //   try {
    //     const response = await this.$axios.$get(
    //       `specialists/offices/${this.office_id}/staffs`
    //     )
    //     this.staffs = response
    //   } catch (error) {
    //     return error
    //   }
    // },
    async deleteCareRecipients(id) {
      const isDeleted = '本当に削除してもよろしいですか？'
      if (window.confirm(isDeleted)) {
        try {
          await this.$axios.$delete(
            `specialists/offices/${this.office_id}/care_recipients/${id}`
          )
          window.location.reload()
        } catch (error) {
          return error
        }
      }
    },
  },
}
</script>
<style lang="scss" scoped>
.name-limit {
  /*  -webkit-boxを指定します */
  display: -webkit-box;
  /*  行数を指定します */
  -webkit-line-clamp: 1;
  /*  合わせてこの指定も必要です */
  -webkit-box-orient: vertical;
  /*  はみ出すものは隠します */
  overflow: hidden;
}

.introduction-limit {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.font-color-gray {
  color: #6d7570;
}

.delete-button {
  color: #ff9800;
}
</style>

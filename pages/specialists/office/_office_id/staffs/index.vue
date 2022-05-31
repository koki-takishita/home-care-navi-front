<template>
  <v-col cols="12" md="8" lg="7" xl="7" class="mx-auto">
    <h3>スタッフ情報</h3>
    <v-row class="mt-4">
      <v-col v-for="(staff, index) in staffs" :key="index" cols="12" md="6">
        <v-card class="mx-auto mb-4">
          <v-row>
            <v-avatar size="80" color="grey lighten-3" class="ml-5 mt-3 mr-0">
              <v-img
                v-if="staff.image_url !== null"
                :src="staff.image_url"
              ></v-img>
              <v-icon v-else size="60" color="white">mdi-account</v-icon>
            </v-avatar>
            <v-col cols="8" class="ml-0">
              <h3 class="name-limit">
                {{ staff.name }}
              </h3>
              <div
                class="font-color-gray font-weight-black text-caption name-limit"
              >
                {{ staff.kana }}
              </div>
              <div class="mt-2 font-color-gray introduction-limit">
                {{ staff.introduction }}
              </div>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="4" class="pl-6 pr-0">
              <v-btn block depressed outlined @click="deleteStaff(staff.id)"
                ><div class="delete-button">削除</div></v-btn
              >
            </v-col>
            <v-col cols="8" class="pr-6">
              <v-btn
                block
                depressed
                color="warning"
                :to="`staffs/${staff.id}/edit`"
                >編集する</v-btn
              >
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
      @click="goStaffNewPage"
    >
      <div class="delete-button">
        <v-icon class="mb-1">mdi-plus</v-icon>
        スタッフを追加する
      </div>
    </v-btn>
  </v-col>
</template>

<script>
export default {
  layout: 'application_specialists',
  data() {
    return {
      staffs: [],
      officeId: this.$route.params.office_id,
    }
  },
  async fetch() {
    this.staffs = await fetch(
      // home-care-navi-v2/api/specialists/offices/${this.officeId}/staffs
      `http://localhost:3000/api/specialists/offices/${this.officeId}/staffs`
    ).then((res) => res.json())
  },
  methods: {
    goStaffNewPage() {
      this.$store.commit('catchErrorMsg/setType', '')
      this.$store.commit('catchErrorMsg/clearMsg')
      this.$router.push('staffs/new')
    },
    async deleteStaff(id) {
      const isDeleted = '本当に削除してもよろしいですか？'
      if (window.confirm(isDeleted)) {
        try {
          await this.$axios.$delete(
            `specialists/offices/${this.officeId}/staffs/${id}`
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

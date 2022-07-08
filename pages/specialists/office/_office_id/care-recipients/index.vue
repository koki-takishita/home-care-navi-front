<template>
  <v-col cols="12" md="8" lg="7" xl="7" class="mx-auto">
    <h3>利用者情報管理</h3>
    <v-row class="mt-4">
      <v-col
        v-for="(care_recipient, index) in reverseItems"
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
                {{ care_recipient.name }}&nbsp;&nbsp;({{ care_recipient.age }})
              </h3>
              <div class="font-color-gray text-caption name-limit">
                {{ care_recipient.kana }}
              </div>
              <div class="font-color-gray text-caption name-limit mt-2">
                〒{{ care_recipient.post_code }}
              </div>
              <div class="font-color-gray text-caption name-limit">
                {{ care_recipient.address }}
              </div>
              <div class="font-color-gray text-caption name-limit mt-2 mb-2">
                家族情報&nbsp;:&nbsp;{{ care_recipient.family }}
              </div>
            </v-col>
          </v-row>
          <div
            class="font-color-gray font-weight-black text-caption name-limit ml-3 mb-2"
          >
            担当スタッフ&nbsp;:&nbsp;{{ care_recipient.staff.name }}
          </div>
          <v-row>
            <v-col cols="4" class="pl-6 pr-0">
              <v-btn
                block
                depressed
                outlined
                color="blue-grey lighten-4"
                @click="openModal(care_recipient.id)"
                ><div class="delete-button font-weight-bold">削除</div></v-btn
              >
            </v-col>
            <v-col cols="8" class="pr-6">
              <v-btn
                block
                depressed
                color="warning"
                :to="`care-recipients/${care_recipient.id}/edit`"
                class="font-weight-bold"
                >編集する</v-btn
              >
              <v-col v-for="(staff, i) in staffs" :key="i" cols="12" md="6">
                {{ staff.name }}
              </v-col>
            </v-col>
          </v-row>
        </v-card>
        <Modal v-if="modalFlag">
          <v-col class="mb-4">本当に削除してもよろしいですか？</v-col>
          <v-btn
            width="120"
            color="warning"
            depressed
            class="ml-2 mr-4"
            @click="closeModal"
            >キャンセル</v-btn
          >
          <v-btn
            id="delete"
            width="120"
            depressed
            outlined
            @click="deleteCareRecipients(currentCareRecipientId)"
            ><div class="delete-button">OK</div></v-btn
          >
        </Modal>
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
      <div class="delete-button font-weight-bold">
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
      office: [],
      office_id: this.$route.params.office_id,
      currentCareRecipientId: 0,
      modalFlag: false,
    }
  },
  computed: {
    // 配列の要素順番を逆順にする
    reverseItems() {
      return this.care_recipients.slice().reverse()
    },
  },
  mounted() {
    this.getCareRecipients()
    this.getOffice()
  },
  methods: {
    async getOffice() {
      try {
        const response = await this.$axios.$get(
          `specialists/offices/${this.office.id}`
        )
        if (response.id - this.office_id !== 0) {
          this.$router.push(
            `/specialists/office/${response.id}/care-recipients`
          )
        }
      } catch (error) {
        return error
      }
    },
    async getCareRecipients() {
      try {
        const response = await this.$axios.$get(
          `specialists/offices/${this.office_id}/care_recipients`
        )
        this.care_recipients = response
      } catch (error) {
        return error
      }
    },
    openModal(id) {
      this.currentCareRecipientId = id
      this.modalFlag = true
    },
    closeModal() {
      this.modalFlag = false
    },
    async deleteCareRecipients(id) {
      try {
        await this.$axios.$delete(
          `specialists/offices/${this.office_id}/care_recipients/${id}`
        )
        window.location.reload()
      } catch (error) {
        return error
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

.modal {
  &__overlay {
    background: rgba(0, 0, 0, 0.5);
  }
}
</style>

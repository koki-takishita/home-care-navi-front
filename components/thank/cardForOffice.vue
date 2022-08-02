<template>
  <v-card outlined class="thank-card px-2 pt-3 pb-4">
    <div class="thank-comment-wrapper">
      <div class="d-flex justify-space-between">
        <p class="mb-0 font-weight-black text-body-1">
          {{ ReadThank.name }}&nbsp;&nbsp;({{ ReadThank.age }})
        </p>
        <p>
          <font :color="gray">{{ updateDate | created_at }}</font>
        </p>
      </div>
      <div class="thank-comment mb-4">
        <p class="mb-0 text-caption font-color-gray">
          {{ ReadThank.comments }}
        </p>
      </div>
    </div>
    <v-dialog v-model="dialog" persistent max-width="300">
      <template #activator="{ on, attrs }">
        <v-btn
          block
          outlined
          height="40"
          :color="lightGray"
          v-bind="attrs"
          v-on="on"
          ><font class="font-weight-black" :color="yellow">削除</font>
        </v-btn>
      </template>
      <v-card class="pa-3 pt-10">
        <p class="text-center mb-8">本当に削除してもよろしいですか？</p>
        <v-row dense>
          <v-col cols="5" @click="dialog = false">
            <v-btn block outlined :color="lightGray"
              ><font class="font-weight-black" :color="yellow"
                >キャンセル</font
              ></v-btn
            >
          </v-col>
          <v-col cols="7">
            <v-btn block outlined class="warning" @click="deleteThank"
              ><font class="font-weight-black" color="white">OK</font></v-btn
            >
          </v-col>
        </v-row>
      </v-card>
    </v-dialog>
  </v-card>
</template>
<script>
export default {
  props: {
    thank: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      dialog: false,
    }
  },
  computed: {
    ReadThank() {
      return this.thank
    },
    updateDate() {
      return this.ReadThank.created_at
    },
    gray() {
      return '#6D7570'
    },
    yellow() {
      return '#F09C3C'
    },
    lightGray() {
      return '#D9DEDE'
    },
  },
  methods: {
    async deleteThank() {
      const id = this.ReadThank.id
      try {
        await this.$axios.$delete(`specialists/offices/thanks/${id}`)
        this.$emit('refresh')
      } catch (error) {
        // console.log(error)
        return error
      }
    },
  },
}
</script>
<style scoped>
.thank-comment {
  height: 80px;
}

.thank-card {
  border: 0;
}

.font-color-gray {
  color: #6d7570;
}
</style>

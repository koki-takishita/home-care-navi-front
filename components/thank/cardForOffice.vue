<template>
  <v-card outlined class="thank-card px-2 pt-3 pb-4">
    <div class="thank-comment-wrapper">
      <div class="d-flex justify-space-between">
        <p class="mb-0 font-weight-black text-body-2">{{ ReadStaff.name }}</p>
        <p>
          <font :color="gray">{{ updateDate | created_at }}</font>
        </p>
      </div>
      <div class="thank-comment mb-4">
        <p class="mb-0 text-caption">{{ ReadThank.comments }}</p>
      </div>
    </div>
    <v-btn block outlined height="40" :color="lightGray" @click="deleteThank"
      ><font class="font-weight-black" :color="yellow">削除</font></v-btn
    >
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
  computed: {
    ReadThank() {
      return this.thank
    },
    ReadStaff() {
      return this.ReadThank.staff
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
</style>

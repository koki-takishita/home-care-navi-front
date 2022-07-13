<template>
  <v-card id="staff-introduction" outlined>
    <v-row
      v-for="(staff, i) in ReadStaffs"
      :key="i"
      no-gutters
      justify="end"
      class="mb-4"
    >
      <v-col cols="3">
        <v-avatar size="80">
          <img :src="staff.image" />
        </v-avatar>
      </v-col>
      <v-col cols="9">
        <v-row no-gutters>
          <v-col cols="12" sm="3">
            <div class="">
              <v-card-title class="pa-0 font-weight-black text-subtitle-1">
                {{ staff.name }}
              </v-card-title>
              <div class="mt-n2">
                <font size="1" :color="grayColor">{{ staff.kana }}</font>
              </div>
            </div>
          </v-col>
          <v-col cols="12" sm="9">
            <v-card
              id="staff-introduction"
              class="set-line-height"
              outlined
              max-width="206"
            >
              <font size="2" :color="grayColor">{{ staff.introduction }} </font>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
      <v-col
        v-for="(comment, staff_i) in staff.thanks"
        :key="comment.id"
        cols="12"
        sm="9"
      >
        <StaffThankCard
          :thank="comment"
          :index-num="staff_i"
          :count="thanksCount(staff)"
          :is-open="isOpen"
          @thanksListOpen="setOpen"
        />
      </v-col>
    </v-row>
  </v-card>
</template>
<script>
export default {
  props: {
    staffs: {
      type: Array,
      default: null,
    },
  },
  data() {
    return {
      isOpen: false,
    }
  },
  computed: {
    ReadStaffs() {
      return this.staffs
    },
    grayColor() {
      return '#6D7570'
    },
  },
  methods: {
    setOpen(boolean) {
      this.isOpen = !boolean
    },
    thanksCount(obj) {
      return obj.thanks.length
    },
  },
}
</script>
<style scoped>
#staff-introduction {
  border: 0;
}

.set-line-height {
  line-height: normal;
}
</style>

<template>
  <v-card id="staff-introduction" outlined>
    <v-row no-gutters justify="end" class="mb-4">
      <v-col cols="3">
        <v-avatar size="80">
          <img :src="ReadStaff.image" />
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
                <font size="1" :color="grayColor">{{ ReadStaff.kana }}</font>
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
              <font size="2" :color="grayColor"
                >{{ ReadStaff.introduction }}
              </font>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
      <v-col v-for="(thank, i) in ReadThanks" :key="thank.id" cols="12" sm="9">
        <StaffThankCard
          :thank="thank"
          :index-num="i"
          :count="thanksCount(staff)"
          :is-open="isOpen"
          @thanksListOpen="setIsOpen"
        />
      </v-col>
    </v-row>
  </v-card>
</template>
<script>
export default {
  props: {
    staff: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      isOpen: false,
    }
  },
  computed: {
    ReadStaff() {
      return this.staff
    },
    ReadThanks() {
      return this.ReadStaff.thanks
    },
    grayColor() {
      return '#6D7570'
    },
  },
  methods: {
    setIsOpen(obj) {
      this.isOpen = !obj
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

<template>
  <v-card id="staff-introduction" outlined>
    <v-row no-gutters justify="end">
      <v-col cols="3">
        <v-avatar size="70">
          <img :src="imageUrl" />
        </v-avatar>
      </v-col>
      <v-col cols="9">
        <v-row no-gutters>
          <v-col cols="12" sm="4">
            <div>
              <v-card-title class="pa-0 font-weight-black text-subtitle-1">
                {{ staff.name }}
              </v-card-title>
              <div class="mt-n2">
                <font size="1" :color="grayColor">{{ ReadStaff.kana }}</font>
              </div>
            </div>
          </v-col>
          <v-col cols="12" sm="8">
            <v-card id="staff-introduction" class="set-line-height" outlined>
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
    imageUrl() {
      return this.ReadStaff.image || require('~/assets/images/account_icon.svg')
    },
    grayColor() {
      return '#6D7570'
    },
    setMargin() {
      if (this.$vuetify.breakpoint.smAndUp) {
        return 'mt-n6'
      } else {
        return ''
      }
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

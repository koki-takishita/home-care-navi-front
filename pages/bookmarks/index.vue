<template>
  <v-col cols="12" md="8" lg="7" xl="7" class="mx-auto">
    <h3>ブックマーク</h3>
    <p class="font-weight-black">{{ officeCount }}</p>
    <v-row class="mt-4">
      <v-col v-for="(office, index) in offices" :key="index" cols="12" md="6">
        <v-card class="mx-auto">
          <v-chip
            class="text-caption px-1 font-weight-bold"
            color="#F0636433"
            label
            small
          >
            <font color="#F06364">web予約可</font>
          </v-chip>
          <div>{{ office.name }}</div>
        </v-card>
      </v-col>
    </v-row>
  </v-col>
</template>

<script>
export default {
  layout: 'application',
  middleware: 'authentication',
  data() {
    return {
      offices: [],
    }
  },
  computed: {
    officeCount() {
      if (this.offices.length > 0) {
        return this.offices[0].count + '件'
      } else {
        return '読込中'
      }
    },
  },
  mounted() {
    this.getBookmarkedOffice()
  },
  methods: {
    async getBookmarkedOffice() {
      try {
        const res = await this.$axios.$get(`bookmarks`)
        this.offices = res
      } catch (error) {
        return error
      }
    },
  },
}
</script>

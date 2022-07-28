<template>
  <v-avatar
    color="#F5F7F7"
    class="ml-auto cursor-pointer"
    @mouseover="hoverActive"
    @mouseleave="hoverRelease"
    @click.stop="toggleBookmark"
  >
    <v-icon large :color="switchIconColor(icon.color)">{{ icon.state }}</v-icon>
  </v-avatar>
</template>

<script>
export default {
  props: {
    bookmark: {
      type: [Object, String],
      default() {
        return null
      },
    },
    officeId: {
      type: Number,
      default() {
        return 0
      },
    },
  },
  data() {
    return {
      icon: {
        state: 'mdi-star',
        color: '#D9DEDE',
      },
    }
  },
  computed: {
    getBookmark() {
      return this.bookmark
    },
    getOfficeId() {
      return this.officeId
    },
  },
  methods: {
    hoverActive() {
      if (this.getBookmark === null) {
        this.icon.color = '#F09C3C'
      } else {
        return true
      }
    },
    hoverRelease() {
      if (this.getBookmark === null) {
        this.icon.color = '#D9DEDE'
      } else {
        return true
      }
    },
    toggleBookmark() {
      if (this.$auth.loggedIn) {
        if (this.getBookmark === null) {
          // お気に入りしてないなら、登録処理
          this.$emit('grandChild-event-submit-bookmark', this.getOfficeId)
        } else {
          // お気に入り済みなら、解除処理
          this.$emit(
            'grandChild-event-destroy-bookmark',
            this.getOfficeId,
            this.getBookmark.id
          )
        }
      } else {
        alert('お気に入り機能はログインしたら利用できます。')
      }
    },
    switchIconColor(item) {
      if (this.getBookmark === null) {
        return item
      } else {
        const array = Object.entries(this.getBookmark).map(([key, value]) => ({
          key,
          value,
        }))
        if (array.length === 0) {
          return item
        }
        return '#F09C3C'
      }
    },
  },
}
</script>
<style scoped>
.cursor-pointer {
  cursor: pointer;
}
</style>

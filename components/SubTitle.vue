<template>
  <div v-if="displayControll()">
    <div class="d-none d-md-block">
      <v-card outlined max-width="990" min-height="245" class="mx-auto">
        <div class="text-center set-color font-weight-black mt-12">
          <p class="fs-28 mb-2">安心して介護をお願いしたいから。</p>
          <p class="text-caption mb-0">
            ホームケアナビは、ケアマネージャーの検索ができるサービスです。
          </p>
        </div>
        <div class="mt-6 max-width-720 mx-auto">
          <v-text-field
            v-model="keyword"
            placeholder="事業所名、市町村など"
            append-icon="mdi-magnify"
            outlined
            rounded
            @click:append="clickBtn(btnType.searchIcon)"
          ></v-text-field>
        </div>
      </v-card>
    </div>
    <div class="d-block d-md-none mt-3">
      <v-card outlined tile class="d-flex justify-center" min-height="90">
        <div class="my-auto set-color">
          <p class="ma-0 text-h6 font-weight-black">
            安心して介護をお願いしたいから。
          </p>
          <p class="ma-0 font-size-set">
            ホームケアナビは、ケアマネージャーの検索ができるサービスです。
          </p>
        </div>
        <v-icon large color="#F8BBD0"> mdi-cards-heart </v-icon>
      </v-card>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  props: {
    value: {
      type: String,
      default: 'デフォルトの値です。',
    },
  },
  data() {
    return {
      btnType: {
        searchIcon: 'KeywordsAndPostCodes',
      },
    }
  },
  computed: {
    ...mapGetters('areaData', ['getCount_area']),
    keyword: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit('input', value)
      },
    },
  },
  methods: {
    clickBtn(type) {
      this.$emit(`click${type}`)
    },
    displayControll() {
      if (this.$vuetify.breakpoint.mdAndUp) {
        return true
      } else if (this.$vuetify.breakpoint.smAndDown && this.getCount_area > 1) {
        return false
      }
      return true
    },
  },
}
</script>
<style scoped>
.fs-28 {
  font-size: 28px;
}

.max-width-720 {
  max-width: 720px;
}

.set-color {
  color: #6d7570;
}
/* stylelint-disable */
.v-text-field--outlined >>> fieldset {
  border-color: #d9dede;
}

::v-deep input::placeholder {
  color: #d9dede !important;
}

.font-size-set {
  font-size: 0.5em;
}
</style>

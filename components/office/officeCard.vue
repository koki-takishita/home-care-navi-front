<template>
  <v-card class="" outlined tile min-height="418" min-width="355">
    <v-container>
      <v-chip
        class="text-caption px-1 font-weight-bold"
        color="#F0636433"
        label
        small
      >
        <font color="#F06364">web予約可</font>
      </v-chip>
      <v-card-title class="py-2 px-0 d-flex flex-nowrap">
        <!--<h5 class="set-max-layout text-truncate">{{ office.name }}</h5>-->
        <h5 class="set-max-layout">{{ office.name }}</h5>
        <!--<v-avatar color="#F5F7F7">-->
        <v-avatar
          color="#F5F7F7"
          @mouseover="hoverActive()"
          @mouseleave="hoverRelease()"
          @click="toggleBookmark()"
          class="ml-auto"
        >
          <!--<v-icon>fa-star</v-icon>-->
          <v-icon :color="icon.color">{{ icon.state }}</v-icon>
        </v-avatar>
      </v-card-title>

      <div class="d-flex">
        <!-- 写真 -->
        <v-card max-height="90" min-height="90" max-width="120" min-width="120"
          >写真が入る</v-card
        >
        <!--<v-img min-height=90 max-width=120 light></v-img>-->
        <!-- 写真 -->

        <v-list dense class="pt-0">
          <v-list-item
            v-for="(item, i) in listItems"
            :key="i"
            class="min-height-20"
          >
            <v-icon
              small
              class="mr-2 mt-n1"
              color="grey lighten-1"
              v-text="item.icon"
            ></v-icon>
            <v-list-item-title
              class="text-caption"
              v-text="item.title"
            ></v-list-item-title>
          </v-list-item>
        </v-list>
      </div>

      <v-card-text class="px-0 text-caption min-line-height py-3">
        <!--  text-truncate  -->
        <div class="height-64 overflow-hidden">
          <font color="#6D7570">{{ office.details.text }}</font>
        </div>
      </v-card-text>

      <v-card min-height="61" tile outlined class="reset-border-style">
        <v-row no-gutters>
          <v-col cols="1" class="text-center">
            <v-icon color="#AEB5B2">mdi-account</v-icon>
          </v-col>
          <v-col cols="11">
            <v-card-title class="pa-0">
              <p class="text-caption font-weight-black mb-0">
                ユーザーからのお礼のコメント
              </p>
            </v-card-title>
            <v-card-text class="pa-0 text-caption min-line-height">
              <p class="mb-0">{{ office.thanks.text }}</p>
            </v-card-text>
          </v-col>
        </v-row>
      </v-card>

      <v-row no-gutters align="center" class="mt-3">
        <v-col cols="2">
          <p class="font-weight-black text-caption mb-0 text-center">
            <font color="#6D7570">営業日</font>
          </p>
        </v-col>
        <v-col cols="10">
          <v-card min-height="56"> 休日のコンポーネント作る </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>
<script>
export default {
  layout: 'application',
  props: ['office'],
  data() {
    return {
      icon: {
        state: 'fa-regular fa-star',
        color: '#D9DEDE',
      },
      // propsでofficeの電話番号・スタッフ数・電話番号を初期値としてセット
      listItems: [
        {
          name: '住所情報',
          icon: 'mdi-map-marker',
          title: this.office.address,
        },
        {
          name: 'スタッフ情報',
          icon: 'mdi-account',
          title: this.office.staffCount,
        },
        { name: '電話番号', icon: 'mdi-phone', title: this.office.phone },
      ],
    }
  },
  mounted() {
    this.listItems[0].text = this.office.name
  },
  methods: {
    hoverActive() {
      console.log('hoverActive発火')
      this.icon.color = '#F09C3C'
    },
    hoverRelease() {
      // お気に入り済みなら、なにもしない
      console.log('hoverRelease発火')
      this.icon.color = '#D9DEDE'
    },
    toggleBookmark() {
      // お気に入り済みなら、解除処理
      // お気に入りしてないなら、登録処理
      console.log('toggleBookmark発火')
    },
  },
}
</script>
<style scoped>
.set-max-layout {
  max-height: 50px;
  line-height: normal;
}

.min-height-20 {
  min-height: 20px;
}

.min-line-height {
  line-height: 1.1;
}

.height-64 {
  height: 64px;
}

/* stylelint-disable */
.reset-border-style.v-card.v-sheet.v-sheet--outlined.theme--light.rounded-0 {
  border: 0px;
  background-color: rgba(169, 240, 209, 0.16);
}
/* stylelint-enable */
</style>

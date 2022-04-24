<template>
  <v-card width="990" class="mt-8 mx-auto" tile outlined color="#F5F7F7">
    <div class="mb-4">
      <p class="ma-0 text-size-18 text-bold font-weight-black">
        エリアから探す
      </p>
    </div>

    <div class="d-flex">
      <AreaMenu />
      <!---->
      <v-card
        max-width="283"
        class="mx-auto"
        color="prefectures-menu mr-39 arrow-box border-color-gry"
        flat
      >
        <v-list dense>
          <v-list-item-group v-model="selectedItem" color="primary">
            <v-list-item v-for="(item, i) in items" :key="i">
              <v-list-item-content>
                <v-list-item-title v-text="item.text"></v-list-item-title>
              </v-list-item-content>
              <v-list-item-icon>
                <v-icon v-text="item.icon"></v-icon>
              </v-list-item-icon>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-card>
      <!---->
      <v-card
        width="268"
        height="324"
        flat
        class="cities-menu border-color-gry"
      >
      </v-card>
    </div>
  </v-card>
</template>
<script>
export default {
  name: 'AddressMenu',
  data() {
    return {
      selectedItem: 1,
      items: [
        { text: 'Real-Time', icon: 'mdi-chevron-right' },
        { text: 'Real-Time', icon: 'mdi-chevron-right' },
        { text: 'Real-Time', icon: 'mdi-chevron-right' },
      ],
    }
  },
}
</script>
<style scoped>
.mr-39 {
  margin-right: 39px;
}

.border-color-gry {
  border: 1px solid #d9dede;
}

.arrow-box {
  position: relative;
  background: #fff;
}

.arrow-box::after,
.arrow-box::before {
  left: 100%;
  top: 50%;
  border: solid transparent;
  content: '';
  height: 0;
  width: 0;
  position: absolute;
  pointer-events: none;
}

.arrow-box::after {
  border-color: rgba(255 255 255 / 0%);
  border-left-color: #fff;
  border-width: 15px;
  margin-top: -15px;
}

.arrow-box::before {
  border-color: rgba(217 222 222 / 0%);
  border-left-color: #d9dede;
  border-width: 16px;
  margin-top: -16px;
}
</style>

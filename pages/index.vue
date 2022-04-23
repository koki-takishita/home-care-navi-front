<template>
  <div>
    <v-card width="990" height="245" flat rounded="0" class="mx-auto">
      <div class="text-center">
        <h2 class="text-28 pt-12">安心して介護をお願いしたいから</h2>
        <p class="text-caption ma-0 mt-2">
          ホームケアナビは、ケアマネージャーの検索ができるサービスです。
        </p>
      </div>
      <v-card tile outlined color="#FFFFFF" width="720" class="mx-auto mt-7">
        <div>
          <v-text-field
            filled
            rounded
            dense
            append-icon="mdi-magnify"
            height="48"
            background-color="#FFFFFF"
            outlined
            placeholder="事業所名、市区町村など"
            class="mx-6"
          >
          </v-text-field>
        </div>
      </v-card>
    </v-card>
    <v-card width="990" class="mt-8 mx-auto" tile outlined color="#F5F7F7">
      <div class="mb-4">
        <p class="ma-0 text-size-18 text-bold font-weight-black">
          エリアから探す
        </p>
      </div>
      <div class="d-flex">
        <v-card
          width="375"
          color="area-menu mr-10 arrow-box border-color-gry"
          flat
        >
        </v-card>

        <v-card
          width="283"
          color="prefectures-menu mr-39 arrow-box border-color-gry"
          flat
        >
        </v-card>
        <v-card
          width="268"
          height="324"
          flat
          class="cities-menu border-color-gry"
        >
        </v-card>
      </div>
    </v-card>
  </div>
</template>
<script>
export default {
  layout: 'top',
}
</script>
<style scoped>
.text-28 {
  font-size: 28px;
}

.text-center p,
h2 {
  color: #6d7570;
}

.text-size {
  font-size: 18px;
}

.mr-39 {
  margin-right: 39px;
}

.v-text-field--outlined >>> fieldset {
  border-color: #d9dede;
}

.v-text-field--outlined >>> i {
  color: #d9dede;
  margin-top: 7px;
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

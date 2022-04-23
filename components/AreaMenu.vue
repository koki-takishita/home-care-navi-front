<template>
  <v-card color="area-menu mr-10 arrow-box border-color-gry" flat>
    <v-container class="pa-4 pb-0">
      <v-btn width="343" height="48" color="#F06364" depressed outlined>
        <div>
          <v-icon left>mdi-map-marker</v-icon>
        </div>
        <p class="ma-0 font-weight-black">現在地から探す</p>
      </v-btn>
    </v-container>
    <v-container class="pa-4 pt-3">
      <v-row v-for="k in 3" :key="k" class="ma-0">
        <v-col class="d-flex pa-0 justify-space-between select-item-wrapper">
          <v-card
            v-for="k in 3"
            :key="k"
            class="pa-0 select-item"
            width="109"
            height="72"
            outlined
            rounded
          ></v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>
<script>
export default {
  name: 'AreaMenu',
}
</script>
<style scoped>
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

.container {
  width: 375px;
}

.container .row:nth-child(1) .select-item-wrapper {
  margin-bottom: 8px;
}

.container .row:nth-child(2) .select-item-wrapper {
  margin-bottom: 8px;
}
</style>

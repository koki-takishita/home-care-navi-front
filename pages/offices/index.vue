<template>
  <v-container class="grey lighten-5 base-width my-4 px-0">
    <v-row no-gutters>
      <v-col cols="12" md="3">
        <!--コンポーネントにする エリア選択-->
        <v-card class="pa-2" outlined tile>test1</v-card>
        <v-card class="pa-2" outlined tile>test2</v-card>
        <!---->
      </v-col>
      <v-col cols="12" md="9">
        <!--
        <div class="d-flex justify-space-between flex-wrap">
          <v-card
            v-for = "(office, i) in offices"
            :key  = "i"
            outlined 
            tile
            min-height=418
            min-width=355
            class="mb-6"
          >{{ office }}
          </v-card>
        </div>

        <v-card
          class="pa-2"
          outlined
          tile>

        </v-card>
-->
        <v-container class="grey lighten-1">
          <div>
            <h3>検索結果</h3>
            <p>999件(仮)</p>
          </div>
          <v-row>
            <v-col v-for="(office, i) in offices" :key="i" cols="12" md="6">
              <v-card class="" outlined tile min-height="418" min-width="355"
                >{{ office }}
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  layout: 'application',
  data() {
    return {
      offices: [
        { id: 1, name: 'test1' },
        { id: 2, name: 'test2' },
        { id: 3, name: 'test3' },
        { id: 4, name: 'test4' },
        { id: 5, name: 'test5' },
        { id: 6, name: 'test6' },
        { id: 7, name: 'test7' },
        { id: 8, name: 'test8' },
        { id: 9, name: 'test9' },
        { id: 10, name: 'test10' },
      ],
      countOdd: 0,
      countEven: 0,
    }
  },
}
</script>
<style scoped>
.base-width {
  max-width: 990px;
}
</style>

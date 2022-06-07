<template>
  <v-container class="grey lighten-5 set-base-width">
    <v-row>
      <v-col cols="12" md="3">
        <!--コンポーネントにする エリア選択-->

        <v-card class="pa-2" outlined tile>test1</v-card>
        <v-card class="pa-2" outlined tile>test2</v-card>

        <!---->
      </v-col>
      <v-col cols="12" md="9">
        <div>
          <p>検索結果</p>
          <p>999件(仮)</p>
        </div>
        <!--
        <v-card
          class="pa-2"
          outlined
          tile>
-->
        <v-row no-gutters>
          <v-col v-for="(num, i) in 10" :key="num" cols="12" md="6">
            <!--コンポネントにする 事業所カード-->

            <v-card class="" outlined tile>{{ test(i) }} </v-card>

            <!---->
          </v-col>
        </v-row>
        <!--
        </v-card>

-->
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  layout: 'application',
  data() {
    return {
      offices: {
        odd: [
          { id: 1, name: 'test1' },
          { id: 3, name: 'test3' },
          { id: 5, name: 'test5' },
          { id: 7, name: 'test7' },
          { id: 9, name: 'test9' },
        ],
        even: [
          { id: 2, name: 'test2' },
          { id: 4, name: 'test4' },
          { id: 6, name: 'test6' },
          { id: 8, name: 'test8' },
          { id: 10, name: 'test10' },
        ],
      },
      countOdd: 0,
      countEven: 0,
    }
  },
  computed: {
    officeLength() {
      return Object.keys(this.offices).length
    },
  },
  methods: {
    even(n) {
      if (n % 2 === 0) {
        return true
      } else {
        return false
      }
    },
    test(index) {
      if (this.even(index)) {
        console.log(`発火偶数${index}`)
        return this.offices.even[index / 2]
      } else {
        console.log(`発火奇数${index}`)
        return this.offices.odd[(index - 1) / 2]
      }
    },
  },
}
</script>
<style scoped>
.set-base-width {
  max-width: 990px;
}
</style>

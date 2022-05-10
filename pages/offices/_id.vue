<template>
  <v-container class="pt-10 item-list">
    <v-row>
      <v-col cols="12" sm="12" md="6">
        <v-card outlined tile height="338">
          <v-card-title>事業所画像（大）</v-card-title>
          <v-card-title v-if($route.params.id)>
            {{ $route.params.id }}
          </v-card-title>
        </v-card>
        <v-card class="sm-no" outlined tile height="85">
          <v-card-title>事業所画像（小５枚）</v-card-title>
        </v-card>
        <v-card class="md-no" outlined tile height="85">
          <v-card-title>事業所詳細</v-card-title>
        </v-card>
        <v-card class="mt-6" outlined tile height="491">
          <v-card-title>事業所タイトル</v-card-title>
        </v-card>
        <v-card class="mt-6" outlined tile height="599">
          <v-card-title> スタッフ紹介 </v-card-title>
        </v-card>
        <v-card class="mt-6 mb-10" outlined tile height="513">
          <v-card-title> 施設概要 </v-card-title>
        </v-card>
      </v-col>
      <v-col cols="12" sm="12" md="6">
        <v-row class="sticky sm-no" no-gutters>
          <v-col>
            <v-card outlined tile height="580"> 事業所詳細 </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  css: ['~/assets/variables.scss'],
  layout: 'application',
  data() {
    return {}
  },
}
</script>

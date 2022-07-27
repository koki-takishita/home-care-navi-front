<template>
  <v-card class="mt-6" tile height="491">
    <v-col class="office-title" cols="12">{{ office.title }} </v-col>
    <v-col class="title_detail" cols="12">特徴詳細のテキストが入ります</v-col>
  </v-card>
</template>

<script>
export default {
  props: {
    office: {
      type: Object,
      default() {
        return null
      },
    },
  },
}
</script>
<style>
.office-title {
  font-size: 20px;
  font-weight: bold;
}
</style>

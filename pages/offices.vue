<template>
  <v-container class="pt-10 item-list">
    <div>
      <v-card width="520" height="423"> 画像 </v-card>
      <v-card width="520" height="491" class="my-6"> 事業所タイトル </v-card>
      <v-card width="520" height="599" class="my-6">
        スタッフ紹介
        <show-more-button />
      </v-card>
      <v-card width="520" height="513" class="my-6"> 施設概要 </v-card>
    </div>
    <div>
      <v-card width="438" height="580" class="ml-8 sticky"> 事業所情報 </v-card>
    </div>
  </v-container>
</template>
<script>
export default {
  css: ['~/assets/variables.scss'],

  layout: 'top',
}
</script>

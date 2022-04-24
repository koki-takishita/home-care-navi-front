<template>
  <v-card height="245" width="990" flat rounded="0" class="mx-auto">
    <div class="text-center">
      <h2 class="text-28 pt-12">安心して介護をお願いしたいから</h2>
      <p class="text-caption ma-0 mt-2">
        ホームケアナビは、ケアマネージャーの検索ができるサービスです。
      </p>
    </div>
    <v-card tile outlined color="#FFFFFF" max-width="990" class="mt-7">
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
</template>
<script>
export default {
  name: 'Top',
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

.v-text-field--outlined >>> fieldset {
  border-color: #d9dede;
}

.v-text-field--outlined >>> i {
  color: #d9dede;
  margin-top: 7px;
}
</style>

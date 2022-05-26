<template>
  <v-card outlined max-width="990" min-height="245" class="mx-auto">
    <div class="text-center set-color font-weight-black mt-12">
      <p class="fs-28 mb-2">安心して介護をお願いしたいから。</p>
      <p class="text-caption mb-0">
        ホームケアナビは、ケアマネージャーの検索ができるサービスです。
      </p>
    </div>
    <div class="mt-6 max-width-720 mx-auto">
      <v-text-field
        placeholder="事業所名、市町村など"
        append-icon="mdi-magnify"
        outlined
        rounded
      ></v-text-field>
    </div>
  </v-card>
</template>
<script>
export default {}
</script>
<style scoped>
.fs-28 {
  font-size: 28px;
}

.max-width-720 {
  max-width: 720px;
}

.set-color {
  color: #6d7570;
}
/* stylelint-disable */
.v-text-field--outlined >>> fieldset {
  border-color: #d9dede;
}

::v-deep input::placeholder {
  color: #d9dede !important;
}
</style>

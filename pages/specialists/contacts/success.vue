<template>
  <v-card outlined width="750" class="mx-auto mt-10">
    <v-card-text>
      <div>
        <h1 class="text-center mt-8 title-text d-none d-sm-block">
          お問い合わせ完了
        </h1>
      </div>
      <div>
        <h1 class="mt-8 title-text d-sm-none">お問い合わせ完了</h1>
      </div>
      <div class="text-center mt-12 mb-10">
        <p>
          お問い合わせを送りました。<br />サイト運営からのご返信をお待ちください。
        </p>
      </div>
    </v-card-text>
  </v-card>
</template>
<script>
export default {
  layout: 'application_specialists',
  css: ['~/assets/variables.scss'],
}
</script>

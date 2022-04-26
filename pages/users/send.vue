<template>
  <v-card outlined width="750" class="mx-auto mt-10">
    <v-card-text>
      <h1 class="text-center mt-8 title-text">仮登録完了</h1>
      <div class="text-center mt-12">
        <p>
          入力いただいたメールアドレスに<br />
          確認メールを送付いたしました。
        </p>
      </div>
      <a
        href="../top"
        class="mx-auto mt-4 text-center top-link mb-16"
        style="color: #f06364"
      >
        <p>ホームケアナビトップに戻る</p>
      </a>
    </v-card-text>
  </v-card>
</template>
<script>
export default {
  layout: 'application',
  css: ['~/assets/variables.scss'],
}
</script>

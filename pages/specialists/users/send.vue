<template>
  <v-card outlined width="750" class="mx-auto mt-10">
    <v-card-text>
      <h1 class="text-center mt-8 title-text">仮登録完了</h1>
      <div class="text-center mt-12">
        <p>
          入力いただいたメールアドレスに<br />
          確認メールを送付いたしました。<br />
          メールのリンクからログインを行<br />
          なってください。
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

<style scoped>
.text-center {
  margin-top: 32px;
}

a {
  text-decoration: none;
}

.mb-16 {
  margin-bottom: 64px;
}

.top-link {
  width: 343px;
  height: 20px;
}

.title-text {
  font-size: 20px;
}

.ml-145 {
  margin-left: 145px;
}

.ml-697 {
  margin-left: 697;
}

.ml-75 {
  margin-left: 7.5px;
}

.item-list {
  display: flex;
  justify-content: center;
}

.v-btn-content {
  position: absolute;
  bottom: 32px;
}
</style>

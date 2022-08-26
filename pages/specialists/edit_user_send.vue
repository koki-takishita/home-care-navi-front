<template>
  <v-card outlined width="750" class="mx-auto mt-10">
    <v-card-text>
      <h1 class="text-center mt-8 title-text">メールアドレス仮変更完了</h1>
      <div class="text-center mt-12">
        <p>
          入力いただいたメールアドレスに<br />
          確認メールを送付いたしました。<br />
          (※認証リンクをクリックすると、 メールアドレスの変更が完了します。<br />
          現在のメールアドレスでログイン できなくなりますのでご注意ください )
        </p>
      </div>
      <div class="mx-auto mt-4 text-center top-link mb-16">
        <nuxt-link to="/specialists/office/new" style="color: #f09c3c">
          <p>トップページに戻る</p>
        </nuxt-link>
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

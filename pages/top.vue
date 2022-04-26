<template>
  <div>
    <h1>ここはTOPページです</h1>
    <p>ここから検索します</p>
  </div>
</template>
<script>
export default {
  layout: 'application',
  /* post
  async asyncData({ params, $http }) {
    const post = await $http.$post(`http://localhost:3000/api/users`, { users: { foo: 'bar' } })
    return { post }
  } // get
  async asyncData({ params, $http }) {
    const post = await $http.$get(`https://api.nuxtjs.dev/posts/1`)
    return { post }
  }
  */
}
</script>

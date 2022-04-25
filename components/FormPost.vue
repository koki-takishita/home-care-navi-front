<template>
  <div class="mn-18">
    <div class="font-size-13">
      <label class="font-weight-bold d-block">
        住所
        <div class="d-flex">
          <div class="font-weight-regular pt-5 mr-2">〒</div>
          <v-text-field
            v-model="setPostcode"
            class="post-field pr-389 mt-2"
            dense
            outlined
            height="44"
            placeholder="000-000"
          >
          </v-text-field>
        </div>
      </label>
    </div>
    <div>
      <v-text-field
        v-model="setAddress"
        class="post-field"
        dense
        outlined
        height="44"
        placeholder="東京都世田谷区祖師谷4-3-15"
      >
      </v-text-field>
    </div>
  </div>
</template>
<script>
export default {
  name: 'FormPost',
  computed: {
    setPostcode: {
      get() {
        return this.post_code
      },
      set(newValue) {
        return this.$emit('update:post_code', newValue)
      },
    },
    setAddress: {
      get() {
        return this.address
      },
      set(newValue) {
        return this.$emit('update:address', newValue)
      },
    },
  },
}
</script>
<style lang="sass" scoped>
.pr-389
  padding-right: 389px
.post-field
  margin-top: -18px
.font-size-13
  font-size: 13px
  color: #6D7570
.mn-18
</style>

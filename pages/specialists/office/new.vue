<template>
  <div>
    <v-card class="mx-auto mb-2 p-0" width="750">
      <v-col cols="12"><h3>事業所登録</h3></v-col>
      <v-form>
        <v-col cols="12">
          <label class="font-color-gray font-weight-black text-caption"
            >事業所名
            <v-text-field
              class="mt-2 font-weight-regular"
              placeholder="ケアパークむかい風"
              outlined
              dense
              height="44"
          /></label>
          <label class="font-color-gray font-weight-black text-caption"
            >特徴タイトル
            <v-text-field
              class="mt-2 font-weight-regular"
              placeholder="事業所紹介タイトル"
              outlined
              dense
              height="44"
          /></label>
          <label class="font-color-gray font-weight-black text-caption"
            >休業日
          </label>
          <v-row class="mt-2 mb-2">
            <v-col cols="1" class="mx-5"
              >日<input v-model="selected" value="日" type="checkbox"
            /></v-col>
            <v-col cols="1" class="mx-5"
              >月<input v-model="selected" value="月" type="checkbox"
            /></v-col>
            <v-col cols="1" class="mx-5"
              >火<input v-model="selected" value="火" type="checkbox"
            /></v-col>
            <v-col cols="1" class="mx-5"
              >水<input v-model="selected" value="水" type="checkbox"
            /></v-col>
            <v-col cols="1" class="mx-5"
              >木<input v-model="selected" value="木" type="checkbox"
            /></v-col>
            <v-col cols="1" class="mx-5"
              >金<input v-model="selected" value="金" type="checkbox"
            /></v-col>
            <v-col cols="1" class="mx-5"
              >土<input v-model="selected" value="土" type="checkbox"
            /></v-col>
          </v-row>
          <label class="font-color-gray font-weight-black text-caption"
            >営業日に関する説明
            <v-textarea
              class="mt-2 font-weight-regular"
              placeholder="例｝ 第ニと第三土曜日は営業しています"
              height="105"
              outlined
              dense
            >
            </v-textarea
          ></label>
          <label class="font-color-gray font-weight-black text-caption"
            >電話番号
            <v-text-field
              class="mt-2 font-weight-regular"
              placeholder="080-1234-5678"
              outlined
              dense
              height="44"
          /></label>
          <label class="font-color-gray font-weight-black text-caption"
            >FAX
            <v-text-field
              class="mt-2 font-weight-regular"
              placeholder="090-8765-4321"
              outlined
              dense
              height="44"
          /></label>
        </v-col>
        <v-text-field
          outlined
          dense
          height="44"
          class="post-form"
          placeholder="123-4567"
        >
          <template #prepend>
            <v-icon class="text-decoration-none mt-2 ml-3" tag="div" size="16">
              〒
            </v-icon>
          </template>
        </v-text-field>
        <v-col cols="12" class="pt-0">
          <div class="mt-n2">
            <v-text-field
              outlined
              dense
              height="44"
              class="address-form set-max-width-520"
              placeholder="東京都世田谷区祖父谷4-3-15"
            >
            </v-text-field>
          </div>
        </v-col>
      </v-form>
    </v-card>
  </div>
</template>

<script>
export default {
  layout: 'application_specialists',
  data() {
    return {
      name: '',
      title: '',
      flags: '',
      business_day_detail: '',
      phone_number: '',
      fax_number: '',
      post_code: '',
      address: '',
      selected: [],
    }
  },
}
</script>
<style scoped>
.link-color {
  color: #ee7b1a;
}

.font-color-gray {
  color: #6d7570;
}

.link-width {
  width: 750px;
}

/* stylelint-disable */
.post-form >>> fieldset {
  width: 107px;
}

.post-form >>> .v-text-field__slot {
  max-width: 82px;
}
</style>

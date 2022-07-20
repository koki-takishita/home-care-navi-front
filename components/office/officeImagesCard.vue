<template>
  <div>
    <v-card tile height="338">
      <v-img v-if="images !== null" :src="images[active]" height="338">
        <v-row>
          <v-col cols="6">
            <v-btn
              class="prev ml-3"
              fab
              depressed
              color="#0000004F"
              small
              @click="prev"
            >
              <v-icon color="white" x-large>mdi-chevron-left</v-icon>
            </v-btn>
          </v-col>
          <v-col cols="6">
            <div class="text-right">
              <v-btn
                class="next mr-3"
                fab
                depressed
                color="#0000004F"
                small
                @click="next"
              >
                <v-icon color="white" x-large>mdi-chevron-right</v-icon>
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-img>
      <v-img
        v-else
        src="https://home-care-navi-bucket.s3.ap-northeast-1.amazonaws.com/no_image.jpeg"
        height="338"
      ></v-img>
    </v-card>
    <v-card class="sm-under-no" tile height="85">
      <div v-if="images !== null" class="thumbnails">
        <li
          v-for="index in images.length"
          :key="index"
          :class="{ current: active === index - 1 }"
          class="mx-1 mt-4"
          @click="current(index)"
        >
          <v-img :src="images[index - 1]" height="50" width="70"></v-img>
        </li>
      </div>
    </v-card>
  </div>
</template>

<script>
export default {
  props: {
    images: {
      type: Array,
      default() {
        return null
      },
    },
  },
  data() {
    return {
      active: 0, // 事業所画像が現在何番目か
    }
  },
  methods: {
    current(index) {
      this.active = index - 1
    },
    // 左矢印（前へ）
    prev() {
      // activeが0以下なら一番最後の画像へもどる
      if (this.active <= 0) {
        this.active = this.images.length - 1
      } else {
        this.active--
      }
    },
    // 右矢印（次へ）
    next() {
      // 配列の数が0~5つで6つになるので、-1とする
      // 5番目のときにnextしたら0番目に戻る
      if (this.active >= this.images.length - 1) {
        this.active = 0
      } else {
        this.active++
      }
    },
  },
}
</script>
<style lang="scss">
@media screen and (max-width: 959px) {
  /* sm以下で表示しない */
  .sm-under-no {
    display: none;
  }
  .office-name {
    font-size: 20px;
    font-weight: bold;
  }
}

.thumbnails {
  display: flex;
  justify-content: center;
  list-style: none;
  margin-top: 0px;
  margin-bottom: 16px;
  & li {
    cursor: pointer;
    &.current {
      border: solid;
      border-color: #f8615e;
    }
  }
}

.prev {
  margin-top: 150px;
}

.next {
  margin-top: 150px;
}

.active {
  &-enter {
    opacity: 0;
    &-to {
      opacity: 1;
    }
    &-active {
      transition: opacity 0.5s;
    }
  }
  &-leave {
    opacity: 1;
    &-to {
      opacity: 0;
    }
    &-active {
      transition: opacity 0.5s;
    }
  }
}
</style>

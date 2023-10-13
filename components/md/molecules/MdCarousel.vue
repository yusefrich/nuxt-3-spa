<template>
  <md-card
    :width="cardWidth"
    :height="cardHeight"
    padding="10px"
  >
    <p v-if="title" class="fw-bold">
      {{ title }}
    </p>
    <carousel
      :per-page="perPage"
      :autoplay-timeout="3000"
      :touch-drag="false"
      :autoplay="autoPlay"
      :loop="true"
      :pagination-padding="4"
      :navigation-enabled="true"
      navigation-click-target-size="2"
      :navigation-prev-label="`<span class='text-white'><</span>`"
      :navigation-next-label="`<span class='text-white'>></span>`"
    >
      <slide
        v-for="(item, idx) in items"
        :key="idx"
        class="slide d-flex"
      >
        <a :href="'#'" class="w-100">
          <img
            class="tt"
            :width="imgWidth"
            :src="item.img"
            :height="imgHeight"
            alt="Banner"
          >
        </a>
      </slide>
      <!-- <slide class="slide d-flex">
        <img
          v-for="(item, idx) in items"
          :key="idx"
          :width="imgWidth"
          :src="item.img"
          :height="imgHeight"
          alt=""
        >
      </slide>
      <slide class="slide d-flex">
        <img
          v-for="(item, idx) in items"
          :key="idx"
          :width="imgWidth"
          :src="item.img"
          :height="imgHeight"
          alt=""
        >
      </slide> -->
    </carousel>
  </md-card>
</template>

<script>
import { Carousel, Slide } from 'vue-carousel'
import MdCard from '@/components/md/atoms/MdCard.vue'

export default {
  name: 'MdCarousel',
  components: {
    Carousel,
    Slide,
    MdCard
  },
  props: {
    title: {
      type: String,
      default: ''
    },
    items: {
      type: Array,
      default: () => ([])
    },
    perPage: {
      type: Number,
      default: 1
    },
    autoPlay: {
      type: Boolean,
      default: false
    },
    cardHeight: {
      type: String,
      default: '100%'
    },
    imgHeight: {
      type: String,
      default: 'auto'
    },
    imgWidth: {
      type: String,
      default: 'auto'
    },
    cardWidth: {
      type: String,
      default: '100%'
    }
  }
}
</script>

<style lang="scss" scoped>
p {
  color: var(--md-font-color);
  font-size: 18px;
}
img {
  border-radius: 4px;
}
.VueCarousel {
  margin: auto;
  width: 94%;
  padding: 0 3px;
  .VueCarousel-navigation {
    .VueCarousel-navigation-button.VueCarousel-navigation-prev {
      background: red !important;
    }
  }
}
</style>

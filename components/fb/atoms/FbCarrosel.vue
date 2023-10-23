<template>
  <swiper
    class="swiper mx-1"
    :class="{'swiper-sm-fb': sm}"
    :options="swiperOption"
  >
    <swiper-slide
      v-for="(featuredSlide, index) in slides"
      :key="'featured_slides_'+index"
    >
      <fb-fut-button
        :to="featuredSlide.link && featuredSlide.link !== '' ? featuredSlide.link : null"
        external
        class="w-100"
      >
        <img
          class="image-size w-100 h-100"
          :class="{'d-none d-md-block':featuredSlide.img_mobile}"
          :src="featuredSlide.img"
          alt="Imagme carrosel"
        >
        <img
          v-if="featuredSlide.img_mobile"
          class="image-size d-md-none w-100 h-100"
          :src="featuredSlide.img_mobile"
          alt="Imagme carrosel"
        >
      </fb-fut-button>
    </swiper-slide>
    <div slot="pagination" class="swiper-pagination-fb d-none d-md-block" />
    <div slot="button-next" class="swiper-button-next" />
    <div slot="button-prev" class="swiper-button-prev" />
  </swiper>
</template>

<script>
import FbFutButton from '@/components/fb/atoms/FbFutButton.vue'

export default {
  name: 'FbCarrosel',
  components: { FbFutButton },
  props: {
    slides: {
      type: [Array, Object],
      default: () => []
    },
    sm: Boolean
  },
  data () {
    return {
      swiperOption: {
        autoHeight: true,
        // loop: true,
        direction: 'horizontal',
        autoplay: {
          delay: 10000,
          disableOnInteraction: false
        },
        pagination: {
          el: '.swiper-pagination-fb',
          clickable: true
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }
      }
    }
  }
}
</script>

<style lang="scss">
@import "@/assets/layout/breakpoints";
.swiper-sm-fb {
  max-width: 100vw;
  @include md {
    max-width: calc(100vw - 580px);
  }
}
.swiper-button-next{
  color: white;
}
.swiper-button-prev{
  color: white;
}
.swiper-pagination-fb{
  position: absolute;
  z-index: 10;
  text-align: center;
  .swiper-pagination-bullet{
    width: 13px !important;
    height: 13px !important;
  }
  .swiper-pagination-bullet-active{
    background: white;
  }
}
</style>

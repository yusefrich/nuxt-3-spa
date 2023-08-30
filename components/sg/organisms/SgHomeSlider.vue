<template>
  <div>
    <div v-if="banners && banners.slides" class="d-none d-md-block">
      <carousel
        class="carousel-container"
        :touch-drag="false"
        :per-page="fullWidth ? 1 : 3"
        :per-page-custom="fullWidth ? [] : [[320, 1], [768, 2], [1200, 3]]"
        :autoplay-timeout="3000"
        :autoplay="true"
        :loop="true"
        :pagination-padding="5"
        :navigation-enabled="true"
        :navigation-next-label="`<span class='text-white btn-style-next'>></span>`"
        :navigation-prev-label="`<span class='text-white btn-style-next'><</span>`"
      >
        <slide v-for="(banner, i) in banners.slides" :key="'key_link_' + i + '_' + banner.key">
          <a :href="banner.link">
            <img class="img-fluid sg-fluid-img" :src="banner.img" alt="">
          </a>
        </slide>
      </carousel>
    </div>
    <div v-if="banners && banners.slides_mobile" class="d-md-none">
      <carousel
        :per-page="3"
        class="carousel-container"
        :per-page-custom="[[320, 1], [768, 2], [1200, 3]]"
        :autoplay-timeout="3000"
        :touch-drag="true"
        :autoplay="true"
        :loop="true"
        :pagination-padding="5"
        :navigation-enabled="true"
        :navigation-next-label="`<span class='text-white btn-style-next'>></span>`"
        :navigation-prev-label="`<span class='text-white btn-style-next'><</span>`"
      >
        <slide v-for="(banner, i) in banners.slides_mobile" :key="'key_link_' + i + '_' + banner.key">
          <a :href="banner.link">
            <img class="img-fluid sg-fluid-img" :src="banner.img" alt="">
          </a>
        </slide>
      </carousel>
    </div>
  </div>
</template>

<script>
import { Carousel, Slide } from 'vue-carousel'

export default {
  components: {
    Carousel,
    Slide
  },
  props: {
    banners: {
      type: Object,
      default: () => {}
    },
    fullWidth: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/layout/breakpoints";
.sg-fluid-img {
  margin: 5px !important;
  border-radius: 15px;
  max-width: calc(100% - 10px) !important;
}
.VueCarousel-navigation-next {
  color: white !important;
}
.carousel-container {
  @include _md{
    max-width: calc(100% - 70px);
    margin-left: 35px;
  }
}
</style>

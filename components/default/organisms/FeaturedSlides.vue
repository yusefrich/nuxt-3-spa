<template>
  <div>
    <div v-if="currentSettings && !currentSettings.slide_fullwith" class="position-relative">
      <div id="scroller-container" class="game-holder py-2">
        <div class="d-inline-flex mandatory-scroll-snapping">
          <template v-if="currentSlides">
            <featured-slide v-for="(featuredSlide, index) in currentSlides" :key="'featured_slides_'+index" :slide="featuredSlide.img" :url="featuredSlide.link" />
          </template>
          <template v-if="currentFeaturedBets && currentFeaturedBets.length > 0">
            <featured-game
              v-for="(featuredBet, index) in currentFeaturedBets"
              :key="'featured_' + index + '_' + tickets.length"
              :bet="featuredBet"
              :tickets="tickets"
              @selectBet="ticket => $emit('selectBet', ticket)"
            />
          </template>
        </div>
      </div>
      <fut-button
        v-if="(currentFeaturedBets && currentFeaturedBets.length > 1) || (currentSlides && currentSlides.length > 1)"
        class="arrow-left p-1 py-3"
        :primary="true"
        @click="scrollLeft"
      >
        <font-awesome-icon class="text-white icon" :icon="['fas', 'arrow-left']" />
      </fut-button>
      <fut-button
        v-if="(currentFeaturedBets && currentFeaturedBets.length > 1) || (currentSlides && currentSlides.length > 1)"
        class="arrow-right p-1 py-3"
        :primary="true"
        @click="scrollRight"
      >
        <font-awesome-icon class="text-white icon" :icon="['fas', 'arrow-right']" />
      </fut-button>
    </div>
    <swiper
      v-else
      class="swiper"
      :options="swiperOption"
    >
      <swiper-slide v-for="(featuredSlide, index) in currentSlides" :key="'featured_slides_'+index">
        <fut-button :to="featuredSlide.link" external class="w-100">
          <img class="d-none d-md-block" width="100%" height="auto" style="object-fit: cover" :src="featuredSlide.img">
          <img class="d-md-none" width="100%" height="auto" style="object-fit: cover" :src="featuredSlide.img_mobile">
        </fut-button>
      </swiper-slide>
      <swiper-slide v-for="(featuredBet, index) in currentFeaturedBets" :key="'featured_'+index">
        <div class="d-inline-flex w-100">
          <featured-game
            class="w-100 mx-0 text-center"
            :height="'200px'"
            :bet="featuredBet"
          />
        </div>
      </swiper-slide>
      <div slot="pagination" class="swiper-pagination" />
      <div slot="button-next" class="swiper-button-next" />
      <div slot="button-prev" class="swiper-button-prev" />
    </swiper>
  </div>
</template>
<script>
import FeaturedGame from '@/components/default/molecules/FeaturedGame'
import FeaturedSlide from '@/components/default/molecules/FeaturedSlide'
import FutButton from '@/components/default/atoms/FutButton.vue'
export default {
  components: { FeaturedGame, FeaturedSlide, FutButton },
  props: {
    odds: {
      type: Array,
      default: () => ([])
    },
    tickets: {
      type: Array,
      default: () => ([])
    },
    currentSettings: {
      type: Object,
      default: () => ({})
    },
    currentSlides: {
      type: Array,
      default: () => ([])
    },
    currentFeaturedBets: {
      type: Array,
      default: () => ([])
    }
  },
  data () {
    return {
      swiperOption: {
        autoHeight: true,
        // loop: true,
        direction: 'horizontal',
        // autoplay: {
        //   delay: 5600,
        //   disableOnInteraction: false
        // },
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }
      }
    }
  },
  methods: {
    scrollLeft () {
      document.getElementById('scroller-container').scrollLeft -= 400
    },
    scrollRight () {
      document.getElementById('scroller-container').scrollLeft += 400
    }
  }
}
</script>
<style lang="scss" scoped>
  .mandatory-scroll-snapping{
    scroll-snap-type: x mandatory;
  }
  .game-holder{
    overflow: auto;
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */
    position: relative;
    scroll-behavior: smooth;
  }
  .game-holder::-webkit-scrollbar{
    display: none;
  }
  .arrow-left{
    position: absolute;
    left: 0;
    top: 40%;
  }
  .arrow-right{
    position: absolute;
    right: 0;
    top: 40%;
  }
  .swiper-button-prev, .swiper-button-next{
    color: #ffffff !important;
  }
  .swiper-pagination-bullet{
    background: #000 !important;
    opacity: 0.5 !important;
  }
  .swiper-pagination-bullet-active{
    background: #ffffff !important;
  }
  .swiper-container{
    z-index: 0 !important;
  }
</style>

<template>
  <div class="row m-0 slider-outline mb-2">
    <div style="position: relative" class="px-0" :class="{'col-12':fullwidth, 'col-xl-7': !fullwidth}">
      <swiper
        v-if="currentSlides"
        :options="currentSlides.length > 0 ? swiperOption : swiperOptionFixed"
        class="swiper"
      >
        <swiper-slide v-for="(featuredSlide, index) in currentSlides" :key="'featured_slides_'+index">
          <nsx-fut-button external class="p-0 w-100" :to="featuredSlide.link">
            <img class="d-none d-md-block" width="100%" style="object-fit: cover; min-height: 160px" :src="featuredSlide.img">
            <img class="d-md-none" width="100%" height="auto" style="object-fit: cover" :src="featuredSlide.img_mobile">
          </nsx-fut-button>
        </swiper-slide>
        <div slot="pagination" class="swiper-pagination-nsx" />
      </swiper>
    </div>
    <div v-if="!fullwidth" class="col-xl-5 px-0 d-none d-md-block">
      <div class="main-game-title">
        <p class="text-white title-feat mb-0 ps-2 py-1 fw-bold">
          <span v-if="currentFeaturedBets && currentFeaturedBets[0]">{{ currentFeaturedBets[0].home_team }} x {{ currentFeaturedBets[0].away_team }}</span>
          <span v-else>Sem Jogos.</span>
        </p>
      </div>
      <div style="background: var(--nsx-gray-0)">
        <nsx-fut-button class="text-start title-feat" block data-bs-toggle="collapse" gray data-bs-target="#collapseExample">
          <span>{{ $t('i18n_resultado_final') }}</span>
        </nsx-fut-button>
      </div>
      <div v-if="currentFeaturedBets && currentFeaturedBets[0] && currentFeaturedBets[0].odds[0]" id="collapseExample" class="collapse show">
        <!-- // todo loop using the correct odds variable in the object -->
        <nsx-fut-button
          v-for="(odd, ind) in currentFeaturedBets[0].odds[0].odds"
          :key="'odd_key_slider_' + ind"
          class="text-start text-white text-bet-item d-flex py-2"
          :class="[hasSelected(odd.type)?'active':'']"
          gray
          block
          @click="()=>odd.odds<=0||odd.odds==1?{}:$emit('selectBet', { gameId: currentFeaturedBets[0].id, odd: odd, market: currentFeaturedBets[0].odds[0].name, event: `${currentFeaturedBets[0].home_team} x ${gamecurrentFeaturedBets[0].away_team}`, validate: currentFeaturedBets[0].datetime, live: false })"
        >
          <p class="mb-0 text-bet-item-elip">
            {{ odd.header }}
          </p>
          <p class="mb-0 text-bet ps-1">
            {{ odd.odds && odd.odds != 0 && odd.odds != 1 ? odd.odds : '-' }}
          </p>
        </nsx-fut-button>
      </div>
    </div>
  </div>
</template>
<script>
import NsxFutButton from '@/components/nsx/atoms/NsxFutButton'

export default {
  components: { NsxFutButton },
  props: {
    fullwidth: Boolean,
    currentFeaturedBets: {
      type: Array,
      default: () => ([])
    },
    tickets: {
      type: Array,
      default: () => ([])
    },
    currentSlides: {
      type: [Array, Object],
      default: () => ([])
    }
  },
  data () {
    return {
      swiperOption: {
        loop: true,
        direction: 'horizontal',
        autoplay: {
          delay: 5000,
          disableOnInteraction: false
        },
        pagination: {
          el: '.swiper-pagination-nsx',
          clickable: true
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }
      },
      swiperOptionFixed: {
        loop: false,
        direction: 'horizontal',
        pagination: {
          el: '.swiper-pagination-nsx',
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
    hasSelected (type) {
      const currentTicketIndex = this.tickets.findIndex(obj => obj.odd.type === type)
      if (currentTicketIndex !== -1) {
        return true
      }
      return false
    }
  }
}
</script>
<style lang="scss" scoped>
@import "@/assets/layout/breakpoints";
.col-xl-7{
  @include xl {
    width: 65%;
  }
}
.col-xl-5{
  @include xl {
    width: 35%;
  }
}
.main-game-title{
  background: linear-gradient(var(--fut-primary),var(--fut-background-2)) !important;
}
.slider-outline{
  border: 1px solid var(--nsx-gray-3);
  border-radius: 5px;
  overflow: hidden;
}
.text-bet{
  color: #ffdf1b !important;
}
.user-site-logo{
  position: absolute;
  top: 50%;
  left: 50%;
  width: 50%;
  height: 50%;
  object-fit: contain;
  transform: translate(-50%, -50%);
}
.swiper-pagination-nsx{
  position: absolute;
  z-index: 20;
  text-align: end !important;
}
.swiper-pagination-bullet{
  background: #000 !important;
  opacity: 0.5 !important;
}
.swiper-pagination-bullet-active::after{
  background: #ffa500 !important;
}
.swiper-container{
  z-index: 0 !important;
}
.swiper-slide{
  width: 100% !important;
}
.title-feat{
  font-size: 13.3px;
  overflow: hidden;
  border: none;
  text-overflow: ellipsis;
  span{
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
.text-bet-item{
  white-space: nowrap;
  font-size: 12px;
  .text-bet-item-elip{
    color: #d2d2d2;
    text-overflow: ellipsis;
    overflow: hidden;
  }
}
.active{
  background: #d2d2d2 !important;
  border: 1px solid #d2d2d2 !important;
  *{
    color: var(--nsx-dark-7) !important;
  }
}
</style>

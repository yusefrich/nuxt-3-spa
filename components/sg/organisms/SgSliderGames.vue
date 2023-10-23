<template>
  <div class="sg-games">
    <div class="d-flex mb-3">
      <img class="me-2" width="40px" height="40px" src="/Sg/chips.svg" alt="">
      <h4 class="mb-0 text-white fw-bold casino-games-title-name w-100">
        <span>
          {{ gameGroup.name }}
        </span>
      </h4>
      <a
        v-if="gameGroup && gameGroup.games.length > 4"
        :href="localePath(`/casino/category/${gameGroup.slug}${live ? '?live=true' : ''}`)"
        class="btn btn-game-category text-white mb-0 align-self-center"
      >
        {{ $t('i18n_todos') }}
      </a>
    </div>
    <carousel
      class="carousel-container container"
      :per-page-custom="[[320, 2], [768, 4], [1200, 5]]"
      :touch-drag="true"
      :pagination-padding="5"
      :navigation-enabled="true"
      :navigation-next-label="`<span class='text-white btn-style-next'>></span>`"
      :navigation-prev-label="`<span class='text-white btn-style-next'><</span>`"
    >
      <slide
        v-for="(item, index) in gameGroup.games"
        :key="'item_slide_' + gameGroup.slug + '_' + index"
        class="slide d-flex pe-1 pe-md-4"
      >
        <sg-game-card
          v-if="item"
          :item="item"
          :user="user"
          @select="payload => $emit('select', payload)"
          @register="$emit('register')"
        />
      </slide>
    </carousel>
  </div>
</template>

<script>
import { Carousel, Slide } from '@jambonn/vue-concise-carousel';
import '@jambonn/vue-concise-carousel/lib/vue-concise-carousel.css'

import SgGameCard from '@/components/sg/atoms/SgGameCard'

export default {
  name: 'SgSliderGames',
  components: {
    Carousel,
    SgGameCard,
    Slide
  },
  props: {
    user: {
      type: Object,
      default: null
    },
    gameGroup: {
      type: Object,
      default: () => ({})
    },
    live: {
      type: Boolean,
      default: false
    }
  },
  emits: [
    'update',
    'register'
  ],
  data () {
    return {
      locked: true
    }
  },
  methods: {
    getMainColor (id) {
      const imgEl = document.getElementById(id)
      if (!imgEl) {
        return '#333333'
      }
      const blockSize = 5
      const defaultRGB = { r: 0, g: 0, b: 0 }
      const canvas = document.createElement('canvas')
      const context = canvas.getContext && canvas.getContext('2d')
      let data
      let i = -4
      const rgb = { r: 0, g: 0, b: 0 }
      let count = 0
      if (!context) {
        return defaultRGB
      }
      const height = canvas.height = imgEl.naturalHeight || imgEl.offsetHeight || imgEl.height
      const width = canvas.width = imgEl.naturalWidth || imgEl.offsetWidth || imgEl.width
      context.drawImage(imgEl, 0, 0)
      try {
        data = context.getImageData(0, 0, width, height)
      } catch (e) {
        return defaultRGB
      }
      const length = data.data.length
      while ((i += blockSize * 4) < length) {
        ++count
        rgb.r += data.data[i]
        rgb.g += data.data[i + 1]
        rgb.b += data.data[i + 2]
      }
      rgb.r = ~~(rgb.r / count)
      rgb.g = ~~(rgb.g / count)
      rgb.b = ~~(rgb.b / count)
      return rgb
    }
  }
}
</script>

<style lang="scss">
@import "@/assets/layout/breakpoints";
.image-content {
  width: 100%;
  .img-mobile {
    width: 30%;
  }
}
.btn-game-category{
  background: var(--fut-background-lighter);
  font-weight: 700;
  border-radius: 50px;
  padding: 3px 15px;
  margin-right: 40px;
  @media (max-width: 768px) {
    margin-right: 80px;
  }
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

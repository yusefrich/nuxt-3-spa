<template>
  <div class="animated-bg">
    <div
      id="animatedCarouselControls"
      class="carousel-container carousel slide"
      data-bs-ride="carousel"
    >
      <div class="carousel-inner">
        <div
          v-for="(_, slideIdx) in slides"
          :key="'carousel_slide_' + slideIdx"
          class="carousel-item"
          :class="[slideIdx===0?'active':'', `${slideIdx}`]"
          data-bs-interval="3000"
        >
          <div class="d-flex justify-content-around">
            <md-casino-card-game
              v-for="(item, idx) in reorderedItems[slideIdx]"
              :key="idx"
              :game="item"
              :width="`calc(${100 / perSlide}% - 10px)`"
              @openGame="$emit('openGame', item)"
            />
          </div>
        </div>
      </div>
      <button
        class="arrow-btn"
        data-bs-target="#animatedCarouselControls"
        data-bs-slide="prev"
      >
        <font-awesome-icon :icon="['fas', 'chevron-left']" />
      </button>
      <button
        class="arrow-btn"
        data-bs-target="#animatedCarouselControls"
        data-bs-slide="next"
      >
        <font-awesome-icon :icon="['fas', 'chevron-right']" />
      </button>
    </div>
  </div>
</template>

<script>
import windowWidth from '@/mixins.js/windowWidth.js'

export default {
  name: 'MdAnimatedCarousel',
  mixins: [windowWidth],
  props: {
    items: {
      type: Array,
      default: () => ([])
    }
  },
  computed: {
    perSlide () {
      if (this.width < 426) {
        return 2
      }

      if (this.width < 769) {
        return 3
      }

      return 4
    },
    slides () {
      return Math.ceil(this.items.length / this.perSlide)
    },
    reorderedItems () {
      const reordered = []

      for (let i = 0; i < this.items.length; i = i + this.perSlide) {
        reordered.push(this.items.slice(i, i + this.perSlide))
      }

      return reordered
    }
  }
}
</script>

<style lang="scss" scoped>
.carousel-container{
  position: relative;
  height: 100%;
  width: 100%;
}
.arrow-btn {
  position: absolute;
  top: calc(50% - 28px);
  width: 36px;
  height: 36px;
  border-radius: 18px;
  color: var(--md-bg-third);
  background: #FFFFFF;
  border: 2px solid var(--md-bg-third);
  box-sizing: border-box;
  box-shadow: 0px 4px 0px rgba(0, 0, 0, 0.25);
  &:first-of-type {
    left: -16px;
  }
  &:last-child {
    right: -16px;
  }
}

.animated-bg {
  border-radius: 0 0 15px 15px;
  padding: 17px 50px;
  background-color: var(--md-bg-third-lighter);
  background-image: url("/md/gamb-bg-transparent.png");
  background-repeat: repeat;
  background-position: 0 0;
  animation: animatedBackground 500s linear infinite;
}

@keyframes animatedBackground {
  from {
    background-position: 0 0;
  }
  to {
    background-position: -10000px 0;
  }
}

@media (max-width: 768px) {
  .animated-bg {
    padding: 17px 0;
  }
}

@media (max-width: 425px) {
  .animated-bg {
    padding: 17px 10px;
  }
  .carousel-container {
    max-width: 100% !important;
    margin: 0 !important;
  }
}
</style>

<template>
  <div
    v-if="items"
    id="carouselControls"
    class="desktop-carousel carousel slide"
    data-bs-ride="carousel"
  >
    <div class="carousel-inner">
      <div
        v-for="(_, slideIdx) in fullWidth ? items : Math.ceil(items.length/3)"
        :key="'carousel_slide_' + slideIdx"
        class="carousel-item"
        :class="[slideIdx===0?'active':'', `${slideIdx}`]"
        data-bs-interval="3000"
      >
        <div class="d-flex justify-content-around">
          <div
            v-for="(item, idx) in reorderedItems[slideIdx]"
            :key="'slide_image_' + idx"
            :class="fullWidth ? 'full-width-slide' : 'slides'"
          >
            <a v-if="item.img" :href="item.link">
              <img
                class="banner img-fluid"
                :src="item.img"
              >
            </a>
            <md-featured-game-card
              v-if="item.slug"
              :game="item"
              :tickets="tickets"
              border-radius="8px"
              @selectBet="$emit('selectBet', $event)"
            />
          </div>
        </div>
      </div>
    </div>
    <button
      v-if="items.length"
      class="arrow-btn"
      :style="isMobile ? 'left: -8px' : ''"
      data-bs-target="#carouselControls"
      data-bs-slide="prev"
    >
      <font-awesome-icon :icon="['fas', 'chevron-left']" />
    </button>
    <button
      v-if="items.length"
      class="arrow-btn"
      :style="isMobile ? 'right: -8px' : ''"
      data-bs-target="#carouselControls"
      data-bs-slide="next"
    >
      <font-awesome-icon :icon="['fas', 'chevron-right']" />
    </button>
  </div>
</template>

<script>
import MdFeaturedGameCard from '@/components/md/molecules/MdFeaturedGameCard'

export default {
  name: 'MdDesktopCarousel',
  components: {
    MdFeaturedGameCard
  },
  props: {
    items: {
      type: Array,
      default: () => ([])
    },
    tickets: {
      type: Array,
      default: () => ([])
    },
    fullWidth: {
      type: Boolean,
      default: false
    },
    isMobile: {
      type: Boolean,
      default: false
    }
  },
  emits: [
    'selectBet'
  ],
  computed: {
    reorderedItems () {
      const reordered = []

      for (let i = 0; i < this.items.length; this.fullWidth ? i++ : i += 3) {
        reordered.push(this.items.slice(i, this.fullWidth ? i + 1 : i + 3))
      }

      if (this.fullWidth) {
        return reordered
      }

      if (reordered[reordered.length - 1].length === 1) {
        reordered[reordered.length - 1].push({ empty: true })
        reordered[reordered.length - 1].push({ empty: true })

        return reordered
      }

      if (reordered[reordered.length - 1].length === 2) {
        reordered[reordered.length - 1].push({ empty: true })

        return reordered
      }

      return reordered
    }
  }
}
</script>

<style lang="scss" scoped>
.desktop-carousel {
  position: relative;
  height: 100%;
  width: 100%;
}
.slides {
  display: flex;
  width: 33%;
  min-height: 100%;
  border-radius: 8px;
}
.full-width-slide {
  width: 100%;
  min-height: 100%;
  border-radius: 8px;
}
.banner {
  border-radius: 8px;
  width: 100%;
}
.arrow-btn {
  position: absolute;
  top: calc(50% - 28px);
  width: 36px;
  height: 36px;
  border-radius: 18px;
  color: var(--md-inverse-font-color);
  background: var(--md-inverse-comp-bg-color);
  border: 2px solid var(--md-inverse-font-color);
  box-sizing: border-box;
  box-shadow: 0px 1px 4px var(--md-font-color);
  &:first-of-type {
    left: -16px;
  }
  &:last-child {
    right: -16px;
  }
}
</style>

<template>
  <div
    :id="`carouselControls-${compId}`"
    class="casino-carousel carousel slide"
    data-bs-ride="carousel"
  >
    <div class="carousel-header">
      <div class="texts" :class="{ 'my-auto': !title }">
        <p v-if="title" class="mb-0 fst-italic fw-bold">
          {{ title }}
        </p>
        <p class="mb-0 fst-italic subtitle">
          {{ subtitle }}
          <img
            v-if="icon"
            :src="icon"
            height="20"
            class="my-auto"
          >
        </p>
      </div>
      <div v-if="items.length" class="slider-btns">
        <button
          v-if="slug"
          class="fw-bold all"
          @click="slug ? $router.push(localePath(`/casino/category/${slug}${live ? '?live=true' : ''}`)) : {}"
        >
          <span>{{ $t('i18n_todos').toUpperCase() }}</span>
        </button>
        <button
          class="arrow-btn"
          :data-bs-target="`#carouselControls-${compId}`"
          data-bs-slide="prev"
        >
          <font-awesome-icon class="arrow-icon" :icon="['fas', 'chevron-left']" />
        </button>
        <button
          class="arrow-btn"
          :data-bs-target="`#carouselControls-${compId}`"
          data-bs-slide="next"
        >
          <font-awesome-icon class="arrow-icon" :icon="['fas', 'chevron-right']" />
        </button>
      </div>
    </div>
    <div class="carousel-body carousel-inner">
      <div
        v-for="(item, slideIdx) in reorderedItems"
        :key="`${compId}_slide_${slideIdx}`"
        class="carousel-item"
        :class="{ active: slideIdx === 0 }"
      >
        <div :key="refresh" class="d-flex justify-content-between">
          <md-casino-card-game
            v-for="(game, imgIdx) in item"
            :key="`${compId}_slide_${slideIdx}_game_${imgIdx}`"
            :game="game"
            :width="`calc(${100 / gamesPerSlide}% - 10px)`"
            @openGame="$emit('openGame', game)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import windowWidth from '@/mixins.js/windowWidth.js'
import MdCasinoCardGame from '@/components/md/atoms/MdCasinoCardGame'

export default {
  name: 'MdCasinoGamesCarousel',
  components: {
    MdCasinoCardGame
  },
  mixins: [windowWidth],
  props: {
    compId: {
      type: [Number, String],
      required: true
    },
    items: {
      type: Array,
      default: () => ([])
    },
    title: {
      type: String,
      default: ''
    },
    subtitle: {
      type: String,
      default: ''
    },
    icon: {
      type: String,
      default: ''
    },
    slug: {
      type: String,
      default: ''
    },
    live: {
      type: Boolean,
      default: false
    }
  },
  emits: [
    'openGame'
  ],
  data () {
    return {
      refresh: false
    }
  },
  computed: {
    gamesPerSlide () {
      if (this.width < 427) {
        return 2
      } else if (this.width < 769) {
        return 3
      } else {
        return 5
      }
    },
    reorderedItems () {
      const reordered = []

      for (let i = 0; i < this.items.length; i = i + this.gamesPerSlide) {
        reordered.push(this.items.slice(i, i + this.gamesPerSlide))
      }

      return reordered
    }
  },
  mounted () {
    this.fillEmptySpaces()
  },
  methods: {
    fillEmptySpaces () {
      if (this.reorderedItems.length < 1) {
        return
      }

      for (let i = 0; i < this.gamesPerSlide; i++) {
        if (!this.reorderedItems[this.reorderedItems.length - 1][i]) {
          this.reorderedItems[this.reorderedItems.length - 1][i] = { empty: true }
        }
      }
      this.refresh = !this.refresh
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/layout/breakpoints";

.casino-carousel {
  position: relative;
  height: 100%;
  width: 100%;
  padding: 12px;
}
.carousel-header {
  display: flex;
  justify-content: space-between;
  .texts {
    font-size: 19px;
    color: var(--md-font-color);
    .subtitle {
      font-weight: 400 !important;
      color: #FB114D;
    }
  }
  .slider-btns {
    display: flex;
    align-items: center;
    button {
      color: var(--md-font-color);
      border: 1px solid var(--md-comp-border-color);
      background: var(--md-comp-bg-color);
      box-sizing: border-box;
      box-shadow: 0px 0px 14px -3px var(--md-ticket-shadow-color);
      margin-left: 4px;
      &:active {
        background: var(--md-invert-font-color);
      }
    }
    .all {
      padding: 10px 25px ;
      border-radius: 100px;
    }
    .arrow-btn {
      width: 37px;
      height: 37px;
      border-radius: 50%;
      .arrow-icon {
        margin-bottom: -2px;
      }
    }
  }
}
.carousel-body {
  margin-top: 16px;
}

@media (max-width: 425px) {
  .texts {
    font-size: 16px !important;
  }
  .all span {
    font-size: 12px !important;
  }
  .all {
    padding: 6px 16px !important;
  }
  .arrow-btn {
    width: 31px !important;
    height: 31px !important;
  }
}
</style>

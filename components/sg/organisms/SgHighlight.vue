<template>
  <div
    :id="`weekedGames-${compId}`"
    class="section-games-mobile carousel slide"
    data-bs-ride="carousel"
  >
    <div class="d-flex align-items-center justify-content-between mb-3">
      <div class="limit w-100">
        <img v-if="logo" class="logo" :src="logo" alt="">
        <span class="ms-1 fs-18 fw-bold text-white">{{ title }}</span>
      </div>
      <div class="d-flex">
        <a :href="localePath(`/casino/category/${games.slug}${live ? '?live=true' : ''}`)" class="border-0 px-3 text-white text-decoration-none btn-game-highlight">
          {{ $t('i18n_todos') }}
        </a>
        <button
          class="border-0 bg-transparent px-3"
          :data-bs-target="`#weekedGames-${compId}`"
          data-bs-slide="prev"
        >
          <img src="/Sg/Home/Prev.png" alt="">
        </button>
        <div class="border-vertical" />
        <button
          class="border-0 bg-transparent px-3"
          :data-bs-target="`#weekedGames-${compId}`"
          data-bs-slide="next"
        >
          <img src="/Sg/Home/Next.png" alt="">
        </button>
      </div>
    </div>
    <div class="carousel-inner">
      <div
        v-for="(item, index) in reorderedGames"
        :key="'highlight_game_' + index"
        class="carousel-item"
        :class="{ active: index === 0 }"
        data-bs-interval="2000"
      >
        <div class="d-flex justify-content-evenly">
          <sg-game-card
            v-for="(game, gIdx) in item"
            :key="`game-${gIdx}`"
            :link="link"
            :item="game"
            :user="user"
            @select="payload => $emit('select', payload)"
            @register="$emit('register')"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import windowWidth from '~/mixins.js/windowWidth'
import SgGameCard from '@/components/sg/atoms/SgGameCard'

export default {
  components: {
    SgGameCard
  },
  mixins: [windowWidth],
  props: {
    title: {
      type: String,
      default: 'Mais jogados!'
    },
    games: {
      type: Object,
      default: () => ({})
    },
    logo: {
      type: String,
      default: null
    },
    link: {
      type: Boolean,
      default: false
    },
    user: {
      type: Object,
      default: () => ({})
    },
    compId: {
      type: String,
      default: ''
    },
    live: {
      type: Boolean,
      default: false
    }
  },
  emits: [
    'select',
    'register'
  ],
  computed: {
    gamesPerSlide () {
      if (this.width <= 767) {
        return 2
      }

      if (this.width <= 991) {
        return 3
      }

      return 4
    },
    reorderedGames () {
      const reordered = []

      for (let i = 0; i < this.games.games.length; i = i + this.gamesPerSlide) {
        reordered.push(this.games.games.slice(i, i + this.gamesPerSlide))
      }

      return reordered
    }
  }
}
</script>

<style lang="scss" scoped>
.logo {
  width: 30px;
  height: 30px;
  object-fit: contain;
}
.section-games {
  border: 2px solid var(--fut-secondary);
  border-radius: 30px;
}
.section-games-mobile {
  background: var(--fut-background-darkest);
  border-radius: 20px;
  margin-top: 20px;
  padding: 30px 10px;
}
.week-games {
  font-size: 18px;
}
.most-played {
  overflow-x: scroll;
}
.limit {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
.point-border {
  border-radius: 5px;
}
.border-vertical {
  border-right: 1px solid var(--fut-background-darkest);
}
.fs-10 {
  font-size: 10px;
}
.fs-18 {
  font-size: 18px;
}
.fs-20 {
  font-size: 20px;
}

.btn-game-highlight {
  background: var(--fut-background-lighter);
  font-weight: 700;
  border-radius: 50px;
  padding: 3px 15px;
}
</style>

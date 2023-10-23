<template>
  <div>
    <div class="category-title d-flex align-items-center">
      <div class="container">
        <h1 v-if="getCasinoFilteredGame && getCasinoFilteredGame.length">
          {{ getCasinoFilteredGame[0].name }}
        </h1>
      </div>
    </div>
    <div class="container sk-content">
      <sk-modal-search
        :items="fetched"
        :placeholder="$t('i18n_procure_seu_jogo')"
        :not-found="notFound"
        casino
        class="my-4"
        @search="search($event)"
      />

      <div>
        <div
          v-for="(item, idx) in getCasinoFilteredGame"
          :key="idx"
          class="category-body"
          :style="`
            grid-template-columns: repeat(${dynamicGrid.columns}, 1fr);
            gap: ${dynamicGrid.gap};
          `"
        >
          <div
            v-for="(game, gIdx) in item.games"
            :key="gIdx"
          >
            <sk-casino-card-game
              :game="game"
              width="100%"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'pinia'
import { useCasinoStore } from '@/stores/casino'
import { useCasinoFeaturedStore } from '@/stores/casino-featured'
import { useCasinoSearchGamesStore } from '@/stores/casino-search-games'
import { useLiveCasinoFeaturedStore } from '@/stores/live-casino-featured'
import { useCasinoCategoryGamesStore } from '@/stores/casino-category-games'

import SkModalSearch from '@/components/sk/molecules/SkModalSearch.vue'
import SkCasinoCardGame from '@/components/sk/atoms/SkCasinoCardGame.vue'
import windowWidth from '@/mixins.js/windowWidth.js'

export default {
  name: 'SkCategoryGames',
  components: {
    SkModalSearch,
    SkCasinoCardGame
  },
  mixins: [windowWidth],
  props: {
    live: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      slug: '',
      cleanSearch: false,
      notFound: false
    }
  },
  computed: {
    ...mapState(useCasinoFeaturedStore, {
      getCasinoNew: 'getCasinoNew',
      getCasinoMostPlayedGames: 'getCasinoMostPlayedGames'
    }),
    ...mapState(useCasinoSearchGamesStore, {
      getCasinoSearchGames: 'getCasinoSearchGames'
    }),
    ...mapState(useLiveCasinoFeaturedStore, {
      getLiveCasinoNew: 'getLiveCasinoNew',
      getLiveCasinoMostPlayedGames: 'getLiveCasinoMostPlayedGames'
    }),
    ...mapState(useCasinoCategoryGamesStore, {
      getCasinoCategoryGames: 'getCasinoCategoryGames'
    }),
    getCasinoFilteredGame () {
      if (this.slug === 'mocked-most') {
        return this.live ? this.getLiveCasinoMostPlayedGames : this.getCasinoMostPlayedGames
      } else if (this.slug === 'mocked-new') {
        return this.live ? this.getLiveCasinoNew : this.getCasinoNew
      } else {
        return this.getCasinoCategoryGames
      }
    },
    fetched () {
      if (this.cleanSearch || !this.getCasinoSearchGames || (this.getCasinoSearchGames && this.getCasinoSearchGames.length === 0)) {
        return []
      }

      return this.getCasinoSearchGames[0].games
    },
    dynamicGrid () {
      if (this.skContentWidth < 500 && this.width < 520) {
        return { columns: 3, gap: '10px 5px' }
      } else if (this.skContentWidth < 700 && this.width < 830) {
        return { columns: 4, gap: '10px 5px' }
      } else if (this.skContentWidth < 850 && this.width < 1100) {
        return { columns: 5, gap: '10px 5px' }
      } else if (this.skContentWidth < 1000 && this.width < 1200) {
        return { columns: 6, gap: '20px 10px' }
      } else if (this.skContentWidth < 1150 && this.width < 1500) {
        return { columns: 7, gap: '20px 10px' }
      }

      return { columns: 8, gap: '20px 10px' }
    }
  },
  mounted () {
    this.slug = this.$route.params.categorySlug

    if (this.slug === 'mocked-most') {
      this.live ? this.fetchLiveCasinoMostPlayedGames() : this.fetchCasinoMostPlayedGames()
    } else if (this.slug === 'mocked-new') {
      this.live ? this.fetchLiveCasinoNewGames() : this.fetchCasinoNewGames()
    } else {
      this.fetchCasinoGamesByCategory(this.slug)
    }

    if (this.$route.query.gameid) {
      this.fetchCasinoSingleGame(this.$route.query.gameid).then((res) => {
        this.currentGame = res
        this.iframe = true
      })
    }
  },
  methods: {
    ...mapActions(useCasinoStore, {
      fetchCasinoSingleGame: 'fetchCasinoSingleGame'
    }),
    ...mapActions(useCasinoFeaturedStore, {
      fetchCasinoNewGames: 'fetchCasinoNewGames',
      fetchCasinoMostPlayedGames: 'fetchCasinoMostPlayedGames'
    }),
    ...mapActions(useCasinoSearchGamesStore, {
      searchCasinoGames: 'searchCasinoGames'
    }),
    ...mapActions(useCasinoCategoryGamesStore, {
      fetchCasinoGamesByCategory: 'fetchCasinoGamesByCategory'
    }),
    ...mapActions(useLiveCasinoFeaturedStore, {
      fetchLiveCasinoNewGames: 'fetchLiveCasinoNewGames',
      fetchLiveCasinoMostPlayedGames: 'fetchLiveCasinoMostPlayedGames'
    }),
    search (value) {
      this.notFound = false

      if (value === '') {
        this.cleanSearch = true
        return
      }

      this.cleanSearch = false
      this.searchCasinoGames(value).then((res) => {
        if (!res.length) {
          this.notFound = true
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  padding: 0 3vw 0 3vw !important;
}

.category-title {
  background: var(--fut-background-lighter);
  height: 115px;

  h1 {
    color: var(--fut-color-dynamic);
    font-size: 1.7rem;
    font-weight: 600;
  }
}
.category-body {
  display: grid;
}
</style>

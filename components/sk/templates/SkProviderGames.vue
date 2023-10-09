<template>
  <div>
    <div class="category-title d-flex align-items-center">
      <div class="container">
        <h1 v-if="getCasinoProviderGames && getCasinoProviderGames.length">
          {{ getCasinoProviderGames[0].name }}
        </h1>
      </div>
    </div>
    <div class="container">
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
          v-for="(item, idx) in getCasinoProviderGames"
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
import { useCasinoSearchGamesStore } from '@/stores/casino-search-games'
import { useCasinoProviderGamesStore } from '@/stores/casino-provider-games'

import SkModalSearch from '@/components/sk/molecules/SkModalSearch.vue'
import SkCasinoCardGame from '@/components/sk/atoms/SkCasinoCardGame.vue'
import windowWidth from '@/mixins.js/windowWidth.js'

export default {
  name: 'SkProviderGames',
  components: {
    SkModalSearch,
    SkCasinoCardGame
  },
  mixins: [windowWidth],
  data () {
    return {
      slug: '',
      cleanSearch: false,
      notFound: false
    }
  },
  computed: {
    ...mapState(useCasinoSearchGamesStore, {
      getCasinoSearchGames: 'getCasinoSearchGames'
    }),
    ...mapState(useCasinoProviderGamesStore, {
      getCasinoProviderGames: 'getCasinoProviderGames'
    }),
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
  created () {
    this.slug = this.$route.params.providerSlug
    this.fetchCasinoGamesByProvider(this.slug)
  },
  methods: {
    ...mapActions(useCasinoSearchGamesStore, {
      searchCasinoGames: 'searchCasinoGames'
    }),
    ...mapActions(useCasinoProviderGamesStore, {
      fetchCasinoGamesByProvider: 'fetchCasinoGamesByProvider',
      concatCasinoGamesByProvider: 'concatCasinoGamesByProvider'
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

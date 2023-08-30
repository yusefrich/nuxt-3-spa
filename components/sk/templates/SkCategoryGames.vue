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
import { mapGetters, mapActions } from 'vuex'
import SkModalSearch from '@/components/sk/molecules/SkModalSearch.vue'
import windowWidth from '@/mixins.js/windowWidth.js'

export default {
  name: 'SkCategoryGames',
  components: {
    SkModalSearch
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
    ...mapGetters({
      getCasinoGames: 'casino/getCasinoGames',
      getCasinoLoading: 'casino/getCasinoLoading',
      getCasinoNew: 'casino-featured/getCasinoNew',
      getSkOpenTicket: 'tickets-pre-cash-in/getSkOpenTicket',
      getCasinoSearchGames: 'casino-search-games/getCasinoSearchGames',
      getCasinoMostPlayedGames: 'casino-featured/getCasinoMostPlayedGames',
      getCasinoCategoryGames: 'casino-category-games/getCasinoCategoryGames'
    }),
    getCasinoFilteredGame () {
      if (this.slug === 'mocked-most') {
        return this.getCasinoMostPlayedGames
      } else if (this.slug === 'mocked-new') {
        return this.getCasinoNew
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
        return { columns: this.getSkOpenTicket ? 3 : 5, gap: '10px 5px' }
      } else if (this.skContentWidth < 1000 && this.width < 1200) {
        return { columns: this.getSkOpenTicket ? 4 : 6, gap: '20px 10px' }
      } else if (this.skContentWidth < 1150 && this.width < 1500) {
        return { columns: this.getSkOpenTicket ? 6 : 7, gap: '20px 10px' }
      }

      return { columns: 8, gap: '20px 10px' }
    }
  },
  mounted () {
    this.slug = this.$route.params.categorySlug

    if (this.slug === 'mocked-most') {
      this.fetchCasinoMostPlayedGames()
    } else if (this.slug === 'mocked-new') {
      this.fetchCasinoNewGames()
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
    ...mapActions({
      fetchCasinoSingleGame: 'casino/fetchCasinoSingleGame',
      searchCasinoGames: 'casino-search-games/searchCasinoGames',
      fetchCasinoNewGames: 'casino-featured/fetchCasinoNewGames',
      fetchCasinoMostPlayedGames: 'casino-featured/fetchCasinoMostPlayedGames',
      fetchCasinoGamesByCategory: 'casino-category-games/fetchCasinoGamesByCategory'
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

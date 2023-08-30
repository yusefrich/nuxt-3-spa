<template>
  <div class="container">
    <sk-carousel
      :items="slides"
      :full-width="isMobile"
      :is-mobile="isMobile"
    />

    <sk-modal-search
      :items="fetched"
      :placeholder="$t('i18n_procure_seu_jogo')"
      :not-found="notFound"
      casino
      class="my-4"
      @search="search($event)"
    />

    <div :class="{ 'd-flex': !isMobile }">
      <sk-components-select
        :components-list="componentsList"
        :selected-component="currentComponent"
        @changeComponent="changeComponent($event)"
      />
    </div>

    <template v-if="currentComponent === 'SkLobbyCasino' && getCasinoMostPlayedGames">
      <sk-casino-games-carousel
        v-for="(mostPlayedGames, gidx) in getCasinoMostPlayedGames"
        :key="`most_played_carousel_${gidx}`"
        :comp-id="`most_played_carousel_${gidx}`"
        :items="mostPlayedGames.games"
        :title="$t('i18n_mais_jogados')"
        :icon="['fab', 'hotjar']"
        :slug="mostPlayedGames.slug"
        :dynamic-grid="dynamicGrid"
      />
    </template>
    <template v-if="currentComponent === 'SkLobbyCasino' && getCasinoNew">
      <sk-casino-games-carousel
        v-for="(newGames, gidx) in getCasinoNew"
        :key="`new_game_carousel_${gidx}`"
        :comp-id="`most_played_carousel_${gidx}`"
        :items="newGames.games"
        :title="$t('i18n_novos_jogos')"
        :icon="['fas', 'rocket']"
        :slug="newGames.slug"
        :dynamic-grid="dynamicGrid"
      />
    </template>

    <div
      v-else-if="currentComponent === 'SkLiveCasino' && getCasinoCategoryGames"
      class="live-casino"
    >
      <p class="title">
        <font-awesome-icon :icon="['fab', 'black-tie']" class="icon my-auto me-1 transition" />
        {{ $t('i18n_cassino_ao_vivo') }}
      </p>
      <div
        v-for="(item, lIdx) in getCasinoCategoryGames"
        :key="lIdx"
        class="game-wrapper"
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

    <template v-if="getCasinoProviders">
      <sk-casino-providers-carousel
        :items="getCasinoProviders"
        comp-id="providers_carousel"
        :title="$t('i18n_provedores')"
        :icon="['fas', 'network-wired']"
        :dynamic-grid="dynamicGrid"
      />
    </template>

    <template v-if="currentComponent === 'SkLobbyCasino' && getCasinoGames">
      <sk-casino-games-carousel
        v-for="(item, gidx) in getCasinoGames"
        :key="`game_carousel_${gidx}`"
        :comp-id="gidx"
        :items="item.games"
        :title="item.name"
        :slug="item.slug"
        :dynamic-grid="dynamicGrid"
      />
    </template>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import SkCarousel from '@/components/sk/molecules/SkCarousel.vue'
import SkModalSearch from '@/components/sk/molecules/SkModalSearch.vue'
import SkComponentsSelect from '@/components/sk/molecules/SkComponentsSelect.vue'
import SkCasinoGamesCarousel from '@/components/sk/molecules/SkCasinoGamesCarousel.vue'
import windowWidth from '@/mixins.js/windowWidth.js'

export default {
  name: 'SkCasino',
  components: {
    SkCarousel,
    SkModalSearch,
    SkComponentsSelect,
    SkCasinoGamesCarousel
  },
  mixins: [windowWidth],
  data () {
    return {
      currentComponent: 'SkLobbyCasino',
      cleanSearch: false,
      notFound: false
    }
  },
  computed: {
    ...mapGetters({
      getCasinoGames: 'casino/getCasinoGames',
      getCasinoNew: 'casino-featured/getCasinoNew',
      getCasinoSliders: 'metadata-casino/getCasinoSliders',
      getSkOpenTicket: 'tickets-pre-cash-in/getSkOpenTicket',
      getCasinoProviders: 'metadata-casino/getCasinoProviders',
      getCasinoSearchGames: 'casino-search-games/getCasinoSearchGames',
      getCasinoMostPlayedGames: 'casino-featured/getCasinoMostPlayedGames',
      getCasinoCategoryGames: 'casino-category-games/getCasinoCategoryGames'
    }),
    slides () {
      const emptyArr = []

      if (this.getCasinoSliders !== null) {
        return this.width > 768
          ? this.getCasinoSliders.slides
          : this.getCasinoSliders.slides_mobile
            ? this.getCasinoSliders.slides_mobile
            : emptyArr
      }

      return emptyArr
    },
    fetched () {
      if (this.cleanSearch || !this.getCasinoSearchGames || (this.getCasinoSearchGames && this.getCasinoSearchGames.length === 0)) {
        return []
      }

      return this.getCasinoSearchGames[0].games
    },
    componentsList () {
      return {
        SkLobbyCasino: {
          text: 'Lobby',
          icon: ['fas', 'rocket']
        },
        SkLiveCasino: {
          text: this.$t('i18n_cassino_ao_vivo'),
          icon: ['fab', 'black-tie']
        }
      }
    },
    isMobile () {
      return this.width <= 821
    },
    dynamicGrid () {
      if (this.skContentWidth < 500 && this.width < 520) {
        return {
          columns: 3,
          gap: '10px 5px'
        }
      } else if (this.skContentWidth < 700 && this.width < 930) {
        return {
          columns: 4,
          gap: '10px 5px'
        }
      } else if (this.skContentWidth < 850 && this.width < 1200) {
        return {
          columns: this.getSkOpenTicket ? 3 : 5,
          gap: '10px 5px'
        }
      } else if (this.skContentWidth < 1000 && this.width < 1300) {
        return {
          columns: this.getSkOpenTicket ? 4 : 6,
          gap: this.getSkOpenTicket ? '10px 5px' : '20px 10px'
        }
      } else if (this.skContentWidth < 1150 && this.width < 1500) {
        return {
          columns: this.getSkOpenTicket ? 6 : 7,
          gap: this.getSkOpenTicket ? '10px 5px' : '20px 10px'
        }
      }

      return { columns: 8, gap: '20px 10px' }
    }
  },
  async created () {
    this.$store.commit('casino-search-games/SET_SEARCH_GAMES', null)
    await this.fetchCasinoSliders()

    this.changeComponent('SkLobbyCasino')
  },
  methods: {
    ...mapActions({
      fetchCasinoGames: 'casino/fetchCasinoGames',
      fetchCasinoSliders: 'metadata-casino/fetchCasinoSliders',
      searchCasinoGames: 'casino-search-games/searchCasinoGames',
      fetchCasinoNewGames: 'casino-featured/fetchCasinoNewGames',
      fetchCasinoProviders: 'metadata-casino/fetchCasinoProviders',
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
    },
    changeComponent (compName) {
      const compActions = {
        SkLobbyCasino: () => {
          this.fetchCasinoMostPlayedGames()
          this.fetchCasinoGames()
          this.fetchCasinoProviders()
          this.fetchCasinoNewGames()
        },
        SkLiveCasino: () => {
          this.fetchCasinoGamesByCategory('live')
        }
      }

      compActions[compName]()

      this.currentComponent = compName
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  padding: 34px 3vw 0 3vw !important;
}

.live-casino {
  margin-top: 1.5rem;

  .title {
    font-weight: 600;
    font-size: 1.18rem;
    color: var(--fut-color-dynamic);
    cursor: pointer;

    .icon {
      color: var(--fut-secondary);
    }

    &:hover {
      .icon {
        color: var(--fut-color-dynamic);
      }
    }
  }

  .game-wrapper {
    display: grid;
  }
}
</style>

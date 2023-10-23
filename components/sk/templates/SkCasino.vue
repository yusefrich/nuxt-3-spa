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

    <template v-if="currentComponent === 'SkLiveCasino' && getLiveCasinoMostPlayedGames">
      <sk-casino-games-carousel
        v-for="(mostPlayedGames, gidx) in getLiveCasinoMostPlayedGames"
        :key="`live_most_played_carousel_${gidx}`"
        :comp-id="`live_most_played_carousel_${gidx}`"
        :items="mostPlayedGames.games"
        :title="$t('i18n_mais_jogados')"
        :icon="['fab', 'hotjar']"
        :slug="mostPlayedGames.slug"
        :dynamic-grid="dynamicGrid"
        live
      />
    </template>
    <template v-if="currentComponent === 'SkLiveCasino' && getLiveCasinoNew">
      <sk-casino-games-carousel
        v-for="(newGames, gidx) in getLiveCasinoNew"
        :key="`live_new_game_carousel_${gidx}`"
        :comp-id="`most_played_carousel_${gidx}`"
        :items="newGames.games"
        :title="$t('i18n_novos_jogos')"
        :icon="['fas', 'rocket']"
        :slug="newGames.slug"
        :dynamic-grid="dynamicGrid"
        live
      />
    </template>

    <div
      v-if="currentComponent === 'SkLiveCasino'"
      class="live-casino"
    >
      <sk-casino-games-carousel
        v-for="(item, gidx) in getLiveCasinoGames"
        :key="`live_game_carousel_${gidx}`"
        :comp-id="gidx"
        :items="item.games"
        :title="item.name"
        :slug="item.slug"
        :dynamic-grid="dynamicGrid"
      />
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
import { mapActions, mapState } from 'pinia'
import { useCasinoStore } from '@/stores/casino'
import { useLiveCasinoStore } from '@/stores/live-casino'
import { useCasinoFeaturedStore } from '@/stores/casino-featured'
import { useMetadataCasinoStore } from '@/stores/metadata-casino'
import { useCasinoSearchGamesStore } from '@/stores/casino-search-games'
import { useLiveCasinoFeaturedStore } from '@/stores/live-casino-featured'
import { useLiveCasinoSearchGamesStore } from '@/stores/live-casino-search-games'

import SkCarousel from '@/components/sk/molecules/SkCarousel'
import SkModalSearch from '@/components/sk/molecules/SkModalSearch'
import SkComponentsSelect from '@/components/sk/molecules/SkComponentsSelect'
import SkCasinoProvidersCarousel from '@/components/sk/molecules/SkCasinoProvidersCarousel'
import SkCasinoGamesCarousel from '@/components/sk/molecules/SkCasinoGamesCarousel'
import windowWidth from '@/mixins.js/windowWidth.js'

export default {
  name: 'SkCasino',
  components: {
    SkCarousel,
    SkModalSearch,
    SkComponentsSelect,
    SkCasinoProvidersCarousel,
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
    ...mapState(useCasinoStore, {
      getCasinoGames: 'getCasinoGames'
    }),
    ...mapState(useLiveCasinoStore, {
      getLiveCasinoGames: 'getLiveCasinoGames'
    }),
    ...mapState(useCasinoFeaturedStore, {
      getCasinoNew: 'getCasinoNew',
      getCasinoMostPlayedGames: 'getCasinoMostPlayedGames'
    }),
    ...mapState(useMetadataCasinoStore, {
      getCasinoSliders: 'getCasinoSliders',
      getCasinoProviders: 'getCasinoProviders'
    }),
    ...mapState(useCasinoSearchGamesStore, {
      getCasinoSearchGames: 'getCasinoSearchGames'
    }),
    ...mapState(useLiveCasinoFeaturedStore, {
      getLiveCasinoNew: 'getLiveCasinoNew',
      getLiveCasinoMostPlayedGames: 'getLiveCasinoMostPlayedGames'
    }),
    ...mapState(useLiveCasinoSearchGamesStore, {
      getLiveCasinoSearchGames: 'getLiveCasinoSearchGames'
    }),
    slides () {
      const emptyArr = []

      if (this.getCasinoSliders !== null && Array.isArray(this.getCasinoSliders.slides) && Array.isArray(this.getCasinoSliders.slides_mobile)) {
        return this.width > 768
          ? this.getCasinoSliders.slides
          : this.getCasinoSliders.slides_mobile
            ? this.getCasinoSliders.slides_mobile
            : emptyArr
      }

      if (this.getCasinoSliders !== null && !Array.isArray(this.getCasinoSliders)) {
        return Object.values(this.width > 768 ? this.getCasinoSliders.slides : this.getCasinoSliders.slides_mobile).map(slide => ({
          img: slide.img,
          link: slide.link
        }))
      }

      return emptyArr
    },
    fetched () {
      if (
        !this.cleanSearch &&
        this.currentComponent === 'SkLobbyCasino' &&
        this.getCasinoSearchGames &&
        this.getCasinoSearchGames[0].games.length
      ) {
        return this.getCasinoSearchGames[0].games
      }

      if (
        !this.cleanSearch &&
        this.currentComponent === 'SkLiveCasino' &&
        this.getLiveCasinoSearchGames &&
        this.getLiveCasinoSearchGames[0].games.length
      ) {
        return this.getLiveCasinoSearchGames[0].games
      }

      return []
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
          columns: 5,
          gap: '10px 5px'
        }
      } else if (this.skContentWidth < 1000 && this.width < 1300) {
        return {
          columns: 6,
          gap: '20px 10px'
        }
      } else if (this.skContentWidth < 1150 && this.width < 1500) {
        return {
          columns: 7,
          gap: '20px 10px'
        }
      }

      return { columns: 8, gap: '20px 10px' }
    }
  },
  async created () {
    this.cleanSearchGames()
    await this.fetchCasinoSliders()

    this.changeComponent('SkLobbyCasino')
  },
  methods: {
    ...mapActions(useCasinoStore, {
      fetchCasinoGames: 'fetchCasinoGames'
    }),
    ...mapActions(useLiveCasinoStore, {
      fetchLiveCasinoGames: 'fetchLiveCasinoGames'
    }),
    ...mapActions(useCasinoFeaturedStore, {
      fetchCasinoNewGames: 'fetchCasinoNewGames',
      fetchCasinoMostPlayedGames: 'fetchCasinoMostPlayedGames'
    }),
    ...mapActions(useMetadataCasinoStore, {
      fetchCasinoSliders: 'fetchCasinoSliders',
      fetchCasinoProviders: 'fetchCasinoProviders'
    }),
    ...mapActions(useCasinoSearchGamesStore, {
      cleanSearchGames: 'cleanSearchGames',
      searchCasinoGames: 'searchCasinoGames'
    }),
    ...mapActions(useLiveCasinoSearchGamesStore, {
      searchLiveCasinoGames: 'searchLiveCasinoGames'
    }),
    search (value) {
      this.notFound = false

      if (value === '') {
        this.cleanSearch = true
        return
      }

      this.cleanSearch = false

      if (this.currentComponent === 'SkLiveCasino') {
        this.searchLiveCasinoGames(value).then((res) => {
          if (!res.length) {
            this.notFound = true
          }
        })

        return
      }

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
          this.fetchLiveCasinoGames()
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

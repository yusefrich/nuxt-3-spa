<template>
  <div v-if="currentSettings" class="mt-5">
    <sg-home-slider
      :banners="getCasinoSliders"
      :full-width="!!currentSettings.slide_fullwith"
    />

    <sg-highlight
      v-if="hasMostPlayed"
      comp-id="home"
      :user="loggedInUser"
      :games="live ? getLiveCasinoMostPlayedGames[0] : getCasinoMostPlayedGames[0]"
      :logo="currentSettings.logo_mobile"
      :live="live"
      @select="payload => openGame(payload)"
      @register="callRegisterModal()"
    />
    <sg-home-filter
      v-if="casinoGames.length"
      :categories="casinoGames.length > 1 ? casinoGames[1] : casinoGames[0]"
      :live="live"
      @select="slug => slugFilter = slug"
    />
    <template v-if="casinoGames.length">
      <div v-for="(gameg, idx2) in casinoGames" :key="'games_container_' + idx2">
        <template v-for="(game, idx) in gameg" :key="idx">
          <sg-slider-games
            v-if="!slugFilter || slugFilter === game.slug"
            :game-group="game"
            :user="loggedInUser"
            class="mb-4"
            :live="getLiveCasinoNew && live && idx2 === 0 ? true : false"
            @select="payload => openGame(payload)"
            @register="callRegisterModal()"
          />
        </template>
      </div>
    </template>

    <sg-casino-games-modal
      v-model="modalOpen"
      :current-game="currentGame"
      :iframe-game-url="iframeGameUrl"
    />
  </div>
</template>

<script>
import { mapActions, mapState } from 'pinia'
import { useBaseStore } from '@/stores/base'
import { useCasinoStore } from '@/stores/casino'
import { useSettingsStore } from '@/stores/settings'
import { useLiveCasinoStore } from '@/stores/live-casino'
import { useCasinoFeaturedStore } from '@/stores/casino-featured'
import { useMetadataCasinoStore } from '@/stores/metadata-casino'
import { useLiveCasinoFeaturedStore } from '@/stores/live-casino-featured'

import SgSliderGames from '@/components/sg/organisms/SgSliderGames'
import SgHomeSlider from '@/components/sg/organisms/SgHomeSlider'
import SgHighlight from '@/components/sg/organisms/SgHighlight'
import SgHomeFilter from '@/components/sg/organisms/SgHomeFilter'
import SgCasinoGamesModal from '@/components/sg/molecules/SgCasinoGamesModal'

export default {
  name: 'SgHome',
  components: {
    SgSliderGames,
    SgHomeSlider,
    SgHighlight,
    SgHomeFilter,
    SgCasinoGamesModal
  },
  props: {
    live: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      iframeGameUrl: null,
      modalOpen: false,
      slugFilter: null,
      currentGame: null
    }
  },
  computed: {
    ...mapState(useBaseStore, {
      loggedInUser: 'loggedInUser'
    }),
    ...mapState(useCasinoStore, {
      getCasinoGames: 'getCasinoGames'
    }),
    ...mapState(useSettingsStore, {
      currentSlides: 'currentSlides',
      currentSettings: 'currentSettings'
    }),
    ...mapState(useLiveCasinoStore, {
      getLiveCasinoGames: 'getLiveCasinoGames'
    }),
    ...mapState(useCasinoFeaturedStore, {
      getCasinoNew: 'getCasinoNew',
      getCasinoMostPlayedGames: 'getCasinoMostPlayedGames'
    }),
    ...mapState(useMetadataCasinoStore, {
      getCasinoSliders: 'getCasinoSliders'
    }),
    ...mapState(useLiveCasinoFeaturedStore, {
      getLiveCasinoNew: 'getLiveCasinoNew',
      getLiveCasinoMostPlayedGames: 'getLiveCasinoMostPlayedGames'
    }),
    casinoGames () {
      const games = []

      if (!this.live && this.getCasinoGames && this.getCasinoGames.length) {
        games.push(this.getCasinoGames)
      } else if (this.live && this.getLiveCasinoGames && this.getLiveCasinoGames.length) {
        games.push(this.getLiveCasinoGames)
      }

      if (!this.live && this.getCasinoNew) {
        games.unshift(this.getCasinoNew)
      } else if (this.live && this.getLiveCasinoNew) {
        games.unshift(this.getLiveCasinoNew)
      }

      return games
    },
    hasMostPlayed () {
      if (
        this.live &&
        this.getLiveCasinoMostPlayedGames &&
        this.getLiveCasinoMostPlayedGames[0].games &&
        this.getLiveCasinoMostPlayedGames[0].games.length > 0
      ) {
        return true
      }

      if (
        !this.live &&
        this.getCasinoMostPlayedGames &&
        this.getCasinoMostPlayedGames[0].games &&
        this.getCasinoMostPlayedGames[0].games.length > 0
      ) {
        return true
      }

      return false
    }
  },
  mounted () {
    this.fetchSliders()
    this.fetchCasinoSliders()

    if (this.live) {
      this.fetchLiveCasinoGames()
      this.fetchLiveCasinoMostPlayedGames()
      this.fetchLiveCasinoNewGames()
    } else {
      this.fetchCasinoGames()
      this.fetchCasinoMostPlayedGames()
      this.fetchCasinoNewGames()
    }

    if (this.$route.query.gameid) {
      this.fetchCasinoSingleGame(this.$route.query.gameid).then((res) => {
        this.currentGame = res
        this.modalOpen = true
      })
    }
  },
  methods: {
    ...mapActions(useCasinoStore, {
      fetchCasinoGames: 'fetchCasinoGames',
      fetchCasinoSingleGame: 'fetchCasinoSingleGame',
      fetchCasinoGameIframeUrl: 'fetchCasinoGameIframeUrl'
    }),
    ...mapActions(useSettingsStore, {
      fetchSliders: 'fetchSliders'
    }),
    ...mapActions(useLiveCasinoStore, {
      fetchLiveCasinoGames: 'fetchLiveCasinoGames'
    }),
    ...mapActions(useCasinoFeaturedStore, {
      fetchCasinoNewGames: 'fetchCasinoNewGames',
      fetchCasinoMostPlayedGames: 'fetchCasinoMostPlayedGames'
    }),
    ...mapActions(useMetadataCasinoStore, {
      fetchCasinoSliders: 'fetchCasinoSliders'
    }),
    ...mapActions(useLiveCasinoFeaturedStore, {
      fetchLiveCasinoNewGames: 'fetchLiveCasinoNewGames',
      fetchLiveCasinoMostPlayedGames: 'fetchLiveCasinoMostPlayedGames'
    }),
    callRegisterModal () {
      document.getElementById('registerModal').click()
    },
    openGame (game) {
      this.currentGame = game
      this.modalOpen = true
      if (game.agregator && game.agregator === 'softgaming') {
        this.fetchCasinoGameIframeUrl({ game_id: game.id }).then((result) => {
          this.iframeGameUrl = result.url
          const searchURL = new URL(window.location)
          searchURL.searchParams.set('gameid', game.id)
          window.history.pushState({}, '', searchURL)
        }).catch((err) => {
          console.error('casino new url fetching error', err)
          this.modalOpen = false
        })
      } else {
        const searchURL = new URL(window.location)
        searchURL.searchParams.set('gameid', game.id)
        window.history.pushState({}, '', searchURL)
      }
    },
    openGameModal (data) {
      this.modalOpen = true
      this.currentGame = data

      const searchURL = new URL(window.location)
      searchURL.searchParams.set('gameid', data.id)
      window.history.pushState({}, '', searchURL)
    }
  }
}
</script>

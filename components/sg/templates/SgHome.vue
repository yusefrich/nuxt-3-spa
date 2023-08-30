<template>
  <div class="mt-5">
    <sg-home-slider
      :banners="getCasinoSliders"
      :full-width="!!currentSettings.slide_fullwith"
    />

    <sg-highlight
      v-if="getCasinoMostPlayedGames && getCasinoMostPlayedGames.games && getCasinoMostPlayedGames.games.length > 0"
      comp-id="home"
      :user="loggedInUser"
      :games="getCasinoMostPlayedGames"
      :logo="currentSettings.logo_mobile"
      @select="payload => openGame(payload)"
      @register="callRegisterModal()"
    />
    <sg-home-filter
      v-if="casinoGames.length"
      :categories="casinoGames.length > 1 ? casinoGames[1] : casinoGames[0]"
      @select="slug => slugFilter = slug"
    />
    <template v-if="casinoGames.length">
      <div v-for="(gameg, idx2) in casinoGames" :key="'games_container_' + idx2">
        <template v-for="(game, idx) in gameg" :key="'sg_slider__' + idx">
          <sg-slider-games
            v-if="!slugFilter || slugFilter === game.slug"
            :key="'sg_slider_' + idx"
            :game-group="game"
            :user="loggedInUser"
            class="mb-4"
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
import { mapActions, mapGetters } from 'vuex'
import SgHomeSlider from '@/components/sg/organisms/SgHomeSlider.vue'
import SgHighlight from '@/components/sg/organisms/SgHighlight.vue'
import SgHomeFilter from '@/components/sg/organisms/SgHomeFilter.vue'

export default {
  name: 'SgHome',
  components: {
    SgHomeSlider,
    SgHighlight,
    SgHomeFilter
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
    ...mapGetters({
      loggedInUser: 'loggedInUser',
      currentSlides: 'settings/currentSlides',
      currentSettings: 'settings/currentSettings',
      getCasinoSliders: 'metadata-casino/getCasinoSliders',
      getCasinoMostPlayedGames: 'casino-featured/getCasinoMostPlayedGames',
      getCasinoGames: 'casino/getCasinoGames',
      getCasinoNew: 'casino-featured/getCasinoNew'
    }),
    casinoGames () {
      const games = []

      if (this.getCasinoGames) {
        games.push(this.getCasinoGames)
      }

      if (this.getCasinoNew) {
        games.unshift(this.getCasinoNew)
      }

      return games
    }
  },
  mounted () {
    this.fetchCasinoGames()
    this.fetchSliders()
    this.fetchCasinoSliders()
    this.fetchCasinoNewGames()
    this.fetchCasinoMostPlayedGames()

    if (this.$route.query.gameid) {
      this.fetchCasinoSingleGame(this.$route.query.gameid).then((res) => {
        this.currentGame = res
        this.modalOpen = true
      })
    }
  },
  methods: {
    ...mapActions({
      fetchCasinoSingleGame: 'casino/fetchCasinoSingleGame',
      fetchCasinoGames: 'casino/fetchCasinoGames',
      fetchCasinoNewGames: 'casino-featured/fetchCasinoNewGames',
      fetchCasinoMostPlayedGames: 'casino-featured/fetchCasinoMostPlayedGames',
      fetchCasinoSliders: 'metadata-casino/fetchCasinoSliders',
      fetchCasinoGameIframeUrl: 'casino/fetchCasinoGameIframeUrl',
      fetchSliders: 'settings/fetchSliders'
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

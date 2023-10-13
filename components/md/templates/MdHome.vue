<template>
  <div class="md-home">
    <md-custom-carousel
      v-if="slides"
      :items="slidesAndFeatured"
      :logo="currentSettings.logo"
      :tickets="getPreCashInTickets"
      :full-width="!!currentSettings.slide_fullwith"
      :is-mobile="width <= 425"
      @selectBet="ticket => toggleTicket(ticket)"
    />

    <md-highlight-games-mobile
      v-if="width <= 425 && featuredGames.length > 0"
      :items="featuredGames"
      :tickets="getPreCashInTickets"
      @selectBet="ticket => toggleTicket(ticket)"
    />

    <md-games-table-wrapper
      v-if="casinoSlides"
      :title="$t('i18n_favoritos')"
      img-url="/md/icon-rocket.png"
      class="pt-2"
    >
      <template #table>
        <md-animated-carousel
          :items="casinoSlides"
          @openGame="openGame($event)"
        />
      </template>
    </md-games-table-wrapper>

    <md-games-table-wrapper
      :title="$t('i18n_proximos')"
      img-url="/md/icon-stars.svg"
      :loading="getPreMatchLoading"
      see-more
      class="pt-3  transition"
      @fetchPage="concatPreMatchEvents()"
    >
      <template #filter>
        <md-select-sport v-if="getMetadataSports" :sports="getMetadataSports" />
      </template>

      <template #table>
        <md-games-list
          v-if="currentSettings"
          :events="getPreMatchEvents"
          :events-sport="getCurrentProvider"
          :tickets="getPreCashInTickets"
          hide-btn-text
          @selectBet="ticket => toggleTicket(ticket)"
        />
      </template>
    </md-games-table-wrapper>

    <md-modal
      v-if="currentSettings && currentSettings.popup_visit_site"
      v-model="fixedModal"
      close
    >
      <h5 class="ps-3 pt-3">
        {{ $t('i18n_atencao') }}
      </h5>
      <div
        class="d-flex flex-column justify-content-between"
      >
        <fut-html-render
          :content="currentSettings.popup_visit_site"
          class="px-4"
          justify-center
        />
        <md-button
          class="align-self-center mb-4"
          width="30%"
          @click="fixedModal = false"
        >
          {{ $t('i18n_continuar') }}
        </md-button>
      </div>
    </md-modal>

    <md-casino-game-modal
      v-model="iframe"
      :current-game="currentGame"
      :game-code="gameCode"
      :type-four-url="type4url"
      :iframe-html="iframeHtml"
      :iframe-game-url="iframeGameUrl"
    />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import MdCustomCarousel from '@/components/md/organisms/MdCustomCarousel.vue'
import MdAnimatedCarousel from '@/components/md/organisms/MdAnimatedCarousel.vue'
import MdGamesTableWrapper from '@/components/md/atoms/MdGamesTableWrapper.vue'
import MdSelectSport from '@/components/md/molecules/MdSelectSport.vue'
import MdGamesList from '@/components/md/organisms/MdGamesList.vue'
import windowWidth from '@/mixins.js/windowWidth.js'
import FutHtmlRender from '@/components/default/atoms/FutHtmlRender.vue'
import MdModal from '@/components/md/atoms/MdModal.vue'

export default {
  name: 'MdHome',
  components: {
    MdCustomCarousel,
    MdAnimatedCarousel,
    MdGamesTableWrapper,
    FutHtmlRender,
    MdModal,
    MdSelectSport,
    MdGamesList
  },
  mixins: [windowWidth],
  data () {
    return {
      fixedModal: false,
      iframeHtml: null,
      type4url: null,
      gameCode: null,
      iframeGameUrl: null,
      iframe: false,
      currentGame: null
    }
  },
  computed: {
    ...mapGetters({
      loggedInUser: 'loggedInUser',
      getFilters: 'pre-match/getFilters',
      currentSlides: 'settings/currentSlides',
      currentSettings: 'settings/currentSettings',
      getCurrentProvider: 'sports/getCurrentProvider',
      getPreMatchEvents: 'pre-match/getPreMatchEvents',
      getPreMatchLoading: 'pre-match/getPreMatchLoading',
      getMetadataSports: 'metadata-sports/getMetadataSports',
      getPreCashInTickets: 'tickets-pre-cash-in/getPreCashInTickets',
      getCasinoHeaderGames: 'metadata-casino/getCasinoHeaderGames',
      getPreMatchFeaturedEvents: 'pre-match-featured-events/getPreMatchFeaturedEvents'
    }),
    slides () {
      if (!this.currentSlides) {
        return null
      }

      if (Array.isArray(this.currentSlides)) {
        return this.currentSlides.map(slide => ({
          img: this.width > 768 ? slide.img : slide.img_mobile,
          link: slide.link
        }))
      }

      return Object.values(this.currentSlides).map(slide => ({
        img: this.width > 768 ? slide.img : slide.img_mobile,
        link: slide.link
      }))
    },
    featuredGames () {
      if (this.getPreMatchFeaturedEvents && this.getPreMatchFeaturedEvents.length > 0) {
        return this.getPreMatchFeaturedEvents[0].games
      }

      return []
    },
    slidesAndFeatured () {
      return this.featuredGames.length > 0 && this.width > 425 ? [...this.slides, ...this.featuredGames] : this.slides
    },
    casinoSlides () {
      if (!this.getCasinoHeaderGames || this.getCasinoHeaderGames.length < 1) {
        return null
      }

      return this.getCasinoHeaderGames.map(item => ({
        agregator: item.agregator,
        name: item.name,
        icon: item.icon,
        url: item.url,
        id: item.id
      }))
    }
  },
  async created () {
    await this.changeFilter({ sport: +this.$route.params.sportId })
    this.fetchPreMatchEvents()
    this.fetchSliders().then(() => {
      this.commitSlides(this.currentSlides)
    })
    this.fetchCasinoHeaderGames()
    this.fetchPreMatchFeaturedEvents(this.getFilters.sport)
    this.commitFeaturedBets(this.getPreMatchFeaturedEvents)

    if (this.$route.query.gameid) {
      this.fetchCasinoSingleGame(this.$route.query.gameid).then((res) => {
        this.currentGame = res
        this.iframe = true
      })
    }
  },
  mounted () {
    if (this.currentSettings && this.currentSettings.popup_visit_site && !this.loggedInUser) {
      this.fixedModal = true
    }
    // eslint-disable-next-line
    feather.replace()
  },
  methods: {
    ...mapActions({
      fetchCasinoSingleGame: 'casino/fetchCasinoSingleGame',
      concatPreMatchEvents: 'pre-match/concatPreMatchEvents',
      fetchPreMatchEvents: 'pre-match/fetchPreMatchEvents',
      commitSlides: 'settings/commitSlides',
      fetchSliders: 'settings/fetchSliders',
      changeFilter: 'pre-match/changeFilter',
      commitFeaturedBets: 'bets/commitFeaturedBets',
      toggleTicket: 'tickets-pre-cash-in/toggleTicket',
      fetchCasinoHeaderGames: 'metadata-casino/fetchCasinoHeaderGames',
      fetchPreMatchFeaturedEvents: 'pre-match-featured-events/fetchPreMatchFeaturedEvents',
      fetchCasinoGameIframeUrl: 'casino/fetchCasinoGameIframeUrl'
    }),
    openGame (game) {
      if (!game.agregator) {
        alert('Jogo sem agregador disponível')
        return
      }
      if (!this.loggedInUser && game.agregator === 'softgaming') {
        this.$router.push(this.localePath('/login'))
        return
      }
      this.iframe = true
      if (game.agregator === 'softgaming') {
        this.fetchCasinoGameIframeUrl({ game_id: game.id }).then((result) => {
          if (result.type === 2) {
            // this.gameCode = result.url
            this.iframeHtml = result.url
            const searchURL = new URL(window.location)
            searchURL.searchParams.set('gameid', game.id)
            window.history.pushState({}, '', searchURL)
            this.currentGame = game
            return
          } else if (result.type === 4) {
            this.type4url = result.url
            const searchURL = new URL(window.location)
            searchURL.searchParams.set('gameid', game.id)
            window.history.pushState({}, '', searchURL)
            this.currentGame = game
            return
          } else if (result.type === 5) {
            this.gameCode = result.url
            const searchURL = new URL(window.location)
            searchURL.searchParams.set('gameid', game.id)
            window.history.pushState({}, '', searchURL)
            this.currentGame = game
            return
          }
          this.iframeGameUrl = result.url
          const searchURL = new URL(window.location)
          searchURL.searchParams.set('gameid', game.id)
          window.history.pushState({}, '', searchURL)
          this.currentGame = game
        }).catch((err) => {
          console.error('casino new url fetching error', err)
          this.iframe = false
        })
      } else if (game.agregator === 'banana-live') {
        this.fetchCasinoBananaLiveIframeUrl({ game_id: game.id }).then((result) => {
          this.iframeGameUrl = result.url
          const searchURL = new URL(window.location)
          searchURL.searchParams.set('gameid', game.id)
          window.history.pushState({}, '', searchURL)
          this.currentGame = game
          // this.mountGameIframe(game, result.url)
        }).catch((err) => {
          console.error('casino new url fetching error', err)
          this.iframe = false
        })
      } else if (game.agregator === 'banana') {
        this.fetchCasinoBananaIframeUrl({ game_id: game.id }).then((result) => {
          this.iframeGameUrl = result.url
          const searchURL = new URL(window.location)
          searchURL.searchParams.set('gameid', game.id)
          window.history.pushState({}, '', searchURL)
          this.currentGame = game
          // this.mountGameIframe(game, result.url)
        }).catch((err) => {
          console.error('casino new url fetching error', err)
          this.iframe = false
        })
      } else if (game.agregator === 'fds') {
        this.fetchCasinoFdsIframeUrl({ game_id: game.id }).then((result) => {
          this.iframeGameUrl = result.url
          const searchURL = new URL(window.location)

          searchURL.searchParams.set('gameid', game.id)
          window.history.pushState({}, '', searchURL)
          this.currentGame = game
          // this.mountGameIframe(game, result.url)
        }).catch((err) => {
          console.error('casino new url fetching error', err)
          this.iframe = false
        })
      } else {
        this.currentGame = game
        const searchURL = new URL(window.location)

        searchURL.searchParams.set('gameid', game.id)
        window.history.pushState({}, '', searchURL)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.md-home {
  width: 100%;
  background: var(--md-bg-color);

  h1 {
    color: var(--md-font-color);
  }
}
</style>

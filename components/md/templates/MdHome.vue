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

    <!-- <md-highlight-games-mobile
      v-if="width <= 425 && featuredGames.length > 0"
      :items="featuredGames"
      :tickets="getPreCashInTickets"
      @selectBet="ticket => toggleTicket(ticket)"
    /> -->

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
          :events-sport="$route.params && $route.params.sportId ? +$route.params.sportId : 6046"
          :tickets="getPreCashInTickets"
          hide-btn-text
          @selectBet="ticket => toggleTicket(ticket)"
        />
      </template>
    </md-games-table-wrapper>

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
import { mapActions, mapState } from 'pinia'
import { useBaseStore } from '@/stores/base'
import { useCasinoStore } from '@/stores/casino'
import { useSettingsStore } from '@/stores/settings'
import { usePreMatchStore } from '@/stores/pre-match'
import { useMetadataCasinoStore } from '@/stores/metadata-casino'
import { useMetadataSportsStore } from '@/stores/metadata-sports'
import { useTicketsPreCashInStore } from '@/stores/tickets-pre-cash-in'

import MdCustomCarousel from '@/components/md/organisms/MdCustomCarousel'
import MdAnimatedCarousel from '@/components/md/organisms/MdAnimatedCarousel'
import MdGamesTableWrapper from '@/components/md/atoms/MdGamesTableWrapper'
import MdSelectSport from '@/components/md/molecules/MdSelectSport'
import MdCasinoGameModal from '@/components/md/molecules/MdCasinoGameModal'
import MdGamesList from '@/components/md/organisms/MdGamesList'

import windowWidth from '@/mixins.js/windowWidth.js'

export default {
  name: 'MdHome',
  components: {
    MdCustomCarousel,
    MdAnimatedCarousel,
    MdGamesTableWrapper,
    MdSelectSport,
    MdCasinoGameModal,
    MdGamesList
  },
  mixins: [windowWidth],
  data () {
    return {
      iframeHtml: null,
      type4url: null,
      gameCode: null,
      iframeGameUrl: null,
      iframe: false,
      currentGame: null
    }
  },
  computed: {
    ...mapState(useBaseStore, {
      loggedInUser: 'loggedInUser'
    }),
    ...mapState(useSettingsStore, {
      currentSlides: 'currentSlides',
      currentSettings: 'currentSettings'
    }),
    ...mapState(usePreMatchStore, {
      getPreMatchEvents: 'getPreMatchEvents',
      getPreMatchLoading: 'getPreMatchLoading',
      getFilters: 'getFilters'
    }),
    ...mapState(useMetadataSportsStore, {
      getMetadataSports: 'getMetadataSports'
    }),
    ...mapState(useTicketsPreCashInStore, {
      getPreCashInTickets: 'getPreCashInTickets'
    }),
    ...mapState(useMetadataCasinoStore, {
      getCasinoHeaderGames: 'getCasinoHeaderGames'
    }),
    // ...mapGetters({
    //   getPreMatchFeaturedEvents: 'pre-match-featured-events/getPreMatchFeaturedEvents'
    // }),
    slides () {
      if (!this.currentSlides) {
        return null
      }

      if (Array.isArray(this.currentSlides)) {
        return this.currentSlides.map(slide => ({
          img: this.width > 768 ? slide.img : slide.img_mobile,
          target_blank: slide.target_blank,
          link: slide.link
        }))
      }

      return Object.values(this.currentSlides).map(slide => ({
        img: this.width > 768 ? slide.img : slide.img_mobile,
        target_blank: slide.target_blank,
        link: slide.link
      }))
    },
    // featuredGames () {
    //   if (this.getPreMatchFeaturedEvents && this.getPreMatchFeaturedEvents.length > 0) {
    //     return this.getPreMatchFeaturedEvents[0].games
    //   }

    //   return []
    // },
    slidesAndFeatured () {
      return this.slides
    //   return this.featuredGames.length > 0 && this.width > 425 ? [...this.slides, ...this.featuredGames] : this.slides
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
    },
    isMobile () {
      return this.width <= 768
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
    // this.commitFeaturedBets(this.getPreMatchFeaturedEvents)

    if (this.$route.query.gameid) {
      this.fetchCasinoSingleGame(this.$route.query.gameid).then((res) => {
        this.currentGame = res
        this.iframe = true
      })
    }
  },
  mounted () {
    // eslint-disable-next-line
    feather.replace()
  },
  methods: {
    ...mapActions(useSettingsStore, {
      fetchSliders: 'fetchSliders',
      commitSlides: 'commitSlides'
    }),
    ...mapActions(usePreMatchStore, {
      changeFilter: 'changeFilter',
      fetchPreMatchEvents: 'fetchPreMatchEvents',
      concatPreMatchEvents: 'concatPreMatchEvents'
    }),
    ...mapActions(useCasinoStore, {
      fetchCasinoSingleGame: 'fetchCasinoSingleGame',
      fetchCasinoGameIframeUrl: 'fetchCasinoGameIframeUrl'
    }),
    ...mapActions(useMetadataCasinoStore, {
      fetchCasinoHeaderGames: 'fetchCasinoHeaderGames'
    }),
    ...mapActions(useTicketsPreCashInStore, {
      toggleTicket: 'toggleTicket'
    }),
    // ...mapActions({
    //   commitFeaturedBets: 'bets/commitFeaturedBets',
    //   fetchPreMatchFeaturedEvents: 'pre-match-featured-events/fetchPreMatchFeaturedEvents',
    // }),
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
        this.fetchCasinoGameIframeUrl({ game_id: game.id, mobile: this.isMobile }).then((result) => {
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
        this.fetchCasinoBananaLiveIframeUrl({ game_id: game.id, mobile: this.isMobile }).then((result) => {
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
        this.fetchCasinoBananaIframeUrl({ game_id: game.id, mobile: this.isMobile }).then((result) => {
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
        this.fetchCasinoFdsIframeUrl({ game_id: game.id, mobile: this.isMobile }).then((result) => {
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

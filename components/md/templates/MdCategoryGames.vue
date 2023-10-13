<template>
  <div class="md-category">
    <md-casino-header
      v-if="getCasinoFilteredGame"
      :name="getCasinoFilteredGame[0].name"
    />
    <div v-if="getCasinoFilteredGame">
      <div
        v-for="(item, idx) in getCasinoFilteredGame"
        :key="idx"
        class="category-body"
      >
        <md-casino-card-game
          v-for="(game, gameIdx) in item.games"
          :key="`img_game_${gameIdx}`"
          :game="game"
          :width="`calc(${100 / gamesPerRow}% - 10px)`"
          class="mb-3"
          @openGame="openGame(game)"
        />
      </div>
    </div>
    <md-view-more-btn
      :loading="getCasinoLoading"
      @viewMore="concat()"
    />

    <md-casino-game-modal
      v-model="iframe"
      :current-game="currentGame"
      :game-code="gameCode"
      :type-four-url="type4url"
      :iframe-html="iframeHtml"
      :iframe-game-url="iframeGameUrl"
    />

    <md-modal
      v-model="loginIframe"
      class="text-center"
      close
      width="auto"
      min-height="auto"
    >
      <form class="p-5 text-start">
        <h5>Realize seu login para acessar esse jogo!</h5>
        <div class="mb-3">
          <label for="userName" class="form-label">Email</label>
          <input
            id="userName"
            v-model="infos.email"
            type="text"
            class="form-control"
            placeholder="Username ou e-mail"
          >
        </div>
        <div class="mb-3">
          <label for="userPassword" class="form-label">{{ $t('i18n_senha') }}</label>
          <input
            id="userPassword"
            v-model="infos.password"
            type="password"
            class="form-control"
            autocomplete="current-password"
            :placeholder="$t('i18n_senha')"
          >
        </div>
        <div class="form-check mb-3">
          <input id="authCheck" type="checkbox" class="form-check-input">
          <label class="form-check-label" for="authCheck">
            {{ $t('i18n_lembre_se_de_mim') }}
          </label>
        </div>
        <div>
          <md-button
            padding="6px"
            class="me-2 mb-md-0"
            @click="logUser()"
          >
            Login
          </md-button>
          <NuxtLink :to="localePath('/register')" class="btn btn-outline-primary btn-icon-text">
            {{ $t('i18n_registrar') }}
          </NuxtLink>
        </div>
        <a class="d-block my-3 text-muted cursor-pointer" href="/login">
          {{ $t('i18n_esqueceu_a_sua_senha') }}
        </a>
      </form>
    </md-modal>
  </div>
</template>

<script>
import { mapState, mapActions } from 'pinia'
import { useBaseStore } from '@/stores/base'
import { useCasinoStore } from '@/stores/casino'
import { useLayoutStore } from '@/stores/layout'
import { useSettingsStore } from '@/stores/settings'
import { useCasinoFeaturedStore } from '@/stores/casino-featured'
import { useCasinoCategoryGamesStore } from '@/stores/casino-category-games'

import MdCasinoHeader from '@/components/md/atoms/MdCasinoHeader'
import MdCasinoGameModal from '@/components/md/molecules/MdCasinoGameModal'
import MdModal from '@/components/md/atoms/MdModal'
import MdButton from '@/components/md/atoms/MdButton'
import windowWidth from '@/mixins.js/windowWidth.js'

export default {
  name: 'MdCategoryGames',
  components: {
    MdCasinoHeader,
    MdCasinoGameModal,
    MdModal,
    MdButton
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
      iframeHtml: null,
      infos: {
        email: '',
        password: ''
      },
      type4url: null,
      gameCode: null,
      loginIframe: false,
      iframeGameUrl: null,
      iframe: false,
      currentGame: null,
      slug: '',
      page: 2
    }
  },
  computed: {
    ...mapState(useBaseStore, {
      loggedInUser: 'loggedInUser'
    }),
    ...mapState(useCasinoStore, {
      getCasinoLoading: 'getCasinoLoading'
    }),
    ...mapState(useSettingsStore, {
      currentSettings: 'currentSettings'
    }),
    ...mapState(useCasinoFeaturedStore, {
      getCasinoNew: 'getCasinoNew',
      getCasinoMostPlayedGames: 'getCasinoMostPlayedGames'
    }),
    ...mapState(useCasinoCategoryGamesStore, {
      getCasinoCategoryGames: 'getCasinoCategoryGames'
    }),
    // ...mapGetters({
    //   getLiveCasinoMostPlayedGames: 'live-casino-featured/getLiveCasinoMostPlayedGames',
    //   getLiveCasinoNew: 'live-casino-featured/getLiveCasinoNew',
    // }),
    getCasinoFilteredGame () {
      if (this.slug === 'mocked-most') {
        return this.live ? this.getLiveCasinoMostPlayedGames : this.getCasinoMostPlayedGames
      } else if (this.slug === 'mocked-new') {
        return this.live ? this.getLiveCasinoNew : this.getCasinoNew
      } else {
        return this.getCasinoCategoryGames
      }
    },
    gamesPerRow () {
      if (this.width < 427) {
        return 2
      } else if (this.width < 769) {
        return 3
      } else {
        return 5
      }
    }
  },
  mounted () {
    this.updateOptions({
      sidebar: true
    })

    this.slug = this.$route.params.categorySlug

    if (this.slug === 'mocked-most') {
      this.live ? this.fetchLiveCasinoMostPlayedGames() : this.fetchCasinoMostPlayedGames()
    } else if (this.slug === 'mocked-new') {
      this.live ? this.fetchLiveCasinoNewGames() : this.fetchCasinoNewGames()
    } else {
      console.log('uai')
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
    ...mapActions(useBaseStore, {
      login: 'login',
      authUser: 'authUser'
    }),
    ...mapActions(useLayoutStore, {
      updateOptions: 'updateOptions',
    }),
    ...mapActions(useCasinoStore, {
      fetchCasinoSingleGame: 'fetchCasinoSingleGame',
      fetchCasinoFdsIframeUrl: 'fetchCasinoFdsIframeUrl',
      fetchCasinoGameIframeUrl: 'fetchCasinoGameIframeUrl',
      fetchCasinoBananaIframeUrl: 'fetchCasinoBananaIframeUrl',
      fetchCasinoBananaLiveIframeUrl: 'fetchCasinoBananaLiveIframeUrl'
    }),
    ...mapActions(useCasinoFeaturedStore, {
      fetchCasinoNewGames: 'fetchCasinoNewGames',
      concatCasinoNewGames: 'concatCasinoNewGames',
      fetchCasinoMostPlayedGames: 'fetchCasinoMostPlayedGames',
      concatCasinoMostPlayedGames: 'concatCasinoMostPlayedGames'
    }),
    ...mapActions(useCasinoCategoryGamesStore, {
      fetchCasinoGamesByCategory: 'fetchCasinoGamesByCategory',
      concatCasinoGamesByCategory: 'concatCasinoGamesByCategory'
    }),
    // ...mapActions({
    //   fetchLiveCasinoMostPlayedGames: 'live-casino-featured/fetchLiveCasinoMostPlayedGames',
    //   concatLiveCasinoMostPlayedGames: 'live-casino-featured/concatLiveCasinoMostPlayedGames',
    //   fetchLiveCasinoNewGames: 'live-casino-featured/fetchLiveCasinoNewGames',
    //   concatLiveCasinoNewGames: 'live-casino-featured/concatLiveCasinoNewGames',
    // }),
    async logUser () {
      await this.login(this.infos)
      this.authUser().then(() => {
        window.location.reload()
      })
    },
    openGame (game) {
      console.log('opening this game', game)
      this.agregator = game.agregator
      this.iframeKey = game.id
      this.iframeHtml = null
      this.type4url = null
      if (!game.agregator) {
        alert('Jogo sem agregador disponível')
        return
      }
      // && game.agregator === 'softgaming'
      if (!this.loggedInUser) {
        this.loginIframe = true
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
    },
    concat () {
      if (this.slug === 'mocked-most') {
        this.live ? this.concatLiveCasinoMostPlayedGames(this.page++) : this.concatCasinoMostPlayedGames(this.page++)
      } else if (this.slug === 'mocked-new') {
        this.live ? this.concatLiveCasinoNewGames(this.page++) : this.concatCasinoNewGames(this.page++)
      } else {
        this.concatCasinoGamesByCategory({ categorySlug: this.slug, page: this.page++ })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.md-category {
  background: var(--md-bg-color);
}

.category-body {
  margin-top: 16px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
</style>

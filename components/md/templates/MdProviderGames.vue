<template>
  <div class="provider-games">
    <div v-if="getCasinoProviderGames">
      <md-casino-header
        :name="getCasinoProviderGames[0].name"
        class="mb-4"
      />
      <div
        v-for="(item, idx) in getCasinoProviderGames"
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

      <md-view-more-btn
        :loading="getCasinoLoading"
        @viewMore="getMoreGames()"
      />
    </div>

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
import { useCasinoProviderGamesStore } from '@/stores/casino-provider-games'

import MdCasinoHeader from '@/components/md/atoms/MdCasinoHeader'
import MdCasinoCardGame from '@/components/md/atoms/MdCasinoCardGame'
import MdCasinoGameModal from '@/components/md/molecules/MdCasinoGameModal'
import MdModal from '@/components/md/atoms/MdModal'
import MdButton from '@/components/md/atoms/MdButton'
import windowWidth from '@/mixins.js/windowWidth.js'

export default {
  name: 'MdProviderGames',
  components: {
    MdCasinoHeader,
    MdCasinoCardGame,
    MdButton,
    MdModal,
    MdCasinoGameModal
  },
  mixins: [windowWidth],
  data () {
    return {
      iframeHtml: null,
      infos: {
        email: '',
        password: ''
      },
      type4url: null,
      gameCode: null,
      iframeGameUrl: null,
      loginIframe: false,
      page: 2,
      iframe: false,
      currentGame: null,
      slug: ''
    }
  },
  computed: {
    ...mapState(useBaseStore, {
      loggedInUser: 'loggedInUser'
    }),
    ...mapState(useCasinoProviderGamesStore, {
      getCasinoLoading: 'getCasinoLoading',
      getCasinoProviderGames: 'getCasinoProviderGames'
    }),
    ...mapGetters({
      loggedInUser: 'loggedInUser',
    }),
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
  created () {
    this.slug = this.$route.params.providerSlug
    this.fetchCasinoGamesByProvider(this.slug)

    if (this.$route.query.gameid) {
      this.fetchCasinoSingleGame(this.$route.query.gameid).then((res) => {
        this.currentGame = res
        this.iframe = true
      })
    }
  },
  mounted () {
    this.page = 2
  },
  methods: {
    ...mapActions(useBaseStore, {
      login: 'login',
      authUser: 'authUser'
    }),
    ...mapActions(useCasinoStore, {
      fetchCasinoSingleGame: 'fetchCasinoSingleGame',
      fetchCasinoFdsIframeUrl: 'fetchCasinoFdsIframeUrl',
      fetchCasinoGameIframeUrl: 'fetchCasinoGameIframeUrl',
      fetchCasinoBananaIframeUrl: 'fetchCasinoBananaIframeUrl',
      fetchCasinoBananaLiveIframeUrl: 'fetchCasinoBananaLiveIframeUrl'
    }),
    ...mapActions(useCasinoProviderGamesStore, {
      fetchCasinoGamesByProvider: 'fetchCasinoGamesByProvider',
      concatCasinoGamesByProvider: 'concatCasinoGamesByProvider'
    }),
    async logUser () {
      await this.login(this.infos)

      this.authUser().then(() => {
        window.location.reload()
      })
    },
    getMoreGames () {
      this.page++
      this.concatCasinoGamesByProvider({ providerSlug: this.slug, page: this.page })
    },
    openGame (game) {
      if (!game.agregator) {
        alert('Jogo sem agregador disponível')
        return
      }
      if (!this.loggedInUser && game.agregator === 'softgaming') {
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
    }
  }
}
</script>

<style lang="scss" scoped>
.provider-games {
  background: var(--md-bg-color);
}

.category-body {
  margin-top: 16px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
</style>

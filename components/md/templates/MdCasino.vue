<template>
  <div id="casino" :key="$route.query.cat ? $route.query.cat : 'casino'">
    <md-custom-carousel
      :items="slides"
      :logo="currentSettings.logo"
      :full-width="!!currentSettings.slide_fullwith"
      :is-mobile="width <= 425"
    />
    <div v-if="getSearch">
      <md-casino-games-carousel
        v-if="getSearch && getCasinoSearchGames"
        comp-id="search"
        :items="getCasinoSearchGames[0].games"
        :title="getSearch"
        :subtitle="getCasinoSearchGames[0].games.length === 0 ? $t('i18n_nenhum_jogo_encontrado') : foundGames"
        icon="/md/icon-search.png"
        :slug="getCasinoSearchGames[0].games.length === 0 ? '' : getCasinoSearchGames[0].slug"
        @openGame="openGame($event)"
      />
    </div>
    <template v-else>
      <template v-if="getCasinoMostPlayedGames">
        <md-casino-games-carousel
          v-for="(mostPlayedGames, gidx) in getCasinoMostPlayedGames"
          :key="'most_game_carousel_' + gidx"
          comp-id="most_played"
          :items="mostPlayedGames.games"
          :title="currentSettings.name"
          :subtitle="$t('i18n_mais_jogados')"
          icon="/md/fire.png"
          :slug="mostPlayedGames.slug"
          @openGame="openGame($event)"
        />
      </template>
      <template v-if="getCasinoNew">
        <md-casino-games-carousel
          v-for="(newGames, gidx) in getCasinoNew"
          :key="'new_game_carousel_' + gidx"
          comp-id="new_games"
          :items="newGames.games"
          :title="$t('i18n_recomendados')"
          :subtitle="$t('i18n_novos_jogos')"
          icon="/md/fire.png"
          :slug="newGames.slug"
          @openGame="openGame($event)"
        />
      </template>
      <md-casino-games-carousel
        v-for="(item, idx) in getCasinoGames"
        :key="'game_carousel_' + idx"
        :comp-id="idx"
        :items="item.games"
        :subtitle="item.name"
        :slug="item.slug"
        @openGame="openGame($event)"
      />
    </template>
    <!-- <h1 class="text-white">opa</h1> -->
    <code>{{ iframeHtml }}</code>
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
          <n-link :to="localePath('/register')" class="btn btn-outline-primary btn-icon-text">
            {{ $t('i18n_registrar') }}
          </n-link>
        </div>
        <a class="d-block my-3 text-muted cursor-pointer" href="/login">
          {{ $t('i18n_esqueceu_a_sua_senha') }}
        </a>
      </form>
    </md-modal>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import MdCustomCarousel from '@/components/md/organisms/MdCustomCarousel.vue'
import MdCasinoGamesCarousel from '@/components/md/molecules/MdCasinoGamesCarousel.vue'
import MdCasinoGameModal from '@/components/md/molecules/MdCasinoGameModal.vue'
import MdModal from '@/components/md/atoms/MdModal.vue'
import MdButton from '@/components/md/atoms/MdButton.vue'
import windowWidth from '@/mixins.js/windowWidth.js'

export default {
  name: 'MdCasino',
  components: {
    MdCustomCarousel,
    MdCasinoGamesCarousel,
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
      iframe: false,
      loginIframe: false,
      currentGame: null
    }
  },
  computed: {
    ...mapGetters({
      getCasinoSearchGames: 'casino-search-games/getCasinoSearchGames',
      getSearch: 'casino-search-games/getSearch',
      getCasinoMostPlayedGames: 'casino-featured/getCasinoMostPlayedGames',
      getCasinoSliders: 'metadata-casino/getCasinoSliders',
      getCasinoNew: 'casino-featured/getCasinoNew',
      loggedInUser: 'loggedInUser',
      currentSettings: 'settings/currentSettings',
      getCasinoGames: 'casino/getCasinoGames'
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
    foundGames () {
      const amount = this.getCasinoSearchGames && this.getCasinoSearchGames[0] ? this.getCasinoSearchGames[0].games.length : 0

      return `${amount} ${amount === 1 ? this.$tc('i18n_jogos_encontrados', 1) : this.$tc('i18n_jogos_encontrados', 2)}`
    }
  },
  async created () {
    await this.updateOptions({
      sidebar: true
    })
    if (this.$route.query.gameid) {
      this.iframe = true
      this.fetchCasinoSingleGame(this.$route.query.gameid).then((res) => {
        if (res.agregator === 'softgaming' && !this.loggedInUser) {
          this.iframe = false
        }
        // console.log('GAME FETCHED', res)
        this.openGame(res)
      })
    }
    await this.fetchCasinoSliders()
    await this.fetchCasinoGames()
    await this.fetchCasinoProviders()
    await this.fetchCasinoMostPlayedGames()
    await this.fetchCasinoNewGames()
  },
  beforeUpdate () {
    this.updateOptions({
      sidebar: true
    })
  },
  methods: {
    ...mapActions({
      login: 'login',
      authUser: 'authUser',
      fetchCasinoSingleGame: 'casino/fetchCasinoSingleGame',
      fetchCasinoMostPlayedGames: 'casino-featured/fetchCasinoMostPlayedGames',
      fetchCasinoProviders: 'metadata-casino/fetchCasinoProviders',
      fetchCasinoSliders: 'metadata-casino/fetchCasinoSliders',
      fetchCasinoNewGames: 'casino-featured/fetchCasinoNewGames',
      fetchCasinoGames: 'casino/fetchCasinoGames',
      updateOptions: 'layout/updateOptions',
      fetchCasinoBananaLiveIframeUrl: 'casino/fetchCasinoBananaLiveIframeUrl',
      fetchCasinoBananaIframeUrl: 'casino/fetchCasinoBananaIframeUrl',
      fetchCasinoFdsIframeUrl: 'casino/fetchCasinoFdsIframeUrl',
      fetchCasinoGameIframeUrl: 'casino/fetchCasinoGameIframeUrl'
    }),
    async logUser () {
      await this.login(this.infos)

      this.authUser().then(() => {
        window.location.reload()
      })
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
#casino {
  width: 100%;
  background: var(--md-bg-color);
}
.form-control {
  border: 1px solid var(--md-comp-border-color);
  background: var(--md-comp-bg-color);
  color: var(--md-font-color);
  box-shadow: 0 0 0 0;
}
</style>

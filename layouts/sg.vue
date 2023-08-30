<template>
  <!-- <main v-if="false">
    <login-barrier
      v-if="currentSettings && currentSettings.login_barrier"
      :brand="currentSettings.logo"
      :current-settings="currentSettings"
      :logged-in-user="loggedInUser"
      has-login
    />

    <app-config v-if="currentSettings" :config="currentSettings" />

    <loader :condition="!currentSettings" />

    <sg-navbar
      :user="loggedInUser"
      :config="currentSettings"
      @showMenu="showMenu = true"
    />

    <sg-bottonbar-mobile
      @showMenu="showMenu = true"
    />
    <div class="d-flex">
      <div class="primary bg-dark padding-top-md">
        <div>
          <sg-sidebar-menu
            v-model="showMenu"
          />
        </div>
        <div class="bg-dark main-content">
          <div class="mt-5 mt-md-0 container d-flex justify-content-center" :class="{'content-sp': getOptions.sports, 'w-100': !getOptions.sports}">
            <div class="container-sg">
              <Nuxt />
            </div>
          </div>
        </div>

        <sg-footer />
      </div>
    </div>

    <LiveChatWidget
      :license="liveChat()"
      visibility="minimized"
    />
  </main> -->
  <main style="background-color: #333333">
    <style>
      :root{
      .VueCarousel-navigation{
      position: absolute !important;
      top: -37px !important;
      right: 0 !important;
      }
      .VueCarousel-navigation-button{
      background: var(--fut-background-lighter);
      color: white !important;
      font-weight: 700;
      border-radius: 50px;
      padding: 3px 15px;
      }
      }
    </style>
    <login-barrier
      v-if="currentSettings && currentSettings.login_barrier"
      :brand="currentSettings.logo"
      :current-settings="currentSettings"
      :logged-in-user="loggedInUser"
      has-login
    />

    <app-config v-if="currentSettings" :config="currentSettings" :sports-book="false" />

    <loader :condition="!currentSettings" />

    <sidebar-split-screen
      :nav-height="52"
      :left-section-width="showMenu ? 252 : 70"
      :mobile-left-section-open="showMenu"
    >
      <template #navbar>
        <sg-navbar
          :user="loggedInUser"
          :config="currentSettings"
          :register-loading="getOnboardingAuthLoading || false"
          :register-errors="getOnboardingAuthErrors"
          :most-played-games="getCasinoMostPlayedGames ? getCasinoMostPlayedGames[0] : null"
          :search-response="getCasinoSearchGames ? getCasinoSearchGames[0] : null"
          :reset-loading="getOnboardingAuthLoading"
          :reset-response="resetResponseObj"
          :reset-errors="getOnboardingAuthErrors"
          @resetSubmit="payload => resetSubmit(payload)"
          @searchGame="payload => searchGames(payload)"
          @logout="logout"
          @login="payload => logUser(payload)"
          @authUser="cb => authUserBalance(cb)"
          @register="payload => register(payload)"
          @validateCpf="payload => validateCpf(payload)"
          @toggleMenu="showMenu = !showMenu"
          @cleanErrors="cleanErrors()"
        />
      </template>
      <template #leftSidebar>
        <sg-sidebar-menu
          :social="showMenu"
          :settings="currentSettings"
          @toggle="showMenu = !showMenu"
          @changeLanguage="changeLanguage($event)"
        />
      </template>
      <div class="bg-dark">
        <div class="d-flex justify-content-center w-100">
          <div class="container-sg">
            <div class="container px-1 px-md-5 mt-3 mt-md-5 mb-md-5">
              <Nuxt v-if="hasContent" />
            </div>
            <sg-footer
              v-if="currentSettings"
              :config="currentSettings"
              :curacao-key="getCuracaoToken"
              :curacao-func="getCuracaoTokenFunction"
            />
          </div>
        </div>
      </div>
    </sidebar-split-screen>

    <sg-modal
      v-model="popupModal"
      width="sm"
      close
    >
      <h3 class="ps-3 pt-3">
        {{ $t('i18n_atencao') }}
      </h3>
      <div class="d-flex flex-column justify-content-between">
        <fut-html-render
          :content="currentSettings.popup"
          class="px-4"
        />
        <md-button
          class="align-self-center mb-4"
          width="30%"
          @click="popupModal = false"
        >
          {{ $t('i18n_continuar') }}
        </md-button>
      </div>
    </sg-modal>

    <LiveChatWidget
      :license="liveChat()"
      visibility="minimized"
    />
    <div
      v-if="currentSettings && currentSettings.telegram_float"
      id="div_telegram"
      :class="currentSettings.telegram_float.telegram_position"
    >
      <a :href="currentSettings.telegram_float.telegram_link" target="_blank">
        <img height="60px" width="60px" src="/telegram.png">
      </a>
    </div>

    <intercom-chat-btn />
  </main>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { LiveChatWidget } from '@livechat/widget-vue/v2'
import dayjs from 'dayjs'
import AppConfig from '@/components/default/atoms/AppConfig.vue'
import Loader from '@/components/default/atoms/Loader.vue'
import LoginBarrier from '@/components/default/organisms/LoginBarrier.vue'
import sportradarTagManager from '@/mixins.js/sportradarTagManager.js'
import SgFooter from '@/components/sg/organisms/SgFooter.vue'
import SgNavbar from '@/components/sg/organisms/SgNavbar.vue'
import SgSidebarMenu from '@/components/sg/atoms/SgSidebarMenu.vue'
import SidebarSplitScreen from '@/components/layout/templates/SidebarSplitScreen.vue'
import SgModal from '@/components/sg/atoms/SgModal.vue'
import FutHtmlRender from '@/components/default/atoms/FutHtmlRender.vue'
import IntercomChatBtn from '@/components/default/atoms/IntercomChatBtn.vue'

export default {
  name: 'Sg',
  css: [
    '@/assets/layout/test'
  ],
  components: {
    Loader,
    AppConfig,
    LoginBarrier,
    SgNavbar,
    SgSidebarMenu,
    SgFooter,
    SidebarSplitScreen,
    LiveChatWidget,
    SgModal,
    FutHtmlRender,
    IntercomChatBtn
  },
  mixins: [sportradarTagManager],
  data () {
    return {
      showMenu: false,
      open: false,
      config: null,
      hasContent: true,
      resetResponseObj: null,
      resetResponse: [],
      modals: {
        popup: false,
        deposit: false,
        login: false,
        register: false,
        forgot: false,
        user: false,
        user_deposit: false
      }
    }
  },
  computed: {
    ...mapGetters({
      // todo refactor these methods
      loggedInUser: 'loggedInUser',
      currentSettings: 'settings/currentSettings',
      getOptions: 'layout/getOptions',
      currentAds: 'settings/currentAds',
      // * refactored
      getCuracaoToken: 'layout/getCuracaoToken',
      getCuracaoTokenFunction: 'layout/getCuracaoTokenFunction',
      getCasinoSearchGames: 'casino-search-games/getCasinoSearchGames',
      getCasinoMostPlayedGames: 'casino-featured/getCasinoMostPlayedGames',
      getOnboardingAuthErrors: 'onboarding-auth/getOnboardingAuthErrors',
      getOnboardingAuthLoading: 'onboarding-auth/getOnboardingAuthLoading'
    }),
    popupModal: {
      get () {
        return this.getPopupStatus
      },
      set (value) {
        this.updatePopupStatus(value)
      }
    }
  },
  created () {
    this.changeFilter({ date: dayjs().format('YYYY-MM-DD'), hour: null, page: null, sport: 6046, team: null })
  },
  mounted () {
    if (this.loggedInUser) {
      if (this.$nuxt.$route.path.includes('login') || this.$nuxt.$route.path.includes('register')) {
        this.hasContent = false
        window.location.replace('/')
        // this.$forceUpdate()
        // this.$nuxt.$loading.finish()
      }
    }
    this.fetchSettings()
    if (this.getCurrentApplicationType === 'sports' || this.getCurrentApplicationType === 'all') {
      if (this.$route.params.sportId) {
        this.fetchMetadataCountries(this.$route.params.sportId)
      }

      this.fetchMetadataSports(this.$route.params.sportId).then((result) => {
        if (this.$route.params.sportId) {
          this.fetchMetadataCountries(this.$route.params.sportId)
        } else if (result[0]) {
          this.fetchMetadataCountries(result[0].id)
        }
      })
    }
    if (!this.getCasinoMostPlayedGames) {
      this.fetchCasinoMostPlayedGames()
    }
    this.updateOverlay(false)
    this.$root.$on('toggleNav', () => {
      this.open = !this.open
    })
    if (process.env.MANUAL_POPUP === 'true' && !sessionStorage.getItem('popupopen')) {
      sessionStorage.setItem('popupopen', true)
      this.modals.popup = true
    }
  },
  beforeDestroy () {
    this.$root.$off('toggleNav')
  },
  /* eslint-disable-next-line */
  async fetch() {
    this.fetchSettings().then(() => {
      this.commitSettings(this.currentSettings)
    })

    this.fetchAds().then(() => {
      this.commitAds(this.currentAds)
    })
  },
  methods: {
    resetSubmit (email) {
      this.sendForgottenPasswordEmail({ email }).then(() => {
        this.resetResponse.push('Caso todos os dados estiverem corretos, você receberá um e-mail em breve.')
        this.resetResponseObj = { email: this.resetResponse }
      })
    },
    searchGames (term) {
      this.searchCasinoGames(term)
    },
    authUserBalance (cb) {
      this.authUser().finally(() => {
        cb()
      })
    },
    logUser (payload) {
      this.login(payload).then(() => {
        this.authUser().then(() => {
          window.location.replace('/')
        })
      })
    },
    register (payload) {
      this.registerUser(payload.payload).then(() => {
        this.authUser().then((data) => {
          payload.cb()
          this.updatePopupStatus(true)
          this.srtmRegistrationFinished(data.id)
          this.$router.push(this.localePath('/'))
        })
      })
    },
    validateCpf (payload) {
      this.validateUserCpf(payload.doc).then((result) => {
        payload.cb(result)
      })
    },
    liveChat () {
      return process.env.LIVECHAT + ''
    },
    openDepositModal () {
      this.modals.deposit = true
    },
    openForgotModal () {
      this.modals.forgot = true
    },
    ...mapActions({
      // todo refactor this actions
      registerUser: 'onboarding-auth/registerUser',
      authUser: 'authUser',
      login: 'login',
      logout: 'logout',
      updateOverlay: 'layout/updateOverlay',
      commitSettings: 'settings/commitSettings',
      validateUserCpf: 'onboarding-auth/validateUserCpf',
      // * refactored
      fetchAds: 'settings/fetchAds',
      changeFilter: 'pre-match/changeFilter',
      sendForgottenPasswordEmail: 'onboarding-auth/sendForgottenPasswordEmail',
      fetchCasinoMostPlayedGames: 'casino-featured/fetchCasinoMostPlayedGames',
      searchCasinoGames: 'casino-search-games/searchCasinoGames',
      fetchSettings: 'settings/fetchSettings',
      fetchMetadataSports: 'metadata-sports/fetchMetadataSports',
      fetchMetadataCountries: 'metadata-countries/fetchMetadataCountries',
      fetchPreMatchLeaguesByCountry: 'pre-match-leagues/fetchPreMatchLeaguesByCountry',
      commitAds: 'settings/commitAds',
      updatePopupStatus: 'layout/updatePopupStatus'
    }),
    changeLanguage (lang) {
      this.$i18n.setLocale(lang)
    },
    cleanErrors () {
      this.$store.commit('onboarding-auth/SET_ERRORS', null)
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "@/assets/layout/breakpoints";
  #div_telegram {
    position:fixed;
    margin:30px;
    margin-top: 300px;
    margin-bottom: 15px;
    z-index:5000;
    bottom: 0px;
  }
  .left{
    left: 0;
  }
  .right{
    right: 0;
  }
  * {
    font-family: 'Exo', sans-serif;
    ::-webkit-scrollbar {
      @include md {
        height: 10px;
      }
      height: 5px;
      border-radius: 5px;
      background-color: var(--fut-background-darkest);
    }
    ::-webkit-scrollbar-thumb {
      height: 10px;
      border-radius: 5px;
      background-color: var(--fut-secondary)
    }
  }

  .container-sg {
    width: 100%;
  }

  .spacing-top{
    padding-top: 110px;
  }
  .padding-top-md{
    padding-top: 1px;
    @include md {
      padding-top: 115px;
    }
  }
  .content-fb {
    width: 100%;
    @include md {
      width: 70%;
    }
  }
  .sidebar-fb {
    width: 15%;
  }
  .VueCarousel-navigation{
    position: absolute !important;
    top: -37px !important;
    right: 0 !important;
    .VueCarousel-navigation-button{
      background: var(--fut-background-lighter);
      color: white !important;
      font-weight: 700;
      border-radius: 50px;
      padding: 3px 15px;
    }
  }
</style>

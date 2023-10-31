<template>
  <main style="background-color: #333333">
    <component :is="'style'">
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
    </component>
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
          v-model="showCad"
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
              <slot v-if="hasContent" />
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
import { mapState, mapActions } from 'pinia'
import { useBaseStore } from '@/stores/base'
import { useLayoutStore } from '@/stores/layout'
import { useSettingsStore } from '@/stores/settings'
import { useOnboardingAuthStore } from '@/stores/onboarding-auth'
import { useCasinoFeaturedStore } from '@/stores/casino-featured'
import { useCasinoSearchGamesStore } from '@/stores/casino-search-games'

import { LiveChatWidget } from '@livechat/widget-vue'
import dayjs from 'dayjs'
import AppConfig from '@/components/default/atoms/AppConfig'
import MdButton from '@/components/md/atoms/MdButton'
import Loader from '@/components/default/atoms/Loader'
import LoginBarrier from '@/components/default/organisms/LoginBarrier'
import SgFooter from '@/components/sg/organisms/SgFooter'
import SgNavbar from '@/components/sg/organisms/SgNavbar'
import SgSidebarMenu from '@/components/sg/atoms/SgSidebarMenu'
import SidebarSplitScreen from '@/components/layout/templates/SidebarSplitScreen'
import SgModal from '@/components/sg/atoms/SgModal'
import FutHtmlRender from '@/components/default/atoms/FutHtmlRender'
import IntercomChatBtn from '@/components/default/atoms/IntercomChatBtn'
import sportradarTagManager from '@/mixins.js/sportradarTagManager.js'

export default {
  name: 'Sg',
  css: [
    '@/assets/layout/test'
  ],
  components: {
    Loader,
    AppConfig,
    MdButton,
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
      showCad: false,
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
    ...mapState(useBaseStore, {
      loggedInUser: 'loggedInUser'
    }),
    ...mapState(useLayoutStore, {
      getOptions: 'getOptions',
      getPopupStatus: 'getPopupStatus',
      getCuracaoToken: 'getCuracaoToken',
      getCuracaoTokenFunction: 'getCuracaoTokenFunction'
    }),
    ...mapState(useSettingsStore, {
      currentAds: 'currentAds',
      currentSettings: 'currentSettings'
    }),
    ...mapState(useOnboardingAuthStore, {
      getOnboardingAuthErrors: 'getOnboardingAuthErrors',
      getOnboardingAuthLoading: 'getOnboardingAuthLoading'
    }),
    ...mapState(useCasinoFeaturedStore, {
      getCasinoMostPlayedGames: 'getCasinoMostPlayedGames'
    }),
    ...mapState(useCasinoSearchGamesStore, {
      getCasinoSearchGames: 'getCasinoSearchGames',
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
    // this.clearTicketLoading()
    // this.changeFilter({ date: dayjs().format('YYYY-MM-DD'), hour: null, page: null, sport: 6046, team: null })
  },
  mounted () {
    if (this.$route.query.btag) {
      localStorage.setItem('btag', this.$route.query.btag)

      if (!this.loggedInUser) {
        this.showCad = true
      }
    }

    if (this.$route.query.ref) {
      localStorage.setItem('ref', this.$route.query.ref)
    }

    if (this.loggedInUser) {
      if (this.$route.path.includes('login') || this.$route.path.includes('register')) {
        this.hasContent = false
        window.location.replace('/')
        // this.$forceUpdate()
        // this.$loading.finish()
      }
    }

    this.fetchSettings()

    if (!this.getCasinoMostPlayedGames) {
      this.fetchCasinoMostPlayedGames()
    }

    this.updateOverlay(false)
    
    if (process.env.MANUAL_POPUP === 'true' && !sessionStorage.getItem('popupopen')) {
      sessionStorage.setItem('popupopen', true)
      this.modals.popup = true
    }
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
    ...mapActions(useBaseStore, {
      login: 'login',
      authUser: 'authUser',
      logout: 'logout'
    }),
    ...mapActions(useLayoutStore, {
      updateOverlay: 'updateOverlay',
      updatePopupStatus: 'updatePopupStatus'
    }),
    ...mapActions(useSettingsStore, {
      fetchAds: 'fetchAds',
      commitAds: 'commitAds',
      fetchSettings: 'fetchSettings',
      commitSettings: 'commitSettings'
    }),
    ...mapActions(useOnboardingAuthStore, {
      registerUser: 'registerUser',
      clearAuthErrors: 'clearAuthErrors',
      validateUserCpf: 'validateUserCpf',
      sendForgottenPasswordEmail: 'sendForgottenPasswordEmail'
    }),
    ...mapActions(useCasinoFeaturedStore, {
      fetchCasinoMostPlayedGames: 'fetchCasinoMostPlayedGames'
    }),
    ...mapActions(useCasinoSearchGamesStore, {
      searchCasinoGames: 'searchCasinoGames',
    }),
    // ...mapActions({
    //   clearTicketLoading: 'tickets-pre-cash-in/clearTicketLoading',
    //   changeFilter: 'pre-match/changeFilter',
    // }),
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
        localStorage.removeItem('btag')
        localStorage.removeItem('ref')

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
      const config = useRuntimeConfig()
      
      return config.public.LIVECHAT
    },
    openDepositModal () {
      this.modals.deposit = true
    },
    openForgotModal () {
      this.modals.forgot = true
    },
    changeLanguage (lang) {
      this.$i18n.setLocale(lang)
    },
    cleanErrors () {
      this.clearAuthErrors()
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

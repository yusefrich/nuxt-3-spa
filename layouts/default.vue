<template>
  <main class="fut-scrollbar">
    <loader :condition="!currentSettings" />
    <login-barrier
      v-if="currentSettings && currentSettings.login_barrier"
      :brand="currentSettings.logo"
      :current-settings="currentSettings"
      :logged-in-user="loggedInUser"
      has-login
      @logUser="logUser($event)"
    />
    <fut-overlay v-if="getOverlay" />
    <app-config v-if="currentSettings" :config="currentSettings" />
    <fut-navbar
      :casino-games="getCasinoHeaderGames"
      :casino-categories="getCasinoHeaderCategories"
      :current-settings="currentSettings"
      :logged-in-user="loggedInUser"
      :login-action="loginAction"
      :application-state-type="getCurrentApplicationType"
      @redirectProduct="redirectProduct()"
      @changeLanguage="changeLanguage($event)"
      @deposit="openDepositModal()"
      @forgot="openForgotModal()"
      @logUser="logUser($event)"
      @authUser="authUser()"
    />
    <div class="primary bg-dark padding-top-md">
      <fut-button
        v-if="casinoSidebarBtn"
        :class="['transition', 'd-md-none', 'btn', 'btn-block', 'btn-primary', 'btn-open-side', open?'btn-right':'btn-left', 'd-print-none']"
        @click="open = !open"
      >
        <font-awesome-icon v-if="!open" :icon="['fas', 'chevron-right']" />
        <font-awesome-icon v-if="open" :icon="['fas', 'chevron-left']" />
      </fut-button>
      <div class="bg-dark main-content d-flex">
        <div v-if="getOptions.sidebar" :class="['sidebar', 'transition', open?'open':'']">
          <fut-casino-sidebar v-if="getOptions.casino" :categories="getCasinoCategories" />
          <sidebar
            v-else
            :all-sports-data="getAllMetadataSports"
            :loading="getMetadataSportsLoading"
            :main-leagues="getPreMatchMainLeagues"
            :current-time="getFilters.hour"
            @fetchTimeFilter="time => fetchTimeFilter(time)"
          />
        </div>
        <div class="mx-0" :class="{ content: getOptions.sidebar, 'w-100': !getOptions.sidebar }">
          <div class="mobile-spacing" />
          <slot v-if="hasContent && currentSettings" />
          <div class="d-flex justify-content-center">
            <!-- <tickets
              v-if="getOptions.ticket && currentSettings"
              :submenu-type="currentSettings.bet_dynamic"
              :bet-max-value="+currentSettings.bet_limit_max"
              :bet-min-value="+currentSettings.bet_limit_min"
              :win-max-value="+currentSettings.win_limit_max"
              :loading="getPreCashInTicketsLoading"
              :free-bet-value="loggedInUser ? loggedInUser.free_bet : null"
              :errors="getPreCashInTicketsErrors"
              :tickets="getPreCashInTickets"
              :multiple="getMultipleTicket"
              :current-layout-style="getCurrentLayoutStyle"
              @submit="callCommitCashIn()"
              @clearAll="clearAll()"
              @updateMultipleTicket="payload => updateMultipleTicket(payload)"
              @acceptAllChanges="acceptTicketChanges()"
              @toggleTicket="ticket => toggleTicket(ticket)"
              @updateTicket="ticket => updateTicket(ticket)"
              @clearAllFreeBet="clearAllFreeBet()"
              @resetAllBets="resetAllBets()"
            /> -->
          </div>
        </div>
      </div>
      <footer-info :current-settings="currentSettings" />
      <footer-sponsor
        v-if="currentSettings"
        :curacao-iframe-src="currentSettings.seal"
        :curacao-key="getCuracaoToken"
        :curacao-func="getCuracaoTokenFunction"
        :current-settings="currentSettings"
      />
    </div>
    <fut-modal :open="modals.deposit" :title="$t('i18n_deposito', 1)" @onClose="()=>modals.deposit = false">
      <deposit
        v-if="currentSettings"
        :response="depositResponse"
        :deposit-limit-min="currentSettings.dp_limit_min"
        :loading="getBankLoading"
        :response-errors="getBankErrors"
        :available-methods="currentSettings.deposit_methods"
        @submit="payload => submitDeposit(payload)"
        @clearResponse="depositResponse = null"
      />
    </fut-modal>
    <fut-modal :open="modals.forgot" :title="$t('i18n_resetar_senha')" @onClose="()=>modals.forgot = false">
      <forgot
        @submitForgot="submitForgot($event)"
      />
    </fut-modal>
    <fut-modal
      v-if="currentSettings && currentSettings.popup"
      :title="$t('i18n_atencao')"
      :open="getPopupStatus"
      @onClose="()=>updatePopupStatus(false)"
    >
      <fut-html-render :content="currentSettings.popup" />
      <div class="text-center">
        <fut-button primary type="button" @click="updatePopupStatus(false)">
          {{ $t('i18n_continuar') }}
        </fut-button>
      </div>
    </fut-modal>
    <!-- <LiveChatWidget
      :license="liveChat()"
      visibility="minimized"
    /> -->
    <!-- <cookies-manager
      v-if="!getAcceptedCookies"
      current-layout="default"
      @acceptCookies="confirmCookies($event)"
    /> -->
    <div v-if="currentSettings && currentSettings.telegram_float" id="div_telegram" :class="currentSettings.telegram_float.telegram_position">
      <a :href="currentSettings.telegram_float.telegram_link" target="_blank">
        <img height="60px" width="60px" src="/telegram.png">
      </a>
    </div>

    <!-- <intercom-chat-btn /> -->
  </main>
</template>

<script>
import { mapActions, mapState } from 'pinia'
import { useLayoutStore } from '@/stores/layout'
import { useMetadataCasinoStore } from '@/stores/metadata-casino'
import { useBaseStore } from '@/stores/base'
import { useSettingsStore } from '@/stores/settings'
import { useOnboardingBankStore } from '@/stores/onboarding-bank'
import { useMetadataSportsStore } from '@/stores/metadata-sports'
import { usePreMatchMainLeaguesStore } from '@/stores/pre-match-main-leagues'
import { useTicketsPreCashInStore } from '@/stores/tickets-pre-cash-in'
import { usePreMatchStore } from '@/stores/pre-match'
import { useCookiesStore } from '@/stores/cookies'
import { useOnboardingAuthStore } from '@/stores/onboarding-auth'
import { useOnboardingThirdPtAuthStore } from '@/stores/onboarding-third-pt-auth'
// import { mapGetters, mapActions } from 'vuex'
import dayjs from 'dayjs'
// import { LiveChatWidget } from '@livechat/widget-vue/v2'
import FutNavbar from '@/components/default/molecules/FutNavbar'
import FutButton from '@/components/default/atoms/FutButton'
import FooterInfo from '@/components/default/molecules/FooterInfo'
import Sidebar from '@/components/default/atoms/Sidebar'
import FutCasinoSidebar from '@/components/default/atoms/FutCasinoSidebar'
import FutOverlay from '@/components/default/atoms/FutOverlay'
import AppConfig from '@/components/default/atoms/AppConfig'
import FooterSponsor from '@/components/default/molecules/FooterSponsor'
import Loader from '@/components/default/atoms/Loader'
import FutModal from '@/components/default/organisms/FutModal.vue'
import Deposit from '@/components/default/organisms/Deposit.vue'
import Forgot from '@/components/default/organisms/Forgot'
import LoginBarrier from '@/components/default/organisms/LoginBarrier'
// import sportradarTagManager from '@/mixins.js/sportradarTagManager.js'
// import Tickets from '@/components/default/organisms/Tickets'
import FutHtmlRender from '@/components/default/atoms/FutHtmlRender'
// import CookiesManager from '@/components/default/molecules/CookiesManager'
// import IntercomChatBtn from '@/components/default/atoms/IntercomChatBtn'

export default {
  name: 'Default',
  components: {
    // LiveChatWidget,
    Sidebar,
    FooterInfo,
    FooterSponsor,
    Loader,
    FutModal,
    Deposit,
    AppConfig,
    Forgot,
    FutOverlay,
    LoginBarrier,
    FutNavbar,
    FutHtmlRender,
    FutButton,
    FutCasinoSidebar,
    // Tickets,
    // CookiesManager,
    // IntercomChatBtn
  },
  // mixins: [sportradarTagManager],
  data () {
    return {
      loginAction: false,
      hasContent: true,
      open: false,
      config: null,
      depositResponse: null,
      modals: {
        popup: false,
        fixed_modal: false,
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
    ...mapState(useLayoutStore, {
      getCuracaoToken: 'getCuracaoToken',
      getCuracaoTokenFunction: 'getCuracaoTokenFunction',
      getCurrentApplicationType: 'getCurrentApplicationType',
      getPopupStatus: 'getPopupStatus',
      getOverlay: 'getOverlay',
      getOptions: 'getOptions',
      getCurrentLayoutStyle: 'getCurrentLayoutStyle'
    }),
    ...mapState(useMetadataCasinoStore, {
      getCasinoHeaderGames: 'getCasinoHeaderGames',
      getCasinoHeaderCategories: 'getCasinoHeaderCategories',
      getCasinoCategories: 'getCasinoCategories'
    }),
    ...mapState(useBaseStore, {
      loggedInUser: 'loggedInUser'
    }),
    ...mapState(useSettingsStore, {
      currentSettings: 'currentSettings'
    }),
    ...mapState(useOnboardingBankStore, {
      getBankLoading: 'getBankLoading',
      getBankErrors: 'getBankErrors'
    }),
    ...mapState(useMetadataSportsStore, {
      getMetadataSportsLoading: 'getMetadataSportsLoading',
      getAllMetadataSports: 'getAllMetadataSports'
    }),
    ...mapState(usePreMatchMainLeaguesStore, {
      getPreMatchMainLeagues: 'getPreMatchMainLeagues'
    }),
    ...mapState(usePreMatchStore, {
      getFilters: 'getFilters'
    }),
    ...mapState(useTicketsPreCashInStore, {
      getPreCashInTicketsLoading: 'getPreCashInTicketsLoading',
      getPreCashInTicketsErrors: 'getPreCashInTicketsErrors',
      getMultipleTicket: 'getMultipleTicket',
      getPreCashInTickets: 'getPreCashInTickets'
    }),
    ...mapState(useCookiesStore, {
      getAcceptedCookies: 'getAcceptedCookies'
    }),
    getCurrentUrl () {
      return this.$route.path
    },
    casinoSidebarBtn () {
      if (this.$route.path === '/casino' && !this.getOptions.casino) {
        return false
      }
      return true
    }
  },
  created () {
    this.changeFilter({ date: dayjs().format('YYYY-MM-DD'), hour: null, page: null, sport: 6046, team: null })
  },
  async mounted () {
    await this.fetchSettings()
    if (this.loggedInUser) {
      if (this.$nuxt.$route.path.includes('login') || this.$nuxt.$route.path.includes('register')) {
        this.hasContent = false
        window.location.replace('/')
        // this.$forceUpdate()
        // this.$nuxt.$loading.finish()
      }
    }
    this.fetchAds()
    if (!this.getCurrentUrl.includes('casino') && !this.getCurrentUrl.includes('user') && !this.getCurrentUrl.includes('promo')) {
      this.fetchPreMatchMainLeagues(this.$route.params.sportId)
      this.fetchAllMetadataSports()
    }
    if (this.getCurrentApplicationType === 'sports' || this.getCurrentApplicationType === 'all') {
      this.fetchCasinoHeaderGames()
      this.fetchCasinoHeaderCategories()
    }
    this.updateOverlay(false)
    if (this.getOptions.casino) {
      this.fetchCasinoCategories()
    }
    // this.$root.$on('toggleNav', () => {
    //   this.open = !this.open
    // })
    // this.$root.$on('clearBet', () => {
    //   this.clearOdds()
    //   this.open = false
    // })
    if (process.env.MANUAL_POPUP === 'true' && !sessionStorage.getItem('popupopen')) {
      sessionStorage.setItem('popupopen', true)
      this.modals.popup = true
    }
  },
  // beforeDestroy () {
  //   this.$root.$off('toggleNav')
  //   this.$root.$off('clearBet')
  // },
  methods: {
    callCommitCashIn () {
      this.commitCashIn()
    },
    redirectProduct () {
      this.fetchProductRedirectUrl().then((result) => {
        if (process.client) {
          if (result.data) {
            setTimeout(() => {
              window.open(result.data.data.url, '_blank')
            })
          }
        }
      })
    },
    changeLanguage (lang) {
      this.$i18n.setLocale(lang)
    },
    register (payload) {
      this.registerUser(payload).then(() => {
        this.authUser().then((data) => {
          this.srtmRegistrationFinished(data.id)
          this.$router.push(this.localePath('/'))
        })
      })
    },
    submitDeposit (payload) {
      this.fetchBankDeposits().then((deposits) => {
        this.postBankDeposit(payload).then((response) => {
          this.depositResponse = response.data
          if (deposits.length > 0) {
            this.srtmFirstDeposit(response.data.player_id, response.data.id, response.data.amount, 'R$')
          } else {
            this.srtmRecurringDeposit(response.data.player_id, response.data.id, response.data.amount, 'R$')
          }
        })
      })
    },
    liveChat () {
      return process.env.LIVECHAT + ''
    },
    openDepositModal () {
      this.clearBankErrors()
      this.modals.deposit = true
    },
    openForgotModal () {
      this.modals.forgot = true
    },
    ...mapActions(useOnboardingAuthStore, {
      registerUser: 'registerUser',
      sendForgottenPasswordEmail: 'sendForgottenPasswordEmail'
    }),
    ...mapActions(useOnboardingThirdPtAuthStore, {
      fetchProductRedirectUrl: 'fetchProductRedirectUrl'
    }),
    ...mapActions(useOnboardingBankStore, {
      clearBankErrors: 'clearBankErrors',
      postBankDeposit: 'postBankDeposit',
      fetchBankDeposits: 'fetchBankDeposits'
    }),
    ...mapActions(useMetadataCasinoStore, {
      fetchCasinoCategories: 'fetchCasinoCategories',
      fetchCasinoHeaderCategories: 'fetchCasinoHeaderCategories',
      fetchCasinoHeaderGames: 'fetchCasinoHeaderGames'
    }),
    ...mapActions(useBaseStore, {
      authUser: 'authUser',
      login: 'login'
    }),
    ...mapActions(useLayoutStore, {
      updateOverlay: 'updateOverlay',
      updatePopupStatus: 'updatePopupStatus'
    }),
    ...mapActions(usePreMatchStore, {
      fetchPreMatchEvents: 'fetchPreMatchEvents',
      changeFilter: 'changeFilter'
    }),
    ...mapActions(useSettingsStore, {
      commitSettings: 'commitSettings',
      commitAds: 'commitAds',
      fetchSettings: 'fetchSettings',
      fetchAds: 'fetchAds'
    }),
    ...mapActions(useMetadataSportsStore, {
      fetchAllMetadataSports: 'fetchAllMetadataSports'
    }),
    ...mapActions(usePreMatchMainLeaguesStore, {
      fetchPreMatchMainLeagues: 'fetchPreMatchMainLeagues'
    }),
    ...mapActions(useCookiesStore, {
      confirmCookies: 'confirmCookies'
    }),
    ...mapActions(useTicketsPreCashInStore, {
      commitCashIn: 'commitCashIn',
      clearAll: 'clearAll',
      updateMultipleTicket: 'updateMultipleTicket',
      acceptTicketChanges: 'acceptTicketChanges',
      toggleTicket: 'toggleTicket',
      clearAllFreeBet: 'clearAllFreeBet',
      resetAllBets: 'resetAllBets',
      updateTicket: 'updateTicket'
    }),
    async logUser (event) {
      console.log('log event being called', event)
      await this.login(event)
      this.authUser().then((data) => {
        this.srtmLogin(data.id)
        this.loginAction = true
        if (this.$nuxt.$route.path.includes('/casino')) {
          location.reload()
        }
      })
    },
    fetchTimeFilter (payload) {
      if (document.getElementById('nav-hoje-tab')) {
        document.getElementById('nav-hoje-tab').classList.add('active')
      }
      if (document.getElementById('nav-amanha-tab')) {
        document.getElementById('nav-amanha-tab').classList.remove('active')
      }
      if (document.getElementById('nav-todos-tab')) {
        document.getElementById('nav-todos-tab').classList.remove('active')
      }

      if (payload === 'all') {
        this.changeFilter({
          page: null,
          hour: null,
          date: dayjs().format('YYYY-MM-DD')
        })
        this.fetchPreMatchEvents()
        return
      }

      this.changeFilter({
        page: null,
        hour: payload
      })
      this.fetchPreMatchEvents()
    },
    submitForgot (payload) {
      this.sendForgottenPasswordEmail(payload).then(() => {
        this.modals.forgot = false
      }).catch((error) => {
        this.$toast.open({ message: error.response.data.errors.email[0], type: 'error' })
      })
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
    margin-bottom: 16px;
    z-index:5000;
    bottom: 0px;
  }
  .left{
    left: 0;
  }
  .right{
    right: 0;
  }
  .padding-top-md{
    padding-top: 65px;
    @media (min-width: 992px) {
      padding-top: 135px;
    }
  }
</style>

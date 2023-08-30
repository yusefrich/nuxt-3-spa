<template>
  <main>
    <loader :condition="!currentSettings" />
    <login-barrier
      v-if="currentSettings && currentSettings.login_barrier"
      :brand="currentSettings.logo"
      :current-settings="currentSettings"
      :logged-in-user="loggedInUser"
      has-login
    />
    <fut-overlay v-if="getOverlay" />
    <app-config v-if="currentSettings" :config="currentSettings" />
    <!-- //! navbar -->
    <nsx-navbar
      v-if="getOptions && !getOptions.raw"
      :class="['nav-nsx', 'transition', open?'open':'']"
      :sidebar="getOptions.sidebar"
      :casino-games="getCasinoHeaderGames"
      :casino-categories="getCasinoHeaderCategories"
      :loading="loading"
      :logged-in-user="loggedInUser"
      :current-settings="currentSettings"
      :user-bets="userBets"
      :searching="getPreMatchSearchEventsLoading"
      :found-games="getPreMatchSeachEvents"
      @searchGame="searchGame($event)"
      @redirectProduct="redirectProduct()"
      @changeLanguage="changeLanguage($event)"
      @deposit="()=>{modals.user = true; modals.user_deposit = true}"
      @forgot="openForgotModal()"
      @login="modals.login = true"
      @user="()=>{modals.user = true; modals.user_deposit = false; modals.doc = false}"
      @register="modals.register = true"
      @logUser="logUser($event)"
      @authUser="authUser()"
      @fetchUserBets="fetchUserBetsWrapper()"
    />
    <!-- //! body -->
    <div v-if="getOptions.raw">
      <div class="heading-title text-center">
        <img v-if="currentSettings" style="object-fit: contain" height="33px" width="100%" :src="currentSettings.logo">
      </div>
      <div class="heading-nav d-flex">
        <fut-button class="nsx-input fut-color-dynamic" to="/regras-gerais-slim" :class="{active: currentRoute('/regras-gerais-slim')}">
          {{ $t('i18n_regras_gerais') }}
        </fut-button>
        <fut-button class="nsx-input fut-color-dynamic" to="/privacidade-slim" :class="{active: currentRoute('/privacidade-slim')}">
          {{ $t('i18n_politica_de_privacidade') }}
        </fut-button>
        <fut-button class="nsx-input fut-color-dynamic" to="/aml-slim" :class="{active: currentRoute('/aml-slim')}">
          {{ $t('i18n_politica_aml') }}
        </fut-button>
        <fut-button class="nsx-input fut-color-dynamic" to="/cookies-slim" :class="{active: currentRoute('/cookies-slim')}">
          {{ $t('i18n_politica_de_cookies') }}
        </fut-button>
        <fut-button class="nsx-input fut-color-dynamic" to="/jogo-responsavel-slim" :class="{active: currentRoute('/jogo-responsavel-slim')}">
          {{ $t('i18n_jogo_responsavel') }}
        </fut-button>
        <fut-button class="nsx-input fut-color-dynamic" to="/depositos-e-saques-slim" :class="{active: currentRoute('/depositos-e-saques-slim')}">
          {{ $t('i18n_depositos_e_saques') }}
        </fut-button>
        <fut-button class="nsx-input fut-color-dynamic" to="/termos-e-condicoes-slim" :class="{active: currentRoute('/termos-e-condicoes-slim')}">
          {{ $t('i18n_termos_e_condicoes') }}
        </fut-button>
        <fut-button class="nsx-input fut-color-dynamic" to="/auto-exclusao-slim" :class="{active: currentRoute('/auto-exclusao-slim')}">
          {{ $t('i18n_auto_exclusion') }}
        </fut-button>
        <fut-button class="nsx-input fut-color-dynamic" to="/resolucao-de-disputas-slim" :class="{active: currentRoute('/resolucao-de-disputas-slim')}">
          {{ $t('i18n_disputs_resolution') }}
        </fut-button>
        <fut-button class="nsx-input fut-color-dynamic" to="/imparcialidade-slim" :class="{active: currentRoute('/imparcialidade-slim')}">
          {{ $t('i18n_method_impartiality') }}
        </fut-button>
        <fut-button class="nsx-input fut-color-dynamic" to="/kyc-slim" :class="{active: currentRoute('/kyc-slim')}">
          {{ $t('i18n_kyc_politcs') }}
        </fut-button>
        <fut-button class="nsx-input fut-color-dynamic" to="/pagamento-de-bonus-slim" :class="{active: currentRoute('/pagamento-de-bonus-slim')}">
          {{ $t('i18n_accounts_payments_bonus') }}
        </fut-button>
      </div>
      <div class="nsx-bg-white">
        <div class="container-fluid">
          <Nuxt v-if="hasContent" />
          <footer-nsx :current-settings="currentSettings" />
        </div>
      </div>
    </div>
    <div v-else class="primary bg-nsx spacing-nsx">
      <div class="bg-nsx d-flex overflow-hidden">
        <div v-if="getOptions.sidebar" :class="['sidebar-nsx', 'transition', open?'open':'']">
          <nsx-sidebar
            :casino-games="getCasinoHeaderGames"
            :casino-categories="getCasinoHeaderCategories"
            :current-settings="currentSettings"
            :sports="getMetadataSports"
            @changeLanguage="changeLanguage($event)"
            @getDynamicSports="getDynamic()"
          />
        </div>
        <div :class="[getOptions.sidebar ? 'content-nsx' : 'w-100', 'transition', open?'open':'']">
          <div class="content-height">
            <Nuxt v-if="hasContent" />
            <footer-nsx :current-settings="currentSettings" />
          </div>
        </div>
        <div class="ticket-nsx">
          <tickets-sidebar
            v-if="getOptions.ticket && currentSettings"
            :bet-max-value="+currentSettings.bet_limit_max"
            :user-bet-max-value="loggedInUser && loggedInUser.bet_limit_max ? loggedInUser.bet_limit_max : null"
            :bet-min-value="+currentSettings.bet_limit_min"
            :win-max-value="+currentSettings.win_limit_max"
            :loading="getPreCashInTicketsLoading"
            :free-bet-value="loggedInUser ? loggedInUser.free_bet : null"
            :errors="getPreCashInTicketsErrors"
            :tickets="getPreCashInTickets"
            :multiple="getMultipleTicket"
            :current-layout-style="getCurrentLayoutStyle"
            :livescore-id="showingField && getInplaySingleEvent && getInplaySingleEvent.livescore_id ? getInplaySingleEvent.livescore_id : null"
            :statscore-config="getStatscoreConfig"
            :user-bets="userBets"
            :cashout-loading="getloading"
            @submitCashout="cashout($event)"
            @submit="callback => cashIn(callback)"
            @clearAll="clearAll()"
            @updateMultipleTicket="payload => updateMultipleTicket(payload)"
            @acceptAllChanges="acceptTicketChanges()"
            @toggleTicket="ticket => toggleTicket(ticket)"
            @updateTicket="ticket => updateTicket(ticket)"
            @clearAllFreeBet="clearAllFreeBet()"
            @resetAllBets="resetAllBets()"
          />
        </div>
      </div>
    </div>
    <!-- //! modals -->
    <fut-modal-nsx
      close
      class="text-center"
      bg="transparent"
      :open="modals.popup"
      @onClose="()=>{ modals.popup = false; }"
      @onExit="()=>{ modals.popup = false; }"
    >
      <a target="_blank" href="https://betpix365.com.br/ptb/authentication/signup">
        <img style="border-radius: 10px;max-height: calc(100vh - 230px);object-fit:contain" src="/popup-mobile.png" height="100%" width="100%" alt="">
      </a>
    </fut-modal-nsx>
    <fut-modal-nsx
      v-if="!loggedInUser"
      :brand="currentSettings?currentSettings.logo:''"
      class="text-center"
      :open="modals.login"
      @onExit="()=>{ modals.login = false; }"
    >
      <div class="p-2">
        <h5 class="text-title-nsx">
          <span>{{ $t('i18n_junte_se_a_nos') }} <a :href="localePath('/register')" class="text-underline">{{ $t('i18n_clique_aqui') }}</a></span>
        </h5>
        <fut-login-nsx-mobile
          @forgot="()=>{modals.forgot = true; modals.login = false}"
          @logUser="logUser($event)"
        />
      </div>
    </fut-modal-nsx>
    <fut-modal-nsx
      v-if="loggedInUser && modals.user"
      :brand="currentSettings?currentSettings.logo:''"
      :open="modals.user"
      bg="white"
      brand-bg="var(--nsx-dark-0)"
      class="text-center"
      close
      @onExit="()=>{ modals.user = false; }"
      @onClose="()=>{ modals.user = false; }"
    >
      <nsx-user-dashboard
        :deposit="modals.user_deposit"
        :user-bets="userBets"
        :documents="modals.doc"
        :logged-in-user="loggedInUser"
        :auth-loading="getOnboardingAuthLoading"
        :loading="loading"
        :current-settings="currentSettings"
        :errors="getErrors"
        :bank-loading="getBankLoading"
        :bank-errors="getBankErrors"
        :deposit-response="depositResponse"
        :withdraw-response="withdrawResponse"
        :withdraws="withdraws"
        @submitDeposit="submitDeposit($event)"
        @submitWithdraw="submitWithdraw($event)"
        @fetchWithdraws="fetchWithdraws()"
        @cleanDepositResponse="depositResponse = null"
        @cleanWithdrawResponse="withdrawResponse = null"
        @cancelUserBonus="cancelUserBonus()"
        @fetchUserBets="fetchUserBetsWrapper"
        @authUser="authUser()"
        @updateUser="updateUser($event)"
        @updatePassword="updatePassword($event)"
        @clear="clear()"
        @clearBankErrors="clearBankErrors()"
      />
    </fut-modal-nsx>
    <fut-modal-nsx
      v-if="!loggedInUser"
      :brand="currentSettings?currentSettings.logo:''"
      :open="modals.register"
      bg="white"
      brand-bg="url(/img/ns_banner.png)"
      class="text-start"
      close
      @onExit="()=>{ modals.register = false; }"
      @onClose="()=>{ modals.register = false; }"
    >
      <nsx-register-form
        style="width: 95%"
        class="px-2"
        :current-settings="currentSettings"
        :errors="getOnboardingAuthErrors"
        :loading="getOnboardingAuthLoading"
        :user-data="getOnboardingAuthUserData"
        :address="getOnboardingAuthAddress"
        @validateCpf="validateCpf($event)"
        @searchAddress="searchAddress($event)"
        @register="data => register(data)"
        @cleanErrors="cleanErrors()"
      />
    </fut-modal-nsx>
    <fut-modal-nsx
      v-if="getCurrentLayoutStyle === 'oldBet365'"
      :brand="currentSettings?currentSettings.logo:''"
      :open="modals.forgot"
      width="300px"
      @onExit="()=>modals.forgot = false"
    >
      <div class="p-2">
        <p class="text-center">
          {{ $t('i18n_informe_seu_email_para') }}.
        </p>
        <nsx-forgot @submitForgot="submitForgot($event)" />
      </div>
    </fut-modal-nsx>
    <fut-modal-nsx
      v-if="currentSettings && currentSettings.popup"
      :title="$t('i18n_atencao')"
      :open="getPopupStatus"
      @onExit="()=>updatePopupStatus(false)"
    >
      <fut-html-render :content="currentSettings.popup" />
      <div class="text-center mb-3">
        <fut-button type="button" class="nsx-input bg-success" @click="updatePopupStatus(false)">
          {{ $t('i18n_continuar') }}
        </fut-button>
      </div>
    </fut-modal-nsx>
    <LiveChatWidget
      :license="liveChat()"
      visibility="minimized"
    />
    <cookies-manager
      v-if="!getAcceptedCookies"
      current-layout="nsx"
      @acceptCookies="confirmCookies($event)"
    />
    <div v-if="currentSettings && currentSettings.telegram_float" id="div_telegram" :class="currentSettings.telegram_float.telegram_position">
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
import NsxNavbar from '@/components/nsx/molecules/NsxNavbar'
import NsxSidebar from '@/components/nsx/atoms/NsxSidebar'
import FutOverlay from '@/components/default/atoms/FutOverlay'
import AppConfig from '@/components/default/atoms/AppConfig'
import Loader from '@/components/default/atoms/Loader.vue'
import NsxForgot from '@/components/nsx/organisms/NsxForgot.vue'
import LoginBarrier from '@/components/default/organisms/LoginBarrier.vue'
import FutModalNsx from '@/components/nsx/organisms/FutModalNsx.vue'
import FutLoginNsxMobile from '@/components/nsx/molecules/FutLoginNsxMobile'
import NsxRegisterForm from '@/components/nsx/molecules/NsxRegisterForm.vue'
import NsxUserDashboard from '@/components/nsx/organisms/NsxUserDashboard.vue'
import sportradarTagManager from '@/mixins.js/sportradarTagManager.js'
import FutButton from '@/components/default/atoms/FutButton'
import FutHtmlRender from '@/components/default/atoms/FutHtmlRender'
import TicketsSidebar from '@/components/nsx/organisms/TicketsSidebar'
import CookiesManager from '@/components/default/molecules/CookiesManager.vue'
import FooterNsx from '@/components/nsx/molecules/FooterNsx'
import IntercomChatBtn from '@/components/default/atoms/IntercomChatBtn.vue'

export default {
  name: 'Nsx',
  css: [
    '@/assets/layout/test'
  ],
  components: {
    LiveChatWidget,
    NsxUserDashboard,
    NsxRegisterForm,
    FutModalNsx,
    NsxForgot,
    FutLoginNsxMobile,
    NsxSidebar,
    Loader,
    AppConfig,
    FutOverlay,
    LoginBarrier,
    FooterNsx,
    NsxNavbar,
    FutButton,
    TicketsSidebar,
    FutHtmlRender,
    CookiesManager,
    IntercomChatBtn
  },
  mixins: [sportradarTagManager],
  data () {
    return {
      showingField: false,
      open: false,
      config: null,
      hasContent: true,
      modals: {
        doc: false,
        popup: false,
        deposit: false,
        login: false,
        register: false,
        forgot: false,
        user: false,
        user_deposit: false
      },
      depositResponse: null,
      withdrawResponse: null
    }
  },
  computed: {
    ...mapGetters({
      getOnboardingAuthLoading: 'onboarding-auth/getOnboardingAuthLoading',
      getCasinoHeaderGames: 'metadata-casino/getCasinoHeaderGames',
      getStatscoreConfig: 'layout/getStatscoreConfig',
      getInplaySingleEvent: 'inplay-single-event/getInplaySingleEvent',
      getCasinoHeaderCategories: 'metadata-casino/getCasinoHeaderCategories',
      loggedInUser: 'loggedInUser',
      currentSettings: 'settings/currentSettings',
      getPopupStatus: 'layout/getPopupStatus',
      getOptions: 'layout/getOptions',
      getOverlay: 'layout/getOverlay',
      getErrors: 'errors/getErrors',
      getOnboardingAuthErrors: 'onboarding-auth/getOnboardingAuthErrors',
      getOnboardingAuthUserData: 'onboarding-auth/getOnboardingAuthUserData',
      getPreCashInTicketsErrors: 'tickets-pre-cash-in/getPreCashInTicketsErrors',
      getCurrentLayoutStyle: 'layout/getCurrentLayoutStyle',
      getCasinoCategories: 'metadata-casino/getCasinoCategories',
      getPreCashInTicketsLoading: 'tickets-pre-cash-in/getPreCashInTicketsLoading',
      getPreCashInTickets: 'tickets-pre-cash-in/getPreCashInTickets',
      getMultipleTicket: 'tickets-pre-cash-in/getMultipleTicket',
      userBets: 'userBets',
      loading: 'load',
      getAcceptedCookies: 'cookies/getAcceptedCookies',
      getloading: 'onboarding-tickets/getloading',
      getPreMatchSeachEvents: 'pre-match-search-events/getPreMatchSeachEvents',
      getPreMatchSearchEventsLoading: 'pre-match-search-events/getPreMatchSearchEventsLoading',
      getBankDeposits: 'onboarding-bank/getBankDeposits',
      getBankErrors: 'onboarding-bank/getBankErrors',
      getBankLoading: 'onboarding-bank/getBankLoading',
      getMetadataSports: 'metadata-sports/getMetadataSports',
      getOnboardingAuthAddress: 'onboarding-auth/getOnboardingAuthAddress',
      getBankWithdraws: 'onboarding-bank/getBankWithdraws'
    }),
    withdraws () {
      if (this.getBankWithdraws !== null) {
        return this.getBankWithdraws.data
      }

      return []
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
    this.fetchAds()
    if (this.$route.path.includes('evento')) {
      this.showingField = false
    }
    if (this.$route.path.includes('aovivo')) {
      this.showingField = true
    }
    if (!this.applicationType('sports') || this.applicationType('casino')) {
      this.fetchCasinoHeaderGames()
      this.fetchCasinoHeaderCategories()
    }
    if (this.$route.query.doc) {
      this.modals.user = true
      this.modals.doc = true
    }
    this.updateOverlay(false)
    if (this.getOptions.casino) {
      this.fetchCasinoCategories()
    }
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
  methods: {
    cancelUserBonus () {
      this.sendCancelUserBonus({
        bonus: true
      }).then(() => {
        window.location.reload()
      })
    },
    redirectProduct () {
      this.fetchProductRedirectUrl().then((result) => {
        if (process.client) {
          setTimeout(() => {
            window.open(result.data.data.url, '_blank')
          })
          // this.$router.push(result)
        }
      })
    },
    changeLanguage (lang) {
      this.$i18n.setLocale(lang)
    },
    cashIn (callback) {
      const userBets = [...this.getPreCashInTickets]
      const multipleUserBet = Object.assign({}, this.getMultipleTicket)
      const callbackResponse = { tickets: userBets, multiple: multipleUserBet }
      this.commitCashIn().then(() => {
        callback(callbackResponse)
      })
    },
    fetchUserBetsWrapper () {
      this.fetchUserBets()
    },
    applicationType (term) {
      const config = '' + process.env.PRODUCT_CONFIG
      return config.includes(term)
    },
    register (payload) {
      this.registerUser(payload).then(() => {
        this.authUser().then((data) => {
          this.updatePopupStatus(true)
          this.srtmRegistrationFinished(data.id)
          this.$router.push(this.localePath('/'))
        })
      })
    },
    currentRoute (route) {
      return route === '' + this.$nuxt.$route.path || route + '/' === '' + this.$nuxt.$route.path
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
      changeFilter: 'pre-match/changeFilter',
      sendCancelUserBonus: 'onboarding-auth/sendCancelUserBonus',
      fetchProductRedirectUrl: 'onboarding-third-pt-auth/fetchProductRedirectUrl',
      fetchCasinoHeaderGames: 'metadata-casino/fetchCasinoHeaderGames',
      fetchCasinoHeaderCategories: 'metadata-casino/fetchCasinoHeaderCategories',
      updatePopupStatus: 'layout/updatePopupStatus',
      registerUser: 'onboarding-auth/registerUser',
      authUser: 'authUser',
      login: 'login',
      fetchUserBets: 'fetchUserBets',
      updateOverlay: 'layout/updateOverlay',
      commitSettings: 'settings/commitSettings',
      commitAds: 'settings/commitAds',
      fetchCasinoCategories: 'metadata-casino/fetchCasinoCategories',
      updateUser: 'updateUser',
      updatePassword: 'updatePassword',
      clear: 'errors/clear',
      clearAll: 'tickets-pre-cash-in/clearAll',
      clearAllFreeBet: 'tickets-pre-cash-in/clearAllFreeBet',
      updateMultipleTicket: 'tickets-pre-cash-in/updateMultipleTicket',
      acceptTicketChanges: 'tickets-pre-cash-in/acceptTicketChanges',
      toggleTicket: 'tickets-pre-cash-in/toggleTicket',
      resetAllBets: 'tickets-pre-cash-in/resetAllBets',
      updateTicket: 'tickets-pre-cash-in/updateTicket',
      commitCashIn: 'tickets-pre-cash-in/commitCashIn',
      fetchSettings: 'settings/fetchSettings',
      fetchAds: 'settings/fetchAds',
      confirmCookies: 'cookies/confirmCookies',
      sendForgottenPasswordEmail: 'onboarding-auth/sendForgottenPasswordEmail',
      validateUserCpf: 'onboarding-auth/validateUserCpf',
      commitCashOut: 'onboarding-tickets/commitCashOut',
      fetchPreMatchSearchEvents: 'pre-match-search-events/fetchPreMatchSearchEvents',
      fetchBankDeposits: 'onboarding-bank/fetchBankDeposits',
      postBankDeposit: 'onboarding-bank/postBankDeposit',
      fetchMetadataSports: 'metadata-sports/fetchMetadataSports',
      fetchAddressData: 'onboarding-auth/fetchAddressData',
      postBankWithdraw: 'onboarding-bank/postBankWithdraw',
      fetchBankWithdraws: 'onboarding-bank/fetchBankWithdraws',
      clearBankErrors: 'onboarding-bank/clearBankErrors'
    }),
    async logUser (event) {
      await this.login(event)
      this.authUser().then((data) => {
        this.srtmLogin(data.id)
        this.modals.login = false
      }).finally(() => {
        if (this.$nuxt.$route.path.includes('/casino')) {
          location.reload()
        }
      })
    },
    cleanErrors () {
      this.$store.commit('onboarding-auth/SET_ERRORS', null)
    },
    submitForgot (payload) {
      this.sendForgottenPasswordEmail(payload).then(() => {
        this.modals.forgot = false
      }).catch((error) => {
        this.$toast.open({ message: error.response.data.errors.email[0], type: 'error' })
      })
    },
    validateCpf (cpf) {
      this.validateUserCpf(cpf)
    },
    cashout (id) {
      this.commitCashOut(id).then(() => {
        location.reload()
      })
    },
    searchGame (term) {
      this.fetchPreMatchSearchEvents(term)
    },
    submitDeposit (payload) {
      this.postBankDeposit(payload).then(({ data }) => {
        if (this.getBankDeposits && this.getBankDeposits.length > 0) {
          this.srtmFirstDeposit(data.player_id, data.id, data.amount, 'R$')
        } else {
          this.srtmRecurringDeposit(data.player_id, data.id, data.amount, 'R$')
        }

        this.depositResponse = data
      })
    },
    submitWithdraw (payload) {
      this.postBankWithdraw(payload).then(({ data }) => {
        this.withdrawResponse = data
      })

      // location.reload()
    },
    fetchWithdraws () {
      this.fetchBankWithdraws()
    },
    getDynamic () {
      this.fetchMetadataSports()
    },
    searchAddress (cep) {
      this.fetchAddressData(cep)
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
  .spacing-nsx{
    padding-top: 50px;
    @include md{
      padding-top: 125px;
    }
  }
  .heading-title{
    background: var(--nsx-dark-0);
    padding: 0.5rem 0.5rem 0.8rem;
    text-align: center;
  }
  .nsx-bg-white{
    background: var(--nsx-dark-0);
    // color: var(--nsx-dark-2) !important;
    // min-height: 100vh;
    // *{
    //   color: var(--nsx-dark-2) !important;
    // }
  }
  .heading-nav{
    background-color: var(--nsx-gray-0);
    padding: 0.3rem;
    overflow: auto;
  }
  .nsx-input{
    background-color: var(--nsx-dark-3);
    margin-bottom: 0.2rem;
    color: #fff;
    margin-right: 0.2rem;
    border-radius: 5px !important;
    font-size: 14px !important;
    padding: 5px 7px;
  }
  .active{
    background-color: #ff8800;
  }
  .content-nsx{
    position: relative;
    left: 0;
    @include md{
      width: calc(100% - 250px);
    }
    @include lg {
      width: calc(100% - 450px);
    }
  }
  .content-nsx.open{
    position: relative;
    left: 70vw;
  }
  .content-height{
    @include md{
      // width: calc(100% - 250px);
      max-height: calc(100vh - 125px);
      overflow: auto;
    }
    &::-webkit-scrollbar-track {
      opacity: .3;
      border-radius: 0.125rem;
      background-color: var(--nsx-dark-7);
    }
    &::-webkit-scrollbar {
      opacity: .3;
      width: 13px;
    }
    &::-webkit-scrollbar-thumb {
      border: solid 2px var(--nsx-dark-7);
      opacity: .3;
      border-radius:50px;
      width: 5px;
      background-color: var(--nsx-dark-6);
    }
  }
</style>

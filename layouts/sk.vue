<template>
  <section v-if="currentSettings">
    <app-config
      v-if="currentSettings"
      :config="currentSettings"
    />

    <login-barrier
      v-if="currentSettings && currentSettings.login_barrier"
      :brand="currentSettings.logo"
      :current-settings="currentSettings"
      :logged-in-user="loggedInUser"
      has-login
      @logUser="logUser($event)"
    />

    <main id="sk-main">
      <sk-sidebar
        v-model="toggleSidebar"
        :logged-in-user="loggedInUser"
        :is-mobile="isMobile"
        :is-median-screen="isMedianScreen"
        :mobile-toogle-sidebar="mobileSidebar"
        :promos="getPromos"
        :casino-categories="casinoCategories"
        :pre-match-main-leagues="[]"
        :all-sports-data="[]"
        :dynamic-links="currentSettings.nav_bar"
        @changeLanguage="changeLanguage($event)"
        @modalWallet="modalWallet = true"
        @logout="modalLogout = true"
      />

      <div
        id="content-wrapper"
        :style="`
          min-width: calc(100vw - ${isMobile ? '0px' : toggleSidebar && !isMedianScreen ? '240px' : '60px'} - ${openTicket ? '370px' : '0px'}) !important;
          margin-left: ${toggleSidebar && isMedianScreen ? '60px' : '0'};
        `"
      >
        <sk-navbar
          :logged-in-user="loggedInUser"
          :logo="currentSettings.logo"
          :found-items="fetched"
          :is-mobile="isMobile"
          :not-found="notFound"
          :open-ticket="false"
          @toggleTicket="openTicket = !openTicket"
          @modalLogin="modalLogin = true"
          @modalRegister="modalRegister = true"
          @logout="modalLogout = true"
          @modalWallet="modalWallet = true"
          @searchSports="search('searchSports', $event)"
          @searchCasino="search('searchCasino', $event)"
          @cleanSearch="cleanSearch = true"
        />
        <div id="main-content">
          <slot />

          <sk-footer
            :current-settings="currentSettings"
            :curacao-iframe-src="currentSettings.seal"
            :curacao-key="getCuracaoToken"
            :curacao-func="getCuracaoTokenFunction"
            :is-mobile="isMobile"
            @changeLanguage="changeLanguage($event)"
          />
        </div>
      </div>

      <!-- <sk-ticket
        v-model="openTicket"
        :tickets="getPreCashInTickets"
        :multiple="getMultipleTicket"
        :logged-in-user="loggedInUser"
        :bet-max-value="+currentSettings.bet_limit_max"
        :bet-min-value="+currentSettings.bet_limit_min"
        :win-max-value="+currentSettings.win_limit_max"
        :loading="getPreCashInTicketsLoading"
        :free-bet-value="loggedInUser ? loggedInUser.free_bet : null"
        :errors="getPreCashInTicketsErrors"
        :user-bets="userBets"
        :logo="currentSettings.logo"
        @submit="makeBet()"
        @toggleTicket="ticket => toggleTicket(ticket)"
        @updateTicket="ticket => updateTicket(ticket)"
        @updateMultipleTicket="payload => updateMultipleTicket(payload)"
        @clearMultipleTicket="clearMultipleTicket()"
        @acceptAllChanges="acceptTicketChanges()"
        @modalRegister="modalRegister = true"
        @fetchUserBets="fetchUserBets()"
        @clearAll="clearAll()"
      /> -->
    </main>

    <sk-mobile-navbar
      v-if="isMobile"
      :mobile-sidebar="mobileSidebar"
      :mobile-ticket="openTicket"
      @toggleMobileSidebar="
        mobileSidebar = !mobileSidebar,
        openTicket = false
      "
      @toggleMobileTicket="
        openTicket = !openTicket,
        mobileSidebar = false
      "
      @redirect="
        mobileSidebar = false,
        openTicket = false
      "
    />

    <sk-modal-login
      v-model="modalLogin"
      @login="logUser($event)"
      @forgotPassword="modalLogin = false, modalForgot = true"
      @register="modalLogin = false, modalRegister = true"
    />

    <sk-modal-forgot-password
      v-model="modalForgot"
      :errors="getOnboardingAuthErrors"
      @sendForgottenPasswordEmail="sendEmail($event)"
    />

    <sk-modal-register
      v-model="modalRegister"
      :loading="getOnboardingAuthLoading"
      :current-settings="currentSettings"
      :valid-cpf="validCpf"
      :fetched-infos="registerInfos"
      :fetched-date="registerDate"
      :errors="getOnboardingAuthErrors"
      @modalLogin="modalLogin = true"
      @validateCpf="validateCpf($event)"
      @register="register($event)"
      @cleanErrors="cleanRegisterErrors()"
    />

    <sk-modal-wallet
      v-model="modalWallet"
      :current-settings="currentSettings"
      :deposit-response="depositResponse"
      :withdraw-response="withdrawResponse"
      :bank-errors="getBankErrors"
      :loading="getBankLoading"
      :logged-in-user="loggedInUser"
      :midnight-block="currentSettings.block_wd_midnight"
      @submitDeposit="deposit($event)"
      @submitWithdraw="withdraw($event)"
      @resetModal="resetModal()"
      @cleanErrors="cleanBankErrors()"
    />

    <sk-modal-logout
      v-model="modalLogout"
      @logout="doLogut()"
    />

    <sk-modal
      v-if="currentSettings && currentSettings.popup"
      :value="popup"
      max-height="70%"
      overflow
      close
      @close="()=>updatePopupStatus(false)"
    >
      <h5 class="text-center mt-3">
        {{ $t('i18n_atencao') }}
      </h5>
      <fut-html-render :content="currentSettings.popup" />
      <div class="text-center">
        <button
          class="popup-button mb-4"
          @click="updatePopupStatus(false)"
        >
          <span>{{ $t('i18n_continuar') }}</span>
        </button>
      </div>
    </sk-modal>

    <!-- <div
      v-if="currentSettings && currentSettings.telegram_float"
      id="div_telegram"
      :class="currentSettings.telegram_float.telegram_position"
      :style="isMobile ? 'margin-bottom: 80px !important;' : ''"
    >
      <a :href="currentSettings.telegram_float.telegram_link" target="_blank">
        <img height="60" width="60" src="/telegram.png">
      </a>
    </div> -->

    <intercom-chat-btn
      :bottom-position="isMobile ? '80px' : '20px'"
    />

    <LiveChatWidget
      :license="liveChat()"
      visibility="minimized"
    />
  </section>
</template>

<script>
import { mapActions, mapState } from 'pinia'
import { useBaseStore } from '@/stores/base'
import { usePromoStore } from '@/stores/promo'
import { useLayoutStore } from '@/stores/layout'
import { useCasinoStore } from '@/stores/casino'
import { useSettingsStore } from '@/stores/settings'
import { useOnboardingAuthStore } from '@/stores/onboarding-auth'
import { useOnboardingBankStore } from '@/stores/onboarding-bank'
import { useCasinoFeaturedStore } from '@/stores/casino-featured'
import { useCasinoSearchGamesStore } from '@/stores/casino-search-games'

import { LiveChatWidget } from '@livechat/widget-vue'
import AppConfig from '@/components/default/atoms/AppConfig'
import SkSidebar from '@/components/sk/organisms/SkSidebar'
import SkNavbar from '@/components/sk/organisms/SkNavbar'
// import SkTicket from '@/components/sk/organisms/SkTicket'
import SkModal from '@/components/sk/atoms/SkModal'
import SkModalLogin from '@/components/sk/molecules/SkModalLogin'
import SkModalLogout from '@/components/sk/molecules/SkModalLogout'
import SkModalForgotPassword from '@/components/sk/molecules/SkModalForgotPassword'
import SkModalRegister from '@/components/sk/molecules/SkModalRegister'
import SkFooter from '@/components/sk/organisms/SkFooter'
import SkModalWallet from '@/components/sk/organisms/SkModalWallet'
import SkMobileNavbar from '@/components/sk/organisms/SkMobileNavbar'
import FutHtmlRender from '@/components/default/atoms/FutHtmlRender'
import IntercomChatBtn from '@/components/default/atoms/IntercomChatBtn'
import LoginBarrier from '@/components/default/organisms/LoginBarrier'
import sportradarTagManager from '@/mixins.js/sportradarTagManager.js'
import windowWidth from '~/mixins.js/windowWidth'

export default {
  name: 'Sk',
  components: {
    AppConfig,
    SkSidebar,
    SkNavbar,
    // SkTicket,
    SkModal,
    SkModalLogin,
    SkModalLogout,
    SkModalForgotPassword,
    SkModalRegister,
    SkFooter,
    SkModalWallet,
    SkMobileNavbar,
    FutHtmlRender,
    IntercomChatBtn,
    LiveChatWidget,
    LoginBarrier
  },
  mixins: [sportradarTagManager, windowWidth],
  data () {
    return {
      toggleSidebar: true,
      modalLogin: false,
      modalRegister: false,
      modalForgot: false,
      modalWallet: false,
      depositResponse: null,
      withdrawResponse: null,
      cleanSearch: false,
      searchType: 'searchSports',
      validCpf: false,
      registerInfos: {
        document: '',
        name: '',
        last_name: ''
      },
      registerDate: {
        day: null,
        month: null,
        year: null
      },
      mobileSidebar: false,
      modalLogout: false,
      notFound: false
    }
  },
  computed: {
    ...mapState(useBaseStore, {
      loggedInUser: 'loggedInUser'
    }),
    ...mapState(useLayoutStore, {
      getPopupStatus: 'getPopupStatus',
      getCuracaoToken: 'getCuracaoToken',
      getCuracaoTokenFunction: 'getCuracaoTokenFunction'
    }),
    ...mapState(useSettingsStore, {
      currentSettings: 'currentSettings'
    }),
    ...mapState(useOnboardingAuthStore, {
      getOnboardingAuthErrors: 'getOnboardingAuthErrors',
      getOnboardingAuthLoading: 'getOnboardingAuthLoading'
    }),
    ...mapState(useOnboardingBankStore, {
      getBankErrors: 'getBankErrors',
      getBankLoading: 'getBankLoading',
      getBankDeposits: 'getBankDeposits'
    }),
    ...mapState(usePromoStore, {
      getPromos: 'getPromos',
    }),
    ...mapState(useCasinoStore, {
      getCasinoGames: 'getCasinoGames',
    }),
    ...mapState(useCasinoFeaturedStore, {
      getCasinoNew: 'getCasinoNew',
      getCasinoMostPlayedGames: 'getCasinoMostPlayedGames',
    }),
    ...mapState(useCasinoSearchGamesStore, {
      getCasinoSearchGames: 'getCasinoSearchGames',
    }),
    // ...mapGetters({
    //   userBets: 'userBets',
    //   getAllMetadataSports: 'metadata-sports/getAllMetadataSports',
    //   getPreMatchMainLeagues: 'pre-match-main-leagues/getPreMatchMainLeagues',
    //   getPreMatchSeachEvents: 'pre-match-search-events/getPreMatchSeachEvents'
    // }),
    openTicket: {
      get () {
        // return this.getSkOpenTicket
        return false
      },
      set (value) {
        this.changeSkOpenTicket(value)
      }
    },
    fetched () {
      if (this.cleanSearch || !this.getCasinoSearchGames || (this.getCasinoSearchGames && this.getCasinoSearchGames.length === 0)) {
        return []
      }

      if (this.searchType === 'searchSports') {
        return this.getPreMatchSeachEvents
      }

      return this.getCasinoSearchGames[0].games
    },
    isMobile () {
      return this.width <= 821
    },
    isMedianScreen () {
      return this.width > 821 && this.width <= 1366
    },
    casinoCategories () {
      const categories = []

      if (this.getCasinoMostPlayedGames && this.getCasinoMostPlayedGames.length) {
        categories.push({
          text: this.$t('i18n_mais_jogados'),
          icon: ['fab', 'hotjar'],
          slug: this.getCasinoMostPlayedGames[0].slug
        })
      }

      if (this.getCasinoNew && this.getCasinoNew.length) {
        categories.push({
          text: this.$t('i18n_novos_jogos'),
          icon: ['fas', 'rocket'],
          slug: this.getCasinoNew[0].slug
        })
      }

      if (this.getCasinoGames && this.getCasinoGames.length) {
        categories.push(...this.getCasinoGames.map((item) => {
          return {
            text: item.name.toLowerCase(),
            icon: ['fas', 'dice'],
            slug: item.slug
          }
        }))
      }

      return categories
    },
    popup: {
      get () {
        return this.getPopupStatus
      },
      set (value) {
        this.updatePopupStatus(value)
      }
    }
  },
  watch: {
    '$route.path' () {
      document.querySelector('#main-content').scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      })

      this.mobileSidebar = false
      // this.openTicket = false
    }
  },
  async created () {
    await this.fetchSettings()
    this.fetchPromos()
    this.fetchCasinoMostPlayedGames()
    this.fetchCasinoGames()
    this.fetchCasinoNewGames()
    // this.fetchPreMatchMainLeagues()
    // this.fetchAllMetadataSports()
  },
  mounted () {
    if (this.$route.query.btag) {
      localStorage.setItem('btag', this.$route.query.btag)

      if (!this.loggedInUser) {
        this.modalRegister = true
      }
    }
    if (this.$route.query.ref) {
      localStorage.setItem('ref', this.$route.query.ref)
    }
  },
  methods: {
    ...mapActions(useBaseStore, {
      login: 'login',
      authUser: 'authUser',
      logout: 'logout'
    }),
    ...mapActions(usePromoStore, {
      fetchPromos: 'fetchPromos'
    }),
    ...mapActions(useCasinoStore, {
      fetchCasinoGames: 'fetchCasinoGames'
    }),
    ...mapActions(useLayoutStore, {
      updatePopupStatus: 'updatePopupStatus'
    }),
    ...mapActions(useSettingsStore, {
      fetchSettings: 'fetchSettings'
    }),
    ...mapActions(useOnboardingAuthStore, {
      registerUser: 'registerUser',
      validateUserCpf: 'validateUserCpf',
      sendForgottenPasswordEmail: 'sendForgottenPasswordEmail',
      clearAuthErrors: 'clearAuthErrors'
    }),
    ...mapActions(useOnboardingBankStore, {
      postBankDeposit: 'postBankDeposit',
      postBankWithdraw: 'postBankWithdraw',
      fetchBankDeposits: 'fetchBankDeposits',
      fetchBankWithdraws: 'fetchBankWithdraws',
      clearBankErrors: 'clearBankErrors'
    }),
    ...mapActions(useCasinoFeaturedStore, {
      fetchCasinoNewGames: 'fetchCasinoNewGames',
      fetchCasinoMostPlayedGames: 'fetchCasinoMostPlayedGames'
    }),
    ...mapActions(useCasinoSearchGamesStore, {
      searchCasinoGames: 'searchCasinoGames',
    }),
    // ...mapActions({
    //   fetchUserBets: 'fetchUserBets',
    //   fetchAllMetadataSports: 'metadata-sports/fetchAllMetadataSports',
    //   fetchPreMatchMainLeagues: 'pre-match-main-leagues/fetchPreMatchMainLeagues',
    //   fetchPreMatchSearchEvents: 'pre-match-search-events/fetchPreMatchSearchEvents'
    // }),
    async logUser (infos) {
      await this.login(infos)

      this.authUser().then(() => {
        if (this.$route.query.from) {
          this.$router.push(this.localePath(this.$route.query.from))
        }

        this.modalLogin = false
      })
    },
    doLogut () {
      this.logout()
      this.$router.push(this.localePath('/'))
    },
    sendEmail (email) {
      this.sendForgottenPasswordEmail(email).then(() => {
        this.modalForgot = false
      })
    },
    changeLanguage (lang) {
      this.$i18n.setLocale(lang)
    },
    makeBet () {
      this.commitCashIn().then(() => {
        this.fetchUserBets()
      })
    },
    deposit (payload) {
      this.postBankDeposit(payload).then((response) => {
        this.depositResponse = response.data
        this.fetchBankDeposits()
        if (this.getBankDeposits.length > 0) {
          this.srtmFirstDeposit(response.data.player_id, response.data.id, response.data.amount, 'R$')
        } else {
          this.srtmRecurringDeposit(response.data.player_id, response.data.id, response.data.amount, 'R$')
        }
      })
    },
    resetModal () {
      this.depositResponse = null
      this.withdrawResponse = null
    },
    withdraw (payload) {
      this.postBankWithdraw(payload).then((result) => {
        this.withdrawResponse = result

        this.$toast.open({ message: 'Saque realizado com sucesso', type: 'success' })
        this.fetchBankWithdraws()
      })
    },
    search (type, value) {
      this.notFound = false
      this.searchType = type

      if (value === '') {
        this.cleanSearch = true
        return
      }

      this.cleanSearch = false

      if (this.searchType === 'searchSports') {
        this.fetchPreMatchSearchEvents(value).then((res) => {
          if (!res.length) {
            this.notFound = true
          }
        })

        return
      }

      this.searchCasinoGames(value)
    },
    validateCpf (doc) {
      this.validateUserCpf(doc).then((result) => {
        this.$toast.open({ message: 'CPF validado com sucesso', type: 'success' })
        this.registerDate.day = new Date(result.Result.DataNascimento).getDate() + ''
        this.registerDate.month = new Date(result.Result.DataNascimento).getMonth() + 1
        this.registerDate.year = new Date(result.Result.DataNascimento).getFullYear() + ''
        this.registerInfos.document = doc
        this.registerInfos.name = result.Result.NomePessoaFisica.split(' ')[0]
        this.registerInfos.last_name = result.Result.NomePessoaFisica.replace(result.Result.NomePessoaFisica.split(' ')[0], '')
        this.registerInfos.birthdate = `${this.date.day}/${this.date.month}/${this.date.year}`
        this.validCpf = true
      })
    },
    register (infos) {
      this.registerUser(infos).then((result) => {
        localStorage.removeItem('btag')
        localStorage.removeItem('ref')
        localStorage.setItem('token', 'bearer ' + result.data)
        this.authUser().then(() => {
          if (this.$route.query.from) {
            this.$router.push(this.localePath(this.$route.query.from))
          }
        })

        if (this.currentSettings && this.currentSettings.popup) {
          this.updatePopupStatus(true)
        }

        this.modalRegister = false
      })
    },
    cleanRegisterErrors () {
      this.clearAuthErrors()
    },
    cleanBankErrors () {
      this.clearBankErrors()
    },
    liveChat () {
      const config = useRuntimeConfig()
      
      return config.public.LIVECHAT
    }
  }
}
</script>

<style lang="scss" scoped>
#sk-main {
  width: 100%;
  height: 100vh;
  display: flex;

  #content-wrapper {
    display: flex;
    flex-direction: column;
    height: 100vh;
    background: var(--fut-background);

    #main-content {
      height: 100%;
      overflow-x: hidden;

      &::-webkit-scrollbar-track {
        background: transparent;
      }
      &::-webkit-scrollbar {
        width: 6px;
      }
      &::-webkit-scrollbar-thumb {
        border-radius: 3px;
        background: var(--fut-background-lightest);
      }
    }
  }

}
.popup-button {
  border: none;
  padding: 11.5px 20px;
  color: var(--fut-color-dynamic);
  background: var(--fut-primary);
  border-radius: .25rem;

  span {
    font-weight: 600;
    font-size: 1rem;
  }

  &:hover {
    background: var(--fut-primary-darkest);
  }
  &:active {
    span {
      display: flex;
      transform: scale(.95);
    }
  }
}

#div_telegram {
  position:fixed;
  margin:30px;
  margin-top: 300px;
  margin-bottom: 16px;
  z-index:5000;
  bottom: 0px;
}

/*
Sk used variables

--fut-highlight
--fut-background-white-3
--fut-background-white-2
--fut-background-lightest-2
--fut-background-lighter
--fut-background
--fut-background-darkest
--fut-background-black
--fut-background-black-2
--fut-background-transparent
--fut-background-transparent-2
--fut-primary-lighter
--fut-primary
--fut-primary-darker
--fut-primary-darkest
--fut-primary-black
*/
</style>

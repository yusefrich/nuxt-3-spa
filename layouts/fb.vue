<template>
  <main>
    <fb-login-barrier
      v-if="currentSettings && currentSettings.login_barrier"
      :brand="currentSettings.logo"
      :current-settings="currentSettings"
      :logged-in-user="loggedInUser"
      has-login
      @logUser="logUser($event)"
    />
    <app-config v-if="currentSettings" :config="currentSettings" />
    <loader :condition="!currentSettings" />

    <fb-navbar
      v-model="modals.login"
      :casino-games="getCasinoHeaderGames"
      :casino-categories="getCasinoHeaderCategories"
      :current-settings="currentSettings"
      :logged-in-user="loggedInUser"
      :is-mobile="isMobile"
      :all-sports="[]"
      @redirectProduct="redirectProduct()"
      @changeLanguage="changeLanguage($event)"
      @logUser="logUser($event)"
    />

    <div class="primary bg-custom-black">
      <div class="main-content">
        <div
          class="mx-0 d-flex content-filter-container content-full"
        >
          <div
            v-if="getOptions.sidebar && !getOptions.inplaySidebar"
            class="sidebar-left d-print-none"
          >
            <fb-pre-match-sidebar-wrapper
              :sport="sportId || +$route.params.sportId"
              :main-leagues="preMatchIntern ? [] : getPreMatchMainLeagues"
              :settings="currentSettings"
            >
              <div :class="{ 'fb-scroll max-height-sidebar': preMatchIntern }">
                <fb-sidebar-sports
                  v-if="currentSettings"
                  custom-id="normal"
                  :font="currentSettings.font"
                  :all-sports-data="getAllMetadataSports"
                  :loading-leagues="getPreMatchLeaguesLoading"
                  :selected-group-ids="getPreMatchGroupedIds"
                  :gamelist-id="'sidebarList'"
                  @selectedGroupEvents="payload => updateEventsGroup(payload)"
                  @updateLeagues="updateMainLeague($event)"
                />
                <fb-sidebar-sports
                  v-if="currentSettings"
                  custom-id="outright"
                  :outright="true"
                  :font="currentSettings.font"
                  :all-sports-data="getAllMetadataSports"
                  :loading-leagues="getPreMatchLeaguesLoading"
                  :selected-group-ids="getPreMatchGroupedIds"
                  :gamelist-id="'sidebarList'"
                  @selectedGroupEvents="payload => updateEventsGroup(payload)"
                  @updateLeagues="updateMainLeague($event)"
                />
              </div>
            </fb-pre-match-sidebar-wrapper>
          </div>
          <div
            class="mt-md-0 content-fb"
            :class="{
              'mt-60': !getOptions.inplaySidebar,
              'mt-95': getOptions.inplaySidebar
            }"
          >
            <fb-search-overlay v-if="searchOverlay" />
            <slot v-if="hasContent" /> <!-- substitute to Nuxt tag -->
            <div class="d-flex justify-content-center">
              <tickets
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
                @clearErrors="clearErrors()"
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
      </div>
      <fb-footer
        v-if="currentSettings && !preMatchIntern"
        :curacao-iframe-src="currentSettings.seal"
        :config="currentSettings"
        :curacao-key="getCuracaoToken"
        :curacao-func="getCuracaoTokenFunction"
        :is-mobile="isMobile"
      />
    </div>

    <fb-modal
      v-if="currentSettings && currentSettings.popup"
      :open="getPopupStatus"
      :max-width="700"
      @onClose="()=>updatePopupStatus(false)"
    >
      <h5 class="text-center">
        {{ $t('i18n_atencao') }}
      </h5>
      <fut-html-render :content="currentSettings.popup" />
      <div class="text-center">
        <fb-fut-button class="btn btn-success" @click="updatePopupStatus(false)">
          {{ $t('i18n_continuar') }}
        </fb-fut-button>
      </div>
    </fb-modal>

    <fb-modal
      v-if="currentSettings && currentSettings.popup_visit_site"
      :open="visitModal"
      :max-width="700"
      @onClose="visitModal = false"
    >
      <h5 class="text-center">
        {{ $t('i18n_atencao') }}
      </h5>
      <fut-html-render :content="currentSettings.popup_visit_site" justify-center />
      <div class="text-center">
        <fb-fut-button class="btn btn-success" @click="visitModal = false">
          {{ $t('i18n_continuar') }}
        </fb-fut-button>
      </div>
    </fb-modal>

    <LiveChatWidget
      :license="liveChat()"
      visibility="minimized"
    />
    <!-- <cookies-manager
      v-if="!getAcceptedCookies"
      current-layout="fb"
      @acceptCookies="confirmCookies($event)"
    /> -->
    <div
      v-if="currentSettings && currentSettings.telegram_float" id="div_telegram"
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
import { useCookiesStore } from '@/stores/cookies'
import { useSettingsStore } from '@/stores/settings'
import { useMetadataCasinoStore } from '@/stores/metadata-casino'
import { useOnboardingAuthStore } from '@/stores/onboarding-auth'
import { useMetadataSportsStore } from '@/stores/metadata-sports'
import { useTicketsPreCashInStore } from '@/stores/tickets-pre-cash-in'
import { usePreMatchMainLeagues } from '@/stores/pre-match-main-leagues'
import { useOnboardingThirdPtAuthStore } from '@/stores/onboarding-third-pt-auth'
import { usePreMatchGroupedEventsStore } from '@/stores/pre-match-grouped-events'

import { LiveChatWidget } from '@livechat/widget-vue'
import AppConfig from '@/components/default/atoms/AppConfig'
import Loader from '@/components/default/atoms/Loader'
import FbLoginBarrier from '@/components/fb/organisms/FbLoginBarrier'
import sportradarTagManager from '@/mixins.js/sportradarTagManager.js'
import FbNavbar from '@/components/fb/organisms/FbNavbar'
import FbFooter from '@/components/fb/organisms/FbFooter'
import FutHtmlRender from '@/components/default/atoms/FutHtmlRender'
import FbModal from '@/components/fb/organisms/FbModal'
import FbFutButton from '@/components/fb/atoms/FbFutButton'
import FbSearchOverlay from '@/components/fb/molecules/FbSearchOverlay'
import FbSidebarSports from '@/components/fb/organisms/FbSidebarSports'
import FbPreMatchSidebarWrapper from '@/components/fb/organisms/FbPreMatchSidebarWrapper'
// import CookiesManager from '@/components/default/molecules/CookiesManager'
import IntercomChatBtn from '@/components/default/atoms/IntercomChatBtn'
import Tickets from '@/components/default/organisms/Tickets'
import windowWidth from '~/mixins.js/windowWidth'

export default {
  name: 'Fb',
  css: [
    '@/assets/layout/test'
  ],
  components: {
    Loader,
    AppConfig,
    FbLoginBarrier,
    FbNavbar,
    FbFooter,
    Tickets,  
    LiveChatWidget,
    FutHtmlRender,
    FbModal,
    FbFutButton,
    FbSearchOverlay,
    // CookiesManager,
    IntercomChatBtn,
    FbSidebarSports,
    FbPreMatchSidebarWrapper
  },
  mixins: [sportradarTagManager, windowWidth],
  data () {
    return {
      open: false,
      openInplaySidebar: false,
      searchOverlay: false,
      hasContent: true,
      config: null,
      sportSelectionOpen: false,
      modals: {
        popup: false,
        deposit: false,
        login: false,
        register: false,
        forgot: false,
        user: false,
        user_deposit: false
      },
      sportId: null,
      visitModal: false
    }
  },
  computed: {
    ...mapState(useBaseStore, {
      loggedInUser: 'loggedInUser'
    }),
    ...mapState(useLayoutStore, {
      getOptions: 'getOptions',
      getOverlay: 'getOverlay',
      getPopupStatus: 'getPopupStatus',
      getCuracaoToken: 'getCuracaoToken',
      getStatscoreConfig: 'getStatscoreConfig',
      getCurrentLayoutStyle: 'getCurrentLayoutStyle',
      getCuracaoTokenFunction: 'getCuracaoTokenFunction',
      getCurrentSportsProvider: 'getCurrentSportsProvider',
      getCurrentApplicationType: 'getCurrentApplicationType'
    }),
    ...mapState(useCookiesStore, {
      getAcceptedCookies: 'getAcceptedCookies'
    }),
    ...mapState(useSettingsStore, {
      currentAds: 'currentAds',
      currentSettings: 'currentSettings'
    }),
    ...mapState(useMetadataCasinoStore, {
      getCasinoCategories: 'getCasinoCategories',
      getCasinoHeaderGames: 'getCasinoHeaderGames',
      getCasinoHeaderCategories: 'getCasinoHeaderCategories'
    }),
    ...mapState(usePreMatchMainLeagues, {
      getPreMatchMainLeagues: 'getPreMatchMainLeagues',
      getPreMatchLeaguesLoading: 'getPreMatchLeaguesLoading'
    }),
    ...mapState(useMetadataSportsStore, {
      getAllMetadataSports: 'getAllMetadataSports'
    }),
    ...mapState(usePreMatchGroupedEventsStore, {
      getPreMatchGroupedIds: 'getPreMatchGroupedIds'
    }),
    ...mapState(useTicketsPreCashInStore, {
      getMultipleTicket: 'getMultipleTicket',
      getInvalidMultiple: 'getInvalidMultiple',
      getPreCashInTickets: 'getPreCashInTickets',
      getPreCashInTicketsErrors: 'getPreCashInTicketsErrors',
      getPreCashInTicketsLoading: 'getPreCashInTicketsLoading',
    }),
    // ...mapGetters({
    //   // todo refactor these methods
    //   getInplaySingleEvent: 'inplay-single-event/getInplaySingleEvent',
    //   // * refactored
    //   getInplayEventsGroupedBySportAndCountry: 'inplay/getInplayEventsGroupedBySportAndCountry',
    //   getMetadataInplaySports: 'metadata-sports/getMetadataInplaySports',
    // }),
    onRegister () {
      return this.$route.path === '/register'
    },
    getCurrentUrl () {
      return this.$route.path
    },
    isMobile () {
      return this.width <= 821
    },
    preMatchIntern () {
      return this.$route.name.substring(0, this.$route.name.length - 5) === 'sport-sportId-evento-slug'
    },
    inplayIntern () {
      return this.$route.name.substring(0, this.$route.name.length - 5) === 'sport-sportId-aovivo-id'
    }
  },
  async mounted () {
    this.clearTicketLoading()
    await this.fetchSettings()

    if (this.$route.query.btag) {
      localStorage.setItem('btag', this.$route.query.btag)

      if (!this.loggedInUser && !this.$route.path.includes('/register')) {
        this.$router.push(this.localePath(`/register?from=${this.$route.fullPath}`))
      }
    }

    if (this.$route.query.ref) {
      localStorage.setItem('ref', this.$route.query.ref)
    }

    if (this.currentSettings && this.currentSettings.popup_visit_site && !this.loggedInUser) {
      this.visitModal = true
    }

    if (this.loggedInUser) {
      if (this.$route.path.includes('login') || this.$route.path.includes('register')) {
        this.hasContent = false
        window.location.replace('/')
      }
    }

    this.setInvalidMultiple(false)
    this.fetchAds()
    this.reopenSportSelection()

    if (
      !this.getCurrentUrl.includes('casino') &&
      !this.getCurrentUrl.includes('user') &&
      !this.getCurrentUrl.includes('promo')
    ) {
      this.fetchAllMetadataSports().then(() => {
        this.reopenSportSelection()
      })

      this.fetchPreMatchMainLeagues(this.$route.params.sportId)
    }

    if (this.getCurrentApplicationType === 'sports' || this.getCurrentApplicationType === 'all') {
      this.fetchCasinoHeaderGames()
      this.fetchCasinoHeaderCategories()
    }

    this.updateOverlay(false)
    
    if (process.env.MANUAL_POPUP === 'true' && !sessionStorage.getItem('popupopen')) {
      sessionStorage.setItem('popupopen', true)
      this.modals.popup = true
    }

    const currentParams = new URL(location.href).searchParams.get('games')

    this.updateEventsGroup(currentParams)
  },
  methods: {
    ...mapActions(useBaseStore, {
      login: 'login',
      authUser: 'authUser'
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
    ...mapActions(useCookiesStore, {
      confirmCookies: 'confirmCookies'
    }),
    ...mapActions(useMetadataCasinoStore, {
      fetchCasinoCategories: 'fetchCasinoCategories',
      fetchCasinoHeaderGames: 'fetchCasinoHeaderGames',
      fetchCasinoHeaderCategories: 'fetchCasinoHeaderCategories'
    }),
    ...mapActions(useOnboardingAuthStore, {
      registerUser: 'registerUser'
    }),
    ...mapActions(useOnboardingThirdPtAuthStore, {
      fetchProductRedirectUrl: 'fetchProductRedirectUrl'
    }),
    ...mapActions(usePreMatchGroupedEventsStore, {
      fetchPreMatchGroupedEvents: 'fetchPreMatchGroupedEvents'
    }),
    ...mapActions(usePreMatchMainLeagues, {
      fetchPreMatchMainLeagues: 'fetchPreMatchMainLeagues'
    }),
    ...mapActions(useMetadataSportsStore, {
      fetchAllMetadataSports: 'fetchAllMetadataSports'
    }),
    ...mapActions(useTicketsPreCashInStore, {
      clearAll: 'clearAll',
      clearErrors: 'clearErrors',
      commitCashIn: 'commitCashIn',
      toggleTicket: 'toggleTicket',
      resetAllBets: 'resetAllBets',
      updateTicket: 'updateTicket',
      clearAllFreeBet: 'clearAllFreeBet',
      clearTicketLoading: 'clearTicketLoading',
      setInvalidMultiple: 'setInvalidMultiple',
      acceptTicketChanges: 'acceptTicketChanges',
      updateMultipleTicket: 'updateMultipleTicket',
    }),
    reopenSportSelection () {
      if (this.sportSelectionOpen) {
        return
      }
      if (this.$route.query && this.$route.query.sref) {
        const el = document.getElementById(this.$route.query.sref)
        const el2 = document.getElementById(this.$route.query.cref)
        if (el) {
          el.click()
          this.sportSelectionOpen = true
        }
        if (el2) {
          el2.click()
          this.sportSelectionOpen = true
        }
      }
    },
    redirectProduct () {
      this.fetchProductRedirectUrl().then((result) => {
        if (process.client) {
          setTimeout(() => {
            window.open(result.data.data.url, '_blank')
          })
        }
      })
    },
    updateMainLeague (sportId) {
      this.sportId = sportId

      this.fetchPreMatchMainLeagues(sportId)
    },
    updateEventsGroup (group) {
      if (!group) {
        this.fetchPreMatchGroupedEvents([])
        return
      }

      this.fetchPreMatchGroupedEvents(('' + group).split('_'))
    },
    register (payload) {
      this.registerUser(payload).then(() => {
        this.authUser().then((data) => {
          this.srtmRegistrationFinished(data.id)
          this.$router.push(this.localePath('/'))
        })
      })
    },
    changeLanguage (lang) {
      this.$i18n.setLocale(lang)
    },
    applicationType (term) {
      const config = '' + process.env.PRODUCT_CONFIG
      return config.includes(term)
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
    callCommitCashIn () {
      this.commitCashIn()
    },
    async logUser (event) {
      await this.login(event)
      this.authUser().then(() => {
        if (this.$route.path.includes('/casino')) {
          location.reload()
        }
        if (this.getCurrentSportsProvider === 'upgaming') {
          // location.reload()
        }

        // location.reload()
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "@/assets/layout/breakpoints";
  .content-full {
    min-height: calc(100vh - 128px);
  }
  .max-height-sidebar {
    max-height: calc(100vh - 200px);
    overflow: auto;
  }
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
  .mt-103{
    margin-top: 103px;
  }
  .mt-56 {
    margin-top: 56px !important;
  }
  .spacing-top{
    padding-top: 110px;
  }
  .spacing-nsx{
    padding-top: 50px;
    @include md{
      padding-top: 125px;
    }
  }
  .padding-top-md{
    padding-top: 65px;
    @include md {
      padding-top: 115px;
    }
  }
  .content-fb {
    width: 100%;
  }
  .sidebar-left {
    width: 100%;
    max-width: 280px;
    display: none;
    @include md {
      display: block;
    }
  }
  .inplay-sidebar {
    max-width: 280px;
    width: 0;
    position: relative;
    padding-top: 72px;
    background: var(--fut-background-black);
    .inplay-sidebar-content{
      overflow: hidden;
      width: 100%;
      margin-top: 40px;
      @include md{
        margin-top: 0;
      }
    }
    .mobile-inplay-sidebar{
      background: var(--fut-background-lightest-2);
      border-bottom: 2px solid var(--fut-background-white);
      position: absolute;
      width: 100vw;
      left: 0;
      z-index: 1;
      top: 60px;
      .inplay-sidebar-toggle{
        background: var(--fut-background-darker);
        border: none;
        color: white;
        padding: 8px 13px;
      }
      .inplay-sidebar-title{
        font-size: 15px;
        padding-left: 10px;
      }
      @include md{
        display: none;
      }
    }
    @include md {
      padding-top: 0px;
      width: 100%;
    }
    &.open{
      position: fixed;
      width: 100vw;
      max-width: 100vw;
      height: 100vh;
      left: 0;
      z-index: 1;
    }
  }
  .sidebar-right {
    width: 100%;
    max-width: 280px;
    display: none;
    @include md {
      display: block;
    }

    &.scroll {
      max-height: calc(100vh - 128px);
      overflow: auto;
    }
  }
  @include _md{
    .content-filter-container{
      .sidebar-fb-filter{
        display: none;
      }
    }
  }
  .sidebar-fb-filter{
    width: 100%;
    @include md {
      width: 380px;
    }
  }
  .w-mobile {
    width: 0;
    @include md {
      width: 70%;
    }
  }
  .mt-60{
    margin-top: 60px;
  }
</style>

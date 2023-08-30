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
      :login.sync="modals.login"
      :casino-games="getCasinoHeaderGames"
      :casino-categories="getCasinoHeaderCategories"
      :current-settings="currentSettings"
      :logged-in-user="loggedInUser"
      @redirectProduct="redirectProduct()"
      @changeLanguage="changeLanguage($event)"
      @logUser="logUser($event)"
    />
    <div class="primary bg-custom-black">
      <div class="main-content">
        <div class="content-full mx-0 d-flex content-filter-container">
          <div v-if="getOptions.sidebar" class="sidebar-left d-print-none">
            <fb-pre-match-sidebar-wrapper class="fb-scroll max-height-sidebar" :sport="sportId || +$route.params.sportId" :main-leagues="getPreMatchMainLeagues" :settings="currentSettings">
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
            </fb-pre-match-sidebar-wrapper>
          </div>
          <div v-else-if="getOptions.inplaySidebar" class="inplay-sidebar transition d-print-none" :class="{open: openInplaySidebar}">
            <div class="mobile-inplay-sidebar transition">
              <fb-fut-button class="inplay-sidebar-toggle" @click="openInplaySidebar=!openInplaySidebar">
                <font-awesome-icon class="fut-color-dynamic" :icon="['fas', 'sliders-h']" />
              </fb-fut-button>
              <span class="text-white inplay-sidebar-title fut-color-dynamic">{{ $t('i18n_ao_vivo') }}</span>
            </div>
            <div class="inplay-sidebar-content transition">
              <fb-inplay-sidebar-sports
                v-if="currentSettings"
                :font="currentSettings.font"
                :sports="getInplayEventsGroupedBySportAndCountry"
                :inplay-sports="getMetadataInplaySports"
                :gamelist-id="'sidebarListInplay'"
              />
            </div>
          </div>
          <div class="mt-60 mt-md-0 content-fb" :class="{'mt-103': getOptions.inplaySidebar}">
            <fb-search-overlay v-if="searchOverlay" />
            <Nuxt v-if="hasContent" />
            <fb-tickets
              v-if="getOptions.ticket && currentSettings"
              :font="currentSettings.font"
              :reduced-naming-style="currentSettings.name_team === 0"
              :bet-slip-style="currentSettings.bet_sleep"
              :submenu-type="currentSettings.bet_dynamic"
              :bet-max-value="+currentSettings.bet_limit_max"
              :odds-max-value="+currentSettings.odd_limit_max"
              :bet-min-value="+currentSettings.bet_limit_min"
              :win-max-value="+currentSettings.win_limit_max"
              :loading="getPreCashInTicketsLoading"
              :free-bet-value="loggedInUser ? loggedInUser.free_bet : null"
              :logged-in-user="loggedInUser"
              :errors="getPreCashInTicketsErrors"
              :tickets="getPreCashInTickets"
              :multiple="getMultipleTicket"
              :invalid-multiple="getInvalidMultiple"
              class="d-md-none"
              @toggleSearchOverlay="searchOverlay = !searchOverlay"
              @acceptAllChanges="acceptTicketChanges()"
              @submit="callCommitCashIn()"
              @clearAll="clearAll()"
              @updateMultipleTicket="payload => updateMultipleTicket(payload)"
              @accepptAllChanges="acceptTicketChanges()"
              @toggleTicket="ticket => toggleTicket(ticket)"
              @updateTicket="ticket => updateTicket(ticket)"
              @clearAllFreeBet="clearAllFreeBet()"
              @resetAllBets="resetAllBets()"
              @openLogin="modals.login = true"
            />
          </div>
          <client-only>
            <div v-if="getOptions.ticket && currentSettings" class="d-md-block d-none sidebar-right text-white">
              <fb-tickets
                :bet-slip-style="currentSettings.bet_sleep"
                :font="currentSettings.font"
                :reduced-naming-style="currentSettings.name_team === 0"
                :statscore-config="getStatscoreConfig"
                :inplay-event="getInplaySingleEvent"
                :showing-field="getOptions.field"
                :submenu-type="currentSettings.bet_dynamic"
                :bet-max-value="+currentSettings.bet_limit_max"
                :bet-min-value="+currentSettings.bet_limit_min"
                :odds-max-value="+currentSettings.odd_limit_max"
                :win-max-value="+currentSettings.win_limit_max"
                :loading="getPreCashInTicketsLoading"
                :free-bet-value="loggedInUser ? loggedInUser.free_bet : null"
                :logged-in-user="loggedInUser"
                :errors="getPreCashInTicketsErrors"
                :tickets="getPreCashInTickets"
                :multiple="getMultipleTicket"
                :invalid-multiple="getInvalidMultiple"
                @submit="callCommitCashIn()"
                @acceptAllChanges="acceptTicketChanges()"
                @clearAll="clearAll()"
                @updateMultipleTicket="payload => updateMultipleTicket(payload)"
                @accepptAllChanges="acceptTicketChanges()"
                @toggleTicket="ticket => toggleTicket(ticket)"
                @updateTicket="ticket => updateTicket(ticket)"
                @clearAllFreeBet="clearAllFreeBet()"
                @resetAllBets="resetAllBets()"
                @openLogin="modals.login = true"
              />
              <div v-if="currentAds" class="mt-2 px-1">
                <div v-for="(ad, i) in currentAds" :key="'currentAdd_' + i">
                  <a :href="ad.link">
                    <img class="img-fluid" :src="ad.img">
                  </a>
                </div>
              </div>
            </div>
          </client-only>
        </div>
      </div>
      <fb-footer
        v-if="currentSettings"
        :curacao-iframe-src="currentSettings.seal"
        :config="currentSettings"
        :curacao-key="getCuracaoToken"
        :curacao-func="getCuracaoTokenFunction"
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
    <LiveChatWidget
      :license="liveChat()"
      visibility="minimized"
    />
    <cookies-manager
      v-if="!getAcceptedCookies"
      current-layout="fb"
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
import AppConfig from '@/components/default/atoms/AppConfig'
import Loader from '@/components/default/atoms/Loader.vue'
import FbLoginBarrier from '@/components/fb/organisms/FbLoginBarrier.vue'
import sportradarTagManager from '@/mixins.js/sportradarTagManager.js'
import FbNavbar from '@/components/fb/organisms/FbNavbar'
import FbFooter from '@/components/fb/organisms/FbFooter'
import FbTickets from '@/components/fb/organisms/FbTickets'
import FbSidebarSports from '@/components/fb/organisms/FbSidebarSports'
import FbInplaySidebarSports from '@/components/fb/organisms/FbInplaySidebarSports'
import FbPreMatchSidebarWrapper from '@/components/fb/organisms/FbPreMatchSidebarWrapper'
import FutHtmlRender from '@/components/default/atoms/FutHtmlRender'
import FbModal from '@/components/fb/organisms/FbModal.vue'
import FbFutButton from '@/components/fb/atoms/FbFutButton'
import FbSearchOverlay from '@/components/fb/molecules/FbSearchOverlay'
import CookiesManager from '@/components/default/molecules/CookiesManager.vue'
import IntercomChatBtn from '@/components/default/atoms/IntercomChatBtn.vue'

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
    FbTickets,
    LiveChatWidget,
    FbSidebarSports,
    FbPreMatchSidebarWrapper,
    FutHtmlRender,
    FbModal,
    FbFutButton,
    FbInplaySidebarSports,
    FbSearchOverlay,
    CookiesManager,
    IntercomChatBtn
  },
  mixins: [sportradarTagManager],
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
      sportId: null
    }
  },
  computed: {
    ...mapGetters({
      // todo refactor these methods
      loggedInUser: 'loggedInUser',
      currentAds: 'settings/currentAds',
      currentSettings: 'settings/currentSettings',
      getOptions: 'layout/getOptions',
      getInplaySingleEvent: 'inplay-single-event/getInplaySingleEvent',
      getOverlay: 'layout/getOverlay',
      // * refactored
      getCuracaoToken: 'layout/getCuracaoToken',
      getCurrentApplicationType: 'layout/getCurrentApplicationType',
      getCuracaoTokenFunction: 'layout/getCuracaoTokenFunction',
      getPopupStatus: 'layout/getPopupStatus',
      getCurrentSportsProvider: 'layout/getCurrentSportsProvider',
      getStatscoreConfig: 'layout/getStatscoreConfig',
      getInplayEventsGroupedBySportAndCountry: 'inplay/getInplayEventsGroupedBySportAndCountry',
      getCasinoHeaderGames: 'metadata-casino/getCasinoHeaderGames',
      getCasinoHeaderCategories: 'metadata-casino/getCasinoHeaderCategories',
      getMetadataInplaySports: 'metadata-sports/getMetadataInplaySports',
      getAllMetadataSports: 'metadata-sports/getAllMetadataSports',
      getPreMatchLeaguesLoading: 'pre-match-leagues/getPreMatchLeaguesLoading',
      getPreMatchMainLeagues: 'pre-match-main-leagues/getPreMatchMainLeagues',
      getCasinoCategories: 'metadata-casino/getCasinoCategories',
      getPreCashInTicketsLoading: 'tickets-pre-cash-in/getPreCashInTicketsLoading',
      getPreCashInTicketsErrors: 'tickets-pre-cash-in/getPreCashInTicketsErrors',
      getMultipleTicket: 'tickets-pre-cash-in/getMultipleTicket',
      getPreMatchGroupedIds: 'pre-match-grouped-events/getPreMatchGroupedIds',
      getPreCashInTickets: 'tickets-pre-cash-in/getPreCashInTickets',
      getInvalidMultiple: 'tickets-pre-cash-in/getInvalidMultiple',
      getAcceptedCookies: 'cookies/getAcceptedCookies'
    }),
    onRegister () {
      return this.$route.path === '/register'
    },
    getCurrentUrl () {
      return this.$route.path
    }
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
    this.setInvalidMultiple(false)
    this.fetchSettings()
    this.fetchAds()
    this.reopenSportSelection()
    if (!this.getCurrentUrl.includes('casino') && !this.getCurrentUrl.includes('user') && !this.getCurrentUrl.includes('promo')) {
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
    this.$root.$on('toggleNav', () => {
      this.open = !this.open
    })
    if (process.env.MANUAL_POPUP === 'true' && !sessionStorage.getItem('popupopen')) {
      sessionStorage.setItem('popupopen', true)
      this.modals.popup = true
    }
    const currentParams = new URL(location.href).searchParams.get('games')
    this.updateEventsGroup(currentParams)
  },
  beforeDestroy () {
    this.$root.$off('toggleNav')
  },
  methods: {
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
      return process.env.LIVECHAT + ''
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
    ...mapActions({
      // todo refactor this actions
      setInvalidMultiple: 'tickets-pre-cash-in/setInvalidMultiple',
      registerUser: 'onboarding-auth/registerUser',
      authUser: 'authUser',
      updateOverlay: 'layout/updateOverlay',
      commitAds: 'settings/commitAds',
      commitSettings: 'settings/commitSettings',
      // * refactored
      login: 'login',
      fetchProductRedirectUrl: 'onboarding-third-pt-auth/fetchProductRedirectUrl',
      fetchSettings: 'settings/fetchSettings',
      fetchAds: 'settings/fetchAds',
      updatePopupStatus: 'layout/updatePopupStatus',
      fetchCasinoHeaderGames: 'metadata-casino/fetchCasinoHeaderGames',
      fetchCasinoHeaderCategories: 'metadata-casino/fetchCasinoHeaderCategories',
      fetchAllMetadataSports: 'metadata-sports/fetchAllMetadataSports',
      fetchPreMatchMainLeagues: 'pre-match-main-leagues/fetchPreMatchMainLeagues',
      fetchPreMatchGroupedEvents: 'pre-match-grouped-events/fetchPreMatchGroupedEvents',
      fetchCasinoCategories: 'metadata-casino/fetchCasinoCategories',
      commitCashIn: 'tickets-pre-cash-in/commitCashIn',
      clearAll: 'tickets-pre-cash-in/clearAll',
      updateMultipleTicket: 'tickets-pre-cash-in/updateMultipleTicket',
      acceptTicketChanges: 'tickets-pre-cash-in/acceptTicketChanges',
      toggleTicket: 'tickets-pre-cash-in/toggleTicket',
      clearAllFreeBet: 'tickets-pre-cash-in/clearAllFreeBet',
      resetAllBets: 'tickets-pre-cash-in/resetAllBets',
      updateTicket: 'tickets-pre-cash-in/updateTicket',
      confirmCookies: 'cookies/confirmCookies'
    }),
    async logUser (event) {
      await this.login(event)
      this.authUser().then(() => {
        if (this.$nuxt.$route.path.includes('/casino')) {
          location.reload()
        }
        if (this.getCurrentSportsProvider === 'upgaming') {
          console.log('RELOADDDDD')
          location.reload()
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "@/assets/layout/breakpoints";
  .max-height-sidebar {
    max-height: calc(100vh - 128px);
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

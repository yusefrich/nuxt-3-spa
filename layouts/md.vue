<template>
  <main>
    <app-config v-if="currentSettings" :config="currentSettings" />
    <md-theme-config v-if="currentSettings" :theme="getTheme" :config="currentSettings" />

    <login-barrier
      v-if="currentSettings && currentSettings.login_barrier"
      :brand="currentSettings.logo"
      :current-settings="currentSettings"
      :logged-in-user="loggedInUser"
      has-login
      @logUser="logUser($event)"
    />

    <md-mobile-theme-switcher
      v-if="width <= 540"
      v-model="themeSwitcher"
      class="d-md-none"
      :theme="getTheme"
      @changeTheme="changeTheme($event)"
    />

    <!-- <md-tickets
      v-if="getOptions.ticket && currentSettings"
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
      @submit="makeBet()"
      @toggleTicket="ticket => toggleTicket(ticket)"
      @updateTicket="ticket => updateTicket(ticket)"
      @updateMultipleTicket="payload => updateMultipleTicket(payload)"
      @clearMultipleTicket="clearMultipleTicket()"
      @acceptAllChanges="acceptTicketChanges()"
      @clearAll="clearAll()"
    /> -->

    <md-sidebar
      v-if="getOptions.sidebar"
      v-model="sidebar"
      :casino="isCasino"
      :providers="getCasinoProviders"
      :current-settings="currentSettings"
      :pre-match-main-leagues="[]"
      :all-sports-data="[]"
      :is-mobile="width <= 768"
      :lang-switcher="width <= 540"
      @searchCasinoGames="search($event)"
      @changeLanguage="changeLanguage($event)"
    />

    <section
      :style="`width: ${getOptions.sidebar && width > 768?`calc(100vw - ${sidebar ? 240 : 70}px)`:'100vw'};`"
      class="transition"
    >
      <MdNavbar
        :is-mobile="width <= 768"
        :logged-in-user="loggedInUser"
        :current-settings="currentSettings"
        :sidebar="getOptions.sidebar"
        :sidebar-closed="!sidebar"
        :theme="getTheme"
        @openSidebar="sidebar = true"
        @changeLanguage="changeLanguage($event)"
        @changeTheme="changeTheme($event)"
        @logout="doLogut()"
        @changeTab="changeTab($event)"
        @redirectProduct="redirectProduct()"
      />

      <div class="scrollable-content">
        <div class="transition article-sec" :class="classPadding">
          <slot v-if="hasContent && currentSettings" />
        </div>

        <MdFooter
          v-if="showFooter"
          :theme="getTheme"
          :current-settings="currentSettings"
          :curacao-key="getCuracaoToken"
          :curacao-func="getCuracaoTokenFunction"
        />
      </div>
    </section>

    <div
      v-if="(width <= 768 && sidebar) || themeSwitcher"
      class="bg-overlay"
      @click="sidebar = false, themeSwitcher = false"
    />

    <md-modal
      v-if="currentSettings && currentSettings.popup"
      v-model="popupModal"
      close
    >
      <h3 class="ps-3 pt-3">
        {{ $t('i18n_atencao') }}
      </h3>
      <div
        class="d-flex flex-column justify-content-between"
        style="height: 443px;"
      >
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
    </md-modal>

    <div
      v-if="currentSettings && currentSettings.telegram_float"
      id="div_telegram"
      :class="currentSettings.telegram_float.telegram_position"
    >
      <a :href="currentSettings.telegram_float.telegram_link" target="_blank">
        <img height="60" width="60" src="/telegram.png">
      </a>
    </div>
    <!-- <LiveChatWidget
      :license="liveChat()"
      visibility="minimized"
    /> -->

    <!-- <intercom-chat-btn
      :bottom-position="isMobile ? '90px' : '20px'"
    /> -->
  </main>
</template>

<script>
import { mapActions, mapState } from 'pinia'
import { useBaseStore } from '@/stores/base'
import { useLayoutStore } from '@/stores/layout'
import { useSettingsStore } from '@/stores/settings'
import { useMetadataCasinoStore } from '@/stores/metadata-casino'
import { useCasinoSearchGamesStore } from '@/stores/casino-search-games'
import { useOnboardingUserConfigStore } from '@/stores/onboarding-user-config'
import { useOnboardingThirdPtAuthStore } from '@/stores/onboarding-third-pt-auth'

// import { LiveChatWidget } from '@livechat/widget-vue/v2'
import AppConfig from '@/components/default/atoms/AppConfig'
import MdThemeConfig from '@/components/md/atoms/MdThemeConfig'
import FutHtmlRender from '@/components/default/atoms/FutHtmlRender'
import MdModal from '@/components/md/atoms/MdModal'
import MdButton from '@/components/md/atoms/MdButton'
import MdNavbar from '@/components/md/organisms/MdNavbar'
import MdFooter from '@/components/md/organisms/MdFooter'
import MdSidebar from '@/components/md/organisms/MdSidebar'
import MdMobileThemeSwitcher from '@/components/md/organisms/MdMobileThemeSwitcher'
import MdThemeSwitcher from '@/components/md/atoms/MdThemeSwitcher'
// import IntercomChatBtn from '@/components/default/atoms/IntercomChatBtn'
import LoginBarrier from '@/components/default/organisms/LoginBarrier'
import windowWidth from '~/mixins.js/windowWidth'

export default {
  name: 'Md',
  components: {
    // LiveChatWidget,
    AppConfig,
    MdThemeConfig,
    FutHtmlRender,
    MdModal,
    MdButton,
    MdNavbar,
    MdFooter,
    MdSidebar,
    MdThemeSwitcher,
    MdMobileThemeSwitcher,
    // IntercomChatBtn,
    LoginBarrier
  },
  mixins: [windowWidth],
  data () {
    return {
      sidebar: true,
      classPadding: 'article-sec-padding-android',
      hasContent: true,
      themeSwitcher: false
    }
  },
  computed: {
    ...mapState(useBaseStore, {
      loggedInUser: 'loggedInUser'
    }),
    ...mapState(useLayoutStore, {
      getTheme: 'getTheme',
      getOptions: 'getOptions',
      getPopupStatus: 'getPopupStatus',
      getCuracaoToken: 'getCuracaoToken',
      getCuracaoTokenFunction: 'getCuracaoTokenFunction',
      getCurrentApplicationType: 'getCurrentApplicationType'
    }),
    ...mapState(useSettingsStore, {
      currentSettings: 'currentSettings'
    }),
    ...mapState(useMetadataCasinoStore, {
      getCasinoProviders: 'getCasinoProviders'
    }),
    // ...mapGetters({
    //   getPreCashInTickets: 'tickets-pre-cash-in/getPreCashInTickets',
    //   getMultipleTicket: 'tickets-pre-cash-in/getMultipleTicket',
    //   getPreCashInTicketsLoading: 'tickets-pre-cash-in/getPreCashInTicketsLoading',
    //   getPreCashInTicketsErrors: 'tickets-pre-cash-in/getPreCashInTicketsErrors',
    //   userBets: 'userBets',
    //   getPreMatchMainLeagues: 'pre-match-main-leagues/getPreMatchMainLeagues',
    //   getAllMetadataSports: 'metadata-sports/getAllMetadataSports',
    // }),
    getCurrentUrl () {
      return this.$route.path
    },
    showFooter () {
      return !this.$route.path.includes('/login') && !this.$route.path.includes('/register')
    },
    isCasino () {
      return this.$route.path.includes('/casino')
    },
    popupModal: {
      get () {
        return this.getPopupStatus
      },
      set (value) {
        this.updatePopupStatus(value)
      }
    },
    isMobile () {
      return this.width <= 821
    }
  },
  watch: {
    width (value) {
      if (value <= 768) {
        this.sidebar = false
      }
    }
  },
  created () {
    // this.clearTicketLoading()
    // if (!this.getCurrentUrl.includes('casino')) {
    //   this.fetchAllMetadataSports()
    //   this.fetchPreMatchMainLeagues()
    // }
    this.fetchSettings()
  },
  mounted () {
    this.authUser()
    
    if (this.$route.query.btag) {
      localStorage.setItem('btag', this.$route.query.btag)

      if (!this.loggedInUser && !this.$route.path.includes('/register')) {
        this.$router.push(this.localePath(`/register?from=${this.$route.fullPath}`))
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
        // this.$nuxt.$loading.finish()
      }
    }
    // eslint-disable-next-line
    feather.replace()
    if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
      this.classPadding = 'article-sec-padding-ios'
    } else {
      this.classPadding = 'article-sec-padding-android'
    }
  },
  methods: {
    ...mapActions(useBaseStore, {
      login: 'login',
      logout: 'logout',
      authUser: 'authUser'
    }),
    ...mapActions(useLayoutStore, {
      changeTheme: 'changeTheme',
      updatePopupStatus: 'updatePopupStatus'
    }),
    ...mapActions(useSettingsStore, {
      fetchSettings: 'fetchSettings'
    }),
    ...mapActions(useCasinoSearchGamesStore, {
      searchCasinoGames: 'searchCasinoGames',
    }),
    ...mapActions(useOnboardingUserConfigStore, {
      changeTab: 'changeTab'
    }),
    ...mapActions(useOnboardingThirdPtAuthStore, {
      fetchProductRedirectUrl: 'fetchProductRedirectUrl'
    }),
    // ...mapActions({
    //   clearTicketLoading: 'tickets-pre-cash-in/clearTicketLoading',
    //   clearAll: 'tickets-pre-cash-in/clearAll',
    //   fetchPreMatchMainLeagues: 'pre-match-main-leagues/fetchPreMatchMainLeagues',
    //   fetchAllMetadataSports: 'metadata-sports/fetchAllMetadataSports',
    //   commitCashInMD: 'tickets-pre-cash-in/commitCashInMD',
    //   toggleTicket: 'tickets-pre-cash-in/toggleTicket',
    //   updateTicket: 'tickets-pre-cash-in/updateTicket',
    //   updateMultipleTicket: 'tickets-pre-cash-in/updateMultipleTicket',
    //   clearMultipleTicket: 'tickets-pre-cash-in/clearMultipleTicket',
    //   acceptTicketChanges: 'tickets-pre-cash-in/acceptTicketChanges',
    //   searchLiveCasinoGames: 'live-casino-search-games/searchLiveCasinoGames',
    // }),
    liveChat () {
      return process.env.LIVECHAT + ''
    },
    changeLanguage (lang) {
      this.$i18n.setLocale(lang)
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
    doLogut () {
      this.logout()
      this.$router.push(this.localePath('/'))
    },
    makeBet () {
      this.commitCashInMD().then(() => {
        this.fetchUserBets()
      })
    },
    async logUser (infos) {
      await this.login(infos)

      this.authUser().then(() => {
        if (this.$route.query.from) {
          this.$router.push(this.localePath(this.$route.query.from))
        }
      })
    },
    search (game) {
      if (this.$route.path === '/casino-aovivo') {
        this.searchLiveCasinoGames(game)
        return
      }

      this.searchCasinoGames(game)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/layout/breakpoints";

main {
  display: flex;
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
}

section {
  height: 100%;

  .scrollable-content {
    height: calc(100% - 60px);
    overflow-y: auto;
    overflow-x: hidden;
    @media (min-width: 769px) {
      &::-webkit-scrollbar-track {
        opacity: .3;
        border-radius: 0.125rem;
        background-color: lightgray;
      }
      &::-webkit-scrollbar {
        opacity: .3;
        width: 5px;
      }
      &::-webkit-scrollbar-thumb {
        opacity: .3;
        background-color: gray;
      }
    }

    .article-sec {
      min-height: calc(100vh - 360px);
      padding: 24px;
      background: var(--md-bg-color);
    }
  }
}

.bg-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,.3);
  z-index: 6000;
  overflow: scroll;
}
@include _md{
  .article-sec-padding-ios {
    padding: 12px !important;
  }
  .article-sec-padding-android {
    padding: 12px !important;
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
.left{
  left: 0;
}
.right{
  right: 0;
}
</style>

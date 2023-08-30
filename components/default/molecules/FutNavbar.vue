<template>
  <nav
    class="navbar navbar-expand-lg navbar-light bg-classic fixed-top py-0 d-print-none bg-navbar"
  >
    <div class="container-fluid px-0 flex-wrapp-mobile">
      <fut-button
        v-if="currentSettings"
        class="navbar-brand transition"
        :class="{'navbar-smaller': currentScroll > 40}"
        :style="`background:${currentSettings.background_logo === 1 || currentSettings.background_logo === null ? currentSettings.color_background_logo : 'transparent'};`"
        to="/"
      >
        <img
          class=" img-bg-inside transition"
          style="object-fit:contain;"
          :src="currentSettings.logo?currentSettings.logo:''"
          width="200"
          height="100%"
          alt=""
        >
      </fut-button>
      <div
        class="w-100 mobile-header"
      >
        <fut-button
          v-if="currentSettings"
          to="/"
          class="p-0 logo-wrapper"
          :style="`background:${currentSettings.background_logo === 1 || currentSettings.background_logo === null ? currentSettings.color_background_logo : 'transparent'};`"
        >
          <img
            class="img-bg-inside transition logo-mobile px-3"
            :src="currentSettings?currentSettings.logo_mobile?currentSettings.logo_mobile:currentSettings.logo:''"
          >
        </fut-button>
        <div class="d-flex align-items-center me-2">
          <fut-button
            v-if="loggedInUser"
            primary
            rounded
            @click="$emit('deposit')"
          >
            <span class="fw-bold">{{ $t('i18n_depositar').toUpperCase() }}</span>
          </fut-button>
        </div>
        <div class="d-flex">
          <fut-button
            ref="menuToggle"
            class="btn p-1 me-1 mt-2 d-flex"
            :class="{ 'btn-login-mobile': !loggedInUser }"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo02"
            aria-controls="navbarTogglerDemo02"
            aria-expanded="false"
            aria-label="Toggle navigation"
            @click="menuToggleVariable = !menuToggleVariable"
          >
            <font-awesome-icon
              v-if="loggedInUser"
              style="font-size: 35px"
              class="icon me-2 text-primary"
              :icon="['far', 'user-circle']"
            />
            <small
              v-if="!loggedInUser"
              class="d-block pt-2 me-1 text-head-bg text-primary"
            >
              {{ $t('i18n_entrar') }}
            </small>
            <span
              v-else
              style="font-size: 13px"
              class="d-block mt-0 pt-0 me-1 fw-bold text-start text-primary"
            >
              {{ getFormattedValue(loggedInUser.balance) }} <br> <small style="white-space: nowrap">Bonus: {{ getFormattedValue(loggedInUser.balance_bonus) }}</small>
            </span>
          </fut-button>
          <fut-button
            v-if="!loggedInUser"
            class="btn p-1 me-1 mt-2 d-flex btn-register-mobile"
            to="/register"
          >
            <small
              class="d-block pt-2 me-1 fut-color-dynamic text-primary"
            >
              {{ $t('i18n_registro') }}
            </small>
          </fut-button>
        </div>
      </div>
      <div id="navbarTogglerDemo02" class="collapse navbar-collapse px-md-0">
        <div class="w-100 transition">
          <div class="nav-items-flex w-100 transition" :class="[currentScroll > 40 ? 'my-md-2' : 'my-md-3']">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0 mobile-btn-select">
              <li class="nav-item social-media-desk ps-2 ps-md-0">
                <fut-button
                  v-if="currentSettings && currentSettings.phone"
                  class="nav-link fut-color-dynamic text-primary"
                  external
                  target="_blank"
                  :to="'tel:'+currentSettings.phone"
                >
                  <font-awesome-icon :icon="['fas', 'phone']" />
                </fut-button>
              </li>
              <li class="nav-item social-media-desk ps-2 ps-md-0">
                <fut-button
                  v-if="currentSettings && currentSettings.whats"
                  class="nav-link fut-color-dynamic text-primary"
                  external
                  target="_blank"
                  :to="'https://wa.me/'+currentSettings.whats"
                >
                  <font-awesome-icon :icon="['fab', 'whatsapp']" />
                </fut-button>
              </li>
              <li class="nav-item social-media-desk ps-2 ps-md-0">
                <fut-button
                  v-if="currentSettings && currentSettings.telegram"
                  class="nav-link fut-color-dynamic text-primary"
                  external
                  target="_blank"
                  :to="'https://t.me/'+currentSettings.telegram"
                >
                  <font-awesome-icon :icon="['fab', 'telegram']" />
                </fut-button>
              </li>
              <li class="nav-item social-media-desk ps-2 ps-md-0">
                <fut-button
                  v-if="currentSettings && currentSettings.insta"
                  class="nav-link fut-color-dynamic text-primary"
                  external
                  target="_blank"
                  :to="currentSettings.insta"
                >
                  <font-awesome-icon :icon="['fab', 'instagram']" />
                </fut-button>
              </li>
              <li class="nav-item social-media-desk ps-2 ps-md-0">
                <fut-button
                  v-if="currentSettings && currentSettings.fb"
                  class="nav-link fut-color-dynamic text-primary"
                  external
                  target="_blank"
                  :to="currentSettings.fb"
                >
                  <font-awesome-icon :icon="['fab', 'facebook']" />
                </fut-button>
              </li>
              <li class="nav-item social-media-desk ps-2 ps-md-0">
                <fut-button
                  v-if="currentSettings && currentSettings.tt"
                  class="nav-link fut-color-dynamic text-primary"
                  external
                  target="_blank"
                  :to="currentSettings.tt"
                >
                  <font-awesome-icon :icon="['fab', 'twitter']" />
                </fut-button>
              </li>
              <li class="nav-item social-media-desk ps-2 ps-md-0">
                <fut-button
                  v-if="currentSettings && currentSettings.yt"
                  class="nav-link fut-color-dynamic text-primary"
                  external
                  target="_blank"
                  :to="currentSettings.yt"
                >
                  <font-awesome-icon :icon="['fab', 'youtube']" />
                </fut-button>
              </li>
              <li class="nav-item social-media-desk ps-2 ps-md-0">
                <fut-button
                  v-if="currentSettings && currentSettings.tiktok"
                  class="nav-link fut-color-dynamic text-primary"
                  external
                  target="_blank"
                  :to="currentSettings.tiktok"
                >
                  <font-awesome-icon :icon="['fab', 'tiktok']" />
                </fut-button>
              </li>
              <li class="mobile-btn-select-menu">
                <fut-responsive-dropdown
                  v-if="menuToggleVariable || onDesktop"
                  :filler-width="!onDesktop ? 0 : 1065"
                  :color="currentSettings.font === 'dark' ? '#333333' : null"
                >
                  <fut-button
                    v-if="productRedirect && loggedInUser"
                    class="a btn btn-navbar text-white fut-color-dynamic text-start fw-bold btn-redirect"
                    @click="$emit('redirectProduct')"
                  >
                    <img width="20" height="20" src="/svg/bid-icon_1.svg" alt="bid icon">
                    {{ productRedirect.title }}
                  </fut-button>
                  <fut-button
                    v-for="(item, idx) in navItems"
                    :key="idx"
                    :to="item.link"
                    :external="item.external"
                    class="a btn btn-navbar fut-color-dynamic text-start"
                    :class="{ 'active-primary': currentRoute(item.link) }"
                  >
                    <img
                      v-if="item.img"
                      :src="item.img"
                      width="15"
                      height="15"
                      alt="Icon"
                    >
                    <font-awesome-icon
                      v-else-if="item.icon"
                      :icon="item.icon"
                      class="me-1 ms-1"
                    />
                    {{ item.text }}
                  </fut-button>
                </fut-responsive-dropdown>
              </li>
            </ul>
            <ul v-if="!loggedInUser" class="navbar-nav forgot-desk">
              <li class="nav-item">
                <fut-button
                  class="nav-link forgot-link hover-primary"
                  @click="$emit('forgot')"
                >
                  <small style="white-space: nowrap;">{{ $t('i18n_esqueci_a_senha') }}</small>
                </fut-button>
              </li>
            </ul>
            <fut-login
              v-if="!loggedInUser"
              :current-settings="currentSettings"
              @logUser="$emit('logUser', $event)"
            />
            <ul v-if="!loggedInUser" class="navbar-nav forgot-mobile">
              <li class="nav-item">
                <fut-button
                  class="nav-link forgot-link ms-2 hover-primary"
                  @click="()=>{$emit('forgot'); menuClick()}"
                >
                  <small>{{ $t('i18n_esqueci_a_senha') }}</small>
                </fut-button>
              </li>
            </ul>
            <ul v-if="loggedInUser" class="navbar-nav sign-menu float-md-end">
              <li class="d-lg-none px-3 px-md-0">
                <div class="mt-3">
                  <div class="d-flex justify-content-between mb-2">
                    <div>
                      <p class="mb-0">
                        <small class="text-white fut-color-dynamic">{{ loggedInUser.name }}</small>
                      </p>
                      <fut-button v-if="loggedInUser" class="nav-link py-1 text-nowrap text-primary" @click="updateData">
                        <font-awesome-icon class="text-secondary mt-2 me-2 pt-0" :class="loading ? 'spin' : ''" :icon="['fas', 'sync-alt']" />
                        {{ loading ? 'R$ ...' : getFormattedValue(loggedInUser.balance) }}
                      </fut-button>
                    </div>
                    <div>
                      <fut-button class="no-break mt-2" :primary="true" @click="()=>{$emit('deposit'); menuClick()}">
                        <strong
                          class="text-uppercase text-head-bg text-primary"
                        >
                          {{ $t('i18n_depositar') }}
                        </strong>
                      </fut-button>
                    </div>
                  </div>
                  <div class="d-flex justify-content-between mb-3">
                    <div>
                      <p class="mb-0">
                        <small class="text-white fut-color-dynamic">{{ $t('i18n_saldo_de_bonus') }}</small>
                      </p>
                      <p class="mb-0">
                        <strong class="text-white fut-color-dynamic">{{ getFormattedValue(loggedInUser.balance_bonus) }}</strong>
                      </p>
                      <p v-if="loggedInUser && +loggedInUser.free_bet > 0" class="mb-0">
                        <small class="text-white fut-color-dynamic">{{ $t('i18n_aposta_gratis') }}</small>
                      </p>
                      <p v-if="loggedInUser && +loggedInUser.free_bet > 0" class="mb-0">
                        <strong class="text-white fut-color-dynamic">{{ getFormattedValue(loggedInUser.free_bet) }}</strong>
                      </p>
                    </div>
                    <div>
                      <p class="mb-0">
                        <small class="text-white fut-color-dynamic">{{ $t('i18n_disponivel') }}</small>
                      </p>
                      <p class="mb-0">
                        <strong class="text-white fut-color-dynamic">{{ getFormattedValue(loggedInUser.balance) }}</strong>
                      </p>
                    </div>
                  </div>
                </div>
              </li>
              <li class="d-flex d-md-none justify-content-between logged-menu-icons">
                <fut-button to="/user" class="p-0">
                  <span class="icon"><font-awesome-icon class="text-primary" :icon="['far', 'user']" /></span>
                  <br>
                  <span class="desc text-white fut-color-dynamic mt-2">{{ $t('i18n_minha_conta') }}</span>
                </fut-button>
                <fut-button to="/user/history/bets-pendentes" class="p-0">
                  <span class="icon"><font-awesome-icon class="text-primary" :icon="['far', 'clock']" /></span>
                  <br>
                  <span class="desc text-white fut-color-dynamic mt-2">{{ $t('i18n_historico') }}</span>
                </fut-button>
                <fut-button to="/user/bank/deposito" class="p-0">
                  <span class="icon"><font-awesome-icon class="text-primary" :icon="['fas', 'wallet']" /></span>
                  <br>
                  <span class="desc text-white fut-color-dynamic mt-2">{{ $t('i18n_banco') }}</span>
                </fut-button>
              </li>
              <li class="nav-item px-3 px-md-0">
                <fut-button
                  class="nav-link d-lg-none text-white"
                  to="/user"
                >
                  {{ $t('i18n_meus_dados') }}
                </fut-button>
                <fut-button
                  class="nav-link d-none d-lg-block text-white"
                  to="/user"
                >
                  <font-awesome-icon
                    style="width: 15px; height: 15px"
                    class="me-2 text-primary"
                    :icon="['fas', 'user-circle']"
                  /> <span class="fut-color-dynamic">{{ loggedInUser.name }}</span>
                </fut-button>
              </li>
              <li class="hor-div" />
              <li class="nav-item px-3 px-md-0">
                <fut-button
                  class="nav-link fut-color-dynamic text-white"
                  :to="appType && appType.includes('sports') || appType.includes('all') ? '/my-bets' : '/user/bank/transactions'"
                >
                  {{ $t('i18n_minhas_apostas') }}
                </fut-button>
              </li>
              <li class="hor-div" />
              <li class="nav-item px-3 px-md-0">
                <fut-button
                  style="max-width: 90px"
                  class="nav-link text-white"
                  to="/logout"
                >
                  {{ $t('i18n_sair') }}
                </fut-button>
              </li>
              <li class="hor-div" />
            </ul>
          </div>
          <div class="nav-items-flex w-100">
            <div class="d-none d-md-block">
              <ul class="navbar-nav mb-2 mb-lg-0">
                <li style="opacity: .7" class="nav-item d-flex px-2">
                  <small class="text-white fut-color-dynamic pt-2">
                    <font-awesome-icon
                      class="fut-color-dynamic mt-0 pt-0 me-2 text-primary"
                      :icon="['fas', 'clock']"
                    />
                    <span class="fut-color-dynamic">
                      {{ timestamp }}
                    </span>
                  </small>
                </li>
              </ul>
            </div>
            <ul class="navbar-nav mb-2 mb-lg-0">
              <li class="nav-item d-flex px-2">
                <font-awesome-icon
                  class="mt-2 pt-2 text-primary"
                  :icon="['fas', 'circle']"
                />
                <fut-button class="nav-link text-white fut-color-dynamic" to="/regras-gerais">
                  <small>{{ $t('i18n_regras_gerais') }}</small>
                </fut-button>
              </li>
              <li class="nav-item d-flex px-2">
                <font-awesome-icon
                  class="mt-2 pt-2 text-primary"
                  :icon="['fas', 'circle']"
                />
                <fut-button class="nav-link text-white fut-color-dynamic" to="/suporte">
                  <small>{{ $t('i18n_suporte') }}</small>
                </fut-button>
              </li>
              <li class="nav-item px-2 dropdown">
                <div class="d-flex">
                  <fut-button class="nav-link text-white fut-color-dynamic" to="/suporte">
                    <small>{{ $i18n.locale.toUpperCase() }}</small>
                  </fut-button>
                  <font-awesome-icon
                    class="mt-2 pt-2 text-primary"
                    :icon="['fas', 'angle-down']"
                  />
                </div>
                <div style="right: -20px" class="dropdown-content">
                  <a
                    v-for="(locale, localeIdx) in $i18n.locales"
                    :key="localeIdx"
                    class="fut-color-dynamic"
                    @click="$emit('changeLanguage', locale)"
                  >
                    {{ locale }}
                  </a>
                </div>
              </li>
              <li v-if="loggedInUser" class="nav-item d-none d-lg-flex px-2">
                <fut-balance-dropdown
                  :loading="loading"
                  :balance="getFormattedValue(loggedInUser.balance)"
                  :free-bet="loggedInUser.free_bet"
                  :blocked-balance="loggedInUser.player.freebet_closed"
                  @updateData="updateData()"
                />
              </li>
              <li v-if="loggedInUser" class="nav-item d-none d-lg-flex px-2">
                <fut-button
                  v-if="loggedInUser"
                  style="line-height: 13px;"
                  class="nav-link py-1 text-nowrap text-primary"
                  @click="updateData"
                >
                  <small>
                    {{ $t('i18n_saldo_de_bonus') }} <br>
                    {{ loading ? 'R$ ...' : getFormattedValue(loggedInUser.balance_bonus) }}
                  </small>
                </fut-button>
              </li>
              <li v-if="loggedInUser" class="nav-item d-none d-lg-flex px-2">
                <fut-button class="no-break" rounded :primary="true" @click="$emit('deposit')">
                  <strong
                    class="text-uppercase text-head-bg text-primary"
                  >
                    {{ $t('i18n_depositar') }}
                  </strong>
                </fut-button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import FutLogin from '@/components/default/molecules/FutLogin'
import FutButton from '@/components/default/atoms/FutButton'
import FutResponsiveDropdown from '@/components/default/atoms/FutResponsiveDropdown'
import global from '@/mixins.js/global.js'
import FutBalanceDropdown from '@/components/default/molecules/FutBalanceDropdown.vue'
import windowWidth from '~/mixins.js/windowWidth'

export default {
  name: 'FutNavbar',
  components: {
    FutLogin,
    FutButton,
    FutResponsiveDropdown,
    FutBalanceDropdown
  },
  mixins: [global, windowWidth],
  props: {
    casinoGames: {
      type: Array,
      default: () => ([])
    },
    applicationStateType: {
      type: String,
      default: ''
    },
    casinoCategories: {
      type: Array,
      default: () => ([])
    },
    currentSettings: {
      type: Object,
      default: () => ({})
    },
    loggedInUser: {
      type: Object,
      default: () => ({})
    },
    loginAction: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      loading: false,
      menuToggleVariable: false,
      timestamp: null,
      interval: null
    }
  },
  computed: {
    appType () {
      return this.applicationStateType
    },
    productConfigPromoUrl () {
      return { status: process.env.PRODUCT_CONFIG_PROMO_URL, url: process.env.PRODUCT_CONFIG_PROMO_URL ? process.env.PRODUCT_CONFIG_PROMO_URL : '/promo' }
    },
    onDesktop () {
      return this.width >= 1024
    },
    productRedirect () {
      if (!process.env.PRODUCT_REDIRECT_URL && !process.env.PRODUCT_REDIRECT_TITLE) {
        return null
      }
      return { title: process.env.PRODUCT_REDIRECT_TITLE }
    },
    navItems () {
      const items = []

      if (!this.applicationType('casino') || this.applicationType('sports')) {
        items.push(
          { link: '/', text: this.$tc('i18n_esporte', 2) }
        )
        if (process.env.SPORTS_PROVIDER === 'upgaming') {
          items.push(
            { link: '/virtuais', text: this.$t('i18n_virtuais') },
            { link: '/esports', text: this.$t('i18n_esports') }
          )
        } else {
          items.push(
            { link: '/sport/6046/aovivo', text: this.$t('i18n_ao_vivo') }
          )
        }
      }

      items.push({ link: '/promo', text: this.$tc('i18n_promocao', 2) })

      if (!this.applicationType('sports') || this.applicationType('casino')) {
        items.push(
          { link: '/casino', text: this.$t('i18n_cassino'), icon: ['fas', 'dice'] },
          { link: '/casino?cat=live', text: this.$t('i18n_cassino_ao_vivo'), icon: ['fas', 'dice'] }
        )
      }

      if (this.currentSettings.nav_bar && this.currentSettings.nav_bar.length) {
        this.currentSettings.nav_bar.forEach((nav) => {
          if (!nav.nav_link) {
            return
          }
          const regex = new RegExp(window.location.origin, 'g')
          const foundItemIdx = items.findIndex(item => item.link === nav.nav_link.replace(regex, ''))

          if (nav.nav_link.replace(regex, '') === '') {
            items[0] = {
              link: '/',
              text: nav.nav_name,
              img: nav.img
            }
          }

          if (foundItemIdx !== -1) {
            items.splice(
              foundItemIdx,
              1,
              {
                link: nav.nav_link.replace(regex, ''),
                text: nav.nav_name,
                img: nav.img
              }
            )
          } else {
            items.push({
              link: nav.nav_link,
              text: nav.nav_name,
              img: nav.img,
              external: true
            })
          }
        })
      }

      return items
    }
  },
  watch: {
    loginAction (value) {
      if (value) {
        this.menuClick()
      }
    }
  },
  created () {
    this.interval = setInterval(this.getNow, 1000)
  },
  beforeDestroy () {
    clearInterval(this.interval)
  },
  methods: {
    changeLanguage (lang) {
      this.$i18n.locale = lang
    },
    applicationType (term) {
      const config = '' + process.env.PRODUCT_CONFIG
      return config.includes(term)
    },
    getNow () {
      const today = new Date()
      const date = today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear()
      const time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds()
      const dateTime = date + ' ' + time
      this.timestamp = dateTime
    },
    menuClick () {
      this.$refs.menuToggle.$el.click()
      this.menuToggleVariable = !this.menuToggleVariable
    },
    currentRoute (route) {
      return route === this.$route.fullPath || route === `${window.location.origin}${this.$route.fullPath}`
    },
    getFormattedValue (value) {
      const formattedResult = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      })
      return formattedResult.format(value)
    },
    updateData () {
      this.$emit('authUser')
    }
  }
}
</script>

<style scoped lang="scss">
  @import "@/assets/layout/variables";
  @import "@/assets/layout/breakpoints";
  .mobile-header{
    display: none;
    height: 65px;

    .logo-wrapper {
      .logo-mobile{
        width: 100%;
        max-width: 200px;
        height: 100%;
        object-fit: contain;
      }
    }
  }
  .navbar-brand{
    height: 45px;
    margin-top: 5px;
    border-radius: 10px;
    @include md {
      border-radius: 0px;
      margin-top: 0px;
      height: 113px;
    }
  }
  .navbar-smaller{
    @include md{
      height: 97px;
    }
  }
  .forgot-link{
    color: white !important;
  }
  .hover-primary:hover{
    color: var(--fut-primary) !important;
  }
  .hover-secondary:hover{
    color: var(--fut-secondary) !important;
  }
  .bg-old-bet{
    background: linear-gradient(#262626ff,#0f0f0fff)
  }
  .bg-classic{
    background: var(--fut-background)
  }
  .user-nav{
    z-index: 1031;
  }
  .navbar .container-fluid{
    align-items: start !important;
  }
  .brand-smaller{
    border-radius: 10px !important;
    padding-left: 0.5rem;
    padding-right: 0.5rem;
    width: -webkit-calc(100% - 125px);
    width: -moz-calc(100% - 125px);
    width: calc(100% - 125px);
    max-width: 200px;
    border-radius: 10px;
  }
  .notification{
    background: #EC453C;
    padding-left: 7px;
    padding-right: 7px;
    border-radius: 90px;
    margin-right: 10px;
  }
  a{
    color: $white;
  }
  .sign-menu a:hover{
    color: var(--fut-primary) !important;
  }
  .hor-div{
    border-right: 2px solid var(--fut-primary);
    margin-right: 10px;
    margin-left: 10px;
  }
  .bg-overlay{
    background-color: #292c31;
    height: 0;
    width: 100%;
    z-index: 5;
    position: fixed;
    opacity: 1;
    top: 0;
    left: 0;
  }
  .bg-overlay.showing-overlay{
    height: 100vh;
  }
  .navbar-toggler{
    box-shadow: none !important;
  }
  .spin{
    animation-name: spin;
    animation-duration: 2000ms;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
  }
  @keyframes spin {
    from {
      transform:rotate(0deg);
    }
    to {
      transform:rotate(360deg);
    }
  }
  .btn-navbar:hover{
    color: #fff;
    font-weight: 700;
  }
  .btn-navbar.active{
    font-weight: 700;
  }
  .selected{
    background: var(--fut-primary);
    width: 10px;
    height: 10px;
    margin-top: 7px;
    margin-right: 10px;
  }
  .mobile-btn-select{
    background: #3333332f;
    @include md{
      background: initial;
    }
    .mobile-btn-select-menu{
      @include _md {
        text-align: center;
      }
      .a{
        text-align: left;
        width: initial;
      }
      .active-primary{
        font-weight: 700;
        border-radius: 0;
        border-bottom: 2px solid var(--fut-primary);
      }
      .active-secondary{
        font-weight: 700;
        border-radius: 0;
        border-bottom: 2px solid var(--fut-secondary);
      }
      .active-white{
        font-weight: 700;
        border-radius: 0;
        border-bottom: 2px solid white;
      }
    }
  }
  .logged-menu-icons{
    background: var(--fut-background-darker);
    padding: 20px 30px;
    .icon {
      font-size: 40px;
    }
    .desc{
      font-weight: 700;
      line-height: 17px;
      padding-top: 8px;
      font-size: 11px;
    }
  }
  .navbar-collapse.collapse.show > div{
    height: 100vh;
    @media (min-width: 992px) {
      height: initial;
    }
  }
  .collapsing > div{
    height: 100vh;
    @media (min-width: 992px) {
      height: initial;
    }
  }
  .icon-holders{
    background: #33333363;
    margin-top: 10px;
    border-radius: 90px;
  }
  .icon-mobile{
    font-size: 25px;
  }
  .dropdown {
    position: relative;
    display: inline-block;
  }
  .dropdown-content {
    display: none;
    position: absolute;
    min-width: 160px;
    white-space: nowrap;
    margin-right: 30px;
    z-index: 1050;
    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
    a {
      color: white;
      padding: 12px 16px;
      text-decoration: none;
      display: block;
      background-color: var(--fut-background-lighter);
      border-bottom: 1px solid var(--fut-background-lightest);
      font-size: 14px;
      &:hover {
        background-color: var(--fut-background);
        color: white;
        cursor: pointer;
        font-weight: bold;
      }
    }
  }
  .dropdown:hover .dropdown-content {
    display: block;
  }
  .btn-login-mobile {
    background: var(--fut-primary);
    border-radius: 5px;
    border: 2px solid var(--fut-primary);
    font-size: 14px;
    font-weight: 700;
    padding: 10px 20px;
    margin-top: 10px;
    margin-bottom: 10px;
    margin-right: 0px !important;
    color: #000000 !important;
    * {
      color: #000000 !important;
    }
  }
  .btn-register-mobile {
    background: var(--fut-background);
    border-radius: 5px;
    border: 2px solid var(--fut-primary);
    font-size: 14px;
    font-weight: 700;
    padding: 10px 20px;
    margin-top: 10px;
    margin-bottom: 10px;
  }
  .btn-redirect {
    @include _md {
      display: block;
      font-size: 18px;
      margin-left: auto;
      margin-right: auto;
      text-align: center !important;
      background: transparent;
      border-radius: 5px !important;
      border: 2px solid var(--fut-primary);
      margin-top: 15px;
    }
  }

  .nav-items-flex {
    display: flex;
    justify-content: space-between;
  }
  .social-media-desk {
    display: block;
  }
  .forgot-desk {
    display: block;
  }
  .forgot-mobile {
    display: none;
  }

  @media (max-width: 991px) {
    .navbar-brand {
      display: none;
    }
    .mobile-header {
      display: flex;
      justify-content: space-between;
    }

    .nav-items-flex {
      display: block;
    }
    .social-media-desk {
      display: none;
    }
    .forgot-desk {
      display: none;
    }
    .forgot-mobile {
      display: block;
    }
  }
  .text-head-bg{
    color: var(--fut-background) !important;
  }
</style>

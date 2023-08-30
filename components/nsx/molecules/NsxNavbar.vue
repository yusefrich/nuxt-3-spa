<template>
  <div>
    <nav class="navbar fixed-top py-0 transition">
      <div class="bg-bet d-md-none d-flex justify-content-between w-100 mobile-navbar">
        <div class="d-flex">
          <nsx-fut-button v-if="sidebar" class="p-1" @click="$root.$emit('toggleNav')">
            <font-awesome-icon v-if="currentSettings" class="icon-nav" :class="{'text-white':currentSettings.font === 'light', 'text-dark':currentSettings.font === 'dark'}" :icon="['fas', 'bars']" />
          </nsx-fut-button>
          <nsx-fut-button v-if="open" class="btn-close-all" @click="$root.$emit('toggleNav')" />
          <nsx-fut-button v-if="!applicationType('casino') || applicationType('sports')" class="p-1" @click="startMobileSearch">
            <font-awesome-icon v-if="currentSettings" class="icon-nav" :class="{'text-white':currentSettings.font === 'light', 'text-dark':currentSettings.font === 'dark'}" :icon="['fas', 'search']" />
          </nsx-fut-button>
          <nsx-fut-button v-if="!applicationType('casino') || applicationType('sports')" to="/campeonatos" style="padding-top:10px !important" class="p-1">
            <font-awesome-icon v-if="currentSettings" class="icon-nav" :class="{'text-white':currentSettings.font === 'light', 'text-dark':currentSettings.font === 'dark'}" :icon="['fas', 'trophy']" />
          </nsx-fut-button>
          <nsx-fut-button v-if="!applicationType('casino') || applicationType('sports')" class="p-0 nav-inplay" to="/sport/6046/aovivo">
            Ao<br>Vivo
          </nsx-fut-button>
        </div>
        <nsx-fut-button class="p-0" to="/">
          <img :src="currentSettings?currentSettings.logo_mobile?currentSettings.logo_mobile:currentSettings.logo:''" height="50" width="50" class="py-2" style="object-fit: contain">
        </nsx-fut-button>
        <div v-if="!loggedInUser" class="d-flex">
          <div class="pt-1 me-2">
            <nsx-fut-button class="btn-register mt-2" @click="$emit('register')">
              {{ $t('i18n_criar_conta') }}
            </nsx-fut-button>
          </div>
          <div class="pt-1 me-2">
            <nsx-fut-button class="btn-login mt-2" @click="$emit('login')">
              {{ $t('i18n_entrar') }}
            </nsx-fut-button>
          </div>
        </div>
        <div v-else class="d-flex text-end">
          <div>
            <nsx-fut-button
              to="/my-bets"
              class="text-white p-1 me-1 position-relative"
            >
              <font-awesome-icon style="font-size: 20px" class="mt-2" :icon="['fas', 'layer-group']" /><span v-if="userBets && userBets.pending && userBets.pending.length > 0" class="alert-bets-mobile">{{ userBets.pending.length }}</span>
            </nsx-fut-button>
          </div>
          <div style="padding-top: 13px;" class="me-2">
            <nsx-fut-button
              v-if="loggedInUser"
              style="font-size: 11.3px;line-height: 5px;"
              class="a nav-link p-0 text-nowrap text-secondary"
              @click="updateData"
            >
              {{ loading ? 'R$ ...' : getFormattedValue(loggedInUser.balance) }}
            </nsx-fut-button>
            <nsx-fut-button style="font-size: 12px" class="a text-decoration-none text-orange" @click="$emit('deposit')">
              {{ $t('i18n_depositar') }}
            </nsx-fut-button>
          </div>
          <nsx-fut-button class="a" @click="$emit('user')">
            <font-awesome-icon style="width: 30px; height: 30px" class="text-secondary mt-2" :icon="['far', 'user-circle']" />
          </nsx-fut-button>
        </div>
      </div>
      <div class="container-fluid bg-bet py-2 d-none d-md-flex">
        <nsx-fut-button v-if="currentSettings" class="a p-0" :class="{'navbar-brand': currentSettings.background_logo === 1 || currentSettings.background_logo === null}" to="/">
          <img
            class="d-none d-md-block img-bg-inside"
            :style="'object-fit:contain'"
            :src="currentSettings?currentSettings.logo:''"
            width="250"
            height="74"
            alt=""
          >
        </nsx-fut-button>
        <ul style="flex-direction: row" class="navbar-nav d-none d-xl-flex">
          <fut-responsive-dropdown :filler-width="loggedInUser ? 670 : 995">
            <nsx-fut-button v-if="productRedirect && loggedInUser" class="a btn btn-old-bet d-inline-flex text-secondary" @click="$emit('redirectProduct')">
              {{ productRedirect.title }}
            </nsx-fut-button>

            <nsx-fut-button
              v-for="(value, key, idx) in navItems"
              :key="`${key}-${idx}`"
              :to="value.link"
              :external="value.external"
              :target="value.target"
              class="a btn btn-old-bet d-inline-flex text-secondary"
              :class="{ 'position-relative': key === '/my-bets' }"
            >
              <div v-if="currentRoute(value.link)" class="selected" />
              <img
                v-if="value.img"
                :src="value.img"
                width="15"
                height="15"
                alt="Icon"
                class="me-1"
              >
              {{ value.text }}
              <span
                v-if="key === '/my-bets' && userBets && userBets.pending.length > 0"
                class="alert-bets"
              >
                {{ userBets.pending.length }}
              </span>
            </nsx-fut-button>
          </fut-responsive-dropdown>
        </ul>
        <div class="d-xl-none position-relative">
          <div
            id="MobileNavDropdown"
            data-bs-toggle="dropdown"
            aria-expanded="false"
            class="nsx-mobile-nav"
          >
            <span>{{ navItems[currentMobileNav].text }}</span>
            <font-awesome-icon class="icon" :icon="['fas', 'chevron-down']" />
          </div>
          <ul class="dropdown-menu" aria-labelledby="MobileNavDropdown">
            <li v-if="productRedirect">
              <nsx-fut-button
                :to="productRedirect.url"
              >
                {{ productRedirect.title }}
              </nsx-fut-button>
            </li>

            <li
              v-for="(value, key, idx) in navItems"
              :key="`${key}-${idx}`"
            >
              <nsx-fut-button
                :to="localePath(value.link)"
                :external="value.external"
                @click="currentMobileNav = key"
              >
                <img
                  v-if="value.img"
                  :src="value.img"
                  width="15"
                  height="15"
                  alt="Icon"
                >
                {{ value.text }}
              </nsx-fut-button>
            </li>
          </ul>
        </div>
        <div v-if="!loggedInUser">
          <fut-login-nsx
            :loading="loading"
            @logUser="$emit('logUser', $event)"
          />
          <div class="d-flex">
            <nsx-fut-button
              class="a text-secondary text-decoration-none hover-orange ms-2 login-btn"
              @click="$emit('register')"
            >
              {{ $t('i18n_criar_conta') }}
            </nsx-fut-button>
            <nsx-fut-button
              class="a text-secondary text-decoration-none hover-orange ms-4 ps-3 login-btn"
              @click="$emit('forgot')"
            >
              {{ $t('i18n_esqueci_a_senha') }}
            </nsx-fut-button>
          </div>
        </div>
        <div v-else class="d-flex text-end">
          <nsx-balance-dropdown
            :loading="loading"
            :balance="getFormattedValue(loggedInUser.balance)"
            :balance-bonus="loggedInUser.balance_bonus"
            :free-bet="loggedInUser.free_bet"
            :blocked-balance="loggedInUser.player.freebet_closed"
            @updateData="updateData()"
            @deposit="$emit('deposit')"
          />

          <nsx-fut-button class="a" @click="$emit('user')">
            <font-awesome-icon style="width: 30px; height: 30px" class="text-secondary mt-2" :icon="['far', 'user-circle']" />
          </nsx-fut-button>
        </div>
      </div>
      <div class="container-fluid bg-bet-under justify-content-between px-1  d-none d-md-flex">
        <div>
          <fut-input
            v-if="!applicationType('casino') || applicationType('sports')"
            v-model="searchTerm"
            :validate="errors?errors:{}"
            :icon="searching?'searching':'search'"
            type="text"
            rounded
            name="document"
            font-sm
            style="height: 27px; max-width: 190px"
            :placeholder="$t('i18n_buscar')"
            no-focus
            darker
            @blur="resetSearch"
          />
        </div>
        <ul style="flex-direction: row" class="d-flex mb-1 me-5">
          <li class="nav-item d-flex px-2">
            <font-awesome-icon style="color: var(--nsx-dark-7)" class="mt-1 pt-2" :icon="['fas', 'circle']" />
            <nsx-fut-button class="a nav-link fut-color-dynamic hover-orange py-1 ps-1 fs-12 pt-2" @click="openNewWindow('/regras-gerais-slim')">
              {{ $t('i18n_regras_gerais') }}
            </nsx-fut-button>
          </li>
          <li class="nav-item d-flex px-2">
            <font-awesome-icon style="color: var(--nsx-dark-7)" class="mt-1 pt-2" :icon="['fas', 'circle']" />
            <nsx-fut-button class="a nav-link fut-color-dynamic hover-orange py-1 ps-1 fs-12 pt-2" @click="openNewWindow('/jogo-responsavel-slim')">
              {{ $t('i18n_jogo_responsavel') }}
            </nsx-fut-button>
          </li>
          <li class="nav-item d-flex px-2">
            <font-awesome-icon style="color: var(--nsx-dark-7)" class="mt-1 pt-2" :icon="['fas', 'circle']" />
            <nsx-fut-button class="a nav-link fut-color-dynamic hover-orange py-1 ps-1 fs-12 pt-2" target="_blank" :to="`${currentSettings ? 'https://wa.me/' + currentSettings.whats : '/suporte'}`">
              {{ $t('i18n_suporte') }}
            </nsx-fut-button>
          </li>
          <li class="nav-item d-flex px-2 pointer">
            <div class="dropdown">
              <div class="d-flex align-items-center text-user-dashboard">
                <span>
                  <img v-if="$i18n.locale.toUpperCase() === 'EN'" src="/flags/1.png" class="me-1" alt="Flag image">
                  <img v-else-if="$i18n.locale === 'ES'" src="/flags/espanha.png" class="me-1 spanish-flag" alt="Flag image">
                  <img v-else src="/flags/14.png" class="me-1" alt="Flag image">
                </span>
                <span class="mr-10 fut-color-dynamic">
                  {{ $i18n.locale.toUpperCase() }}
                </span>
                <font-awesome-icon class="fut-color-dynamic" :icon="['fas', 'angle-down']" />
              </div>
              <div style="right: -40px; top: 30px;" class="dropdown-content">
                <a
                  v-for="(locale, localeIdx) in $i18n.locales"
                  :key="localeIdx"
                  class="fut-color-dynamic fut-color-dynamic"
                  @click="$emit('changeLanguage', locale)"
                >
                  <span>
                    <img v-if="locale === 'EN'" src="/flags/1.png" class="me-1" alt="Flag image">
                    <img v-else-if="locale === 'ES'" src="/flags/espanha.png" class="me-1 spanish-flag" alt="Flag image">
                    <img v-else src="/flags/14.png" class="me-1" alt="Flag image">
                  </span>
                  <span>{{ locale }}</span>
                </a>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div v-if="mobileSearch" class="mobile-search-input d-flex w-100">
        <fut-input
          v-model="searchTerm"
          :validate="errors?errors:{}"
          :icon="searching?'searching':'search'"
          type="text"
          name="document"
          font-sm
          style="height: 30px"
          :placeholder="$t('i18n_buscar')"
          no-focus
          darker
          class="w-100"
          @blur="resetSearch"
        />
        <nsx-fut-button
          class="close-search-mobile text-nsx-gray"
          @click="()=>{mobileSearch=false;resetSearch()}"
        >
          <font-awesome-icon class="" :icon="['fas', 'times-circle']" />
        </nsx-fut-button>
      </div>
      <div v-if="foundGames && foundGames.length > 0" class="search-field nsx-scroll-black">
        <template v-for="(result, index) in foundGames" :key="'result_games__'+index">
          <template v-for="(sport, j) in result.sport" :key="'result_games__'+index+'_'+j">
            <template v-for="(league, k) in sport.leagues" :key="'result_games__'+index+'_'+j+'_'+k">
              <nsx-fut-button
                v-for="(game, l) in league.games"
                :key="'result_games_'+index+'_'+j+'_'+k+'_'+l"
                :to="'/sport/'+sport.id+'/evento/'+game.slug"
                class="search-item d-flex w-100"
              >
                <img v-if="sport.id === 6046" src="/bet365icons/1.svg" width="25px" height="25px" class="mt-2">
                <img v-else-if="sport.id === 48242" src="/bet365icons/2.svg" width="25px" height="25px" class="mt-2">
                <img v-else-if="sport.id === 154919" src="/bet365icons/10.svg" width="25px" height="25px" class="mt-2">
                <img v-else-if="sport.id === 54094" src="/bet365icons/5.svg" width="25px" height="25px" class="mt-2">
                <img v-else-if="sport.id === 265917" src="/bet365icons/20.svg" width="25px" height="25px" class="mt-2">
                <img v-else-if="sport.id === 154830" src="/bet365icons/23.svg" width="25px" height="25px" class="mt-2">
                <img v-else-if="sport.id === 621569" src="/bet365icons/34.svg" width="25px" height="25px" class="mt-2">
                <img v-else-if="sport.id === 35709" src="/bet365icons/6.svg" width="25px" height="25px" class="mt-2">
                <img v-else-if="sport.id === 154914" src="/bet365icons/3.svg" width="25px" height="25px" class="mt-2">
                <img v-else-if="sport.id === 687890" src="/bet365icons/games.svg" width="25px" height="25px" class="mt-2">
                <img v-else-if="sport.id === 131506" src="/bet365icons/16.svg" width="25px" height="25px" class="mt-2">
                <div class="text-start ms-2">
                  <p class="mb-0 result-title">
                    {{ result.country.name }} > <span>{{ league.name }}</span>
                  </p>
                  <h5 class="mb-0 result-game">
                    {{ game.event }}
                  </h5>
                  <p class="mb-0 result-time">
                    {{ formattedDate(game.datetime) }}
                  </p>
                </div>
              </nsx-fut-button>
            </template>
          </template>
        </template>
      </div>
    </nav>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import FutLoginNsx from '@/components/nsx/molecules/FutLoginNsx'
import FutInput from '@/components/default/atoms/FutInput'
import NsxFutButton from '@/components/nsx/atoms/NsxFutButton'
import FutResponsiveDropdown from '@/components/default/atoms/FutResponsiveDropdown'
import NsxBalanceDropdown from '@/components/nsx/molecules/NsxBalanceDropdown.vue'
const isToday = require('dayjs/plugin/isToday')
const isTomorrow = require('dayjs/plugin/isTomorrow')
dayjs.extend(isToday)
dayjs.extend(isTomorrow)

export default {
  name: 'NsxNavbar',
  components: {
    FutLoginNsx,
    FutInput,
    NsxFutButton,
    FutResponsiveDropdown,
    NsxBalanceDropdown
  },
  props: {
    sidebar: {
      type: Boolean,
      default: false
    },
    casinoGames: {
      type: Array,
      default: () => ([])
    },
    casinoCategories: {
      type: Array,
      default: () => ([])
    },
    loading: {
      type: Boolean,
      default: false
    },
    loggedInUser: {
      type: Object,
      default: () => ({})
    },
    userBets: {
      type: Object,
      default: () => ({})
    },
    currentSettings: {
      type: Object,
      default: () => ({})
    },
    searching: {
      type: Boolean,
      default: false
    },
    foundGames: {
      type: Array,
      default: () => ([])
    }
  },
  data () {
    return {
      searchTimeout: null,
      errors: null,
      open: false,
      searchTerm: null,
      mobileSearch: false,
      currentMobileNav: '/'
    }
  },
  computed: {
    productConfigPromoUrl () {
      return { status: process.env.PRODUCT_CONFIG_PROMO_URL, url: process.env.PRODUCT_CONFIG_PROMO_URL ? process.env.PRODUCT_CONFIG_PROMO_URL : '/promo' }
    },
    productRedirect () {
      if (!process.env.PRODUCT_REDIRECT_URL && !process.env.PRODUCT_REDIRECT_TITLE) {
        return null
      }
      return { url: process.env.PRODUCT_REDIRECT_URL, title: process.env.PRODUCT_REDIRECT_TITLE }
    },
    navItems () {
      const items = {}

      if (!this.applicationType('casino') || this.applicationType('sports')) {
        items['/'] = { link: '/', text: this.$tc('i18n_esporte', 2) }
        items['/sport/6046/aovivo'] = { link: '/sport/6046/aovivo', text: this.$t('i18n_ao_vivo') }
        items['/campeonatos/melhores'] = { link: '/campeonatos/melhores', text: this.$t('i18n_melhores_listas') }
        items['/sport/6046/leagues'] = { link: '/sport/6046/leagues', text: this.$t('i18n_so_futebol') }
        items['/campeonatos'] = { link: '/campeonatos', text: this.$t('i18n_campeonatos') }
      }

      if (this.userBets && this.userBets.all && this.userBets.all.length > 0) {
        items['/my-bets'] = { link: '/my-bets', text: this.$tc('i18n_aposta', 2) }
      }

      items['/promo'] = {
        link: '/promo',
        external: this.productConfigPromoUrl.status !== null,
        target: this.productConfigPromoUrl.status ? '_blank' : '_self',
        text: this.productConfigPromoUrl.status
          ? this.$t('i18n_ranking')
          : this.$tc('i18n_promocao', 2)
      }

      if (!this.applicationType('sports') || this.applicationType('casino')) {
        items['/casino'] = { link: '/casino', text: this.$t('i18n_cassino') }
        items['/casino?cat=live'] = { link: '/casino?cat=live', text: this.$t('i18n_cassino_ao_vivo') }
      }

      const regex = new RegExp(window.location.origin, 'g')

      if (this.currentSettings.nav_bar && this.currentSettings.nav_bar.length) {
        this.currentSettings.nav_bar.forEach((nav, idx) => {
          if (nav.nav_link.replace(regex, '') === '') {
            items['/'] = {
              link: '/',
              text: nav.nav_name,
              img: nav.img
            }
          }

          if (items[nav.nav_link.replace(regex, '')]) {
            items[nav.nav_link.replace(regex, '')] = {
              link: nav.nav_link.replace(regex, ''),
              text: nav.nav_name,
              img: nav.img
            }
          } else {
            items[`nav_item${idx}`] = {
              link: nav.nav_link,
              text: nav.nav_name,
              img: nav.img,
              external: true
            }
          }
        })
      }

      return items
    }
  },
  watch: {
    searchTerm (val) {
      // todo call a timer delay
      if (this.searchTimeout) {
        clearTimeout(this.searchTimeout)
      }

      this.searchTimeout = setTimeout(() => {
        this.$emit('searchGame', val)
      }, 1000)
    },
    loggedInUser (val) {
      this.$emit('fetchUserBets')
    }
  },
  mounted () {
    this.$root.$on('toggleNav', () => {
      this.open = !this.open
    })
    this.$emit('fetchUserBets')

    if (this.navItems[this.$route.fullPath]) {
      this.currentMobileNav = this.navItems[this.$route.fullPath].link
    } else {
      this.currentMobileNav = '/'
    }
  },
  beforeDestroy () {
    this.$root.$off('toggleNav')
  },
  methods: {
    applicationType (term) {
      const config = '' + process.env.PRODUCT_CONFIG
      return config.includes(term)
    },
    navigate (link) {
      location.href = link
    },
    startMobileSearch () {
      this.mobileSearch = true
    },
    resetSearch () {
      setTimeout(() => {
        this.searchTerm = null
      }, 200)
    },
    formattedDate (day) {
      const semana = ['Domingo', 'Segunda-Feira', 'Terça-Feira', 'Quarta-Feira', 'Quinta-Feira', 'Sexta-Feira', 'Sábado']
      const mes = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']
      let dateReturn = ''
      if (dayjs(day).isToday()) {
        dateReturn = `${this.$t('i18n_hoje')} as ${dayjs(day).format('HH:mm')}`
      } else if (dayjs(day).isTomorrow()) {
        dateReturn = `${this.$t('i18n_amanha')} as ${dayjs(day).format('HH:mm')}`
      } else {
        dateReturn = semana[dayjs(day).day()] + ', ' + dayjs(day).format('DD [de] ') + mes[dayjs(day).month()] + ' ' + dayjs(day).format('[as] HH:mm')
      }
      return dateReturn
    },
    openNewWindow (link) {
      window.open(link, 'newwindow', 'width=900,height=750,top=100,left=300')
      return false
    },
    currentRoute (route) {
      return route === '' + this.$nuxt.$route.path
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
  .form-select-nsx{
    font-size: 14pt;
    background: transparent;
    color: var(--fut-secondary);
    border: none;
  }
  .alert-bets{
    background: #EC453C;
    color: white;
    border-radius: 50%;
    font-size: 10px;
    padding: 0px 6px;
    position: absolute;
    right: 0;
    @include lg {
      top: -1px;
    }
  }
  .alert-bets-mobile{
    background: #EC453C;
    color: white;
    border-radius: 50%;
    font-size: 10px;
    padding: 0px 5px;
    position: absolute;
    right: 0px;
    top: 2px;
  }
  .text-title-nsx{
    color: #D2D2D2;
    font-weight: 600;
    .middle{
      color: #ff8800;
    }
    .final{
      color: #ff6600;
    }
  }
  .btn-register{
    font-size: 8pt;
    padding: 0.2rem 0.4rem;
    background: linear-gradient(#ff8800,#ff6600);
    color: #fff;
    border: none;
    line-height: 1.5;
    border-radius: 0.2rem !important;
  }
  .btn-login{
    font-size: 8pt;
    padding: 0.2rem 0.4rem;
    background: linear-gradient(#00c851,#007e33);
    color: #fff;
    border: none;
    line-height: 1.5;
    border-radius: 0.2rem !important;
  }
  .nav-inplay{
    text-align: center;
    line-height: 14px;
    font-weight: 700;
    color: #ffba39;
    font-size: 13px;
    position: relative;
    top: 8px;
  }
  .icon-nav{
    font-size: 24px;
  }
  .mobile-navbar{
    height: 50px;
  }
  .bg-bet{
    background: linear-gradient(var(--fut-primary),var(--fut-background-2)) !important;
  }
  .navbar-brand {
    background: var(--fut-background-logo);
  }
  .user-nav{
    z-index: 1031;
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
  .a{
    color: $white;
  }
  .sign-menu .a:hover{
    color: var(--fut-primary) !important;
  }
  .hor-div{
    border-right: 2px solid var(--fut-secondary);
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
  .btn-old-bet{
    font-size: 14.6px;
  }
  .btn-old-bet:hover{
    color: #fff;
    text-decoration: underline;
  }
  .hover-orange:hover{
    color: #ffa500 !important;
  }
  .selected{
    background: #ffa500;
    width: 10px;
    height: 10px;
    margin-top: 5px;
    margin-right: 10px;
  }
  .bg-bet-under{
    background: var(--nsx-dark-1);
  }
  .text-orange{
    color: #ff8800;
  }
  .fs-12{
    font-size: 12px;
  }
  .login-btn{
    font-size: 13.3px;
  }
  .btn-close-all{
    position: absolute;
    z-index: 99999999999;
    top: 0;
    right: 0;
    width: 100%;
    height: 100vh;
  }
  .search-input{
    input:focus{
      border: none !important;
    }
  }
  .search-field{
    top: -1px;
    background: #1d1d1d;
    width: 100%;
    border-radius: 5px;
    overflow-y: auto;
    max-height: calc(100vh - 10px);
    z-index: 1050;
    position: relative;
    @include md {
      max-height: calc(100vh - 150px);
      margin-left: 5px;
      width: 430px;
    }
  }
  .search-item{
    padding: 5px;
  }
  .result-title{
    font-size: 10.6px;
    font-weight: 700;
    color: #ff8800;
    span{
      color: #ffa500;
    }
  }
  .result-game{
    font-size: 13.3px;
    color: #d2d2d2;
  }
  .search-item:hover{
    background: #ff8800;
    *{
      color: #f6f7f7 !important;
    }
  }
  .result-time{
    font-size: 10.6px;
    color: var(--nsx-gray-1) !important;
  }
  .close-search-mobile{
    padding: 0;
    background: var(--nsx-dark-2);
  }
  .text-nsx-gray{
    color: var(--nsx-gray-1);
    font-size: 19px;
  }

.dropdown {
  position: relative;
  display: flex;
}
.spanish-flag {
  width: 16px;
  height: 13px;
}
.text-user-dashboard{
  font-size: 12px;
}
.dropdown-content {
  display: none;
  position: absolute;
  min-width: 160px;
  white-space: nowrap;
  z-index: 1050;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  a, button {
    color: white;
    padding: 12px 16px;
    text-decoration: none;
    display: block;
    background-color: var(--fut-background-2-lighter);
    border-bottom: 1px solid var(--fut-background-2-lightest);
    border-radius: 0;
    font-size: 14px;
      &:hover {
        cursor: pointer;
        background-color: var(--fut-background-2);
      }
    }
}
.dropdown:hover .dropdown-content {
  display: block;
}
.dropdown:hover .dropbtn {
  background-color: var(--fut-primary);
}
.pointer{
  cursor: pointer;
}
.nsx-mobile-nav {
  cursor: pointer;
  color: var(--fut-secondary);

  &[aria-expanded="true"] {
    .icon{
      -webkit-transform: rotate(90deg);
      transform: rotate(180deg);
    }
  }
}
.dropdown-menu {
  background: var(--nsx-dark-3);

  li {
    border-bottom: 1px solid var(--nsx-dark-1);
    &:hover {
      background: var(--fut-primary);

      a {
        color: #fff !important;
      }
    }
    &:last-of-type {
      border-bottom: none;
    }

    a {
      color: var(--fut-secondary) !important;
    }
  }
}
</style>

<template>
  <nav id="page-top" class="d-print-none">
    <div
      class="d-flex align-items-center justify-content-between navbar-content container-fluid py-md-2 py-2 bg-navbar"
    >
      <div class="d-flex w-100">
        <div class="d-flex align-items-center">
          <fb-fut-button
            class="border-0 bg-transparent hamburger text-white mr-10 fs-5 d-md-none fut-color-dynamic position-relative"
            @click="()=>{ShowProfileMenu = false, ShowSideMenu = !ShowSideMenu}"
          >
            <template v-if="!ShowSideMenu">
              <font-awesome-icon :icon="['fas', 'bars']" />
              <div class="bars-block" />
            </template>
          </fb-fut-button>
          <fb-fut-button v-if="currentSettings" class="fut-color-dynamic" :class="{'img-logo-bg': currentSettings.background_logo === 1 || currentSettings.background_logo === null}" to="/">
            <img
              :src="currentSettings.logo ? currentSettings.logo : ''"
              class="px-1 logo"
              style="object-fit: contain;"
              alt="Logo FDS"
            >
          </fb-fut-button>
        </div>

        <div class="w-100 align-items-center d-none d-md-flex">
          <fut-responsive-dropdown
            :filler-width="loggedInUser ? 470 : 440"
          >
            <fb-fut-button
              v-if="productRedirect && loggedInUser"
              class="nav-link d-inline-flex align-items-center text-white fut-color-dynamic"
              @click="$emit('redirectProduct')"
            >
              <span>{{ productRedirect.title }}</span>
            </fb-fut-button>
            <fb-fut-button
              v-for="(item, idx) in navItems"
              :key="idx"
              class="nav-link d-inline-flex align-items-center fut-color-dynamic"
              :class="{'text-primary fut-selected-color-dynamic': currentRoute(item.link)}"
              :to="item.link"
              :external="item.external"
              :target="item.target"
            >
              <img
                v-if="item.img"
                :src="item.img"
                width="15"
                height="15"
                alt="Icon"
              >
              <span>{{ item.text }}</span>
            </fb-fut-button>
          </fut-responsive-dropdown>
        </div>
      </div>
      <div class="d-flex">
        <div v-if="loggedInUser && currentSettings" class="d-md-flex align-items-center d-none">
          <fb-fut-button class="me-5 button-deposit fut-color-dynamic" to="/user/bank/deposito" :class="{'btn-fb-rounded-secondary': currentSettings.font === 'dark'}">
            {{ $t('i18n_deposito', 1) }}
          </fb-fut-button>
          <fb-balance-dropdown
            :balance="loggedInUser.balance"
            :balance-bonus="loggedInUser.balance_bonus"
            :free-bet="loggedInUser.free_bet"
            :blocked-balance="loggedInUser.player.freebet_closed"
          />
          <div class="profile-content d-grid">
            <span class="text-white profile-name text-user-dashboard fut-color-dynamic">{{ loggedInUser.username }}</span>
            <span class="profile-log text-white op-6 text-user-dashboard fw-light fut-color-dynamic"><small>{{ $t('i18n_ultimo') }} login: {{ formattedDate(loggedInUser.player.updated_at) }}</small></span>
          </div>
        </div>
        <div v-if="loggedInUser" class="d-flex align-items-center d-md-none">
          <fb-fut-button class="button-register d-md-none me-2 text-dark fut-color-dynamic" to="/user/bank/deposito">
            <small style="text-transform: none;" class="fw-bold">{{ $t('i18n_depositar') }}</small>
          </fb-fut-button>
          <div class="d-md-none d-grid profile-mobile-content mr-10">
            <span class="text-white fut-color-dynamic">BRL</span>
            <span class="text-primary fw-bold fut-color-dynamic"><small>{{ loggedInUser.balance }}</small></span>
          </div>
          <fb-fut-button class="bg-degraprim border-0" @click="()=>{ShowSideMenu = false; ShowProfileMenu = !ShowProfileMenu;}">
            <!-- <img class="profile-picture" src="/img/avatar-placeholder.svg"> -->
            <span v-if="loggedInUser && loggedInUser.username">{{ loggedInUser.username[0] }}{{ loggedInUser.username[1] }}</span>
          </fb-fut-button>
        </div>
        <div v-if="!loggedInUser && currentSettings" class="d-flex">
          <fb-fut-button class="button-login d-none d-md-inline me-2 fut-color-dynamic" @click="modalLogin = true">
            {{ $t('i18n_entrar').toUpperCase() }}
          </fb-fut-button>
          <fb-fut-button class="button-login d-md-none me-2 fut-color-dynamic" to="/login">
            <span class="fw-bold text-uppercase">{{ $t('i18n_entrar').toUpperCase() }}</span>
          </fb-fut-button>
          <fb-fut-button class="button-register transition" to="/register">
            <span class="fw-bold text-dark">{{ $t('i18n_registro') }}</span>
          </fb-fut-button>
        </div>
      </div>
    </div>

    <!-- Login Modal -->
    <fb-modal
      v-if="!loggedInUser"
      :open="modalLogin"
      :is-mobile="isMobile"
      @onClose="modalLogin = false"
    >
      <div class="d-flex align-items-center justify-content-center">
        <span class="fw-bold text-primary me-1">{{ $t('i18n_bem_vindo_a') }}</span>
        <img
          v-if="currentSettings"
          :src="currentSettings.logo"
          class="p-1 logo"
          alt="Logo FDS"
          style="object-fit: contain;"
        >
      </div>
      <div class="text-center justify-content-center">
        <span class="fw-bold my-2 mb-1 d-block fut-color-dynamic">{{ $t('i18n_entrar') }}</span>
        <span class="my-2 fut-color-dynamic"><small>{{ $t('i18n_insira_seus_dados_para') }}</small></span>
        <form
          class="container mt-3 px-4"
          @submit.prevent="$emit('logUser', data)"
        >
          <input
            v-model="data.email"
            class="w-100 mt-2 py-2 px-4 login-input"
            type="text"
            :placeholder="$t('i18n_nome_do_usuario')"
          >
          <div class="position-relative">
            <input
              v-model="data.password"
              :type="showPassword ? 'text' : 'password'"
              class="w-100 py-2 px-4 login-input mt-2"
              :placeholder="$t('i18n_senha')"
            >
            <div
              class="btn show-password fut-color-dynamic"
              @click="showPassword = !showPassword"
            >
              <font-awesome-icon v-if="!showPassword" class="eye-icon" :icon="['fas', 'eye-slash']" />
              <font-awesome-icon v-else class="eye-icon" :icon="['fas', 'eye']" />
            </div>
          </div>
          <div class="d-flex justify-content-between mt-3">
            <fb-fut-button
              class="button-login-modal text-dark fut-color-dynamic"
              type="submit"
              block
              rounded
              border-radius="5px"
            >
              <span class="login-btn">{{ $t('i18n_entrar') }}</span>
            </fb-fut-button>
            <div>
              <fb-fut-button
                class="w-100 fut-color-dynamic forgot-pass-link text-end"
                to="/login/novaSenha"
              >
                {{ $t('i18n_esqueceu_a_sua_senha') }}
              </fb-fut-button>
            </div>
          </div>
          <div class="text-center d-grid mt-3">
            <span v-if="currentSettings" class="text-gray register-section fut-color-dynamic">{{ $t('i18n_novo_no_bet') }} {{ currentSettings.name }}? <fb-fut-button class="text-decoration-none ms-2" to="/register">{{ $t('i18n_registrar') }}</fb-fut-button></span>
          </div>
        </form>
      </div>
    </fb-modal>
    <!-- logout modal -->
    <fb-modal :open="modalLogout" @onClose="()=>{ modalLogout = false; }">
      <h5 class="text-center fut-color-dynamic">
        {{ $t('i18n_confirmacao') }}
      </h5>
      <font-awesome-icon class="text-center icon-question fut-color-dynamic" :icon="['far', 'question-circle']" />
      <div class="text-center mt-4 fut-color-dynamic">
        <span class="text-center">{{ $t('i18n_deseja_realmente_sair') }}</span>
      </div>
      <div class="d-flex justify-content-center">
        <fb-fut-button class="btn-fb btn-danger-outline-fb fut-color-dynamic" @click="modalLogout=false">
          {{ $t('i18n_nao') }}
        </fb-fut-button>
        <fb-fut-button class="btn-fb btn-danger-fb text-decoration-none fut-color-dynamic" to="/logout">
          {{ $t('i18n_sim') }}
        </fb-fut-button>
      </div>
    </fb-modal>
    <!-- Menu Lateral -->
    <transition name="fade" appear>
      <div v-if="ShowSideMenu" class="side-menu-overlay side-menu-content-mobile">
        <fb-fut-button class="btn-close-2" @click="()=>{ShowProfileMenu = false; ShowSideMenu = !ShowSideMenu}">
          <font-awesome-icon class="text-white fut-color-dynamic" :icon="['fas', 'times']" />
        </fb-fut-button>
        <fb-fut-button class="button-exit-menu" @click="()=>{ShowProfileMenu = false; ShowSideMenu = !ShowSideMenu}" />
        <div class="w-75 h-100 side-menu-content">
          <fb-mobile-menu-top
            v-if="currentSettings && mobileNavItems.main"
            :font="currentSettings.font"
            :items="mobileNavItems.main"
          />
          <div class="w-100 d-grid">
            <template v-if="mobileNavItems.dynamic && mobileNavItems.dynamic.length">
              <fb-fut-button
                v-for="(item, idx) in mobileNavItems.dynamic"
                :key="idx"
                external
                class="a py-3 text-start"
                :to="item.nav_link"
              >
                <img
                  v-if="item.img"
                  :src="item.img"
                  width="15"
                  height="15"
                  alt="Icon"
                  class="ms-3"
                >
                <span class="container text-white fut-color-dynamic">{{ item.nav_name }}</span>
              </fb-fut-button>
            </template>
            <fb-fut-button
              class="a py-3 bg-green text-start"
              :external="productConfigPromoUrl.status !== null"
              :target="productConfigPromoUrl.status ? '_blank' : '_self'"
              :to="productConfigPromoUrl.url"
            >
              <span class="container fut-color-dynamic">{{ productConfigPromoUrl.status ? $t('i18n_ranking') : $t('i18n_promocao', 2) }}</span>
            </fb-fut-button>
            <div class="locale-container">
              <button class="btn d-flex justify-content-between btn-locale" @click="toggleLocaleMobile = !toggleLocaleMobile">
                <div class="d-flex">
                  <span>
                    <img v-if="$i18n.locale.toUpperCase() === 'EN'" src="/flags/1.png" class="me-1" alt="Flag image">
                    <img v-else-if="$i18n.locale === 'ES'" src="/flags/espanha.png" class="me-1 spanish-flag" alt="Flag image">
                    <img v-else src="/flags/14.png" class="me-1" alt="Flag image">
                  </span>
                  <span class="text-white fut-color-dynamic">{{ $i18n.locale.toUpperCase() }}</span>
                </div>
                <font-awesome-icon v-if="toggleLocaleMobile" class="text-white fut-color-dynamic pt-1" :icon="['fas', 'sort-up']" />
                <font-awesome-icon v-else class="text-white fut-color-dynamic" :icon="['fas', 'sort-down']" />
              </button>
              <transition name="fade">
                <div v-if="toggleLocaleMobile" class="d-flex flex-column">
                  <a
                    v-for="(locale, localeIdx) in $i18n.locales"
                    :key="'casino_header_locale_mobile_'+localeIdx"
                    class="btn-locale hover-bg-primary"
                    @click="()=>{toggleLocaleMobile = !toggleLocaleMobile;$emit('changeLanguage', locale)}"
                  >
                    <span>
                      <span>
                        <img v-if="locale === 'EN'" src="/flags/1.png" class="me-0" alt="Flag image">
                        <img v-else-if="locale === 'ES'" src="/flags/espanha.png" class="me-0 spanish-flag" alt="Flag image">
                        <img v-else src="/flags/14.png" class="me-0" alt="Flag image">
                      </span>
                      <span class="fut-color-dynamic">{{ locale }}</span>
                    </span>
                  </a>
                </div>
              </transition>
            </div>
          </div>
        </div>
      </div>
      <div v-else-if="ShowProfileMenu" class="side-menu-overlay-profile">
        <div class="w-100 h-100 side-menu-content-2">
          <div class="profile-header-menu d-flex justify-content-between align-items-center">
            <span v-if="loggedInUser" class="text-white fut-color-dynamic">{{ loggedInUser.username }}</span>
            <fb-fut-button class="button-deposit-mobile fut-color-dynamic" to="/user/bank/deposito">
              {{ $t('i18n_depositar').toUpperCase() }}
            </fb-fut-button>
          </div>
          <div class="d-flex">
            <fb-fut-button class="a w-100 border-right py-2 content-right-sidebar-links text-center border-right-grays d-grid" to="/user/bank/saldo">
              <div class="indice-content">
                <img class="fut-image-dynamic" src="/FbIcons/índice1.png">
              </div>
              <div class="d-grid">
                <span class="fs-2 text-white mb-0 fw-bold fut-color-dynamic">{{ loggedInUser.balance }}</span>
                <span class="text-white indice-text fut-color-dynamic">{{ $t('i18n_saldo') }}</span>
              </div>
            </fb-fut-button>
            <fb-fut-button class="a w-100 py-2 content-right-sidebar-links text-center" :to="(!applicationType('casino') || applicationType('sports')) ? '/my-bets' : '/user/bank/transactions'">
              <div class="indice-content">
                <img class="fut-image-dynamic" src="/FbIcons/índice.png">
              </div>
              <div class="d-grid">
                <span class="bal-value" />
                <span class="text-white indice-text fut-color-dynamic">{{ $t('i18n_aposta', 2) }}</span>
              </div>
            </fb-fut-button>
          </div>
          <div class="subtitle-sidebar-right container fut-color-dynamic">
            <span class="fut-color-dynamic">{{ $t('i18n_conta').toUpperCase() }}</span>
          </div>
          <div class="subtitle-content">
            <fb-fut-button class="a w-100 p-2 fut-color-dynamic" to="/user/my-account/dados">
              <font-awesome-icon :icon="['fas', 'user']" />
              <span>{{ $t('i18n_perfil') }}</span>
            </fb-fut-button>
            <fb-fut-button class="a w-100 p-2 fut-color-dynamic" to="/user/my-account/documentos">
              <font-awesome-icon :icon="['fas', 'user']" />
              <span>{{ $t('i18n_documentos') }}</span>
            </fb-fut-button>
            <fb-fut-button class="a w-100 p-2 fut-color-dynamic" to="/user/bank/saldo">
              <font-awesome-icon :icon="['fas', 'money-bill']" />
              <span>{{ $t('i18n_saldo') }}</span>
            </fb-fut-button>
            <fb-fut-button class="a w-100 p-2 fut-color-dynamic" to="/user/my-account/bonus">
              <font-awesome-icon :icon="['fas', 'gift']" />
              <span>{{ $t('i18n_bonus') }}</span>
            </fb-fut-button>
            <fb-fut-button class="a w-100 p-2 fut-color-dynamic" to="/user/bank/saque">
              <font-awesome-icon :icon="['fas', 'ring']" />
              <span>{{ $t('i18n_solicitar_saque') }}</span>
            </fb-fut-button>
          </div>
          <div class="subtitle-sidebar-right container fut-color-dynamic">
            <span class="fut-color-dynamic">{{ $t('i18n_relatorios').toUpperCase() }}</span>
          </div>
          <div class="subtitle-content">
            <fb-fut-button v-if="!applicationType('casino') || applicationType('sports')" class="a w-100 p-2 fut-color-dynamic" to="/my-bets">
              <font-awesome-icon :icon="['fas', 'chart-area']" />
              <span>{{ $t('i18n_relatorios_de_apostas') }}</span>
            </fb-fut-button>
            <!-- <a v-if="!applicationType('casino') || applicationType('sports')" class="w-100 p-2" href="#">
              <font-awesome-icon :icon="['fas', 'chart-line']" />
              <span>{{ $t('i18n_relatorios_de_transacoes') }}</span>
            </a> -->
            <fb-fut-button class="w-100 p-2 fut-color-dynamic" to="/user/bank/saque/historico">
              <font-awesome-icon :icon="['fas', 'chart-line']" />
              <span>{{ $t('i18n_pedidos_de_saques') }}</span>
            </fb-fut-button>
            <fb-fut-button v-if="!applicationType('sports') || applicationType('casino')" class="a w-100 p-2 fut-color-dynamic" to="/user/bank/transactions">
              <font-awesome-icon :icon="['fas', 'chart-line']" />
              <span>{{ $t('i18n_transacoes_cassino') }}</span>
            </fb-fut-button>
          </div>
          <div class="subtitle-sidebar-right container fut-color-dynamic">
            <span class="fut-color-dynamic">{{ $t('i18n_ajuda').toUpperCase() }}</span>
          </div>
          <div class="subtitle-content">
            <fb-fut-button class="a w-100 p-2 fut-color-dynamic" to="/help?slug=about">
              <font-awesome-icon :icon="['fas', 'question']" />
              <span>{{ $t('i18n_quem_somos') }}</span>
            </fb-fut-button>
            <fb-fut-button class="a w-100 p-2 fut-color-dynamic" to="/help?slug=terms">
              <font-awesome-icon :icon="['fas', 'info-circle']" />
              <span>{{ $t('i18n_termos_e_condicoes') }}</span>
            </fb-fut-button>
            <fb-fut-button class="a w-100 p-2 fut-color-dynamic" to="/help?slug=suport">
              <font-awesome-icon :icon="['fas', 'phone']" />
              <span>{{ $t('i18n_entre_em_contato') }}</span>
            </fb-fut-button>
          </div>
          <div class="text-center mt-3">
            <fb-fut-button class="a button-logout-mobile fut-color-dynamic" to="/logout">
              <span>{{ $t('i18n_sair') }}</span>
            </fb-fut-button>
          </div>
        </div>
      </div>
    </transition>
    <div v-if="currentSettings" class="second-navbar container-fluid py-1 d-md-flex d-none align-items-center justify-content-between" :class="{'bg-secondary': currentSettings.font === 'dark'}">
      <ul class="list-unstyled d-flex mb-0">
        <li v-if="currentSettings && currentSettings.fb" class="social-midia-content">
          <fb-fut-button target="_blank" :to="currentSettings.fb" external>
            <font-awesome-icon class="icon text-dark" :icon="['fab', 'facebook-f']" />
          </fb-fut-button>
        </li>
        <li v-if="currentSettings && currentSettings.insta" class="social-midia-content">
          <fb-fut-button target="_blank" :to="currentSettings.insta" external>
            <font-awesome-icon class="icon text-dark" :icon="['fab', 'instagram']" />
          </fb-fut-button>
        </li>
        <li v-if="currentSettings && currentSettings.tiktok" class="social-midia-content">
          <fb-fut-button target="_blank" :to="currentSettings.tiktok" external>
            <font-awesome-icon class="icon text-dark" :icon="['fab', 'tiktok']" />
          </fb-fut-button>
        </li>
        <li v-if="currentSettings && currentSettings.tt" class="social-midia-content">
          <fb-fut-button target="_blank" :to="currentSettings.tt" external>
            <font-awesome-icon class="icon text-dark" :icon="['fab', 'twitter']" />
          </fb-fut-button>
        </li>
        <li v-if="currentSettings && currentSettings.yt" class="social-midia-content">
          <fb-fut-button target="_blank" :to="currentSettings.yt" external>
            <font-awesome-icon class="icon text-dark" :icon="['fab', 'youtube']" />
          </fb-fut-button>
        </li>
        <li v-if="currentSettings && currentSettings.phone" class="social-midia-content">
          <fb-fut-button target="_blank" :to="'tel:'+currentSettings.phone" external>
            <font-awesome-icon class="icon text-dark" :icon="['fab', 'telegram-plane']" />
          </fb-fut-button>
        </li>
        <li v-if="currentSettings && currentSettings.whats" class="social-midia-content">
          <fb-fut-button target="_blank" :to="'https://wa.me/'+currentSettings.whats" external>
            <font-awesome-icon class="icon text-dark" :icon="['fab', 'whatsapp']" />
          </fb-fut-button>
        </li>
      </ul>
      <div class="d-flex align-items-center mr-2">
        <span class="text-white font-size-time mr-20">
          <small>{{ formattedDateDay() }}</small>
        </span>
        <div v-if="loggedInUser" class="dropdown mr-20">
          <div class="d-flex align-items-center text-user-dashboard">
            <span class="mr-10 text-white">
              {{ $t('i18n_minha_conta') }}
            </span>
            <font-awesome-icon class="text-white" :icon="['fas', 'angle-down']" />
          </div>
          <div v-if="loggedInUser" class="dropdown-content">
            <fb-fut-button class="text-start fut-color-dynamic" to="/user/my-account/dados">
              {{ $t('i18n_perfil') }}
            </fb-fut-button>
            <fb-fut-button class="text-start fut-color-dynamic" to="/user/my-account/documentos">
              {{ $t('i18n_documentos') }}
            </fb-fut-button>
            <fb-fut-button class="text-start fut-color-dynamic" to="/user/bank/saldo">
              {{ $t('i18n_saldo') }}
            </fb-fut-button>
            <fb-fut-button class="text-start fut-color-dynamic" to="/user/my-account/bonus">
              {{ $t('i18n_bonus') }}
            </fb-fut-button>
            <fb-fut-button class="text-start fut-color-dynamic" to="/user/bank/deposito">
              {{ $t('i18n_deposito', 1) }}
            </fb-fut-button>
            <fb-fut-button class="text-start fut-color-dynamic" to="/user/bank/saque">
              {{ $t('i18n_solicitar_saque') }}
            </fb-fut-button>
            <fb-fut-button class="text-start fut-color-dynamic" to="/user/bank/saque/historico">
              {{ $t('i18n_pedidos_de_saques') }}
            </fb-fut-button>
            <fb-fut-button class="text-primary text-start fut-color-dynamic" block @click="modalLogout=true">
              {{ $t('i18n_sair') }}
            </fb-fut-button>
          </div>
        </div>
        <div v-if="loggedInUser" class="dropdown mr-20">
          <div class="d-flex align-items-center text-user-dashboard">
            <span class="mr-10 text-white">
              {{ $t('i18n_relatorios') }}
            </span>
            <font-awesome-icon class="text-white" :icon="['fas', 'angle-down']" />
          </div>
          <div style="right: -20px" class="dropdown-content">
            <fb-fut-button v-if="!applicationType('casino') || applicationType('sports')" class="fut-color-dynamic" to="/my-bets">
              {{ $t('i18n_relatorios_de_apostas') }}
            </fb-fut-button>
            <fb-fut-button v-if="!applicationType('sports') || applicationType('casino')" class="fut-color-dynamic" to="/user/bank/transactions">
              {{ $t('i18n_transacoes_cassino') }}
            </fb-fut-button>
          </div>
        </div>
        <div class="dropdown mr-2">
          <div class="d-flex align-items-center text-user-dashboard">
            <span>
              <img v-if="$i18n.locale.toUpperCase() === 'EN'" src="/flags/1.png" class="me-1" alt="Flag image">
              <img v-else-if="$i18n.locale === 'ES'" src="/flags/espanha.png" class="me-1 spanish-flag" alt="Flag image">
              <img v-else src="/flags/14.png" class="me-1" alt="Flag image">
            </span>
            <span class="mr-10 text-white">
              {{ $i18n.locale.toUpperCase() }}
            </span>
            <font-awesome-icon class="text-white" :icon="['fas', 'angle-down']" />
          </div>
          <div style="right: -20px" class="dropdown-content">
            <a
              v-for="(locale, localeIdx) in $i18n.locales"
              :key="localeIdx"
              class="text-white fut-color-dynamic"
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
      </div>
    </div>
  </nav>
</template>

<script>
import dayjs from 'dayjs'
import FbFutButton from '@/components/fb/atoms/FbFutButton'
import FbModal from '@/components/fb/organisms/FbModal'
import FbMobileMenuTop from '@/components/fb/organisms/FbMobileMenuTop'
import FbBalanceDropdown from '@/components/fb/molecules/FbBalanceDropdown'
import FutResponsiveDropdown from '@/components/default/atoms/FutResponsiveDropdown'
import windowWidth from '~/mixins.js/windowWidth'
// const isToday = require('dayjs/plugin/isToday')
// const isTomorrow = require('dayjs/plugin/isTomorrow')
// dayjs.extend(isToday)
// dayjs.extend(isTomorrow)

export default {
  name: 'FbNavbar',
  components: {
    FbMobileMenuTop,
    FbModal,
    FbFutButton,
    FutResponsiveDropdown,
    FbBalanceDropdown
  },
  mixins: [windowWidth],
  props: {
    casinoGames: {
      type: Array,
      default: () => ([])
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
    modelValue: {
      type: Boolean,
      default: false
    },
    isMobile: {
      type: Boolean,
      default: false
    },
    allSports: {
      type: Array,
      default: () => ([])
    }
  },
  emits: [
    'redirectProduct',
    'logUser',
    'changeLanguage',
    'update:modelValue'
  ],
  data () {
    return {
      toggleLocaleMobile: false,
      showPassword: false,
      data: {
        email: '',
        password: ''
      },
      modalLogout: false,
      timestamp: null,
      interval: null,
      ShowSideMenu: false,
      ShowProfileMenu: false,
      sportsIcons: {
        6046: { fa: false, value: ['icon', 'icon-soccer'] },
        35709: { fa: true, value: ['fas', 'futbol'] },
        48242: { fa: true, value: ['fas', 'basketball-ball'] },
        54094: { fa: false, value: ['icon', 'icon-tenis'] },
        131506: { fa: false, value: ['icon', 'icon-football'] },
        154830: { fa: false, value: ['icon', 'icon-voley'] },
        154914: { fa: false, value: ['icon', 'icon-tenis-2'] },
        154919: { fa: false, value: ['icon', 'icon-boxing'] },
        265917: { fa: true, value: ['fas', 'table-tennis'] },
        621569: { fa: true, value: ['fas', 'volleyball-ball'] },
        687890: { fa: true, value: ['fas', 'gamepad'] }
      }
    }
  },
  computed: {
    productConfigPromoUrl () {
      return {
        status: process.env.PRODUCT_CONFIG_PROMO_URL,
        url: process.env.PRODUCT_CONFIG_PROMO_URL
          ? process.env.PRODUCT_CONFIG_PROMO_URL
          : '/promo'
      }
    },
    navItems () {
      const items = []

      if (!this.applicationType('casino') || this.applicationType('sports')) {
        items.push(
          { link: '/', text: this.$t('i18n_esporte', 2), icon: '/FbIcons/sports.svg' }
        )
        if (process.env.SPORTS_PROVIDER === 'upgaming') {
          items.push(
            { link: '/virtuais', text: this.$t('i18n_virtuais'), icon: '/FbIcons/cassino_futebol.svg' },
            { link: '/esports', text: this.$t('i18n_esports'), icon: '/FbIcons/cassino_virtuais_2.svg' }
          )
        } else {
          items.push(
            { link: '/aovivo', text: this.$t('i18n_ao_vivo'), icon: '/FbIcons/cassino_futebol.svg' }
          )
        }
      }

      if (!this.applicationType('sports') || this.applicationType('casino')) {
        items.push(
          { link: '/casino', text: this.$t('i18n_cassino'), icon: '/FbIcons/video_slot.svg' },
          { link: '/casino-aovivo', text: this.$t('i18n_cassino_ao_vivo'), icon: '/FbIcons/live_casino.svg' }
        )
      }

      items.push({
        link: this.productConfigPromoUrl.url,
        external: this.productConfigPromoUrl.status !== null,
        target: this.productConfigPromoUrl.status ? '_blank' : '_self',
        text: this.productConfigPromoUrl.status
          ? this.$t('i18n_ranking')
          : this.$t('i18n_promocao', 2)
      })

      if (this.currentSettings && this.currentSettings.nav_bar && this.currentSettings.nav_bar.length && process.client) {
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
    },
    mobileNavItems () {
      const items = { main: null, dynamic: null }
      // Filtro que retorna somente os pricipais itens de navegação
      const navItemsWithSports = this.navItems.filter(item =>
        (item.link !== '/') &&
        (!this.applicationType('casino') || this.applicationType('sports'))
      )
      navItemsWithSports.unshift({
        link: '/sports',
        text: this.$t('i18n_esporte', 2),
        img: '/FbIcons/sports.svg',
        external: false
      })
      items.main = navItemsWithSports.filter(item =>
        (
          (item.link === '/sports' || item.link === '/aovivo') &&
          (!this.applicationType('casino') || this.applicationType('sports'))
        ) ||
        (
          (item.link === '/virtuais' || item.link === '/esports') && process.env.SPORTS_PROVIDER === 'upgaming'
        ) ||
        (
          (item.link === '/casino' || item.link === '/casino-aovivo') &&
          (!this.applicationType('sports') || this.applicationType('casino'))
        )
      )

      if (this.currentSettings.nav_bar && this.currentSettings.nav_bar.length && process.client) {
        const regex = new RegExp(window.location.origin, 'g')

        // Filtro que retorna somente itens de navegação que não forem os principais
        items.dynamic = this.currentSettings.nav_bar.filter(item =>
          item.nav_link.replace(regex, '') !== '/' &&
          item.nav_link.replace(regex, '') !== '/aovivo' &&
          item.nav_link.replace(regex, '') !== '/virtuais' &&
          item.nav_link.replace(regex, '') !== '/esports' &&
          item.nav_link.replace(regex, '') !== '/casino' &&
          item.nav_link.replace(regex, '') !== '/casino-aovivo' &&
          item.nav_link.replace(regex, '') !== '/promo'
        )

        return items
      }

      return items
    },
    productRedirect () {
      if (!process.env.PRODUCT_REDIRECT_URL && !process.env.PRODUCT_REDIRECT_TITLE) {
        return null
      }
      return { url: process.env.PRODUCT_REDIRECT_URL, title: process.env.PRODUCT_REDIRECT_TITLE }
    },
    modalLogin: {
      get () {
        return this.modelValue
      },
      set (value) {
        this.$emit('update:modelValue', value)
      }
    },
    onDesktop () {
      return this.width >= 821
    }
  },
  created () {
    this.interval = setInterval(this.getNow, 1000)
  },
  beforeDestroy () {
    clearInterval(this.interval)
  },
  methods: {
    applicationType (term) {
      const config = '' + process.env.PRODUCT_CONFIG
      return config.includes(term)
    },
    getNow () {
      const today = new Date()
      const minPrefix = today.getMinutes() < 10 ? '0' : ''
      const hourPrefix = today.getHours() < 10 ? '0' : ''
      const time = hourPrefix + today.getHours() + ':' + minPrefix + today.getMinutes()
      this.timestamp = time
    },
    currentRoute (route) {
      if (process.client) {
        return route === this.$route.fullPath || route === `${window.location.origin}${this.$route.fullPath}`
      }

      return false
    },
    formattedDateDay () {
      const today = new Date()
      const semana = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado']
      const month = [
        this.$t('i18n_janeiro'),
        this.$t('i18n_fevereiro'),
        this.$t('i18n_marco'),
        this.$t('i18n_abril'),
        this.$t('i18n_maio'),
        this.$t('i18n_junho'),
        this.$t('i18n_julho'),
        this.$t('i18n_agosto'),
        this.$t('i18n_setembro'),
        this.$t('i18n_outubro'),
        this.$t('i18n_novembro'),
        this.$t('i18n_dezembro')]
      const dateReturn = `${this.timestamp} ${semana[dayjs().day()]} ${('0' + today.getDate()).slice(-2)} ${month[today.getMonth()]} ${today.getFullYear()}`
      return dateReturn
    },
    formattedDate (date) {
      return dayjs(date).format('DD/MM/YYYY HH:mm')
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/layout/breakpoints";
.btn {
  box-shadow: none;
}
.img-logo-bg{
  background: var(--fut-background-logo);
}
.spanish-flag {
  width: 16px;
  height: 13px;
}
.text-user-dashboard{
  font-size: 12px;
}
.icon-question{
  font-size: 100px;
}
.btn-fb{
  border-radius: 10px;
  border: none;
  padding: 5px 15px;
  margin: 10px;
  font-size: 16px;
}
.btn-danger-fb{
  background: #C1272D;
  color: white;
}
.btn-danger-outline-fb{
  color: white;
  border: 2px solid #C1272D;
  background: transparent;
}
.navbar-content {
  position: fixed;
  z-index: 11;
  @include md {
    position: relative;
    z-index: 3;
  }
}
.second-navbar {
  min-height: 40px;
  background-color: var(--fut-background-header-light);
}
.logo {
  width: 100%;
  height: 39px;
  max-width: 120px;
  @include md {
    max-width: initial;
    width: 200px;
    height: 72px;
  }
}

.nav-link {
  color: white;
  padding: 6px 12px;
  font-size: 10px;
  font-size: 14px;

  .icon-size{
    display: none;
  }
  @include xxl {
    .icon-size{
      display: block;
    }
  }
  &:hover {
    color: var(--fut-primary);
  }
}

.icon-size {
  font-size: 20px
}
.button-login {
  color: white;
  width: 100px;
  border-radius: 7px;
  font-weight: bold;
  font-size: 15px;
  padding: 10px 10px;
  background-color: var(--fut-background-header-white);
}
.bg-green {
  color: black;
  background-image: linear-gradient(to right, var(--fut-primary-black), var(--fut-primary));
  border-radius: 0;
}
.button-register {
  background: var(--fut-primary);
  text-decoration: none;
  border-radius: 7px;
  font-size: 15px;
  padding: 10px 10px;
  font-weight: bold;
  text-transform: uppercase;
  cursor: pointer;
  padding-top: 10px;
  @include md {
    text-transform: none;
    padding: 10px 20px;
    border-radius: 7px;
  }
  &:hover {
    background-image: linear-gradient(
      to right,
      var(--fut-secondary-lighter),
      var(--fut-secondary-lightest)
    );
  }
}
.button-login-mobile {
  background: transparent;
  border: 1px solid var(--fut-primary);
  color: white;
  text-decoration: none;
  border-radius: 7px;
  font-size: 13px;
  height: 40px;
  padding: 10px 10px;
  font-weight: bold;
  text-transform: uppercase;
}
.side-menu-content-2 {
  background-color: var(--fut-background-2);
  z-index: 2;
  position: relative;
  ul {
    width: 100%;
    list-style: none;
    position: relative;
    display: inline-block;
    vertical-align: top;
  }
  li {
    width: 100%;
    border: 0px;
    height: 50px;
    line-height: 50px;
  }
  .a {
    text-decoration: none;
    font-size: 13px;
  }
}
.side-menu-content {
  background-color: var(--fut-background-black);
  z-index: 2;
  position: relative;
  ul {
    width: 100%;
    list-style: none;
    position: relative;
    display: inline-block;
    vertical-align: top;
  }
  li {
    width: 100%;
    border: 0px;
    height: 50px;
    line-height: 50px;
  }
  .a {
    text-decoration: none;
    font-size: 13px;
  }
}
.sports-btns {
  display: flex;
  flex-direction: column;

  .link {
    text-decoration: none;
    color: var(--fut-color-dynamic);
    padding-left: 13px;
    line-height: 45px;
    display: flex;

    .icon-wrapper {
      width: 30px;

      .sport-icon {
        color: var(--fut-color-dynamic);
      }
    }
    span {
      font-size: 13px;
      color: var(--fut-color-dynamic);
    }
  }
}
.side-menu-content-mobile{
  height: 100vh;
}
.font-size-time {
  font-size: 12px;
}
.side-menu-overlay {
  position: fixed;
  overflow-y: auto;
  background-color: rgba( 0, 0, 0, 0.5);
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  z-index: 11;
}
.side-menu-overlay-profile {
  margin-top: 60px;
  position: fixed;
  overflow-y: auto;
  background-color: var(--fut-background);
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  z-index: 4;
}
.login-content {
  color: white;
  background: #232429;
  position: fixed;
  z-index: 5;
  top: 30%;
  left: 50%;
  right: 50%;
  width: 400px;
  margin-left: -150px;
  margin-right: -150px;
  border: 5px solid gray;
  border-radius: 2px;
}
.button-close-modal {
  position: absolute;
  top: 0;
  right: 0;
  color: var(--fut-primary);
}
.button-exit-menu {
  position: absolute;
  top: 0;
  right: 0;
  border: none;
  width: 100%;
  height: 100%;
  line-height: 40px;
  font-size: 30px;
  color: rgb(255, 255, 255);
  z-index: 1;
  background-color: transparent;
}
.button-reg-modal {
  background: transparent;
  border: 1px solid var(--fut-primary);
  height: 30px;
  font-weight: bold;
  color: white;
  text-decoration: none;
  border-radius: 3px;
  font-size: 13px;
  padding: 5px 10px;
  min-width: 100px;
}
.button-login-modal {
  background-image: linear-gradient(
    to right,
    var(--fut-primary-darker),
    var(--fut-primary)
  );
  height: 30px;
  font-weight: bold;
  border: none;
  text-decoration: none;
  border-radius: 0px;
  font-size: 13px;
  padding: 5px 10px;
  min-width: 100px;
}
.forgot-pass-link {
  text-decoration: underline;
  color: white;
  font-size: 11px;
  opacity: .5;
}
.profile-content {
  font-size: 14px;
  font-weight: bold;
}
.bg-degraprim {
  background-image: linear-gradient(to right, var(--fut-primary-black), var(--fut-primary));
  width: 30px;
  height: 30px;
  border-radius: 50px;
  text-transform: uppercase;
}
.button-deposit {
  background: var(--fut-primary);
  color: rgb(0, 0, 0);
  text-decoration: none;
  border-radius: 5px;
  font-size: 15px;
  height: 40px;
  padding: 10px 10px;
  font-weight: bold;
  &:hover {
    background-image: linear-gradient(
      to right,
      var(--fut-primary-darkest),
      var(--fut-secondary-darkest)
    );
  }
}
.button-deposit-mobile {
  background-image: linear-gradient(to right, var(--fut-primary-black), var(--fut-primary));
  color: rgb(0, 0, 0);
  text-decoration: none;
  font-size: 17px;
  height: 40px;
  padding: 10px 20px;
  border-radius: 0px;
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
  a, button {
    color: white;
    padding: 12px 16px;
    text-decoration: none;
    display: block;
    background-color: var(--fut-background-lighter);
    border-bottom: 1px solid var(--fut-background-lightest);
    border-radius: 0;
    font-size: 14px;
      &:hover {
        cursor: pointer;
        background-color: var(--fut-background);
      }
    }
}
.dropdown:hover .dropdown-content {
  display: block;
}
.dropdown:hover .dropbtn {
  background-color: var(--fut-primary);
}
.profile-mobile-content {
  font-size: 13px;
}
.profile-picture {
  width: 35px;
  border-radius: 100%;
}
.log-status {
  position: absolute;
  background: var(--fut-primary);
  width: 8px;
  height: 8px;
  border-radius: 100%;
  content: '';
  top: 0;
  right: 0;
}
.profile-header-menu {
  border-top: 1px solid var(--fut-primary);
  border-bottom: 1px solid var(--fut-primary);
  padding: 3% 5%;
  background-color: var(--fut-background-lighter);
}
.content-right-sidebar-links {
  background-color: var(--fut-background-white);
  border-radius: 0 !important;
  text-transform: uppercase;
  .indice-text {
    font-size: 13px
  }
  .bal-value {
    min-height: 25px;
    font-size: 25px;
    line-height: 25px;
  }
}
.border-right {
  border-right: 1px solid var(--fut-background-white-3);
}
.indice-content {
  margin: auto;
  width: 50px;
  height: 70px;
  content: '';
    img {
      width: 50px;
    }
}
.subtitle-sidebar-right {
  background-color: var(--fut-background-lighter);
  span {
    padding-left: 1%;
    color: white;
    font-size: 11px;
    line-height: 32px;
    text-transform: uppercase;
    border-left: 5px solid var(--fut-primary);
  }
}
.subtitle-content {
  display: grid;
    a {
      color: white;
      text-align: left;
      background-color: var(--fut-background);
      padding: 0.4rem 0;
      margin-bottom: 0;
      border-bottom: 1px solid var(--fut-background-lightest);
    }
}
.button-logout-mobile {
  background-image: linear-gradient(to right, var(--fut-primary-black), var(--fut-primary));
  padding: 1% 20%;
  text-align: center;
  border-radius: 20px;
  text-transform: uppercase;
  font-size: 15px;
}
.social-midia-content-2 {
  line-height: 30px;
  text-align: center;
  width: 30px;
  height: 30px;
  border-radius: 5px;
  margin: 0 5px;
  cursor: pointer;
  a {
    font-size: 20px;
  }
  &:hover{
    .icon{
      color: var(--fut-secondary) !important;
    }
  }
}
.social-midia-content {
  line-height: 25px;
  text-align: center;
  width: 25px;
  height: 25px;
  border-radius: 5px;
  margin: 0 5px;
  cursor: pointer;
  a {
    font-size: 17px;
  }
  background: white;
  &:hover{
    background: var(--fut-primary) !important;
  }
}
.register-section{
  font-size: 13px;
  a {
    color: var(--fut-secondary);
    font-size: 13px;
    margin-top: -2px;
  }
}
.login-input{
  font-size: 13px;
}
.show-password{
  color: #232429;
  position: absolute;
  right: 0px;
  top: 11px;
  padding: 0 !important;
  border: none !important;
  outline: none !important;
  box-shadow: none !important;
  svg {
    height: 16px;
    padding: 9px 12px;
  }
}
.op-6{
  opacity: .6;
}
.nav-item{
  align-self: center;
}
.btn-fb-rounded-white{
  background: white;
  border-radius: 40px;
  padding: 10px;
}
.btn-fb-rounded-secondary{
  background: var(--fut-secondary);
  border-radius: 40px;
  padding: 10px 20px;
  color: white !important;
}
.bars-block {
  width: 7px;
  height: 5px;
  background: var(--fut-background-header);
  position: absolute;
  right: 0px;
  bottom: 6px;
}
.locale-container{
  position: relative;
  text-align: end;
  top: 10px;
  right: 10px;
}
.btn-locale{
  width: 65px;
  height: 33px;
  font-size: 14px;
  text-transform: lowercase;
  background: var(--fut-background-lighter);
  padding: 8px;
  border-radius: 0;
  margin-left: auto;
  text-decoration: none;
  color: white;
}
.hover-bg-primary{
  &:hover{
    background: var(--fut-primary);
    color: #333333 !important;
  }
}
.btn-close-2{
  position: absolute;
  right: 10px;
  top: 10px;
  font-size: 16px;
  background: var(--fut-background-lighter);
  border-radius: 50px;
  width: 30px;
  height: 30px;
}
</style>

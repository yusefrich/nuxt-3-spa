<template>
  <div>
    <div class="nav-bar w-100 d-flex align-items-center justify-content-between">
      <div class="content-bars">
        <button class="bg-transparent border-0 ms-3 text-primary" @click="$emit('toggleMenu')">
          <!-- <img class="hamb-size" src="/Sg/Hamburger.png" alt="Hamburger"> -->
          <font-awesome-icon :icon="['fas', 'bars']" />
        </button>
      </div>
      <div class="text-center content-logo">
        <n-link :to="localePath('/')">
          <img
            v-if="config"
            class="nav-logo ms-md-0 ms-4 d-none d-md-inline"
            style="object-fit: contain;"
            :src="config.logo ? config.logo : ''"
          >
          <img
            v-if="config"
            class="nav-logo ms-md-0 d-md-none"
            style="object-fit: contain;"
            :src="config.logo_mobile ? config.logo_mobile : ''"
          >
        </n-link>
      </div>
      <div class="w-100">
        <div class="my-0 d-flex px-2 py-1 align-items-center w-100 search-bar d-none d-md-flex">
          <font-awesome-icon class="text-white" style="opacity: .5" :icon="['fas', 'search']" />
          <input
            id="searchId"
            ref="searchInitial"
            v-model="searchTerm"
            class="w-100 ms-2 border-0 bg-transparent outline-0 text-decoration-none"
            readonly
            :placeholder="$t('i18n_procure_seu_jogo_favorito')"
            type="text"
            @click="searchingFocus()"
          >
        </div>
      </div>
      <div v-if="!user" class="d-flex w-25 justify-content-end div-teste">
        <div v-if="applicationType('all') || (!applicationType('sports') && !applicationType('casino') && !applicationType('all'))" class="cassino-btn me-4 d-none d-md-flex">
          <a class="p-1 bg-transparent border-0" href="/">
            <img
              src="/Sg/Cassino.png"
              alt="Cassino"
              class="switch-product transition"
              :class="{ 'switch-product-active': currentRouteLike('/casino') || currentRoute('/') }"
            >
          </a>
          <a :href="localePath('/sport/6046')" class="bg-transparent border-0 mt-1">
            <img
              src="/Sg/soccerball.png"
              width="29px"
              height="29px"
              alt="Sport"
              class="switch-product transition"
              :class="{ 'switch-product-active': currentRouteLike('/sport') }"
            >
          </a>
        </div>
        <button class="btn-login me-2 d-none d-md-inline" @click="() => { showLogin = !showLogin }">
          {{ $t('i18n_entrar') }}
        </button>
        <button v-if="config" id="registerModal" class="btn-cad me-4 d-none d-md-inline" :class="{ 'light-cad': config.font === 'light' }" @click="() => { showCad = !showCad }">
          {{ $t('i18n_criar_conta').toUpperCase() }}
        </button>
      </div>
      <button v-if="!user" class="btn-login-nb me-4 d-md-none d-inline" @click="() => { showLogin = !showLogin }">
        {{ $t('i18n_entrar') }}
      </button>
      <button v-if="!user" class="btn-login me-2 d-md-none d-inline" @click="() => { showCad = !showCad }">
        {{ $t('i18n_criar_conta').toUpperCase() }}
      </button>
      <div v-if="user" class="d-flex w-75 justify-content-end align-items-center div-teste">
        <div class="cassino-btn me-4 d-none d-md-flex">
          <a class="p-1 bg-transparent border-0" href="/">
            <img
              src="/Sg/Cassino.png"
              alt="Cassino"
              class="switch-product transition"
              :class="{ 'switch-product-active': currentRouteLike('/casino') || currentRoute('/') }"
            >
          </a>
          <a :href="localePath('/sport/6046')" class="bg-transparent border-0 mt-1">
            <img
              src="/Sg/soccerball.png"
              width="29px"
              height="29px"
              alt="Sport"
              class="switch-product transition"
              :class="{ 'switch-product-active': currentRouteLike('/sport') }"
            >
          </a>
        </div>
        <div class="d-md-flex d-none me-4">
          <button
            class="cash-content align-items-center d-flex position-relative transition"
            @click="()=>{loading = true;$emit('authUser', ()=>{ loading = false })}"
          >
            <img class="me-2 ms-3" src="/Sg/coin.png" alt="">
            <div class="icon-refresher">
              <font-awesome-icon :class="{ 'spinner-border': loading }" style="width: initial; border: none" :icon="['fas', 'redo']" />
            </div>
            <span class="text-white me-1 fw-bold">R$</span>
            <span class="text-white fw-bold me-3">{{ user.balance }}</span>
          </button>
          <div class="deposit-content d-flex">
            <n-link :to="localePath('/user/bank/deposito')" class="d-flex mx-3 mb-0 align-items-center">
              <img class="me-2" src="/Sg/wallet.png" alt="">
              <span>{{ $tc('i18n_deposito', 1).toUpperCase() }}</span>
            </n-link>
          </div>
        </div>
        <div>
          <button class="bg-transparent border-0 d-flex" @click="() => { showProfileCard = !showProfileCard }">
            <img class="profile-content" :src="`https://ui-avatars.com/api/?background=eeeeee&name=${user.username}&color=333333`" alt="">
            <span class="text-white ms-2 fw-bold d-md-inline d-none username-content mt-2">{{ user.username }}</span>
            <font-awesome-icon class="text-white me-3 ms-2 ms-md-0 mt-2 pt-1" :icon="['fas', 'caret-down']" />
          </button>
        </div>
      </div>
    </div>

    <sg-profile-dropdown
      v-model="showProfileCard"
      :user="user"
      @logout="()=>{showProfileCard = false;$emit('logout')}"
    />

    <sg-modal-login
      v-model="showLogin"
      :current-settings="config"
      @submit="payload => $emit('login', payload)"
      @showPass="showPass = true"
      @showCad="showCad = true"
    />

    <sg-modal-forgot-passWord
      v-model="showPass"
      :current-settings="config"
      :response="resetResponse"
      :errors="resetErrors"
      :loading="resetLoading"
      @submit="payload => $emit('resetSubmit', payload)"
    />

    <sg-modal-create-account
      v-model="showCad"
      :current-settings="config"
      :errors="registerErrors"
      :loading="registerLoading"
      @submit="payload => $emit('register', payload)"
      @validateCpf="payload => $emit('validateCpf', payload)"
      @cleanErrors="$emit('cleanErrors')"
    />
    <div class="search-container" :class="{ 'd-none': !searching }">
      <div class="search-overlayout" @click="searching = false" />
      <div class="d-flex px-2 py-1 align-items-center w-100 search-bar-2">
        <font-awesome-icon class="text-white" style="opacity: .5" :icon="['fas', 'search']" />
        <input
          ref="searchMob"
          v-model="searchTerm"
          class="w-100 ms-2 border-0 bg-transparent outline-0"
          placeholder="Procure seu jogo favorito!"
          type="text"
        >
      </div>
      <div class="result-content position-relative">
        <p v-if="searchResponse" class="mt-4 mr-md-0">
          {{ $t('i18n_jogos').toUpperCase() }}: {{ $t('i18n_encontramos') }} {{ searchResponse.games.length }} {{ $t('i18n_resultados_para') }} <strong>{{ searchResponse.name }}</strong>
        </p>
        <button class="btn btn-sg-close text-white" @click="searching = false">
          <font-awesome-icon :icon="['fas', 'times']" />
        </button>
        <div v-if="searchResponse" class="result-container">
          <sg-game-card-sm v-for="(game, index) in searchResponse.games" :key="'search_result_' + index" class="me-4 mb-3" :item="game" />
        </div>
        <!-- <h5>Recomendado para você</h5> -->
        <sg-highlight
          v-if="mostPlayedGames && mostPlayedGames.games && mostPlayedGames.games.length > 0"
          comp-id="nav"
          :user="user"
          :title="$t('i18n_recomendados_para_voce')"
          :games="mostPlayedGames"
          :link="true"
        />
        <!-- :logo="config.logo_mobile" -->
      </div>
    </div>
  </div>
</template>

<script>
import SgProfileDropdown from '@/components/sg/molecules/SgProfileDropdown.vue'
import SgModalLogin from '@/components/sg/molecules/SgModalLogin.vue'
import SgModalForgotPassWord from '@/components/sg/molecules/SgModalForgotPassword.vue'
import SgModalCreateAccount from '@/components/sg/molecules/SgModalCreateAccount.vue'
import SgHighlight from '@/components/sg/organisms/SgHighlight.vue'
import SgGameCardSm from '@/components/sg/atoms/SgGameCardSm.vue'

export default {
  components: {
    SgProfileDropdown,
    SgModalLogin,
    SgHighlight,
    SgModalForgotPassWord,
    SgGameCardSm,
    SgModalCreateAccount
  },
  props: {
    user: {
      type: Object,
      default: () => ({})
    },
    searchResponse: {
      type: Object,
      default: () => ({})
    },
    resetResponse: {
      type: Object,
      default: () => ({})
    },
    resetErrors: {
      type: Object,
      default: () => ({})
    },
    resetLoading: {
      type: Boolean,
      default: false
    },
    registerLoading: {
      type: Boolean,
      default: false
    },
    registerErrors: {
      type: Object,
      default: () => ({})
    },
    config: {
      type: Object,
      default: () => ({})
    },
    mostPlayedGames: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      loading: false,
      searching: false,
      showLogin: false,
      showCad: false,
      showPass: false,
      searchTerm: '',
      searchTimeout: null,
      showProfileCard: false
    }
  },
  computed: {
    loggedUser () {
      return this.user
    }
  },
  watch: {
    searching (newVal) {
      if (newVal === true) {
        this.$nextTick(() => this.$refs.searchMob.focus())
      }
    },
    searchTerm (newVal) {
      const interval = 1000
      clearTimeout(this.searchTimeout)
      if (newVal.length > 2) {
        this.searchTimeout = setTimeout(() => {
          this.$emit('searchGame', newVal)
        }, interval)
      }
    },
    loggedUser (newVal) {
      if (newVal && newVal !== null) {
        this.showLogin = false
      }
    }
  },
  methods: {
    currentRoute (route) {
      return route === '' + this.$nuxt.$route.path
    },
    currentRouteLike (route) {
      return ('' + this.$nuxt.$route.path).includes(route)
    },
    applicationType (term) {
      const config = '' + process.env.PRODUCT_CONFIG
      return config.includes(term)
    },
    searchingFocus () {
      this.searching = true
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/layout/breakpoints";
.result-content{
  .result-container{
    display: flex;
    overflow-y: auto;
  }
}
.search-bar {
  background: var(--fut-background-black);
  border: 2px solid var(--fut-background-darkest);
  border-radius: 40px;
  margin-left: 10px;
  font-weight: bold;
  position: relative;
  z-index: 99999;
  max-width: 33vw;
  input {
    color: white;
    &::placeholder {
      color: var(--fut-background-white);
      font-weight: bold;
    }
    &:focus {
      outline: none;
    }
  }
}
.search-bar-2 {
  background: var(--fut-background-black);
  border-radius: 40px;
  margin-left: 10px;
  font-weight: bold;
  position: relative;
  z-index: 99999;
  max-width: 33vw;
  border: 2px solid var(--fut-background-lightest);
  margin-top: 5px;
  max-width: 33vw;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  @include md {
    margin-left: 260px;
  }
  @include _md {
    width: 100%;
    max-width: 95vw;
    margin-top: 10px;
  }
  input {
    color: white;
    &::placeholder {
      color: var(--fut-background-white);
      font-weight: bold;
    }
    &:focus {
      outline: none;
    }
  }
}
.nav-bar {
  background-color: var(--fut-background-darker);
  border-bottom: 5px solid rgba(0, 0, 0, .2);
  height: 52px;
  position: fixed;
  z-index: 0;
  // box-shadow: 12px 12px 2px 1px rgba(0, 0, 0, .2);
}

.profile-content {
  width: 41px;
  height: 41px;
  border-radius: 100%;
  border: 2px solid var(--fut-primary);
}

.nav-logo {
  width: 100%;
  height: 47px;
  max-width: 200px;
}

.cassino-btn {
  width: 81px;
  height: 39px;
  background-color: #F5F5F5;
  border: 2px solid var(--fut-primary);
  border-radius: 50px;
}

.btn-login-nb {
  border: none;
  background: transparent;
  font-weight: bold;
  text-transform: uppercase;
  border-radius: 5px;
  font-size: 12px;
  width: 40px;
  height: 35px;
  color: var(--fut-primary);
  font-weight: bold;

  @include md {
    width: 124px;
    height: 39px;

  }
}
.btn-login {
  border: none;
  background: linear-gradient(var(--fut-primary), var(--fut-secondary));
  font-weight: bold;
  text-transform: uppercase;
  border-radius: 5px;
  font-size: 11px;
  width: 180px;
  height: 35px;

  @include md {
    width: 124px;
    font-size: 12px;
    height: 39px;

  }
}

.cash-content {
  border-top: 1px solid var(--fut-primary);
  border-bottom: 1px solid var(--fut-primary);
  border-left: 1px solid var(--fut-primary);
  border-right: none;
  height: 40px;
  font-size: 14px;
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
  background: transparent;
  &:hover{
    background: #fefefe10;
    box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
  }
}

.deposit-content {
  border-top-right-radius: 20px;
  height: 40px;
  border-bottom-right-radius: 20px;
  background: linear-gradient(var(--fut-primary), var(--fut-secondary));

  a {
    color: black;
    text-decoration: none;
    font-weight: bold;
    font-size: 14px;
  }
}

.btn-cad {
  border: 2px solid var(--fut-primary);
  color: var(--fut-secondary);
  background: transparent;
  font-weight: bold;
  font-size: 12px;
  text-transform: uppercase;
  border-radius: 5px;
  width: 105px;
  height: 39px;
  &.light-cad {
    color: var(--white);
    // border: 2px solid var(--white);
  }
}

.btn-next {
  border: none;
  background: linear-gradient(var(--fut-primary), var(--fut-secondary));
  font-weight: bold;
  text-transform: uppercase;
  border-radius: 5px;
  width: 160px;
  font-size: 12px;
  height: 39px;
}

.btn-back {
  border: 2px solid var(--fut-secondary); //todo Trocar para primary
  color: var(--fut-secondary); //todo Trocar para primary
  background: transparent;
  font-weight: bold;
  font-size: 12px;
  text-transform: uppercase;
  border-radius: 5px;
  width: 120px;
  height: 39px;
}

.hamb-size {
  width: 37px;
  height: 23px;
}

.icons-size {
  // color: var(--fut-secondary);
  // font-size: 27px;
  width: 25px;
  height: 23px;
}

.menu {
  position: fixed;
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, .8);
  z-index: 5;
}

.cad-menu {
  position: fixed;
  background-color: rgba(0, 0, 0, .8);
  width: 100%;
  height: 100%;
  display: flex;
  z-index: 5;
  justify-content: center;
  align-items: center;
}

.inside-cad-menu {
  background-color: var(--fut-background-darker);
  padding-bottom: 25px;
  padding-top: 25px;
  width: 440px;
  border-radius: 20px;

  h4 {
    font-size: 24px;
    color: white;
    margin-top: 31px;
    font-weight: bold;
  }

  p {
    font-size: 13px;
    color: white;
  }

  .input-container {
    background-color: transparent;
    outline: none;
    border: none;
    color: white;
    margin-left: 10px;
    width: 81%;
  }

  .input-password {
    background-color: transparent;
    outline: none;
    border: none;
    color: white;
    margin-left: 10px;
    width: 81%;
  }
}

.content-input {
  border: 2px solid var(--fut-background-lightest);
  border-radius: 5px;
  height: 50px;
}
.icon-refresher {
  position: absolute;
  left: 27px;
  top: 17px;
  color: #F5F5F5 !important;
  font-size: 11px;
  background: var(--fut-background-black);
  border-radius: 50px;
  padding: 2px 4px;
}
.search-container{
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 9999;
}
.search-overlayout {
  position: fixed;
  top: 0;
  left: 0;
  background: #33333381;
  width: 100vw;
  height: 100vh;
  z-index: -1;
}
.btn-sg-close{
  position: absolute;
  top: 10px;
  right: 10px;
}
.result-content {
  background: var(--fut-background-black);
  padding: 20px;
  border-radius: 20px;
  margin: auto;
  margin-top: 20px;
  max-width: 95vw;
  @include md {
    max-width: 70vw;
  }
  color: white;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
}
.username-content {
  max-width: 130px;
  text-overflow: ellipsis;
  overflow: hidden;
  display: none;
  @include md {
    display: inline-block !important;
  }
  white-space: nowrap;
  // line-height: 25px;
}
.content-logo {
  min-width: 40%;
  @include md {
    min-width: 170px;
  }
}
.content-bars {
  min-width: 30%;
  @include md {
    min-width: 80px;
  }
}
.switch-product{
  opacity: 0.3;
  &:hover{
    opacity: .5;
  }
}
.switch-product-active{
  opacity: 1;
}
</style>

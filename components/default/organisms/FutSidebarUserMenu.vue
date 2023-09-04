<template>
  <div>
    <div>
      <fut-button class="btn d-md-none button-open" :class="{'button-fixed' : opened}" @click="opened = !opened">
        <font-awesome-icon class="icon text-white fut-color-dynamic me-1" :icon="['fas', 'bars']" />
      </fut-button>
    </div>
    <div class="d-md-none transition">
      <p v-if="currentRoute('/user') || currentRoute('/user/')" class="text-select-title text-white fut-color-dynamic">
        {{ $t('i18n_painel_de_controle') }}
      </p>
      <p v-if="currentRoute('/user/my-account/dados') || currentRoute('/user/my-account/dados/')" class="text-select-title text-white fut-color-dynamic">
        {{ $t('i18n_dados_do_usuario') }}
      </p>
      <p v-if="currentRoute('/user/my-account/documentos') || currentRoute('/user/my-account/documentos/')" class="text-select-title text-white fut-color-dynamic">
        {{ $t('i18n_verificacao_de_documentos') }}
      </p>
      <p v-if="currentRoute('/user/my-account/senha') || currentRoute('/user/my-account/senha/')" class="text-select-title text-white fut-color-dynamic">
        {{ $t('i18n_senha') }}
      </p>
      <p v-if="currentRoute('/user/bank/deposito') || currentRoute('/user/bank/deposito/')" class="text-select-title text-white fut-color-dynamic">
        {{ $t('i18n_depositar') }}
      </p>
      <p v-if="currentRoute('/user/bank/deposito/historico') || currentRoute('/user/bank/deposito/historico/')" class="text-select-title text-white fut-color-dynamic">
        {{ $t('i18n_historico_de_depositos') }}
      </p>
      <p v-if="currentRoute('/user/bank/saque') || currentRoute('/user/bank/saque/')" class="text-select-title text-white fut-color-dynamic">
        {{ $t('i18n_saque', 1) }}
      </p>
      <p v-if="currentRoute('/user/bank/saque/historico') || currentRoute('/user/bank/saque/historico/')" class="text-select-title text-white fut-color-dynamic">
        {{ $t('i18n_historico_de_saques') }}
      </p>
      <template v-if="!applicationType('casino') || applicationType('sports')">
        <p v-if="currentRoute('/user/history/bets-resolvidas') || currentRoute('/user/history/bets-resolvidas/')" class="text-select-title text-white fut-color-dynamic">
          {{ $t('i18n_apostas_resolvidas') }}
        </p>
        <p v-if="currentRoute('/user/history/bets-pendentes') || currentRoute('/user/history/bets-pendentes/')" class="text-select-title text-white fut-color-dynamic">
          {{ $t('i18n_apostas_pendentes') }}
        </p>
        <p v-if="currentRoute('/user/bank/transactions') || currentRoute('/user/bank/transactions/')" class="text-select-title text-white fut-color-dynamic">
          {{ $t('i18n_apostas_pendentes') }}
        </p>
      </template>
    </div>
    <ul class="list-unstyled list-itens transition" :class="[opened ? 'list-itens-h' : '', currentLayoutStyle === 'oldBet365' ? 'bg-nsx' : 'bg-classic']">
      <li>
        <a class="text-decoration-none text-primary section-menu">{{ $t('i18n_minha_conta') }}</a>
        <ul class="list-unstyled">
          <li class="ps-4 route" :class="{active: currentRoute('/user') || currentRoute('/user/')}">
            <fut-button class="text-decoration-none text-white fut-color-dynamic item-menu" to="/user">
              {{ $t('i18n_painel_de_controle') }}
            </fut-button>
          </li>
          <li class="ps-4 route" :class="{active: currentRoute('/user/my-account/dados') || currentRoute('/user/my-account/dados/')}">
            <fut-button class="text-decoration-none text-white fut-color-dynamic item-menu" to="/user/my-account/dados">
              {{ $t('i18n_dados_do_usuario') }}
            </fut-button>
          </li>
          <li class="ps-4 route" :class="{active: currentRoute('/user/my-account/documentos') || currentRoute('/user/my-account/documentos/')}">
            <fut-button class="text-decoration-none text-white fut-color-dynamic item-menu" to="/user/my-account/documentos">
              {{ $t('i18n_verificacao_de_documentos') }}
            </fut-button>
          </li>
          <li class="ps-4 route" :class="{active: currentRoute('/user/my-account/senha') || currentRoute('/user/my-account/senha/')}">
            <fut-button class="text-decoration-none text-white fut-color-dynamic item-menu" to="/user/my-account/senha">
              {{ $t('i18n_senha') }}
            </fut-button>
          </li>
        </ul>
      </li>
      <li>
        <fut-button class="text-decoration-none text-primary section-menu" to="#">
          {{ $t('i18n_banco') }}
        </fut-button>
        <ul class="list-unstyled">
          <li class="ps-4 route" :class="{active: currentRoute('/user/bank/deposito') || currentRoute('/user/bank/deposito/')}">
            <fut-button class="text-decoration-none text-white fut-color-dynamic item-menu" to="/user/bank/deposito">
              {{ $t('i18n_depositar') }}
            </fut-button>
          </li>
          <li class="ps-4 route" :class="{active: currentRoute('/user/bank/deposito/historico') || currentRoute('/user/bank/deposito/historico/')}">
            <fut-button class="text-decoration-none text-white fut-color-dynamic item-menu" to="/user/bank/deposito/historico">
              {{ $t('i18n_historico_de_depositos') }}
            </fut-button>
          </li>
          <li class="ps-4 route" :class="{active: currentRoute('/user/bank/saque') || currentRoute('/user/bank/saque/')}">
            <fut-button class="text-decoration-none text-white fut-color-dynamic item-menu" to="/user/bank/saque">
              {{ $t('i18n_saque', 1) }}
            </fut-button>
          </li>
          <li class="ps-4 route" :class="{active: currentRoute('/user/bank/saque/historico') || currentRoute('/user/bank/saque/historico/')}">
            <fut-button class="text-decoration-none text-white fut-color-dynamic item-menu" to="/user/bank/saque/historico">
              {{ $t('i18n_historico_de_saques') }}
            </fut-button>
          </li>
        </ul>
      </li>
      <li>
        <fut-button class="text-decoration-none text-primary section-menu" to="#">
          {{ $t('i18n_historico') }}
        </fut-button>
        <ul class="list-unstyled">
          <li v-if="!applicationType('casino') || applicationType('sports')" class="ps-4 route" :class="{active: currentRoute('/user/history/bets-resolvidas') || currentRoute('/user/history/bets-resolvidas/')}">
            <fut-button class="text-decoration-none text-white fut-color-dynamic item-menu" to="/user/history/bets-resolvidas">
              {{ $t('i18n_apostas_resolvidas') }}
            </fut-button>
          </li>
          <li v-if="!applicationType('casino') || applicationType('sports')" class="ps-4 route" :class="{active: currentRoute('/user/history/bets-pendentes') || currentRoute('/user/history/bets-pendentes/')}">
            <fut-button class="text-decoration-none text-white fut-color-dynamic item-menu" to="/user/history/bets-pendentes">
              {{ $t('i18n_apostas_pendentes') }}
            </fut-button>
          </li>
          <li v-if="!applicationType('sports') || applicationType('casino')" class="ps-4 route" :class="{active: currentRoute('/user/history/bets-pendentes') || currentRoute('/user/history/bets-pendentes/')}">
            <fut-button class="text-decoration-none text-white fut-color-dynamic item-menu" to="/user/bank/transactions">
              {{ $t('i18n_transacoes_cassino') }}
            </fut-button>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>
<script>
import FutButton from '@/components/default/atoms/FutButton'

export default {
  components: {
    FutButton
  },
  props: {
    currentLayoutStyle: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      opened: false
    }
  },
  methods: {
    applicationType (term) {
      const config = '' + process.env.PRODUCT_CONFIG
      return config.includes(term)
    },
    currentRoute (route) {
      return route === '' + this.$nuxt.$route.path
    },
    actualRoute () {
      return this.$nuxt.$route.path
    },
    onMobile () {
      if (!window.innerWidth < 992) {
        this.open = true
      }
      return window.innerWidth < 992
    }
  }
}
</script>
<style lang="scss" scoped>
@import "@/assets/layout/breakpoints";
  .section-menu{
    font-size: 17px;
    line-height: 32px;
    font-weight: 700;
  }
  .item-menu{
    line-height: 25px;
    font-size: 14px;
  }
  .text-select-title{
    font-size: 25px;
    font-weight: 700;
  }
  .item-menu:hover{
    font-weight: 700;
  }
  .active{
    border-left: 5px solid var(--fut-primary);
    padding-left: 19px !important;
    a{
      font-weight: 700;
    }
  }
  .button-open{
    position: absolute;
    right: 10px;
  }
  .button-fixed{
    position: fixed;
    right: 10px;
    z-index: 11;
  }
  .bg-classic{
    background: var(--fut-background-darker);
  }
  .list-itens{
    position: fixed;
    height: 0px;
    width: 100vw;
    z-index: 10;
    top: 0;
    left: 0;
    overflow: hidden;
    @include md {
      position: relative;
      height: initial;
      width: initial;
    }
  }
  .list-itens-h{
    padding-top: 100px;
    padding-left: 20px;
    height: 100vh;
    @include md {
      padding-top: 0px;
      padding-left: 0px;
      height: initial;
    }
  }
</style>

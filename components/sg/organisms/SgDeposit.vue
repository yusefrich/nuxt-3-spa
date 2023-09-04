<template>
  <div class="mb-5">
    <div class="d-flex">
      <img class="d-none d-md-grid" width="328px" height="425px" src="/Sg/Pix to Play.png" alt="">
      <div v-if="!response" class="container">
        <ul class="text-muted listing d-none d-md-inline">
          <li><span>{{ $t('i18n_deve_ser_gerada_uma_nova') }}</span></li>
          <li>{{ $t('i18n_nunca_deposite_em_chaves_pix_antigas') }}</li>
          <li>{{ $t('i18n_digite_valores_completos') }} <span class="fw-bold">Ex: (R$10 - R$50 - R$100)</span></li>
          <li>{{ $t('i18n_nao_utilize_o_banco_paypal') }}</li>
        </ul>
        <ul class="text-muted listing-d d-md-none">
          <li>{{ $t('i18n_deve_ser_gerada_uma_nova') }}</li>
          <li>{{ $t('i18n_nunca_deposite_em_chaves_pix_antigas') }}</li>
          <li>{{ $t('i18n_digite_valores_completos') }} <span class="fw-bold">Ex: (R$10 - R$50 - R$100)</span></li>
          <li>{{ $t('i18n_nao_utilize_o_banco_paypal') }}</li>
        </ul>
        <div class="d-grid">
          <div class="border-b my-3 w-100" />
          <span v-if="settings" class="text-primary mb-2 fs-15 fw-bold">{{ $t('i18n_valor_minimo') }}: <span class="fw-bold fs-15 text-muted">R$ {{ settings.dp_limit_min }}</span></span>
          <span class="text-primary fs-15 mb-4 fw-bold">{{ $t('i18n_tempo_de_processamento') }}: <span class="fw-bold fs-15 text-muted">5 {{ $t('i18n_minuto', 2) }}</span></span>
        </div>
        <div class="d-flex align-items-center mb-2">
          <img class="me-3" width="32px" height="32px" src="/Sg/Coin-2.png" alt="">
          <div class="input-content py-2 d-flex align-items-center justify-content-center">
            <!-- <span class="fw-bold text-white me-1">R$</span> -->
            <input
              v-model.lazy="price"
              v-money3="money"
              type="text"
              :placeholder="$t('i18n_digite_o_valor_do_deposito')"
            >
          </div>
        </div>
        <error-badge name="amount" :validate="errors?errors:{}" />
        <div class="d-flex align-items-center ms-5">
          <!-- <img class="me-3" width="32px" height="32px" src="/Sg/Coin-2.png" alt=""> -->
          <div class="input-content py-2 d-flex align-items-center justify-content-center">
            <!-- <span class="fw-bold text-white me-1">R$</span> -->
            <input
              type="text"
              :placeholder="$t('i18n_codigo_de_bonus')"
            >
          </div>
        </div>
        <error-badge name="code" :validate="errors?errors:{}" />
        <div class="mt-4 mb-2 text-center text-md-start">
          <button class="btn-cash me-2 mb-2" @click="price = '50,00'">
            <span>R$50</span>
          </button>
          <button class="btn-cash me-2 mb-2" @click="price = '100,00'">
            <span>R$100</span>
          </button>
          <button class="btn-cash me-2 mb-2" @click="price = '500,00'">
            <span>R$500</span>
          </button>
          <button class="btn-cash me-2 mb-2" @click="price = '1.000,00'">
            <span>R$1000</span>
          </button>
        </div>
        <!-- <div class="form-check my-3">
        <input id="flexCheckDefault" class="form-check-input" type="checkbox" value="">
        <label class="text-white">Verifiquei todas as instruções acima e estou efetuando um depósito de R$50 na
          minha conta 7Games.</label>
      </div> -->
        <button
          class="btn-confirm"
          :disabled="loading || settings.dp_limit_min ? +getRawPrice(price) < settings.dp_limit_min : +getRawPrice(price) < 1"
          @click="deposit()"
        >
          {{ $t('i18n_confirmar_deposito') }} {{ loading ? '...' : '' }}
        </button>
      </div>
      <div v-if="response">
        <div class="container">
          <h5 class="text-primary mt-md-0 mt-4 mb-md-0 fw-bold mb-2">
            {{ $t('i18n_solicitacao_de_deposito') }}
          </h5>
          <p class="mb-3 text-muted fs-13">
            * {{ $t('i18n_o_tempo_de_processamento_do_pagamento') }}
          </p>
          <label class="fw-15 mb-2 text-muted fw-bold">
            {{ $t('i18n_pix_copia_e_cola').toUpperCase() }}
          </label>
        </div>
        <div v-if="response" class="d-md-flex d-grid mb-3 align-items-center">
          <input class="input-controler px-3" type="text" disabled :value="response.payment.pix_value">
          <button class="ms-md-3 btn-copy mt-md-0 mt-3" @click="copyURL(response.payment.pix_value)">
            {{ $t('i18n_copiar_codigo_pix') }}
          </button>
        </div>
        <div class="container d-grid">
          <h5 class="fw-bold mb-3 text-muted fs-15">
            QR CODE
          </h5>
          <img
            class="mb-4"
            width="230px"
            height="230px"
            :src="response.payment.pix_url"
            alt=""
          >
          <button class="btn-confirm mb-3" @click="confirmModal = true">
            {{ $t('i18n_confirmar_pagamento') }}
          </button>
          <button class="btn-confirm" @click="$emit('clearResponse')">
            {{ $t('i18n_novo_deposito') }}
          </button>
        </div>
      </div>
    </div>
    <sg-modal v-model="confirmModal" width="sm" close>
      <div class="inside-cad-menu text-center">
        <div class="text-center">
          <img v-if="settings" class="nav-logo" :src="settings.logo ? settings.logo : ''">
        </div>
        <h4 class="mb-0 text-center">
          {{ $t('i18n_deposito_solicitado') }}
        </h4>
        <p class="text-center px-4 my-4">
          {{ $t('i18n_sua_solicitacao_de_deposito') }}
          {{ $t('i18n_o_tempo_de_processamento_do_seu_pagamento') }}
          <span class="fw-bold">{{ $t('i18n_bons_jogos') }}</span>
        </p>
        <div class="px-4">
          <a class="btn-back me-2 w-100 text-decoration-none text-dark px-3 py-2" :href="localePath('/')">
            {{ $t('i18n_voltar_para_o_salao_de_jogos') }}
          </a>
        </div>
      </div>
    </sg-modal>
  </div>
</template>

<script>
import { Money3Directive } from 'v-money3'
import ErrorBadge from '@/components/default/atoms/ErrorBadge.vue'
import SgModal from '@/components/sg/atoms/SgModal'
export default {
  directives: { money3: Money3Directive },
  components: {
    SgModal,
    ErrorBadge
  },
  props: {
    response: {
      type: Object,
      default: null
    },
    loading: {
      type: Boolean,
      default: false
    },
    errors: {
      type: Object,
      default: () => ({})
    },
    settings: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      step: 1,
      confirmModal: false,
      price: '',
      code: '',
      money: {
        decimal: ',',
        thousands: '.',
        prefix: 'R$ ',
        precision: 2
      }
    }
  },
  methods: {
    deposit () {
      const payload = {
        method: 'pix',
        amount: +this.price.substring(3).replace('.', '').replace(',', '.'),
        code: this.code,
        bank: null
      }
      this.$emit('submitDeposit', payload)
    },
    async copyURL (mytext) {
      try {
        await this.$copyText(mytext)
      } catch (e) {
        // console.error(e)
        this.$toast.open({ message: e, type: 'warning' })
        return
      }
      this.$toast.open({ message: 'Texto copiado com sucesso', type: 'info' })
    },
    getRawPrice (price) {
      let currentPrice = price.replace(/\./g, '')
      currentPrice = currentPrice.replace(',', '.')
      currentPrice = currentPrice.replace('R$ ', '')
      return currentPrice
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/layout/breakpoints";
.inside-cad-menu {
  background-color: var(--fut-background-darker);
  padding-bottom: 25px;
  // padding-top: 25px;
  width: 100%;
  height: 100%;
  border-radius: 20px;
  // @include md {
  //   width: 440px;
  //   height: auto;
  // }

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
  .btn-back {
    height: 45px;
    font-weight: bold;
    background: linear-gradient(var(--fut-primary), var(--fut-secondary));
    border: none;
    border-radius: 5px;
  }
.profile-pic {
  width: 50px;
  height: 50px;
  border-radius: 100%;
  border: 2px solid var(--fut-primary);
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

.notification {
  position: fixed;
  display: flex;
  z-index: 99;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.432);
}

.listing {
  list-style: none;
  font-size: 15px;
  display: inline;
  // white-space: nowrap;
}
.listing-d {
  list-style: none;
  font-size: 15px;
  display: inline;
}
.listing li::before {
  content: "\2022";
  color: var(--fut-primary);
  font-weight: bold;
  display: inline-block;
  width: 1em;
}
.listing-d li::before {
  content: "\2022";
  color: var(--fut-primary);
  font-weight: bold;
  display: inline-block;
  width: 1em;
}

.nav-logo {
  width: 100%;
  height: 47px;
  max-width: 200px;
}

.form-check {
  label {
    font-size: 12px;
  }
}

.fs-15 {
  font-size: 15px;
}

.fs-13 {
  font-size: 13px;
}

.btn-cash {
  border: none;
  border-radius: 5px;
  height: 45px;
  font-weight: bold;
  width: 91px;
  background: linear-gradient(var(--fut-primary), var(--fut-secondary));
}
.btn-pix {
  border: none;
  border-radius: 5px;
  height: 45px;
  font-weight: bold;
  color: var(--fut-background-lightest);
  background-color: transparent;
  width: 100%;
  border: 2px solid var(--fut-background-lightest);
  max-width: 106px;
  &.is-active {
    background: linear-gradient(var(--fut-primary), var(--fut-secondary));
    color: var(--fut-background-darkest);
    border: none;
  }
}

.btn-confirm {
  font-size: 17px;
  font-weight: bold;
  text-transform: uppercase;
  color: var(--fut-primary);
  background-color: transparent;
  border: 2px solid var(--fut-primary);
  border-radius: 5px;
  height: 55px;
  width: 100%;
  @include md {
    width: 280px;
  }
  &:disabled {
    opacity: .6;
  }
}

.btn-copy {
  font-size: 14px;
  font-weight: bold;
  text-transform: uppercase;
  color: var(--fut-primary);
  background-color: transparent;
  border: 2px solid var(--fut-primary);
  border-radius: 5px;
  width: 170px;
  height: 45px;
}

.border-b {
  border: 1px solid var(--fut-background-darkest);
}

.btn-deposit {
  width: 132px;
  height: 42px;
  font-size: 13px;
  border-radius: 15px;
  font-weight: bold;
  color: white;
  background-color: var(--fut-background-lighter);
  border: 2px solid var(--fut-primary);
}

.input-controler {
  background-color: var(--fut-background-darkest);
  border-radius: 50px;
  width: 254px;
  border: 2px solid var(--fut-background-lightest);
  border: none;
  outline: none;
  width: 300px;
  height: 46px;
  font-size: 14px;
  color: white;
}

.input-content {
  background-color: var(--fut-background-darkest);
  border-radius: 50px;
  border: 2px solid var(--fut-background-lightest);
  width: 100%;
  @include md {
    width: 254px;
  }

  input {
    background-color: transparent;
    border: none;
    outline: none;
    width: auto;
    color: white;
  }
}
.input-content-d {
  background-color: var(--fut-background-darkest);
  border-radius: 50px;
  border: 2px solid var(--fut-background-lightest);
  width: 100%;
  @include md {
    width: 355px;
  }

  input {
    background-color: transparent;
    border: none;
    outline: none;
    width: 85%;
    color: white;
  }
}
li {
  white-space: normal;
}
.btn-deposit-d {
  width: 132px;
  height: 42px;
  font-size: 13px;
  border-radius: 15px;
  font-weight: bold;
  color: grey;
  background-color: var(--fut-background-lighter);
  border: 3px solid var(--fut-background-lightest);
}
</style>

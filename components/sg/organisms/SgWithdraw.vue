<template>
  <div class="mb-5">
    <div class="d-flex">
      <img class="d-md-grid d-none" width="328px" height="425px" src="/Sg/Saque PIX.png" alt="">
      <div class="container">
        <ul class="text-muted listing-d ">
          <li class="mb-2">
            {{ $t('i18n_so_e_permitido_solicitar_um_saque') }}
          </li>
          <li class="my-3">
            {{ $t('i18n_os_saques_so_poderao_ser_feitos_para') }}
          </li>
          <li class="my-3">
            {{ $t('i18n_tenha_atencao_na_hora_de_digitar') }}
          </li>
        </ul>
        <div v-if="settings" class="d-grid">
          <div class="border-b my-3 w-100" />
          <span class="text-primary mb-3 fs-15 fw-bold">{{ $t('i18n_valor_minimo') }}: <span class="fw-bold fs-15 text-muted">R$ {{ settings.wd_limit_min }}</span></span>
          <span class="text-primary mb-3 fs-15 fw-bold">{{ $t('i18n_valor_maximo') }}: <span class="fw-bold fs-15 text-muted">R$ {{ settings.wd_limit_max }}</span></span>
          <span class="text-primary fs-15 mb-4 fw-bold">{{ $t('i18n_tempo_de_processamento') }}: <span class="fw-bold fs-15 text-muted">5 {{ $tc('i18n_minuto', 2) }}</span></span>
        </div>
        <span class="fs-15 text-muted fw-bolder">{{ $t('i18n_tipo_de_chave_pix') }}</span>
        <div class="mb-4 mt-3 d-flex">
          <button
            v-for="(type, idx) in settings.pix_types"
            :key="idx"
            class="btn-pix me-1"
            :class="{'is-active': payload.type === type}"
            @click="payload.type = type"
          >
            <span>{{ type }}</span>
          </button>
        </div>
        <div v-if="payload.type === 'CPF'">
          <div class="input-content-d py-2 d-flex align-items-center justify-content-center">
            <img class="me-2" src="/Sg/SquareProfile.png" alt="">
            <input v-if="user" type="text" readonly :value="user.player.document">
          </div>
        </div>
        <div v-if="payload.type === 'EMAIL'">
          <div class="input-content-d py-2 d-flex align-items-center justify-content-center">
            <img class="me-2" src="/Sg/email.png" alt="">
            <input v-if="user" type="text" readonly :value="user.email">
          </div>
        </div>
        <div v-if="payload.type === 'PHONE'">
          <div class="input-content-d py-2 d-flex align-items-center justify-content-center">
            <img class="me-2" src="/Sg/cellphone.png" height="20" alt="">
            <input v-if="user" type="text" readonly :value="user.phone">
          </div>
        </div>
        <div class="mt-4 mb-2">
          <span class="fs-15 fw-bold text-muted">VALOR</span>
        </div>
        <div class="input-content py-2 d-flex align-items-center justify-content-center">
          <input
            v-model.lazy="price"
            v-money3="money"
            type="text"
            :placeholder="$t('i18n_digite_o_valor_do_saque')"
          >
        </div>
        <button
          v-if="settings"
          class="btn-confirm mt-3"
          :disabled="!payload.type || (getRawPrice(price) < +settings.wd_limit_min || (settings.wd_limit_max ? (getRawPrice(price) > +settings.wd_limit_max) : (getRawPrice(price) > getInfinity)))"
          @click="confirmModal = true"
        >
          {{ $tc('i18n_saque', 1) }}
        </button>
        <span v-if="!payload.type" class="d-block text-white mt-0 ms-5"><small>Selecione uma chave pix!</small></span>
      </div>
    </div>
    <sg-modal v-model="confirmModal" width="sm" close>
      <div class="inside-cad-menu">
        <div class="text-center">
          <img v-if="settings" class="nav-logo" :src="settings.logo ? settings.logo : ''">
        </div>
        <div class="container">
          <h4 class="mb-0 text-center">
            {{ $t('i18n_confirme_os_dados_do_saque').toUpperCase() }}
          </h4>
          <div class="container">
            <div class="d-flex align-items-center mt-4 mb-3">
              <img class="profile-pic me-2" src="/Sg/Profile-placeholder.png" alt="">
              <span class="text-white fw-bold">{{ user.username }}</span>
            </div>
            <div class="d-grid">
              <label class="fw-bold text-muted mb-2 ms-3">
                {{ $t('i18n_valor_solicitado').toUpperCase() }}
              </label>
              <div class="input-content w-100 py-2 mb-3 d-flex align-items-center px-3">
                <input type="text" disabled :value="price">
              </div>
            </div>
            <div class="d-grid">
              <label class="fw-bold text-muted mb-2 ms-3">
                {{ $t('i18n_chave_pix').toUpperCase() }}
              </label>
              <div v-if="payload.type === 'CPF'">
                <div class="input-content-d py-2 d-flex align-items-center justify-content-center">
                  <img class="me-2" src="/Sg/SquareProfile.png" alt="">
                  <input v-if="user" type="text" readonly :value="user.player.document">
                </div>
              </div>
              <div v-if="payload.type === 'EMAIL'">
                <div class="input-content-d py-2 d-flex align-items-center justify-content-center">
                  <img class="me-2" src="/Sg/email.png" alt="">
                  <input v-if="user" type="text" readonly :value="user.email">
                </div>
              </div>
              <div v-if="payload.type === 'PHONE'">
                <div class="input-content-d py-2 d-flex align-items-center justify-content-center">
                  <img class="me-2" src="/Sg/cellphone.png" height="20" alt="">
                  <input v-if="user" type="text" readonly :value="user.phone">
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="px-4 mt-4">
          <button class="btn-back me-2 w-100" :disabled="loading" @click="withdraw">
            {{ $t('i18n_confirmar_solicitacao').toUpperCase() }} {{ loading ? '...' : '' }}
          </button>
        </div>
      </div>
    </sg-modal>
    <sg-modal v-model="doneModal" width="sm" close>
      <div class="inside-cad-menu">
        <div class="text-center">
          <img v-if="settings" class="nav-logo" :src="settings.logo ? settings.logo : ''">
        </div>
        <h4 class="mb-0 text-center">
          {{ $t('i18n_saque_solicitado').toUpperCase() }}
        </h4>
        <p class="text-center px-4 my-4">
          {{ $t('i18n_sua_solicitacao_de_saque_foi') }}
          {{ $t('i18n_o_tempo_de_processamento_do_seu_pagamento') }}
          <span class="fw-bold d-grid">{{ $t('i18n_bons_jogos') }}</span>
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
import SgModal from '@/components/sg/atoms/SgModal.vue'

export default {
  name: 'SgWithdraw',
  directives: { money3: Money3Directive },
  components: {
    SgModal
  },
  props: {
    response: {
      type: Object,
      default: () => ({})
    },
    user: {
      type: Object,
      default: () => ({})
    },
    settings: {
      type: Object,
      default: () => ({})
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      step: 1,
      confirmModal: false,
      doneModal: false,
      money: {
        decimal: ',',
        thousands: '.',
        prefix: 'R$ ',
        precision: 2,
        masked: false /* doesn't work with directive */
      },
      price: '',
      payload: {
        method: 'pix',
        amount: 0,
        type: null,
        pix: ''
      }
    }
  },
  computed: {
    getInfinity () {
      return Number.POSITIVE_INFINITY
    }
  },
  watch: {
    'payload.type' (newVal) {
      this.payload.pix = ''
      if (newVal === 'CPF') {
        this.payload.pix = this.user.player.document
      } else if (newVal === 'PHONE') {
        this.payload.pix = this.user.phone
      } else if (newVal === 'EMAIL') {
        this.payload.pix = this.user.email
      }
    }
  },
  methods: {
    getRawPrice (price) {
      let currentPrice = price.replace(/\./g, '')
      currentPrice = currentPrice.replace(',', '.')
      currentPrice = currentPrice.replace('R$ ', '')
      return currentPrice
    },
    withdraw () {
      this.payload.amount = +this.getRawPrice(this.price)
      this.$emit('submit', this.payload)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/layout/breakpoints";
.inside-cad-menu {
  background-color: var(--fut-background-darker);
  padding-bottom: 25px;
  padding-top: 25px;
  width: 100%;
  height: 100%;
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
  .btn-back {
    height: 45px;
    font-weight: bold;
    background: linear-gradient(var(--fut-primary), var(--fut-secondary));
    border: none;
    border-radius: 5px;
    &:disabled{
      opacity: .7;
    }
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
    opacity: .5;
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

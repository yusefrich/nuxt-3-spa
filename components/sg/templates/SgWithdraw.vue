<template>
  <div>
    <transition>
      <div v-if="showConfirm">
        <div class="notification">
          <div class="inside-cad-menu">
            <div class="text-center">
              <img v-if="currentSettings" class="nav-logo" :src="currentSettings.logo ? currentSettings.logo : ''">
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
              <button class="btn-back me-2 w-100" @click="() => { showConfirm = !showConfirm }">
                {{ $t('i18n_voltar_para_o_salao_de_jogos') }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </transition>

    <sg-modal-withdraw
      v-model="showConfirmValue"
      :current-settings="currentSettings"
      @confirm="confirmNext()"
    />

    <transition>
      <div v-if="showConfirmNext">
        <div class="notification">
          <div class="inside-cad-menu">
            <div class="text-center">
              <img v-if="currentSettings" class="nav-logo" :src="currentSettings.logo ? currentSettings.logo : ''">
            </div>
            <h4 class="mb-0 text-center">
              {{ $t('i18n_saque_solicitado') }}
            </h4>
            <p class="text-center px-4 my-4">
              {{ $t('i18n_sua_solicitacao_de_saque_foi') }}
              {{ $t('i18n_o_tempo_de_processamento_do_seu_pagamento') }}
              <span class="fw-bold d-grid">{{ $t('i18n_bons_jogos') }}</span>
            </p>
            <div class="px-4">
              <button class="btn-back me-2 w-100" @click="() => { showConfirmNext = !showConfirmNext }">
                {{ $t('i18n_voltar_para_o_salao_de_jogos') }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </transition>

    <sg-tabs class="mt-4 mt-md-0">
      <fb-wrapper name="Depositar" image="/Sg/wallet-svgrepo-com.png">
        <div class="mb-5">
          <div class="d-flex">
            <img class="d-none d-md-grid" width="328px" height="425px" src="/Sg/Pix to Play.png" alt="">
            <div v-if="stepOne" class="container">
              <ul class="text-muted listing d-none d-md-inline">
                <li>{{ $t('i18n_deve_ser_gerada_uma_nova') }}</li>
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
                <span class="text-primary mb-2 fs-15 fw-bold">{{ $t('i18n_valor_minimo') }}: <span class="fw-bold fs-15 text-muted">R$50</span></span>
                <span class="text-primary fs-15 mb-4 fw-bold">{{ $t('i18n_tempo_de_processamento') }}: <span class="fw-bold fs-15 text-muted">5 {{ $t('i18n_minuto', 2) }}</span></span>
              </div>
              <div class="d-flex align-items-center">
                <img class="me-3" width="32px" height="32px" src="/Sg/Coin-2.png" alt="">
                <div class="input-content py-2 d-flex align-items-center justify-content-center">
                  <span class="fw-bold text-white me-1">R$</span>
                  <input type="text" :placeholder="$t('i18n_digite_o_valor_do_deposito')">
                </div>
              </div>
              <div class="my-4 d-flex">
                <button class="btn-cash me-1">
                  <span>R$50</span>
                </button>
                <button class="btn-cash mx-1">
                  <span>R$100</span>
                </button>
                <button class="btn-cash mx-1">
                  <span>R$500</span>
                </button>
                <button class="btn-cash ms-1">
                  <span>R$1000</span>
                </button>
              </div>
              <div class="form-check my-3">
                <input id="flexCheckDefault" class="form-check-input" type="checkbox" value="">
                <label class="text-white">
                  {{ $t('i18n_verifiquei_todas_as_instrucoes_acima_e_estou') }}
                </label>
              </div>
              <button class="btn-confirm" @click="switchStep()">
                {{ $t('i18n_confirmar_deposito') }}
              </button>
            </div>
            <div v-if="stepTwo">
              <div class="container">
                <h5 class="text-primary mt-md-0 mt-4 mb-md-0 fw-bold mb-2">
                  {{ $t('i18n_solicitacao_de_deposito') }}: <Span class="text-muted fw-lighter">R$50</Span>
                </h5>
                <p class="mb-3 text-muted fs-13">
                  * {{ $t('i18n_o_tempo_de_processamento_do_pagamento') }}
                </p>
                <label class="fw-15 mb-2 text-muted fw-bold">
                  {{ $t('i18n_pix_copia_e_cola') }}
                </label>
              </div>
              <div class="d-md-flex d-grid mb-3 align-items-center">
                <input class="input-controler px-3" type="text" placeholder="00020126890014BR.GOV.BCB.PIX2567a">
                <button class="ms-md-3 btn-copy mt-md-0 mt-3">
                  {{ $t('i18n_copiar_codigo_pix') }}
                </button>
              </div>
              <div class="container d-grid">
                <h5 class="fw-bold mb-3 text-muted fs-15">
                  QR CODE
                </h5>
                <img
                  class="mb-4"
                  width="130px"
                  height="130px"
                  src="/Sg/2011-03-22-qr-code-exemplo.png"
                  alt=""
                >
                <button class="btn-confirm" @click="() => showConfirm = !showConfirm">
                  {{ $t('i18n_confirmar_pagamento') }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </fb-wrapper>
      <fb-wrapper name="Sacar" :selected="true" image="/Sg/walletSaq-w.png">
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
              <div class="d-grid">
                <div class="border-b my-3 w-100" />
                <span class="text-primary mb-3 fs-15 fw-bold">{{ $t('i18n_valor_minimo') }}: <span class="fw-bold fs-15 text-muted">R$50</span></span>
                <span class="text-primary mb-3 fs-15 fw-bold">{{ $t('i18n_valor_maximo') }}: <span class="fw-bold fs-15 text-muted">R$10.000</span></span>
                <span class="text-primary fs-15 mb-4 fw-bold">{{ $t('i18n_tempo_de_processamento') }}: <span class="fw-bold fs-15 text-muted">5 {{ $t('i18n_minuto', 2) }}</span></span>
              </div>
              <span class="fs-15 text-muted fw-bolder">{{ $t('i18n_tipo_de_chave_pix').toUpperCase() }}</span>
              <div class="mb-4 mt-3 d-flex">
                <button class="btn-pix me-1" :class="step === 1 ? 'is-active' : ''" @click="changePix(1)">
                  <span>CPF</span>
                </button>
                <button class="btn-pix mx-1" :class="step === 2 ? 'is-active' : ''" @click="changePix(2)">
                  <span>EMAIL</span>
                </button>
                <button class="btn-pix mx-1" :class="step === 3 ? 'is-active' : ''" @click="changePix(3)">
                  <span>{{ $t('i18n_telefone').toUpperCase() }}</span>
                </button>
              </div>
              <div v-if="step === 1">
                <div class="input-content-d py-2 d-flex align-items-center justify-content-center">
                  <img src="/Sg/SquareProfile.png" alt="">
                  <input v-inputmask="'999.999.999-99'" type="text" placeholder="000.000.080-00">
                </div>
              </div>
              <div v-if="step === 2">
                <div class="input-content-d py-2 d-flex align-items-center justify-content-center">
                  <img src="/Sg/email.png" alt="">
                  <input type="email" :placeholder="$t('i18n_digite_o_email_utilizado_na')">
                </div>
              </div>
              <div v-if="step === 3">
                <div class="input-content-d py-2 d-flex align-items-center justify-content-center">
                  <img src="/Sg/cellphone.png" alt="">
                  <input v-inputmask="'999.999.999-99'" type="text" :placeholder="$t('i18n_digite_o_telefone_utilizado_na')">
                </div>
              </div>
              <div class="mt-4 mb-2">
                <span class="fs-15 fw-bold text-muted">{{ $t('i18n_valor').toUpperCase() }}</span>
              </div>
              <div class="input-content py-2 d-flex align-items-center justify-content-center">
                <span class="fw-bold text-white me-1">R$</span>
                <input type="text" :placeholder="$t('i18n_digite_o_valor_do_saque')">
              </div>
              <div class="form-check my-3">
                <input id="flexCheckDefault" class="form-check-input" type="checkbox" value="">
                <label class="text-white">
                  {{ $t('i18n_verifiquei_todas_as_instrucoes_acima_e_estou') }}
                </label>
              </div>
              <button class="btn-confirm" @click="showConfirmValue = true">
                {{ $t('i18n_confirnar_saque') }}
              </button>
            </div>
          </div>
        </div>
      </fb-wrapper>
    </sg-tabs>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import SgTabs from '@/components/sg/molecules/SgTabs'
import SgModalWithdraw from '@/components/sg/molecules/SgModalWithdraw.vue'
import FbWrapper from '~/components/fb/atoms/FbWrapper'

export default {
  components: {
    SgTabs,
    SgModalWithdraw,
    FbWrapper
  },
  data () {
    return {
      stepOne: true,
      stepTwo: false,
      showConfirm: false,
      showConfirmValue: false,
      showConfirmNext: false,
      step: 1
    }
  },
  computed: {
    ...mapGetters({
      // loggedInUser: 'loggedInUser',
      currentSettings: 'settings/currentSettings'
    })
  },
  methods: {
    switchStep () {
      this.stepOne = !this.stepOne
      this.stepTwo = !this.stepTwo
    },
    changePix (number) {
      this.step = number
    },
    confirmNext () {
      this.showConfirmValue = !this.showConfirmValue
      this.showConfirmNext = !this.showConfirmNext
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
  @include md {
    width: 440px;
    height: auto;
  }

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
  white-space: nowrap;
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

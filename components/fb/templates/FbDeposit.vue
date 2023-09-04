<template>
  <div class="main-content mt-3 mt-md-0">
    <div class="type-deposit-section">
      <div class="header-profile d-none d-md-grid p-2 text-white mt-3 fut-color-dynamic">
        <span>{{ $t('i18n_tipo_de_pagamento') }}</span>
      </div>
      <button v-if="!availableMethods || (availableMethods && availableMethods.includes('pix'))" class="text-start logo-deposit mx-md-0" :class="{active: ctype === 'pix'}" @click="ctype = 'pix'">
        <img class="pix-image  p-1" src="/img/pix.png">
        <span>Pix Flash!</span>
      </button>
      <button v-if="availableMethods && availableMethods.includes('picpay')" class="text-start logo-deposit mx-md-0" :class="{active: ctype === 'picpay'}" @click="ctype = 'picpay'">
        <img class="pix-image  p-1" src="/payments/picpay.png" width="70px" height="30px">
        <span>Picpay!</span>
      </button>
      <button v-if="availableMethods && availableMethods.includes('credito')" class="logo-deposit mx-md-0 text-start" :class="{active: ctype === 'credito'}" @click="ctype = 'credito'">
        <img class="pix-image  p-1" src="/payments/credito.png" width="70px" height="30px">
        <span>Cartão!</span>
      </button>
    </div>
    <div class="pix-section">
      <div class="header-profile d-none d-md-flex mt-3 p-2 align-items-center text-white fut-color-dynamic">
        <span>Pix Flash!</span>
      </div>
      <div class="section-deposit">
        <div class="section-details fut-color-dynamic">
          <div>
            <span>
              - <span v-if="ctype === 'pix'" v-html="$t('i18n_sempre_que_quiser_fazer')" />
              <br v-if="ctype === 'pix'">
              <br v-if="ctype === 'pix'">
              - <span v-if="ctype === 'pix'" v-html="$t('i18n_nao_deposite_usando_uma_chave')" />
              <br v-if="ctype === 'pix'">
              <br v-if="ctype === 'pix'">
              - <span v-html="$t('i18n_nao_temos_codigo_bonus')" />
              <br>
              <br>
              <!-- eslint-disable-next-line -->
              - <span v-html="$t('i18n_nao_use_o_banco_paypal')" />
              <br>
              <br>
              <!-- eslint-disable-next-line -->
              - <span v-html="$t('i18n_depositos_em_nome_de_terceiros')" />
            </span>
          </div>
          <div class="border-division w-100 mt-4 mb-2" />
          <div>
            <span v-if="currentSettings">
              {{ $t('i18n_minimo') }}: {{ currentSettings.dp_limit_min }} BRL
              <br>
              {{ $t('i18n_tempo_de_processamento') }} 5 {{ $t('i18n_minuto', 2) }}
              <br>
            </span>
          </div>
        </div>
        <fb-deposit-input
          v-if="currentSettings"
          :response="depositResponse"
          :ctype="ctype"
          :deposit-limit-min="currentSettings.dp_limit_min"
          :font="currentSettings.font"
          :loading="getBankLoading"
          :response-errors="getBankErrors"
          @submit="payload => submitDeposit(payload)"
          @clearResponse="depositResponse = null"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import FbDepositInput from '@/components/fb/organisms/FbDepositInput.vue'
import sportradarTagManager from '@/mixins.js/sportradarTagManager.js'

export default {
  name: 'FbDeposit',
  components: {
    FbDepositInput
  },
  mixins: [sportradarTagManager],
  props: {
    availableMethods: {
      type: Array,
      default: () => (null)
    }
  },
  data () {
    return {
      depositResponse: null,
      ctype: 'pix'
    }
  },
  computed: {
    ...mapGetters({
      getBankErrors: 'onboarding-bank/getBankErrors',
      currentSettings: 'settings/currentSettings',
      getBankLoading: 'onboarding-bank/getBankLoading',
      loggedInUser: 'loggedInUser'
    })
  },
  methods: {
    submitDeposit (payload) {
      const rawPayload = { ...payload }
      rawPayload.method = this.ctype
      this.fetchBankDeposits().then((deposits) => {
        this.postBankDeposit(rawPayload).then((response) => {
          this.depositResponse = response.data

          if (deposits && deposits.length > 0) {
            this.srtmRecurringDeposit(response.data.player_id, response.data.id, response.data.amount, 'R$')
          } else {
            this.srtmFirstDeposit(response.data.player_id, response.data.id, response.data.amount, 'R$')
          }
        })
      })
    },
    ...mapActions({
      postBankDeposit: 'onboarding-bank/postBankDeposit',
      fetchBankDeposits: 'onboarding-bank/fetchBankDeposits'
    })
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/layout/breakpoints";

*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: Arial, "Helvetica Neue", Helvetica, sans-serif;
}
.section-deposit {
  @include md {
    display: flex;
  }
}
.border-division {
  border: 1px solid var(--fut-background-lightest);
}
.main-content {
  overflow: hidden;
  margin: auto;
  display: grid;
  @include md {
    display: flex;
    justify-content: center;
  }
}
.pix-section {
  @include md {
    width: 70%;
  }
}
.pix-image {
  object-fit: contain;
  width: 70px;
  // height: 19.9px;
  background: white;
  border-radius: 5px;
  // filter: invert(100%) sepia(0%) saturate(0%) hue-rotate(49deg) brightness(300%) contrast(104%);
}
.type-deposit-section {
  white-space: nowrap;
  float: left;
  font-size: 12px;
  width: 100%;
  border-right: 1px solid var(--fut-background-darkest);
  @include md {
    width: 225px;
  }
}
.header-profile {
  background-color: var(--fut-background-lighter);
  border-bottom: 1px solid var(--fut-background-darkest);
  font-size: 12px;
  text-transform: uppercase;
}
.section-details {
  color: white;
  display: table-cell;
  box-sizing: border-box;
  float: none;
  vertical-align: top;
  padding: 10px;
  font-size: 13px;
  width: 100%;
  background-color: var(--fut-background-black);
  @include md {
    background-color: var(--fut-background-lighter);
    width: 292.2px;
  }
}
.logo-deposit {
  background: var(--fut-background-lighter);
  &.active{
    background-image: linear-gradient(
      to right,
      var(--fut-primary),
      var(--fut-secondary)
    );
  }
  border: 1px solid var(--fut-background-darkest);
  font-size: 13px;
  box-sizing: border-box;
  display: block;
  font-size: 13px;
  line-height: 15px;
  padding: 23px 10px;
  position: relative;
  text-decoration: none;
  width: 100%;
  @include md {
    width: 225px;
  }
}
</style>

<template>
  <div v-if="loggedInUser" class="main-content mt-3 mt-md-0">
    <div class="type-payment-section">
      <div class="header-profile p-2 d-none d-md-block">
        <span class="text-white fut-color-dynamic">{{ $t('i18n_tipo_de_saque') }}</span>
      </div>
      <div class="logo-withdraw mx-md-0">
        <img class="pix-image p-1" src="/img/pix.png">
        <span>{{ $t('i18n_saque_via_pix') }}</span>
      </div>
    </div>
    <div class="pix-section">
      <div class="header-profile d-none d-md-flex p-2 align-items-center text-white">
        <span class="text-white fut-color-dynamic">{{ $t('i18n_saque_via_pix') }}</span>
      </div>
      <div class="section-withdraw">
        <div class="section-details fut-color-dynamic">
          <div>
            <span>
              {{ $t('i18n_atencao').toUpperCase() }}:
              <br>
              <br>
              - {{ $t('i18n_so_e_permitido_solicitar_um') }}
              <br>
              <br>
              - {{ $t('i18n_para_solicitar_o_saque') }}
              <br>
              <br>
              - <span v-html="$t('i18n_deve_solicitar_saques_apenas_para_contas')" />
              <br>
              <br>
              - <span v-html="$t('i18n_para_ter_o_saldo_de_volta')" />
            </span>
          </div>
          <div class="border-division w-100 mt-4 mb-2" />
          <div>
            <span v-if="currentSettings">
              {{ $t('i18n_minimo') }}: {{ currentSettings.wd_limit_min }} BRL
              <br>
              {{ $t('i18n_maximo') }}: {{ currentSettings.wd_limit_max }} BRL
              <br>
              {{ $t('i18n_tempo_de_processamento') }} 5 {{ $tc('i18n_minuto', 2) }}
              <br>
            </span>
          </div>
        </div>
        <fb-withdraw-input
          v-if="currentSettings"
          :response="withdrawResponse"
          :midnight-block="currentSettings.block_wd_midnight"
          :can-withdraw="loggedInUser.player.can_withdraw"
          :withdraw-limit-min="+currentSettings.wd_limit_min"
          :withdraw-limit-max="+currentSettings.wd_limit_max"
          :font="currentSettings.font"
          :document="loggedInUser.player.document"
          :phone="loggedInUser.phone"
          :email="loggedInUser.email"
          :loading="getBankLoading"
          :response-errors="getBankErrors"
          :pix-types="currentSettings.pix_types"
          @submit="payload => submitWithdraw(payload)"
          @clearResponse="withdrawResponse = null"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import FbWithdrawInput from '@/components/fb/organisms/FbWithdrawInput.vue'

export default {
  name: 'FbWithdraw',
  componentes: {
    FbWithdrawInput
  },
  data () {
    return {
      withdrawResponse: null
    }
  },
  computed: {
    ...mapGetters({
      getBankLoading: 'onboarding-bank/getBankLoading',
      getBankErrors: 'onboarding-bank/getBankErrors',
      currentSettings: 'settings/currentSettings',
      loggedInUser: 'loggedInUser'
    })
  },
  methods: {
    ...mapActions({
      postBankWithdraw: 'onboarding-bank/postBankWithdraw'
    }),
    localString (value) {
      const number = +value
      return number.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
    },
    submitWithdraw (payload) {
      this.postBankWithdraw(payload).then((result) => {
        this.withdrawResponse = result
      })
    }
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
.section-withdraw {
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
  width: 70px;
  // height: 19.9px;
  background: white;
  border-radius: 5px;
  // filter: invert(100%) sepia(0%) saturate(0%) hue-rotate(49deg) brightness(300%) contrast(104%);
}
.type-withdraw-section {
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
  font-family: Arial, Helvetica, sans-serif;
  background-color: var(--fut-background-black);
  @include md {
    background-color: var(--fut-background-lighter);
    width: 292.2px;
  }
}
.logo-withdraw {
  background-image: linear-gradient(
    to right,
    var(--fut-primary),
    var(--fut-secondary)
  );
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
.type-payment-section{
  @include md{
    margin-right: 1px;
  }
}
</style>

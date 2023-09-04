<template>
  <div class="text-start">
    <div class="overflow">
      <div class="d-flex">
        <nsx-fut-button class="nsx-button me-2 nowrap" :class="{active: currentMenu === 0}" @click="currentMenu = 0">
          {{ $t('i18n_depositar') }}
        </nsx-fut-button>
        <nsx-fut-button class="nsx-button me-2 nowrap" :class="{active: currentMenu === 1}" @click="currentMenu = 1">
          {{ $t('i18n_saque', 1) }}
        </nsx-fut-button>
        <nsx-fut-button class="nsx-button me-2 nowrap" :class="{active: currentMenu === 2}" @click="currentMenu = 2">
          {{ $t('i18n_historico_deposito') }}
        </nsx-fut-button>
        <nsx-fut-button class="nsx-button me-2 nowrap" :class="{active: currentMenu === 3}" @click="currentMenu = 3">
          {{ $t('i18n_historico_saque') }}
        </nsx-fut-button>
      </div>
    </div>
    <div v-if="currentMenu === 0">
      <nsx-deposit
        :current-settings="currentSettings"
        :bank-loading="bankLoading"
        :deposit-response="depositResponse"
        :errors="bankErrors"
        @submitDeposit="$emit('submitDeposit', $event)"
        @cleanDepositResponse="$emit('cleanDepositResponse')"
      />
    </div>
    <div v-if="currentMenu === 1">
      <nsx-withdraw
        :current-settings="currentSettings"
        :logged-in-user="loggedInUser"
        :bank-loading="bankLoading"
        :errors="bankErrors"
        :withdraw-response="withdrawResponse"
        :pix-types="currentSettings.pix_types"
        @submitWithdraw="$emit('submitWithdraw', $event)"
        @cleanWithdrawResponse="$emit('cleanWithdrawResponse')"
      />
    </div>
    <div v-if="currentMenu === 2">
      <nsx-deposits />
    </div>
    <div v-if="currentMenu === 3">
      <nsx-withdraws
        :withdraws="withdraws"
        @fetchWithdraws="$emit('fetchWithdraws')"
      />
    </div>
  </div>
</template>

<script>
import NsxFutButton from '@/components/nsx/atoms/NsxFutButton'
import NsxDeposit from '@/components/nsx/organisms/NsxDeposit'
import NsxDeposits from '@/components/nsx/organisms/NsxDeposits'
import NsxWithdraw from '@/components/nsx/organisms/NsxWithdraw'
import NsxWithdraws from '@/components/nsx/organisms/NsxWithdraws'

export default {
  name: 'NsxBankOptions',
  components: {
    NsxFutButton,
    NsxDeposit,
    NsxWithdraw,
    NsxWithdraws,
    NsxDeposits
  },
  props: {
    currentSettings: {
      type: Object,
      default: () => ({})
    },
    loggedInUser: {
      type: Object,
      default: () => ({})
    },
    bankLoading: {
      type: Boolean,
      default: false
    },
    bankErrors: {
      type: Object,
      default: () => ({})
    },
    depositResponse: {
      type: Object,
      default: () => ({})
    },
    withdrawResponse: {
      type: Object,
      default: () => ({})
    },
    withdraws: {
      type: Array,
      default: () => ([])
    }
  },
  data () {
    return {
      currentMenu: 0
    }
  },
  created () {
    this.$emit('clearBankErrors')
  }
}
</script>

<style scoped lang="scss">
.overflow{
  overflow-x: auto;
}
.nowrap{
  white-space: nowrap;
}
h5{
  font-size: 12pt;
}
p{
  font-size: 14px;
}
.nsx-button{
  color: #fff;
  background: #6c757d;
  text-align: center;
  vertical-align: middle;
  border-radius: 0.2rem !important;
  padding: 2px 10px;
  font-size: 14px;
}
.nsx-button:hover{
  background: #5b646b;
}
.nsx-button.active{
  background: linear-gradient(#ff8800,#ff6600) !important;
}
</style>

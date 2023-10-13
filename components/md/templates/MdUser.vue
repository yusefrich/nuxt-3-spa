<template>
  <div class="md-user">
    <md-user-tabs
      :tab-value="getTab"
      :logged-in-user="loggedInUser"
      class="mb-2 mb-md-3"
      @updateTab="updateTab($event)"
    />

    <div class="content">
      <md-balance
        :logged-in-user="loggedInUser"
        :loading="getOnboardingAuthLoading"
        class="balance py-1 py-lg-2 me-md-2"
        @cancelUserBonus="cancelUserBonus()"
      />

      <keep-alive>
        <component
          :is="getTab"
          :logged-in-user="loggedInUser"
          :current-settings="currentSettings"
          :deposit-response="depositResponse"
          :deposit-errors="getBankErrors"
          :deposit-history="depositHistory"
          :withdraw-response="withdrawResponse"
          :withdraw-history="withdrawHistory"
          :casino-history="bankCasinoTransactions"
          :loading="getBankLoading || getOnboardingAuthLoading"
          :errors="getOnboardingAuthErrors"
          :fetched-address="fetched"
          :user-bets="[]"
          :midnight-block="currentSettings.block_wd_midnight"
          class="component mt-2"
          @submitDeposit="deposit($event)"
          @submitWithdraw="withdraw($event)"
          @resetModal="resetModal()"
          @fetchBankDeposits="fetchBankDeposits()"
          @concatBankDeposits="concatBankDeposits()"
          @fetchBankWithdraws="fetchBankWithdraws()"
          @concatBankWithdraws="concatBankWithdraws()"
          @updateData="updateUserData($event)"
          @updatePassword="updateUserPassword($event)"
          @searchAddress="searchAddress($event)"
          @fetchBankCasinoTransactions="fetchBankCasinoTransactions()"
          @fetchUserBets="() => { console.log('userBets') }"
          @addUserBets="addUserBets()"
          @concatBankCasinoTransactions="concatBankCasinoTransactions($event)"
        />
      </keep-alive>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'pinia'
import { useBaseStore } from '@/stores/base'
import { useSettingsStore } from '@/stores/settings'
import { useOnboardingAuthStore } from '@/stores/onboarding-auth'
import { useOnboardingBankStore } from '@/stores/onboarding-bank'
import { useOnboardingUserConfigStore } from '@/stores/onboarding-user-config'

import MdUserTabs from '~/components/md/molecules/MdUserTabs'
import MdBalance from '@/components/md/molecules/MdBalance'
import History from '@/components/md/organisms/MdHistory'
import Account from '@/components/md/organisms/MdAccount'
import Withdraw from '@/components/md/organisms/MdWithdraw'
import Documents from '@/components/md/organisms/MdDocuments'
import Deposits from '@/components/md/organisms/MdDeposits'
import CasinoHistory from '@/components/md/organisms/MdCasinoHistory'
import sportradarTagManager from '@/mixins.js/sportradarTagManager.js'

export default {
  name: 'MdUser',
  components: {
    MdUserTabs,
    MdBalance,
    History,
    Account,
    Withdraw,
    Documents,
    Deposits,
    CasinoHistory
  },
  mixins: [sportradarTagManager],
  data () {
    return {
      currentTab: 'History',
      depositResponse: null,
      withdrawResponse: null,
      fetched: {
        street: '',
        neighborhood: ''
      }
    }
  },
  computed: {
    ...mapState(useBaseStore, {
      loggedInUser: 'loggedInUser'
    }),
    ...mapState(useSettingsStore, {
      currentSettings: 'currentSettings'
    }),
    ...mapState(useOnboardingAuthStore, {
      getOnboardingAuthErrors: 'getOnboardingAuthErrors',
      getOnboardingAuthLoading: 'getOnboardingAuthLoading'
    }),
    ...mapState(useOnboardingBankStore, {
      getBankErrors: 'getBankErrors',
      getBankLoading: 'getBankLoading',
      getBankDeposits: 'getBankDeposits',
      getBankWithdraws: 'getBankWithdraws',
      getBankCasinoTransactions: 'getBankCasinoTransactions'
    }),
    ...mapState(useOnboardingUserConfigStore, {
      getTab: 'getTab'
    }),
    // ...mapGetters({
    //   userBets: 'userBets'
    // }),
    depositHistory () {
      if (this.getBankDeposits !== null) {
        return this.getBankDeposits.data.map(item => ({
          value: 'R$ ' + item.amount.toString().replace('.', ','),
          date: new Date(item.created_at).toLocaleDateString('pt-BR'),
          type: item.method,
          status: item.situation,
          action: item.situation === 'Pendente',
          pixInfos: item.payment
        }))
      }
      return []
    },
    withdrawHistory () {
      if (this.getBankWithdraws !== null) {
        return this.getBankWithdraws.data.map(item => ({
          value: 'R$ ' + item.amount.toString().replace('.', ','),
          date: new Date(item.created_at).toLocaleDateString('pt-BR'),
          type: item.method,
          status: item.status
        }))
      }
      return []
    },
    bankCasinoTransactions () {
      if (this.getBankCasinoTransactions !== null) {
        return this.getBankCasinoTransactions.map(item => ({
          type_game: `${item.type} - ${item.game}`,
          credit: item.status === 2 ? `${item.amount} R$` : '0.00 R$',
          debit: item.status === 1 ? `${item.amount} R$` : '0.00 R$',
          balance: `${item.balance_after} R$`,
          balance_bonus: '0.00 R$',
          ...item
        }))
      }

      return []
    }
  },
  methods: {
    ...mapActions(useOnboardingAuthStore, {
      updateUserData: 'updateUserData',
      fetchAddressData: 'fetchAddressData',
      updateUserPassword: 'updateUserPassword',
      sendCancelUserBonus: 'sendCancelUserBonus'
    }),
    ...mapActions(useOnboardingBankStore, {
      postBankDeposit: 'postBankDeposit',
      postBankWithdraw: 'postBankWithdraw',
      fetchBankDeposits: 'fetchBankDeposits',
      concatBankDeposits: 'concatBankDeposits',
      fetchBankWithdraws: 'fetchBankWithdraws',
      concatBankWithdraws: 'concatBankWithdraws',
      fetchBankCasinoTransactions: 'fetchBankCasinoTransactions',
      concatBankCasinoTransactions: 'concatBankCasinoTransactions',
      clearBankErrors: 'clearBankErrors'
    }),
    ...mapActions(useOnboardingUserConfigStore, {
      changeTab: 'changeTab'
    }),
    // ...mapActions({
    //   fetchUserBets: 'fetchUserBets',
    //   addUserBets: 'addUserBets',
    // }),
    updateTab (event) {
      this.changeTab(event)
      this.$router.replace({
        query: {
          tab: event
        }
      })
    },
    deposit (payload) {
      this.postBankDeposit(payload).then((response) => {
        this.depositResponse = response.data
        this.fetchBankDeposits()
        if (this.getBankDeposits.length > 0) {
          this.srtmFirstDeposit(response.data.player_id, response.data.id, response.data.amount, 'R$')
        } else {
          this.srtmRecurringDeposit(response.data.player_id, response.data.id, response.data.amount, 'R$')
        }
      })
    },
    withdraw (payload) {
      this.postBankWithdraw(payload).then((result) => {
        this.withdrawResponse = result
        this.fetchBankWithdraws()
      })
    },
    resetModal () {
      this.depositResponse = null
    },
    searchAddress (cep) {
      if (!cep) {
        this.$toast.open({ message: 'Digite um cep válido!', type: 'warning' })
        return
      }

      this.fetchAddressData(cep).then((data) => {
        this.fetched.street = data.logradouro
        this.fetched.neighborhood = data.bairro
      })
    },
    cancelUserBonus () {
      this.sendCancelUserBonus({ bonus: true }).then(() => {
        window.location.reload()
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.md-user {
  background: var(--md-bg-color);

  .content {
    display: flex;
    flex-direction: row;
    width: 100%;
    margin: 0;
    padding: 0;

    .balance {
      width: 30%;
    }
    .component {
      width: 70%;
    }
  }
}

@media(max-width: 768px) {
  .content {
    display: block !important;

    .balance {
      width: 100% !important;
    }
    .component {
      width: 100% !important;
    }
  }
}
</style>

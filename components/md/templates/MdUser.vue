<template>
  <div class="md-user">
    <md-user-tabs
      :value="getTab"
      :logged-in-user="loggedInUser"
      class="mb-2 mb-md-3"
      @input="updateTab($event)"
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
          :user-bets="userBets"
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
          @fetchUserBets="fetchUserBets()"
          @addUserBets="addUserBets()"
          @concatBankCasinoTransactions="concatBankCasinoTransactions($event)"
        />
      </keep-alive>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import MdUserTabs from '~/components/md/molecules/MdUserTabs.vue'
import MdBalance from '@/components/md/molecules/MdBalance.vue'
import History from '@/components/md/organisms/MdHistory.vue'
import Account from '@/components/md/organisms/MdAccount.vue'
import Withdraw from '@/components/md/organisms/MdWithdraw.vue'
import Documents from '@/components/md/organisms/MdDocuments.vue'
import Deposits from '@/components/md/organisms/MdDeposits.vue'
import CasinoHistory from '@/components/md/organisms/MdCasinoHistory.vue'
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
    ...mapGetters({
      loggedInUser: 'loggedInUser',
      currentSettings: 'settings/currentSettings',
      getBankDeposits: 'onboarding-bank/getBankDeposits',
      getBankWithdraws: 'onboarding-bank/getBankWithdraws',
      getBankErrors: 'onboarding-bank/getBankErrors',
      getBankLoading: 'onboarding-bank/getBankLoading',
      getTab: 'onboarding-user-config/getTab',
      getOnboardingAuthLoading: 'onboarding-auth/getOnboardingAuthLoading',
      getOnboardingAuthErrors: 'onboarding-auth/getOnboardingAuthErrors',
      getBankCasinoTransactions: 'onboarding-bank/getBankCasinoTransactions',
      userBets: 'userBets'
    }),
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
    ...mapActions({
      changeTab: 'onboarding-user-config/changeTab',
      postBankDeposit: 'onboarding-bank/postBankDeposit',
      fetchBankDeposits: 'onboarding-bank/fetchBankDeposits',
      concatBankDeposits: 'onboarding-bank/concatBankDeposits',
      postBankWithdraw: 'onboarding-bank/postBankWithdraw',
      fetchBankWithdraws: 'onboarding-bank/fetchBankWithdraws',
      concatBankWithdraws: 'onboarding-bank/concatBankWithdraws',
      updateUserData: 'onboarding-auth/updateUserData',
      updateUserPassword: 'onboarding-auth/updateUserPassword',
      fetchAddressData: 'onboarding-auth/fetchAddressData',
      fetchBankCasinoTransactions: 'onboarding-bank/fetchBankCasinoTransactions',
      concatBankCasinoTransactions: 'onboarding-bank/concatBankCasinoTransactions',
      fetchUserBets: 'fetchUserBets',
      addUserBets: 'addUserBets',
      sendCancelUserBonus: 'onboarding-auth/sendCancelUserBonus'
    }),
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

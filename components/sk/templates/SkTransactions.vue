<template>
  <div class="container text-white">
    <div class="transactions-header">
      <h1>
        <font-awesome-icon class="icon" :icon="['fas', 'clipboard-list']" />
        <span>{{ $t('i18n_transacoes') }}</span>
      </h1>
      <button @click="$router.go(-1)">
        <font-awesome-icon class="icon transition" :icon="['fas', 'times']" />
      </button>
    </div>

    <div class="personal-body">
      <sk-settings-nav
        :items="navItems"
        :selected="currentTab"
        @changeTab="changTab($event)"
      />

      <sk-balance
        v-if="currentTab === 'balance'"
        :logged-in-user="loggedInUser"
        :is-mobile="isMobile"
        @cancelUserBonus="cancelUserBonus()"
      />
      <sk-deposits
        v-if="currentTab === 'deposits'"
        :deposits="deposits"
        @concatBankDeposits="concatBankDeposits()"
      />
      <sk-withdrawals
        v-if="currentTab === 'withdrawals'"
        :withdrawals="withdrawals"
        @concatBankWithdraws="concatBankWithdraws()"
      />
      <sk-casino-history
        v-if="currentTab === 'casino'"
        :casino-history="casinoHistory"
        @concatBankCasinoTransactions="concatBankCasinoTransactions($event)"
      />
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import SkDeposits from '@/components/sk/organisms/SkDeposits.vue'
import SkWithdrawals from '@/components/sk/organisms/SkWithdrawals.vue'
import SkCasinoHistory from '@/components/sk/organisms/SkCasinoHistory.vue'
import SkBalance from '@/components/sk/organisms/SkBalance.vue'
import windowWidth from '@/mixins.js/windowWidth.js'

export default {
  name: 'SkTransactions',
  components: {
    SkDeposits,
    SkWithdrawals,
    SkCasinoHistory,
    SkBalance
  },
  mixins: [windowWidth],
  data () {
    return {
      currentTab: 'deposits'
    }
  },
  computed: {
    ...mapGetters({
      loggedInUser: 'loggedInUser',
      getBankDeposits: 'onboarding-bank/getBankDeposits',
      getBankWithdraws: 'onboarding-bank/getBankWithdraws',
      getBankCasinoTransactions: 'onboarding-bank/getBankCasinoTransactions'
    }),
    navItems () {
      return [
        {
          text: this.$t('i18n_saldo'),
          link: '/user/bank/transactions?tab=balance',
          tab: 'balance'
        },
        {
          text: this.$tc('i18n_deposito', 2),
          link: '/user/bank/transactions?tab=deposits',
          tab: 'deposits'
        },
        {
          text: this.$tc('i18n_saque', 2),
          link: '/user/bank/transactions?tab=withdrawals',
          tab: 'withdrawals'
        },
        {
          text: this.$t('i18n_cassino'),
          link: '/user/bank/transactions?tab=casino',
          tab: 'casino'
        }
      ]
    },
    deposits () {
      if (
        this.getBankDeposits &&
        this.getBankDeposits.data &&
        this.getBankDeposits.data.length
      ) {
        return this.getBankDeposits.data
      }

      return []
    },
    withdrawals () {
      if (
        this.getBankWithdraws &&
        this.getBankWithdraws.data &&
        this.getBankWithdraws.data.length
      ) {
        return this.getBankWithdraws.data
      }

      return []
    },
    casinoHistory () {
      if (
        this.getBankCasinoTransactions &&
        this.getBankCasinoTransactions.length
      ) {
        return this.getBankCasinoTransactions
      }

      return []
    },
    isMobile () {
      return this.width <= 821
    }
  },
  created () {
    this.currentTab = this.$route.query.tab || 'deposits'

    this.fetches()
  },
  methods: {
    ...mapActions({
      fetchBankDeposits: 'onboarding-bank/fetchBankDeposits',
      concatBankDeposits: 'onboarding-bank/concatBankDeposits',
      fetchBankWithdraws: 'onboarding-bank/fetchBankWithdraws',
      concatBankWithdraws: 'onboarding-bank/concatBankWithdraws',
      sendCancelUserBonus: 'onboarding-auth/sendCancelUserBonus',
      fetchBankCasinoTransactions: 'onboarding-bank/fetchBankCasinoTransactions',
      concatBankCasinoTransactions: 'onboarding-bank/concatBankCasinoTransactions'
    }),
    fetches () {
      switch (this.currentTab) {
        case 'deposits':
          this.fetchBankDeposits()
          break
        case 'withdrawals':
          this.fetchBankWithdraws()
          break
        case 'casino':
          this.fetchBankCasinoTransactions()
          break
        default:
          this.fetchBankDeposits()
      }
    },
    changTab (tab) {
      this.$router.replace({ query: { tab } })

      this.currentTab = tab
      this.fetches()
    },
    cancelUserBonus () {
      this.sendCancelUserBonus({
        bonus: true
      }).then(() => {
        window.location.reload()
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  padding: 34px 3vw 0 3vw !important;

  .transactions-header {
    display: flex;
    justify-content: space-between;
    color: var(--fut-color-dynamic);
    margin-bottom: 24px;

    h1 {
      font-weight: 700;
      font-size: 1.125rem;
      display: flex;
      align-items: center;
      margin: 0;

      .icon {
        color: var(--fut-secondary);
        margin-right: 8px;
      }
    }
    button {
      border: none;
      background: transparent;

      .icon {
        color: var(--fut-secondary);
      }
      &:hover {
        .icon {
          color: var(--fut-color-dynamic);
        }
      }
      &:active {
        .icon {
          transform: scale(.90);
        }
      }
    }
  }

  .personal-body {
    display: grid;
    grid-template-columns: auto 1fr;
    position: relative;
    gap: 1.5rem;
    align-items: flex-start;
  }
}

@media (max-width: 821px) {
  .personal-body {
    grid-auto-flow: row;
    grid-template-columns: none !important;
  }
}
</style>

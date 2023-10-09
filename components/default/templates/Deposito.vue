<template>
  <user>
    <deposit
      v-if="currentSettings"
      class="text-white"
      :response="depositResponse"
      :deposit-limit-min="currentSettings.dp_limit_min"
      :loading="getBankLoading"
      :response-errors="getBankErrors"
      @submit="payload => submitDeposit(payload)"
      @clearResponse="depositResponse = null"
    />
  </user>
</template>

<script>
import { mapState, mapActions } from 'pinia'
import { useSettingsStore } from '@/stores/settings'
import { useOnboardingBankStore } from '@/stores/onboarding-bank'

import User from '@/components/default/templates/User'
import Deposit from '@/components/default/organisms/Deposit'
import sportradarTagManager from '@/mixins.js/sportradarTagManager.js'

export default {
  name: 'Deposito',
  components: {
    User,
    Deposit
  },
  mixins: [sportradarTagManager],
  data () {
    return {
      depositResponse: null
    }
  },
  computed: {
    ...mapState(useSettingsStore, {
      currentSettings: 'currentSettings'
    }),
    ...mapState(useOnboardingBankStore, {
      getBankErrors: 'getBankErrors',
      getBankLoading: 'getBankLoading'
    })
  },
  methods: {
    ...mapActions(useOnboardingBankStore, {
      fetchBankDeposits: 'fetchBankDeposits',
      postBankDeposit: 'postBankDeposit'
    }),
    submitDeposit (payload) {
      this.fetchBankDeposits().then((deposits) => {
        this.postBankDeposit(payload).then((response) => {
          this.depositResponse = response.data

          if (deposits.length > 0) {
            this.srtmFirstDeposit(
              response.data.player_id,
              response.data.id,
              response.data.amount,
              'R$'
            )
          } else {
            this.srtmRecurringDeposit(
              response.data.player_id,
              response.data.id,
              response.data.amount,
              'R$'
            )
          }
        })
      })
    }
  }
}
</script>

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
import { mapGetters, mapActions } from 'vuex'
import User from '@/components/default/templates/User.vue'
import Deposit from '@/components/default/organisms/Deposit.vue'
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
    ...mapGetters({
      getBankLoading: 'onboarding-bank/getBankLoading',
      getBankErrors: 'onboarding-bank/getBankErrors',
      currentSettings: 'settings/currentSettings'
    })
  },
  methods: {
    ...mapActions({
      fetchBankDeposits: 'onboarding-bank/fetchBankDeposits',
      postBankDeposit: 'onboarding-bank/postBankDeposit'
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

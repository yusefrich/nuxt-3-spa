<template>
  <div class="deposit-content">
    <fut-filter v-if="rawWithdraws" class="mb-4" :list="rawWithdraws" field="created_at" @updateList="(list)=>withdraws = list" />
    <template v-for="(withdraw, index) in withdraws" :key="'withdraw_'+index">
      <div :class="'deposit-pix fut-color-dynamic'">
        <div class="d-flex justify-content-between">
          <p class="mb-0">
            <small>{{ formmated(withdraw.created_at) }}</small>
          </p>
        </div>
        <div class="d-flex justify-content-between">
          <h4>
            <strong>{{ $t('i18n_valor') }}: </strong>R$ {{ withdraw.amount }}
          </h4>
          <h5>
            <strong>{{ withdraw.method }}</strong>
          </h5>
        </div>
        <div v-if="withdraw.method === 'pix'">
          <p class="mb-0">
            Pix: {{ withdraw.pix }}
          </p>
          <p class="mb-0">
            <small><strong>Status: </strong>{{ withdraw.status }}</small>
          </p>
        </div>
        <hr>
      </div>
    </template>
  </div>
</template>

<script>
import dayjs from 'dayjs'

import { mapState, mapActions } from 'pinia'
import { useOnboardingBankStore } from '@/stores/onboarding-bank'

import FutFilter from '@/components/default/molecules/FutFilter'

export default {
  components: {
    FutFilter
  },
  data () {
    return {
      rawWithdraws: [],
      withdraws: []
    }
  },
  computed: {
    ...mapState(useOnboardingBankStore, {
      getBankWithdraws: 'getBankWithdraws'
    })
  },
  async created () {
    await this.fetchBankWithdraws()
    this.rawWithdraws = this.getBankWithdraws.data
    this.withdraws = this.getBankWithdraws.data
  },
  methods: {
    ...mapActions(useOnboardingBankStore, {
      fetchBankWithdraws: 'fetchBankWithdraws'
    }),
    formmated (date) {
      return dayjs(date).format('DD/MM/YYYY')
    }
  }
}
</script>

<template>
  <div class="deposit-content">
    <fut-filter class="mb-4" :list="rawDeposits" field="created_at" @updateList="(list)=>deposits = list" />
    <template v-for="(deposit, index) in deposits" :key="'deposit_'+index">
      <div :class="'deposit-pix fut-color-dynamic'">
        <div class="d-flex justify-content-between">
          <p class="mb-0">
            <small><strong>Status: </strong>{{ deposit.situation }}</small>
          </p>
          <p class="mb-0">
            <small>{{ formmated(deposit.created_at) }}</small>
          </p>
        </div>
        <div class="d-flex justify-content-between">
          <h4><strong>{{ $t('i18n_valor') }}: </strong>R$ {{ deposit.amount }}</h4>
          <h5><strong>{{ deposit.method }}</strong></h5>
        </div>
        <div v-if="deposit.method === 'transferencia'" class="d-flex justify-content-start">
          <fut-button :primary="true" @click="()=>{ transDep = deposit.payment; transPix = null; modal = true; }">
            <font-awesome-icon class="text-white icon" :icon="['fas', 'university']" />
          </fut-button>
        </div>
        <div v-if="deposit.method === 'pix'" class="d-flex justify-content-start">
          <fut-button :primary="true" @click="()=>{ transDep = null; transPix = deposit.payment; modal = true; }">
            <font-awesome-icon class="text-white icon" :icon="['fas', 'qrcode']" />
          </fut-button>
        </div>
        <div v-if="deposit.method === 'boleto'" class="d-flex justify-content-start">
          <fut-button :primary="true" :to="deposit.payment.boleto_url" target="_blank">
            <font-awesome-icon class="text-white icon" :icon="['fas', 'download']" />
          </fut-button>
        </div>
        <hr>
      </div>
    </template>
    <fut-modal class="text-center" :open="modal" :title="$t('i18n_deposito')" @onClose="()=>{ modal = false; transPix = null; }">
      <div v-if="transPix">
        <img :src="transPix.pix_url" class="img-fluid mb-3" alt="">
        <p style="word-break: break-all;" class="fut-color-dynamic">
          <small>{{ transPix.pix_value }}</small>
        </p>
      </div>
      <div v-if="transDep">
        <h3>{{ $t('i18n_valor_de_verificacao') }}: <span class="text-primary">R$ {{ transDep.tefted_amount_verify }}</span></h3>
        <h3>{{ $t('i18n_conta') }}: <span class="text-primary">{{ transDep.tefted_bankaccount }}</span></h3>
        <h3>{{ $t('i18n_agencia') }}: <span class="text-primary">{{ transDep.tefted_bankbranch }}</span></h3>
        <h3>{{ $t('i18n_banco') }}: <span class="text-primary">{{ transDep.tefted_bankcode }} - {{ transDep.tefted_bankname }}</span></h3>
        <br>
        <p style="word-break: break-all;" class="fut-color-dynamic">
          <small>{{ transDep.tefted_message }}</small>
        </p>
      </div>
    </fut-modal>
  </div>
</template>

<script>
import dayjs from 'dayjs'

import { mapState, mapActions } from 'pinia'
import { useOnboardingBankStore } from '@/stores/onboarding-bank'

import FutModal from '@/components/default/organisms/FutModal'
import FutButton from '@/components/default/atoms/FutButton'

export default {
  components: { 
    FutButton, 
    FutModal
  },
  data () {
    return {
      deposits: [],
      rawDeposits: [],
      modal: false,
      transPix: null,
      transDep: null
    }
  },
  computed: {
    ...mapState(useOnboardingBankStore, {
      getBankDeposits: 'getBankDeposits'
    })
  },
  async created () {
    await this.fetchBankDeposits()
    this.deposits = this.getBankDeposits.data
    this.rawDeposits = this.getBankDeposits.data
  },
  methods: {
    ...mapActions(useOnboardingBankStore, {
      fetchBankDeposits: 'fetchBankDeposits'
    }),
    formmated (date) {
      return dayjs(date).format('DD/MM/YYYY')
    }
  }
}
</script>


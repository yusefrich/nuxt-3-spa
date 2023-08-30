<template>
  <div class="deposit-content">
    <h5 class="text-start pt-3">
      {{ $t('i18n_historico_deposito') }}
    </h5>
    <div class="table-responsive">
      <table class="w-100">
        <thead>
          <tr>
            <th scope="col">
              {{ $t('i18n_data') }}
            </th>
            <th scope="col">
              {{ $t('i18n_valor') }}
            </th>
            <th scope="col">
              Status
            </th>
            <th scode="col">
              Qr
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(deposit, index) in deposits" :key="'deposit_table_'+index">
            <td>
              {{ formmated(deposit.created_at) }}
            </td>
            <td>
              R$ {{ deposit.amount }}
            </td>
            <td :class="{'text-success':deposit.situation==='Finalizada'}">
              {{ deposit.situation }}
            </td>
            <td>
              <nsx-fut-button @click="()=>{ transDep = null; transPix = deposit.payment; modal = true; }">
                <font-awesome-icon class="text-white icon" :icon="['fas', 'qrcode']" />
              </nsx-fut-button>
            </td>
          </tr>
          <tr v-if="deposits.length === 0">
            <td colspan="4">
              {{ $t('i18n_nenhum_registro_foi_encontrado') }}!
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <fut-modal-nsx
      :open="modal"
      class="text-center"
      close
      @onClose="()=>{ modal = false; transPix = null; }"
      @onExit="()=>{ modal = false; transPix = null; }"
    >
      <div v-if="transPix">
        <img :src="transPix.pix_url" class="img-fluid mb-3" alt="">
        <p style="word-break: break-all;">
          <small>{{ transPix.pix_value }}</small>
        </p>
      </div>
      <div v-if="transDep">
        <h3>{{ $t('i18n_valor_de_verificacao') }}: <span class="text-primary">R$ {{ transDep.tefted_amount_verify }}</span></h3>
        <h3>{{ $t('i18n_conta') }}: <span class="text-primary">{{ transDep.tefted_bankaccount }}</span></h3>
        <h3>{{ $t('i18n_agencia') }}: <span class="text-primary">{{ transDep.tefted_bankbranch }}</span></h3>
        <h3>{{ $t('i18n_banco') }}: <span class="text-primary">{{ transDep.tefted_bankcode }} - {{ transDep.tefted_bankname }}</span></h3>
        <br>
        <p style="word-break: break-all;">
          <small>{{ transDep.tefted_message }}</small>
        </p>
      </div>
    </fut-modal-nsx>
  </div>
</template>

<script>
// import { mapGetters, mapActions } from 'vuex'
import { mapActions, mapState } from 'pinia'
import { useOnboardingBankStore } from '@/stores/onboarding-bank'
import dayjs from 'dayjs'
import FutModalNsx from '@/components/nsx/organisms/FutModalNsx.vue'
import NsxFutButton from '@/components/nsx/atoms/NsxFutButton.vue'

export default {
  name: 'NsxDeposits',
  components: {
    NsxFutButton,
    FutModalNsx
  },
  data () {
    return {
      deposits: [],
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
  mounted () {
    this.fetchBankDeposits().then(({ data }) => {
      this.deposits = data
    }).catch(() => {
      this.$toast.open({ message: 'Erro ao buscar historico de depositos!', type: 'error' })
    })
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

<style lang="scss" scoped>
  table{
    border-radius: 6px;
    overflow: hidden;
  }
  td{
    background-color: var(--nsx-dark-1);
    color: #c5c5c5;
    border: 1px solid var(--nsx-dark-7);
    font-size: 13.3px;
    text-align: center;
    padding: 0.4rem;
  }
  th{
    font-size: 13.3px;
    background-color: var(--nsx-dark-0);
    padding: 0.4rem;
    border: 1px solid var(--nsx-dark-1);
    color: #ffa500;
    text-align: center;
    font-weight: 700;
  }
  .table-nsx-white{
    th{
      background-color: var(--nsx-gray-0);
      padding: 0.4rem;
      border: 1px solid var(--nsx-gray-1);
      color: var(--nsx-dark-7);
      text-align: center;
    }
    td{
      background-color: #dbdbdb;
      border: 1px solid #c5c5c5;
      margin: 0;
      padding: 0.3rem;
      color: var(--nsx-dark-7);
      text-align: center;
    }
  }
  .text-orange{
    color: #ff8800;
  }
  .text-success{
    color: #00c851 !important;
    font-weight: bold;
  }
</style>

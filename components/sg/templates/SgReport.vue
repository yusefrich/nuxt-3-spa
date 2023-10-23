<template>
  <div>
    <div class="d-flex align-items-center">
      <div class="border-profile w-100 py-2 px-3 d-flex align-items-center">
        <img class="profile-pic me-2" :src="`https://ui-avatars.com/api/?background=eeeeee&name=${loggedInUser.username}&color=333333`" alt="">
        <div>
          <h4 class="mb-0 fw-bold text-white">
            {{ loggedInUser.username }}
          </h4>
          <!-- <p class="mb-0 fw-bold text-muted">
            Nível Bronze
          </p> -->
        </div>
      </div>
      <img class="ms-4" src="/Sg/Bronze.png" alt="">
    </div>
    <div class="line-border py-3 px-4 my-3">
      <div class="d-flex align-items-center">
        <img width="28px" height="28px" src="/Sg/Grupo 181.png" alt="">
        <h4 class="mb-0 fw-bold text-white fs-15 ms-2">
          {{ $t('i18n_transacoes_do_cassino') }}
        </h4>
      </div>
      <table class="mt-3 table">
        <thead>
          <tr>
            <th class="col">
              {{ $t('i18n_data_hora') }}
            </th>
            <th class="col">
              {{ $t('i18n_tipo_de_transação') }}
            </th>
            <th class="col">
              {{ $t('i18n_credito') }} (R$)
            </th>
            <th class="col">
              {{ $t('i18n_debito') }} (R$)
            </th>
            <th class="col">
              {{ $t('i18n_saldo') }} (R$)
            </th>
            <th class="col">
              {{ $t('i18n_saldo_de_bonus') }} (R$)
            </th>
          </tr>
        </thead>
        <tr v-for="(transaction, index) in getBankCasinoTransactions" :key="'casino_trans_' + index" class="w-100 tr-bottom" :class="{ 'tr-bottom-2': index%2 === 0 }">
          <th class="text-center">
            {{ formmated(transaction.created_at) }}
          </th>
          <th class="w-50">
            {{ transaction.type }} - {{ transaction.game }}
          </th>
          <th class="text-center">
            <span v-if="transaction.status !== 3">{{ transaction.status === 2 ? transaction.amount : '0.00' }} R$</span><span v-else>{{ $t('i18n_estorno') }}</span>
          </th>
          <th class="w-25 text-center">
            <span v-if="transaction.status !== 3">{{ transaction.status === 1 ? transaction.amount : '0.00' }} R$</span><span v-else>{{ $t('i18n_estorno') }}</span>
          </th>
          <th class="w-25 text-center text-primary">
            <span>{{ transaction.balance_after }} R$</span>
          </th>
          <th class="w-25 text-center">
            <span>0.00 R$</span>
          </th>
        </tr>
      </table>
      <div v-if="hasMorePages" class="text-center">
        <button class="btn-wallet text-primary" @click="fetchNew()">
          {{ $t('i18n_ver_mais') }}
        </button>
      </div>
    </div>
    <div class="line-border py-3 px-4 my-3">
      <div class="d-flex align-items-center">
        <img width="28px" height="28px" src="/Sg/dices-bet-svgrepo-com.png" alt="">
        <h4 class="mb-0 fw-bold text-white fs-15 ms-2">
          {{ $t('i18n_relatorio_de_apostas') }}
        </h4>
      </div>
      <table class="mt-3 table">
        <thead>
          <tr>
            <th class="col">
              {{ $t('i18n_boletim_de_aposta') }}
            </th>
            <th class="col">
              {{ $t('i18n_data_hora') }}
            </th>
            <th class="col">
              {{ $t('i18n_tipo') }}
            </th>
            <th class="col">
              {{ $t('i18n_estado_da_aposta') }}
            </th>
            <th class="col">
              {{ $t('i18n_valor_apostado') }} (R$)
            </th>
            <th class="col">
              {{ $t('i18n_vitoria_potencial') }} (R$)
            </th>
            <th class="col">
              {{ $t('i18n_vitoria') }} (R$)
            </th>
            <th class="col">
              {{ $t('i18n_selecoes') }}
            </th>
          </tr>
        </thead>
      </table>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'pinia'
import { useBaseStore } from '@/stores/base'
import { useOnboardingBankStore } from '@/stores/onboarding-bank'

import dayjs from 'dayjs'
export default {
  data () {
    return {
      casinoPage: 1,
      hasMorePages: true
    }
  },
  computed: {
    ...mapState(useBaseStore, {
      loggedInUser: 'loggedInUser'
    }),
    ...mapState(useOnboardingBankStore, {
      getBankCasinoTransactions: 'getBankCasinoTransactions'
    })
  },
  mounted () {
    // todo get current page
    this.fetchBankCasinoTransactions({ page: this.casinoPage }).then((response) => {
      if (response.length <= 0) {
        this.hasMorePages = false
      }
    })
  },
  methods: {
    ...mapActions(useOnboardingBankStore, {
      fetchBankCasinoTransactions: 'fetchBankCasinoTransactions'
    }),
    formmated (date) {
      return dayjs(date).format('DD/MM/YYYY')
    },
    fetchNew () {
      this.casinoPage = this.casinoPage + 1
      this.fetchBankCasinoTransactions({ page: this.casinoPage }).then((response) => {
        if (response.length <= 0) {
          this.hasMorePages = false
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.border-profile {
  background-color: var(--fut-background-darkest);
  border-radius: 50px;
}
.profile-pic {
  width: 90px;
  height: 90px;
  border-radius: 100%;
  border: 2px solid var(--fut-primary);
}
.line-border {
  border: 3px solid var(--fut-background-darkest);
  border-radius: 5px;
  white-space: nowrap;
  overflow-x: scroll;
}
.fs-15 {
  font-size: 15px;
}
.tr-bottom {
  background-color: var(--fut-background-lightest);
  color: white;
  line-height: 30px;
  th {
    font-weight: initial;
    border-left: 1px solid var(--fut-background-lighter);
    font-size: 12px;
  }
}
.tr-bottom-2 {
  background-color: var(--fut-background-lighter);
  color: white;
  line-height: 30px;
  th {
    border-left: 1px solid var(--fut-background-lighter);
    font-size: 12px;
  }
}
.btn-wallet {
  background-color: var(--fut-background-darker);
  font-size: 13px;
  color: var(--fut-background-white);
  border-radius: 10px;
  font-weight: bold;
  padding-left: 20px;
  padding-right: 20px;
  border: 2px solid var(--fut-background-lightest);
  &:hover {
    border: 2px solid var(--fut-background-black);
  }
  &.active {
    background-color: var(--fut-background-lighter);
    color: white;
    border: 2px solid var(--fut-primary);
  }
}
table {
  width: 100%;
  tr {
    background-color: var(--fut-background-darkest);
    width: 100%;
    overflow: hidden;
    th {
      font-size: 12px;
      color: white;
      font-weight: bold;
      text-align: center;
      border-left: 1px solid var(--fut-background-lighter);
    }
  }
}
</style>

<template>
  <div class="container">
    <div class="section-title-bar d-flex justify-content-between">
      <div class="d-flex">
        <fa class="icon-size me-2 text-white fut-color-dynamic" :icon="['fas', 'chart-pie']" />
        <span class="title text-white fut-color-dynamic">{{ $t('i18n_detalhes') }}</span>
      </div>
      <span class="chevron-icon">
        <fa class="icon-size mt-1 text-white fut-color-dynamic" :icon="['fas', 'chevron-down']" />
      </span>
    </div>
    <div class="bs_data_grid_holder">
      <div class="bs_data_grid" style="display: block;">
        <table class="table table-striped w-100">
          <tbody>
            <tr class="pagination_row nohover pagination_no_hover">
              <td colspan="9">
                <div class="d-flex justify-content-between">
                  <span class="text-white fut-color-dynamic">{{ $t('i18n_paginas') }}: <span class="text-primary me-2">{{ getCurrentPageNumber }}</span> <fb-fut-button v-if="hasMorePages" class="arrow" external :to="`?page=${$route.query.page?$route.query.page:1 + 1}`">></fb-fut-button></span>
                </div>
              </td>
            </tr>
            <tr class="table-header-titles d-none d-md-table-row">
              <th class="text-start text-white fut-color-dynamic fw-bold">
                {{ $t('i18n_data_hora') }}
              </th>
              <th class="text-start text-white fut-color-dynamic fw-bold">
                {{ $t('i18n_tipo_de_transação') }}
              </th>
              <th class="text-end text-white fut-color-dynamic fw-bold">
                {{ $t('i18n_credito') }} (R$)
              </th>
              <th class="text-end text-white fut-color-dynamic fw-bold">
                {{ $t('i18n_debito') }} (R$)
              </th>
              <th class="text-end text-white fut-color-dynamic fw-bold">
                {{ $t('i18n_saldo') }} (R$)
              </th>
              <th class="text-end text-white fut-color-dynamic fw-bold">
                {{ $t('i18n_saldo_de_bonus') }} (R$)
              </th>
            </tr>
            <tr class="heading-mobile d-md-none">
              <th class="text-start text-primary fw-bold">
                <span>Total:</span>
              </th>
              <th class="text-start text-primary fw-bold" colspan="1">
                13
              </th>
              <th class="text-end text-primary fw-bold">
                24.27 R$
              </th>
              <th class="text-end text-primary fw-bold">
                11.00 R$
              </th>
              <th colspan="2" />
            </tr>
            <tr v-for="(transaction, index) in getBankCasinoTransactions" :key="'transactions_item_'+index" class="odd">
              <td class="text-start text-white fut-color-dynamic">
                <span>{{ transaction.created_at }}</span>
              </td>
              <td class="text-start text-white fut-color-dynamic">
                <span>{{ transaction.type }} - {{ transaction.game }}</span>
              </td>
              <td class="text-end text-white fut-color-dynamic">
                <span v-if="transaction.status !== 3">{{ transaction.status === 2 ? transaction.amount : '0.00' }} R$</span><span v-else>Estorno</span>
              </td>
              <td class="text-end text-white fut-color-dynamic">
                <span v-if="transaction.status !== 3">{{ transaction.status === 1 ? transaction.amount : '0.00' }} R$</span><span v-else>Estorno</span>
              </td>
              <td class="text-end text-white fut-color-dynamic d-none d-md-table-cell">
                <span>{{ transaction.balance_after }} R$</span>
              </td>
              <td class="text-end text-white fut-color-dynamic d-none d-md-table-cell">
                <span>0.00 R$</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import FbFutButton from '@/components/fb/atoms/FbFutButton.vue'

export default {
  components: {
    FbFutButton
  },
  data () {
    return {
      hasMorePages: true
    }
  },
  computed: {
    ...mapGetters({
      getBankCasinoTransactions: 'onboarding-bank/getBankCasinoTransactions'
    }),
    getCurrentPageNumber () {
      return this.$route.query.page ? this.$route.query.page : 1
    }
  },
  mounted () {
    // todo get current page
    this.fetchBankCasinoTransactions({ page: this.$route.query.page }).then((response) => {
      if (response.length <= 0) {
        this.hasMorePages = false
      }
    })
  },
  methods: {
    ...mapActions({
      fetchBankCasinoTransactions: 'onboarding-bank/fetchBankCasinoTransactions'
    })
  }
}
</script>

<style lang="scss" scoped>
.arrow {
  color: var(--fut-primary);
  text-decoration: underline;
  margin-top: -1px;
}
.section-title-bar{
  margin-top: 10px;
  padding: 10px 20px;
  background: var(--fut-background-lightest);
  .title{
    font-size: 12px;
  }
}
.chevron-icon{
  background: var(--fut-background-lighter);
  border-radius: 50%;
  width: 20px;
  height: 20px;
  text-align: center;
}
.table-striped{
  *{
    font-size: 11px;
    font-family: Arial, Helvetica, sans-serif;
  }
  tr, th, td{
    border: none;
  }
  td{
    padding: 3px;
    border-right: 1px solid var(--fut-background-lightest);
    border-bottom: 1px solid var(--fut-background-lightest);
  }
  tr:last-child {
    th{
      padding: 2px 5px;
    }
  }
  tr:first-child {
    td{
      padding: 5px 3px;
    }
  }
  tr:nth-child(2) {
    th{
      padding: 3px;
      border-right: 1px solid var(--fut-background-lightest);
      border-bottom: 1px solid var(--fut-background-lightest);
    }
  }
  tr:nth-child(3) {
    th{
      padding: 2px 5px;
    }
  }
  tr:nth-child(even){
    background: var(--fut-background-darker);
  }
  tr:nth-child(odd){
    background: var(--fut-background-lighter);
  }
}
</style>

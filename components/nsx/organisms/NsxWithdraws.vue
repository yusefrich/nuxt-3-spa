<template>
  <div class="deposit-content">
    <h5 class="text-start pt-3">
      {{ $t('i18n_historico_saque') }}
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
          </tr>
        </thead>
        <tbody>
          <tr v-for="(withdraw, index) in withdraws" :key="'withdraw_table_'+index">
            <td>{{ formmated(withdraw.created_at) }}</td>
            <td>R$ {{ withdraw.amount }}</td>
            <td>{{ withdraw.status }}</td>
          </tr>
          <tr v-if="withdraws.length === 0">
            <td colspan="4">
              {{ $t('i18n_nenhum_registro_foi_encontrado') }}!
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs'

export default {
  name: 'NsxWithdraws',
  props: {
    withdraws: {
      type: Array,
      default: () => ([])
    }
  },
  mounted () {
    this.$emit('fetchWithdraws')
  },
  methods: {
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
</style>

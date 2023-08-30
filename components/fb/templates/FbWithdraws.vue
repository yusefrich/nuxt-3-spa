<template>
  <div class="container">
    <div class="section-title-bar d-none d-md-flex justify-content-between">
      <div class="d-flex">
        <font-awesome-icon class="icon-size me-2 text-white fut-color-dynamic" :icon="['fas', 'chart-pie']" />
        <span class="title text-white fut-color-dynamic">{{ $t('i18n_detalhes') }}</span>
      </div>
      <span class="chevron-icon">
        <font-awesome-icon class="icon-size mt-1 text-white fut-color-dynamic" :icon="['fas', 'chevron-down']" />
      </span>
    </div>
    <div class="mobile-section-title-bar d-md-none">
      <span>
        {{ $t('i18n_pedidos_de_saques') }}
      </span>
    </div>
    <div class="bs_data_grid_holder">
      <div class="bs_data_grid" style="display: block;">
        <table class="table table-striped w-100">
          <tbody>
            <tr class="table-header-titles">
              <th class="text-center text-white fut-color-dynamic fw-bold">
                {{ $t('i18n_data_hora') }}
              </th>
              <th class="text-center text-white fut-color-dynamic fw-bold">
                {{ $t('i18n_tipo_de_transação') }}
              </th>
              <th class="text-center text-white fut-color-dynamic fw-bold">
                {{ $t('i18n_valor') }}
              </th>
              <th class="text-center text-white fut-color-dynamic fw-bold">
                Status
              </th>
            </tr>
            <tr class="totals_row">
              <th class="text-center text-primary fw-bold">
                <span>Total: {{ withdraws.length }}</span>
              </th>
              <th />
              <th />
              <th />
            </tr>
            <tr v-for="(withdraw, index) in withdraws" :key="'withdraw_fb_'+index" class="odd">
              <td class="text-center text-white fut-color-dynamic">
                <span>{{ formmated(withdraw.created_at) }}</span>
              </td>
              <td class="text-center text-white fut-color-dynamic">
                <span>{{ withdraw.method }}</span>
              </td>
              <td class="text-center text-white fut-color-dynamic">
                <span>{{ withdraw.amount }} BRL</span>
              </td>
              <td class="text-center text-white fut-color-dynamic">
                <span>{{ withdraw.status }}</span>
              </td>
            </tr>
            <tr class="totals_row">
              <th class="text-center text-primary fw-bold">
                <span>Total: {{ withdraws.length }}</span>
              </th>
              <th />
              <th />
              <th />
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import dayjs from 'dayjs'

export default {
  computed: {
    ...mapGetters({
      getBankWithdraws: 'onboarding-bank/getBankWithdraws'
    }),
    withdraws () {
      if (this.getBankWithdraws !== null) {
        return this.getBankWithdraws.data
      }

      return []
    }
  },
  mounted () {
    this.fetchBankWithdraws()
  },
  methods: {
    ...mapActions({
      fetchBankWithdraws: 'onboarding-bank/fetchBankWithdraws'
    }),
    formmated (date) {
      return dayjs(date).format('DD/MM/YYYY')
    }
  }
}
</script>
<style lang="scss" scoped>
@import "@/assets/layout/breakpoints";
.mobile-section-title-bar{
  padding: 10px;
  background: var(--fut-background-lightest);
  span{
    font-size: 15px;
    border-left: 3px solid var(--fut-primary);
    padding-left: 10px;
  }
}
.container{
  @include _md{
    padding: 0;
    margin-top: 20px;
  }
}
.section-title-bar{
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
    // padding: 3px;
    border-right: 1px solid var(--fut-background-black);
    border-bottom: 1px solid var(--fut-background-black);
    @include md{
      border-right: 1px solid var(--fut-background-lightest);
      border-bottom: 1px solid var(--fut-background-lightest);
    }
  }
  @include _md {
    th{
      border-right: 1px solid var(--fut-background-black);
      border-bottom: 1px solid var(--fut-background-black);
    }
  }
  // tr:last-child {
  //   th{
  //     padding: 2px 5px;
  //   }
  // }
  tr:nth-child(odd){
    background: var(--fut-background-darker);
    @include _md{
      background: var(--fut-background-darker) !important;
    }
  }
  tr:nth-child(even){
    background: var(--fut-background);
    @include _md{
      background: var(--fut-background-darker) !important;
    }
  }
  tr:first-child {
    th{
      padding: 3px;
      @include md{
        border-right: 1px solid var(--fut-background-lightest);
        border-bottom: 1px solid var(--fut-background-lightest);
      }
    }
  }
  tr:nth-child(2) {
    background: var(--fut-background-lightest);
    // th{
    //   padding: 2px 5px;
    // }
  }
  tr:last-child {
    background: var(--fut-background-lightest);
  }
}
</style>

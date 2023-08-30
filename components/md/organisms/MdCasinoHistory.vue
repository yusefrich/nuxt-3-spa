<template>
  <md-card
    overflow
    :padding="width < 426?'12px':'24px'"
  >
    <md-chip class="mb-4 pt-2">
      <font-awesome-icon :icon="['fas', 'list-ul']" />
      {{ $t('i18n_historico_de_cassino') }}
    </md-chip>

    <md-history-table
      :headers="tableHeaders"
      :items="$attrs['casino-history']"
      hide-title
      view-more
      @viewMore="$emit('concatBankCasinoTransactions', { page: historyPage++ })"
      @showModal="width < 700 ? openModal($event) : {}"
    >
      <template #created_at="{ item }">
        <span><small>{{ formattedDate(item.created_at).date }}<br>{{ formattedDate(item.created_at).hour }}</small></span>
      </template>
      <template #type_game="{ item }">
        <span :class="{ 'mobile-text': width < 340 }"><small>{{ item.type_game }}</small></span>
      </template>
      <template #modal_icon>
        <font-awesome-icon :icon="['fas', 'chevron-right']" />
      </template>
    </md-history-table>

    <md-modal-casino-history
      v-model="modal"
      :item="modalItem"
    />
  </md-card>
</template>

<script>
import MdCard from '@/components/md/atoms/MdCard.vue'
import MdChip from '@/components/md/atoms/MdChip.vue'
import MdHistoryTable from '@/components/md/molecules/MdHistoryTable.vue'
import MdModalCasinoHistory from '@/components/md/molecules/MdModalCasinoHistory.vue'
import windowWidth from '~/mixins.js/windowWidth'

export default {
  name: 'MdCasinoHistory',
  components: {
    MdCard,
    MdChip,
    MdHistoryTable,
    MdModalCasinoHistory
  },
  mixins: [windowWidth],
  data () {
    return {
      modal: false,
      modalItem: null,
      historyPage: 2
    }
  },
  computed: {
    tableHeaders () {
      if (this.width < 700) {
        return [
          { label: this.$t('i18n_data_hora'), field: 'created_at', align: 'text-start' },
          { label: this.$t('i18n_tipo_de_transação'), field: 'type_game', align: 'text-start' },
          { label: `${this.$t('i18n_saldo')} (R$)`, field: 'balance', align: 'text-end' },
          { label: '', field: 'modal_icon', align: 'text-end' }
        ]
      }

      return [
        { label: this.$t('i18n_data_hora'), field: 'created_at', align: 'text-start' },
        { label: this.$t('i18n_tipo_de_transação'), field: 'type_game', align: 'text-start' },
        { label: `${this.$t('i18n_credito')} (R$)`, field: 'credit', align: 'text-end' },
        { label: `${this.$t('i18n_debito')} (R$)`, field: 'debit', align: 'text-end' },
        { label: `${this.$t('i18n_saldo')} (R$)`, field: 'balance', align: 'text-end' },
        { label: `${this.$t('i18n_saldo_de_bonus')} (R$)`, field: 'balance_bonus', align: 'text-end' }
      ]
    }
  },
  created () {
    this.$emit('fetchBankCasinoTransactions')
  },
  methods: {
    formattedDate (date) {
      const [fDate, fHour] = new Date(date).toLocaleString().split(', ')
      return { date: fDate, hour: fHour }
    },
    openModal (item) {
      this.modalItem = item
      this.modalItem.created_at = `${this.formattedDate(item.created_at).date} ${this.formattedDate(item.created_at).hour}`
      this.modal = true
    }
  }
}
</script>

<style lang="scss" scoped>
h1 {
  color: var(--md-font-color);
}
.mobile-text {
  display: block;
  width: 90px;
}
</style>

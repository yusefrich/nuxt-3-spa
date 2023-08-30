<template>
  <md-card
    :padding="width < 426?'12px':'24px'"
    overflow
  >
    <md-chip class="pt-2">
      <font-awesome-icon :icon="['fa-solid', 'piggy-bank']" />
      {{ $tc('i18n_deposito', 1) }}
    </md-chip>

    <p class="desc">
      {{ $t('i18n_utilize_a_transferencia') }}
    </p>

    <p class="sub-title">
      {{ $t('i18n_opcoes_de_deposito').toUpperCase() }}:
    </p>

    <md-payment-field
      :img="img"
      :transaction-limit-min="$attrs['current-settings'].dp_limit_min"
      @openModal="modal = true"
    />

    <md-history-table
      class="mt-4"
      :headers="tableHeaders"
      :items="$attrs['deposit-history']"
    >
      <template #action="{ item }">
        <div
          class="action"
          :class="item.action ? 'action-true': 'action-false'"
          @click="openModalPix(item)"
        >
          <font-awesome-icon class="text-white icon" :icon="['fas', 'qrcode']" />
        </div>
      </template>
    </md-history-table>

    <md-modal-deposit
      v-model="modal"
      :loading="$attrs['loading']"
      :deposit-response="$attrs['deposit-response']"
      :deposit-errors="$attrs['deposit-errors']"
      :transaction-limit="$attrs['current-settings'].dp_limit_min"
      @submitDeposit="$emit('submitDeposit', $event)"
      @resetModal="$emit('resetModal')"
    />

    <md-modal-pix
      v-model="modalPix"
      :item="pixInfos"
    />
  </md-card>
</template>

<script>
import MdCard from '@/components/md/atoms/MdCard.vue'
import MdChip from '@/components/md/atoms/MdChip.vue'
import MdPaymentField from '@/components/md/molecules/MdPaymentField.vue'
import MdModalDeposit from '@/components/md/molecules/MdModalDeposit.vue'
import MdHistoryTable from '@/components/md/molecules/MdHistoryTable.vue'
import MdModalPix from '@/components/md/molecules/MdModalPix.vue'
import windowWidth from '~/mixins.js/windowWidth'

export default {
  name: 'MdDeposits',
  components: {
    MdCard,
    MdChip,
    MdPaymentField,
    MdModalDeposit,
    MdHistoryTable,
    MdModalPix
  },
  mixins: [windowWidth],
  data () {
    return {
      modal: false,
      modalPix: false,
      pixInfos: null
    }
  },
  computed: {
    img () {
      return {
        url: '/md/pix.png',
        title: 'PIX',
        desc: this.$t('i18n_deposito_rapido_e_seguro')
      }
    },
    tableHeaders () {
      return [
        { label: this.$t('i18n_valor'), field: 'value', align: 'text-start' },
        { label: this.$t('i18n_data'), field: 'date', align: 'text-start' },
        { label: this.$t('i18n_tipo'), field: 'type', align: 'text-start' },
        { label: 'status', field: 'status', align: 'text-center' },
        { label: this.$t('i18n_acao'), field: 'action', align: 'text-center' }
      ]
    }
  },
  watch: {
    modal (value) {
      if (!value) {
        this.$emit('resetModal')
      }
    }
  },
  created () {
    this.$emit('fetchBankDeposits')
  },
  methods: {
    openModalPix (item) {
      if (item.action) {
        this.pixInfos = item.pixInfos
        this.modalPix = true
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.desc {
  color: var(--md-font-color);
  margin: 17px 0;
}
.sub-title {
  color: var(--md-font-color);
  font-weight: bold;
}
.action {
  display: inline-block;
  margin: 4px 0;
  padding: 4px 8px;
  border-radius: 5px;
}
.action-true {
  cursor: pointer;
  background: green;
  &:hover {
    background: rgb(1, 170, 1);
  }
  &:active {
    background: rgb(0, 88, 0);
  }
}
.action-false {
  background: var(--md-menu-idx-font-color);
}
</style>

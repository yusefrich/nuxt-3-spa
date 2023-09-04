<template>
  <md-card
    :padding="width < 426?'12px':'24px'"
    overflow
  >
    <md-chip class="pt-2">
      <font-awesome-icon :icon="['fas', 'dollar-sign']" />
      {{ $t('i18n_saque', 1).toUpperCase() }}
    </md-chip>

    <p class="desc">
      {{ $t('i18n_as_opcoes_para_retirar') }}
    </p>

    <p class="sub-title">
      {{ $t('i18n_opcoes_de_saque').toUpperCase() }}:
    </p>

    <md-payment-field
      :img="img"
      :transaction-limit-min="$attrs['current-settings'].wd_limit_min"
      :transaction-limit-max="$attrs['current-settings'].wd_limit_max"
      @openModal="modal = true"
    />

    <md-history-table
      class="mt-4"
      :headers="tableHeaders"
      :items="$attrs['withdraw-history']"
    />

    <md-modal-withdraw
      v-model="modal"
      :transaction-limit-min="$attrs['current-settings'].wd_limit_min"
      :transaction-limit-max="$attrs['current-settings'].wd_limit_max"
      :pix-types="$attrs['current-settings'].pix_types"
      :pix-keys="pixKeys"
      :loading="$attrs['loading']"
      :can-withdraw="$attrs['logged-in-user'].player.can_withdraw"
      :withdraw-response="$attrs['withdraw-response']"
      @submitWithdraw="$emit('submitWithdraw', $event)"
    />
  </md-card>
</template>

<script>
import MdCard from '@/components/md/atoms/MdCard.vue'
import MdChip from '@/components/md/atoms/MdChip.vue'
import MdPaymentField from '@/components/md/molecules/MdPaymentField.vue'
import MdModalWithdraw from '@/components/md/molecules/MdModalWithdraw.vue'
import MdHistoryTable from '@/components/md/molecules/MdHistoryTable.vue'
import windowWidth from '~/mixins.js/windowWidth'

export default {
  name: 'MdWithdraw',
  components: {
    MdCard,
    MdChip,
    MdPaymentField,
    MdModalWithdraw,
    MdHistoryTable
  },
  mixins: [windowWidth],
  data () {
    return {
      modal: false
    }
  },
  computed: {
    img () {
      return {
        url: '/md/pix.png',
        title: 'PIX',
        desc: this.$t('i18n_saque_rapido_e_seguro')
      }
    },
    pixKeys () {
      return {
        CPF: this.$attrs['logged-in-user'].player.document,
        EMAIL: this.$attrs['logged-in-user'].email,
        PHONE: this.$attrs['logged-in-user'].phone
      }
    },
    tableHeaders () {
      return [
        { label: this.$t('i18n_data'), field: 'date', align: 'text-start' },
        { label: this.$t('i18n_tipo'), field: 'type', align: 'text-start' },
        { label: this.$t('i18n_valor'), field: 'value', align: 'text-center' },
        { label: 'status', field: 'status', align: 'text-center' }
      ]
    }
  },
  created () {
    this.$emit('fetchBankWithdraws')
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
</style>

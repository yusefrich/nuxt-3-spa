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
      v-if="(validWithdrawTime && midnightBlock === 1) || midnightBlock === 0"
      :img="img"
      :transaction-limit-min="$attrs['current-settings'].wd_limit_min"
      :transaction-limit-max="$attrs['current-settings'].wd_limit_max"
      @openModal="modal = true"
    />
    <div v-else class="text-center">
      <font-awesome-icon class="icon text-warning fut-color-dynamic me-1 py-3" style="font-size: 40px" :icon="['fas', 'info-circle']" />
      <h5 class="sub-title">
        <small>{{ $t('i18n_saque_indisponivel_durante') }}</small>
      </h5>
    </div>

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
import MdCard from '@/components/md/atoms/MdCard'
import MdChip from '@/components/md/atoms/MdChip'
import MdPaymentField from '@/components/md/molecules/MdPaymentField'
import MdModalWithdraw from '@/components/md/molecules/MdModalWithdraw'
import MdHistoryTable from '@/components/md/molecules/MdHistoryTable'
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
  props: {
    midnightBlock: {
      type: Number,
      default: 0
    }
  },
  emits: [
    'submitWithdraw',
    'fetchBankWithdraws'
  ],
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
    },
    validWithdrawTime () {
      return new Date().getHours() > 7 && new Date().getHours() <= 23
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

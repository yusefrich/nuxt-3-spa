<template>
  <div class="payment-field">
    <div class="payment-img">
      <img class="mx-3" :src="img.url">
      <div>
        <h6 class="fw-bold">
          {{ img.title }}
        </h6>
        <p>{{ img.desc }}</p>
      </div>
    </div>
    <div class="payment-action">
      <div>
        <h6 class="fw-bold">
          {{ $t('i18n_limite_de_transacao').toUpperCase() }}
        </h6>
        <p>
          Min. BRL: {{ transactionLimitMin }} <span v-if="transactionLimitMax">/ Max. BRL: {{ transactionLimitMax }}</span>
        </p>
      </div>
      <md-button
        padding="10px"
        @click="$emit('openModal')"
      >
        {{ transactionLimitMax ? $t('i18n_saque', 1) : $t('i18n_deposito', 1) }}
      </md-button>
    </div>
  </div>
</template>

<script>
import MdButton from '@/components/md/atoms/MdButton'

export default {
  name: 'MdPaymentField',
  components: {
    MdButton
  },
  props: {
    img: {
      type: Object,
      default: () => ({})
    },
    transactionLimitMin: {
      type: [String, Number],
      default: ''
    },
    transactionLimitMax: {
      type: String,
      default: ''
    }
  },
  emits: [
    'openModal'
  ]
}
</script>

<style lang="scss" scoped>
.payment-field {
  color: var(--md-font-color);
  display: flex;
  background: var(--md-payment-bg-color);
  border: 3px solid var(--md-comp-border-color);
  border-radius: 5px;
  padding: 10px;
  p {
    color: var(--md-menu-idx-font-color);
  }
  h6, p {
    margin: 0;
  }
  .payment-img {
    width: 50%;
    display: flex;
    align-items: center;
  }
  .payment-action {
    width: 50%;
    padding: 0 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}

@media (max-width: 490px) {
  .payment-field {
    flex-direction: column;
  }
  .payment-img, .payment-action {
    width: 100% !important;
  }
  .payment-action {
    margin-top: 10px;
    padding: 0 !important;
  }
}
</style>

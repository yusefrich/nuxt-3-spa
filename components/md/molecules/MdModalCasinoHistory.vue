<template>
  <md-modal
    v-model="modal"
    width="95%"
    min-height="auto"
    close
  >
    <div v-if="modal" class="mobile-casino-history">
      <div>
        <span class="title">
          {{ $t('i18n_data_hora') }}
        </span>
        <p>{{ item.created_at }}</p>
      </div>
      <div>
        <span class="title">
          {{ $t('i18n_tipo_de_transação') }}
        </span>
        <p>{{ item.type_game }}</p>
      </div>
      <div class="d-flex">
        <div class="w-50">
          <span class="title">
            {{ $t('i18n_credito') }}
          </span>
          <p>{{ item.credit }}</p>
        </div>
        <div class="w-50">
          <span class="title">
            {{ $t('i18n_debito') }}
          </span>
          <p>{{ item.debit }}</p>
        </div>
      </div>
      <div class="d-flex">
        <div class="w-50">
          <span class="title">
            {{ $t('i18n_saldo') }}
          </span>
          <p>{{ item.balance }}</p>
        </div>
        <div class="w-50">
          <span class="title">
            {{ $t('i18n_saldo_de_bonus') }}
          </span>
          <p>{{ item.balance_bonus }}</p>
        </div>
      </div>
    </div>
  </md-modal>
</template>

<script>
import MdModal from '@/components/md/atoms/MdModal.vue'

export default {
  name: 'MdModalCasinoHistory',
  components: {
    MdModal
  },
  props: {
    value: {
      type: Boolean,
      default: false
    },
    item: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    modal: {
      get () {
        return this.value
      },
      set (value) {
        this.$emit('input', value)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.mobile-casino-history {
  color: var(--md-font-color);
  padding: 24px;
  div {
    .title {
      font-size: 15px;
      font-weight: bold;
      color: var(--md-menu-idx-font-color);
      border-bottom: 2px solid var(--md-comp-border-color);
    }
  }
}
</style>

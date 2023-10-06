<template>
  <sk-modal
    v-model="open"
    min-height="auto"
    close
  >
    <div id="modal-wallet">
      <div class="wallet-head">
        <font-awesome-icon class="icon me-1" :icon="['fas', 'wallet']" />
        <span>{{ $t('i18n_carteira') }}</span>
      </div>
      <div class="wallet-body">
        <div class="d-flex mb-3">
          <sk-components-select
            :components-list="componentsList"
            :selected-component="currentComponent"
            @changeComponent="changeComponent($event)"
          />
        </div>

        <div
          v-if="currentComponent === 'SkDeposit'"
          class="deposit-wrapper"
        >
          <sk-deposit
            :transaction-limit="currentSettings.dp_limit_min"
            :deposit-response="depositResponse"
            :deposit-errors="bankErrors"
            :loading="loading"
            @submitDeposit="$emit('submitDeposit', $event)"
            @resetModal="$emit('resetModal')"
          />
        </div>

        <div
          v-else-if="currentComponent === 'SkWithdraw'"
          class="deposit-wrapper"
        >
          <sk-withdraw
            :transaction-limit-min="currentSettings.wd_limit_min"
            :transaction-limit-max="currentSettings.wd_limit_max"
            :withdraw-response="withdrawResponse"
            :can-withdraw="loggedInUser.player.can_withdraw"
            :withdraw-errors="bankErrors"
            :loading="loading"
            :pix-keys="pixKeys"
            :user="loggedInUser"
            :midnight-block="midnightBlock"
            @submitWithdraw="$emit('submitWithdraw', $event)"
            @resetModal="$emit('resetModal')"
          />
        </div>
      </div>
    </div>
  </sk-modal>
</template>

<script>
import SkModal from '@/components/sk/atoms/SkModal'
import SkComponentsSelect from '@/components/sk/molecules/SkComponentsSelect'
import SkDeposit from '@/components/sk/molecules/SkDeposit'
import SkWithdraw from '@/components/sk/molecules/SkWithdraw'

export default {
  name: 'SkModalWallet',
  components: {
    SkModal,
    SkComponentsSelect,
    SkDeposit,
    SkWithdraw
  },
  props: {
    modelValue: {
      type: Boolean,
      default: false
    },
    depositResponse: {
      type: Object,
      default: () => ({})
    },
    withdrawResponse: {
      type: Object,
      default: () => ({})
    },
    bankErrors: {
      type: Object,
      default: () => ({})
    },
    loading: {
      type: Boolean,
      default: false
    },
    loggedInUser: {
      type: Object,
      default: () => ({})
    },
    currentSettings: {
      type: Object,
      default: () => ({})
    },
    midnightBlock: {
      type: Number,
      default: 0
    }
  },
  emits: [
    'update:modelValue',
    'cleanErrors',
    'submitDeposit',
    'resetModal',
    'submitWithdraw'
  ],
  data () {
    return {
      currentComponent: 'SkDeposit'
    }
  },
  computed: {
    open: {
      get () {
        return this.modelValue
      },
      set (value) {
        this.$emit('update:modelValue', value)
        this.$emit('cleanErrors')
      }
    },
    componentsList () {
      return {
        SkDeposit: {
          text: this.$t('i18n_deposito', 1)
        },
        SkWithdraw: {
          text: this.$t('i18n_saque', 1)
        }
      }
    },
    pixKeys () {
      return {
        CPF: this.loggedInUser.player.document,
        EMAIL: this.loggedInUser.email,
        PHONE: this.loggedInUser.phone
      }
    }
  },
  methods: {
    changeComponent (compName) {
      this.currentComponent = compName
    }
  }
}
</script>

<style lang="scss" scoped>
#modal-wallet {
  padding: 16px;

  .wallet-head {
    color: var(--fut-color-dynamic);
    font-weight: 600;
    font-size: 1rem;

    .icon {
      color: var(--fut-secondary);
    }
  }

  .wallet-body {
    margin-top: 16px;

    .deposit-wrapper {
      max-height: 80vh;
      overflow: auto;

      &::-webkit-scrollbar-track {
        background-color: transparent;
      }
      &::-webkit-scrollbar {
        width: 6px;
      }
      &::-webkit-scrollbar-thumb {
        border-radius: 3px;
        background: var(--fut-background-lightest-2);
      }
    }
  }
}
</style>

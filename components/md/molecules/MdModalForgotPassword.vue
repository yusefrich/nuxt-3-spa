<template>
  <md-modal
    v-model="modal"
    height="auto"
    close
  >
    <div class="modal-forgot">
      <h4>{{ $t('i18n_resetar_senha') }}</h4>

      <label for="email">
        {{ $t('i18n_informe_o_email_para_qual') }}
      </label>
      <input
        id="email"
        v-model="email"
        type="email"
        class="form-control"
      >
      <!-- <code>
        aaa
        {{ errors }}
      </code> -->
      <error-badge :key="errorKey" name="email" :validate="errors && errors.email && errors.email[0]?errors:{}" />

      <md-button
        class="mt-4"
        padding="8px"
        :disabled="loading"
        @click="submit()"
      >
        {{ $t('i18n_continuar') }}
      </md-button>
    </div>
  </md-modal>
</template>

<script>
import MdModal from '@/components/md/atoms/MdModal'
import MdButton from '@/components/md/atoms/MdButton'
import ErrorBadge from '@/components/default/atoms/ErrorBadge'

export default {
  name: 'MdModalForgotPassword',
  components: {
    MdModal,
    MdButton,
    ErrorBadge
  },
  props: {
    modelValue: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    item: {
      type: Object,
      default: () => ({})
    },
    errors: {
      type: Object,
      default: () => ({})
    }
  },
  emits: [
    'clearErros',
    'sendForgottenPasswordEmail',
    'update:modelValue'
  ],
  data () {
    return {
      email: '',
      errorKey: 1
    }
  },
  computed: {
    cErrors () {
      return this.errors
    },
    modal: {
      get () {
        return this.modelValue
      },
      set (value) {
        this.$emit('clearErros')
        this.$emit('update:modelValue', value)
      }
    }
  },
  watch: {
    cErrors () {
      console.log('watch cerrors being called')
      this.errorKey = this.errorKey + 1
    }
  },
  created () {
    this.$emit('clearErros')
  },
  methods: {
    submit () {
      if (!this.email) {
        this.$toast.open({ message: 'Insira um email válido!', type: 'error' })
        return
      }

      this.$emit('sendForgottenPasswordEmail', { email: this.email })
    }
  }
}
</script>

<style lang="scss" scoped>
.modal-forgot {
  padding: 24px;
  color: var(--md-font-color);

  .form-control {
    border: 1px solid var(--md-comp-border-color);
    background: var(--md-comp-bg-color);
    color: var(--md-font-color);
    box-shadow: 0 0 0 0;
  }
}
</style>

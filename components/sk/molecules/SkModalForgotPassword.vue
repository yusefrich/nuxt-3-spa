<template>
  <sk-modal
    v-model="open"
    min-height="auto"
    close
  >
    <form id="forgot-form">
      <h1>
        <font-awesome-icon class="icon" :icon="['fas', 'cog']" />
        {{ $t('i18n_esqueci_a_senha') }}
      </h1>

      <sk-input
        v-model="email"
        name="email"
        label="E-mail"
        required
      />
      <error-badge
        name="email"
        :validate="errors?errors:{}"
        class="error-badge"
      />

      <button
        class="forgot-btn"
        @click.prevent="submit()"
      >
        <span>{{ $t('i18n_enviar') }}</span>
      </button>
    </form>
  </sk-modal>
</template>

<script>
import SkModal from '@/components/sk/atoms/SkModal.vue'
import SkInput from '@/components/sk/atoms/SkInput.vue'
import ErrorBadge from '@/components/default/atoms/ErrorBadge.vue'

export default {
  name: 'SkModalForgotPassword',
  components: {
    SkModal,
    SkInput,
    ErrorBadge
  },
  props: {
    value: {
      type: Boolean,
      default: false
    },
    errors: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      email: ''
    }
  },
  computed: {
    open: {
      get () {
        return this.value
      },
      set (value) {
        this.$emit('input', value)
        this.email = ''
      }
    }
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
#forgot-form {
  padding: 20px 24px;

  h1 {
    line-height: 1.5;
    font-size: 1.125rem;
    font-weight: 600;
    margin-bottom: 15px;
    margin-bottom: 35px;

    .icon {
      color: var(--fut-secondary);
      width: 16px;
      height: 16px;
    }
  }

  .forgot-btn {
    border: none;
    color: var(--fut-color-dynamic);
    font-size: 15px;
    font-weight: 600;
    background: var(--fut-primary);
    border-radius: .25rem;
    width: 100%;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .2), 0 1px 2px 0 rgba(0, 0, 0, .12);
    margin: 16px 0;
    padding: 17px 0;

    &:hover {
      background: var(--fut-primary-darkest);
    }
    &:active {
      span {
        display: flex;
        justify-content: center;
        transform: scale(.95);
      }
    }
  }
}
</style>

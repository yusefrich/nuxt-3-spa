<template>
  <sk-modal
    v-model="open"
    min-height="auto"
    close
  >
    <form
      id="login-form"
      @keyup.enter.once="$emit('login', login)"
    >
      <h1>{{ $t('i18n_entrar') }}</h1>

      <sk-input
        v-model="login.email"
        name="login-email"
        type="text"
        :label="$t('i18n_email_ou_nome')"
        required
      />
      <sk-input
        v-model="login.password"
        name="login-password"
        type="password"
        :label="$t('i18n_senha')"
        required
        class="mt-3"
      />

      <button
        class="login-btn"
        @click.prevent="$emit('login', login)"
      >
        <span>{{ $t('i18n_entrar') }}</span>
      </button>

      <button
        class="forgot-password"
        @click.prevent="$emit('forgotPassword')"
      >
        {{ $t('i18n_esqueci_a_senha') }}
      </button>

      <div class="bottom-text">
        <span>{{ $t('i18n_nao_possui_uma_conta') }}</span>
        <button
          class="register"
          @click.prevent="$emit('register')"
        >
          {{ $t('i18n_registre_uma_conta') }}
        </button>
      </div>
    </form>
  </sk-modal>
</template>

<script>
import SkModal from '@/components/sk/atoms/SkModal.vue'
import SkInput from '@/components/sk/atoms/SkInput.vue'

export default {
  name: 'SkModalLogin',
  components: {
    SkModal,
    SkInput
  },
  props: {
    modelValue: {
      type: Boolean,
      default: false
    }
  },
  emits: [
    'update:modelValue',
    'register',
    'login',
    'forgotPassword'
  ],
  data () {
    return {
      login: {
        email: '',
        password: ''
      }
    }
  },
  computed: {
    open: {
      get () {
        if (this.modelValue) {
          this.cleanFields()
        }

        return this.modelValue
      },
      set (value) {
        this.$emit('update:modelValue', value)
      }
    }
  },
  methods: {
    cleanFields () {
      this.login = {
        email: '',
        password: ''
      }
    }
  }
}
</script>

<style lang="scss" scoped>
#login-form {
  padding: 20px 24px;

  h1 {
    line-height: 1.5;
    font-size: 1.125rem;
    font-weight: 600;
    text-align: center;
    margin-bottom: 15px;
  }

  .login-btn {
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

  .forgot-password {
    width: 100%;
  }
  .forgot-password, .register {
    border: none;
    background: transparent;
    color: var(--fut-color-dynamic);
    font-weight: 600;
    font-size: 15px;
    padding: 0;
  }
  .bottom-text {
    width: 100%;
    text-align: center;
    margin-top: 16px;

    span {
      font-weight: 400;
      font-size: .875rem;
      color: var(--fut-secondary);
    }
  }
}
</style>

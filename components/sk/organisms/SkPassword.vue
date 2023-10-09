<template>
  <div class="sk-password">
    <sk-card>
      <div class="info">
        <h2>
          {{ $t('i18n_senha') }}
        </h2>

        <div class="form">
          <div style="grid-area: oldPass;">
            <sk-input
              v-model="userPassword.old_password"
              name="old_password"
              type="password"
              :label="$t('i18n_senha_atual')"
            />
            <error-badge
              name="old_password"
              :validate="errors?errors:{}"
            />
          </div>
          <div style="grid-area: newPass;">
            <sk-input
              v-model="userPassword.password"
              name="password"
              type="password"
              :label="$t('i18n_nova_senha')"
            />
            <error-badge
              name="password"
              :validate="errors?errors:{}"
            />
          </div>
          <div style="grid-area: confirmPass;">
            <sk-input
              v-model="userPassword.password_confirmation"
              name="password_confirmation"
              type="password"
              :label="$t('i18n_repita_nova_senha')"
            />
            <error-badge
              name="password_confirmation"
              :validate="errors?errors:{}"
            />
          </div>
        </div>
      </div>

      <div class="submit-area">
        <button
          @click="$emit('submit', userPassword)"
        >
          <span>{{ $t('i18n_salvar') }}</span>
        </button>
      </div>
    </sk-card>
  </div>
</template>

<script>
import SkCard from '@/components/sk/atoms/SkCard.vue'
import ErrorBadge from '@/components/default/atoms/ErrorBadge.vue'

export default {
  name: 'SkPassword',
  components: {
    SkCard,
    ErrorBadge
  },
  props: {
    errors: {
      type: Object,
      default: () => ({})
    }
  },
  emits: [
    'submit',
    'cleanErrors'
  ],
  data () {
    return {
      userPassword: {
        old_password: '',
        password: '',
        password_confirmation: ''
      }
    }
  },
  created () {
    this.$emit('cleanErrors')
  },
  methods: {
    checkIfPasswordHas (data, string) {
      let checkPassword = false
      switch (data) {
        case 'numbers': {
          checkPassword = /[0-9]/.test(string)
          break
        }
        case 'uppercase': {
          checkPassword = /[A-Z]/.test(string)
          break
        }
        case 'lowercase': {
          checkPassword = /[a-z]/.test(string)
          break
        }
        case 'simbol': {
          checkPassword = /[!@#$%^&*()_+\-=[\]{};':\\|,.<>/?]/.test(string)
          break
        }
        case 'length': {
          checkPassword = string.length >= 8
          break
        }
        default:
          break
      }
      return checkPassword
    },
    cleanPassword () {
      this.userPassword = {
        old_password: '',
        password: '',
        password_confirmation: ''
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.sk-password {
  padding: 1.5rem;
  background: var(--fut-background-darkest);
  border-radius: .5rem;
  color: var(--fut-color-dynamic);

  .info {
    padding: 1.5rem;
    color: var(--fut-color-dynamic);

    h2 {
      font-size: 1.25rem;
      font-weight: 600;
      margin: 0;
      padding-bottom: 1.25rem;
      border-bottom: 1px solid var(--fut-background-lightest-2);
    }

    .form {
      display: grid;
      grid:
        "oldPass ."
        "newPass confirmPass"
      ;
      margin-top: 1rem;
      gap: 1rem;
    }
  }

  .submit-area {
    border-top: 1px solid var(--fut-background-lightest-2);
    padding: 1rem;
    display: flex;
    justify-content: flex-end;

    button {
      display: flex;
      justify-content: center;
      border: none;
      background: var(--fut-primary);
      padding: 11.5px 20px;
      border-radius: .25rem;
      min-width: 12ch;
      box-shadow: 0rem .0625rem .1875rem #00000033 , 0rem .0625rem .125rem #0000001f;
      color: var(--fut-color-dynamic);

      span {
        color: var(--fut-color-dynamic);
        font-size: .875rem;
        font-weight: 600;
      }

      &:hover {
        background: var(--fut-primary-darkest);
      }
      &:active {
        span {
          display: flex;
          transform: scale(.95);
        }
      }
    }
  }
}

@media (max-width: 821px) {
  .sk-password {
    padding: .5rem;

    .info {
      padding: .5rem;
    }
  }
}
</style>

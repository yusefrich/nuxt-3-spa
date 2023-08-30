<template>
  <div class="update-password">
    <md-card
      :width="width > 425 ? '500px': '100%'"
      height="430px"
    >
      <form class="d-flex flex-column" @submit.prevent>
        <h3 class="mb-4">
          {{ $t('i18n_alterar_senha') }}
        </h3>

        <error-badge name="email" :validate="getOnboardingAuthErrors?getOnboardingAuthErrors:{}" />
        <error-badge name="token" :validate="getOnboardingAuthErrors?getOnboardingAuthErrors:{}" />

        <label for="newPass">
          {{ $t('i18n_nova_senha') }}
        </label>
        <input id="newPass" v-model="data.password" type="password" class="form-control">
        <div class="password-checklist ms-2 mb-2">
          <p class="mb-0">
            <small>{{ $t('i18n_sua_senha_precisa_conter') }}:</small>
          </p>
          <p :class="['mb-0', `${(checkIfPasswordHas('uppercase', data.password) || checkIfPasswordHas('lowercase', data.password)) && checkIfPasswordHas('numbers', data.password) ? 'text-success' : 'text-danger'}`]">
            <small><font-awesome-icon :icon="['far', 'check-circle']" /> {{ $t('i18n_letras_e_numeros') }}.</small>
          </p>
          <p :class="['mb-0', `${checkIfPasswordHas('length', data.password) ? 'text-success' : 'text-danger'}`]">
            <small><font-awesome-icon :icon="['far', 'check-circle']" /> 8 {{ $t('i18n_digitos') }}.</small>
          </p>
        </div>

        <label for="confirmNewPass">
          {{ $t('i18n_confirmar_a_nova_senha') }}
        </label>
        <input id="confirmNewPass" v-model="data.password_confirmation" type="password" class="form-control">
        <error-badge name="password" :validate="getOnboardingAuthErrors?getOnboardingAuthErrors:{}" />
        <error-badge name="password_confirmation" :validate="getOnboardingAuthErrors?getOnboardingAuthErrors:{}" />

        <md-button
          class="mt-4"
          padding="8px"
          :disabled="getOnboardingAuthLoading || disabledSubmit"
          @click="submitForgottenRequest()"
        >
          {{ $t('i18n_alterar_senha') }}
        </md-button>
      </form>
    </md-card>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import windowWidth from '@/mixins.js/windowWidth'
import ErrorBadge from '@/components/default/atoms/ErrorBadge.vue'

export default {
  name: 'MdUpdatePassword',
  components: {
    ErrorBadge
  },
  mixins: [windowWidth],
  data () {
    return {
      data: {
        email: null,
        token: null,
        password: '',
        password_confirmation: ''
      }
    }
  },
  computed: {
    ...mapGetters({
      getOnboardingAuthLoading: 'onboarding-auth/getOnboardingAuthLoading',
      getOnboardingAuthErrors: 'onboarding-auth/getOnboardingAuthErrors'
    }),
    disabledSubmit () {
      if (
        (/[A-Z]/.test(this.data.password) || /[a-z]/.test(this.data.password)) &&
        /[0-9]/.test(this.data.password) &&
        this.data.password.length >= 8 &&
        this.data.password_confirmation.length >= 8
      ) {
        return false
      }

      return true
    }
  },
  created () {
    this.$store.commit('onboarding-auth/SET_ERRORS', null)
    this.data.token = this.$route.params.token
    this.data.email = this.$route.params.email
  },
  methods: {
    ...mapActions({
      sendForgottenPasswordUpdate: 'onboarding-auth/sendForgottenPasswordUpdate'
    }),
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
    submitForgottenRequest () {
      this.sendForgottenPasswordUpdate(this.data).then(() => {
        this.$toast.open({ message: this.$t('i18n_mensagem_enviada_com_sucesso'), type: 'success' })
        this.$router.push(this.localePath('/'))
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.update-password {
  color: var(--md-font-color);
  height: calc(100vh - 60px);
  padding-top: 60px;
  display: flex;
  justify-content: center;

  .form-control {
    border: 1px solid var(--md-comp-border-color);
    background: var(--md-comp-bg-color);
    color: var(--md-font-color);
    box-shadow: 0 0 0 0;
  }
}
.password-checklist {
  color: var(--md-font-color);
  font-size: 15px;
}

</style>

<template>
  <div class="row">
    <div class="col-12">
      <div class="register-container">
        <p class="text-white fut-color-dynamic text-center font-weight-bold">
          <span class="required" />{{ $t('i18n_senha_atual') }}:
        </p>
        <fut-input
          v-model="data.old_password"
          type="password"
          :validate="getErrors?getErrors:{}"
          name="old_password"
          class="mx-0 mt-2"
        />
        <br>
        <p class="text-white fut-color-dynamic text-center font-weight-bold">
          <span class="required" />{{ $t('i18n_nova_senha') }}:
        </p>
        <fut-input
          id="password"
          v-model="data.password"
          type="password"
          :validate="getErrors?getErrors:{}"
          name="password"
          class="mx-0 mt-2"
        />
        <div class="password-checklist text-white fut-color-dynamic">
          <p class="mb-0">
            <small>{{ $t('i18n_sua_senha_precisa_conter') }}:</small>
          </p>
          <p
            :class="[
              'mb-0',
              `${(checkIfPasswordHas('uppercase', data.password) || checkIfPasswordHas('lowercase', data.password)) && checkIfPasswordHas('numbers', data.password) ? 'text-success' : 'text-danger'}`
            ]"
          >
            <small><font-awesome-icon :icon="['far', 'check-circle']" /> {{ $t('i18n_letras_e_numeros') }}.</small>
          </p>
          <p :class="['mb-0', `${checkIfPasswordHas('length', data.password) ? 'text-success' : 'text-danger'}`]">
            <small><font-awesome-icon :icon="['far', 'check-circle']" /> 8 {{ $t('i18n_digitos') }}.</small>
          </p>
        </div>
        <br>
        <p class="text-white fut-color-dynamic text-center font-weight-bold">
          <span class="required" />{{ $t('i18n_confirmar_a_nova_senha') }}:
        </p>
        <fut-input
          id="password_confirmation"
          v-model="data.password_confirmation"
          type="password"
          :validate="
            getErrors
              ? getErrors
              : differentPassword
                ? {password_confirmation: ['As senhas devem ser iguais']}
                : {}
          "
          disable-scroll
          name="password_confirmation"
          class="mx-0 mt-2"
        />
        <br>
      </div>
    </div>
    <div class="col-12">
      <hr class="bg-white">
      <fut-button
        class="no-break mt-3 text-center mb-5"
        :block="true"
        :primary="true"
        :disabled="data.password !== data.password_confirmation"
        @click="$emit('updatePassword', data), cleanPassword()"
      >
        <strong class="text-uppercase font-weight-bold">{{ $t('i18n_atualizar') }}</strong>
      </fut-button>
    </div>
  </div>
</template>

<script>
import FutInput from '@/components/default/atoms/FutInput'
import FutButton from '@/components/default/atoms/FutButton'

export default {
  name: 'FutNewPassword',
  components: {
    FutInput,
    FutButton
  },
  props: {
    getErrors: {
      type: Object,
      default: () => ({})
    }
  },
  emits: [
    'updatePassword',
    'clear'
  ],
  data () {
    return {
      data: {
        old_password: '',
        password: '',
        password_confirmation: ''
      },
      differentPassword: false,
      timeout: null
    }
  },
  watch: {
    'data.password_confirmation' (value) {
      if (this.timeout) {
        this.differentPassword = false
        clearTimeout(this.timeout)
      }

      this.timeout = setTimeout(() => {
        if (value !== this.data.password) {
          this.differentPassword = true
        }
      }, 1300)
    }
  },
  mounted () {
    this.$emit('clear')
  },
  beforeDestroy () {
    clearTimeout(this.timeout)
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
      this.data = {
        old_password: '',
        password: '',
        password_confirmation: ''
      }
    }
  }
}
</script>

<style scoped lang="scss">
  .no-break{
    white-space: nowrap;
  }
  .required{
    width: 8px !important;
    position: absolute;
    height: 8px !important;
    border-radius: 8px;
    margin-right: 30px;
    left: -17px;
    top: 8px;
  }
  label{
    position: relative;
  }
</style>

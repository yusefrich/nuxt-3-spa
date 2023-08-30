<template>
  <sk-modal
    v-model="open"
    min-height="auto"
    max-height="90vh"
    close
    overflow
  >
    <form id="register-form" class="register-form" @submit.prevent="submit()">
      <h1>
        {{ $t('i18n_criar_uma_conta') }}
      </h1>

      <p>
        {{ $t('i18n_preencha_seus_dados') }}
      </p>

      <div>
        <div class="document-wrapper">
          <sk-input
            v-model="documentRaw"
            v-inputmask="'999.999.999-99'"
            :name="currentSettings.search ? 'cpf' : 'document'"
            label="CPF"
            required
            class="pb-4 w-100"
          />
          <button
            v-if="currentSettings && currentSettings.search"
            class="validate-cpf-btn"
            :class="{ disabled: loading }"
            :disabled="loading"
            @click.prevent="validateCpf()"
          >
            <font-awesome-icon v-if="loading" class="icon spinner-class" :icon="['fas', 'circle-notch']" />
            <span v-else>{{ $t('i18n_continuar').toUpperCase() }}</span>
          </button>
        </div>
        <error-badge
          :name="currentSettings.search ? 'cpf' : 'document'"
          :validate="errors?errors:{}"
          class="error-badge"
        />
        <dir v-if="currentSettings && !currentSettings.register_reduced" class="p-0">
          <sk-input
            v-model="register.name"
            :label="`${$t('i18n_primeiro')} ${$t('i18n_nome')}`"
            name="name"
            required
            class="pb-4"
          />
          <error-badge
            name="name"
            :validate="errors?errors:{}"
            class="error-badge"
          />
        </dir>
        <dir v-if="currentSettings && !currentSettings.register_reduced" class="p-0">
          <sk-input
            v-model="register.last_name"
            name="last_name"
            :label="$t('i18n_sobrenome')"
            required
            class="pb-4"
          />
          <error-badge
            name="last_name"
            :validate="errors?errors:{}"
            class="error-badge"
          />
        </dir>
        <dir v-if="currentSettings && !currentSettings.register_reduced" class="p-0 birthdate-wrapper">
          <label for="birthDate" class="form-label">
            {{ $t('i18n_data_de_nascimento') }}
          </label>
          <div
            id="birthdate"
            ref="birthdate"
            class="selects pb-4"
          >
            <select
              id="selectDay"
              v-model="date.day"
              class="form-control"
            >
              <option :value="''">
                {{ $t('i18n_dia') }}
              </option>
              <option
                v-for="(day, idx) in days"
                :key="idx"
                :value="day.value"
              >
                {{ day.label }}
              </option>
            </select>
            <select
              id="selectMonth"
              v-model="date.month"
              class="form-control mx-1"
            >
              <option :value="''">
                {{ $t('i18n_mes') }}
              </option>
              <option
                v-for="(month, idx) in months"
                :key="idx"
                :value="month.value"
              >
                {{ month.label }}
              </option>
            </select>
            <select
              id="selectYears"
              v-model="date.year"
              class="form-control"
            >
              <option :value="''">
                {{ $t('i18n_ano') }}
              </option>
              <option
                v-for="(year, idx) in years"
                :key="idx"
                :value="year.value"
              >
                {{ year.label }}
              </option>
            </select>
          </div>
          <error-badge
            name="birthdate"
            :validate="errors?errors:{}"
            class="error-badge"
          />
        </dir>
        <dir v-if="currentSettings && !currentSettings.register_reduced" class="p-0 country-wrapper">
          <label for="country" class="form-label">{{ $t('i18n_pais_de_residencia') }}</label>
          <div class="selects pb-4">
            <select
              id="country"
              v-model="register.country"
              class="form-control"
            >
              <option
                v-for="(country, idx) in countries"
                :key="idx"
                :value="country.value"
              >
                {{ country.label }}
              </option>
            </select>
          </div>
        </dir>
        <sk-input
          v-model="register.email"
          name="email"
          label="E-mail"
          type="email"
          required
          class="pb-4"
        />
        <error-badge
          name="email"
          :validate="errors?errors:{}"
          class="error-badge"
        />
        <sk-input
          v-model="register.phone"
          v-inputmask="'(99) 99999-9999'"
          name="phone"
          :label="$t('i18n_numero_de_telefone')"
          required
          class="pb-4"
        />
        <error-badge
          name="phone"
          :validate="errors?errors:{}"
          class="error-badge"
        />
        <div v-if="currentSettings && currentSettings.address_on_register" class="p-0">
          <sk-input
            v-model="zipRaw"
            v-inputmask="'99999-999'"
            name="zip"
            label="CEP"
            class="pb-4"
          />
          <error-badge
            name="zip"
            :validate="errors?errors:{}"
            class="error-badge"
          />
        </div>
        <div v-if="currentSettings && currentSettings.address_on_register" class="p-0">
          <sk-input
            v-model="register.street"
            name="street"
            :label="$t('i18n_rua')"
            class="pb-4"
          />
          <error-badge
            name="street"
            :validate="errors?errors:{}"
            class="error-badge"
          />
        </div>
        <div v-if="currentSettings && currentSettings.address_on_register" class="p-0">
          <sk-input
            v-model="register.neighborhood"
            name="neighborhood"
            :label="$t('i18n_bairro')"
            class="pb-4"
          />
        </div>
        <error-badge
          name="neighborhood"
          :validate="errors?errors:{}"
          class="error-badge"
        />
        <div v-if="currentSettings && currentSettings.address_on_register" class="p-0">
          <sk-input
            v-model="register.number"
            name="number"
            :label="$t('i18n_numero')"
            class="pb-4"
          />
        </div>
        <error-badge
          name="number"
          :validate="errors?errors:{}"
          class="error-badge"
        />
        <div v-if="currentSettings && !currentSettings.hide_username_on_register">
          <sk-input
            v-model="register.username"
            name="username"
            :label="$t('i18n_nome_de_usuario')"
            required
            class="pb-4"
          />
        </div>
        <error-badge
          name="username"
          :validate="errors?errors:{}"
          class="error-badge"
        />
        <sk-input
          v-model="register.password"
          name="password"
          :label="$t('i18n_senha')"
          :disabled="currentSettings.search && !validCpf"
          type="password"
          required
          :class="{ 'pb-4': !passwordFocussed && !register.password.length }"
          @focus="passwordFocussed = true"
          @blur="passwordFocussed = false"
        />
        <div
          v-if="true"
          class="password-checklist ms-2 pb-4"
        >
          <p class="mb-0">
            <small>{{ $t('i18n_sua_senha_precisa_conter') }}:</small>
          </p>
          <p :class="['mb-0', `${(checkIfPasswordHas('uppercase', register.password) || checkIfPasswordHas('lowercase', register.password)) && checkIfPasswordHas('numbers', register.password) ? 'text-success' : 'text-danger'}`]">
            <small><font-awesome-icon :icon="['far', 'check-circle']" /> {{ $t('i18n_letras_e_numeros') }}.</small>
          </p>
          <p :class="['mb-0', `${checkIfPasswordHas('length', register.password) ? 'text-success' : 'text-danger'}`]">
            <small><font-awesome-icon :icon="['far', 'check-circle']" /> 8 {{ $t('i18n_digitos') }}.</small>
          </p>
          <p v-if="differentPass" class="mb-0 text-danger">
            <small><font-awesome-icon class="me-1" :icon="['far', 'times-circle']" />{{ $t('i18n_senha_de_confirmacao') }}</small>
          </p>
        </div>
        <error-badge
          name="password"
          :validate="errors?errors:{}"
          class="error-badge"
        />
        <sk-input
          v-model="register.password_confirmation"
          name="password_confirmation"
          :label="$t('i18n_confirme_a_senha')"
          :disabled="currentSettings.search && !validCpf"
          type="password"
          required
          class="pb-4"
          @focus="passwordFocussed = true"
          @blur="passwordFocussed = false"
        />
        <error-badge
          name="password_confirmation"
          :validate="errors?errors:{}"
          class="error-badge"
        />

        <label for="sk-input-code" class="w-100">
          <sk-checkbox
            v-model="code"
            class="mb-2"
            name="code"
          >
            <span class="code-checkbox">{{ `${$t('i18n_codigo')} (${$t('i18n_opcional')})` }}</span>
          </sk-checkbox>
        </label>
        <sk-input
          v-if="code"
          v-model="register.ref"
          name="ref"
          class="pb-4"
        />
        <error-badge
          name="ref"
          :validate="errors?errors:{}"
          class="error-badge"
        />

        <sk-checkbox
          v-model="termsConditions"
          :label="$t('i18n_eu_li_e_concordo')"
          required
          name="terms"
          class="mt-3"
        />
      </div>

      <button
        class="register-btn"
        :class="{ disabled: loading }"
        :disabled="loading"
        type="submit"
      >
        <font-awesome-icon v-if="loading" class="icon spinner-class" :icon="['fas', 'circle-notch']" />
        <span v-else>{{ $t('i18n_jogar_agora') }}</span>
      </button>

      <div class="bottom-text">
        <span>{{ $t('i18n_ja_tem_uma_conta_2') }}</span>
        <button
          class="login"
          @click.prevent="$emit('modalLogin'), open = false"
        >
          {{ $t('i18n_entrar') }}
        </button>
      </div>
    </form>
  </sk-modal>
</template>

<script>
import utils from '@/utils/utils'
import SkModal from '@/components/sk/atoms/SkModal.vue'
import SkInput from '@/components/sk/atoms/SkInput.vue'
import SkCheckbox from '@/components/sk/atoms/SkCheckbox.vue'
import ErrorBadge from '@/components/default/atoms/ErrorBadge.vue'

export default {
  name: 'SkModalRegister',
  components: {
    SkModal,
    SkInput,
    SkCheckbox,
    ErrorBadge
  },
  props: {
    value: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    currentSettings: {
      type: Object,
      default: () => ({})
    },
    validCpf: {
      type: Boolean,
      default: false
    },
    fetchedInfos: {
      type: Object,
      default: () => ({})
    },
    fetchedData: {
      type: Object,
      default: () => ({})
    },
    errors: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      termsConditions: false,
      passwordFocussed: false,
      date: {
        day: '',
        month: '',
        year: ''
      },
      days: [
        { label: '1', value: 1 },
        { label: '2', value: 2 },
        { label: '3', value: 3 },
        { label: '4', value: 4 },
        { label: '5', value: 5 },
        { label: '6', value: 6 },
        { label: '7', value: 7 },
        { label: '8', value: 8 },
        { label: '9', value: 9 },
        { label: '10', value: 10 },
        { label: '11', value: 11 },
        { label: '12', value: 12 },
        { label: '13', value: 13 },
        { label: '14', value: 14 },
        { label: '15', value: 15 },
        { label: '16', value: 16 },
        { label: '17', value: 17 },
        { label: '18', value: 18 },
        { label: '19', value: 19 },
        { label: '20', value: 20 },
        { label: '21', value: 21 },
        { label: '22', value: 22 },
        { label: '23', value: 23 },
        { label: '24', value: 24 },
        { label: '25', value: 25 },
        { label: '26', value: 26 },
        { label: '27', value: 27 },
        { label: '28', value: 28 },
        { label: '29', value: 29 },
        { label: '30', value: 30 },
        { label: '31', value: 31 }
      ],
      months: [
        { label: 'Janeiro', value: 0 },
        { label: 'Fevereiro', value: 1 },
        { label: 'Março', value: 2 },
        { label: 'Abril', value: 3 },
        { label: 'Maio', value: 4 },
        { label: 'Junho', value: 5 },
        { label: 'Julho', value: 6 },
        { label: 'Agosto', value: 7 },
        { label: 'Setembro', value: 8 },
        { label: 'Outubro', value: 9 },
        { label: 'Novembro', value: 10 },
        { label: 'Dezembro', value: 11 }
      ],
      years: [],
      countries: [],
      register: {
        document: '',
        email: '',
        name: '',
        last_name: '',
        username: '',
        password: '',
        password_confirmation: '',
        birthdate: '',
        country: 'br',
        phone: '',
        zip: '',
        street: '',
        neighborhood: '',
        number: '',
        ref: ''
      },
      documentRaw: '',
      zipRaw: '',
      differentPass: false,
      verifyTimeout: null,
      code: false
    }
  },
  computed: {
    open: {
      get () {
        return this.value
      },
      set (value) {
        this.$emit('input', value)
        this.$emit('cleanErrors')
        this.cleanFields()
      }
    }
  },
  watch: {
    'register.password_confirmation' () {
      if (this.verifyTimeout) {
        this.differentPass = false
        clearTimeout(this.verifyTimeout)
      }

      this.verifyTimeout = setTimeout(() => {
        if (this.register.password_confirmation !== this.register.password) {
          this.differentPass = true
        }
      }, 1000)
    },
    zipRaw (value) {
      this.register.zip = this.sanatizeValue(value, ['-', '_'], '')
    }
  },
  created () {
    this.$emit('cleanErrors')
  },
  mounted () {
    for (let i = new Date().getFullYear(); i > 1900; i--) {
      this.years.push({ label: i, value: i })
    }

    this.countries = utils.listOfCountries()
  },
  beforeDestroy () {
    clearTimeout(this.verifyTimeout)
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
    validateCpf () {
      if (this.currentSettings && !this.currentSettings.search) {
        return
      }

      this.$emit('validateCpf', this.documentRaw)
    },
    sanatizeValue (value, replaceWhat, replaceTo) {
      if (!value) {
        return
      }
      let threated = '' + value
      replaceWhat.forEach((e) => {
        const re = new RegExp(e, 'g')
        /* eslint-disable-next-line */
        threated = threated.replace(re, replaceTo ? replaceTo : '')
      })
      return threated
    },
    submit () {
      if (this.currentSettings && !this.currentSettings.search) {
        this.register.document = this.documentRaw
      }

      this.register.birthdate = new Date(this.date.year, this.date.month, this.date.day)

      this.$emit('register', this.register)
    },
    cleanFields () {
      this.termsConditions = false
      this.passwordFocussed = false
      this.date = {
        day: '',
        month: '',
        year: ''
      }
      this.days = [
        { label: '1', value: 1 },
        { label: '2', value: 2 },
        { label: '3', value: 3 },
        { label: '4', value: 4 },
        { label: '5', value: 5 },
        { label: '6', value: 6 },
        { label: '7', value: 7 },
        { label: '8', value: 8 },
        { label: '9', value: 9 },
        { label: '10', value: 10 },
        { label: '11', value: 11 },
        { label: '12', value: 12 },
        { label: '13', value: 13 },
        { label: '14', value: 14 },
        { label: '15', value: 15 },
        { label: '16', value: 16 },
        { label: '17', value: 17 },
        { label: '18', value: 18 },
        { label: '19', value: 19 },
        { label: '20', value: 20 },
        { label: '21', value: 21 },
        { label: '22', value: 22 },
        { label: '23', value: 23 },
        { label: '24', value: 24 },
        { label: '25', value: 25 },
        { label: '26', value: 26 },
        { label: '27', value: 27 },
        { label: '28', value: 28 },
        { label: '29', value: 29 },
        { label: '30', value: 30 },
        { label: '31', value: 31 }
      ]
      this.months = [
        { label: 'Janeiro', value: 0 },
        { label: 'Fevereiro', value: 1 },
        { label: 'Março', value: 2 },
        { label: 'Abril', value: 3 },
        { label: 'Maio', value: 4 },
        { label: 'Junho', value: 5 },
        { label: 'Julho', value: 6 },
        { label: 'Agosto', value: 7 },
        { label: 'Setembro', value: 8 },
        { label: 'Outubro', value: 9 },
        { label: 'Novembro', value: 10 },
        { label: 'Dezembro', value: 11 }
      ]
      this.years = []
      this.countries = []
      this.register = {
        document: '',
        email: '',
        name: '',
        last_name: '',
        username: '',
        password: '',
        password_confirmation: '',
        birthdate: '',
        country: 'br',
        phone: '',
        zip: '',
        street: '',
        neighborhood: '',
        number: '',
        ref: ''
      }
      this.documentRaw = ''
      this.zipRaw = ''
      this.differentPass = false
      this.verifyTimeout = null
      this.code = false
    }
  }
}
</script>

<style lang="scss" scoped>
#register-form {
  padding: 20px 24px;
  position: relative;

  h1 {
    line-height: 1.5;
    font-size: 1.125rem;
    font-weight: 600;
    margin-bottom: 15px;
    margin-bottom: 25px;
    text-align: center;
  }

  p {
    color: var(--fut-secondary);
    font-weight: 600;
    font-size: 1rem;
    text-align: center;
  }

  .document-wrapper {
    display: flex;
    align-items: center;

    .validate-cpf-btn {
      margin: 0;
      padding: 10px 0;
      max-width: 100px;
      max-height: 38.5px;
      font-weight: 600;
    }
  }

  .birthdate-wrapper, .country-wrapper {
    label {
      font-size: 15px;
      font-weight: 600;
      color: var(--fut-secondary);
      margin-bottom: 2px;

      span {
        color: red;
        font-weight: 400;
        font-size: 13px;
        margin-left: 3px;
      }
    }

    .selects {
      display: flex;
    }
  }

  .password-checklist {
    p {
      text-align: left !important;
    }
  }

  .code-checkbox {
    margin-left: 8px;
    font-weight: 600;
  }

  .register-btn, .validate-cpf-btn {
    display: flex;
    justify-content: center;
    border: none;
    color: var(--fut-color-dynamic);
    font-size: 15px;
    font-weight: 700;
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
        transform: scale(.95);
      }
    }

    &.disabled {
      opacity: .5;
      &:hover {
        background: var(--fut-primary);
      }
      &:active {
        span {
          transform: none;
        }
      }
    }

    .spinner-class{
      animation-name: spin;
      animation-duration: 500ms;
      animation-iteration-count: infinite;
      animation-timing-function: linear;
    }
    @keyframes spin {
      from {
        transform:rotate(0deg);
      }
      to {
        transform:rotate(360deg);
      }
    }
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

    .login {
      border: none;
      background: transparent;
      color: var(--fut-color-dynamic);
      font-weight: 600;
      font-size: 15px;
      padding: 0;
    }
  }
}

.error-badge {
  margin-top: -26px;
  margin-bottom: 16px;
}
</style>

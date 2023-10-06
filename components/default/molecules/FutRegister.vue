<template>
  <div class="default-register-container">
    <form class="px-3" @submit.prevent="submitRegister">
      <div class="position-relative input-margin">
        <fut-register-input
          v-model="documentRaw"
          v-inputmask="'999.999.999-99'"
          :name="currentSettings.search ? 'cpf' : 'document'"
          label="CPF"
          required
          @focus="cpfFocused = true"
          @blur="cpfFocused = false"
        />
        <error-badge
          :name="currentSettings.search ? 'cpf' : 'document'"
          :validate="errors"
        />
        <button
          v-if="currentSettings && currentSettings.search"
          class="search-btn search-cpf position-absolute top-0 end-0"
          :class="{ focused: cpfFocused }"
          @click.prevent="validateCpf(documentRaw)"
        >
          <font-awesome-icon v-if="loading" class="spinner-class" :icon="['fas', 'circle-notch']" />
          <img
            v-else
            src="/search-icon-br4bet.png"
            alt="Search Icon"
            height="20"
          >
        </button>
      </div>

      <div class="input-margin">
        <fut-register-input
          v-if="currentSettings && currentSettings.register_reduced && currentSettings.search && fullname"
          v-model="fullname"
          name="name"
          disabled
          :label="$t('i18n_nome')"
        />
        <fut-register-input
          v-if="currentSettings && currentSettings.register_reduced && !currentSettings.search"
          v-model="data.name"
          name="name"
          :label="$t('i18n_nome')"
        />
        <fut-register-input
          v-if="currentSettings && !currentSettings.register_reduced"
          v-model="data.name"
          :disabled="currentSettings.search"
          name="name"
          :label="`${$t('i18n_primeiro')} ${$t('i18n_nome')}`"
        />
        <error-badge name="name" :validate="errors?errors:{}" />
      </div>

      <div class="input-margin">
        <fut-register-input
          v-if="currentSettings && !currentSettings.register_reduced"
          v-model="data.last_name"
          :disabled="currentSettings.search"
          name="last_name"
          :label="$t('i18n_sobrenome')"
        />
        <error-badge name="last_name" :validate="errors?errors:{}" />
      </div>

      <div v-if="currentSettings && !currentSettings.register_reduced" class="input-margin">
        <p class="text-white text-center fut-color-dynamic">
          {{ $t('i18n_data_de_nascimento') }}
        </p>
        <div id="birthdate" class="d-flex">
          <fut-register-select
            v-if="dayOptions"
            v-model="date.day"
            :label="$t('i18n_dia')"
            :options="dayOptions"
            :disabled="currentSettings.search"
            name="day"
            class="w-100 fut-color-dynamic"
          />
          <fut-register-select
            v-if="monthOptions"
            v-model="date.month"
            :label="$t('i18n_mes')"
            :options="monthOptions"
            :disabled="currentSettings.search"
            name="month"
            class="mx-2 w-100"
          />
          <fut-register-select
            v-if="yearOptions"
            v-model="date.year"
            :label="$t('i18n_ano')"
            :options="yearOptions"
            :disabled="currentSettings.search"
            name="year"
            class="w-100"
          />
        </div>
        <error-badge name="birthdate" :validate="errors?errors:{}" />
      </div>

      <div v-if="countryOptions && currentSettings && !currentSettings.register_reduced" class="input-margin">
        <fut-register-select
          v-model="data.country"
          :label="$t('i18n_pais_de_residencia')"
          :options="countryOptions"
          name="country"
          class="w-100"
        />
      </div>

      <div class="input-margin">
        <fut-register-input
          v-model="data.email"
          label="E-mail"
          type="email"
          name="email"
          required
        />
        <error-badge name="email" :validate="errors?errors:{}" />
      </div>

      <div class="input-margin">
        <div class="position-relative">
          <fut-register-input
            v-model="data.phone"
            v-inputmask="'(99) 99999-9999'"
            :label="$t('i18n_numero_de_telefone')"
            padding="0 12px 0 50px"
            label-left-position="48px"
            name="phone"
            required
            @focus="telFocused = true"
            @blur="telFocused = false"
          />
          <label
            class="search-btn tel-label position-absolute top-0 start-0"
            :class="{ focused: telFocused }"
            for="phone"
          >
            <span class="text-white">+55</span>
          </label>
        </div>
        <error-badge name="phone" :validate="errors?errors:{}" />
      </div>

      <div v-if="currentSettings && currentSettings.address_on_register" class="input-margin">
        <p class="text-white text-center fut-color-dynamic">
          {{ $t('i18n_endereco') }}
        </p>
        <div class="position-relative">
          <fut-register-input
            v-model="zipRaw"
            v-inputmask="'99999-999'"
            :label="$t('i18n_codigo_posta')"
            name="zip"
            @input="value=>data.zip = sanatizeValue(value, ['-', '_'], '')"
            @focus="cepFocused = true"
            @blur="cepFocused = false"
          />
          <button
            ref="checkZip"
            class="search-btn search-address position-absolute top-0 end-0"
            :class="{ focused: cepFocused }"
            @click.prevent="()=>searchAddress(data.zip)"
          >
            <font-awesome-icon v-if="loading" class="spinner-class" :icon="['fas', 'circle-notch']" />
            <span v-else class="text-white">{{ $t('i18n_buscar_endereco') }}</span>
          </button>
        </div>
        <error-badge name="zip" :validate="errors?errors:{}" />
      </div>

      <div v-if="currentSettings && locationSearch && currentSettings.address_on_register">
        <div class="input-margin">
          <fut-register-input
            v-model="data.street"
            name="street"
            :label="$t('i18n_rua')"
          />
          <error-badge name="street" :validate="errors?errors:{}" />
        </div>
        <div class="input-margin">
          <fut-register-input
            v-model="data.neighborhood"
            name="neighborhood"
            :label="$t('i18n_bairro')"
          />
          <error-badge name="neighborhood" :validate="errors?errors:{}" />
        </div>
        <div class="input-margin">
          <fut-register-input
            v-model="data.number"
            name="number"
            :label="$t('i18n_numero')"
          />
          <error-badge name="number" :validate="errors?errors:{}" />
        </div>
      </div>

      <div v-if="currentSettings && !currentSettings.hide_username_on_register" class="input-margin">
        <fut-register-input
          v-model="data.username"
          :label="$t('i18n_nome_do_usuario')"
          name="username"
          required
        />
        <error-badge name="username" :validate="errors?errors:{}" />
      </div>

      <div class="input-margin">
        <fut-register-input
          ref="password"
          v-model="data.password"
          name="password"
          type="password"
          :label="$t('i18n_senha')"
          required
          @focus="passwordFocused = true"
          @blur="passwordFocused = false"
        />
        <error-badge name="password" :validate="errors?errors:{}" />
        <div v-if="data.password.length > 0 || passwordFocused" class="password-checklist text-white fut-color-dynamic ps-3">
          <p class="mb-0">
            <small>{{ $t('i18n_sua_senha_precisa_conter') }}:</small>
          </p>
          <p :class="['mb-0', `${(checkIfPasswordHas('uppercase', data.password) || checkIfPasswordHas('lowercase', data.password)) && checkIfPasswordHas('numbers', data.password) ? 'text-success' : 'text-danger'}`]">
            <small><font-awesome-icon :icon="['far', 'check-circle']" /> {{ $t('i18n_letras_e_numeros') }}.</small>
          </p>
          <p :class="['mb-0', `${checkIfPasswordHas('length', data.password) ? 'text-success' : 'text-danger'}`]">
            <small><font-awesome-icon :icon="['far', 'check-circle']" /> 8 {{ $t('i18n_digitos') }}.</small>
          </p>
          <p v-if="differentPass" class="mb-0 text-danger">
            <small><font-awesome-icon class="me-1" :icon="['far', 'times-circle']" />{{ $t('i18n_senha_de_confirmacao') }}</small>
          </p>
        </div>
      </div>

      <div class="input-margin">
        <fut-register-input
          ref="password_confirmation"
          v-model="data.password_confirmation"
          name="password_confirmation"
          type="password"
          :label="$t('i18n_confirme_a_senha')"
          required
        />
        <error-badge name="password_confirmation" :validate="errors?errors:{}" />
      </div>

      <div v-if="currentSettings && !currentSettings.register_reduced" class="input-margin">
        <fut-register-input
          ref="ref"
          v-model="data.ref"
          name="ref"
          type="text"
          :label="$t('i18n_codigo')"
        />
        <error-badge name="ref" :validate="errors?errors:{}" />
      </div>

      <p class="text-white text-center my-4 fut-color-dynamic">
        {{ $t('i18n_ao_se_registrar_voce') }} <a href="/termos-e-condicoes" target="blank" class="fut-primary text-decoration-none">{{ $t('i18n_termos_e_condicoes') }}</a>
      </p>

      <button
        class="search-btn submit-register"
        type="submit"
      >
        <span class="text">{{ $t('i18n_criar_conta') }}</span>
      </button>

      <!-- eslint-disable-next-line -->
      <p class="text-white text-center p-4 fut-color-dynamic" v-html="$t('i18n_este_site_e_protegido')" />

      <p class="text-white text-center pb-4 mb-4 fut-color-dynamic">
        {{ $t('i18n_ja_tem_uma_conta_2') }} <a :href="localePath('/login')" class="fut-primary text-decoration-none">{{ $t('i18n_entre_na_sua_conta') }}</a>
      </p>
    </form>
  </div>
</template>

<script>
import FutRegisterInput from '@/components/default/atoms/FutRegisterInput.vue'
import FutRegisterSelect from '@/components/default/atoms/FutRegisterSelect.vue'
import ErrorBadge from '@/components/default/atoms/ErrorBadge.vue'
import sportradarTagManager from '@/mixins.js/sportradarTagManager.js'
import utils from '@/utils/utils'

export default {
  name: 'FutRegister',
  components: {
    FutRegisterInput,
    FutRegisterSelect,
    ErrorBadge
  },
  mixins: [sportradarTagManager],
  props: {
    errors: {
      type: Object,
      default: () => ({})
    },
    currentSettings: {
      type: Object,
      default: () => ({})
    },
    loading: {
      type: Boolean,
      default: false
    },
    userData: {
      type: Object,
      default: () => ({})
    },
    errorDocument: {
      type: Object,
      default: () => ({})
    },
    address: {
      type: Object,
      default: () => ({})
    }
  },
  emits: [
    'validateCpf',
    'register',
    'searchAddress'
  ],
  data () {
    return {
      cpfFocused: false,
      cepFocused: false,
      telFocused: false,
      passwordFocused: false,
      registrarionStartted: false,
      documentRaw: '',
      readonly: false,
      data: {
        name: '',
        last_name: '',
        username: '',
        email: '',
        phone: '',
        document: '',
        country: 'br',
        birthdate: '',
        zip: '',
        street: '',
        neighborhood: '',
        number: '',
        password: '',
        password_confirmation: '',
        security_code: '',
        security_code_confirmation: '',
        ref: ''
      },
      fullname: '',
      date: {
        day: '',
        month: '',
        year: ''
      },
      zipRaw: null,
      locationSearch: false,
      countryOptions: null,
      dayOptions: [
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
      monthOptions: [
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
      yearOptions: null,
      differentPass: false,
      verifyTimeout: null
    }
  },
  watch: {
    documentRaw (val) {
      if (
        val &&
        !val.includes('_') &&
        val.length >= 11 &&
        this.currentSettings.search
      ) {
        this.validateCpf(val)
      }
    },
    'data.zip' (val) {
      if (val && val.length >= 8) {
        this.searchAddress(this.data.zip)
      }
    },
    errors (val) {
      let scrolled = false
      for (const key in val) {
        if (!scrolled) {
          this.goto(key)
          scrolled = true
        }
      }
    },
    'data.password_confirmation' () {
      if (this.verifyTimeout) {
        this.differentPass = false
        clearTimeout(this.verifyTimeout)
      }

      this.verifyTimeout = setTimeout(() => {
        if (this.data.password_confirmation !== this.data.password) {
          this.differentPass = true
        }
      }, 1000)
    },
    userData (val) {
      if (val) {
        this.fullname = val.NomePessoaFisica
        this.data.name = val.NomePessoaFisica.split(' ')[0]
        this.data.last_name = val.NomePessoaFisica.replace(val.NomePessoaFisica.split(' ')[0], '')
        this.date.day = new Date(val.DataNascimento).getDate() + ''
        this.date.month = new Date(val.DataNascimento).getMonth() + ''
        this.date.year = new Date(val.DataNascimento).getFullYear() + ''
        this.data.document = val.NumeroCpf
      }
    },
    address (val) {
      if (val) {
        this.data.street = val.logradouro
        this.data.neighborhood = val.bairro
      }
    }
  },
  mounted () {
    if (this.$route.params.ref) {
      this.data.ref = this.$route.params.ref
      this.readonly = true
    }

    const years = []

    for (let i = new Date().getFullYear(); i > 1900; i--) {
      years.push({ label: i, value: i })
    }

    this.yearOptions = years
    this.countryOptions = utils.listOfCountries()

    this.goto('country')
  },
  beforeDestroy () {
    clearTimeout(this.verifyTimeout)
  },
  methods: {
    validateCpf (doc) {
      this.$emit('validateCpf', doc)
    },
    submitRegister () {
      if (this.currentSettings && !this.currentSettings.search) {
        this.data.document = this.documentRaw
      }

      this.data.birthdate = new Date(this.date.year, this.date.month, this.date.day)

      this.$emit('register', this.data)
    },
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
    goto (refName) {
      const el = this.$refs[refName]

      if (el) {
        el.$el.scrollIntoView({ behavior: 'smooth' })
      }
    },
    searchAddress (cep) {
      if (!cep) {
        this.$toast.open({
          message: 'Digite um cep válido!',
          type: 'warning'
        })
        return
      }

      this.$emit('searchAddress', cep)

      this.locationSearch = true
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
    }
  }
}
</script>

<style scoped lang="scss">
  .default-register-container{
    margin-top: 20px;
    max-width: 500px;
    position: relative;
    left: 50%;
    transform: translateX(-50%);
  }
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

.search-btn {
  background: var(--fut-primary);
  border: none;
  height: 38px;
  border-radius: 19px;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    background: var(--fut-primary-darkest);
  }
  &:active {
    background: var(--fut-primary-lightest);
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
.search-cpf {
  width: 48px;
}
.search-address {
  padding: 0 12px;
}
.search-cpf.focused, .search-address.focused {
  border-top: 1px solid #fff;
  border-right: 1px solid #fff;
  border-bottom: 1px solid #fff;
}
.tel-label {
  padding: 0 10px;
}
.tel-label.focused {
  border-top: 1px solid #fff;
  border-left: 1px solid #fff;
  border-bottom: 1px solid #fff;
}

.submit-register {
  width: 100%;
  height: 60px;

  .text {
    color: #fff;
    font-size: 30px;
    font-weight: 800;
  }
}
.disabled {
  background: #ccc !important;
  cursor: initial;
}

.input-margin {
  margin-bottom: 14px;
}
</style>

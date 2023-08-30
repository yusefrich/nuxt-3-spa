<template>
  <div class="register-container">
    <form
      v-if="currentSettings"
      @submit.prevent="submitRegister"
      @keydown.enter.prevent="currentSettings.search ? validateCpf(data.document) : ()=>{}"
    >
      <div class="row">
        <div class="col-12">
          <h5><font-awesome-icon class="me-2" :icon="['fas', 'user']" /> {{ $t('i18n_informacoes_pessoais') }}</h5>
          <p v-if="currentSettings.search" class="mb-0">
            <small>{{ $t('i18n_informe_os_dados_corretamente') }}</small>
          </p>
        </div>
        <div class="col-md-6">
          <label class="text-start"><span class="required" />CPF</label>
          <div class="mt-1 mb-2 position-relative">
            <fut-input
              v-if="currentSettings"
              ref="document"
              v-model="data.document"
              v-inputmask="'999.999.999-99'"
              :validate="errors?errors:{}"
              :nsx-input="true"
              type="text"
              nsx-validation
              :name="currentSettings.search ? 'cpf' : 'document'"
              required
              class="mx-0 w-100"
              info="Informe seu CPF e aperte OK. Seu nome e data de nascimento serão preenchidos automaticamente."
              @focus="()=>{registrarionStartted ? null : srtmRegistrationStart();registrarionStartted=true}"
              @keydown.enter.prevent="currentSettings.search ? validateCpf(data.document) : ()=>{}"
              @blur="currentSettings.search ? validateCpf(data.document) : ()=>{}"
            />
            <nsx-fut-button
              v-if="currentSettings && currentSettings.search"
              :loading="loading"
              type="button"
              class="ok-button"
              @click="validateCpf(data.document)"
            >
              OK
            </nsx-fut-button>
          </div>
        </div>
        <div v-if="currentSettings && !currentSettings.register_reduced" class="col-md-6">
          <label class="text-start"><span class="required" />{{ $t('i18n_primeiro') }} {{ $t('i18n_nome') }}</label>
          <fut-input
            v-if="currentSettings"
            ref="name"
            v-model="data.name"
            :validate="errors?errors:{}"
            :disabled="currentSettings.search"
            name="name"
            required
            nsx-input
            nsx-validation
            type="text"
            style="height: 26px"
            class="mx-0 mt-1 mb-2"
          />
        </div>
        <div v-if="currentSettings && !currentSettings.register_reduced" class="col-md-6">
          <label class="text-start"><span class="required" />{{ $t('i18n_sobrenome') }}</label>
          <fut-input
            v-if="currentSettings"
            ref="last_name"
            v-model="data.last_name"
            :validate="errors?errors:{}"
            :disabled="currentSettings.search"
            name="last_name"
            nsx-input
            nsx-validation
            required
            type="text"
            style="height: 26px"
            class="mx-0 mt-1 mb-2"
          />
        </div>
      </div>
      <div class="row">
        <div v-if="currentSettings && !currentSettings.register_reduced" class="col-10 col-md-4">
          <label class="text-start"><span class="required" />{{ $t('i18n_data_de_nascimento') }}: </label>
          <fut-input-group ref="birthdate" class="mt-1 mb-2" :validate="errors?errors:{}" name="birthdate">
            <fut-select
              v-if="dayOptions && currentSettings"
              v-model="date.day"
              :disabled="currentSettings.search"
              :options="dayOptions"
              name="day"
              :placeholder="$t('i18n_dia')"
              nsx-input
              class="col-4 mx-0 px-0"
            />
            <fut-select
              v-if="monthOptions && currentSettings"
              v-model="date.month"
              :options="monthOptions"
              :disabled="currentSettings.search"
              :placeholder="$t('i18n_mes')"
              name="month"
              nsx-input
              class="col-4 mx-0 px-2"
            />
            <fut-select
              v-if="yearOptions && currentSettings"
              v-model="date.year"
              :options="yearOptions"
              :disabled="currentSettings.search"
              :placeholder="$t('i18n_ano')"
              name="year"
              nsx-input
              class="col-4 mx-0 px-0"
            />
          </fut-input-group>
        </div>
        <div class="col-12">
          <h5 class="my-1">
            <font-awesome-icon class="me-2" :icon="['fas', 'mobile-alt']" />{{ $t('i18n_informacoes_de_contato') }}
          </h5>
        </div>
        <div class="col-md-6">
          <label class="text-start"><span class="required" />E-mail</label>
          <fut-input
            ref="email"
            v-model="data.email"
            :validate="errors?errors:{}"
            type="email"
            name="email"
            nsx-input
            nsx-validation
            required
            class="mx-0 mt-1 mb-2"
          />
        </div>
        <div class="col-md-6">
          <label class="text-start"><span class="required" />{{ $t('i18n_telefone') }}</label>
          <div class="d-flex">
            <fut-input
              id="area"
              ref="area"
              v-model="phoneArea"
              v-inputmask="'+99'"
              :validate="errors?errors:{}"
              required
              nsx-input
              nsx-validation
              name="area"
              type="text"
              readonly
              style="max-width: 50px"
              class="ms-0 me-2 mt-1 mb-2"
            />
            <fut-input
              ref="phone"
              v-model="data.phone"
              v-inputmask="'(99) 99999-9999'"
              :validate="errors?errors:{}"
              type="text"
              required
              nsx-input
              nsx-validation
              name="phone"
              class="mx-0 mt-1 mb-2 w-100"
            />
          </div>
        </div>
      </div>
      <div v-if="currentSettings && currentSettings.address_on_register" class="row">
        <div class="col-12">
          <h5 class="my-1">
            <font-awesome-icon class="me-2" :icon="['fas', 'address-card']" />{{ $t('i18n_endereco') }}
          </h5>
        </div>
        <div class="col-md-6">
          <label class="text-start">CEP</label>
          <div class="mt-1 mb-2 position-relative">
            <fut-input
              ref="zip"
              v-model="zipRaw"
              v-inputmask="'99999-999'"
              :validate="errors?errors:{}"
              :nsx-input="true"
              type="text"
              nsx-validation
              name="zip"
              class="mx-0 mt-1 mb-2"
              info="Informe seu CEP e aperte OK. Seu endereço serão preenchidos automaticamente."
              @input="value=>data.zip = sanatizeValue(value, ['-', '_'], '')"
            />
            <nsx-fut-button ref="checkZip" class="ok-button" @click="()=>searchAddress(data.zip)">
              OK
            </nsx-fut-button>
          </div>
        </div>
        <div class="col-md-6">
          <label class="text-start">{{ $t('i18n_rua') }}</label>
          <fut-input
            ref="street"
            v-model="data.street"
            :nsx-input="true"
            :validate="errors?errors:{}"
            :readonly="!locationSearch"
            nsx-validation
            type="text"
            name="street"
            class="mx-0 mt-1 mb-2"
          />
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <h5><font-awesome-icon class="me-2" :icon="['fas', 'key']" />{{ $t('i18n_informacoes_do_login') }}</h5>
        </div>
        <div v-if="currentSettings && !currentSettings.hide_username_on_register" class="col-md-6">
          <label class="text-start"><span class="required" />{{ $t('i18n_usuario') }}</label>
          <fut-input
            ref="username"
            v-model="data.username"
            :validate="errors?errors:{}"
            name="username"
            nsx-input
            nsx-validation
            nsx-icon="user"
            required
            type="text"
            class="mx-0 mt-1 mb-2"
            :info="$t('i18n_seu_nome_de_usuario_deve_conter')"
          />
        </div>
      </div>
      <div class="row">
        <div class="col-md-6">
          <label class="text-start"><span class="required" />{{ $t('i18n_senha') }}</label>
          <fut-input
            id="password"
            ref="password"
            v-model="data.password"
            :validate="errors?errors:{}"
            name="password"
            required
            nsx-input
            nsx-validation
            nsx-icon="lock"
            type="password"
            class="mx-0 mt-1 mb-2"
          />
          <div class="password-checklist text-white fut-color-dynamic mb-3">
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
        <div class="col-md-6">
          <label class="text-start"><span class="required" />{{ $t('i18n_confirme_a_senha') }}</label>
          <fut-input
            id="password_confirmation"
            ref="password_confirmation"
            v-model="data.password_confirmation"
            :validate="errors?errors:{}"
            name="password_confirmation"
            required
            nsx-input
            nsx-validation
            nsx-icon="lock"
            type="password"
            class="mx-0 mt-1 mb-2"
          />
        </div>
      </div>
      <div class="text-center">
        <label class="form-check-label">{{ $t('i18n_ao_realizar_o_cadastro_afirmo') }} <nsx-fut-button class="p-0" target="blank" style="color: #ff8800" to="/termos-e-condicoes"><strong>{{ $t('i18n_termos_e_condicoes') }}</strong></nsx-fut-button> {{ $t('i18n_e') }} <nsx-fut-button class="p-0" style="color: #ff8800" target="blank" to="/privacidade"><strong>{{ $t('i18n_a') }} {{ $t('i18n_politica_de_privacidade') }}</strong></nsx-fut-button></label>
      </div>
      <div class="form-check d-flex justify-content-center">
        <input id="check-nsx" type="checkbox" class="form-check-input" required>
        <label class="form-check-label" for="check-nsx"><strong>{{ $t('i18n_concordo') }}</strong></label>
      </div>
      <div v-if="currentSettings && !currentSettings.register_reduced" class="afiliated-container text-center mx-auto">
        <label class="text-start"><span class="required" />{{ $t('i18n_codigo_de_afiliado') }}</label>
        <fut-input
          ref="ref"
          v-model="data.ref"
          :validate="errors?errors:{}"
          :readonly="readonly"
          nsx-input
          name="ref"
          type="text"
          class="mx-0 mt-1 mb-2"
        />
      </div>
      <div class="text-center">
        <nsx-fut-button type="submit" class="no-break mt-3 text-center mb-5 nsx-button text-white">
          {{ $t('i18n_criar_conta') }}
        </nsx-fut-button>
      </div>
    </form>
  </div>
</template>

<script>
import FutInput from '@/components/default/atoms/FutInput.vue'
import FutInputGroup from '@/components/default/atoms/FutInputGroup.vue'
import FutSelect from '@/components/default/atoms/FutSelect.vue'
import NsxFutButton from '@/components/nsx/atoms/NsxFutButton.vue'
import utils from '@/utils/utils'
import sportradarTagManager from '@/mixins.js/sportradarTagManager.js'

export default {
  name: 'NsxRegisterForm',
  components: {
    FutInput,
    NsxFutButton,
    FutSelect,
    FutInputGroup
  },
  mixins: [sportradarTagManager],
  props: {
    errors: {
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
    currentSettings: {
      type: Object,
      default: () => ({})
    },
    address: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      registrarionStartted: false,
      phoneArea: '55',
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
        ref: '',
        street: '',
        neighborhood: '',
        number: '',
        password: '',
        password_confirmation: '',
        security_code: '',
        security_code_confirmation: ''
      },
      date: {
        day: null,
        month: null,
        year: null
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
        { label: '1', value: 0 },
        { label: '2', value: 1 },
        { label: '3', value: 2 },
        { label: '4', value: 3 },
        { label: '5', value: 4 },
        { label: '6', value: 5 },
        { label: '7', value: 6 },
        { label: '8', value: 7 },
        { label: '9', value: 8 },
        { label: '10', value: 9 },
        { label: '11', value: 10 },
        { label: '12', value: 11 }
      ],
      yearOptions: null,
      differentPass: false,
      verifyTimeout: null
    }
  },
  watch: {
    'data.zip' (val) {
      if (val && val.length >= 8) {
        this.$refs.checkZip.$el.click()
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
        this.data.name = val.NomePessoaFisica.split(' ')[0]
        this.data.last_name = val.NomePessoaFisica.replace(val.NomePessoaFisica.split(' ')[0], '')
        this.date.day = new Date(val.DataNascimento).getDate() + ''
        this.date.month = new Date(val.DataNascimento).getMonth() + ''
        this.date.year = new Date(val.DataNascimento).getFullYear() + ''
      }
    },
    address (val) {
      if (val) {
        this.data.street = val.logradouro
        this.data.neighborhood = val.bairro
      }
    }
  },
  created () {
    this.$emit('cleanErrors')
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
      this.data.birthdate = new Date(this.date.year, this.date.month, this.date.day)
      this.$emit('register', this.data)
    },
    goto (refName) {
      const el = this.$refs[refName]
      if (el) {
        el.$el.scrollIntoView({ behavior: 'smooth' })
      }
    },
    searchAddress (cep) {
      if (!cep) {
        this.$toast.open({ message: 'Digite um cep válido!', type: 'warning' })
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
    }
  }
}
</script>

<style scoped lang="scss">
  .register-container{
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
    font-size: 14px;
  }
  .nsx-button{
    background: linear-gradient(#ff8800, #ff6600);
  }
  .nsx-button:hover{
    box-shadow: 0 0 3px 3px #ff8800 !important;
  }
  .ok-button{
    background: linear-gradient(#ff8800, #ff6600);
    position: absolute;
    right: 0;
    top: 0;
    padding: 0px 10px;
    color: white;
  }
  .ok-button:hover{
    box-shadow: 0 0 3px 3px #ff8800 !important;
  }
  .form-icon{
    background-color: #d2d2d2;
    padding: 0px 10px;
    border-radius: 5px;
  }
  h5{
    font-size: 12pt;
    margin-top: 17px;
  }
  p{
    font-size: 14px;
  }
  .afiliated-container{
    max-width: 200px;
  }
</style>

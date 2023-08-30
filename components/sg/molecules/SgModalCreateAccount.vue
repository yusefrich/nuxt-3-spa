<template>
  <sg-modal v-model="showCad" width="sm" custom-style="max-height: initial" close>
    <sg-logo :current-settings="currentSettings" />
    <h4 class="mb-0 text-center">
      {{ $t('i18n_vamos_criar_sua_conta') }}
    </h4>
    <p class="text-center">
      {{ $t('i18n_insira_e_confirme_seus_dados') }}
    </p>
    <div class="px-4 register-container">
      <form @submit.prevent="submitRegister()">
        <div class="d-flex">
          <div class="content-input mt-3 w-100 d-flex justify-content-center align-items-center">
            <img src="/Sg/id-svgrepo-com.png" alt="">
            <input
              :id="currentSettings.search ? 'cpf' : 'document'"
              ref="document"
              v-model="documentRaw"
              v-inputmask="'999.999.999-99'"
              class="input"
              type="text"
              placeholder="Digite seu CPF"
            >
          </div>
          <button
            v-if="currentSettings && currentSettings.search"
            class="btn-next mt-3"
            style="height: 50px"
            :disabled="loading"
            @click="()=>validateCpf(documentRaw)"
          >
            <span class="fw-bold">{{ $t('i18n_continuar').toUpperCase() }} <font-awesome-icon v-if="loading" class="spinner-class" :icon="['fas', 'circle-notch']" /></span>
          </button>
        </div>
        <error-badge :name="currentSettings.search ? 'cpf' : 'document'" :validate="errors?errors:{}" />
        <div v-if="currentSettings && !currentSettings.register_reduced" class="content-input mt-3 d-flex justify-content-center align-items-center">
          <img src="/Sg/Profile.png" alt="">
          <input
            id="name"
            v-model="payload.name"
            class="input"
            type="text"
            :disabled="currentSettings.search"
            :placeholder="$t('i18n_seu_primeiro_nome')"
          >
        </div>
        <error-badge name="name" :validate="errors?errors:{}" />
        <div v-if="currentSettings && !currentSettings.register_reduced" class="content-input mt-3 d-flex justify-content-center align-items-center">
          <img src="/Sg/Profile.png" alt="">
          <input
            id="last_name"
            v-model="payload.last_name"
            class="input"
            type="text"
            :disabled="currentSettings.search"
            :placeholder="$t('i18n_sobrenome')"
          >
        </div>
        <error-badge name="last_name" :validate="errors?errors:{}" />
        <div v-if="currentSettings && !currentSettings.register_reduced" id="birthdate" class="content-input mt-3" style="height: 80px">
          <div class="p-2 px-4" style="color: #8a8a8a">
            <img src="/Sg/Profile.png" alt="">
            <span class="pt-1 ps-1">{{ $t('i18n_data_de_nascimento') }}</span>
          </div>
          <div class="d-flex">
            <fut-select
              v-if="dayOptions && currentSettings"
              v-model="date.day"
              :placeholder="$t('i18n_dia')"
              :disabled="currentSettings.search"
              name="day"
              :custom-style="'background-color: transparent;color: white'"
              :options="dayOptions"
              class="d-flex justify-content-center align-items-center w-100"
            />
            <fut-select
              v-if="monthOptions && currentSettings"
              v-model="date.month"
              :placeholder="$t('i18n_mes')"
              :disabled="currentSettings.search"
              name="month"
              :custom-style="'background-color: transparent;color: white'"
              :options="monthOptions"
              class="d-flex justify-content-center align-items-center w-100"
            />
            <fut-select
              v-if="yearOptions && currentSettings"
              v-model="date.year"
              :placeholder="$t('i18n_ano')"
              :disabled="currentSettings.search"
              name="year"
              :custom-style="'background-color: transparent;color: white'"
              :options="yearOptions"
              class="d-flex justify-content-center align-items-center w-100"
            />
          </div>
        </div>
        <error-badge name="birthdate" :validate="errors?errors:{}" />
        <div v-if="currentSettings && !currentSettings.hide_username_on_register" class="content-input mt-3 d-flex justify-content-center align-items-center">
          <img src="/Sg/Profile.png" alt="">
          <input
            id="username"
            v-model="payload.username"
            class="input"
            type="text"
            :disabled="currentSettings.search"
            :placeholder="$t('i18n_seu_nome_de_usuario')"
          >
        </div>
        <error-badge name="username" :validate="errors?errors:{}" />
        <div class="content-input mt-3 d-flex justify-content-center align-items-center">
          <img src="/Sg/mail-svgrepo-com.png" alt="">
          <input
            id="email"
            v-model="payload.email"
            class="input"
            type="email"
            :placeholder="$t('i18n_digite_seu_email')"
          >
        </div>
        <error-badge name="email" :validate="errors?errors:{}" />
        <div class="content-input mt-3 d-flex justify-content-center align-items-center">
          <img src="/Sg/id-svgrepo-com.png" alt="">
          <input
            id="phone"
            v-model="payload.phone"
            v-inputmask="'(99) 99999-9999'"
            class="input"
            type="text"
            :placeholder="$t('i18n_seu_telefone')"
          >
        </div>
        <error-badge name="phone" :validate="errors?errors:{}" />
        <div v-if="currentSettings && !currentSettings.register_reduced" class="content-input mt-3 d-flex justify-content-center align-items-center">
          <img src="/Sg/id-svgrepo-com.png" alt="">
          <input
            id="zip"
            v-model="payload.zip"
            v-inputmask="'99999-999'"
            class="input"
            type="text"
            :placeholder="$t('i18n_seu_cep')"
          >
        </div>
        <error-badge name="zip" :validate="errors?errors:{}" />
        <div v-if="currentSettings && !currentSettings.register_reduced" class="content-input mt-3 d-flex justify-content-center align-items-center">
          <img src="/Sg/id-svgrepo-com.png" alt="">
          <input
            id="street"
            v-model="payload.street"
            class="input"
            type="text"
            :placeholder="$t('i18n_seu_rua')"
          >
        </div>
        <error-badge name="street" :validate="errors?errors:{}" />
        <div v-if="currentSettings && !currentSettings.register_reduced" class="content-input mt-3 d-flex justify-content-center align-items-center">
          <img src="/Sg/id-svgrepo-com.png" alt="">
          <input
            id="neighborhood"
            v-model="payload.neighborhood"
            class="input"
            type="text"
            :placeholder="$t('i18n_seu_bairro')"
          >
        </div>
        <error-badge name="neighborhood" :validate="errors?errors:{}" />
        <div v-if="currentSettings && !currentSettings.register_reduced" class="content-input mt-3 d-flex justify-content-center align-items-center">
          <img src="/Sg/id-svgrepo-com.png" alt="">
          <input
            id="number"
            v-model="payload.number"
            class="input"
            type="text"
            :placeholder="$t('i18n_seu_numero')"
          >
        </div>
        <error-badge name="number" :validate="errors?errors:{}" />
        <div class="content-input d-flex justify-content-center align-items-center mt-3">
          <img style="margin-left: 40px" src="/Sg/password-svgrepo-com.png" alt="">
          <input id="password" v-model="payload.password" class="input" type="password" :placeholder="$t('i18n_crie_uma_senha')">
          <button class="border-0 bg-transparent me-2">
            <img src="/Sg/eye-svgrepo-com.png" alt="">
          </button>
        </div>
        <error-badge name="password" :validate="errors?errors:{}" />
        <div class="password-checklist text-white fut-color-dynamic mb-3">
          <p class="mb-0">
            <small>{{ $t('i18n_sua_senha_precisa_conter') }}:</small>
          </p>
          <p :class="['mb-0', `${(checkIfPasswordHas('uppercase', payload.password) || checkIfPasswordHas('lowercase', payload.password)) && checkIfPasswordHas('numbers', payload.password) ? 'text-success' : 'text-danger'}`]">
            <small><font-awesome-icon :icon="['far', 'check-circle']" /> {{ $t('i18n_letras_e_numeros') }}.</small>
          </p>
          <p :class="['mb-0', `${checkIfPasswordHas('length', payload.password) ? 'text-success' : 'text-danger'}`]">
            <small><font-awesome-icon :icon="['far', 'check-circle']" /> 8 {{ $t('i18n_digitos') }}.</small>
          </p>
          <p v-if="differentPass" class="mb-0 text-danger">
            <small><font-awesome-icon class="me-1" :icon="['far', 'times-circle']" />{{ $t('i18n_senha_de_confirmacao') }}</small>
          </p>
        </div>
        <div class="content-input d-flex justify-content-center align-items-center">
          <img style="margin-left: 40px" src="/Sg/password-svgrepo-com.png" alt="">
          <input id="password_confirmation" v-model="payload.password_confirmation" class="input" type="password" :placeholder="$t('i18n_confirme_a_senha')">
          <button class="border-0 bg-transparent me-2">
            <img src="/Sg/eye-svgrepo-com.png" alt="">
          </button>
        </div>
        <error-badge name="password_confirmation" :validate="errors?errors:{}" />
        <div class="content-input d-flex justify-content-center align-items-center mt-3">
          <!-- <img class="ms-4" src="/Sg/password-svgrepo-com.png" alt=""> -->
          <input id="ref" v-model="payload.ref" class="input ms-4" type="text" :placeholder="$t('i18n_codigo_de_bonus')">
        </div>
        <error-badge name="ref" :validate="errors?errors:{}" />
        <div class="form-check mt-3">
          <input required class="form-check-input checkbox" value="" type="checkbox">
          <label class="text-white">{{ $t('i18n_sou_maior_de_18_anos') }}, {{ $t('i18n_li_e_aceitei_os_termos') }}</label>
        </div>
        <div class="d-flex my-3 justify-content-center align-items-center">
          <button class="btn-back me-2" :disabled="loading" @click="()=>{clearPayload();showCad = false}">
            {{ $t('i18n_voltar') }}
          </button>
          <button type="submit" :disabled="loading" class="btn-next">
            {{ $t('i18n_continuar') }}
          </button>
        </div>
      </form>
    </div>
  </sg-modal>
</template>

<script>
import FutSelect from '@/components/default/atoms/FutSelect'
import SgModal from '@/components/sg/atoms/SgModal.vue'
import SgLogo from '@/components/sg/atoms/SgLogo.vue'
import ErrorBadge from '@/components/default/atoms/ErrorBadge.vue'
import utils from '@/utils/utils'

export default {
  name: 'SgModalCreateAccount',
  components: {
    SgModal,
    FutSelect,
    ErrorBadge,
    SgLogo
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
    errors: {
      type: Object,
      default: () => ({})
    },
    currentSettings: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      documentRaw: '',
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
      date: {
        day: null,
        month: null,
        year: null
      },
      payload: {
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
        ref: '',
        password: '',
        password_confirmation: '',
        security_code: '',
        security_code_confirmation: ''
      },
      differentPass: false,
      verifyTimeout: null
    }
  },
  computed: {
    showCad: {
      get () {
        return this.value
      },
      set (value) {
        this.$emit('input', value)
      }
    }
  },
  watch: {
    'payload.password_confirmation' () {
      if (this.verifyTimeout) {
        this.differentPass = false
        clearTimeout(this.verifyTimeout)
      }

      this.verifyTimeout = setTimeout(() => {
        if (this.payload.password_confirmation !== this.payload.password) {
          this.differentPass = true
        }
      }, 1000)
    }
  },
  created () {
    this.$emit('cleanErrors')
  },
  mounted () {
    const years = []
    for (let i = new Date().getFullYear(); i > 1900; i--) {
      years.push({ label: i, value: i })
    }
    this.yearOptions = years
    this.countryOptions = utils.listOfCountries()
  },
  beforeDestroy () {
    clearTimeout(this.verifyTimeout)
  },
  methods: {
    submitRegister () {
      if (!this.currentSettings.search) {
        this.payload.document = this.documentRaw
      }
      // this.payload.birthdate = new Date(this.date.year, this.date.month, this.date.day)
      this.$emit('submit', { payload: this.payload, cb: () => { this.showCad = false } })
    },
    clearPayload () {
      this.payload.name = ''
      this.payload.last_name = ''
      this.payload.username = ''
      this.payload.email = ''
      this.payload.phone = ''
      this.payload.document = ''
      this.payload.country = 'br'
      this.payload.birthdate = ''
      this.payload.zip = ''
      this.payload.street = ''
      this.payload.neighborhood = ''
      this.payload.number = ''
      this.payload.password = ''
      this.payload.password_confirmation = ''
      this.payload.security_code = ''
      this.payload.security_code_confirmatio = ''
    },
    validateCpf (doc) {
      this.$emit('validateCpf', {
        doc,
        cb: (result) => {
          this.$toast.open({ message: 'CPF validado com sucesso', type: 'success' })
          this.validCpf = true
          this.payload.name = result.Result.NomePessoaFisica.split(' ')[0]
          this.payload.last_name = result.Result.NomePessoaFisica.replace(result.Result.NomePessoaFisica.split(' ')[0], '')
          this.date.day = new Date(result.Result.DataNascimento).getDate() + ''
          this.date.month = new Date(result.Result.DataNascimento).getMonth() + 1
          this.date.year = new Date(result.Result.DataNascimento).getFullYear() + ''
          this.payload.document = doc
          this.payload.birthdate = this.date.day + '/' + this.date.month + '/' + this.date.year
        }
      }
      )
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

<style lang="scss" scoped>
.register-container {
  max-height: 70vh;
  overflow-x: scroll;
  &::-webkit-scrollbar {
    height: 5px;
    width: 5px;
    border-radius: 5px;
    background-color: var(--fut-background-darkest);
  }
}
h4 {
  font-size: 24px;
  color: white;
  margin-top: 31px;
  font-weight: bold;
}
p {
  font-size: 13px;
  color: white;
}
.input {
  background-color: transparent;
  outline: none;
  border: none;
  color: white;
  margin-left: 10px;
  width: 81%;
}
.content-input {
  border: 2px solid var(--fut-background-lightest);
  border-radius: 5px;
  height: 50px;
  // select {
  //   background-color: transparent;
  //   outline: none;
  //   border: none;
  //   color: white;
  //   margin-left: 10px;
  //   width: 81%;
  // }
}
.btn-back {
  border: 2px solid var(--fut-secondary); //todo Trocar para primary
  color: var(--fut-secondary); //todo Trocar para primary
  background: transparent;
  font-weight: bold;
  font-size: 12px;
  text-transform: uppercase;
  border-radius: 5px;
  width: 120px;
  height: 39px;
}
.btn-next {
  border: none;
  background: linear-gradient(var(--fut-primary), var(--fut-secondary));
  font-weight: bold;
  text-transform: uppercase;
  border-radius: 5px;
  width: 160px;
  font-size: 12px;
  height: 39px;
}
.form-check {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;

  input {
    font-size: 20px;
  }

  label {
    margin-left: 10px;
    font-size: 13px;
  }
}
</style>

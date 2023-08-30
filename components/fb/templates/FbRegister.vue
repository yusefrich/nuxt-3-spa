<template>
  <div class="main-content d-flex justify-content-center align-items-center">
    <form @submit.prevent="submitRegister">
      <div>
        <!-- Step - 1 -->
        <div class="px-5 py-1 bg-background register-content">
          <div class="d-flex justify-content-center mt-2">
            <a class="rounded" :href="localePath('/')">
              <img
                v-if="currentSettings"
                :src="currentSettings.logo ? currentSettings.logo : ''"
                class="px-1 logo"
                style="object-fit: contain;"
                alt="Logo FDS"
              >
            </a>
          </div>
          <div class="text-center">
            <span class="text-gray">{{ $t('i18n_informacoes_pessoais') }}</span>
            <br>
            <span style="font-size: 11px" class="text-gray"><small>{{ $t('i18n_insira_e_confirme_seus_dados') }}</small></span>
          </div>
          <div class="d-md-flex align-items-center mt-3 position-relative">
            <label class="label-controler">CPF</label>
            <div class="input-background-dark">
              <input
                :id="currentSettings.search ? 'cpf' : 'document'"
                ref="document"
                v-model="documentRaw"
                v-inputmask="'999.999.999-99'"
                class="input-control fut-color-dynamic"
                name="document"
                placeholder="xxx.xxx.xxx-xx"
                required
              >
            </div>
            <fb-fut-button v-if="currentSettings && currentSettings.search" class="button-validate sm" type="button" :disabled="getOnboardingAuthLoading" @click="()=>validateCpf(documentRaw)">
              <span class="fw-bold">{{ $t('i18n_continuar').toUpperCase() }} <font-awesome-icon v-if="getOnboardingAuthLoading" class="spinner-class" :icon="['fas', 'circle-notch']" /></span>
            </fb-fut-button>
          </div>
          <p v-if="currentSettings && currentSettings.search" class="text-info">
            <small v-if="documentRaw && documentRaw === data.document" class="text-success fw-bold pb-2"><font-awesome-icon :icon="['fas', 'check']" /> {{ $t('i18n_documento_valido') }}</small>
            <br v-if="documentRaw && documentRaw === data.document">
            <small class="text-white">{{ $t('i18n_informe_os_dados_corretamente') }}</small>
          </p>
          <error-badge :name="currentSettings.search ? 'cpf' : 'document'" :validate="getOnboardingAuthErrors?getOnboardingAuthErrors:{}" />
        </div>
        <!-- Step - 2 -->
        <div class="px-5 py-1 bg-background register-content">
          <div v-if="currentSettings && currentSettings.search && currentSettings.register_reduced && fullname" class="d-md-flex align-items-center mt-3">
            <label class="label-controler">{{ $t('i18n_nome') }}</label>
            <div class="input-background-dark">
              <input
                ref="name"
                v-model="fullname"
                :disabled="true"
                class="input-control fut-color-dynamic"
                type="text"
                :placeholder="$t('i18n_nome')"
                name="name"
                required
              >
            </div>
          </div>
          <div v-if="currentSettings && !currentSettings.register_reduced" class="d-md-flex align-items-center mt-3">
            <label class="label-controler">{{ $t('i18n_nome') }}</label>
            <div class="input-background-dark">
              <input
                id="name"
                ref="name"
                v-model="data.name"
                :disabled="currentSettings.search"
                class="input-control fut-color-dynamic"
                type="text"
                :placeholder="$t('i18n_nome')"
                name="name"
                required
              >
            </div>
          </div>
          <error-badge name="name" :validate="getOnboardingAuthErrors?getOnboardingAuthErrors:{}" />
          <div v-if="currentSettings && !currentSettings.register_reduced" class="d-md-flex align-items-center mt-3">
            <label class="label-controler">{{ $t('i18n_sobrenome') }}</label>
            <div class="input-background-dark">
              <input
                id="last_name"
                ref="name"
                v-model="data.last_name"
                :disabled="currentSettings.search"
                :placeholder="$t('i18n_sobrenome')"
                name="name"
                class="input-control fut-color-dynamic"
                type="text"
                required
              >
            </div>
          </div>
          <error-badge name="last_name" :validate="getOnboardingAuthErrors?getOnboardingAuthErrors:{}" />
          <div
            v-if="currentSettings && !currentSettings.register_reduced"
            id="birthdate"
            class="d-md-flex align-items-center mt-3"
          >
            <label class="label-controler d-none d-md-grid">
              <span>{{ $t('i18n_data_de_nascimento') }}</span>
            </label>
            <label class="label-controler w-100 d-md-none">
              <span>{{ $t('i18n_data_de_nascimento') }}</span>
            </label>
            <div class="input-background-dark">
              <input
                id="dateinput"
                ref="birthdate"
                v-model="data.birthdate"
                :disabled="currentSettings.search"
                class="input-control fut-color-dynamic"
                type="date"
                :placeholder="$t('i18n_dd_mm_aaaa')"
                name="birthdate"
              >
            </div>
          </div>
          <error-badge name="birthdate" :validate="getOnboardingAuthErrors?getOnboardingAuthErrors:{}" />
        </div>
        <div v-if="currentSettings && currentSettings.address_on_register && !currentSettings.register_reduced" class="px-5 py-1 bg-background register-content">
          <div class="d-md-flex align-items-center mt-3">
            <label class="label-controler d-none d-md-grid">
              <span>CEP</span>
            </label>
            <label class="label-controler w-100 d-md-none">
              <span>CEP</span>
            </label>
            <div v-if="currentSettings" class="input-background-dark">
              <input
                id="zip"
                ref="zip"
                v-model="zipRaw"
                v-inputmask="'99999-999'"
                :disabled="currentSettings.search"
                class="input-control fut-color-dynamic"
                type="text"
                name="zip"
                @input="data.zip = sanatizeValue($event.target.value, ['-', '_'], '')"
              >
            </div>
          </div>
          <error-badge name="zip" :validate="getOnboardingAuthErrors?getOnboardingAuthErrors:{}" />
          <div v-if="locationSearch" class="d-md-flex align-items-center mt-3">
            <label class="label-controler d-none d-md-grid">
              <span>{{ $t('i18n_rua') }}</span>
            </label>
            <label class="label-controler w-100 d-md-none">
              <span>{{ $t('i18n_rua') }}</span>
            </label>
            <div class="input-background-dark">
              <input
                id="street"
                ref="street"
                v-model="data.street"
                class="input-control fut-color-dynamic"
                type="text"
                name="street"
              >
            </div>
          </div>
          <error-badge name="street" :validate="getOnboardingAuthErrors?getOnboardingAuthErrors:{}" />
          <div v-if="locationSearch" class="d-md-flex align-items-center mt-3">
            <label class="label-controler d-none d-md-grid">
              <span>{{ $t('i18n_bairro') }}</span>
            </label>
            <label class="label-controler w-100 d-md-none">
              <span>{{ $t('i18n_bairro') }}</span>
            </label>
            <div class="input-background-dark">
              <input
                id="neighborhood"
                ref="neighborhood"
                v-model="data.neighborhood"
                class="input-control fut-color-dynamic"
                type="text"
                name="neighborhood"
              >
            </div>
          </div>
          <error-badge name="neighborhood" :validate="getOnboardingAuthErrors?getOnboardingAuthErrors:{}" />
          <div v-if="locationSearch" class="d-md-flex align-items-center mt-3">
            <label class="label-controler d-none d-md-grid">
              <span>{{ $t('i18n_numero') }}</span>
            </label>
            <label class="label-controler w-100 d-md-none">
              <span>{{ $t('i18n_numero') }}</span>
            </label>
            <div class="input-background-dark">
              <input
                id="number"
                ref="number"
                v-model="data.number"
                class="input-control fut-color-dynamic"
                type="text"
                name="number"
              >
            </div>
          </div>
          <error-badge name="number" :validate="getOnboardingAuthErrors?getOnboardingAuthErrors:{}" />
          <div v-if="!locationSearch" class="mt-3">
            <fb-fut-button ref="checkZip" class="button-search sm w-100" @click="searchAddress(data.zip)">
              <span class="fw-bold">{{ $t('i18n_buscar') }} {{ $t('i18n_endereco') }}</span>
            </fb-fut-button>
          </div>
        </div>
        <!-- Step - 3 -->
        <div class="px-5 py-1 bg-background register-content">
          <div v-if="currentSettings && !currentSettings.hide_username_on_register" class="d-md-flex align-items-center mt-3">
            <label class="label-controler d-none d-md-grid">
              <span>{{ $t('i18n_nome_do_usuario') }}</span>
            </label>
            <label class="label-controler d-md-none w-100">
              <span>{{ $t('i18n_nome_do_usuario') }}</span>
            </label>
            <div class="input-background-dark">
              <input
                v-if="currentSettings"
                id="username"
                v-model="data.username"
                :disabled="currentSettings.search && !validCpf"
                class="input-control fut-color-dynamic"
                type="text"
                required
              >
            </div>
          </div>
          <error-badge name="username" :validate="getOnboardingAuthErrors?getOnboardingAuthErrors:{}" />
          <div class="d-md-flex align-items-center mt-3">
            <label class="label-controler">Email</label>
            <div class="input-background-dark">
              <input
                v-if="currentSettings"
                ref="email"
                v-model="data.email"
                :disabled="currentSettings.search && !validCpf"
                class="input-control fut-color-dynamic"
                type="email"
                required
                placeholder="exemplo@gmail.com"
                name="email"
              >
            </div>
          </div>
          <error-badge name="email" :validate="getOnboardingAuthErrors?getOnboardingAuthErrors:{}" />
          <div class="d-md-flex align-items-center mt-3">
            <label class="label-controler">{{ $t('i18n_telefone') }}</label>
            <div class="input-background-dark">
              <input
                v-if="currentSettings"
                ref="phone"
                v-model="data.phone"
                v-inputmask="'(99) 9 9999-9999'"
                :disabled="currentSettings.search && !validCpf"
                class="input-control fut-color-dynamic"
                type="text"
                placeholder="(xx) x xxxx-xxxx"
                required
                name="phone"
              >
            </div>
          </div>
          <error-badge name="phone" :validate="getOnboardingAuthErrors?getOnboardingAuthErrors:{}" />
          <div class="d-md-flex align-items-center mt-3">
            <label class="label-controler">{{ $t('i18n_senha') }}</label>
            <div class="input-background-dark">
              <input
                v-if="currentSettings"
                id="password"
                v-model="data.password"
                :disabled="currentSettings.search && !validCpf"
                :type="passwordType"
                class="input-control-password fut-color-dynamic"
                required
                :placeholder="`${$t('i18n_minimo')} 8 ${$t('i18n_caracteres')}`"
                name="password"
                @focus="passwordFocussed = true"
              >
              <fb-fut-button class="border-0 bg-transparent" @click="showPassword()">
                <font-awesome-icon v-if="passwordType === 'text'" class="text-white" :icon="['fas', 'eye']" />
                <font-awesome-icon v-else class="text-white" :icon="['fas', 'eye-slash']" />
              </fb-fut-button>
            </div>
          </div>
          <error-badge name="password" :validate="getOnboardingAuthErrors?getOnboardingAuthErrors:{}" />
          <div v-if="passwordFocussed" class="password-checklist text-white fut-color-dynamic">
            <p
              :class="['mb-0', checkPasswordCharacters]"
            >
              <small><font-awesome-icon :icon="['far', 'check-circle']" /> {{ $t('i18n_letras_e_numeros') }}.</small>
            </p>
            <p :class="['mb-0', checkPasswordLength]">
              <small><font-awesome-icon :icon="['far', 'check-circle']" /> 8 {{ $t('i18n_digitos') }}.</small>
            </p>
            <p v-if="differentPass" class="mb-0 text-danger">
              <small><font-awesome-icon class="me-1" :icon="['far', 'times-circle']" />{{ $t('i18n_senha_de_confirmacao') }}</small>
            </p>
          </div>
          <div class="d-md-flex align-items-center mt-3">
            <label class="label-controler">{{ $t('i18n_confirme_a_senha') }}</label>
            <div class="input-background-dark">
              <input
                v-if="currentSettings"
                id="password_confirmation"
                v-model="data.password_confirmation"
                :type="passwordType"
                :disabled="currentSettings.search && !validCpf"
                required
                :placeholder="`${$t('i18n_minimo')} 8 ${$t('i18n_caracteres')}`"
                name="password"
                class="input-control-password fut-color-dynamic"
              >
              <fb-fut-button class="border-0 bg-transparent" @click="showPassword()">
                <font-awesome-icon v-if="passwordType === 'text'" class="text-white" :icon="['fas', 'eye']" />
                <font-awesome-icon v-else class="text-white" :icon="['fas', 'eye-slash']" />
              </fb-fut-button>
            </div>
          </div>
          <error-badge name="password_confirmation" :validate="getOnboardingAuthErrors?getOnboardingAuthErrors:{}" />
          <div class="d-md-flex align-items-center mt-3">
            <label class="label-controler d-none d-md-grid">
              <span>{{ $t('i18n_codigo_de_cadastro') }}</span>
            </label>
            <label class="label-controler d-md-none w-100">
              <span>{{ $t('i18n_codigo_de_cadastro') }}</span>
            </label>
            <div class="input-background-dark">
              <input
                v-if="currentSettings"
                v-model="data.ref"
                :readonly="readonly"
                :disabled="currentSettings.search && !validCpf"
                type="text"
                :placeholder="`(${$t('i18n_opcional')})`"
                class="input-control fut-color-dynamic"
              >
            </div>
          </div>
          <error-badge name="ref" :validate="getOnboardingAuthErrors?getOnboardingAuthErrors:{}" />
          <div class="d-flex mt-2">
            <input id="check" class="me-2 form-check-input" required type="checkbox">
            <label for="check" class="text-gray-low" style="padding-bottom: 0">{{ $t('i18n_sou_maior_de_18_anos') }}. {{ $t('i18n_li_e_aceitei_os_termos') }} <fb-fut-button class="text-gray-low" style="padding-bottom: 0; text-decoration: underline;" target="_blank" to="/help/?slug=terms">{{ $t('i18n_termos_e_condicoes') }}</fb-fut-button></label>
          </div>
          <div class="d-flex align-items-center">
            <fb-fut-button :disabled="getOnboardingAuthLoading" class="button-prev my-4 me-1 fut-color-dynamic" @click="stepNext(2)">
              <span class="fw-bold">{{ $t('i18n_voltar').toUpperCase() }} <font-awesome-icon v-if="getOnboardingAuthLoading" class="spinner-class" :icon="['fas', 'circle-notch']" /></span>
            </fb-fut-button>
            <fb-fut-button :disabled="getOnboardingAuthLoading" class="button-next my-4 ms-1" type="submit">
              <span class="fw-bold text-white">{{ $t('i18n_registrar').toUpperCase() }} <font-awesome-icon v-if="getOnboardingAuthLoading" class="spinner-class" :icon="['fas', 'circle-notch']" /></span>
            </fb-fut-button>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import ErrorBadge from '@/components/default/atoms/ErrorBadge.vue'
import FbFutButton from '@/components/fb/atoms/FbFutButton.vue'

export default {
  name: 'FbRegister',
  components: {
    ErrorBadge,
    FbFutButton
  },
  data () {
    return {
      steps: 1,
      passwordType: 'password',
      passwordFocussed: false,
      documentRaw: '',
      zipRaw: null,
      locationSearch: false,
      validCpf: false,
      rawDate: null,
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
        security_code_confirmation: ''
      },
      fullname: '',
      date: {
        day: null,
        month: null,
        year: null
      },
      differentPass: false,
      verifyTimeout: null
    }
  },
  computed: {
    ...mapGetters({
      currentSettings: 'settings/currentSettings',
      getOnboardingAuthErrors: 'onboarding-auth/getOnboardingAuthErrors',
      getOnboardingAuthLoading: 'onboarding-auth/getOnboardingAuthLoading',
      getOnboardingAuthAddress: 'onboarding-auth/getOnboardingAuthAddress'
    }),
    checkPasswordLength () {
      return (this.data.password.length >= 8) ? 'text-success' : 'text-white-50'
    },
    checkPasswordCharacters () {
      return (/[0-9]/.test(this.data.password) && (/[A-Z]/.test(this.data.password) || /[a-z]/.test(this.data.password))) ? 'text-success' : 'text-white-50'
    }
  },
  watch: {
    'data.zip' (val) {
      if (val && val.length >= 8) {
        this.$refs.checkZip.$el.click()
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
    getOnboardingAuthAddress (val) {
      if (val) {
        this.data.street = val.logradouro
        this.data.neighborhood = val.bairro
      }
    }
  },
  created () {
    this.$store.commit('onboarding-auth/SET_ERRORS', null)
  },
  mounted () {
    if (this.$route.params.ref) {
      this.data.ref = this.$route.params.ref
      this.readonly = true
    }

    const dtt = document.getElementById('dateinput')

    if (dtt) {
      dtt.onfocus = function () {
        this.type = 'date'
        this.focus()
      }
    }
  },
  beforeDestroy () {
    clearTimeout(this.verifyTimeout)
  },
  methods: {
    ...mapActions({
      registerUser: 'onboarding-auth/registerUser',
      updatePopupStatus: 'layout/updatePopupStatus',
      validateUserCpf: 'onboarding-auth/validateUserCpf',
      fetchAddressData: 'onboarding-auth/fetchAddressData'
    }),
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
    searchAddress (cep) {
      if (!cep) {
        this.$toast.open({ message: 'Digite um cep válido!', type: 'warning' })
        return
      }

      this.fetchAddressData(cep)

      this.locationSearch = true
    },
    validateCpf (doc) {
      if (this.currentSettings && !this.currentSettings.search) {
        this.stepNext(2)
        return
      }
      this.validateUserCpf(doc).then((result) => {
        if (result.Result.DataNascimento.split('T')[0]) {
          const theDate = result.Result.DataNascimento.split('T')[0].split('-')
          this.rawDate = result.Result.DataNascimento
          this.date.day = theDate[2]
          this.date.month = theDate[1]
          this.date.year = theDate[0]
        } else {
          this.date.day = new Date(result.Result.DataNascimento).getDate() + 1
          this.date.month = new Date(result.Result.DataNascimento).getMonth() + 1
          this.date.year = new Date(result.Result.DataNascimento).getFullYear() + ''
        }
        this.$toast.open({ message: 'CPF validado com sucesso', type: 'success' })
        this.validCpf = true
        this.fullname = result.Result.NomePessoaFisica
        this.data.name = result.Result.NomePessoaFisica.split(' ')[0]
        this.data.last_name = result.Result.NomePessoaFisica.replace(result.Result.NomePessoaFisica.split(' ')[0], '')
        this.data.document = doc
        this.data.birthdate = this.date.year + '-' + this.date.month + '-' + this.date.day
        console.log('user validated', { data: this.data, result })
        this.stepNext(2)
      })
    },
    stepNext  (number) {
      this.steps = number
    },
    showPassword () {
      this.passwordType === 'password' ? this.passwordType = 'text' : this.passwordType = 'password'
    },
    submitRegister () {
      if (this.currentSettings && !this.currentSettings.search) {
        this.data.document = this.documentRaw
      }
      if (this.rawDate) {
        this.data.birthdate = new Date(this.date.year, this.date.month, this.date.day)
        this.data.birthdate = this.rawDate
      }
      this.registerUser(this.data).then((result) => {
        localStorage.setItem('token', 'bearer ' + result.data)
        this.updatePopupStatus(true)
        this.$router.push(this.localePath('/user/bank/deposito'))
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/layout/breakpoints";

.main-content {
  width: 100%;
}
.register-content {
  width: 95vw;
  @include md {
    width: 494px;
  }
  height: auto;
  .step-styles {
    width: 100%;
  }
  .text-gray {
    color: #8a8b8d;
    font-size: 24px;
    padding-bottom: 30px;
  }
  .text-gray-low {
    color: #8a8b8d;
    font-size: 15px;
    padding-bottom: 30px;
  }
  .label-controler {
    width: 20%;
    color: #8a8b8d;
    font-size: 13px;
  }
  .input-background-dark {
    background: transparent;
    width: 100%;
    padding: 2% 3%;
    border: 1px solid var(--fut-background-lightest);
    color: white;
    .input-control {
      background-color: transparent;
      border: none;
      color: white;
      width: 90%;
      outline: none;
      &::placeholder {
        color: rgba(255, 255, 255, 0.356);
      }
      &:disabled{
        opacity: .7;
      }
    }
    .input-control-password {
      background-color: transparent;
      border: none;
      color: white;
      width: 80%;
      outline: none;
      &::placeholder {
        color: rgba(255, 255, 255, 0.356);
      }
    }
    @include md {
      width: 80%;
      background-color: var(--fut-background-darker);
    }
  }
  .input-background-light {
    background-color: white;
    width: 100%;
    padding: 2% 3%;
    border: 1px solid var(--fut-background-lightest);
    color: var(--fut-background-darker);
    .input-control {
      background-color: transparent;
      width: 90%;
      border: none;
      color: var(--fut-background-darker);
      outline: none;
      &::placeholder {
        color: var(--fut-background-darker);
      }
    }
    @include md {
      width: 80%;
    }
  }
  .button-search {
    background-image: linear-gradient(to right, var(--fut-primary), var(--fut-secondary));
    border: none;
    border-radius: 5px;
    height: 42px;
    @include _md {
      height: 40px;
      top: 23px;
    }
    color: var(--fut-background-darker);
    font-size: 12px;
  }
  .button-validate {
    background-image: linear-gradient(to right, var(--fut-primary), var(--fut-secondary));
    border: none;
    border-radius: 5px;
    height: 42px;
    position: absolute;
    right: 0;
    @include _md {
      height: 40px;
      top: 23px;
    }
    color: var(--fut-background-darker);
    font-size: 12px;
  }
  .button-next {
    background-image: linear-gradient(to right, var(--fut-primary), var(--fut-secondary));
    border: none;
    border-radius: 5px;
    width: 100%;
    height: 55px;
    color: var(--fut-background-darker);
    &.sm{
      width: initial;
      height: 42px;
      font-size: 12px;
    }
    &:disabled{
      opacity: .6;
    }
  }
  .button-prev {
    border: 1px solid var(--fut-primary);
    background: transparent;
    border-radius: 5px;
    width: 100%;
    height: 55px;
    color: white;
    &.sm{
      width: initial;
      height: 42px;
      font-size: 12px;
    }
    &:disabled{
      opacity: .6;
    }
  }
}
.bg-danger-light {
  background-color: rgb(230, 171, 171);
  border: 1px solid red;
  span {
    font-size: 13px;
  }
}
.password-checklist{
  @include md {
    margin-left: 20%;
  }
  font-size: 12px;
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
#dateinput::-webkit-calendar-picker-indicator {
  filter: invert(1);
  opacity: .5;
}
.text-info{
  opacity: .9;
  font-size: 12px;
  margin-left: auto;
  @include md {
    max-width: 80%;
  }
}
.logo {
  width: 100%;
  height: 39px;
  max-width: 120px;
  @include md {
    max-width: initial;
    width: 200px;
    height: 72px;
  }
}
</style>

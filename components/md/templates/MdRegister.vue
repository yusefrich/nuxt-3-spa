<template>
  <div class="register-bg">
    <section>
      <div class="register-banner" />
      <div class="register-form fut-scrollbar px-4 py-3">
        <NuxtLink :to="localePath('/')">
          <img class="sidebar-logo mb-3" :src="currentSettings.logo" alt="Logo">
        </NuxtLink>
        <h5 class="text-muted fw-normal mb-2">
          {{ $t('i18n_crie_uma_conta_gratis') }}
        </h5>
        <form @submit.prevent="submitRegister()">
          <div v-if="currentSettings && currentSettings.register_columns.includes('cpf')" class="mb-2 cpf-input">
            <label :for="currentSettings.search ? 'cpf' : 'document'" class="form-label">CPF</label>
            <input
              :id="currentSettings.search ? 'cpf' : 'document'"
              ref="document"
              v-model="documentRaw"
              v-mask="['###.###.###-##']"
              type="text"
              class="form-control"
              placeholder="CPF"
              required
            >
            <button
              v-if="currentSettings && currentSettings.search"
              ref="validateCpf"
              class="button-validate"
              type="button"
              :disabled="getOnboardingAuthLoading"
              @click="()=>validateCpf(documentRaw)"
            >
              <span class="fw-bold">{{ $t('i18n_continuar').toUpperCase() }} <font-awesome-icon v-if="getOnboardingAuthLoading" class="spinner-class" :icon="['fas', 'circle-notch']" /></span>
            </button>
            <p v-if="currentSettings && currentSettings.search" class="text-info">
              <small v-if="documentRaw && documentRaw === infos.document" class="text-success fw-bold pb-2"><font-awesome-icon :icon="['fas', 'check']" /> {{ $t('i18n_documento_valido') }}</small>
              <br v-if="documentRaw && documentRaw === infos.document">
              <small>{{ $t('i18n_informe_os_dados_corretamente') }}</small>
            </p>
            <error-badge :name="currentSettings.search ? 'cpf' : 'document'" :validate="getOnboardingAuthErrors?getOnboardingAuthErrors:{}" />
          </div>
          <div v-if="currentSettings && currentSettings.register_columns.includes('name')" class="mb-2">
            <label
              for="userFirstName"
              class="form-label"
            >
              {{ $t('i18n_primeiro') }} {{ $t('i18n_nome') }}
            </label>
            <input
              id="name"
              ref="name"
              v-model="infos.name"
              :disabled="currentSettings.search && !validCpf"
              type="text"
              class="form-control"
              :placeholder="`${$t('i18n_primeiro')} ${$t('i18n_nome')}`"
            >
            <error-badge name="name" :validate="getOnboardingAuthErrors?getOnboardingAuthErrors:{}" />
          </div>
          <div v-if="currentSettings && currentSettings.register_columns.includes('last_name')" class="mb-2">
            <label
              for="userLastName"
              class="form-label"
            >
              {{ $t('i18n_sobrenome') }}
            </label>
            <input
              id="last_name"
              ref="name"
              v-model="infos.last_name"
              :disabled="currentSettings.search && !validCpf"
              type="text"
              class="form-control"
              :placeholder="$t('i18n_sobrenome')"
            >
            <error-badge name="last_name" :validate="getOnboardingAuthErrors?getOnboardingAuthErrors:{}" />
          </div>
          <div v-if="currentSettings && currentSettings.register_columns.includes('birthdate')" class="mb-2">
            <label for="birthDate" class="form-label">{{ $t('i18n_data_de_nascimento') }}</label>
            <div
              id="birthdate"
              ref="birthdate"
              class="selects"
            >
              <select
                id="selectDay"
                v-model="date.day"
                :disabled="currentSettings.search && !validCpf"
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
                :disabled="currentSettings.search && !validCpf"
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
                :disabled="currentSettings.search && !validCpf"
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
            <error-badge name="birthdate" :validate="getOnboardingAuthErrors?getOnboardingAuthErrors:{}" />
          </div>
          <div v-if="currentSettings && currentSettings.register_columns.includes('country')" class="mb-2">
            <label for="country" class="form-label">{{ $t('i18n_pais_de_residencia') }}</label>
            <div class="selects">
              <select
                id="country"
                v-model="infos.country"
                :disabled="currentSettings.search && !validCpf"
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
          </div>
          <div v-if="currentSettings && currentSettings.register_columns.includes('email')" class="mb-2">
            <label for="email" class="form-label">Email</label>
            <input
              id="email"
              ref="email"
              v-model="infos.email"
              :disabled="currentSettings.search && !validCpf"
              type="email"
              class="form-control"
              placeholder="Email"
              required
            >
            <error-badge name="email" :validate="getOnboardingAuthErrors?getOnboardingAuthErrors:{}" />
          </div>
          <div v-if="currentSettings && currentSettings.register_columns.includes('phone')" class="mb-2">
            <label for="phone" class="form-label">{{ $t('i18n_numero_de_telefone') }}</label>
            <input
              id="phone"
              ref="phone"
              v-model="infos.phone"
              v-mask="['(##) #####-####']"
              :disabled="currentSettings.search && !validCpf"
              type="text"
              class="form-control"
              :placeholder="$t('i18n_numero_de_telefone')"
            >
            <error-badge name="phone" :validate="getOnboardingAuthErrors?getOnboardingAuthErrors:{}" />
          </div>
          <div v-if="currentSettings && currentSettings.register_columns.includes('zip')" class="mb-2">
            <label for="zip" class="form-label">CEP</label>
            <input
              id="zip"
              ref="zip"
              v-model="zipRaw"
              v-mask="['#####-###']"
              :disabled="currentSettings.search && !validCpf"
              type="text"
              class="form-control"
              placeholder="CEP"
              @input="infos.zip = sanatizeValue($event.target.value, ['-', '_'], '')"
            >
            <error-badge name="zip" :validate="getOnboardingAuthErrors?getOnboardingAuthErrors:{}" />
          </div>
          <div v-if="currentSettings && currentSettings.register_columns.includes('zip')" class="mb-2">
            <label for="street" class="form-label">{{ $t('i18n_rua') }}</label>
            <input
              id="street"
              ref="street"
              v-model="infos.street"
              :disabled="currentSettings.search && !validCpf"
              type="text"
              class="form-control"
              :placeholder="$t('i18n_rua')"
            >
            <error-badge name="street" :validate="getOnboardingAuthErrors?getOnboardingAuthErrors:{}" />
          </div>
          <div v-if="currentSettings && currentSettings.register_columns.includes('zip')" class="mb-2">
            <label for="neighborhood" class="form-label">{{ $t('i18n_bairro') }}</label>
            <input
              id="neighborhood"
              ref="neighborhood"
              v-model="infos.neighborhood"
              :disabled="currentSettings.search && !validCpf"
              type="text"
              class="form-control"
              :placeholder="$t('i18n_bairro')"
            >
            <error-badge name="neighborhood" :validate="getOnboardingAuthErrors?getOnboardingAuthErrors:{}" />
          </div>
          <div v-if="currentSettings && currentSettings.register_columns.includes('zip')" class="mb-2">
            <label for="number" class="form-label">{{ $t('i18n_numero') }}</label>
            <input
              id="number"
              ref="number"
              v-model="infos.number"
              :disabled="currentSettings.search && !validCpf"
              type="number"
              class="form-control"
              :placeholder="$t('i18n_numero')"
            >
            <error-badge name="number" :validate="getOnboardingAuthErrors?getOnboardingAuthErrors:{}" />
          </div>
          <div v-if="currentSettings && currentSettings.register_columns.includes('username')" class="mb-2">
            <label for="username" class="form-label">{{ $t('i18n_nome_do_usuario') }}</label>
            <input
              id="username"
              v-model="infos.username"
              :disabled="currentSettings.search && !validCpf"
              type="text"
              class="form-control"
              :placeholder="$t('i18n_nome_do_usuario')"
            >
            <error-badge name="username" :validate="getOnboardingAuthErrors?getOnboardingAuthErrors:{}" />
          </div>
          <div class="mb-2">
            <label for="password" class="form-label">{{ $t('i18n_senha') }}</label>
            <input
              id="password"
              v-model="infos.password"
              :disabled="currentSettings.search && !validCpf"
              type="password"
              required
              name="password"
              class="form-control"
              autocomplete="current-password"
              :placeholder="$t('i18n_senha')"
              @focus="passwordFocussed = true"
            >
            <div v-if="passwordFocussed" class="password-checklist ms-2">
              <p class="mb-0">
                <small>{{ $t('i18n_sua_senha_precisa_conter') }}:</small>
              </p>
              <p :class="['mb-0', `${(checkIfPasswordHas('uppercase', infos.password) || checkIfPasswordHas('lowercase', infos.password)) && checkIfPasswordHas('numbers', infos.password) ? 'text-success' : 'text-danger'}`]">
                <small><font-awesome-icon :icon="['far', 'check-circle']" /> {{ $t('i18n_letras_e_numeros') }}.</small>
              </p>
              <p :class="['mb-0', `${checkIfPasswordHas('length', infos.password) ? 'text-success' : 'text-danger'}`]">
                <small><font-awesome-icon :icon="['far', 'check-circle']" /> 8 {{ $t('i18n_digitos') }}.</small>
              </p>
              <p v-if="differentPass" class="mb-0 text-danger">
                <small><font-awesome-icon class="me-1" :icon="['far', 'times-circle']" />{{ $t('i18n_senha_de_confirmacao') }}</small>
              </p>
            </div>
            <error-badge name="password" :validate="getOnboardingAuthErrors?getOnboardingAuthErrors:{}" />
          </div>
          <div class="mb-2">
            <label for="password_confirmation" class="form-label">{{ $t('i18n_confirme_a_senha') }}</label>
            <input
              id="password_confirmation"
              v-model="infos.password_confirmation"
              required
              type="password"
              :disabled="currentSettings.search && !validCpf"
              class="form-control"
              autocomplete="current-password"
              :placeholder="$t('i18n_senha')"
            >
            <error-badge name="password_confirmation" :validate="getOnboardingAuthErrors?getOnboardingAuthErrors:{}" />
          </div>
          <div v-if="currentSettings && currentSettings.register_columns.includes('ref')" class="mb-2">
            <label for="ref" class="form-label">{{ $t('i18n_codigo') }}</label>
            <input
              id="ref"
              v-model="infos.ref"
              type="text"
              class="form-control"
              :placeholder="$t('i18n_opcional')"
              :disabled="currentSettings.search && !validCpf"
              :readonly="readonly"
            >
            <error-badge name="ref" :validate="getOnboardingAuthErrors?getOnboardingAuthErrors:{}" />
          </div>
          <div v-if="currentSettings && currentSettings.register_columns.includes('code_casino')" class="mb-2">
            <label for="code_casino" class="form-label">{{ $t('i18n_bonus_de_casino') }}</label>
            <input
              id="code_casino"
              v-model="infos.code_casino"
              type="text"
              class="form-control"
              :placeholder="$t('i18n_opcional')"
              :disabled="currentSettings.search && !validCpf"
              :readonly="readonly"
            >
            <error-badge name="code_casino" :validate="getOnboardingAuthErrors?getOnboardingAuthErrors:{}" />
          </div>
          <div class="form-check mb-2">
            <input
              id="authCheck"
              type="checkbox"
              class="form-check-input"
              required
            >
            <label class="form-check-label" for="authCheck">
              {{ $t('i18n_ao_marcar_esta_caixa') }} <a :href="localePath('/termos-e-condicoes')" target="blank">{{ $t('i18n_termos_e_condicoes') }}</a> {{ $t('i18n_e') }} <a :href="localePath('/privacidade')" target="blank">{{ $t('i18n_a') }} {{ $t('i18n_politica_de_privacidade') }}</a> {{ $t('i18n_e_declaro_que_sou_maior') }}
            </label>
          </div>
          <div>
            <button
              type="submit"
              :disabled="currentSettings.search && !validCpf"
              class="btn btn-primary me-2 mb-2 mb-md-0 text-white"
            >
              <span class="fw-bold text-white">{{ $t('i18n_registrar').toUpperCase() }} <font-awesome-icon v-if="getOnboardingAuthLoading" class="spinner-class" :icon="['fas', 'circle-notch']" /></span>
            </button>
          </div>
          <NuxtLink :to="localePath('/login')" class="d-block mt-2 text-muted">
            {{ $t('i18n_ja_tem_conta', 2) }}
          </NuxtLink>
        </form>
      </div>
    </section>
    <div class="redirect-btns">
      <NuxtLink class="links" :to="localePath('/')">
        <font-awesome-icon :icon="['fas', 'chevron-left']" />
        {{ $t('i18n_voltar') }}
      </NuxtLink>
      <NuxtLink class="links" to="#">
        <font-awesome-icon :icon="['fas', 'book']" />
        {{ $t('i18n_termos_de_uso') }}
      </NuxtLink>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'pinia'
import { useLayoutStore } from '@/stores/layout'
import { useSettingsStore } from '@/stores/settings'
import { useOnboardingAuthStore } from '@/stores/onboarding-auth'

import utils from '@/utils/utils'
import ErrorBadge from '@/components/default/atoms/ErrorBadge.vue'

export default {
  name: 'MdRegister',
  components: {
    ErrorBadge
  },
  data () {
    return {
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
      infos: {
        document: '',
        name: '',
        last_name: '',
        birthdate: '',
        country: 'br',
        email: '',
        phone: '',
        zip: '',
        street: '',
        neighborhood: '',
        number: '',
        username: '',
        password: '',
        password_confirmation: '',
        ref: '',
        code_casino: '',
        token: ''
      },
      documentRaw: '',
      zipRaw: '',
      validCpf: false,
      differentPass: false,
      verifyTimeout: null,
      readonly: false
    }
  },
  computed: {
    ...mapState(useSettingsStore, {
      currentSettings: 'currentSettings'
    }),
    ...mapState(useOnboardingAuthStore, {
      getOnboardingAuthErrors: 'getOnboardingAuthErrors',
      getOnboardingAuthLoading: 'getOnboardingAuthLoading'
    })
  },
  watch: {
    documentRaw (val) {
      if (val && !val.includes('_')) {
        this.$refs.validateCpf.click()
      }
    },
    'infos.password_confirmation' () {
      if (this.verifyTimeout) {
        this.differentPass = false
        clearTimeout(this.verifyTimeout)
      }

      this.verifyTimeout = setTimeout(() => {
        if (this.infos.password_confirmation !== this.infos.password) {
          this.differentPass = true
        }
      }, 1000)
    }
  },
  created () {
    this.clearAuthErrors()
  },
  mounted () {
    if (this.$route.query.ref || localStorage.getItem('ref')) {
      this.infos.ref = this.$route.query.ref || localStorage.getItem('ref')
      this.readonly = true
    }
    if (this.$route.query.btag || localStorage.getItem('btag')) {
      this.infos.token = this.$route.query.btag || localStorage.getItem('btag')
      this.readonly = true
    }

    for (let i = new Date().getFullYear(); i > 1900; i--) {
      this.years.push({ label: i, value: i })
    }

    this.countries = utils.listOfCountries()
  },
  beforeDestroy () {
    clearTimeout(this.verifyTimeout)
  },
  methods: {
    ...mapActions(useLayoutStore, {
      updatePopupStatus: 'updatePopupStatus'
    }),
    ...mapActions(useOnboardingAuthStore, {
      registerUser: 'registerUser',
      validateUserCpf: 'validateUserCpf',
      clearAuthErrors: 'clearAuthErrors'
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
    validateCpf (doc) {
      if (this.currentSettings && !this.currentSettings.search) {
        return
      }
      this.validateUserCpf(doc).then((result) => {
        this.$toast.open({ message: 'CPF validado com sucesso', type: 'success' })
        this.infos.document = doc
        this.validCpf = true
        this.infos.name = result.Result.NomePessoaFisica.split(' ')[0]
        this.infos.last_name = result.Result.NomePessoaFisica.replace(result.Result.NomePessoaFisica.split(' ')[0], '')
        this.date.day = new Date(result.Result.DataNascimento).getDate() + 1
        this.date.month = new Date(result.Result.DataNascimento).getMonth()
        this.date.year = new Date(result.Result.DataNascimento).getFullYear() + ''
        this.infos.birthdate = this.date.day + '/' + this.date.month + '/' + this.date.year
      })
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
    submitRegister () {
      if (this.currentSettings && !this.currentSettings.search) {
        this.infos.document = this.documentRaw
      }
      this.infos.birthdate = new Date(this.date.year, this.date.month, this.date.day)
      this.registerUser(this.infos).then((result) => {
        localStorage.removeItem('btag')
        localStorage.removeItem('ref')
        localStorage.setItem('token', 'bearer ' + result.data)
        // check if has poopup
        this.updatePopupStatus(true)

        if (this.$route.query.from) {
          this.$router.push(this.localePath(this.$route.query.from))

          return
        }

        this.$router.push(this.localePath('/'))
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/layout/breakpoints";

.register-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: var(--md-bg-color);
  z-index: 1000;
  min-height: 665px;
  overflow: auto;

  display: flex;
  justify-content: center;
  align-items: center;
  overflow-y: auto;

  section {
    display: flex;
    width: 50%;
    background: var(--md-comp-bg-color);
    border: 1px solid var(--md-comp-border-color);
    -webkit-box-shadow: 0 0 10px 0 var(--md-shadow-color);
    box-shadow: 0 0 10px 0 var(--md-shadow-color);

    .register-banner {
      width: 10%;
      background: var(--fut-primary);
      // background-image: url('/md/bet-apostas.webp');
      // background-position: center;
      // background-size: cover;
    }

    .register-form {
      width: 100%;
      height: 100%;
      max-height: 90vh;
      min-height: 500px;
      overflow: auto;

      .sidebar-logo {
        max-height: 60px;
        max-width: 150px;
        background-size: cover;
        background: var(--fut-background-logo);
        padding: 4px;
        border-radius: 4px;
      }
      .text-muted {
        font-size: 17px;
      }
      .form-label, .form-check-label, .password-checklist {
        color: var(--md-font-color);
        font-size: 15px;
      }
      .form-control {
        border: 1px solid var(--md-comp-border-color);
        background: var(--md-comp-bg-color);
        color: var(--md-font-color);
        box-shadow: 0 0 0 0;
      }
      .selects {
        width: 100%;
        display: flex;
      }
      .btn-primary {
        background: var(--fut-primary);
        &:hover {
          background: var(--fut-primary-lightest);
        }
        &:active {
          background: var(--fut-primery-darker);
        }
      }
      .btn-outline-primary {
        color: var(--fut-primary);
        border-color: var(--fut-primary);

        &:hover {
          color: #fff;
          background: var(--fut-primary);
          border-color: var(--fut-primary);
        }
      }
      a {
        text-decoration: none;
      }
    }
  }

  .redirect-btns {
    position: absolute;
    right: 55px;
    bottom: 30px;
    .links {
      text-decoration: none;
      color: #fff;
      padding: 10px 15px;
      border-radius: 4px;
      &:first-child {
        background: #FF3366;
        margin-right: 4px;
        &:hover {
          background: #d72b56;
        }
        &:active {
          background: #FF336699;
        }
      }
      &:last-child {
        background: var(--fut-primary);
        &:hover {
          background: var(--fut-primary-darkest);
        }
        &:active {
          background: var(--fut-primary-lightest);
        }
      }
    }
  }
}

.text-info{
  small {
    color: var(--md-font-color);
  }
  opacity: .9;
  font-size: 12px;
  margin: 5px 10px;
  @include md {
    max-width: 80%;
  }
}

.spinner-class{
  animation-name: spin;
  animation-duration: 500ms;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
}

.cpf-input {
  position: relative;
}
.button-validate {
  background-image: linear-gradient(to right, var(--fut-primary), var(--fut-secondary));
  border: none;
  border-radius: 5px;
  height: 42px;
  position: absolute;
  top: 29px;
  right: 0;
  @include _md {
    height: 40px;
    top: 23px;
  }
  color: var(--fut-background-darker);
  font-size: 12px;
}

@media(max-width: 768px) {
  .register-banner {
    display: none;
  }
  section {
    width: 100% !important;
    margin: 0 25px;
  }
}

@media (max-width: 425px) {
  section {
    margin: 0;
    height: 100%;
    align-items: center;
    .register-form {
      max-height: 100% !important;
      padding: 40px 0;
    }
  }
  .redirect-btns {
    right: 10px !important;
  }
}
</style>

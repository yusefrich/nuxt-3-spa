<template>
  <div class="container-fluid mx-0">
    <fut-register
      :errors="getOnboardingAuthErrors"
      :current-settings="currentSettings"
      :loading="getOnboardingAuthLoading"
      :user-data="getOnboardingAuthUserData"
      :address="getOnboardingAuthAddress"
      @validateCpf="validateCpf($event)"
      @searchAddress="searchAddress($event)"
      @register="register($event)"
    />
    <fut-modal class="text-center" fixed :open="warning" :title="$t('i18n_atencao')">
      <ul class="text-start">
        <li>
          {{ $t('i18n_a_aposta_gratis_de') }} R${{ getFreebetValue() }} {{ $t('i18n_deve_ser_usada_em_uma') }} {{ getFreebetMinOdd() }}.
        </li>
        <li>
          {{ $t('i18n_o_valor_maximo_que_pode') }} R${{ getFreebetReturnValue() }}, {{ $t('i18n_qualquer_valor_que_exceda') }}
        </li>
        <li>
          {{ $t('i18n_antes_de_sacar_os_lucros') }} R${{ getFreebetDepositValue() }} {{ $t('i18n_e_apostar_o_valor_depositado') }}
        </li>
      </ul>
      <div class="form-check text-start">
        <input
          id="flexCheckDefault"
          v-model="checked"
          class="form-check-input"
          type="checkbox"
        >
        <label class="form-check-label" for="flexCheckDefault">
          {{ $t('i18n_aceito_os_termos') }}
        </label>
      </div>
      <fut-button
        :disabled="!checked"
        primary
        rounded
        class="fw-bold"
        @click="goHome()"
      >
        {{ $t('i18n_continuar') }}
      </fut-button>
    </fut-modal>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import FutRegister from '@/components/default/molecules/FutRegister.vue'
import FutModal from '@/components/default/organisms/FutModal.vue'
import FutButton from '@/components/default/atoms/FutButton.vue'
import sportradarTagManager from '@/mixins.js/sportradarTagManager.js'

export default {
  name: 'Register',
  components: {
    FutRegister,
    FutModal,
    FutButton
  },
  mixins: [sportradarTagManager],
  data () {
    return {
      warning: false,
      checked: false
    }
  },
  computed: {
    ...mapGetters({
      currentSettings: 'settings/currentSettings',
      getOnboardingAuthErrors: 'onboarding-auth/getOnboardingAuthErrors',
      getOnboardingAuthLoading: 'onboarding-auth/getOnboardingAuthLoading',
      getOnboardingAuthUserData: 'onboarding-auth/getOnboardingAuthUserData',
      getOnboardingAuthAddress: 'onboarding-auth/getOnboardingAuthAddress'
    })
  },
  created () {
    this.$store.commit('onboarding-auth/SET_ERRORS', null)
  },
  methods: {
    ...mapActions({
      authUser: 'authUser',
      commitUser: 'commitUser',
      registerUser: 'onboarding-auth/registerUser',
      validateUserCpf: 'onboarding-auth/validateUserCpf',
      updatePopupStatus: 'layout/updatePopupStatus',
      fetchAddressData: 'onboarding-auth/fetchAddressData'
    }),
    validateCpf (cpf) {
      this.validateUserCpf(cpf)
    },
    searchAddress (cep) {
      this.fetchAddressData(cep)
    },
    register (payload) {
      this.registerUser(payload).then(() => {
        this.authUser().then((data) => {
          if (data) {
            this.commitUser(data)
            this.srtmRegistrationFinished(data.id)
          }

          this.updatePopupStatus(true)

          this.$router.push(this.localePath('/'))
        })
      })
    },
    goHome () {
      this.$router.push(this.localePath('/'))
    },
    getFreebetMinOdd () {
      return process.env.FREEBETODD ? process.env.FREEBETODD : 1.80
    },
    getFreebetValue () {
      return process.env.FREEBET ? process.env.FREEBET : 20
    },
    getFreebetReturnValue () {
      return process.env.FREEBETWITHDRAW ? process.env.FREEBETWITHDRAW : 50
    },
    getFreebetDepositValue () {
      return process.env.FREEBETDEPOSIT ? process.env.FREEBETDEPOSIT : 20
    }
  }
}
</script>

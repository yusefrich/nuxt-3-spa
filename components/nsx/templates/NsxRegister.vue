<template>
  <div class="bg-nsx-white">
    <div class="container pt-3">
      <nsx-register-form
        :current-settings="currentSettings"
        :errors="getOnboardingAuthErrors"
        :loading="getOnboardingAuthLoading"
        :user-data="getOnboardingAuthUserData"
        :address="getOnboardingAuthAddress"
        @validateCpf="validateCpf($event)"
        @searchAddress="searchAddress($event)"
        @register="data => register(data)"
      />
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import sportradarTagManager from '@/mixins.js/sportradarTagManager.js'
import NsxRegisterForm from '@/components/nsx/molecules/NsxRegisterForm.vue'

export default {
  name: 'NsxRegister',
  components: {
    NsxRegisterForm
  },
  mixins: [sportradarTagManager],
  computed: {
    ...mapGetters({
      currentSettings: 'settings/currentSettings',
      getErrors: 'errors/getErrors',
      getOnboardingAuthErrors: 'onboarding-auth/getOnboardingAuthErrors',
      getOnboardingAuthLoading: 'onboarding-auth/getOnboardingAuthLoading',
      getOnboardingAuthUserData: 'onboarding-auth/getOnboardingAuthUserData',
      getOnboardingAuthAddress: 'onboarding-auth/getOnboardingAuthAddress'
    })
  },
  created () {
    this.$store.commit('onboarding-auth/SET_ERRORS', null)
  },
  mounted () {
    this.clear()
  },
  methods: {
    ...mapActions({
      authUser: 'authUser',
      registerUser: 'onboarding-auth/registerUser',
      validateUserCpf: 'onboarding-auth/validateUserCpf',
      clear: 'errors/clear',
      fetchAddressData: 'onboarding-auth/fetchAddressData'
    }),
    validateCpf (cpf) {
      this.validateUserCpf(cpf)
    },
    register (payload) {
      this.registerUser(payload).then(() => {
        this.authUser().then((data) => {
          this.srtmRegistrationFinished(data.id)
          this.$router.push(this.localePath('/'))
        })
      })
    },
    searchAddress (cep) {
      this.fetchAddressData(cep)
    }
  }
}
</script>

<style lang="scss" scoped>
.bets-tickets{
  width: 250px;
}
.bets-content{
  width: 100%;
  &::-webkit-scrollbar-track {
    opacity: .3;
    border-radius: 0.125rem;
    background-color: var(--nsx-dark-7);
  }
  &::-webkit-scrollbar {
    opacity: .3;
    width: 13px;
  }
  &::-webkit-scrollbar-thumb {
    border: solid 2px var(--nsx-dark-7);
    opacity: .3;
    border-radius:50px;
    width: 5px;
    background-color: var(--nsx-dark-6);
  }
}
.event-holder{
  text-overflow: ellipsis;
  overflow: hidden;
}
.event-tite{
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.bg-bets{
  background: var(--nsx-dark-1);
}
</style>

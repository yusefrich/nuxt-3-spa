<template>
  <div class="container-fluid mx-0">
    <div class="password-container">
      <h4 class="text-white">
        {{ $t('i18n_alterar_senha') }}
      </h4>
      <br>
      <form
        @submit.prevent="sendForgotten()"
      >
        <label class="text-white text-start"><span class="required" />{{ $t('i18n_senha') }}: </label>
        <fut-input
          id="password"
          v-model="password"
          :nsx-input="true"
          :validate="getOnboardingAuthErrors ? getOnboardingAuthErrors : {}"
          nsx-validation
          name="password"
          type="password"
          class="mx-0 mt-2"
        />
        <label class="text-white text-start"><span class="required" />{{ $t('i18n_confirme_a_senha') }}: </label>
        <fut-input
          id="password_confirmation"
          v-model="password_confirmation"
          :validate="getOnboardingAuthErrors ? getOnboardingAuthErrors : {}"
          :nsx-input="true"
          nsx-validation
          name="password_confirmation"
          type="password"
          class="mx-0 mt-2"
        />
        <div class="text-end">
          <nsx-fut-button
            :loading="getOnboardingAuthLoading"
            type="submit"
            class="no-break mt-3 text-end mb-5 nsx-btn"
          >
            {{ $t('i18n_alterar_senha') }}
          </nsx-fut-button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import FutInput from '@/components/default/atoms/FutInput.vue'
import NsxFutButton from '@/components/nsx/atoms/NsxFutButton.vue'

export default {
  name: 'NsxUpdatePassword',
  components: {
    FutInput,
    NsxFutButton
  },
  props: {
    token: {
      type: String,
      default: ''
    },
    email: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      password: null,
      password_confirmation: null
    }
  },
  computed: {
    ...mapGetters({
      getOnboardingAuthLoading: 'onboarding-auth/getOnboardingAuthLoading',
      getOnboardingAuthErrors: 'onboarding-auth/getOnboardingAuthErrors'
    })
  },
  methods: {
    ...mapActions({
      sendForgottenPasswordUpdate: 'onboarding-auth/sendForgottenPasswordUpdate'
    }),
    sendForgotten () {
      this.sendForgottenPasswordUpdate({
        token: this.token,
        password: this.password,
        password_confirmation: this.password_confirmation,
        email: this.email
      })
    }
  }
}
</script>

<style scoped lang="scss">
  .password-container{
    margin-top: 10px;
    max-width: 500px;
    position: relative;
    left: 50%;
    transform: translateX(-50%);
    background: #343a40!important;
    border-radius: .25rem!important;
    padding: 15px;
  }
  h4{
    font-size: 20px;
  }
  .nsx-btn{
    background: linear-gradient(#ff8800,#ff6600);
    padding: .25rem .5rem;
    border-radius: .2rem !important;
    color: white;
  }
</style>

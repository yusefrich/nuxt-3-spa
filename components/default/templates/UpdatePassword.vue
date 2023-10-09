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
          name="password"
          :validate="getOnboardingAuthErrors ? getOnboardingAuthErrors : {}"
          type="password"
          class="mx-0 mt-2"
        />
        <label class="text-white text-start"><span class="required" />{{ $t('i18n_confirme_a_senha') }}: </label>
        <fut-input
          id="password_confirmation"
          v-model="password_confirmation"
          name="password_confirmation"
          :validate="getOnboardingAuthErrors ? getOnboardingAuthErrors : {}"
          type="password"
          class="mx-0 mt-2"
        />
        <fut-button
          type="submit"
          class="no-break mt-3 text-center mb-5 w-100"
          :rounded="true"
          :primary="true"
        >
          <strong class="text-uppercase font-weight-bold">{{ $t('i18n_alterar_senha') }}</strong>
        </fut-button>
      </form>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'pinia'
import { useOnboardingAuthStore } from '@/stores/onboarding-auth'

import FutInput from '@/components/default/atoms/FutInput'
import FutButton from '@/components/default/atoms/FutButton'

export default {
  name: 'UpdatePassword',
  components: {
    FutInput,
    FutButton
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
    ...mapState(useOnboardingAuthStore, {
      getOnboardingAuthErrors: 'getOnboardingAuthErrors'
    })
  },
  methods: {
    ...mapActions(useOnboardingAuthStore, {
      sendForgottenPasswordUpdate: 'sendForgottenPasswordUpdate'
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

<style>
  .password-container{
    margin-top: 100px;
    max-width: 500px;
    position: relative;
    left: 50%;
    transform: translateX(-50%);
  }
</style>

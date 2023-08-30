<template>
  <div class="container-fluid px-0">
    <div class="container-fb-sm">
      <div class="password-head">
        <span class="text-white">{{ $t('i18n_esqueci_a_senha') }}</span>
      </div>
      <div class="password-form">
        <form @submit.prevent="submitForgottenRequest()">
          <label class="text-white mb-2 mt-3" for="email">{{ $t('i18n_endereco_de_email') }}</label>
          <input
            v-model="data.email"
            class="w-100 input-control"
            type="email"
            name="email"
            required
            placeholder="E-mail"
          >
          <error-badge name="email" :validate="getOnboardingAuthErrors?getOnboardingAuthErrors:{}" />
          <success-badge name="email" :validate="{email: response}" />
          <div class="text-center">
            <fb-fut-button :disabled="getOnboardingAuthLoading" type="submit" class="btn btn-fb-primary">
              {{ $t('i18n_continuar') }}
            </fb-fut-button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import ErrorBadge from '@/components/default/atoms/ErrorBadge'
import SuccessBadge from '@/components/default/atoms/SuccessBadge'
import FbFutButton from '@/components/fb/atoms/FbFutButton.vue'

export default {
  components: {
    ErrorBadge,
    SuccessBadge,
    FbFutButton
  },
  data () {
    return {
      data: {
        email: null
      },
      response: []
    }
  },
  computed: {
    ...mapGetters({
      getOnboardingAuthLoading: 'onboarding-auth/getOnboardingAuthLoading',
      getOnboardingAuthErrors: 'onboarding-auth/getOnboardingAuthErrors'
    })
  },
  mounted () {
    this.clearErrors()
  },
  methods: {
    ...mapActions({
      clearErrors: 'onboarding-auth/clearErrors',
      sendForgottenPasswordEmail: 'onboarding-auth/sendForgottenPasswordEmail'
    }),
    submitForgottenRequest () {
      this.sendForgottenPasswordEmail(this.data).then(() => {
        this.response.push('Caso todos os dados estiverem corretos, você receberá um e-mail em breve.')
      })
    }
  }
}
</script>
<style scoped lang="scss">
@import "@/assets/layout/breakpoints";
.container-fluid{
  margin-top: 50px;
  @include md{
    min-height: 50vh;
  }
}
.container-fb-sm{
  // background: var(--fut-background-lighter);
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  @include md {
    max-width: 350px;
    margin-top: 10px;
  }
  .password-head{
    span{
      border-left: 3px solid var(--fut-primary);
      padding-left: 10px;
      text-transform: uppercase;
    }
    padding: 10px;
    @include md {
      border-bottom: 1px solid var(--fut-background-lightest);
      span{
        border-left: none;
        padding-left: 0;
        text-transform: none;
      }
      padding: 10px 20px;
      text-align: center;
      // font-size: 13px;
    }
  }
  .password-form{
    margin-left: auto;
    margin-right: auto;
    padding-bottom: 30px;
    width: 100%;
    padding-left: 10px;
    padding-right: 10px;
    @include md {
      max-width: 250px;
    }
    label{
      width: 100%;
      // font-size: 14px;
      @include md {
        // font-size: 11px;
        text-align: center;
      }
    }
  }
}
.input-control {
  border: none;
  padding: 10px 15px;
  // font-size: 11px;
  color: white;
  &::placeholder{
    color: rgba(255, 255, 255, 0.466);
  }
  background-color: transparent;
  background-color: var(--fut-background-black);
  border-bottom: 1px solid var(--fut-background-white);
  @include md {
    border-bottom: none;
  }
}
.btn-fb-primary{
  min-width: 100px;
  color: black;
  font-size: 13px;
  border-radius: 0;
  padding: 15px 20px;
  text-transform: uppercase;
  font-weight: 700;
  margin-top: 15px;
  // border-radius: 5px;
  background: var(--fut-primary);
  // background: linear-gradient(90deg, var(--fut-primary) 0%, var(--fut-secondary) 100%);
  @include _md{
    padding: 15px 20px;
    width: 100%;
  }
}
</style>

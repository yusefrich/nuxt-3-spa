<template>
  <div class="d-flex justify-content-center">
    <div class="profile-content">
      <div
        class="header-profile w-100 p-2 d-none d-md-flex align-items-center text-white fut-color-dynamic"
      >
        <fa class="mr-10" :icon="['fas', 'user']" />
        <span>{{ $t('i18n_perfil') }}</span>
      </div>
      <div class="d-md-flex d-grid mt-md-1 mt-3">
        <!-- working here -->
        <fb-profile-desk
          :logged-in-user="loggedInUser"
          :onboard-auth-load="getOnboardingAuthLoading"
          :onboard-auth-error="getOnboardingAuthErrors"
          :fetched-address="fetched"
          class="d-none d-md-block"
          @updateData="updateUserData($event)"
          @searchAddress="searchAddress($event)"
          @updatePassword="updateUserPassword($event)"
        />
        <fb-profile-mobile
          :logged-in-user="loggedInUser"
          :onboard-auth-load="getOnboardingAuthLoading"
          :onboard-auth-error="getOnboardingAuthErrors"
          class="d-md-none"
          @updateData="updateUserData($event)"
          @updatePassword="updateUserPassword($event)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import FbProfileDesk from '@/components/fb/organisms/FbProfileDesk.vue'
import FbProfileMobile from '@/components/fb/organisms/FbProfileMobile.vue'

export default {
  components: {
    FbProfileDesk,
    FbProfileMobile
  },
  data () {
    return {
      fetched: {
        street: '',
        neighborhood: ''
      }
    }
  },
  computed: {
    ...mapGetters({
      loggedInUser: 'loggedInUser',
      getOnboardingAuthLoading: 'onboarding-auth/getOnboardingAuthLoading',
      getOnboardingAuthErrors: 'onboarding-auth/getOnboardingAuthErrors'
    })
  },
  methods: {
    ...mapActions({
      updateUserPassword: 'onboarding-auth/updateUserPassword',
      updateUserData: 'onboarding-auth/updateUserData',
      fetchAddressData: 'onboarding-auth/fetchAddressData'
    }),
    searchAddress (cep) {
      if (!cep) {
        this.$toast.open({ message: 'Digite um cep válido!', type: 'warning' })
        return
      }

      this.fetchAddressData(cep).then((data) => {
        this.fetched.street = data.logradouro
        this.fetched.neighborhood = data.bairro
      })
    }
  }
}
</script>
<style lang="scss" scoped>
@import "@/assets/layout/breakpoints";

.profile-content {
  width: 100%;
  @include md {
    width: 80%;
  }
}
.header-profile {
  background-color: var(--fut-background);
}
.section-details {
  background-color: var(--fut-background-darker);
  @include md {
    background-color: var(--fut-background-lightest);
  }
  .section-details-header {
    color: white;
    background-color: var(--fut-background-lightest);
    @include md {
      border-bottom: 1px solid rgb(94, 91, 91);
      background-color: transparent;
    }
    .mobile-header {
      padding-left: 1%;
      border-left: 3px solid var(--fut-primary)
    }
  }
}
</style>

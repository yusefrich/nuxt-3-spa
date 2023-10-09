<template>
  <user v-if="getCurrentLayoutStyle === 'default'">
    <fut-update
      :logged-in-user="loggedInUser"
      :address="getOnboardingAuthAddress"
      @updateData="data => updateData(data)"
      @searchAddress="searchAddress($event)"
    />
  </user>
</template>

<script>
import { mapState, mapActions } from 'pinia'
import { useBaseStore } from '@/stores/base'
import { useOnboardingAuthStore } from '@/stores/onboarding-auth'

import User from '@/components/default/templates/User.vue'
import FutUpdate from '@/components/default/molecules/FutUpdate.vue'

export default {
  name: 'PersonalData',
  components: {
    User,
    FutUpdate
  },
  computed: {
    ...mapState(useBaseStore, {
      loggedInUser: 'loggedInUser'
    }),
    ...mapState(useOnboardingAuthStore, {
      getOnboardingAuthAddress: 'getOnboardingAuthAddress'
    }),
  },
  methods: {
    ...mapActions(useOnboardingAuthStore, {
      updateUserData: 'updateUserData',
      fetchAddressData: 'fetchAddressData'
    }),
    updateData (data) {
      this.updateUserData(data)
    },
    searchAddress (cep) {
      this.fetchAddressData(cep)
    }
  }
}
</script>

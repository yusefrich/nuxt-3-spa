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
import { mapGetters, mapActions } from 'vuex'
import User from '@/components/default/templates/User.vue'
import FutUpdate from '@/components/default/molecules/FutUpdate.vue'

export default {
  name: 'PersonalData',
  components: {
    User,
    FutUpdate
  },
  computed: {
    ...mapGetters({
      loggedInUser: 'loggedInUser',
      getOnboardingAuthAddress: 'onboarding-auth/getOnboardingAuthAddress'
    })
  },
  methods: {
    ...mapActions({
      updateUserData: 'onboarding-auth/updateUserData',
      fetchAddressData: 'onboarding-auth/fetchAddressData'
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

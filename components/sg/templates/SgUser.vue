<template>
  <div>
    <div class="d-flex align-items-center">
      <div class="profile-border d-flex align-items-center w-100 p-2">
        <img
          class="mb-0 profile-content"
          :src="`https://ui-avatars.com/api/?background=eeeeee&name=${loggedInUser.username}&color=333333`"
          alt=""
        >
        <div class="ms-2">
          <h4 class="text-white mb-0 fw-bold">
            {{ loggedInUser.username }}
          </h4>
        </div>
      </div>
      <img class="ms-3" src="/Sg/Bronze.png" alt="">
    </div>
    <div class="d-md-flex d-grid my-3">
      <sg-personal-data :user="loggedInUser" @update="payload => updateUserData(payload)" @updatePassword="payload => updateUserPassword(payload)" />
      <sg-general-data
        :user="loggedInUser"
        :address="getOnboardingAuthAddress"
        @update="payload => updateUserData(payload)"
        @searchAddress="searchAddress($event)"
      />
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'pinia'
import { useBaseStore } from '@/stores/base'
import { useSettingsStore } from '@/stores/settings'
import { useOnboardingAuthStore } from '@/stores/onboarding-auth'

import SgPersonalData from '@/components/sg/organisms/SgPersonalData'
import SgGeneralData from '@/components/sg/organisms/SgGeneralData'

export default {
  name: 'SgUser',
  components: {
    SgPersonalData,
    SgGeneralData
  },
  computed: {
    ...mapState(useBaseStore, {
      loggedInUser: 'loggedInUser'
    }),
    ...mapState(useSettingsStore, {
      currentSettings: 'currentSettings'
    }),
    ...mapState(useOnboardingAuthStore, {
      getOnboardingAuthAddress: 'getOnboardingAuthAddress'
    })
  },
  methods: {
    ...mapActions(useOnboardingAuthStore, {
      updateUserPassword: 'updateUserPassword',
      updateUserData: 'updateUserData',
      fetchAddressData: 'fetchAddressData'
    }),
    searchAddress (cep) {
      this.fetchAddressData(cep)
    }
  }
}
</script>

<style lang="scss" scoped>
.profile-border {
  background-color: var(--fut-background-darkest);
  border-radius: 50px;
}
.profile-content {
  width: 66px;
  height: 66px;
  border-radius: 100%;
  border: 2px solid var(--fut-primary);
}
.select-control {
  background-color: var(--fut-background-darkest);
  border: 2px solid var(--fut-background-lightest);
  border-radius: 5px;
  width: 100%;
  outline: none;
  color: rgba(255, 255, 255, 0.353);
}
</style>

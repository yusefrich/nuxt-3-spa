<template>
  <user>
    <fut-update
      :logged-in-user="loggedInUser"
      @updateData="data => updateData(data)"
    />
  </user>
</template>

<script>
import { mapState, mapActions } from 'pinia'
import { useBaseStore } from '@/stores/base'
import { useOnboardingAuthStore } from '@/stores/onboarding-auth'

import User from '@/components/default/templates/User'
import FutUpdate from '@/components/default/molecules/FutUpdate'

export default {
  name: 'Bonus',
  components: {
    User,
    FutUpdate
  },
  computed: {
    ...mapState(useBaseStore, {
      loggedInUser: 'loggedInUser'
    })
  },
  methods: {
    ...mapActions(useOnboardingAuthStore, {
      updateUserData: 'updateUserData'
    }),
    updateData (data) {
      this.updateUserData(data)
    }
  }
}
</script>

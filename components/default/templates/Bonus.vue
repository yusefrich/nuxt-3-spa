<template>
  <user>
    <fut-update
      :logged-in-user="loggedInUser"
      @updateData="data => updateData(data)"
    />
  </user>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import User from '@/components/default/templates/User'
import FutUpdate from '@/components/default/molecules/FutUpdate.vue'

export default {
  name: 'Bonus',
  components: {
    User,
    FutUpdate
  },
  computed: {
    ...mapGetters({
      loggedInUser: 'loggedInUser'
    })
  },
  methods: {
    ...mapActions({
      updateUserData: 'onboarding-auth/updateUserData'
    }),
    updateData (data) {
      this.updateUserData(data)
    }
  }
}
</script>

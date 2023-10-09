<template>
  <div class="container pt-3 text-center">
    <span class="text-white fut-color-dynamic">Redirecionando usuário...</span>
  </div>
</template>

<script>
import { mapActions } from 'pinia'
import { useOnboardingThirdPtAuthStore } from '@/stores/onboarding-third-pt-auth'

export default {
  name: 'Auction',
  mounted () {
    const query = this.$route.query
    this.logUserFromThirdParty(query).then(() => {
      this.$router.push('/')
    })
  },
  methods: {
    ...mapActions(useOnboardingThirdPtAuthStore, {
      logUserFromThirdParty: 'logUserFromThirdParty'
    })
  }
}
</script>

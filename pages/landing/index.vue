<template>
  <nsx-landing-page
    v-if="getCurrentLayoutStyle === 'oldBet365'"
  />
  <fb-landing-page
    v-else
    :layout="getCurrentLandingStyle"
  />
</template>

<script>
import { mapState } from 'pinia'
import { useLayoutStore } from '@/stores/layout'

import FbLandingPage from '@/components/fb/templates/FbLandingPage'
import NsxLandingPage from '@/components/nsx/templates/NsxLandingPage'

export default {
  components: {
    NsxLandingPage,
    FbLandingPage
  },
  computed: {
    ...mapState(useLayoutStore, {
      getCurrentLayoutStyle: 'getCurrentLayoutStyle',
      getCurrentLandingStyle: 'getCurrentLandingStyle'
    })
  }
}
</script>

<template>
  <fb-landing-page
    :layout="getCurrentLandingStyle"
  />
</template>

<script>
import { mapState } from 'pinia'
import { useLayoutStore } from '@/stores/layout'

import FbLandingPage from '@/components/fb/templates/FbLandingPage'

export default {
  components: {
    FbLandingPage
  },
  computed: {
    ...mapState(useLayoutStore, {
      getCurrentLandingStyle: 'getCurrentLandingStyle'
    })
  }
}
</script>

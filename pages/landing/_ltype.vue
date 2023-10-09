<template>
  <nsx-landing-page
    v-if="getCurrentLayoutStyle === 'oldBet365'"
  />
  <fb-landing-page
    v-else
    :layout="ltype"
  />
</template>

<script>
import { mapState } from 'pinia'
import { useLayoutStore } from '@/stores/layout'

import FbLandingPage from '@/components/fb/templates/FbLandingPage.vue'
import NsxLandingPage from '@/components/nsx/templates/NsxLandingPage.vue'

export default {
  components: {
    NsxLandingPage,
    FbLandingPage
  },
  computed: {
    ...mapState(useLayoutStore, {
      getCurrentLayoutStyle: 'getCurrentLayoutStyle'
    }),
    ltype () {
      return this.$route.params.ltype
    }
  }
}
</script>

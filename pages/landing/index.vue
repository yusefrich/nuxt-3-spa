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
import { mapGetters } from 'vuex'
import FbLandingPage from '@/components/fb/templates/FbLandingPage.vue'
import NsxLandingPage from '@/components/nsx/templates/NsxLandingPage.vue'

export default {
  components: {
    NsxLandingPage,
    FbLandingPage
  },
  layout (context) {
    return context.store.getters['layout/getCurrentLayoutComponent']
  },
  computed: {
    ...mapGetters({
      getCurrentLayoutStyle: 'layout/getCurrentLayoutStyle',
      getCurrentLandingStyle: 'layout/getCurrentLandingStyle'
    })
  }
}
</script>

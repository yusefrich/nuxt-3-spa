<template>
  <fb-landing-page
    :layout="ltype"
  />
</template>

<script>
import FbLandingPage from '@/components/fb/templates/FbLandingPage'

export default {
  components: {
    FbLandingPage
  },
  computed: {
    ltype () {
      return this.$route.params.ltype
    }
  }
}
</script>

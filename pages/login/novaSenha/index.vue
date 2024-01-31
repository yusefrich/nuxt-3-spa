<template>
  <fb-forgot-password v-if="getCurrentLayoutStyle === 'FB'" />
  <forgot-password v-else />
</template>

<script>
import { mapState } from 'pinia'
import { useLayoutStore } from '@/stores/layout'

import FbForgotPassword from '@/components/fb/templates/FbForgotPassword'
import ForgotPassword from '@/components/default/templates/ForgotPassword'

export default {
  components: {
    FbForgotPassword,
    ForgotPassword
  },
  computed: {
    ...mapState(useLayoutStore, {
      getCurrentLayoutStyle: 'getCurrentLayoutStyle'
    })
  }
}
</script>

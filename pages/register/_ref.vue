<template>
  <div>
    <fb-register v-if="getCurrentLayoutStyle === 'FB'" />
    <register v-else />
  </div>
</template>

<script>
import { mapState } from 'pinia'
import { useBaseStore } from '@/stores/base'
import { useLayoutStore } from '@/stores/layout'

import Register from '@/components/default/templates/Register'
import FbRegister from '@/components/fb/templates/FbRegister'

export default {
  components: {
    Register,
    FbRegister
  },
  // middleware: ['sign-in'],
  computed: {
    ...mapState(useBaseStore, {
      loggedInUser: 'loggedInUser'
    }),
    ...mapState(useLayoutStore, {
      getCurrentLayoutStyle: 'getCurrentLayoutStyle'
    })
  }
}
</script>

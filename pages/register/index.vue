<template>
  <div>
    <md-register v-if="getCurrentLayoutStyle === 'MD'" />
    <fb-register v-else-if="getCurrentLayoutStyle === 'FB'" />
    <register v-else />
  </div>
</template>

<script>
import { mapState } from 'pinia'
import { useBaseStore } from '@/stores/base'
import { useLayoutStore } from '@/stores/layout'

import Register from '@/components/default/templates/Register'
import FbRegister from '@/components/fb/templates/FbRegister'
import MdRegister from '@/components/md/templates/MdRegister'

export default {
  components: {
    Register,
    FbRegister,
    MdRegister
  },
  // middleware: ['sign_in'],
  created () {
    if (this.loggedInUser) {
      this.$router.push(this.localePath('/'))
    }
  },
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

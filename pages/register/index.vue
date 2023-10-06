<template>
  <div>
    <nsx-register v-if="getCurrentLayoutStyle === 'oldBet365'" />
    <md-register v-else-if="getCurrentLayoutStyle === 'MD'" />
    <fb-register v-else-if="getCurrentLayoutStyle === 'FB' || getCurrentLayoutStyle === 'FB2'" />
    <register v-else />
  </div>
</template>

<script>
import { mapState } from 'pinia'
import { useBaseStore } from '@/stores/base'
import { useLayoutStore } from '@/stores/layout'

import Register from '@/components/default/templates/Register.vue'
import NsxRegister from '@/components/nsx/templates/NsxRegister.vue'
import FbRegister from '@/components/fb/templates/FbRegister.vue'
import MdRegister from '@/components/md/templates/MdRegister.vue'

export default {
  components: {
    Register,
    NsxRegister,
    FbRegister,
    MdRegister
  },
  // middleware: ['sign_in'],
  // created () {
  //   if (this.loggedInUser) {
  //     this.$router.push(this.localePath('/'))
  //   }
  // },
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

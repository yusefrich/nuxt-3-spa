<template>
  <fb-balance v-if="getCurrentLayoutStyle === 'FB' || getCurrentLayoutStyle === 'FB2'" />
  <sg-wallet v-else-if="getCurrentLayoutStyle === 'SG'" />
</template>

<script>
import { mapState } from 'pinia'
import { useLayoutStore } from '@/stores/layout'

import FbBalance from '@/components/fb/templates/FbBalance.vue'
import SgWallet from '~/components/sg/templates/SgWallet.vue'

export default {
  components: {
    FbBalance,
    SgWallet
  },
  middleware: ['protected'],
  computed: {
    ...mapState(useLayoutStore, {
      getCurrentLayoutStyle: 'getCurrentLayoutStyle'
    })
  }
}
</script>

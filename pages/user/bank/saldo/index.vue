<template>
  <fb-balance v-if="getCurrentLayoutStyle === 'FB' || getCurrentLayoutStyle === 'FB2'" />
  <sg-wallet v-else-if="getCurrentLayoutStyle === 'SG'" />
</template>

<script>
import { mapGetters } from 'vuex'
import FbBalance from '@/components/fb/templates/FbBalance.vue'
import SgWallet from '~/components/sg/templates/SgWallet.vue'

export default {
  components: {
    FbBalance,
    SgWallet
  },
  layout (context) {
    return context.store.getters['layout/getCurrentLayoutComponent']
  },
  middleware: ['protected'],
  computed: {
    ...mapGetters({
      getCurrentLayoutStyle: 'layout/getCurrentLayoutStyle'
    })
  }
}
</script>

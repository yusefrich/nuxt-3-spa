<template>
  <div>
    <deposito v-if="getCurrentLayoutStyle === 'default'" />
    <div v-else-if="getCurrentLayoutStyle === 'FB' || getCurrentLayoutStyle === 'FB2'">
      <fb-deposit />
    </div>
    <sg-transactions v-else-if="getCurrentLayoutStyle === 'SG'" />
  </div>
</template>

<script>
import { mapState } from 'pinia'
import { useLayoutStore } from '@/stores/layout'

import Deposito from '@/components/default/templates/Deposito'
import FbDeposit from '@/components/fb/templates/FbDeposit'
import SgTransactions from '@/components/sg/templates/SgTransactions'

export default {
  components: {
    Deposito,
    FbDeposit,
    SgTransactions
  },
  middleware: ['protected'],
  computed: {
    ...mapState(useLayoutStore, {
      getCurrentLayoutStyle: 'getCurrentLayoutStyle'
    })
  }
}
</script>

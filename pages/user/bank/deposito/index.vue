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
import { mapGetters } from 'vuex'
import Deposito from '@/components/default/templates/Deposito.vue'
import FbDeposit from '@/components/fb/templates/FbDeposit.vue'
import SgTransactions from '@/components/sg/templates/SgTransactions.vue'

export default {
  components: {
    Deposito,
    FbDeposit,
    SgTransactions
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

<template>
  <sk-transactions v-if="getCurrentLayoutStyle === 'SK'" />
  <fb-transactions v-else />
</template>

<script>
import FbTransactions from '@/components/fb/templates/FbTransactions.vue'
import SkTransactions from '@/components/sk/templates/SkTransactions.vue'

export default {
  components: {
    FbTransactions,
    SkTransactions
  },
  layout (context) {
    return context.store.getters['layout/getCurrentLayoutComponent']
  },
  middleware: ['protected']
}
</script>

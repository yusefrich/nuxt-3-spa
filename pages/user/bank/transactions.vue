<template>
  <sk-transactions v-if="layout.getCurrentLayoutStyle === 'SK'" />
  <!-- <fb-transactions v-else /> -->
</template>

<script setup>

import { useLayoutStore } from '@/stores/layout'

// import FbTransactions from '@/components/fb/templates/FbTransactions'
import SkTransactions from '@/components/sk/templates/SkTransactions'

const layout = useLayoutStore()

definePageMeta({
  middleware: [
    // 'protected'
  ]
})

</script>

<template>
  <sk-casino v-if="layout.getCurrentLayoutStyle === 'SK'" />
</template>

<script setup>

import { useLayoutStore } from '@/stores/layout'

import SkCasino from '@/components/sk/templates/SkCasino'

const layout = useLayoutStore()

</script>

<template>
  <sk-casino v-if="layout.getCurrentLayoutStyle === 'SK'" />
  <md-casino v-else-if="layout.getCurrentLayoutStyle === 'MD'" />
</template>

<script setup>

import { useLayoutStore } from '@/stores/layout'

import SkCasino from '@/components/sk/templates/SkCasino'
import MdCasino from '@/components/md/templates/MdCasino'

const layout = useLayoutStore()

</script>

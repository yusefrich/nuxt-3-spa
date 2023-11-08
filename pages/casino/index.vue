<template>
  <sg-home v-if="layout.getCurrentLayoutStyle === 'SG'" />
  <sk-casino v-else-if="layout.getCurrentLayoutStyle === 'SK'" />
  <md-casino v-else-if="layout.getCurrentLayoutStyle === 'MD'" />
  <fb-casino-home v-else :top-offset="layout.getCurrentLayoutStyle === 'default'?99:0" />
</template>

<script setup>

import { useLayoutStore } from '@/stores/layout'

import SkCasino from '@/components/sk/templates/SkCasino'
import MdCasino from '@/components/md/templates/MdCasino'
import FbCasinoHome from '@/components/fb/templates/FbCasinoHome'

const layout = useLayoutStore()

</script>

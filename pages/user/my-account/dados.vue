<template>
  <div>
    <sk-settings v-if="layout.getCurrentLayoutStyle === 'SK'" />
    <!-- <fb-user-update v-else-if="getCurrentLayoutStyle === 'FB' || getCurrentLayoutStyle === 'FB2'" /> -->
    <dados v-else />
  </div>
</template>

<script setup>

import { useLayoutStore } from '@/stores/layout'

import Dados from '@/components/default/templates/Dados'
// import FbUserUpdate from '@/components/fb/templates/FbUserUpdate'
import SkSettings from '@/components/sk/templates/SkSettings'

const layout = useLayoutStore()

definePageMeta({
  middleware: [
    // 'protected'
  ]
})

</script>

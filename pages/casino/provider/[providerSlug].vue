<template>
  <sk-provider-games v-if="getLayout() === 'SK'" />
</template>

<script setup>

import { useLayoutStore } from '@/stores/layout'

import SkProviderGames from '@/components/sk/templates/SkProviderGames'

const layout = useLayoutStore()

const getLayout = () => {
  return layout.getCurrentCasinoLayoutStyle
    ? layout.getCurrentCasinoLayoutStyle
    : layout.getCurrentLayoutStyle
}

</script>

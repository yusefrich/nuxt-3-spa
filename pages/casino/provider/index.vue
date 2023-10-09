<template>
  <sk-casino-provider v-if="getLayout() === 'SK'" />
</template>

<script setup>

import { useLayoutStore } from '@/stores/layout'

import SkCasinoProvider from '@/components/sk/templates/SkCasinoProvider'

const layout = useLayoutStore()

const getLayout = () => {
  return layout.getCurrentCasinoLayoutStyle
    ? layout.getCurrentCasinoLayoutStyle
    : layout.getCurrentLayoutStyle
}

</script>

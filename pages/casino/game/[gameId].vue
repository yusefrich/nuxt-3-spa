<template>
  <sk-single-game v-if="getLayout() === 'SK'" />
</template>

<script setup>

import { useLayoutStore } from '@/stores/layout'

import SkSingleGame from '@/components/sk/templates/SkSingleGame'

const layout = useLayoutStore()

const getLayout = () => {
  return layout.getCurrentCasinoLayoutStyle
    ? layout.getCurrentCasinoLayoutStyle
    : layout.getCurrentLayoutStyle
}

</script>

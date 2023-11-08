<template>
  <sk-single-game v-if="getLayout() === 'SK'" />
  <sg-single-game v-else-if="getLayout() === 'SG'" />
</template>

<script setup>

import { useLayoutStore } from '@/stores/layout'

import SkSingleGame from '@/components/sk/templates/SkSingleGame'
import SgSingleGame from '@/components/sg/templates/SgSingleGame'

const layout = useLayoutStore()

const getLayout = () => {
  return layout.getCurrentCasinoLayoutStyle
    ? layout.getCurrentCasinoLayoutStyle
    : layout.getCurrentLayoutStyle
}

</script>

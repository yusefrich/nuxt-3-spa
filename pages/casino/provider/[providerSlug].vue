<template>
  <sk-provider-games v-if="getLayout() === 'SK'" />
  <md-provider-games v-if="getLayout() === 'MD'" />
</template>

<script setup>

import { useLayoutStore } from '@/stores/layout'

import SkProviderGames from '@/components/sk/templates/SkProviderGames'
import MdProviderGames from '@/components/md/templates/MdProviderGames'

const layout = useLayoutStore()

const getLayout = () => {
  return layout.getCurrentCasinoLayoutStyle
    ? layout.getCurrentCasinoLayoutStyle
    : layout.getCurrentLayoutStyle
}

</script>

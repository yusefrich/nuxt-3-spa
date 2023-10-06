<template>
  <sk-category-games v-if="getLayout() === 'SK'" :live="live" />
</template>

<script setup>

import { useLayoutStore } from '@/stores/layout'

import SkCategoryGames from '@/components/sk/templates/SkCategoryGames'

const layout = useLayoutStore()

const getLayout = () => {
  return layout.getCurrentCasinoLayoutStyle
    ? layout.getCurrentCasinoLayoutStyle
    : layout.getCurrentLayoutStyle
}

const route = useRoute()

const live = computed(() => route.query.live === 'true')

</script>

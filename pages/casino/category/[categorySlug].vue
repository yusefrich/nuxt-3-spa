<template>
  <sk-category-games v-if="getLayout() === 'SK'" :live="live" />
  <sg-category-games v-else-if="getLayout() === 'SG'" :live="live" />
  <md-category-games v-else-if="getLayout() === 'MD'" :live="live" />
  <fb-casino-home v-else />
</template>

<script setup>

import { useLayoutStore } from '@/stores/layout'

import FbCasinoHome from '@/components/fb/templates/FbCasinoHome'
import SkCategoryGames from '@/components/sk/templates/SkCategoryGames'
import SgCategoryGames from '~/components/sg/templates/SgCategoryGames'
import MdCategoryGames from '@/components/md/templates/MdCategoryGames'

const layout = useLayoutStore()

const getLayout = () => {
  return layout.getCurrentCasinoLayoutStyle
    ? layout.getCurrentCasinoLayoutStyle
    : layout.getCurrentLayoutStyle
}

const route = useRoute()

const live = computed(() => route.query.live === 'true')

</script>

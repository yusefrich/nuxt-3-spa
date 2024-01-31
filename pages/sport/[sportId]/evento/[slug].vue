<template>
  <div>
    <fb-evento
      v-if="getLayout() === 'FB'"
      :slug="$route.params.slug"
    />
    <md-evento
      v-else-if="getLayout() === 'MD'"
      :slug="$route.params.slug"
    />
    <sk-evento
      v-else-if="getLayout() === 'SK'"
      :current-sport="$route.params.sportId"
      :slug="$route.params.slug"
    />
    <evento
      v-else
      :slug="$route.params.slug"
    />
	</div>
</template>

<script setup>

import { useLayoutStore } from '@/stores/layout'

import Evento from '@/components/default/templates/Evento'
import FbEvento from '@/components/fb/templates/FbEvento'
import MdEvento from '@/components/md/templates/MdEvento'
import SkEvento from '@/components/sk/templates/SkEvento'

const layout = useLayoutStore()

const getLayout = () => {
  return layout.getCurrentSportsLayoutStyle
    ? layout.getCurrentSportsLayoutStyle
    : layout.getCurrentLayoutStyle
}

</script>

<template>
  <div>
    <fb-league
      v-if="getLayout() === 'FB'"
      key="leagues_fb"
    />
    <md-league
      v-else-if="getLayout() === 'MD'"
    />
    <sk-league
      v-else-if="getLayout() === 'SK'"
    />
    <league
      v-else-if="getLayout() === 'SG'"
      generic-styling
    />
    <league
      v-else
    />
  </div>
</template>

<script setup>

import { useLayoutStore } from '@/stores/layout'

import League from '@/components/default/templates/League'
import FbLeague from '@/components/fb/templates/FbLeague'
import MdLeague from '@/components/md/templates/MdLeague'
import SkLeague from '@/components/sk/templates/SkLeague'

const layout = useLayoutStore()

const getLayout = () => {
  return layout.getCurrentSportsLayoutStyle
    ? layout.getCurrentSportsLayoutStyle
    : layout.getCurrentLayoutStyle
}

</script>

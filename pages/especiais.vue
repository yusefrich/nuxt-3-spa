<template>
  <div>
    <fb-home
      v-if="layout.getCurrentLayoutStyle === 'FB'"
    />
    <md-home
      v-else-if="layout.getCurrentLayoutStyle === 'MD'"
    />
    <sk-home
      v-else-if="layout.getCurrentLayoutStyle === 'SK'"
    />
    <home
      v-else
    />
  </div>
</template>

<script setup>

import { useLayoutStore } from '@/stores/layout'

import FbHome from '@/components/fb/templates/FbHome'
import MdHome from '@/components/md/templates/MdHome'
import SkHome from '@/components/sk/templates/SkHome'
import Home from '@/components/default/templates/Home'

const layout = useLayoutStore()

</script>

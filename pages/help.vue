<template>
  <div class="container mt-3">
    <md-help-container
      v-if="layout.getCurrentLayoutStyle === 'MD'"
    />
    <fb-help-container v-else />
  </div>
</template>

<script setup>

import { useLayoutStore } from '@/stores/layout'

import MdHelpContainer from '@/components/md/templates/MdHelpContainer'
import FbHelpContainer from '@/components/fb/templates/FbHelpContainer'

const layout = useLayoutStore()

</script>

<template>
  <div class="page-full">
    <fb-promo
      v-if="layout.getCurrentLayoutStyle === 'FB'"
    />
    <md-promo
      v-else-if="layout.getCurrentLayoutStyle === 'MD'"
    />
    <sk-promo
      v-else-if="layout.getCurrentLayoutStyle === 'SK'"
    />
    <promo v-else />
  </div>
</template>

<script setup>

import { useLayoutStore } from '@/stores/layout'

import FbPromo from '@/components/fb/templates/FbPromo'
import MdPromo from '@/components/md/templates/MdPromo'
import SkPromo from '@/components/sk/templates/SkPromo'
import Promo from '@/components/default/templates/Promo'

const layout = useLayoutStore()

</script>

<style>

</style>
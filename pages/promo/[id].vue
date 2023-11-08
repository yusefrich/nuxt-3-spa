<template>
  <div class="page-full">
    <sk-promo
      v-if="layout.getCurrentLayoutStyle === 'SK'"
    />
    <fb-promo-id v-else />
  </div>
</template>

<script setup>

import { useLayoutStore } from '@/stores/layout'

import SkPromo from '@/components/sk/templates/SkPromo'
import FbPromoId from '@/components/fb/templates/FbPromoId'

const layout = useLayoutStore()

</script>

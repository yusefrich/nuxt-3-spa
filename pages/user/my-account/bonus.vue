<template>
  <div>
    <fb-bonus v-if="getCurrentLayoutStyle === 'FB'" />
    <bonus v-else />
  </div>
</template>

<script>
import { mapState } from 'pinia'
import { useLayoutStore } from '@/stores/layout'

import FbBonus from '@/components/fb/templates/FbBonus'
import Bonus from '@/components/default/templates/Bonus'

export default {
  components: {
    FbBonus,
    Bonus
  },
  middleware: ['protected'],
  computed: {
    ...mapState(useLayoutStore, {
      getCurrentLayoutStyle: 'getCurrentLayoutStyle'
    })
  }
}
</script>

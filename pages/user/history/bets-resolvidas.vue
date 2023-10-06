<template>
  <div>
    <sg-report v-if="getCurrentLayoutStyle === 'SG'" />
    <bets
      v-else
      which-bets="resolvidas"
    />
  </div>
</template>

<script>
import { mapState } from 'pinia'
import { useLayoutStore } from '@/stores/layout'

import SgReport from '~/components/sg/templates/SgReport'
import Bets from '~/components/default/templates/Bets'

export default {
  components: {
    SgReport,
    Bets
  },
  middleware: ['protected'],
  computed: {
    ...mapState(useLayoutStore, {
      getCurrentLayoutStyle: 'getCurrentLayoutStyle'
    })
  }
}
</script>

<template>
  <fb-my-bets v-if="getCurrentLayoutStyle === 'FB'" />
  <sk-my-bets v-else-if="getCurrentLayoutStyle === 'SK'" />
  <my-bets v-else />
</template>

<script>
import { mapState } from 'pinia'
import { useLayoutStore } from '@/stores/layout'

import MyBets from '@/components/default/templates/MyBets'
import FbMyBets from '@/components/fb/templates/FbMyBets'
import SkMyBets from '@/components/sk/templates/SkMyBets'

export default {
  components: {
    MyBets,
    FbMyBets,
    SkMyBets
  },
  middleware: ['protected', 'application_type_sports'],
  computed: {
    ...mapState(useLayoutStore, {
      getCurrentLayoutStyle: 'getCurrentLayoutStyle'
    })
  }
}
</script>

<template>
  <nsx-my-bets v-if="getCurrentLayoutStyle === 'oldBet365'" />
  <fb-my-bets v-else-if="getCurrentLayoutStyle === 'FB' || getCurrentLayoutStyle === 'FB2'" />
  <sk-my-bets v-else-if="getCurrentLayoutStyle === 'SK'" />
  <my-bets v-else />
</template>

<script>
import { mapState } from 'pinia'
import { useLayoutStore } from '@/stores/layout'

import MyBets from '@/components/default/templates/MyBets'
import NsxMyBets from '@/components/nsx/templates/NsxMyBets'
import FbMyBets from '@/components/fb/templates/FbMyBets'
import SkMyBets from '@/components/sk/templates/SkMyBets'

export default {
  components: {
    MyBets,
    NsxMyBets,
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

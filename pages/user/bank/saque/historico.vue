<template>
  <fb-withdraws
    v-if="getCurrentLayoutStyle === 'FB' || getCurrentLayoutStyle === 'FB2'"
    class="text-white"
  />
  <user v-else>
    <withdraws class="text-white" />
  </user>
</template>

<script>
import { mapState } from 'pinia'
import { useLayoutStore } from '@/stores/layout'

import User from '@/components/default/templates/User'
import Withdraws from '@/components/default/organisms/Withdraws'
import FbWithdraws from '@/components/fb/templates/FbWithdraws'

export default {
  components: {
    User,
    Withdraws,
    FbWithdraws
  },
  middleware: ['protected'],
  computed: {
    ...mapState(useLayoutStore, {
      getCurrentLayoutStyle: 'getCurrentLayoutStyle'
    })
  }
}
</script>

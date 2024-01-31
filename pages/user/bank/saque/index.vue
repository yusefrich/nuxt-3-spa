<template>
  <fb-withdraw v-if="getCurrentLayoutStyle === 'FB'" />
  <sg-withdraw v-else-if="getCurrentLayoutStyle === 'SG'" />
  <fut-withdraw v-else />
</template>

<script>
import { mapState } from 'pinia'
import { useLayoutStore } from '@/stores/layout'

import FutWithdraw from '@/components/default/templates/FutWithdraw'
import FbWithdraw from '@/components/fb/templates/FbWithdraw'
import SgWithdraw from '~/components/sg/templates/SgWithdraw'

export default {
  components: {
    FutWithdraw,
    FbWithdraw,
    SgWithdraw
  },
  middleware: ['protected'],
  computed: {
    ...mapState(useLayoutStore, {
      getCurrentLayoutStyle: 'getCurrentLayoutStyle'
    })
  }
}
</script>

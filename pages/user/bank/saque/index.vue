<template>
  <fb-withdraw v-if="getCurrentLayoutStyle === 'FB' || getCurrentLayoutStyle === 'FB2'" />
  <sg-withdraw v-else-if="getCurrentLayoutStyle === 'SG'" />
  <fut-withdraw v-else />
</template>

<script>
import { mapGetters } from 'vuex'
import FutWithdraw from '@/components/default/templates/FutWithdraw.vue'
import FbWithdraw from '@/components/fb/templates/FbWithdraw.vue'
import SgWithdraw from '~/components/sg/templates/SgWithdraw.vue'

export default {
  components: {
    FutWithdraw,
    FbWithdraw,
    SgWithdraw
  },
  layout (context) {
    return context.store.getters['layout/getCurrentLayoutComponent']
  },
  middleware: ['protected'],
  computed: {
    ...mapGetters({
      getCurrentLayoutStyle: 'layout/getCurrentLayoutStyle'
    })
  }
}
</script>

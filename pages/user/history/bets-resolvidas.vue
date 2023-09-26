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
import { mapGetters } from 'vuex'
import SgReport from '~/components/sg/templates/SgReport.vue'
import Bets from '~/components/default/templates/Bets.vue'

export default {
  components: {
    SgReport,
    Bets
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

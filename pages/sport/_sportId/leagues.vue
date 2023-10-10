<template>
  <div>
    <leagues-nsx
      v-if="getCurrentLayoutStyle === 'oldBet365'"
      :loading="loading"
      :main-leagues="getPreMatchMainLeagues"
      :leagues="currentLeagues"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import LeaguesNsx from '@/components/nsx/templates/LeaguesNsx.vue'

export default {
  components: {
    LeaguesNsx
  },
  layout (context) {
    return context.store.getters['layout/getCurrentSportsLayoutComponent']
      ? context.store.getters['layout/getCurrentSportsLayoutComponent']
      : context.store.getters['layout/getCurrentLayoutComponent']
  },
  computed: {
    ...mapGetters({
      getCurrentLayoutStyle: 'layout/getCurrentLayoutStyle'
    })
  }
}
</script>

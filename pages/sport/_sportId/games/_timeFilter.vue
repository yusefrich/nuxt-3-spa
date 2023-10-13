<template>
  <div>
    <games-filtered-nsx
      v-if="getCurrentLayoutStyle === 'oldBet365'"
      :key="'time_nsx_' + loading"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import GamesFilteredNsx from '@/components/nsx/templates/GamesFilteredNsx.vue'

export default {
  components: {
    GamesFilteredNsx
  },
  layout (context) {
    return context.store.getters['layout/getCurrentSportsLayoutComponent']
      ? context.store.getters['layout/getCurrentSportsLayoutComponent']
      : context.store.getters['layout/getCurrentLayoutComponent']
  },
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters({
      getCurrentLayoutStyle: 'layout/getCurrentLayoutStyle'
    })
  }
}
</script>

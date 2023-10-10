<template>
  <div>
    <league-nsx
      v-if="getLayout() === 'oldBet365'"
      key="leagues_nsx"
    />
    <fb-league
      v-else-if="getLayout() === 'FB' || getLayout() === 'FB2'"
      key="leagues_fb"
    />
    <md-league
      v-else-if="getLayout() === 'MD'"
    />
    <sk-league
      v-else-if="getLayout() === 'SK'"
    />
    <league
      v-else-if="getLayout() === 'SG'"
      generic-styling
    />
    <league
      v-else
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import League from '@/components/default/templates/League.vue'
import LeagueNsx from '@/components/nsx/templates/LeagueNsx.vue'
import FbLeague from '@/components/fb/templates/FbLeague.vue'
import MdLeague from '@/components/md/templates/MdLeague.vue'
import SkLeague from '@/components/sk/templates/SkLeague.vue'

export default {
  components: {
    League,
    LeagueNsx,
    FbLeague,
    MdLeague,
    SkLeague
  },
  layout (context) {
    return context.store.getters['layout/getCurrentSportsLayoutComponent']
      ? context.store.getters['layout/getCurrentSportsLayoutComponent']
      : context.store.getters['layout/getCurrentLayoutComponent']
  },
  computed: {
    ...mapGetters({
      getCurrentLayoutStyle: 'layout/getCurrentLayoutStyle',
      getCurrentSportsLayoutStyle: 'layout/getCurrentSportsLayoutStyle'
    })
  },
  methods: {
    getLayout () {
      return this.getCurrentSportsLayoutStyle
        ? this.getCurrentSportsLayoutStyle
        : this.getCurrentLayoutStyle
    }
  }
}
</script>

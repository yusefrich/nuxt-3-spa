<template>
  <div>
    <home-nsx
      v-if="getLayout() === 'oldBet365'"
    />
    <fb-home
      v-else-if="getLayout() === 'FB' || getLayout() === 'FB2'"
    />
    <md-home
      v-else-if="getLayout() === 'MD'"
    />
    <sk-sport
      v-else-if="getLayout() === 'SK'"
    />
    <home
      v-else-if="getLayout() === 'SG'"
      generic-styling
    />
    <home
      v-else
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Home from '@/components/default/templates/Home.vue'
import HomeNsx from '@/components/nsx/templates/HomeNsx.vue'
import FbHome from '@/components/fb/templates/FbHome.vue'
import MdHome from '@/components/md/templates/MdHome.vue'
import SkSport from '@/components/sk/templates/SkSport.vue'

export default {
  components: {
    Home,
    FbHome,
    MdHome,
    SkSport,
    HomeNsx
  },
  layout (context) {
    return context.store.getters['layout/getCurrentSportsLayoutComponent']
      ? context.store.getters['layout/getCurrentSportsLayoutComponent']
      : context.store.getters['layout/getCurrentLayoutComponent']
  },
  middleware: ['application_type_sports'],
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

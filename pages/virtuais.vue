<template>
  <div v-if="!getCurrentSportsProvider || (getCurrentSportsProvider && getCurrentSportsProvider !== 'upgaming')">
    <home-nsx
      v-if="getCurrentLayoutStyle === 'oldBet365'"
      :sport="6046"
    />
    <sg-home
      v-else-if="getCurrentLayoutStyle === 'SG'"
      :sport="6046"
    />
    <fb-home
      v-else-if="getCurrentLayoutStyle === 'FB' || getCurrentLayoutStyle === 'FB2'"
      :sport="6046"
    />
    <md-home
      v-else-if="getCurrentLayoutStyle === 'MD'"
      :sport="6046"
    />
    <sk-home
      v-else-if="getCurrentLayoutStyle === 'SK'"
    />
    <home
      v-else
      :sports="getMetadataSports"
      :sport="6046"
    />
  </div>
  <third-party-provider :layout="getCurrentLayoutStyle" virtuals v-else />
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Home from '@/components/default/templates/Home.vue'
import HomeNsx from '@/components/nsx/templates/HomeNsx.vue'
import SgHome from '@/components/sg/templates/SgHome.vue'
import FbHome from '@/components/fb/templates/FbHome.vue'
import MdHome from '@/components/md/templates/MdHome.vue'
import ThirdPartyProvider from '@/components/default/templates/ThirdPartyProvider.vue'

export default {
  components: {
    Home,
    HomeNsx,
    FbHome,
    SgHome,
    ThirdPartyProvider,
    MdHome
  },
  layout (context) {
    return context.store.getters['layout/getCurrentLayoutComponent']
  },
  middleware ({ store, redirect }) {
    const config = store.getters['layout/getCurrentApplicationType']
    const layout = store.getters['layout/getCurrentLayoutStyle']
    if (config === 'all') {
      return
    }
    if (layout !== 'SG' && config && config.includes('casino') && !config.includes('sports')) {
      return redirect('/casino')
    }
    if (layout === 'SG' && config && !config.includes('casino') && config.includes('sports')) {
      return redirect('/sports')
    }
  },
  asyncData ({ redirect, query }) {
    if (process.client) {
      const width = window.innerWidth

      if (query && JSON.stringify(query) !== JSON.stringify({})) {
        return
      }
      if (process.env.LANDING_PAGE === 'all') {
        redirect('/landing/')
      } else if (process.env.LANDING_PAGE === 'mobile' && width <= 821) {
        redirect('/landing/')
      } else if (process.env.LANDING_PAGE === 'desktop' && width > 821) {
        redirect('/landing/')
      }
    }
  },
  data () {
    return {
      interval: null
    }
  },
  computed: {
    ...mapGetters({
      // todo refactor this methods
      getCurrentLayoutComponent: 'layout/getCurrentLayoutComponent',
      getCurrentLayoutStyle: 'layout/getCurrentLayoutStyle',
      getCurrentSportsProvider: 'layout/getCurrentSportsProvider',
      getPreMatchFeaturedEvents: 'pre-match-featured-events/getPreMatchFeaturedEvents',
      currentSlides: 'settings/currentSlides',
      // * refactored
      getMetadataSports: 'metadata-sports/getMetadataSports'
    })
  },
  async mounted () {
    this.$nextTick(() => {
      this.$nuxt.$loading.start()
      setTimeout(() => this.$nuxt.$loading.finish(), 500)
    })
    this.fetchMetadataSports()

    await this.fetchPreMatchFeaturedEvents()
    this.commitFeaturedBets(this.getPreMatchFeaturedEvents)
    this.fetchSliders().then(() => {
      this.commitSlides(this.currentSlides)
    })
  },
  beforeDestroy () {
    clearInterval(this.interval)
  },
  methods: {
    ...mapActions({
      // todo refactor this actions
      commitFeaturedBets: 'bets/commitFeaturedBets',
      commitSlides: 'settings/commitSlides',
      fetchPreMatchFeaturedEvents: 'pre-match-featured-events/fetchPreMatchFeaturedEvents',
      fetchSliders: 'settings/fetchSliders',
      // * refactored events
      fetchMetadataSports: 'metadata-sports/fetchMetadataSports'
    })
  }
}
</script>

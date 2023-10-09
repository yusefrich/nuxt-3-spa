<template>
  <sk-home v-if="getCurrentLayoutStyle === 'SK'" />
  <third-party-provider v-else :layout="getCurrentLayoutStyle" />
</template>

<script>
import { mapState } from 'pinia'
import { useLayoutStore } from '@/stores/layout'
// import Home from '@/components/default/templates/Home'
// import HomeNsx from '@/components/nsx/templates/HomeNsx'
// import SgHome from '@/components/sg/templates/SgHome'
// import FbHome from '@/components/fb/templates/FbHome'
// import MdHome from '@/components/md/templates/MdHome'
import SkHome from '@/components/sk/templates/SkHome'
import ThirdPartyProvider from '@/components/default/templates/ThirdPartyProvider'

export default {
  components: {
    // Home,
    // HomeNsx,
    // FbHome,
    // SgHome,
    // MdHome,
    SkHome,
    ThirdPartyProvider
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
  computed: {
    ...mapState(useLayoutStore, {
      getCurrentSportsProvider: 'getCurrentSportsProvider',
      getCurrentLayoutStyle: 'getCurrentLayoutStyle'
    }),
  },
  mounted () {
    // this.$nextTick(() => {
    //   this.$nuxt.$loading.start()
    //   setTimeout(() => this.$nuxt.$loading.finish(), 500)
    // })
  }
}
</script>

<template>
  <third-party-provider
    :layout="getCurrentLayoutStyle"
    virtuals
  />
</template>

<script>
import { mapActions, mapState } from 'pinia'
import { useLayoutStore } from '@/stores/layout'
import { useSettingsStore } from '@/stores/settings'

import ThirdPartyProvider from '@/components/default/templates/ThirdPartyProvider'

export default {
  components: {
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
      getCurrentLayoutStyle: 'getCurrentLayoutStyle',
      getCurrentSportsProvider: 'getCurrentSportsProvider',
      getCurrentLayoutComponent: 'getCurrentLayoutComponent'
    }),
    ...mapState(useSettingsStore, {
      currentSlides: 'currentSlides'
    })
  },
  async mounted () {
    this.$nextTick(() => {
      this.$nuxt.$loading.start()
      setTimeout(() => this.$nuxt.$loading.finish(), 500)
    })

    this.fetchSliders().then(() => {
      this.commitSlides(this.currentSlides)
    })
  },
  methods: {
    ...mapActions(useSettingsStore, {
      commitSlides: 'commitSlides',
      fetchSliders: 'fetchSliders'
    })
  }
}
</script>

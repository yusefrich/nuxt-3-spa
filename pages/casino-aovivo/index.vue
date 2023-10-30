<template>
  <div>
    <sg-home
      v-if="getLayout() === 'SG'"
      live
    />
    <md-casino
      v-else-if="getLayout() === 'MD'"
      live
    />
    <sk-casino
      v-else-if="getLayout() === 'SK'"
    />
    <fb-casino-home
      v-else
      :top-offset="getLayout() === 'default'?99:0"
      live
    />
  </div>
</template>

<script>
import { mapState } from 'pinia'
import { useLayoutStore } from '@/stores/layout'

import FbCasinoHome from '@/components/fb/templates/FbCasinoHome'
import SgHome from '@/components/sg/templates/SgHome'
import MdCasino from '@/components/md/templates/MdCasino'
import SkCasino from '@/components/sk/templates/SkCasino'

export default {
  components: {
    FbCasinoHome,
    SgHome,
    MdCasino,
    SkCasino
  },
  middleware: ['application_type_casino'],
  computed: {
    ...mapState(useLayoutStore, {
      getCurrentLayoutStyle: 'getCurrentLayoutStyle',
      getCurrentCasinoLayoutStyle: 'getCurrentCasinoLayoutStyle',
      getCurrentCasinoLayoutComponent: 'getCurrentCasinoLayoutComponent'
    })
  },
  methods: {
    getLayout () {
      return this.getCurrentCasinoLayoutStyle
        ? this.getCurrentCasinoLayoutStyle
        : this.getCurrentLayoutStyle
    }
  }
}
</script>

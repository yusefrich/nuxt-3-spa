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
import { mapGetters } from 'vuex'
import FbCasinoHome from '@/components/fb/templates/FbCasinoHome.vue'
import SgHome from '@/components/sg/templates/SgHome.vue'
import MdCasino from '@/components/md/templates/MdCasino.vue'
import SkCasino from '@/components/sk/templates/SkCasino.vue'

export default {
  components: {
    FbCasinoHome,
    SgHome,
    MdCasino,
    SkCasino
  },
  layout (context) {
    return context.store.getters['layout/getCurrentCasinoLayoutComponent']
      ? context.store.getters['layout/getCurrentCasinoLayoutComponent']
      : context.store.getters['layout/getCurrentLayoutComponent']
  },
  middleware: ['application_type_casino'],
  computed: {
    ...mapGetters({
      getCurrentLayoutStyle: 'layout/getCurrentLayoutStyle',
      getCurrentCasinoLayoutStyle: 'layout/getCurrentCasinoLayoutStyle',
      getCurrentCasinoLayoutComponent: 'layout/getCurrentCasinoLayoutComponent'
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

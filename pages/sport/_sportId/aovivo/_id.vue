<template>
  <div v-if="!getCurrentSportsProvider || (getCurrentSportsProvider && getCurrentSportsProvider !== 'upgaming')">
    <evento-nsx
      v-if="getLayout() === 'oldBet365'"
      :id="$route.params.id"
      live
    />
    <fb-evento
      v-else-if="getLayout() === 'FB' || getLayout() === 'FB2'"
      :id="$route.params.id"
      live
    />
    <md-evento
      v-else-if="getLayout() === 'MD'"
      :id="$route.params.id"
      :current-sport="$route.params.sportId"
      live
    />
    <sk-evento
      v-else-if="getLayout() === 'SK'"
      :id="$route.params.id"
      :current-sport="$route.params.sportId"
      live
    />
    <evento
      v-else
      :id="$route.params.id"
      live
    />
  </div>
  <third-party-provider :layout="getLayout()" v-else />
</template>

<script>
import { mapGetters } from 'vuex'
import Evento from '@/components/default/templates/Evento'
import EventoNsx from '@/components/nsx/templates/EventoNsx'
import MdEvento from '@/components/md/templates/MdEvento.vue'
import FbEvento from '@/components/fb/templates/FbEvento.vue'
import SkEvento from '@/components/sk/templates/SkEvento.vue'
import ThirdPartyProvider from '@/components/default/templates/ThirdPartyProvider.vue'
import sportradarTagManager from '@/mixins.js/sportradarTagManager.js'

export default {
  components: {
    Evento,
    EventoNsx,
    ThirdPartyProvider,
    MdEvento,
    FbEvento,
    SkEvento
  },
  mixins: [sportradarTagManager],
  layout (context) {
    return context.store.getters['layout/getCurrentSportsLayoutComponent']
      ? context.store.getters['layout/getCurrentSportsLayoutComponent']
      : context.store.getters['layout/getCurrentLayoutComponent']
  },
  middleware: ['application_type_sports'],
  computed: {
    ...mapGetters({
      getCurrentSportsProvider: 'layout/getCurrentSportsProvider',
      getCurrentLayoutStyle: 'layout/getCurrentLayoutStyle',
      getCurrentSportsLayoutStyle: 'layout/getCurrentSportsLayoutStyle'
    })
  },
  mounted () {
    // console.log('inside live internal page of a event', this.$route.fullPath)
    if (process.env.GEOLOC && process.env.GEOLOC === 'true') {
      this.getLocation()
    }
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

<template>
  <div>
    <evento-nsx
      v-if="getLayout() === 'oldBet365'"
      :slug="$route.params.slug"
    />
    <fb-evento
      v-else-if="getLayout() === 'FB' || getLayout() === 'FB2'"
      :slug="$route.params.slug"
    />
    <md-evento
      v-else-if="getLayout() === 'MD'"
      :slug="$route.params.slug"
    />
    <sk-evento
      v-else-if="getLayout() === 'SK'"
      :current-sport="$route.params.sportId"
      :slug="$route.params.slug"
    />
    <evento
      v-else
      :slug="$route.params.slug"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Evento from '@/components/default/templates/Evento.vue'
import FbEvento from '@/components/fb/templates/FbEvento.vue'
import MdEvento from '@/components/md/templates/MdEvento.vue'
import SkEvento from '@/components/sk/templates/SkEvento.vue'
import EventoNsx from '@/components/nsx/templates/EventoNsx.vue'

export default {
  components: {
    Evento,
    EventoNsx,
    FbEvento,
    MdEvento,
    SkEvento
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

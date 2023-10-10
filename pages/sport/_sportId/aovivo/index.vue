<template>
  <div v-if="!getCurrentSportsProvider || (getCurrentSportsProvider && getCurrentSportsProvider !== 'upgaming')">
    <ao-vivo
      v-if="getLayout() === 'default'"
    />
    <ao-vivo
      v-if="getLayout() === 'SG'"
      generic-styling
    />
    <nsx-ao-vivo
      v-if="getLayout() === 'oldBet365'"
    />
    <fb-ao-vivo
      v-else-if="getLayout() === 'FB' || getLayout() === 'FB2'"
    />
    <md-ao-vivo
      v-else-if="getLayout() === 'MD'"
    />
  </div>
  <third-party-provider v-else inplay :layout="getLayout()" />
</template>

<script>
import { mapGetters } from 'vuex'
import AoVivo from '@/components/default/templates/AoVivo.vue'
import NsxAoVivo from '@/components/nsx/templates/NsxAoVivo.vue'
import FbAoVivo from '@/components/fb/templates/FbAoVivo.vue'
import MdAoVivo from '@/components/md/templates/MdAoVivo.vue'
import ThirdPartyProvider from '@/components/default/templates/ThirdPartyProvider.vue'

export default {
  components: {
    AoVivo,
    NsxAoVivo,
    ThirdPartyProvider,
    FbAoVivo,
    MdAoVivo
  },
  layout (context) {
    return context.store.getters['layout/getCurrentSportsLayoutComponent']
      ? context.store.getters['layout/getCurrentSportsLayoutComponent']
      : context.store.getters['layout/getCurrentLayoutComponent']
  },
  middleware: ['application_type_sports'],
  computed: {
    ...mapGetters({
      getCurrentSportsProvider: 'layout/getCurrentSportsProvider',
      // todo refactor these getters
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

<template>
  <div v-if="!getCurrentSportsProvider || (getCurrentSportsProvider && getCurrentSportsProvider !== 'upgaming')">
    <fb-ao-vivo-all
      v-if="getCurrentLayoutStyle === 'FB' || getCurrentLayoutStyle === 'FB2'"
    />
    <ao-vivo
      v-else-if="getCurrentLayoutStyle === 'default'"
    />
    <ao-vivo
      v-else
      generic-styling
    />
  </div>
  <third-party-provider v-else inplay :layout="getLayout()" />
</template>

<script>
import { mapGetters } from 'vuex'
import AoVivo from '@/components/default/templates/AoVivo.vue'
import FbAoVivoAll from '@/components/fb/templates/FbAoVivoAll.vue'
import ThirdPartyProvider from '@/components/default/templates/ThirdPartyProvider.vue'

export default {
  components: {
    AoVivo,
    FbAoVivoAll,
    ThirdPartyProvider
  },
  layout (context) {
    return context.store.getters['layout/getCurrentLayoutComponent']
  },
  middleware: ['application_type_sports'],
  computed: {
    ...mapGetters({
      getCurrentSportsProvider: 'layout/getCurrentSportsProvider',
      getCurrentLayoutStyle: 'layout/getCurrentLayoutStyle'
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

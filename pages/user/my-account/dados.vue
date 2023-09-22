<template>
  <div>
    <sk-settings v-if="getCurrentLayoutStyle === 'SK'" />
    <fb-user-update v-else-if="getCurrentLayoutStyle === 'FB' || getCurrentLayoutStyle === 'FB2'" />
    <dados v-else />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Dados from '@/components/default/templates/Dados.vue'
import FbUserUpdate from '@/components/fb/templates/FbUserUpdate.vue'
import SkSettings from '@/components/sk/templates/SkSettings.vue'

export default {
  components: {
    Dados,
    SkSettings,
    FbUserUpdate
  },
  layout (context) {
    return context.store.getters['layout/getCurrentLayoutComponent']
  },
  middleware: ['protected'],
  computed: {
    ...mapGetters({
      getCurrentLayoutStyle: 'layout/getCurrentLayoutStyle'
    })
  }
}
</script>

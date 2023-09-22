<template>
  <div>
    <fb-bonus v-if="getCurrentLayoutStyle === 'FB' || getCurrentLayoutStyle === 'FB2'" />
    <bonus v-else />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import FbBonus from '@/components/fb/templates/FbBonus.vue'
import Bonus from '@/components/default/templates/Bonus.vue'

export default {
  components: {
    FbBonus,
    Bonus
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

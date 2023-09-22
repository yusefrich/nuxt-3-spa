<template>
  <bets which-bets="pendentes" />
</template>

<script>
import Bets from '~/components/default/templates/Bets.vue'

export default {
  components: {
    Bets
  },
  layout (context) {
    return context.store.getters['layout/getCurrentLayoutComponent']
  },
  middleware: ['protected']
}
</script>

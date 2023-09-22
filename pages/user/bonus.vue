<template>
  <fb-bonus />
</template>

<script>
import FbBonus from '@/components/fb/templates/FbBonus.vue'

export default {
  components: {
    FbBonus
  },
  layout (context) {
    return context.store.getters['layout/getCurrentLayoutComponent']
  }
}
</script>

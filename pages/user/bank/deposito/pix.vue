<template>
  <fb-deposit />
</template>

<script>
import FbDeposit from '@/components/fb/templates/FbDeposit.vue'

export default {
  components: {
    FbDeposit
  },
  layout (context) {
    return context.store.getters['layout/getCurrentLayoutComponent']
  }
}
</script>

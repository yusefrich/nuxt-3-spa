<template>
  <logout />
</template>

<script>
import Logout from '@/components/default/templates/Logout.vue'

export default {
  components: {
    Logout
  },
  layout (context) {
    return context.store.getters['layout/getCurrentLayoutComponent']
  }
}
</script>

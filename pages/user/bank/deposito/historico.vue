<template>
  <user>
    <deposits class="text-white" />
  </user>
</template>

<script>
import User from '@/components/default/templates/User.vue'
import Deposits from '@/components/default/organisms/Deposits.vue'

export default {
  components: {
    User,
    Deposits
  },
  layout (context) {
    return context.store.getters['layout/getCurrentLayoutComponent']
  },
  middleware: ['protected']
}
</script>

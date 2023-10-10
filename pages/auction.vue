<template>
  <auction />
</template>

<script>
import Auction from '@/components/default/templates/Auction.vue'

export default {
  components: {
    Auction
  },
  layout (context) {
    return context.store.getters['layout/getCurrentLayoutComponent']
  }
}
</script>

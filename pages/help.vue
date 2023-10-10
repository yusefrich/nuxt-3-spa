<template>
  <div class="container mt-3">
    <md-help-container v-if="getCurrentLayoutStyle === 'MD'" />
    <fb-help-container v-else />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  layout (context) {
    return context.store.getters['layout/getCurrentLayoutComponent']
  },
  computed: {
    ...mapGetters({
      getCurrentLayoutStyle: 'layout/getCurrentLayoutStyle'
    })
  }
}
</script>

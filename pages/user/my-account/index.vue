<template>
  <personal-data />
</template>

<script>
import PersonalData from '@/components/default/templates/PersonalData.vue'

export default {
  components: {
    PersonalData
  },
  layout (context) {
    return context.store.getters['layout/getCurrentLayoutComponent']
  },
  middleware: ['protected']
}
</script>

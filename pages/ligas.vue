<template>
  <championships />
</template>

<script>
import Championships from '@/components/default/templates/Championships.vue'

export default {
  components: {
    Championships
  },
  layout (context) {
    return context.store.getters['layout/getCurrentLayoutComponent']
  },
  middleware: ['application_type_sports']
}
</script>

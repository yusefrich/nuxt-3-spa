<template>
  <senha />
</template>

<script>
import Senha from '@/components/default/templates/Senha.vue'

export default {
  components: {
    Senha
  },
  layout (context) {
    return context.store.getters['layout/getCurrentLayoutComponent']
  },
  middleware: ['protected']
}
</script>

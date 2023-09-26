<template>
  <fb-forgot-password v-if="getCurrentLayoutStyle === 'FB' || getCurrentLayoutStyle === 'FB2'" />
  <forgot-password v-else />
</template>

<script>
import { mapGetters } from 'vuex'
import FbForgotPassword from '@/components/fb/templates/FbForgotPassword.vue'
import ForgotPassword from '@/components/default/templates/ForgotPassword.vue'

export default {
  components: {
    FbForgotPassword,
    ForgotPassword
  },
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

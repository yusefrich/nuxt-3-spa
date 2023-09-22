<template>
  <div>
    <nsx-register v-if="getCurrentLayoutStyle === 'oldBet365'" />
    <fb-register v-else-if="getCurrentLayoutStyle === 'FB' || getCurrentLayoutStyle === 'FB2'" />
    <register v-else />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Register from '@/components/default/templates/Register.vue'
import NsxRegister from '@/components/nsx/templates/NsxRegister.vue'
import FbRegister from '@/components/fb/templates/FbRegister.vue'

export default {
  components: {
    Register,
    NsxRegister,
    FbRegister
  },
  layout (context) {
    return context.store.getters['layout/getCurrentLayoutComponent']
  },
  // middleware: ['sign-in'],
  computed: {
    ...mapGetters({
      loggedInUser: 'loggedInUser',
      getCurrentLayoutStyle: 'layout/getCurrentLayoutStyle'
    })
  }
}
</script>

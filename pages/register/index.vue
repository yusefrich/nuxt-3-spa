<template>
  <div>
    <nsx-register v-if="getCurrentLayoutStyle === 'oldBet365'" />
    <md-register v-else-if="getCurrentLayoutStyle === 'MD'" />
    <fb-register v-else-if="getCurrentLayoutStyle === 'FB' || getCurrentLayoutStyle === 'FB2'" />
    <register v-else />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Register from '@/components/default/templates/Register.vue'
import NsxRegister from '@/components/nsx/templates/NsxRegister.vue'
import FbRegister from '@/components/fb/templates/FbRegister.vue'
import MdRegister from '@/components/md/templates/MdRegister.vue'

export default {
  components: {
    Register,
    NsxRegister,
    FbRegister,
    MdRegister
  },
  layout (context) {
    return context.store.getters['layout/getCurrentLayoutComponent']
  },
  // middleware: ['sign_in'],
  // created () {
  //   if (this.loggedInUser) {
  //     this.$router.push(this.localePath('/'))
  //   }
  // },
  computed: {
    ...mapGetters({
      loggedInUser: 'loggedInUser',
      getCurrentLayoutStyle: 'layout/getCurrentLayoutStyle'
    })
  }
}
</script>

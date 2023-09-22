<template>
  <div>
    <sp-login v-if="getCurrentLayoutStyle === 'SquarePlus'" :key="key" />
    <md-login v-else-if="getCurrentLayoutStyle === 'MD'" :key="key" />
    <fb-login v-else-if="getCurrentLayoutStyle === 'FB' || getCurrentLayoutStyle === 'FB2'" :key="key" />
    <login v-else :key="key" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import FbLogin from '@/components/fb/templates/FbLogin.vue'
import MdLogin from '@/components/md/templates/MdLogin.vue'
import Login from '@/components/default/templates/Login.vue'

export default {
  components: {
    FbLogin,
    Login,
    MdLogin
  },
  layout (context) {
    return context.store.getters['layout/getCurrentLayoutComponent']
  },
  // middleware: ['sign_in'],
  data () {
    return {
      key: 0
    }
  },
  computed: {
    ...mapGetters({
      currentSettings: 'settings/currentSettings',
      getCurrentLayoutStyle: 'layout/getCurrentLayoutStyle'
    })
  },
  mounted () {
    this.key++
  }
}
</script>

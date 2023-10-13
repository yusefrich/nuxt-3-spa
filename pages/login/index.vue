<template>
  <div>
    <md-login v-if="getCurrentLayoutStyle === 'MD'" :key="key" />
    <!-- <fb-login v-else-if="getCurrentLayoutStyle === 'FB' || getCurrentLayoutStyle === 'FB2'" :key="key" /> -->
    <login v-else :key="key" />
  </div>
</template>

<script>
import { mapState } from 'pinia'
import { useLayoutStore } from '@/stores/layout'

// import FbLogin from '@/components/fb/templates/FbLogin'
import MdLogin from '@/components/md/templates/MdLogin'
import Login from '@/components/default/templates/Login'

export default {
  components: {
    // FbLogin,
    Login,
    MdLogin
  },
  // middleware: ['sign_in'],
  data () {
    return {
      key: 0
    }
  },
  computed: {
    ...mapState(useLayoutStore, {
      getCurrentLayoutStyle: 'getCurrentLayoutStyle'
    })
  },
  mounted () {
    this.key++
  }
}
</script>

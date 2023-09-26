<template>
  <div>
    <nsx-update-password
      v-if="getCurrentLayoutStyle === 'oldBet365'"
      :token="token"
      :email="email"
    />
    <fb-forgot-password-update
      v-else-if="getCurrentLayoutStyle === 'FB' || getCurrentLayoutStyle === 'FB2'"
      :token="token"
      :email="email"
    />
    <md-update-password
      v-else-if="getCurrentLayoutStyle === 'MD'"
    />
    <update-password
      v-else
      :token="token"
      :email="email"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import UpdatePassword from '@/components/default/templates/UpdatePassword.vue'
import NsxUpdatePassword from '@/components/nsx/templates/NsxUpdatePassword.vue'
import FbForgotPasswordUpdate from '@/components/fb/templates/FbForgotPasswordUpdate.vue'
import MdUpdatePassword from '@/components/md/templates/MdUpdatePassword.vue'

export default {
  components: {
    UpdatePassword,
    NsxUpdatePassword,
    FbForgotPasswordUpdate,
    MdUpdatePassword
  },
  layout (context) {
    return context.store.getters['layout/getCurrentLayoutComponent']
  },
  data () {
    return {
      token: null,
      email: null
    }
  },
  computed: {
    ...mapGetters({
      getCurrentLayoutStyle: 'layout/getCurrentLayoutStyle'
    })
  },
  mounted () {
    const token = this.$route.params.token
    const email = this.$route.params.email
    this.token = token
    this.email = email
  }
}
</script>

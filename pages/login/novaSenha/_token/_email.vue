<template>
  <div>
    <fb-forgot-password-update
      v-if="getCurrentLayoutStyle === 'FB'"
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
import { mapState } from 'pinia'
import { useLayoutStore } from '@/stores/layout'

import UpdatePassword from '@/components/default/templates/UpdatePassword'
import FbForgotPasswordUpdate from '@/components/fb/templates/FbForgotPasswordUpdate'
import MdUpdatePassword from '@/components/md/templates/MdUpdatePassword'

export default {
  components: {
    UpdatePassword,
    FbForgotPasswordUpdate,
    MdUpdatePassword
  },
  data () {
    return {
      token: null,
      email: null
    }
  },
  computed: {
    ...mapState(useLayoutStore, {
      getCurrentLayoutStyle: 'getCurrentLayoutStyle'
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

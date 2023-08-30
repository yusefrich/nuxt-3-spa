<template>
  <user v-if="getCurrentLayoutStyle === 'default'">
    <fut-new-password
      :get-errors="getErrors"
      @clear="clear()"
      @updatePassword="payload => updatePassword(payload)"
    />
  </user>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import User from '@/components/default/templates/User.vue'
import FutNewPassword from '@/components/default/molecules/FutNewPassword.vue'

export default {
  name: 'Senha',
  components: {
    User,
    FutNewPassword
  },
  computed: {
    ...mapGetters({
      getErrors: 'errors/getErrors'
    })
  },
  methods: {
    ...mapActions({
      clear: 'errors/clear',
      updatePassword: 'updatePassword'
    }),
    updateWrapper (payload) {
      this.updatePassword(payload)
    }
  }
}
</script>

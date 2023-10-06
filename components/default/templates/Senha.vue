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
import { mapState, mapActions } from 'pinia'
import { useBaseStore } from '@/stores/base'

import User from '@/components/default/templates/User'
import FutNewPassword from '@/components/default/molecules/FutNewPassword'

export default {
  name: 'Senha',
  components: {
    User,
    FutNewPassword
  },
  computed: {
    ...mapState(useBaseStore, {
      getErrors: 'getErrors'
    })
  },
  methods: {
    ...mapActions(useBaseStore, {
      cleanErrors: 'cleanErrors',
      updatePassword: 'updatePassword'
    }),
    updateWrapper (payload) {
      this.updatePassword(payload)
    }
  }
}
</script>

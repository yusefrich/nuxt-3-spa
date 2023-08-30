<template>
  <user v-if="loggedInUser">
    <withdraw
      v-if="currentSettings"
      class="text-white"
      :response="withdrawResponse"
      :user="loggedInUser"
      :withdraw-limit-min="+currentSettings.wd_limit_min"
      :withdraw-limit-max="+currentSettings.wd_limit_max"
      :midnight-block="currentSettings.block_wd_midnight"
      :document="loggedInUser.player.document"
      :phone="loggedInUser.phone"
      :email="loggedInUser.email"
      :loading="getBankLoading"
      :response-errors="getBankErrors"
      :pix-types="currentSettings.pix_types"
      @submit="payload => submitWithdraw(payload)"
      @clearResponse="withdrawResponse = null"
    />
  </user>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import User from '@/components/default/templates/User.vue'
import Withdraw from '@/components/default/organisms/Withdraw.vue'

export default {
  name: 'FutWithdraw',
  components: {
    User,
    Withdraw
  },
  data () {
    return {
      withdrawResponse: null
    }
  },
  computed: {
    ...mapGetters({
      getBankLoading: 'onboarding-bank/getBankLoading',
      getBankErrors: 'onboarding-bank/getBankErrors',
      currentSettings: 'settings/currentSettings',
      loggedInUser: 'loggedInUser'
    })
  },
  methods: {
    ...mapActions({
      postBankWithdraw: 'onboarding-bank/postBankWithdraw'
    }),
    submitWithdraw (payload) {
      this.postBankWithdraw(payload).then((result) => {
        this.withdrawResponse = result
      })
    }
  }
}
</script>

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
import { mapActions, mapState } from 'pinia'
import { useBaseStore } from '@/stores/base'
import { useSettingsStore } from '@/stores/settings'
import { useOnboardingBankStore } from '@/stores/onboarding-bank'

import User from '@/components/default/templates/User'
import Withdraw from '@/components/default/organisms/Withdraw'

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
    ...mapState(useBaseStore, {
      loggedInUser: 'loggedInUser'
    }),
    ...mapState(useSettingsStore, {
      currentSettings: 'currentSettings'
    }),
    ...mapState(useOnboardingBankStore, {
      getBankErrors: 'getBankErrors',
      getBankLoading: 'getBankLoading'
    })
  },
  methods: {
    ...mapActions(useOnboardingBankStore, {
      postBankWithdraw: 'postBankWithdraw'
    }),
    submitWithdraw (payload) {
      this.postBankWithdraw(payload).then((result) => {
        this.withdrawResponse = result
      })
    }
  }
}
</script>

<template>
  <div class="container px-0">
    <fb-bets-group
      v-if="userBets"
      :bets="userBets.all"
      :pagination="getHasMoreBets"
      :page="getPage"
      @next="nextUserBets(filters)"
      @submitCashout="payload => submitCashout(payload)"
    />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import FbBetsGroup from '@/components/fb/organisms/FbBetsGroup.vue'

export default {
  name: 'FbMyBets',
  components: {
    FbBetsGroup
  },
  data () {
    return {
      filters: null
    }
  },
  computed: {
    ...mapGetters({
      userBets: 'userBets',
      getHasMoreBets: 'getHasMoreBets',
      getPage: 'getPage'
    })
  },
  created () {
    this.fetchUserBets()
  },
  methods: {
    ...mapActions({
      fetchUserBets: 'fetchUserBets',
      commitCashOut: 'onboarding-tickets/commitCashOut',
      nextUserBets: 'nextUserBets'
    }),
    submitCashout (id) {
      this.commitCashOut(id).then(() => {
        location.reload()
      })
    }
  }
}
</script>

<template>
  <div class="container px-0">
    <fb-bets-group
      v-if="userBets"
      :bets="userBets.all"
      :pagination="getHasMoreBets"
      :page="getPage"
      @next="nextUserBets(filters)"
    />
  </div>
</template>

<script>
import { mapState, mapActions } from 'pinia'
import { useBaseStore } from '@/stores/base'

import FbBetsGroup from '@/components/fb/organisms/FbBetsGroup'

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
    ...mapState(useBaseStore, {
      userBets: 'userBets',
      getHasMoreBets: 'getHasMoreBets',
      getPage: 'getPage'
    })
  },
  created () {
    this.fetchUserBets()
  },
  methods: {
    ...mapActions(useBaseStore, {
      fetchUserBets: 'fetchUserBets',
      nextUserBets: 'nextUserBets'
    })
  }
}
</script>

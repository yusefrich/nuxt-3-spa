<template>
  <user>
    <bets-group
      :bets="bets"
    />
  </user>
</template>

<script>
import { mapState, mapActions } from 'pinia'
import { useBaseStore } from '@/stores/base'

import User from '@/components/default/templates/User'
import BetsGroup from '@/components/default/molecules/BetsGroup'

export default {
  name: 'Bets',
  components: {
    User,
    BetsGroup
  },
  props: {
    whichBets: {
      type: String,
      default: 'resolvidas'
    }
  },
  data () {
    return {
      bets: []
    }
  },
  computed: {
    ...mapState(useBaseStore, {
      userBets: 'userBets'
    })
  },
  mounted () {
    this.fetchUserBets().then(() => {
      if (this.whichBets === 'resolvidas') {
        this.bets = this.userBets.done
      } else if (this.whichBets === 'pendentes') {
        this.bets = this.userBets.pending
      }
    }).catch(() => {
      this.$toast.open({
        message: 'Erro durante o retorno das aposta do usuário... tente novamente',
        type: 'error'
      })
    })
  },
  methods: {
    ...mapActions(useBaseStore, {
      fetchUserBets: 'fetchUserBets'
    })
  }
}
</script>

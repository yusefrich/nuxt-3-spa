<template>
  <user>
    <bets-group
      :bets="bets"
      @submitCashout="payload => submitCashout(payload)"
    />
  </user>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import User from '@/components/default/templates/User.vue'
import BetsGroup from '@/components/default/molecules/BetsGroup.vue'

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
    ...mapGetters({
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
    ...mapActions({
      commitCashOut: 'onboarding-tickets/commitCashOut',
      fetchUserBets: 'fetchUserBets'
    }),
    submitCashout (id) {
      this.commitCashOut(id).then(() => {
        location.reload()
      })
    }
  }
}
</script>

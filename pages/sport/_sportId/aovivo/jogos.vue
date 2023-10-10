<template>
  <div>
    <ao-vivo
      v-if="getLayout() === 'default'"
      :inplay-games="getInplayEvents"
      :post-bet-error="getPreCashInTicketsErrors"
    />
    <ao-vivo
      v-if="getLayout() === 'SG'"
      generic-styling
      :inplay-games="getInplayEvents"
      :post-bet-error="getPreCashInTicketsErrors"
    />
    <nsx-ao-vivo
      v-if="getLayout() === 'oldBet365'"
      :inplay-games="getInplayEvents"
    />
    <fb-ao-vivo
      v-else-if="getLayout() === 'FB' || getLayout() === 'FB2'"
      :inplay-games="getInplayEvents"
      :post-bet-error="getPreCashInTicketsErrors"
    />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import AoVivo from '@/components/default/templates/AoVivo'
import NsxAoVivo from '@/components/nsx/templates/NsxAoVivo'
import FbAoVivo from '@/components/fb/templates/FbAoVivo'

export default {
  components: { AoVivo, NsxAoVivo, FbAoVivo },
  layout (context) {
    return context.store.getters['layout/getCurrentSportsLayoutComponent'] ? context.store.getters['layout/getCurrentSportsLayoutComponent'] : context.store.getters['layout/getCurrentLayoutComponent']
  },
  middleware: ['application_type_sports'],
  data () {
    return {
      interval: null
    }
  },
  computed: {
    ...mapGetters({
      getCurrentLayoutStyle: 'layout/getCurrentLayoutStyle',
      getCurrentSportsLayoutStyle: 'layout/getCurrentSportsLayoutStyle',
      getPreCashInTicketsErrors: 'tickets-pre-cash-in/getPreCashInTicketsErrors',
      getInplayEvents: 'inplay/getInplayEvents'
    })
  },
  mounted () {
    this.$root.$on('postBet', (payload, done) => {
      this.commitCashIn(payload).then(() => {
        this.authUser()
      })

      done(true)
    })
    this.getInplay()
    const that = this
    this.interval = setInterval(function () {
      that.getInplay()
    }, 5000)
  },
  beforeDestroy () {
    clearInterval(this.interval)
    this.$root.$off('postBet')
  },
  methods: {
    ...mapActions({
      authUser: 'authUser',
      commitCashIn: 'tickets-pre-cash-in/commitCashIn',
      fetchInplayEvents: 'inplay/fetchInplayEvents'
    }),
    getInplay () {
      this.fetchInplayEvents(this.$route.params.sportId).then((data) => {
        this.$root.$emit('updateInplays', data)
      }).catch(() => {
        this.$toast.open({ message: 'Erro ao consultar jogos ao vivo', type: 'error' })
      })
    },
    getLayout () {
      return this.getCurrentSportsLayoutStyle ? this.getCurrentSportsLayoutStyle : this.getCurrentLayoutStyle
    }
  }
}
</script>

<style>
</style>

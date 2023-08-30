<template>
  <div class="ao-vivo">
    <md-games-table-wrapper
      :title="$t('i18n_jogos_ao_vivo')"
      img-url="/md/icon-lightning.svg"
      :loading="getInplayLoading"
      inplay
      @fetchPage="concatPreMatchEvents()"
    >
      <template #filter>
        <md-select-sport
          v-if="getMetadataInplaySports"
          :sports="getMetadataInplaySports"
          inplay
        />
      </template>

      <template #table>
        <md-games-list
          v-if="currentSettings"
          :events="getInplayEvents"
          :events-sport="sport"
          :tickets="getPreCashInTickets"
          :sport="sport"
          inplay
          @selectBet="ticket => toggleTicket(ticket)"
        />
      </template>
    </md-games-table-wrapper>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import MdGamesTableWrapper from '@/components/md/atoms/MdGamesTableWrapper.vue'
import MdSelectSport from '@/components/md/molecules/MdSelectSport.vue'
import MdGamesList from '@/components/md/organisms/MdGamesList.vue'

export default {
  name: 'MdAoVivo',
  components: {
    MdGamesTableWrapper,
    MdSelectSport,
    MdGamesList
  },
  data () {
    return {
      sport: '6046',
      interval: null
    }
  },
  computed: {
    ...mapGetters({
      currentSettings: 'settings/currentSettings',
      getMetadataInplaySports: 'metadata-sports/getMetadataInplaySports',
      getInplayLoading: 'inplay/getInplayLoading',
      getPreCashInTickets: 'tickets-pre-cash-in/getPreCashInTickets',
      getInplayEvents: 'inplay/getInplayEvents'
    })
  },
  created () {
    this.sport = this.$route.params.sportId

    this.fetchMetadataInplaySports()

    this.fetchInplayEvents(this.sport)

    if (
      !process.env.WS_HOST ||
      !process.env.WS_KEY ||
      !process.env.WS_ACTIVE ||
      (process.env.WS_ACTIVE && process.env.WS_ACTIVE !== 'true')
    ) {
      this.interval = setInterval(() => {
        this.fetchInplayEvents(this.sport)
      }, 5000)
    } else {
      this.interval = setInterval(() => {
        this.fetchAndAddInplayEvents(this.sport)
      }, 180000)
    }
  },
  beforeDestroy () {
    clearInterval(this.interval)
  },
  methods: {
    ...mapActions({
      fetchMetadataInplaySports: 'metadata-sports/fetchMetadataInplaySports',
      fetchAndAddInplayEvents: 'inplay/fetchAndAddInplayEvents',
      concatPreMatchEvents: 'pre-match/concatPreMatchEvents',
      toggleTicket: 'tickets-pre-cash-in/toggleTicket',
      fetchInplayEvents: 'inplay/fetchInplayEvents'
    })
  }
}
</script>

<style lang="scss" scoped>
.ao-vivo {
  background: var(--md-bg-color);
}
</style>

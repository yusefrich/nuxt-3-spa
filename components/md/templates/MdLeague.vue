<template>
  <div class="md-leagues">
    <md-games-table-wrapper
      :title="$t('i18n_destaques')"
      img-url="/md/icon-stars.svg"
      @fetchPage="concatPreMatchEvents()"
    >
      <template #table>
        <md-games-list
          v-if="currentSettings"
          :events="events"
          :events-sport="currentSport"
          :tickets="getPreCashInTickets"
          @selectBet="ticket => toggleTicket(ticket)"
        />
      </template>
    </md-games-table-wrapper>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import MdGamesTableWrapper from '@/components/md/atoms/MdGamesTableWrapper.vue'
import MdGamesList from '@/components/md/organisms/MdGamesList.vue'

export default {
  name: 'MdLeague',
  components: {
    MdGamesTableWrapper,
    MdGamesList
  },
  data () {
    return {
      id: null,
      currentSport: null
    }
  },
  computed: {
    ...mapGetters({
      events: 'events/events',
      currentSettings: 'settings/currentSettings',
      getPreCashInTickets: 'tickets-pre-cash-in/getPreCashInTickets',
      getPreMatchFeaturedEvents: 'pre-match-featured-events/getPreMatchFeaturedEvents'
    })
  },
  async mounted () {
    this.id = +this.$route.params.id
    this.currentSport = (this.$route.params.sportId) ? +this.$route.params.sportId : 1

    document.querySelector('.scrollable-content').scrollTo({
      top: 0
    })

    this.fetchEventsFromLeague(this.id)
    await this.fetchPreMatchFeaturedEvents(this.currentSport)
    this.commitFeaturedBets(this.getPreMatchFeaturedEvents)
  },
  methods: {
    ...mapActions({
      fetchPreMatchFeaturedEvents: 'pre-match-featured-events/fetchPreMatchFeaturedEvents',
      concatPreMatchEvents: 'pre-match/concatPreMatchEvents',
      fetchEventsFromLeague: 'events/fetchEventsFromLeague',
      commitFeaturedBets: 'bets/commitFeaturedBets',
      toggleTicket: 'tickets-pre-cash-in/toggleTicket'
    })
  }
}
</script>

<style lang="scss" scoped>
.md-leagues {
  width: 100%;
  background: var(--md-bg-color);
}
</style>

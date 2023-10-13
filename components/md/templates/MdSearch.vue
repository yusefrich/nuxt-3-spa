<template>
  <div class="md-search">
    <md-games-table-wrapper
      :title="$t('i18n_jogos')"
      img-url="/md/icon-search.png"
    >
      <template #table>
        <template v-for="(group, i) in getPreMatchSeachEvents">
          <template v-for="(sport, j) in group.sport">
            <template v-for="(league, k) in sport.leagues">
              <md-games-list
                v-if="currentSettings"
                :key="`searched_sports_${i}_${j}_${k}`"
                :events="[league]"
                :events-sport="getCurrentProvider === 'default' ? 1 : 6046"
                :tickets="getPreCashInTickets"
                @selectBet="ticket => toggleTicket(ticket)"
              />
            </template>
          </template>
        </template>
      </template>
    </md-games-table-wrapper>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import MdGamesTableWrapper from '@/components/md/atoms/MdGamesTableWrapper.vue'
import MdGamesList from '@/components/md/organisms/MdGamesList.vue'

export default {
  name: 'MdSearch',
  components: {
    MdGamesTableWrapper,
    MdGamesList
  },
  computed: {
    ...mapGetters({
      currentSettings: 'settings/currentSettings',
      getCurrentProvider: 'sports/getCurrentProvider',
      getPreCashInTickets: 'tickets-pre-cash-in/getPreCashInTickets',
      getPreMatchSeachEvents: 'pre-match-search-events/getPreMatchSeachEvents'
    })
  },
  created () {
    if (this.$route.params.term) {
      this.fetchPreMatchSearchEvents(this.$route.params.term)

      return
    }

    this.$router.push(this.localePath('/'))
  },
  methods: {
    ...mapActions({
      fetchPreMatchSearchEvents: 'pre-match-search-events/fetchPreMatchSearchEvents',
      toggleTicket: 'tickets-pre-cash-in/toggleTicket'
    })
  }
}
</script>

<style lang="scss" scoped>
.md-search {
  background: var(--md-bg-color);
}

@media (max-width: 425px) {
  .md-search {
    padding: 1px 0;
  }
}
</style>

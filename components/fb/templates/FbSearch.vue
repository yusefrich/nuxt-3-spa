<template>
  <div>
    <fb-sections-heading
      class="d-md-none"
      :title="$tc('i18n_esporte', 2)"
      route="/sports"
    />
    <template v-for="(group, i) in getPreMatchSeachEvents">
      <template v-for="(sport, j) in group.sport">
        <template v-for="(league, k) in sport.leagues">
          <fb-games-list
            v-if="currentSettings"
            :key="'searched_sports_' + i + '_' + j + '_' + k"
            :events="[league]"
            :events-sport="getCurrentProvider === 'default' ? 1 : sport.id"
            :loading="getPreMatchSearchEventsLoading"
            :stripped="currentSettings.stripped"
            :font="currentSettings.font"
            :tickets="getPreCashInTickets"
            :settings="currentSettings"
            style="margin-top: 0 !important"
            @invalidMultiple="val => setInvalidMultiple(val)"
            @selectBet="ticket => toggleTicket(ticket)"
          >
            <template #:title>
              <img v-if="sport.id === 6046" class="ms-1 me-2" src="/FbIcons/1.png">
              <img v-if="sport.id === 48242" class="ms-1 me-2" src="/FbIcons/6.png">
              <img v-if="sport.id === 154919" class="ms-1 me-2" src="/FbIcons/69.png">
              <img v-if="sport.id === 54094" class="ms-1 me-2" src="/FbIcons/3.png">
              <img v-if="sport.id === 265917" class="ms-1 me-2" src="/FbIcons/19.png">
              <img v-if="sport.id === 154830" class="ms-1 me-2" src="/FbIcons/4.png">
              <img v-if="sport.id === 621569" class="ms-1 me-2" src="/FbIcons/60.png">
              <img v-if="sport.id === 35709" class="ms-1 me-2" src="/FbIcons/5.png">
              <img v-if="sport.id === 154914" class="ms-1 me-2" src="/FbIcons/23.png">
              <img v-if="sport.id === 687890" class="ms-1 me-2" src="/FbIcons/95.png">
              <img v-if="sport.id === 131506" class="ms-1 me-2" src="/FbIcons/2.png">
              <span class="title-head">{{ sport.name }} / {{ league.name }}</span>
            </template>
          </fb-games-list>
        </template>
      </template>
    </template>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import FbSectionsHeading from '@/components/fb/atoms/FbSectionsHeading.vue'
import FbGamesList from '@/components/fb/organisms/FbGamesList.vue'

export default {
  name: 'FbSearch',
  components: {
    FbGamesList,
    FbSectionsHeading
  },
  computed: {
    ...mapGetters({
      getCurrentProvider: 'sports/getCurrentProvider',
      currentSettings: 'settings/currentSettings',
      getPreCashInTickets: 'tickets-pre-cash-in/getPreCashInTickets',
      getPreMatchSearchEventsLoading: 'pre-match-search-events/getPreMatchSearchEventsLoading',
      getPreMatchSeachEvents: 'pre-match-search-events/getPreMatchSeachEvents'
    })
  },
  created () {
    if (this.$route.params.term) {
      this.fetchPreMatchSearchEvents(this.$route.params.term)
    }
  },
  methods: {
    ...mapActions({
      fetchPreMatchSearchEvents: 'pre-match-search-events/fetchPreMatchSearchEvents',
      setInvalidMultiple: 'tickets-pre-cash-in/setInvalidMultiple',
      toggleTicket: 'tickets-pre-cash-in/toggleTicket'
    })
  }
}
</script>

<style lang="scss" scoped>
.button-content {
  margin-top: -9px;
  text-align: center;
  padding: 10px;
  padding-top: 10px;
  padding-bottom: 10px;
  padding-top: 5px;
  padding-bottom: 5px;
}
.hp-box {
  width: calc(50% - 2px);
  width: 100%;
  min-height: 78px;
  position: relative;
  background-color: #31343b;
  box-shadow: 1px 2px 2px 0px rgba(0,0,0,0.4);
  a {
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
    display: block;
    width: 100%;
    min-height: 78px;
  }
}
.icons-size {
  width: 150px;
}
.options-container{
  background: var(--fut-background-lighter);
  display: flex;
  button{
    margin-right: 1px !important;
    margin-bottom: 1px !important;
  }
}
</style>

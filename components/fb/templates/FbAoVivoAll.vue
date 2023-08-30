<template>
  <div class="container-fluid p-0 px-md-2">
    <div class="game-list-menu">
      <fb-select-sport
        class="d-none d-md-flex"
        inplay
        :sports="getMetadataInplaySports"
        @selectSport="id => currentSport = id"
      />
      <template v-for="(sport, i) in getInplayEventsGroupedBySportAndCountry" :key="'games_inplay_group_' + i">
        <div
          v-if="!currentSport || currentSport === +sport.sport_id"
          class="inplay-wrapper"
        >
          <div class="header-sport w-100 d-flex justify-content-between align-items-center">
            <div class="d-flex align-items-center py-2 px-1">
              <img v-if="+sport.sport_id === 6046" class="mr-10 d-none d-md-inline" src="/FbIcons/1.png">
              <img v-if="+sport.sport_id === 48242" class="mr-10 d-none d-md-inline" src="/FbIcons/6.png">
              <img v-if="+sport.sport_id === 154919" class="mr-10 d-none d-md-inline" src="/FbIcons/69.png">
              <img v-if="+sport.sport_id === 54094" class="mr-10 d-none d-md-inline" src="/FbIcons/3.png">
              <img v-if="+sport.sport_id === 265917" class="mr-10 d-none d-md-inline" src="/FbIcons/19.png">
              <img v-if="+sport.sport_id === 154830" class="mr-10 d-none d-md-inline" src="/FbIcons/4.png">
              <img v-if="+sport.sport_id === 621569" class="mr-10 d-none d-md-inline" src="/FbIcons/60.png">
              <img v-if="+sport.sport_id === 35709" class="mr-10 d-none d-md-inline" src="/FbIcons/5.png">
              <img v-if="+sport.sport_id === 154914" class="mr-10 d-none d-md-inline" src="/FbIcons/23.png">
              <img v-if="+sport.sport_id === 687890" class="mr-10 d-none d-md-inline" src="/FbIcons/95.png">
              <img v-if="+sport.sport_id === 131506" class="mr-10 d-none d-md-inline" src="/FbIcons/2.png">
              <span class="sport-title text-background">{{ getSportName(sport, getMetadataInplaySports) }}</span>
            </div>
          </div>
          <template v-for="(location, j) in sport.locations" :key="'games_listing_component_' + j">
            <fb-inplay-game-list
              v-if="currentSettings"
              :inplay-games="location.events"
              :font="currentSettings.font"
              :loading="loading"
              :tickets="getPreCashInTickets"
              nav
              breadcrumb
              @invalidMultiple="val => setInvalidMultiple(val)"
              @selectBet="ticket => toggleTicket(ticket)"
            />
          </template>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import FbInplayGameList from '@/components/fb/organisms/FbInplayGameList.vue'
import FbSelectSport from '@/components/fb/molecules/FbSelectSport.vue'

export default {
  name: 'FbAoVivoAll',
  components: {
    FbInplayGameList,
    FbSelectSport
  },
  data () {
    return {
      loading: false,
      interval: null,
      currentSport: null
    }
  },
  computed: {
    ...mapGetters({
      currentSettings: 'settings/currentSettings',
      getPreCashInTickets: 'tickets-pre-cash-in/getPreCashInTickets',
      getMetadataInplaySports: 'metadata-sports/getMetadataInplaySports',
      getInplayEventsGroupedBySportAndCountry: 'inplay/getInplayEventsGroupedBySportAndCountry'
    })
  },
  created () {
    this.fetchMetadataInplaySports()
    this.loading = true
    this.fetchInplayEvents().finally(() => {
      this.loading = false
    })

    if (
      !process.env.WS_HOST ||
      !process.env.WS_KEY ||
      !process.env.WS_ACTIVE ||
      (process.env.WS_ACTIVE && process.env.WS_ACTIVE !== 'true')
    ) {
      this.interval = setInterval(() => {
        this.fetchInplayEvents()
      }, 5000)
    } else {
      this.interval = setInterval(() => {
        this.fetchAndAddInplayEvents()
      }, 180000)
    }
  },
  beforeDestroy () {
    clearInterval(this.interval)
  },
  methods: {
    ...mapActions({
      fetchMetadataInplaySports: 'metadata-sports/fetchMetadataInplaySports',
      setInvalidMultiple: 'tickets-pre-cash-in/setInvalidMultiple',
      fetchAndAddInplayEvents: 'inplay/fetchAndAddInplayEvents',
      toggleTicket: 'tickets-pre-cash-in/toggleTicket',
      fetchInplayEvents: 'inplay/fetchInplayEvents'
    }),
    getSportName (sport, arr) {
      let name = sport.sport_name

      if (!arr || !arr.length) {
        return name
      }

      arr.forEach((e) => {
        if (e.id === +sport.sport_id) {
          name = e.name
        }
      })

      return name
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/layout/breakpoints";

.game-list-menu {
  background-color: var(--fut-background)
}
.header-sport {
  background: var(--fut-background-lightest-2);
  border-bottom: 2px solid var(--fut-background-white);
  @include md {
    background: var(--fut-background-games-list);
  }
  .sport-title {
    font-size: 15px;
    margin-left: 40px;
    @include md{
      margin-left: 0;
      font-size: 12px;
    }
  }
}
.dropdown {
  position: relative;
  display: inline-block;
  background-color: var(--fut-background);
  font-size: 13px;
  width: 250px;
  border-radius: 2px;
  &:hover {
    .dropdown-content {
      display: grid;
    }
  }
}
.dropdown-content {
  display: none;
  position: absolute;
  min-width: 160px;
  white-space: nowrap;
  margin-right: 30px;
  z-index: 3;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  .list {
    height: 20vh;
    overflow-y: scroll;
  }
  input {
    background-color: var(--fut-background-darker);
    border: none;
    margin-bottom: 1px;
    &::placeholder {
      color: white;
    }
  }
  button {
    color: white;
    text-decoration: none;
    width: 100%;
    display: block;
    border: none;
    text-align: left;
    background-color: var(--fut-background);
    border-bottom: 1px solid var(--fut-background-lightest);
    font-size: 14px;
    &:hover {
      background-color: var(--fut-background-lighter);
    }
  }
}
.game-list-menu{
  max-height: calc(100vh - 114px);
  overflow: auto;
}
</style>

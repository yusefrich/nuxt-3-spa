<template>
  <div class="container-fluid pt-3 pt-md-0">
    <div class="game-list-menu">
      <fb-select-sport
        inplay
        :sports="getMetadataInplaySports"
      />
      <div class="header-sport w-100 d-flex justify-content-between align-items-center">
        <div class="d-flex align-items-center py-2 px-1">
          <img class="mr-10" src="/FbIcons/1.png">
          <span class="sport-title text-white">{{ $t('i18n_futebol') }}</span>
        </div>
        <div>
          <div class="dropdown">
            <div class="d-flex align-items-center d-none justify-content-between px-2">
              <span class="mr-10 text-white">
                {{ $t('i18n_padrao') }}
              </span>
              <font-awesome-icon class="text-white" :icon="['fas', 'angle-down']" />
            </div>
            <div class="dropdown-content w-100">
              <input
                class="px-2 py-1"
                type="text"
                :placeholder="$t('i18n_buscar')"
              >
              <div class="list">
                <fb-fut-button class="px-2">
                  {{ $t('i18n_opcoes') }}
                </fb-fut-button>
              </div>
            </div>
          </div>
          <fb-fut-button class="border-0 bg-transparent mr-10">
            <font-awesome-icon class="text-white" :icon="['fas', 'caret-down']" />
          </fb-fut-button>
        </div>
      </div>
      <fb-inplay-game-list
        v-if="currentSettings"
        :inplay-games="getInplayEvents"
        :font="currentSettings.font"
        :loading="loading"
        :tickets="getPreCashInTickets"
        nav
        breadcrumb
        @invalidMultiple="val => setInvalidMultiple(val)"
        @selectBet="ticket => toggleTicket(ticket)"
      />
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import FbInplayGameList from '@/components/fb/organisms/FbInplayGameList.vue'
import FbSelectSport from '@/components/fb/molecules/FbSelectSport.vue'
import FbFutButton from '@/components/fb/atoms/FbFutButton.vue'

export default {
  name: 'FbAoVivo',
  components: {
    FbInplayGameList,
    FbSelectSport,
    FbFutButton
  },
  props: {
    loading: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      sport: '6046',
      interval: null
    }
  },
  computed: {
    ...mapGetters({
      getMetadataInplaySports: 'metadata-sports/getMetadataInplaySports',
      getPreCashInTickets: 'tickets-pre-cash-in/getPreCashInTickets',
      currentSettings: 'settings/currentSettings',
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
      setInvalidMultiple: 'tickets-pre-cash-in/setInvalidMultiple',
      fetchAndAddInplayEvents: 'inplay/fetchAndAddInplayEvents',
      toggleTicket: 'tickets-pre-cash-in/toggleTicket',
      fetchInplayEvents: 'inplay/fetchInplayEvents'
    })
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/layout/breakpoints";

.game-list-menu {
  background-color: var(--fut-background)
}
.header-sport {
  background: var(--fut-background-darkest);
  @include md {
    background-image: linear-gradient( to right, var(--fut-primary), var(--fut-secondary));
  }
  .sport-title {
    font-size: 12px;
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
</style>

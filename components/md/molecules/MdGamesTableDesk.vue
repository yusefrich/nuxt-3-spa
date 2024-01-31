<template>
  <div class="flex-table">
    <template
      v-for="(event, idx) in events"
      :key="idx+'-head'"
    >
      <div :key="idx+'-head'" class="table-header">
        <div class="first-td">
          <font-awesome-icon :icon="['fas', 'trophy']" class="trophy-icon" :class="{ 'trophy-icon-live': inplay }" />
        </div>
        <div
          class="w-100 event-name"
          :class="{
            'text-white': inplay,
            'links': event.league_id
          }"
          @click="event.league_id ? navigate(`/sport/${eventsSport}/league/${event.league_id}`) : {}"
        >
          <span class="ps-2">{{ event.name.toUpperCase() }}</span>
          <font-awesome-icon v-if="event.league_id" class="chevron-icon" :icon="['fas', 'chevron-right']" />
        </div>
        <div
          v-for="(odd, oIdx) in getOddTitleHeading(event.games).titles"
          :key="oIdx"
          class="text-center markets"
          :class="{ 'text-white': inplay }"
          :style="`min-width: ${getOddTitleHeading(event.games).width[oIdx]}px;`"
        >
          <span>{{ odd.title.toUpperCase() }}</span>
        </div>
        <div class="more-odds" />
      </div>
      <div :key="idx+'-body'" class="table-body">
        <div
          v-for="(game, gIdx) in event.games"
          :key="gIdx"
          class="game-row transition"
        >
          <div
            class="date-time links first-td"
          >
            <div v-if="inplay">
              <span class="blue">{{ game.time }}</span>
            </div>
            <div v-else>
              <span>{{ formattedDate(game.datetime || game.date) }}</span><br>
              <span>{{ game.hour || game.date.split(' ')[1].slice(0, 5) }}</span>
            </div>
          </div>
          <div
            class="w-100 links event-name"
            @click="
              eventsSport !== 18 && eventsSport !== 9 && eventsSport !== 14 ?
                navigate(inplay ? `/sport/${eventsSport}/aovivo/${game.id}` : `/sport/${eventsSport}/evento/${game.slug}`) :
                {}
            "
          >
            <div class="ps-2">
              <div class="d-flex justify-content-between">
                <span>{{ game.home_team || game.event.split(' - ')[0] }}</span>
                <div>
                  <span v-if="(currentTime() - game.home_goal_real_time < 2000) && game.home_goal && (+sport === 6046 || +sport === 35709)" class="text-goal goal-flash">GOL!!!</span>
                  <span class="blue me-2">{{ game.home_result }}</span>
                </div>
              </div>
              <div class="d-flex justify-content-between">
                <span>{{ game.away_team || game.event.split(' - ')[1] }}</span>
                <div>
                  <span v-if="(currentTime() - game.away_goal_real_time < 2000) && game.away_goal && (+sport === 6046 || +sport === 35709)" class="text-goal goal-flash-2">GOL!!!</span>
                  <span class="blue me-2">{{ game.away_result }}</span>
                </div>
              </div>
            </div>
          </div>
          <div
            v-for="(market, mIdx) in game.odds"
            :key="mIdx"
            class="markets"
            :style="`min-width: ${market.odds.length * 114}px;`"
          >
            <div class="odds-data">
              <md-odds-button
                v-for="(odd, oIdx) in market.odds"
                :key="oIdx"
                :odd="odd"
                :selected="(hasSelected(odd.type) && odd.odds)?true:false"
                :disabled="!odd.odds"
                :hide-btn-text="hideBtnText"
                @click="()=>!odd.odds||odd.odds<=0||odd.odds==1?{}:$emit('selectBet', { gameId: game.id, odd: odd, market: market.name, event: `${game.home_team} x ${game.away_team}`, validate: game.datetime, live: inplay })"
              />
            </div>
          </div>
          <div
            class="fw-bold links more-odds"
            :class="{ blue: inplay }"
            @click="
              eventsSport !== 18 && eventsSport !== 9 && eventsSport !== 14 ?
                navigate(inplay ? `/sport/${eventsSport}/aovivo/${game.id}` : `/sport/${eventsSport}/evento/${game.slug}`) :
                {}
            "
          >
            <span>
              +{{ game.odds_total }}
            </span>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import MdOddsButton from '@/components/md/atoms/MdOddsButton'

export default {
  name: 'MdGamesTableDesk',
  components: {
    MdOddsButton
  },
  props: {
    eventsSport: {
      type: [Number, String],
      default: null
    },
    events: {
      type: Array,
      default: () => ([])
    },
    tickets: {
      type: Array,
      default: () => ([])
    },
    inplay: {
      type: Boolean,
      default: false
    },
    sport: {
      type: [String, Number],
      default: ''
    },
    hideBtnText: {
      type: Boolean,
      default: false
    }
  },
  emits: [
    'selectBet'
  ],
  methods: {
    currentTime () {
      return Date.now()
    },
    getOddTitleHeading (games) {
      const title = []
      const btns = []

      games.forEach((game) => {
        if (game.odds) {
          game.odds.forEach((odd) => {
            btns.push(odd.odds.length * 114)

            if (title.findIndex(obj => obj.title === odd.name) === -1) {
              title.push({ title: odd.name })
            }
          })
        }
      })
      return { titles: title, width: btns }
    },
    navigate (link) {
      this.$router.push(this.localePath(link))
    },
    formattedDate (date) {
      if (this.inplay || !date) { return }

      const [, m, d] = date.split(' ')[0].split('-')
      return `${d}/${m}`
    },
    hasSelected (type) {
      const currentTicketIndex = this.tickets.findIndex(obj => obj.odd.type === type)
      if (currentTicketIndex !== -1) {
        return true
      }
      return false
    }
  }
}
</script>

<style lang="scss" scoped>
.flex-table {
  .table-header {
    display: flex;
    color: var(--md-highlight);
    font-size: 12px;
    font-weight: 700;
    padding: 3px 0;
    .chevron-icon {
      height: 10px;
      margin: 0 0 2px 8px;
    }
  }
  .table-body {
    .game-row {
      display: flex;
      background: var(--md-comp-bg-color);
      padding: 8px 0;
      border: 1px solid var(--md-comp-border-color);
      .date-time {
        color: var(--md-menu-idx-font-color);
        font-weight: 600;
        font-size: 11px;
      }
      .event-name {
        font-size: 13px;
        font-weight: 600;
      }
      .more-odds {
        font-size: 11px;
      }
      &:hover {
        background: var(--md-event-hover);
      }
      &:first-of-type {
        border-top-left-radius: 15px;
        border-top-right-radius: 15px;
      }
      &:last-of-type {
        border-bottom-left-radius: 15px;
        border-bottom-right-radius: 15px;
      }
    }
  }
}

.first-td {
  min-width: 50px;
  max-width: 60px;

  .trophy-icon {
    width: 13px;
    height: 13px;
    color: rgba(10, 116, 239, 0.6);
  }
  .trophy-icon-live {
    color: #ffffff60 !important;
  }
}
.markets {
  white-space: nowrap;
  .odds-data {
    display: flex;
  }
}
.more-odds {
  min-width: 50px;
  max-width: 60px;
}
.first-td, .markets, .more-odds {
  display: flex;
  justify-content: center;
  align-items: center;
}

.links {
  cursor: pointer;
}
.blue {
  color: var(--md-highlight-lighter);
}
.text-goal{
  color: greenyellow !important;
  opacity: 1 !important;
}
</style>

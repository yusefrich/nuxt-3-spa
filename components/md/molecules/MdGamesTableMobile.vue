<template>
  <ul class="mobile-games-list">
    <li
      v-for="(event, idx) in events"
      :key="idx"
      class="leagues-infos"
    >
      <div
        class="league-title"
        :class="{ 'text-white': inplay }"
        @click.stop="event.league_id ? navigate(`/sport/${eventsSport}/league/${event.league_id}`) : {}"
      >
        <font-awesome-icon :icon="['fas', 'trophy']" class="trophy-icon" :class="{ 'trophy-icon-live': inplay }" />
        <span class="fw-bold">
          {{ event.name.toUpperCase() }}
        </span>
        <font-awesome-icon v-if="event.league_id" class="chevron-icon" :icon="['fas', 'chevron-right']" />
      </div>
      <article
        v-for="(game, gIdx) in event.games"
        :key="gIdx"
        class="games-infos"
      >
        <h6
          class="game-header"
          @click="
            eventsSport !== 18 && eventsSport !== 9 && eventsSport !== 14 ?
              navigate(inplay ? `/sport/${eventsSport}/aovivo/${game.id}` : `/sport/${eventsSport}/evento/${game.slug}`) :
              {}
          "
        >
          <div v-if="inplay" class="game-date blue d-flex flex-column justify-content-center align-items-center">
            <font-awesome-icon v-if="inplay" :icon="['fas', 'clock']" />
            <span class="mt-1">{{ game.time }}</span>
          </div>
          <div v-else class="game-date">
            <span>{{ formattedDate(game.datetime || game.date) }}</span><br>
            <span>{{ game.hour || game.date.split(' ')[1].slice(0, 5) }}</span>
          </div>
          <div class="game-title">
            <div class="w-100">
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
            <font-awesome-icon class="chevron-icon" :icon="['fas', 'chevron-right']" />
          </div>
        </h6>

        <div class="markets">
          <span class="more-odds">
            +{{ game.odds_total }}
            <font-awesome-icon class="chevron-icon" :icon="['fas', 'chevron-right']" />
          </span>

          <div
            v-for="(market, mIdx) in game.odds"
            :id="mIdx > 0 ? `collapse${gIdx}${idx}` : ''"
            :key="mIdx"
            :class="{collapse: mIdx > 0}"
            class="odds-data"
          >
            <p>
              {{ market.name }}
            </p>
            <div class="odds-buttons">
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
            class="toggle-odds"
            data-bs-toggle="collapse"
            :data-bs-target="`#collapse${gIdx}${idx}`"
            aria-expanded="false"
            :aria-controls="`collapse${gIdx}${idx}`"
            @click.stop
          >
            <font-awesome-icon class="chevron-icon" :icon="['fas', 'chevron-down']" />
          </div>
        </div>
      </article>
    </li>
  </ul>
</template>

<script>
import MdOddsButton from '@/components/md/atoms/MdOddsButton.vue'

export default {
  name: 'MdGamesTableMobile',
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
  methods: {
    currentTime () {
      return Date.now()
    },
    getOddTitleHeading (games) {
      const title = []
      games.forEach((game) => {
        if (game.odds) {
          game.odds.forEach((odd) => {
            if (title.findIndex(obj => obj.title === odd.name) === -1) {
              title.push({ title: odd.name })
            }
          })
        }
      })
      return title
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
.mobile-games-list {
  list-style: none;
  margin: 0;
  padding: 0;
  .leagues-infos {

    .league-title {
      color: var(--md-highlight);
      padding: 6px 0 6px 17px;
      display: block;

      .trophy-icon {
        width: 13px;
        height: 13px;
        margin-right: 10px;
        color: rgba(10, 116, 239, 0.6);
      }
      .trophy-icon-live {
        color: #ffffff60 !important;
      }

      .chevron-icon {
        height: 10px;
        margin: 0 0 2px 8px;
      }
    }
    .games-infos {
      background: var(--md-comp-bg-color);
      border-bottom:  1px solid var(--md-comp-border-color);
      &:first-of-type {
        border-top-left-radius: 15px;
        border-top-right-radius: 15px;
      }
      &:last-of-type {
        border-bottom-left-radius: 15px;
        border-bottom-right-radius: 15px;
      }

      .game-header {
        margin: 0;
        display: flex;
        .game-date {
          border-right:  1px solid var(--md-comp-border-color);
          border-bottom:  1px solid var(--md-comp-border-color);
          padding: 6px;
          span {
            color: var(--md-menu-idx-font-color);
            font-weight: 600;
            font-size: 11px;
          }
        }
        .game-title {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          padding: 6px;
          border-bottom:  1px solid var(--md-comp-border-color);
          span {
            font-size: 12px;
            font-weight: 600;
            color: var(--md-font-color);
          }
          .chevron-icon {
            background: var(--md-filter-bg-color);
            padding: 10px 12.5px;
            height: 12px;
            border-radius: 4px;
            color: var(--md-highlight) !important;
          }
        }
      }
      .markets {
        position: relative;
        padding: 10px 12px;

        .more-odds {
          position: absolute;
          right: 17px;
          font-size: 12px;
          .chevron-icon {
            height: 6px;
            padding-bottom: 3px;
          }
        }
        .odds-data {
          p {
            margin: 0;
            font-size: 13px;
            color: var(--md-menu-idx-font-color);
          }
        }
        .toggle-odds {
          display: flex;
          justify-content: center;
          padding: 6px 0;
          .chevron-icon {
            height: 11px;
          }
          &[aria-expanded="true"] {
            .chevron-icon {
              -webkit-transform: rotate(90deg);
              transform: rotate(180deg);
            }
          }
        }
      }
    }
  }
}

.blue {
  color: var(--md-highlight-lighter) !important;
}
.text-goal{
  color: greenyellow !important;
  opacity: 1 !important;
}

@media (max-width: 1120px) {
  .odds-buttons {
    display: flex;
    margin-bottom: 10px;
  }
}
</style>

<template>
  <div class="sk-leagues-table">
    <button
      class="league-title"
      data-bs-toggle="collapse"
      :data-bs-target="`#collapse${compId}`"
      aria-expanded="true"
      :aria-controls="`collapse${compId}`"
      @click.stop
    >
      <h2>{{ league.name }}</h2>
      <font-awesome-icon class="icon transition" :icon="['fas', 'chevron-down']" />
    </button>

    <div
      :id="`collapse${compId}`"
      class="league-wrapper"
      :class="show ? 'show' : 'collapse'"
    >
      <div
        v-for="(game, idx) in league.games"
        :key="idx"
        class="game-wrapper"
      >
        <div class="misk">
          <div v-if="live" class="misk-live">
            <span class="live-badge">
              {{ $t('i18n_esportes_ativos') }}
            </span>
            <span class="ms-2">{{ game.time }}'</span>
            <span v-if="isMobile" class="score">{{ `${game.home_result}-${game.away_result}` }}</span>
          </div>
          <div v-else>
            <span>{{ formatDate(game.datetime) }}</span>
          </div>
        </div>
        <div class="line" style="grid-area: line / line / line / line;" />
        <div class="line" style="grid-area: line2 / line2 / line2 / line2;" />
        <n-link
          class="teams"
          :to="localePath(`/sport/${game.sport_id || eventsSport}/${live?'aovivo':'evento'}/${live?game.id:game.slug}`)"
        >
          <span>
            {{ game.home_team }}
          </span>
          <span v-if="isMobile" class="mx-1"> - </span>
          <span>
            {{ game.away_team }}
          </span>
        </n-link>
        <div v-if="!isMobile" class="fixture-score">
          <div class="results">
            <div class="d-flex">
              <span
                v-if="(currentTime() - game.home_goal_real_time < 2000) && game.home_goal && (+game.sport_id === 6046 || +game.sport_id === 35709)"
                class="text-goal goal-flash me-1"
              >
                GOL!!!
              </span>
              <span>
                {{ game.home_result }}
              </span>
            </div>
            <div class="d-flex">
              <span
                v-if="(currentTime() - game.away_goal_real_time < 2000) && game.away_goal && (+game.sport_id === 6046 || +game.sport_id === 35709)"
                class="text-goal goal-flash-2 me-1"
              >
                GOL!!!
              </span>
              <span>
                {{ game.away_result }}
              </span>
            </div>
          </div>
        </div>
        <div class="market-name" style="--area: marketName0;">
          <span v-if="game.odds.length">
            {{ game.odds[0].name }}
          </span>
        </div>
        <div
          v-if="game.odds.length && game.odds[0].odds.length"
          class="outcomes"
          style="--area: outcomes0;"
        >
          <button
            v-for="(odd, Oidx) in game.odds[0].odds"
            :key="Oidx"
            :class="[
              'position-relative',
              {
                selected: hasSelected(odd.type) && odd.odds,
                disabled: !odd.odds || odd.odds <= 0 || odd.odds == 1
              },
              getLevarage(odd.leverage)
            ]"
            :disabled="!odd.odds || odd.odds <= 0 || odd.odds == 1"
            @click="
              !odd.odds || odd.odds <= 0 || odd.odds == 1
                ? {}
                : $emit('selectBet', {
                  gameId: game.id,
                  odd: odd,
                  market: game.odds[0].name,
                  event: `${game.home_team} x ${game.away_team}`,
                  validate: game.datetime,
                  live: live
                })
            "
          >
            <div class="odd-wrapper">
              <span class="odd-name">{{ odd.header }}</span>
              <div class="odd d-flex">
                <span class="transition" :class="{ 'old-odd me-1': odd.super_odd }">{{ odd.odds }}</span>
                <span v-if="odd.super_odd">{{ odd.super_odd.odd }}</span>
              </div>
            </div>
          </button>
        </div>
        <div class="market-count">
          <button
            @click="$router.push(localePath(`/sport/${game.sport_id || eventsSport}/${live?'aovivo':'evento'}/${live?game.id:game.slug}`))"
          >
            +
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SkLeaguesTable',
  props: {
    eventsSport: {
      type: [Number, String],
      default: null
    },
    league: {
      type: Object,
      default: () => ({})
    },
    compId: {
      type: [String, Number],
      default: ''
    },
    live: {
      type: Boolean,
      default: false
    },
    show: {
      type: Boolean,
      default: false
    },
    tickets: {
      type: Array,
      default: () => ([])
    },
    isMobile: {
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
    formatDate (date) {
      const options = {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric'
      }

      return new Date(date).toLocaleDateString(this.$i18n.locale, options)
    },
    hasSelected (type) {
      const currentTicketIndex = this.tickets.findIndex(obj => obj.odd.type === type)

      if (currentTicketIndex !== -1) {
        return true
      }

      return false
    },
    getLevarage (levarage) {
      if (levarage === 'up') {
        return 'background-lev-success'
      }
      if (levarage === 'down') {
        return 'background-lev-danger'
      }
      return levarage
    }
  }
}
</script>

<style lang="scss" scoped>
.sk-leagues-table {
  background: var(--fut-background-games-list);
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .2), 0 1px 2px 0 rgba(0, 0, 0, .12), inset 0 1px rgba(255, 255, 255, .04);
  border-radius: .25rem;

  .league-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: var(--fut-secondary);
    padding: 12px 16px;
    border: none;
    background: transparent;
    width: 100%;

    .icon {
      width: 12px;
      height: 12px;
    }
    h2 {
      font-size: .875rem;
      font-weight: 600;
      margin: 0;
    }
    &[aria-expanded="false"] {
      .icon {
        transform: rotate(90deg);
      }
    }
  }

  .league-wrapper {
    border-top: 2px solid var(--fut-background-lightest-2);

    .game-wrapper {
      display: grid;
      grid-column-gap: .5rem;
      grid-template-areas:
        'misc misc line line line line marketName0 marketName0 marketName0 marketName0 line2 line2'
        'teams teams teams fixtureScore fixtureScore outcomes0 outcomes0 outcomes0 outcomes0 outcomes0 outcomes0 marketCount'
        'teams teams teams fixtureScore fixtureScore outcomes0 outcomes0 outcomes0 outcomes0 outcomes0 outcomes0 marketCount'
      ;
      grid-template-rows: repeat(3,auto);
      grid-template-columns: repeat(12, minmax(0,1fr));
      align-items: center;
      row-gap: .5rem;
      padding: 8px 16px;

      .misk {
        grid-area: misc;
        font-size: .75rem;
        color: var(--fut-secondary);
        font-weight: 600;

        .live-badge {
          background: #e9113c;
          color: var(--fut-color-dynamic);
          border-radius: 3px;
          padding: 0 .25rem;
          white-space: nowrap;
        }
      }
      .line {
        width: 100%;
        height: 2px;
        background: var(--fut-background-lightest-2);
      }
      .teams {
        grid-area: teams;
        display: flex;
        flex-direction: column;
        color: var(--fut-color-dynamic);
        font-weight: 600;
        font-size: .875rem;
        text-decoration: none;

        &:active {
          transform: scale(.95);
        }
      }
      .fixture-score {
        grid-area: fixtureScore;
        display: flex;
        justify-content: flex-end;

        .results {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: flex-end;
          color: var(--fut-highlight);
          font-size: .875rem;
          font-weight: 600;
        }
        .stats {
          margin-left: 16px;
          .icon {
            height: 50%;
            width: 16px;
            color: var(--fut-secondary);
          }
        }
      }
      .market-name {
        grid-area: var(--area);
        text-align: center;

        span {
          color: var(--fut-secondary);
          font-size: .75rem;
          font-weight: 600;
        }
      }
      .outcomes {
        place-items: center;
        width: 100%;
        grid-area: var(--area);
        display: grid;
        grid-gap: .75rem .5rem;
        grid-template-rows: 1fr;
        align-self: stretch;
        grid-template-columns: repeat(auto-fit,minmax(50px,1fr));

        button {
          width: 100%;
          border: none;
          background: var(--fut-background-black-2);
          color: var(--fut-color-dynamic);
          display: flex;
          border-radius: .25rem;
          font-size: .875rem;
          padding: .5rem .75rem;

          .odd-wrapper {
            display: flex;
            flex-direction: column;
            max-width: 100%;

            .odd-name {
              max-width: 100%;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
              font-weight: 600;
            }
            .odd {
              color: var(--fut-primary-lighter);
              font-weight: 700;

              .old-odd {
                font-size: 12px;
                margin: 0 0 -4px 0;
                text-decoration: line-through;
                font-weight: 400;
              }
            }
          }

          &:hover {
            background: var(--fut-primary-black);
          }
          &:active {
            .odd-wrapper {
              transform: scale(.95);
            }
          }
          &.disabled {
            background: #0718249b !important;
            .odd-wrapper {
              transform: scale(1) !important;
            }
          }

          &.selected {
            background: var(--fut-primary) !important;
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, .2), 0 4px 6px -2px rgba(0, 0, 0, .1);
            color: var(--fut-color-dynamic-inverse);

            .odd {
              color: var(--fut-color-dynamic) !important;
            }
          }

          &.background-lev-danger::before{
            content: "";
            width: 0;
            height: 0;
            border-bottom: 10px solid #c62828;
            border-left: 10px solid transparent;
            position: absolute;
            bottom: 0;
            right: 0;
            z-index: 0;
            animation: fade 1s 5;
          }
          &.background-lev-success::before{
            content: "";
            width: 0;
            height: 0;
            border-top: 10px solid #558b2f;
            border-left: 10px solid transparent;
            position: absolute;
            top: 0;
            right: 0;
            z-index: 0;
            animation: fade 1s 5;
          }
        }
      }
      .market-count {
        grid-area: marketCount;
        justify-self: center;

        button {
          color: var(--fut-secondary);
          font-weight: 600;
          border: none;
          background: transparent;
        }
      }

      &:first-of-type {
        .line {
          background: transparent;
        }
      }
    }
  }
}

@media (max-width: 821px) {
  .sk-leagues-table {
    .league-wrapper {
      .game-wrapper {
        grid-template-areas:
          'misc misc marketCount marketCount marketCount marketCount'
          'teams teams teams teams teams teams'
          ' marketName0 marketName0 marketName0 marketName0 marketName0 marketName0'
          ' outcomes0 outcomes0 outcomes0 outcomes0 outcomes0 outcomes0'
          ' outcomes0 outcomes0 outcomes0 outcomes0 outcomes0 outcomes0'
        ;
        grid-template-columns: repeat(6, 1fr);
        &:not(:first-of-type) {
          border-top: 2px solid var(--fut-background-lightest-2);
        }

        .misk {
          .misk-live {
            display: flex;

            .score {
              white-space: nowrap;
              color: var(--fut-highlight);
              font-size: .875rem;
              font-weight: 600;
              margin-left: 8px;
              margin-top: -3px;
            }
          }
        }
        .market-count {
          justify-self: flex-end;
        }
        .teams {
          flex-direction: row;
        }
      }
    }
  }
}
</style>

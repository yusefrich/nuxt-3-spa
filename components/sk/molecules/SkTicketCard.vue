<template>
  <div v-if="item" class="sk-ticket-card">
    <div class="item-header">
      <div>
        <span
          v-if="item.result !== 'waiting'"
          class="badge"
          :class="{ loss: item.result === 'lost' }"
        >
          {{ item.result === 'won' ? $t('i18n_vitoria') : $t('i18n_derrota') }}
        </span>
        <span>{{ item.created_at }}</span>
      </div>
      <button>
        <font-awesome-icon class="icon transition" :icon="['fas', 'th-list']" />
      </button>
    </div>
    <div class="item-body">
      <div class="bet-outcome">
        <div
          v-for="(game, gIdx) in item.games"
          :key="gIdx"
          class="teams-wrapper"
          :class="{ mult: item.games.length > 1 }"
        >
          <div class="teams">
            <div>
              {{ game.event.home_team }}
            </div>
            <div class="market">
              {{ game.type_odd }}
            </div>
            <div>
              <div class="d-flex justify-content-between">
                <span>{{ game.event.away_team }}</span>
                <span>{{ thousandsSeparators(game.odd) }}</span>
              </div>
              <div v-if="item.result === 'waiting' && game.live" class="live">
                <span class="badge">{{ $t('i18n_esportes_ativos') }}</span>
                <span>{{ game.time }}<span class="flashing">'</span></span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="hr">
        <img
          v-if="logo"
          :src="logo"
        >
        <font-awesome-icon
          v-else
          class="icon"
          :icon="['fas', 'receipt']"
        />
      </div>
      <div class="total-label">
        {{ $tc('i18n_aposta', 1) }}
      </div>
      <div class="total">
        R$ {{ thousandsSeparators(item.value) }}
      </div>
      <div class="payout-label">
        {{ $t('i18n_pagamento') }}
      </div>
      <div class="payout">
        R$ {{ thousandsSeparators(item.return) }}
      </div>
      <div class="total-odds-label">
        {{ $t('i18n_probabilidades') }}
      </div>
      <div class="total-odds">
        {{ totalOdds(item) }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SkTicketCard',
  props: {
    item: {
      type: Object,
      default: () => ({})
    },
    logo: {
      type: String,
      default: ''
    }
  },
  methods: {
    thousandsSeparators (num) {
      if (!num) {
        return '0,00'
      }

      const numParts = num.toString().split('.')
      numParts[0] = numParts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.')

      return numParts.join(',')
    },
    totalOdds (item) {
      return this.thousandsSeparators(Number(item.games.map(item => +item.odd).reduce((a, b) => a * b)).toFixed(2))
    }
  }
}
</script>

<style lang="scss" scoped>
.sk-ticket-card {

  .item-header {
    border-radius: .25rem .25rem 0 0;
    padding: .5rem .75rem;
    display: flex;
    justify-content: space-between;
    font-size: .875rem;
    color: var(--fut-secondary);
    background: var(--fut-background-lightest-2);

    .badge {
      background: #00e701;
      color: #013e01;
      font-size: .75rem;
    }
    .loss {
      background: var(--fut-background-white-3) !important;
      color: var(--fut-background);
    }

    button {
      border: none;
      background: transparent;
      height: 20px;

      .icon {
        color: var(--fut-secondary);
      }

      &:hover {
        .icon {
          color: var(--fut-color-dynamic);
        }
      }
    }
  }

  .item-body {
    background: var(--fut-background-lighter);
    display: grid;
    grid-template-columns: repeat(6,1fr);
    grid-auto-rows: auto;
    grid-template-areas:
      "betOutcome betOutcome betOutcome betOutcome betOutcome betOutcome"
      "line line line line line line"
      "totalOddsLabel totalOddsLabel totalOddsLabel totalOdds totalOdds totalOdds"
      "totalLabel totalLabel totalLabel total total total"
      "payoutLabel payoutLabel payoutLabel payout payout payout"
      "promotionLabel promotionLabel promotionLabel promotion promotion promotion"
      // "cashoutButton cashoutButton cashoutButton cashoutButton cashoutButton cashoutButton"
    ;
    padding-bottom: .5rem;
    font-size: .875rem;
    color: var(--fut-secondary);

    .bet-outcome {
      grid-area: betOutcome;

      .teams-wrapper {
        font-size: .875rem;
        font-weight: 600;
        color: var(--fut-color-dynamic);

        .teams {
          padding: .5rem .75rem;

          .market {
            color: var(--fut-secondary);
            font-weight: 400;
          }

          .live {
            font-weight: 400;
            color: var(--fut-secondary);

            .badge {
              background: #e9113c;
              font-size: .75rem;
              color: var(--fut-color-dynamic);
            }
            .flashing {
              animation: blink 2s infinite linear;
            }
            @keyframes blink {
              0% {
                opacity: 0;
              }
              50% {
                opacity: 1;
              }
              100% {
                opacity: 0;
              }
            }
          }
        }
      }
      .mult {
        &:not(:first-of-type)::before {
          display: flex;
          content: "";
          height: 3px;
          width: 100%;
          background: radial-gradient(circle, var(--fut-background-darkest), var(--fut-background-darkest) 50%, var(--fut-background-lighter) 50%, var(--fut-background-lighter) 100%) 1px -6px/0.7rem 0.7rem repeat-x;
        }
        &:not(:last-of-type)::after {
          display: flex;
          content: "";
          height: 6px;
          width: 100%;
          background: radial-gradient(circle, var(--fut-background-darkest), var(--fut-background-darkest) 50%, var(--fut-background-lighter) 50%, var(--fut-background-lighter) 100%) 1px 1px/0.7rem 0.7rem repeat-x;
        }
      }
    }
    .hr {
      grid-area: line;
      padding: .75rem 0;
      display: flex;
      align-items: center;
      gap: 1rem;

      &::before {
        content: "";
        height: 3px;
        flex-grow: 1;
        background: var(--fut-background-lightest-2);
      }

      img {
        max-width: 70px;
        max-height: 35px;
      }

      &::after {
        content: "";
        height: 3px;
        flex-grow: 1;
        background: var(--fut-background-lightest-2);
      }
    }
    .total-label {
      grid-area: totalLabel;
      padding-left: .75rem;
    }
    .total {
      grid-area: total;
      justify-self: end;
      padding-right: .75rem;
      color: var(--fut-color-dynamic);
    }
    .payout-label {
      grid-area: payoutLabel;
      padding-left: .75rem;
    }
    .payout {
      grid-area: payout;
      justify-self: end;
      padding-right: .75rem;
      color: var(--fut-color-dynamic);
    }
    .total-odds-label {
      grid-area: totalOddsLabel;
      padding-left: .75rem;
    }
    .total-odds {
      grid-area: totalOdds;
      justify-self: end;
      padding-right: .75rem;
      color: var(--fut-primary-lighter);
      font-weight: 700;
    }
  }

  &::after {
    content: "";
    position: absolute;
    left: 0;
    height: 6px;
    width: 100%;
    bottom: -4px;
    background: radial-gradient(circle, transparent, transparent 50%, var(--fut-background-lighter) 50%, var(--fut-background-lighter) 100%) 0px 1px/0.7rem 0.7rem repeat-x;
  }
}
</style>

<template>
  <aside
    v-if="toggleTicket"
    id="sk-ticket"
    class="transition"
  >
    <sk-header class="tickets-header">
      <div class="dropdown">
        <button
          id="sk-ticket-dropdown"
          class="header-btn transition dropdown-toggle"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <div>
            <font-awesome-icon class="tab-icon transition" :icon="tabs[currentTab].icon" />
            <span>{{ tabs[currentTab].title }}</span>
            <font-awesome-icon class="icon transition" :icon="['fas', 'chevron-down']" />
          </div>
        </button>

        <ul
          class="dropdown-menu"
          aria-labelledby="sk-ticket-dropdown"
        >
          <li
            v-for="(tab, tabName, idx) in tabs"
            :key="idx"
            class="list-item"
          >
            <button
              class="tab-btn transition"
              :class="{ selected: tabName === currentTab }"
              @click="currentTab = tabName"
            >
              <div class="d-flex align-items-center">
                <font-awesome-icon class="tab-icon transition" :icon="tab.icon" />
                <span>{{ tab.title }}</span>
              </div>
            </button>
          </li>
        </ul>
      </div>

      <button
        class="close-btn"
        @click="toggleTicket = false"
      >
        <font-awesome-icon class="icon" :icon="['fas', 'times']" />
      </button>
    </sk-header>

    <div class="tickets-body">
      <div
        v-if="currentTab === 'ticket'"
        class="tab-ticket"
      >
        <div class="ticket-type">
          <ul class="type-list">
            <li>
              <button
                :class="{ selected: betType === 'simple' }"
                @click="betType = 'simple'"
              >
                <div class="simple-icon">
                  <span class="icon" />
                </div>
                <span>{{ $t('i18n_unica') }}</span>
              </button>
            </li>
            <li class="ms-1">
              <button
                :class="{ selected: betType === 'multiple' }"
                @click="betType = 'multiple'"
              >
                <div class="multiple-icon">
                  <span class="icon" />
                  <span class="icon" />
                </div>
                <span>{{ $tc('i18n_multipla', 1) }}</span>
              </button>
            </li>
          </ul>
        </div>

        <div class="list-wrapper">
          <ul class="tickets-list">
            <li
              v-for="(ticket, idx) in tickets"
              :key="idx"
              class="ticket-item"
              :class="{
                'm-1 no-radius': betType === 'multiple',
                'disabled': !multipleBetAvailable && betType === 'multiple'
              }"
            >
              <div
                class="ticket-title"
                :class="{ 'py-2': ticket.live }"
              >
                <span>
                  <div v-if="ticket.live" class="live-badge">
                    {{ $t('i18n_esportes_ativos') }}
                  </div>
                  {{ ticket.event }}
                </span>
                <button
                  @click="$emit('toggleTicket', ticket)"
                >
                  <font-awesome-icon class="icon" :icon="['fas', 'times']" />
                </button>
              </div>

              <div class="ticket-content">
                <span class="market">
                  {{ ticket.market }}
                </span>
                <span class="max">
                  <!-- {{ $t('i18n_aposta_maxima') }} {{ betMaxValue }} -->
                </span>
                <span class="name">
                  {{ ticket.odd.header }}
                </span>
                <span class="odds text-end">
                  {{ ticket.odd.odds }}
                </span>
                <div v-if="betType === 'simple'" class="footer">
                  <div class="amount">
                    <label
                      v-if="loggedInUser && +loggedInUser.free_bet && (checked === null || checked === idx)"
                      :for="`checkbox_${idx}`"
                    >
                      <input
                        :id="`checkbox_${idx}`"
                        type="checkbox"
                        :checked="ticket.free_bet"
                        @change="
                          updateOddFreeBet($event.target.checked, +loggedInUser.free_bet, ticket),
                          $event.target.checked ? checked = idx : checked = null
                        "
                      >
                      <span>Freebet: R$ {{ loggedInUser.free_bet }}</span>
                    </label>
                    <sk-bet-input
                      :value="ticket.value ? +ticket.value : null"
                      :limit-value="betMaxValue"
                      :min-value="betMinValue"
                      :ref-input="'single_'+idx"
                      :free-bet-value="10.00"
                      @change="updateOddValue($event, ticket)"
                    />
                  </div>
                  <div class="return text-end">
                    {{ $t('i18n_pagamento_estimado') }}
                  </div>
                  <div class="estimated-amount text-end">
                    <span>
                      {{ ticket.value * ticket.odd.odds > winMaxValue ? getFormattedValue(winMaxValue) : getFormattedValue(ticket.value * ticket.odd.odds) }}
                    </span>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>

        <div class="submit-area">
          <div v-if="betType === 'multiple'">
            <label
              v-if="loggedInUser && +loggedInUser.free_bet && (checked === null || checked === -1)"
              for="checkbox_multiple"
            >
              <input
                id="checkbox_multiple"
                type="checkbox"
                :checked="multiple.free_bet"
                @change="
                  updateOddFreeBet($event.target.checked, +loggedInUser.free_bet, multiple),
                  $emit(
                    'updateMultipleTicket',
                    {
                      free_bet: $event.target.checked,
                      value: $event.target.checked ? +loggedInUser.free_bet : null
                    }
                  )
                  $event.target.checked ? checked = -1 : checked = null
                "
              >
              <span>Freebet: R$ {{ loggedInUser.free_bet }}</span>
            </label>
            <sk-bet-input
              :value="+multiple.value"
              :limit-value="betMaxValue"
              :min-value="betMinValue"
              ref-input="multiple_bet"
              @change="$emit('updateMultipleTicket', { value: $event })"
            />
          </div>
          <div class="d-flex flex-column">
            <div class="d-flex justify-content-between">
              <span class="text">
                {{ betType === 'multiple' ? $t('i18n_probabilidades_totais') : $t('i18n_valor_total') }}
              </span>
              <span class="value" :class="{ 'mult': betType === 'multiple' }">
                {{ betType === 'multiple' ? multipleBetOdd : getFormattedValue(betTotal) }}
              </span>
            </div>
            <div class="d-flex justify-content-between">
              <span class="text">{{ $t('i18n_pagamento_estimado') }}</span>
              <span class="value">
                {{ betTotalReturn > winMaxValue ? getFormattedValue(winMaxValue) : getFormattedValue(betTotalReturn) }}
              </span>
            </div>
          </div>
          <p v-if="!multipleBetAvailable && betType === 'multiple'" class="m-0">
            {{ $t('i18n_multiplas_selecoes_de_um_mesmo') }}
          </p>
          <button
            v-if="oddChange()"
            class="accept-btn"
            @click="$emit('acceptAllChanges')"
          >
            {{ $t('i18n_aceitar_novas_probabilidades') }}
          </button>
          <button
            v-else
            class="submit-btn"
            :class="{ disabled: !multipleBetAvailable && betType === 'multiple' }"
            :disabled="!multipleBetAvailable && betType === 'multiple'"
            @click="
              !loggedInUser ? $emit('modalRegister') : $emit('submit'),
              checked = null
            "
          >
            <span>{{ !loggedInUser ? $t('i18n_registre_se_para_apostar') : $t('i18n_fazer_aposta') }}</span>
          </button>
        </div>
      </div>

      <sk-my-bets-ticket
        v-else
        :user-bets="userBets"
        :logo="logo"
      />
    </div>
  </aside>
</template>

<script>
import SkHeader from '@/components/sk/atoms/SkHeader.vue'
import SkMyBetsTicket from '@/components/sk/organisms/SkMyBetsTicket.vue'

export default {
  name: 'SkTicket',
  components: {
    SkHeader,
    SkMyBetsTicket
  },
  props: {
    value: {
      type: Boolean,
      default: false
    },
    tickets: {
      type: Array,
      default: () => ([])
    },
    multiple: {
      type: Object,
      default: () => ({})
    },
    loggedInUser: {
      type: Object,
      default: () => ({})
    },
    betMaxValue: {
      type: Number,
      default: null
    },
    betMinValue: {
      type: Number,
      default: null
    },
    winMaxValue: {
      type: Number,
      default: null
    },
    loading: {
      type: Boolean,
      default: false
    },
    freeBetValue: {
      type: [String, Boolean, Number],
      default: ''
    },
    errors: {
      type: Object,
      default: () => ({})
    },
    userBets: {
      type: Object,
      default: () => ({})
    },
    logo: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      currentTab: 'ticket',
      betType: 'simple',
      checked: null
    }
  },
  computed: {
    toggleTicket: {
      get () {
        return this.value
      },
      set (value) {
        this.$emit('input', value)
      }
    },
    tabs () {
      return {
        ticket: {
          title: this.$t('i18n_boletim_de_aposta'),
          icon: ['fas', 'vote-yea']
        },
        myBets: {
          title: this.$t('i18n_minhas_apostas'),
          icon: ['fas', 'clipboard-list']
        }
      }
    },
    multipleBetOdd () {
      return this.tickets.reduce((partialSum, a) => partialSum * +a.odd.odds, 1).toFixed(2)
    },
    betTotal () {
      let total = this.tickets
        .reduce((sum, ticket) => sum + +ticket.value, 0)

      if (this.betType === 'simple') {
        return total
      }

      total += +this.multiple.value

      return total
    },
    betTotalReturn () {
      const simpleTotalReturn = this.tickets
        .reduce((partialSum, a) => partialSum + (+a.odd.odds * +a.value), 0)

      if (this.betType === 'simple') {
        return simpleTotalReturn
      }

      return simpleTotalReturn + (this.multiple.value * this.multipleBetOdd)
    },
    multipleBetAvailable () {
      const gameIds = {}

      this.tickets.forEach((ticket) => { gameIds[ticket.gameId] = true })

      return Object.keys(gameIds).length === this.tickets.length
    }
  },
  watch: {
    currentTab (value) {
      if (value === 'myBets') {
        this.$emit('fetchUserBets')
      }
    }
  },
  methods: {
    getFormattedValue (value) {
      const formattedResult = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      })
      return formattedResult.format(value)
    },
    updateOddValue (value, ticket) {
      const newTicket = { ...ticket }
      newTicket.value = +value

      this.$emit('updateTicket', newTicket)
    },
    oddChange () {
      return this.tickets.findIndex(item => item.odds_change === true) !== -1
    },
    updateOddFreeBet (freeBet, value, ticket) {
      const newTicket = { ...ticket }
      /* eslint-disable-next-line */
      newTicket.free_bet = freeBet
      /* eslint-disable-next-line */
      newTicket.value = freeBet ? value : null
      this.$emit('updateTicket', newTicket)
    }
  }
}
</script>

<style lang="scss" scoped>
#sk-ticket {
  min-width: 370px;
  max-width: 370px;
  height: 100%;
  background: var(--fut-background-darkest);
  z-index: 3;

  .tickets-header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .dropdown {
      button {
        background: transparent;
        border: none;
        font-size: .875rem;
        font-weight: 600;
      }

      .header-btn {
        color: var(--fut-color-dynamic);
        padding: .5rem 1rem;

        span {
          margin: 0 .5rem;
        }
        .icon {
          color: var(--fut-secondary);
          width: 12px;
          height: 12px;
        }
        .tab-icon {
          color: var(--fut-secondary);
        }

        &:hover {
          .icon, .tab-icon {
            color: var(--fut-color-dynamic);
          }
        }
        &:active {
          div {
            transform: scale(.95);
          }
        }
        &[aria-expanded="true"] {
          .icon {
            transform: rotate(180deg);
          }
        }
        &::after {
          display: none;
        }
      }

      .dropdown-menu {
        padding: .25rem 0;
        left: 12px !important;
        top: 6px !important;

        .list-item {
          .tab-btn {
            color: var(--fut-background-lightest-2);
            display: flex;
            align-items: center;
            width: 100%;
            padding: .5rem 1rem;
            font-weight: 700;

            .tab-icon {
              margin-right: .5rem;
              width: 15px;
              height: 15px;
              color: var(--fut-secondary);
            }
            span {
              white-space: nowrap;
            }

            &:hover {
              background: #d5dceb;
              color: var(--fut-background-lighter);

              .tab-icon {
                color: var(--fut-background-lightest-2);
              }
            }
            &:active {
              div {
                transform: scale(.95);
              }
            }
            &.selected {
              background: transparent !important;
              color: var(--fut-primary);
              .tab-icon {
                color: var(--fut-primary);
              }
            }
          }
        }
      }
    }

    .close-btn {
      border: none;
      background: transparent;
      color: var(--fut-secondary);
      padding: 2px 14px;
      border-radius: 15px;
      margin-right: 6px;

      &:hover {
        color: var(--fut-color-dynamic);
        background: var(--fut-background-black-2);
      }

      .icon {
        width: 14px;
        height: 14px;
      }
    }
  }

  .tickets-body {
    color: var(--fut-color-dynamic);

    .tab-ticket {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      height: calc(100vh - 60px);

      .ticket-type {
        border-bottom: 2px solid var(--fut-background-lighter);
        padding: .5rem;

        .type-list {
          background: var(--fut-background);
          margin: 0;
          list-style: none;
          border-radius: 40px;
          padding: 5px;
          display: inline-flex;

          button {
            background: transparent;
            border: none;
            color: var(--fut-color-dynamic);
            padding: 11.5px 20px;
            display: flex;
            align-items: center;
            margin: 0;
            border-radius: 40px;
            font-weight: 600;
            font-size: .875rem;

            &:hover {
              background: var(--fut-background-lightest-2);
            }

            .simple-icon {
              margin-right: .5rem;
              width: 16px;
              height: 16px;
              display: flex;
              justify-content: center;

              span {
                display: flex;
                width: 7px;
                height: 15px;
                background: var(--fut-background-white-3);
                border-radius: 2.5px;
                transform: rotate(45deg);
              }
            }
            .multiple-icon {
              margin-right: .5rem;
              width: 16px;
              height: 16px;
              display: flex;
              justify-content: center;
              transform: scale(.90);
              margin-bottom: -4px;

              span {
                display: flex;
                width: 7px;
                height: 15px;
                background: var(--fut-background-white-3);
                border-radius: 3px;
                transform: rotate(45deg);

                &:first-of-type {
                  width: 5.5px !important;
                  margin-right: -2px;
                  margin-top: -4px;
                }
                &:last-of-type {
                  border-left: 2px dotted var(--fut-background-lighter);
                  margin-bottom: -4px;
                }
              }
            }
            &.selected {
              background: var(--fut-background-lightest-2);

              .icon {
                background: #fff;
              }
            }
          }
        }
      }

      .list-wrapper {
        overflow-y: auto;
        display: flex;
        flex-direction: column;
        flex-grow: 1;

        &::-webkit-scrollbar-track {
          background-color: transparent;
        }
        &::-webkit-scrollbar {
          width: 6px;
        }
        &::-webkit-scrollbar-thumb {
          border-radius: 3px;
          background: var(--fut-background-lightest-2);
        }

        .tickets-list {
          list-style: none;
          padding: .5rem 1rem 1rem;
          margin: 0;
          display: flex;
          flex-direction: column;
          flex-grow: 1;

          .ticket-item {
            position: relative;
            display: flex;
            flex-direction: column;
            margin-bottom: 12px;

            .ticket-title {
              display: flex;
              justify-content: space-between;
              align-items: center;
              padding: .282rem .75rem;
              background: var(--fut-background-lightest-2);
              color: var(--fut-secondary);
              border-radius: .25rem .25rem 0 0;

              .live-badge {
                background: #e9113c;
                color: var(--fut-color-dynamic);
                font-size: .75rem;
                padding: 0 .25rem;
                display: inline-flex;
                white-space: nowrap;
                border-radius: .25rem;
              }
              span {
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                width: 100%;
                font-weight: 700;
                font-size: .875rem;
              }

              button {
                background: transparent;
                border: none;
                color: var(--fut-secondary);
                display: flex;
                height: 14px;

                .icon {
                  width: 14px;
                  height: 14px;
                }

                &:hover {
                  color: var(--fut-color-dynamic);
                }
                &:active {
                  .icon {
                    display: flex;
                    transform: scale(.95);
                  }
                }
              }
            }

            .ticket-content {
              width: 100%;
              flex-shrink: 0;
              display: grid;
              align-items: flex-end;
              grid-template-columns: repeat(6,1fr);
              grid-auto-rows: auto;
              position: relative;
              padding: .5rem .75rem .75rem;
              box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .2), 0 1px 2px 0 rgba(0, 0, 0, .12);
              background: var(--fut-background-lighter);
              grid-template-areas:
                "market market market market maxBet maxBet"
                "outcome outcome outcome outcome outcome odds"
                "footer footer footer footer footer footer"
                "footer footer footer footer footer footer"
              ;
              font-size: .875rem;
              font-weight: 600;

              .market {
                grid-area: market;
                color: var(--fut-secondary);
              }
              .max {
                grid-area: maxBet;
              }
              .name {
                grid-area: outcome;
                font-weight: 700;
              }
              .odds {
                grid-area: odds;
                color: var(--fut-primary-lighter);
                font-weight: 700;
                text-align: end;
              }
              .footer {
                grid-area: footer;
                display: grid;
                grid-template-columns: repeat(6,1fr);
                margin-top: .25rem;
                grid-template-areas:
                  "amount amount amount return return return"
                  "amount amount amount estimatedAmount estimatedAmount estimatedAmount"
                ;
                color: var(--fut-secondary);

                .amount {
                  grid-area: amount;
                }
                .return {
                  grid-area: return;
                  font-size: .75rem;
                }
                .estimated-amount {
                  grid-area: estimatedAmount;
                }
              }
            }

            &.disabled {
              .ticket-title {
                background: #5d0718;
              }
              &::before {
                background: radial-gradient(circle, transparent, transparent 50%, #5d0718 50%, #5d0718 100%) 0px -6px/0.7rem 0.7rem repeat-x !important;
              }
            }

            &.no-radius:not(:first-of-type) {
              .ticket-title {
                border-radius: 0 !important;
              }
            }
            &.no-radius:not(:first-of-type)::before {
              content: "";
              position: absolute;
              top: -4px;
              left: 0;
              height: 6px;
              width: 100%;
              background: radial-gradient(circle, transparent, transparent 50%, var(--fut-background-lightest-2) 50%, var(--fut-background-lightest-2) 100%) 0px -6px/0.7rem 0.7rem repeat-x;
            }
            &::after {
              content: "";
              position: absolute;
              left: 0;
              bottom: -4px;
              height: 6px;
              width: 100%;
              background: radial-gradient(circle, transparent, transparent 50%, var(--fut-background-lighter) 50%, var(--fut-background-lighter) 100%) 0px 1px/0.7rem 0.7rem repeat-x;
            }
          }
        }
      }

      .submit-area {
        display: grid;
        padding: 1rem;
        row-gap: .5rem;
        background: var(--fut-background-lighter);
        grid-template-rows: auto;
        grid-auto-flow: row;
        box-shadow: 0 -1px 3px 0 rgba(0, 0, 0, .2), 0 -1px 2px 0 rgba(0, 0, 0, .12);
        z-index: 1;

        .text, .value {
          font-size: .875rem;
          color: var(--fut-color-dynamic);
        }
        .text {
          color: var(--fut-secondary);
          font-weight: 600;
        }
        .value {
          font-weight: 700;

          &.mult {
            color: var(--fut-primary-lighter) !important;
          }
        }
        p {
          color: #ed4163;
          font-size: .875rem;
        }

        .accept-btn, .submit-btn {
          background: var(--fut-primary);
          color: var(--fut-color-dynamic);
          border: none;
          padding: 12px 20px;
          border-radius: .25rem;
          box-shadow: 0rem .0625rem .1875rem #00000033 , 0rem .0625rem .125rem #0000001f;
          display: flex;
          justify-content: center;

          span {
            color: var(--fut-color-dynamic);
            font-size: .875rem;
            font-weight: 600;
          }

          &:hover {
            background: var(--fut-primary-darker);
          }
          &:active {
            span {
              display: flex;
              transform: scale(.95);
            }
          }
        }
        .submit-btn {

          &.disabled {
            opacity: .5;
            &:hover {
              background: var(--fut-primary);
            }
            &:active {
              span {
                transform: none;
              }
            }
          }
        }
      }
    }
  }
}

@media (max-width: 821px) {
  #sk-ticket {
    position: fixed;
    top: 0;
    left: 0;
    height: calc(100vh - 128px) !important;
    width: 100%;
    max-width: 100%;

    .tab-ticket {
      height: calc(100vh - 128px) !important;
    }
  }
}
</style>

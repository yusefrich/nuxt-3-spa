<template>
  <div class="print-bg-black">
    <fut-inplay-field
      v-if="showingField && inplayEvent && inplayEvent.livescore_id && statscoreConfig"
      :id="inplayEvent.livescore_id"
      :statscore-config="statscoreConfig"
      name="desktop_fb"
    />
    <div class="mobile-content d-md-none">
      <div class="betslip-bar">
        <fb-fut-button class="search-icon p-0" @click="$emit('toggleSearchOverlay')">
          <font-awesome-icon class="text-dark search-icon-icon" :icon="['fas', 'search']" />
        </fb-fut-button>
        <fb-fut-button class="betslip-icon p-0" @click="open = !open">
          <div v-if="tickets.length > 0" class="counter">
            {{ tickets.length }}
          </div>
          <font-awesome-icon class="text-dark betslip-icon-icon" :icon="['fas', 'file-alt']" />
        </fb-fut-button>
      </div>
    </div>
    <div class="content-ticket d-none d-md-block d-print-block" :class="{'ticket-mobile-open': open}">
      <div class="bg-games-list">
        <font-awesome-icon class="d-none d-md-inline fut-color-dynamic" :icon="['fas', 'tag']" />
        <span class="ticket-container-text fut-color-dynamic ps-2">{{ $t('i18n_boletim_de_aposta').toUpperCase() }}</span>
        <fb-fut-button class="float-end d-md-none fut-color-dynamic pe-2 pt-2" @click="open = !open">
          <font-awesome-icon class="text-primary" :icon="['fas', 'times']" />
        </fb-fut-button>
      </div>
      <div class="d-md-none new-bet-container text-end">
        <fb-fut-button class="button-reset-mobile p-1 mt-1 mb-1 pe-2 fut-color-dynamic" @click="()=>{$emit('clearAll'); open = false}">
          <span class="fut-color-dynamic">{{ $t('i18n_nova_aposta') }}</span>
        </fb-fut-button>
      </div>
      <div class="bg-gray">
        <div v-if="tickets.length <= 0" class="px-md-2">
          <div class="message-holder text-white px-2 fut-color-dynamic">
            <small class="message-content">{{ $t('i18n_nao_ha_selecoes_disponiveis') }}</small>
          </div>
        </div>
        <div v-if="tickets.length > 0">
          <div v-for="(currentTicket, index) in tickets" :key="'bet_'+currentTicket.gameId + '_' + index">
            <div class="border-bottom-primary ticket-bg-mobile">
              <div class="pt-2 teams-content bg-background" :class="{'bg-primary-transparent ': betSlipStyle === 2}">
                <p class="ms-1 text-white teams size-text mb-1 fut-color-dynamic">
                  {{ currentTicket.event }}
                </p>
              </div>
              <div class="d-none d-md-flex align-items-center odd-content justify-content-between" :class="{'mt-1': betSlipStyle === 2}">
                <span class="ticket-header-w me-1">
                  <span class="teams text-white text-uppercase mx-1 ticket-container-text-sm">{{ returnNumberedTitle(currentTicket.odd.header ? currentTicket.odd.header : currentTicket.odd.desc, currentTicket) }}</span>
                </span>
                <span class="text-white teams w-100 ticket-container-text-sm"><small>{{ currentTicket.market }}</small></span>
                <span class="teams text-white ticket-container-text-sm">{{ currentTicket.odd.odds }}</span>
                <fb-fut-button v-if="betSlipStyle === 2" class="border-0 bg-transparent close-button-2 p-1 fut-color-dynamic" @click="()=>{$emit('toggleTicket', currentTicket); submenuType && tickets.length <= 1 ? betType = 'simple' : ()=>{}}">
                  <font-awesome-icon class="close-icon" :icon="['fas', 'times']" />
                </fb-fut-button>
                <fb-fut-button v-else class="border-0 bg-transparent close-button p-1 fut-color-dynamic" @click="()=>{$emit('toggleTicket', currentTicket); submenuType && tickets.length <= 1 ? betType = 'simple' : ()=>{}}">
                  <font-awesome-icon class="close-icon" :icon="['fas', 'times']" />
                </fb-fut-button>
              </div>
              <div class="d-flex d-md-none align-items-center odd-content-2 justify-content-between mt-1">
                <span class="ticket-header-w me-1">
                  <span class="teams text-white text-uppercase mx-1 ticket-container-text-sm">{{ returnNumberedTitle(currentTicket.odd.header ? currentTicket.odd.header : currentTicket.odd.desc, currentTicket) }}</span>
                </span>
                <span class="text-white teams w-100 ticket-container-text-sm">{{ currentTicket.market }}</span>
                <span class="teams mobile-odd ticket-container-text-sm">{{ currentTicket.odd.odds }}</span>
                <fb-fut-button class="border-0 bg-transparent p-1 close-container" @click="()=>{$emit('toggleTicket', currentTicket); submenuType && tickets.length <= 1 ? betType = 'simple' : ()=>{}}">
                  <div class="close-1" />
                  <div class="close-2" />
                </fb-fut-button>
              </div>
            </div>
          </div>
          <div class="mobile-spacing">
            <table class="w-100">
              <tbody>
                <tr>
                  <td />
                  <td>
                    <fb-fut-button class="button-reset-sm w-100 d-none d-md-block fut-color-dynamic me-2 me-md-0" @click="()=>{$emit('clearAll'); open = false}">
                      <font-awesome-icon class="mr-1" :icon="['fas', 'redo']" />
                      <span v-if="betSlipStyle === 2">{{ $t('i18n_limpar_boletim').toUpperCase() }}</span>
                      <span v-else>{{ $t('i18n_nova_aposta').toUpperCase() }}</span>
                    </fb-fut-button>
                  </td>
                </tr>
                <tr>
                  <td class="td-left" colspan="2">
                    <span class="text-white teams ms-1 fut-color-dynamic teams-mobile">{{ $t('i18n_selecoes') }}:</span>
                  </td>
                  <td class="td-right text-end text-md-start" colspan="2">
                    <span class="text-white teams fut-color-dynamic teams-mobile me-2 me-md-0">{{ tickets.length }}</span>
                  </td>
                </tr>
                <tr>
                  <td class="td-left" colspan="2">
                    <span class="text-white teams ms-1 fut-color-dynamic teams-mobile">{{ $t('i18n_odds_totais') }}:</span>
                  </td>
                  <td class="td-right text-end text-md-start" colspan="2">
                    <span class="text-white teams fut-color-dynamic teams-mobile me-2 me-md-0">{{ getPreCashInTicketsTotalOdds.toFixed(2) > oddsMaxValue ? oddsMaxValue : getPreCashInTicketsTotalOdds.toFixed(2) }}</span>
                  </td>
                </tr>
                <tr>
                  <td class="td-left" colspan="2">
                    <span class="text-white teams ms-1 fut-color-dynamic teams-mobile">{{ $tc('i18n_aposta', 1) }}:</span>
                  </td>
                  <td class="td-right text-end text-md-start" colspan="2">
                    <fb-bet-input
                      class="input-controler text-white fut-color-dynamic ms-auto ms-md-0 me-2 me-md-0"
                      ref-input="multiples_single"
                      :placeholder="$t('i18n_valor_da_aposta')"
                      :disabled="multiple.free_bet"
                      :required="true"
                      :value="+multiple.value"
                      :limit-value="betMaxValue"
                      :min-value="betMinValue"
                      @change="(value) => $emit('updateMultipleTicket', {value: value})"
                    />
                    <!-- <fut-bet-input
                      class="input-controler text-white d-md-none fut-color-dynamic"
                      ref-input="multiples_single"
                      :placeholder="$t('i18n_valor_da_aposta')"
                      :disabled="multiple.free_bet"
                      :required="true"
                      :value="+multiple.value"
                      :limit-value="betMaxValue"
                      :min-value="betMinValue"
                      @change="(value) => $emit('updateMultipleTicket', {value: value})"
                    />
                    <input
                      class="input-controler text-white d-none d-md-block fut-color-dynamic"
                      type="number"
                      :disabled="multiple.free_bet"
                      :value="+multiple.value"
                      @input="(event) => $emit('updateMultipleTicket', {value: +event.target.value})"
                    >
                    <input
                      class="input-controler text-white d-md-none fut-color-dynamic"
                      type="tel"
                      pattern="[0-9]*"
                      inputmode="decimal"
                      novalidate
                      :disabled="multiple.free_bet"
                      :value="+multiple.value"
                      @input="(event) => $emit('updateMultipleTicket', {value: +(event.target.value.replace(/,/,'.'))})"
                    > -->
                  </td>
                </tr>
                <tr>
                  <td class="td-left d-md-none" colspan="3">
                    <label for="oddsChangeInput" class="text-white teams ms-1 fut-color-dynamic form-check-label pointer teams-mobile" @click="awaysAccept = !awaysAccept">{{ $t('i18n_sempre_aceitar') }}: </label>
                  </td>
                  <td class="td-left d-none d-md-table-cell" colspan="2">
                    <label for="oddsChangeInput" class="text-white teams ms-1 fut-color-dynamic form-check-label pointer teams-mobile" @click="awaysAccept = !awaysAccept">{{ $t('i18n_sempre_aceitar') }}: </label>
                  </td>
                  <td class="td-right text-end text-md-start text-white" colspan="1">
                    <font-awesome-icon v-if="awaysAccept" class="pointer me-2 me-md-0" :icon="['far', 'check-circle']" @click="awaysAccept = !awaysAccept" />
                    <font-awesome-icon v-else class="pointer me-2 me-md-0" :icon="['far', 'circle']" @click="awaysAccept = !awaysAccept" />
                  </td>
                </tr>
                <tr v-if="+freeBetValue > 0">
                  <td class="td-left">
                    <label for="freebetInput" class="text-white teams ms-1 fut-color-dynamic">{{ $t('i18n_aposta_gratis') }}: </label>
                  </td>
                  <td class="td-right text-start">
                    <input
                      id="freebetInput"
                      class="checkbox-controler text-white fut-color-dynamic"
                      :checked="multiple.free_bet"
                      type="checkbox"
                      @change="event=>$emit('updateMultipleTicket', {free_bet: event.target.checked, value: event.target.checked ? +freeBetValue : null})"
                    >
                  </td>
                </tr>
                <!-- <tr v-else-if="+freeBetValue > 0 && tickets[0]">
                  <td class="td-left">
                    <label for="oddsChangeInput" class="text-white teams ms-1">{{ $t('i18n_aposta_gratis') }}: </label>
                  </td>
                  <td class="td-right text-start">
                    <input
                      id="oddsChangeInput"
                      :checked="tickets[0].free_bet"
                      class="checkbox-controler text-white"
                      type="checkbox"
                      @change="event=>updateOddFreeBet(event.target.checked, +freeBetValue, tickets[0])"
                    >
                  </td>
                </tr> -->
              </tbody>
            </table>
          </div>
          <div class="container mobile-spacing-bottom">
            <div class="win-value-container">
              <div class="win-value-title fut-color-dynamic">
                <span>{{ $t('i18n_ganho_maximo') }}</span>
              </div>
              <div class="win-value-value" :class="{'bg-primary border-primary': betSlipStyle === 2}">
                <span :class="{'text-dark': betSlipStyle === 2}">{{ getMultipleTicketReturn > winMaxValue ? getFormattedValue(winMaxValue) : getMultipleTicketReturn && +getMultipleTicketReturn >= 0 ? getFormattedValue(getMultipleTicketReturn) : getFormattedValue(0) }}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="container mobile-spacing-bottom pb-0 pb-md-1" :class="{'pb-1': tickets.length > 0}">
          <!-- //todo matheus att tag abaixo para um atomo -->
          <div v-if="invalidMultiple" class="invalid-multiple">
            <span>{{ $t('i18n_selecoes_multiplas') }}</span>
          </div>
          <fb-fut-button
            v-if="loggedInUser && tickets.length > 0 && !oddChange(tickets)"
            :disabled="loading || !getMultipleTicketReturn || +getMultipleTicketReturn <= 0"
            class="button-success py-1 w-100 mt-4 fut-color-dynamic"
            :class="{'button-success-2': betSlipStyle === 2}"
            @click="()=>{$emit('submit')}"
          >
            <span class="teams-mobile">{{ $t('i18n_coloque_aposta') }}</span>
            <font-awesome-icon v-if="loading" class="icon spinner-class" :icon="['fas', 'circle-notch']" />
          </fb-fut-button>
          <fb-fut-button
            v-else-if="loggedInUser && tickets.length > 0"
            :disabled="loading"
            class="button-success py-1 w-100 mt-4 fut-color-dynamic"
            @click="$emit('acceptAllChanges')"
          >
            <span>{{ $t('i18n_aceito_as_mudancas_de_odds') }}</span>
            <font-awesome-icon v-if="loading" class="icon spinner-class" :icon="['fas', 'circle-notch']" />
          </fb-fut-button>
          <!-- <fb-fut-button
            v-if="!loggedInUser && tickets.length > 0"
            class="button-enter-bet py-2 w-100 mt-3 mb-1 d-md-block fut-color-dynamic"
            @click="redirect()"
          >
            {{ $t('i18n_entrar_e_apostar') }}
          </fb-fut-button> -->
          <fb-fut-button class="button-reset py-1 w-100 mt-2 mb-4 d-none d-md-block fut-color-dynamic" :class="{'border-none': betSlipStyle === 2}" @click="()=>{$emit('clearAll'); open = false}">
            <font-awesome-icon class="mr-10" :icon="['fas', 'redo']" />
            <span v-if="betSlipStyle === 2">{{ $t('i18n_limpar_boletim').toUpperCase() }}</span>
            <span v-else>{{ $t('i18n_nova_aposta').toUpperCase() }}</span>
          </fb-fut-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Money3Directive } from 'v-money3'
import FbFutButton from '@/components/fb/atoms/FbFutButton'
import FutInplayField from '@/components/default/atoms/FutInplayField'
import FbBetInput from '@/components/fb/atoms/FbBetInput.vue'
import utils from '@/utils/utils.js'

export default {
  components: {
    FbFutButton,
    FutInplayField,
    FbBetInput
  },
  directives: { money3: Money3Directive },
  props: {
    reducedNamingStyle: {
      type: Boolean,
      default: false
    },
    showingField: {
      type: Boolean,
      default: false
    },
    invalidMultiple: {
      type: Boolean,
      default: false
    },
    betSlipStyle: {
      type: Number,
      default: null
    },
    font: {
      type: String,
      default: null
    },
    statscoreConfig: {
      type: String,
      default: null
    },
    inplayEvent: {
      type: Object,
      default: () => ({})
    },
    /**
     * Loading state to block the submit button.
     * @name loading
     */
    loading: {
      type: Boolean,
      default: false
    },
    /**
     * Sets the tickets submenu for selecting simple or multiple bets.
     * @name submenuType
     */
    submenuType: {
      type: Number,
      default: null
    },
    /**
     * Max value a bet can be.
     * @name betMaxValue
     */
    betMaxValue: {
      type: Number,
      default: null
    },
    /**
     * Max value a odd can be.
     * @name betMaxValue
     */
    oddsMaxValue: {
      type: Number,
      default: 9999999999.99
    },
    /**
     * Min value a bet can be.
     * @name betMinValue
     */
    betMinValue: {
      type: Number,
      default: null
    },
    /**
     * Max value a winner bet can pay.
     * @name winMaxValue
     */
    winMaxValue: {
      type: Number,
      default: null
    },
    /**
     * Freebet valeu of a user.
     * @name freeBetValue
     */
    freeBetValue: {
      type: [String, Boolean],
      default: ''
    },
    /**
     * check if the user is logged in.
     * @name loggedInUser
     */
    loggedInUser: {
      type: Object,
      default: () => ({})
    },
    /**
     * request errors.
     * @name errors
     */
    errors: {
      type: Object,
      default: () => ({})
    },
    /**
     * User selected bets.
     * @name tickets
     */
    tickets: {
      type: Array,
      default: () => ([])
    },
    /**
     * Multiple value and odd for a group of user selected bets.
     * @name multiple
     */
    multiple: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      /* bet types: full, simple, multiple */
      betType: 'full',
      betPlaced: false,
      open: false,
      errorMessage: null,
      freeBetWarning: false,
      awaysAccept: false,
      money: {
        decimal: ',',
        thousands: '.',
        prefix: 'R$ ',
        precision: 2,
        masked: false /* doesn't work with directive */
      }
    }
  },
  computed: {
    getMultipleTicketReturn () {
      return (this.tickets.reduce((partialSum, a) => partialSum * +a.odd.odds, 1) * this.multiple.value) - (this.multiple.free_bet ? this.multiple.value : 0)
    },
    getPreCashInMultipleBetValidation () {
      const uniqTickets = []
      const dupeTickets = []
      this.tickets.forEach(obj => [uniqTickets, dupeTickets][+(this.tickets.map(obj => obj.gameId).filter(gameId => gameId === obj.gameId).length > 1)].push(obj))
      return dupeTickets.length === 0
    },
    getPreCashInTicketsValidation () {
      return this.tickets.find(e => !e.live && Date.parse(e.validate) < Date.parse(new Date())) && !this.loading
    },
    getPreCashInTotalValue () {
      const simpleTotalValue = this.tickets.reduce((partialSum, a) => partialSum + +a.value, 0)
      return simpleTotalValue + this.multiple.value
    },
    getPreCashInTotalReturn () {
      const simpleTotalReturn = this.tickets.reduce((partialSum, a) => partialSum + (+a.odd.odds * +a.value) - (a.free_bet ? +a.value : 0), 0)
      return simpleTotalReturn + (this.tickets.reduce((partialSum, a) => partialSum + +a.odd.odds, 0) * this.multiple.value) - (this.multiple.free_bet ? this.multiple.value : 0)
    },
    getPreCashInTicketsTotalOdds () {
      return this.tickets.reduce((partialSum, a) => partialSum * +a.odd.odds, 1)
    }
  },
  watch: {
    betType (val) {
      this.$emit('resetAllBets')
    },
    tickets (val) {
      if (val.length <= 0) {
        this.open = false
      }
    }
  },
  mounted () {
    this.open = false
    if (this.submenuType) {
      this.betType = 'simple'
    }
  },
  beforeDestroy () {
    this.$root.$off('selectBet')
  },
  methods: {
    returnNumberedTitle (title, odd) {
      const teams = odd.event.split(' x ')
      return utils.replaceMarketName(true, title, teams[0], teams[1])
    },
    redirect () {
      const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth

      if (width < 768) {
        this.$router.push(this.localePath('/login'))
        this.open = false
      } else {
        this.$emit('openLogin')
      }
    },
    selectedFreebet (tickets) {
      let returnValue = false
      tickets.forEach((e) => {
        if (e.free_bet) {
          returnValue = true
        }
      })
      return returnValue
    },
    toggleTickets (value) {
      if (this.submenuType) {
        if (this.tickets.length > 1) {
          this.betType = 'multiple'
        } else {
          this.betType = 'simple'
        }
      }
      this.$emit('clearAllFreeBet')
      this.open = value
    },
    oddChange (tickets) {
      let change = false
      tickets.forEach((e) => {
        if (e.odds_change) {
          change = true
        }
      })
      return change
    },
    outOfDate (ticket) {
      if (ticket.live === 1) {
        return false
      }
      if (Date.parse(ticket.validate) < Date.parse(new Date())) {
        return true
      } else {
        return false
      }
    },
    updateOddValue (value, ticket) {
      const newTicket = { ...ticket }
      newTicket.value = value
      this.$emit('updateTicket', newTicket)
    },
    /* eslint-disable-next-line */
    updateOddFreeBet (free_bet, value, ticket) {
      const newTicket = { ...ticket }
      /* eslint-disable-next-line */
      newTicket.free_bet = free_bet
      /* eslint-disable-next-line */
      newTicket.value = free_bet ? value : null
      this.$emit('updateTicket', newTicket)
    },
    getFormattedValue (value) {
      const formattedResult = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      })
      return formattedResult.format(value)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/layout/breakpoints";
.ticket-header-w{
  max-width: 100px;
  overflow: hidden;
  width: 100%;
  span{
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    display: block;
    text-overflow: ellipsis;
  }
}
.ticket-container-text{
  font-size: 12px;
  line-height: 38px;
  font-family: Arial, sans-serif;
  @include md{
    line-height: initial;
  }
}
.ticket-container-text-sm{
  font-size: 11px;
}
.win-value-container{
  padding-top: 5px;
  font-size: 14px;
  text-transform: uppercase;
  overflow: hidden;
}
.win-value-title{
  background-color: var(--fut-primary);
  text-align: center;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  padding: 3px 0;
  color: #000;
  @include md {
    color: white;
    background-color: var(--fut-background-darker);
  }
}
.win-value-value{
  background-color: var(--fut-background-lightest-2);
  // background-color: var(--fut-background-games-list);
  border: 2px solid var(--fut-primary);
  text-align: center;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  padding: 5px 0;
  font-size: 30px;
  line-height: 36px;
  color: white;
  @include md {
    color: var(--fut-primary);
    background-color: var(--fut-background-lightest);
    border: 2px solid var(--fut-background-darker);
  }
}
.content-ticket {
  width: 100%;
  overflow: hidden;
}
.bg-games-list {
  color: white;
  font-size: 13px;
  background-color: var(--fut-background-lightest-2);
  padding: 10px 5px;
  @include md{
    background-color: var(--fut-background-2);
  }
}
.bg-header {
  color: white;
  font-size: 13px;
  background-color: var(--fut-background-lighter);
  padding: 10px 5px;
  @include md{
    background-color: var(--fut-background-header);
  }
}

.teams{
  font-size: 11px;
}
.teams-mobile{
  @include _md {
    font-size: 16px;
  }
}
.message-holder {
  // margin-top: 5px;
  @include md {
    background-color: var(--fut-background-white-2);
    border-radius: 5px;
  }
  .message-content{
    font-size: 13px;
    font-style: italic;
    @include md{
      font-size: 11px;
      font-style: normal;
    }
  }
}
.bg-gray {
  background-color: var(--fut-background-lightest-2);
  max-height: 85%;
  overflow-x: auto;

  @include md {
    background-color: var(--fut-background-lighter);
  }
}
.button-success {
  border: none;
  border: 1px solid var(--fut-background-lightest);
  background-color: transparent;
  border-radius: 5px;
  font-size: 12px;
  color: black;
  background-image: linear-gradient(
    to right,
    var(--fut-primary-black),
    var(--fut-primary)
  );
  &:disabled{
    opacity: .5;
  }
}
.button-success-2 {
  margin-top: 5px !important;
  background: var(--fut-primary);
}
.button-enter-bet {
  border: none;
  background-image: linear-gradient(
    to right,
    var(--fut-primary-black),
    var(--fut-primary)
  );
  border-radius: 5px;
  color: #333;
  font-size: 12px;
  text-transform: uppercase;
  font-weight: 700;
}
.button-reset {
  border: none;
  border: 1px solid var(--fut-background-white-2);
  background-color: transparent;
  border-radius: 5px;
  color: white;
  font-size: 11px;
    &:hover {
      color: black;
      background-image: linear-gradient(
        to right,
        var(--fut-primary-black),
        var(--fut-primary)
      );
    }
}
.button-reset-mobile {
  border: none;
  background-color: transparent;
  border-radius: 5px;
  color: white;
  font-size: 12px;
  font-weight: 700;
}
.button-reset-sm {
  border: none;
  border: 2px solid var(--fut-background-white);
  background-color: transparent;
  border-radius: 5px;
  color: white;
  font-size: 10px;
  padding: 4px;
  margin-top: 5px;
  &:hover {
    color: black;
    background-image: linear-gradient(
      to right,
      rgb(142, 218, 28),
      greenyellow,
      rgb(199, 238, 142)
    );
  }
  white-space: nowrap;
  span{
    white-space: nowrap;
  }
}
.teams-content {
  white-space: nowrap;
  overflow: hidden;
  p{
    overflow: hidden;
    display: block;
    text-overflow: ellipsis;
  }
}
.input-controler {
  border: none;
  outline: none;
  background: var(--fut-background-darker);
  font-size: 10px;
  @include md{
    width: 80px;
  }
  width: 100px !important;
  &::placeholder {
    color: white;
  }
}
/* in Chrome, Safari, Edge and opera */
.input-controler::-webkit-outer-spin-button,
.input-controler::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
/* In Firefox */
.input-controler[type=number] {
  -moz-appearance: textfield;
}
.odd-content {
  // background-color: var(--fut-background-lightest);
  background-color: var(--fut-background-lighter);
  border-bottom: 2px solid var(--fut-primary);
}
.odd-content-2 {
  background-color: var(--fut-background-lightest-2);
  border-bottom: 1px solid var(--fut-primary);
  padding-bottom: 10px;
}
.td-left {
  width: 55%;
}
.td-right {
  width: 45%;
}
.close-bet {
  font-size: 10px;
  color: white;
  z-index: 2;
  position: relative;
}
.close-button-2 {
  width: 25px;
  text-align: center;
  color: #eee;
  display: block;
  text-decoration: none;
  position: relative;
  overflow: hidden;
  background-color: var(--fut-primary) !important;
  border-radius: 0 !important;
  margin-left: 5px;
}
.close-button {
  width: 25px;
  text-align: center;
  color: #eee;
  display: block;
  text-decoration: none;
  position: relative;
  overflow: hidden;
}
.close-button::before {
  content: "";
  position: absolute;
  top: -11px;
  left: -1px;
  width: 16px;
  height: 87px;
  -ms-transform: rotate(15deg);
  -webkit-transform: rotate(15deg);
  transform: rotate(15deg);
  background-color: var(--fut-background-white);
  z-index: 0;
}
.close-icon {
  font-size: 10px;
  z-index: 2;
  position: relative;
}
.betslip-bar{
  position: fixed;
  bottom: 129px;
  left: unset;
  right: -50px;
  text-align: center;
  margin: 0 auto;
  border-bottom: 50px solid var(--fut-primary);
  border-left: 25px solid transparent;
  border-right: 25px solid transparent;
  height: 0;
  width: 150px;
  z-index: 100;
  transform: rotateZ(-90deg);
  // box-shadow: 0px 0px 15px -3px rgba(0,0,0,0.1);
  .search-icon{
    transform: rotateZ(90deg);
    position: absolute;
    right: 0px;
    width: 50px;
    height: 50px;
    border-bottom: 2px solid #0000002a;
    .search-icon-icon{
      font-size: 30px;
    }
  }
  .betslip-icon{
    display: inline-block;
    width: 50px;
    height: 50px;
    position: absolute;
    left: 0;
    background-repeat: no-repeat;
    background-size: 22px;
    transform: rotate(91deg);
    background-position: center;
    .betslip-icon-icon{
      font-size: 30px;
    }
    .counter{
      width: 19px;
      height: 19px;
      border-radius: 50%;
      position: absolute;
      top: -2px;
      left: 5px;
      font-weight: 700;
      font-size: 12px;
      color: white;
      background: gray;
    }
  }
}
.ticket-mobile-open{
  display: block !important;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1060;
  height: 100%;
  background: var(--fut-background-black);
}
.new-bet-container{
  background: var(--fut-background);
}
.spinner-class{
  animation-name: spin;
  animation-duration: 500ms;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
}
@keyframes spin {
  from {
    transform:rotate(0deg);
  }
  to {
    transform:rotate(360deg);
  }
}
.border-none {
  border: none;
}
.ticket-bg-mobile{
  @include _md {
    background: var(--fut-background-lightest-2);
    border-top: 1px solid var(--fut-primary);
  }
}
.bg-background {
  @include md {
    p{
      text-transform: uppercase;
    }
  }
  @include _md {
    background-color: transparent !important;
    p{
      font-style: italic;
    }
  }
}
.close-container{
  width: 40px;
  height: 30px;
  position: relative;
}
.close-1{
  width: 1px;
  height: 20px;
  background: var(--fut-primary);
  position: absolute;
  left: 50%;
  top: 5px;
  transform: rotate(45deg);
}
.close-2{
  width: 1px;
  height: 20px;
  background: var(--fut-primary);
  position: absolute;
  left: 50%;
  top: 5px;
  transform: rotate(-45deg);
}
.mobile-spacing {
  @include _md {
    border-top: 20px solid var(--fut-background-black);
    border-left: 10px solid var(--fut-background-black);
    border-right: 10px solid var(--fut-background-black);
    // border-radius: 5px;
  }
}
.mobile-spacing-bottom {
  @include _md {
    border-left: 10px solid var(--fut-background-black);
    border-right: 10px solid var(--fut-background-black);
  }
}
.mobile-odd{
  font-size: 16px;
  color: #000;
  background: var(--fut-primary);
  padding: 1px 2px;
  border-radius: 2px;
  margin-right: 20px;
}
.pointer{
  cursor: pointer;
}
.print-bg-black{
  @media print {
    background-color: var(--fut-background);
    -webkit-print-color-adjust: exact;
  }
}
.invalid-multiple{
  background-color: rgba(78, 19, 19, 0.85);
  color: white;
  font-size: 11px;
  margin-top: 10px;
  line-height: 14px;
  padding: 5px;
}
</style>

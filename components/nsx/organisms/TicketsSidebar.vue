<template>
  <div class="ticket-holder">
    <div :class="['transition', 'open']">
      <div class="d-none d-md-block">
        <!-- // todo ajuste tamanho do scroll do card caso tenha um aovivo -->
        <div
          v-if="livescoreId && statscoreConfig"
          class="header-inplay-collapse d-none d-md-flex justify-content-between px-2 py-1"
        >
          <nsx-fut-button class="header-item mb-0" to="#">
            Partida
          </nsx-fut-button>
          <nsx-fut-button
            class="header-collapse ps-2"
            data-bs-toggle="collapse"
            to="#collapse-field"
            @click="showingField = !showingField"
          >
            <font-awesome-icon v-if="showingField" :icon="['fas', 'chevron-down']" /><font-awesome-icon v-if="!showingField" :icon="['fas', 'chevron-up']" />
          </nsx-fut-button>
        </div>
        <div id="collapse-field" class="collapse show">
          <fut-inplay-field
            v-if="livescoreId && statscoreConfig"
            :id="livescoreId"
            :statscore-config="statscoreConfig"
          />
        </div>
      </div>
      <div :class="['ticket-container py-0 px-0 transition']">
        <div v-if="tickets.length > 0 || previous" class="d-flex d-md-none justify-content-between w-100 bg-white-tickets" @click="open = !open">
          <font-awesome-icon v-if="open" class="icon" :icon="['fas', 'sort-down']" />
          <font-awesome-icon v-else class="icon mt-2" :icon="['fas', 'sort-up']" />
          <p class="mb-0">
            {{ $t('i18n_caderneta') }}
          </p>
          <p class="mb-0 fut-color-dynamic bg-gray px-2">
            {{ tickets.length }}
          </p>
        </div>
        <div class="d-none d-md-flex justify-content-between w-100 px-2 tickets-header">
          <nsx-fut-button
            class="mb-0 btn-menu w-100 d-flex justify-content-between fut-color-dynamic"
            :class="{active: currentMenu === 0}"
            @click="currentMenu = 0"
          >
            <span>{{ $t('i18n_caderneta') }}</span> <span v-if="tickets" class="odds-number">{{ tickets.length }}</span>
          </nsx-fut-button>
          <nsx-fut-button
            v-if="userBets && userBets.pending && userBets.pending.length > 0"
            class="mb-0 btn-menu w-100 d-flex justify-content-between fut-color-dynamic"
            :class="{active: currentMenu === 1}"
            @click="currentMenu = 1"
          >
            <span>{{ $t('i18n_aposta', 2) }}</span> <span class="odds-number">{{ userBets.pending.length }}</span>
          </nsx-fut-button>
        </div>
        <form v-if="currentMenu === 1" class="responsive-tickets transition bg-nsx-gray" :class="{smaller : !open}">
          <nsx-bets-group
            v-if="userBets && userBets.pending"
            smaller
            :bets="userBets.pending"
            :loading="cashoutLoading"
            @submitCashout="$emit('submitCashout', $event)"
          />
        </form>
        <form
          v-if="currentMenu === 0"
          ref="formEl"
          class="responsive-tickets transition"
          :class="{smaller : !open, 'with-field': livescoreId && statscoreConfig && showingField, 'with-field-collapsed': livescoreId && statscoreConfig && !showingField}"
        >
          <div v-if="tickets.length <= 0 && !previous" class="w-100 d-none d-md-block">
            <p class="fut-color-dynamic text-center pt-1" style="font-size: 13.3px">
              {{ $t('i18n_ainda_nao_ha_nenhuma') }}!
            </p>
          </div>
          <div v-if="previous" class="previous">
            <div class="previous-header d-none d-md-block">
              <span>{{ $t('i18n_ticket_criado') }}</span>
            </div>
            <div class="previous-title d-none d-md-flex justify-content-between">
              <div class="d-flex">
                <font-awesome-icon :icon="['fas', 'check']" />
                <span>{{ $t('i18n_aposta_feita') }}</span>
              </div>
              <span>{{ $t('i18n_pronto') }}</span>
            </div>
            <div class="d-flex d-md-none justify-content-between mobile-ticket-header">
              <div>
                <h5>
                  <font-awesome-icon class="icon me-2" :icon="['fas', 'check']" />{{ $t('i18n_aposta_feita') }}
                </h5>
                <p class="mb-0">
                  Ticket
                </p>
              </div>
              <div>
                <p class="mb-0 mt-3 me-2">
                  {{ $t('i18n_pronto') }}
                </p>
              </div>
            </div>
            <div class="d-md-none mobile-spacing" />
            <div class="previous-body">
              <div v-for="(item, index) in previous.tickets" :key="'precious_events_'+index" class="previous-item">
                <div class="d-flex justify-content-between">
                  <span class="title">{{ item.odd.ticket }}</span>
                  <span>{{ item.odd.odds }}</span>
                </div>
                <span class="d-block">{{ item.market }}</span>
                <span class="d-block">{{ item.event }}</span>
                <div v-if="item.value && +item.value > 0" class="d-flex justify-content-between">
                  <div>
                    <span class="d-block">{{ $t('i18n_valor') }}</span>
                    <span class="d-block">{{ fixedValue(+item.value) }}</span>
                  </div>
                  <div v-if="winMaxValue">
                    <span class="d-block">{{ $t('i18n_retorno', 1) }}</span>
                    <span class="d-block">{{ (+item.value * +item.odd.odds) > +winMaxValue ? winMaxValue : fixedValue(+item.value * +item.odd.odds) }}</span>
                  </div>
                  <div />
                </div>
              </div>
              <div v-if="previous.multiple && previous.multiple.value" class="previous-item">
                <div class="d-flex justify-content-between">
                  <span class="title">{{ $t('i18n_aposta_multipla') }}</span>
                </div>
                <span class="d-block">{{ previous.tickets.length }} {{ $t('i18n_multipla', 2) }}</span>
                <div class="d-flex justify-content-between">
                  <div>
                    <span class="d-block">{{ $t('i18n_valor') }}</span>
                    <span class="d-block">{{ fixedValue(+previous.multiple.value) }}</span>
                  </div>
                  <div v-if="winMaxValue">
                    <span class="d-block">{{ $t('i18n_retorno', 1) }}</span>
                    <span class="d-block">{{ +previous.multiple.value * totalOdds(previous.tickets) > +winMaxValue ? winMaxValue : fixedValue(+previous.multiple.value * totalOdds(previous.tickets)) }}</span>
                  </div>
                  <div />
                </div>
              </div>
            </div>
            <div class="previous-footer text-center d-none d-md-block">
              <span>{{ $t('i18n_total_da_aposta') }}: R$ {{ fixedValue(totalValue(previous)) }}</span>
            </div>
            <div v-if="open" class="previous-footer previous-footer-mobile d-flex d-md-none justify-content-between">
              <div class="text-start w-100">
                <p class="mb-0">
                  {{ $t('i18n_total_da_aposta') }}
                </p>
                <h4>R$ {{ fixedValue(totalValue(previous)) }}</h4>
              </div>
              <div v-if="winMaxValue" class="text-start w-100">
                <p class="mb-0">
                  {{ $t('i18n_retorno', 2) }}
                </p>
                <h4>R$ {{ totalReturn(previous) > +winMaxValue ? winMaxValue : totalReturn(previous) }}</h4>
              </div>
            </div>
            <div class="mobile-spacing-footer d-md-none" />
          </div>
          <div v-if="tickets.length > 0 " class="current-tickets mb-md-3" :style="currentLayoutStyle === 'oldBet365' ? 'background: #c5c5c5' : ''">
            <div class="bets-content p-2 fut-scrollbar">
              <div v-for="(currentTicket, index) in tickets" :key="'bet_'+currentTicket.id+index" class="position-relative">
                <div class="ps-4 row w-100 m-0">
                  <div class="col-12 px-0">
                    <div class="d-flex w-100">
                      <p class="mb-0 bet-title fut-color-dynamic" style="color: var(--nsx-dark-2);">
                        {{ currentTicket.odd.header }}
                      </p>
                      <p class="text-dark mb-0 ms-auto bet-title">
                        {{ currentTicket.odd.odds }}
                      </p>
                    </div>
                    <p class="text-dark mb-0 bet-title">
                      <small>{{ currentTicket.market }}</small>
                    </p>
                    <p class="text-dark mb-0 bet-title">
                      <small>{{ currentTicket.event }}</small>
                    </p>
                  </div>
                  <div class="col-12 px-0">
                    <div v-if="tickets.length > 1" class="d-flex">
                      <fut-bet-field
                        :validate="errors?errors.errors:{}"
                        name="value"
                      >
                        <fut-bet-input
                          :min-value="betMinValue"
                          :limit-value="betMaxValue"
                          :disabled="currentTicket.free_bet"
                          :ref-input="'single'+currentTicket.betId"
                          :required="true"
                          :value="currentTicket.value ? +currentTicket.value : null"
                          :current-layout-style="currentLayoutStyle"
                          style="max-width: 90px;"
                          class="me-2"
                          nsx-input
                          @change="(value) => {updateOddValue(value, currentTicket)}"
                        />
                      </fut-bet-field>
                      <div v-if="currentTicket.odds_change || outOfDate(currentTicket)">
                        <p v-if="currentTicket.odds_change" class="bet-title mb-1 fw-bold">
                          {{ $t('i18n_odd_alterada') }}
                        </p>
                        <p v-if="outOfDate(currentTicket)" class="mb-1 bet-title fw-bold">
                          {{ $t('i18n_jogo_ja_iniciado') }}
                        </p>
                      </div>
                      <div v-else>
                        <p
                          class="text-dark mb-1 text-end bet-title"
                        >
                          <small v-if="winMaxValue">{{ $t('i18n_retorno', 1) }}: <span class="text-dark">{{ ((currentTicket.value ? currentTicket.value : 0) * currentTicket.odd.odds - (currentTicket.odd.free_bet ? currentTicket.value : 0)) > winMaxValue ? getFormattedValue(winMaxValue) : getFormattedValue(currentTicket.value * currentTicket.odd.odds - (currentTicket.odd.free_bet ? currentTicket.value : 0)) }}</span></small>
                        </p>
                      </div>
                    </div>
                    <!-- //TODO add freebet na aposta -->
                    <div v-if="+freeBetValue > 0 && !multiple.free_bet && (!selectedFreebet(tickets) || (currentTicket && currentTicket.free_bet))">
                      <div v-if="(tickets.length > 1)" class="form-check float-end">
                        <label style="white-space: nowrap" class="form-check-label text-dark" :for="'input_'+currentTicket.betId">
                          <small>
                            {{ $t('i18n_aposta_gratis') }}
                          </small>
                        </label>
                        <input
                          :id="'input_'+currentTicket.betId"
                          :checked="currentTicket.free_bet"
                          class="form-check-input"
                          type="checkbox"
                          @change="event=>updateOddFreeBet(event.target.checked, +freeBetValue, currentTicket)"
                        >
                      </div>
                    </div>
                  </div>
                </div>
                <nsx-fut-button
                  :class="[currentLayoutStyle === 'oldBet365' ? 'nsx-delete' : '']"
                  :sm="true"
                  type="button"
                  class="no-break deleteBet p-1 py-0 fut-color-dynamic"
                  @click="()=>{$emit('toggleTicket', currentTicket)}"
                >
                  <strong class="text-uppercase">
                    <font-awesome-icon class="icon" :icon="['fas', 'times']" />
                  </strong>
                </nsx-fut-button>
                <hr class="bg-white my-1">
              </div>
              <div v-if="(!onMobile() && !sameGame(tickets)) || (!sameGame(tickets) && onMobile() && tickets.length > 1)">
                <div v-if="tickets.length > 1" class="d-flex justify-content-between">
                  <p class="mb-1 bet-title">
                    {{ $t('i18n_aposta_multipla') }}
                  </p>
                  <p class="mb-1 bet-title">
                    {{ getPreCashInTicketsTotalOdds }}
                  </p>
                </div>
                <p v-if="tickets.length > 1" class="mb-2 bet-title">
                  {{ tickets.length }} {{ $t('i18n_multipla', 2) }}
                </p>
                <div class="d-flex">
                  <fut-bet-field
                    :validate="errors?errors.errors:{}"
                    nsx-validation
                    name="value_total"
                    class="mt-2 me-2"
                  >
                    <fut-bet-input
                      :disabled="multiple.free_bet"
                      :required="true"
                      :value="+multiple.value"
                      :limit-value="betMaxValue"
                      :min-value="betMinValue"
                      :current-layout-style="currentLayoutStyle"
                      style="max-width: 90px;"
                      ref-input="multiples_single"
                      nsx-input
                      @change="(value) => $emit('updateMultipleTicket', {value: value})"
                    />
                  </fut-bet-field>
                  <p v-if="winMaxValue" class="text-dark text-start bet-title">
                    {{ $t('i18n_retorno', 2) }}:<br><span class="text-dark">{{ getMultipleTicketReturn > winMaxValue ? getFormattedValue(winMaxValue) : getFormattedValue(getMultipleTicketReturn) }}</span>
                  </p>
                </div>
                <div v-if="+freeBetValue > 0 && !selectedFreebet(tickets)">
                  <div class="form-check float-end">
                    <label style="white-space: nowrap" class="form-check-label text-dark" :for="'input_main_free'">
                      <small>
                        {{ $t('i18n_aposta_gratis') }}
                      </small>
                    </label>
                    <input
                      :id="'input_main_free'"
                      class="form-check-input"
                      type="checkbox"
                      :checked="multiple.free_bet"
                      @change="event=>$emit('updateMultipleTicket', {free_bet: event.target.checked, value: event.target.checked ? +freeBetValue : null})"
                    >
                  </div>
                </div>
              </div>
            </div>
            <div class="w-100" :class="{'bottom-stick': open}">
              <p v-if="sameGame(tickets)" class="mb-0 bet-title bg-white p-2 text-center">
                {{ $t('i18n_nao_e_possivel_fazer_aposta') }}
              </p>
              <p v-if="errorMessage" class="text-danger m-0 mb-0">
                {{ errorMessage }}
              </p>
              <div v-if="!oddChange(tickets)">
                <nsx-fut-button
                  :primary="true"
                  :loading="loading"
                  :block="true"
                  type="button"
                  class="no-break fut-color-dynamic d-none d-md-block"
                  @click="callSubmitBet()"
                >
                  {{ $t('i18n_fazer_aposta') }} <span style="color: #ff8800">{{ getFormattedValue(getPreCashInTotalValue) }}</span>
                </nsx-fut-button>
                <nsx-fut-button
                  v-if="tickets.length > 1"
                  :primary="true"
                  :loading="loading"
                  :block="true"
                  type="button"
                  class="no-break fut-color-dynamic d-md-none"
                  @click="callSubmitBet()"
                >
                  {{ $t('i18n_fazer_aposta') }} <span style="color: #ff8800">{{ getFormattedValue(getPreCashInTotalValue) }}</span>
                </nsx-fut-button>
                <div v-else class="d-md-none row mx-0">
                  <div v-if="+freeBetValue > 0 && !selectedFreebet(tickets)">
                    <div class="form-check">
                      <label style="white-space: nowrap" class="form-check-label text-dark" :for="'input_main_free'">
                        <small>
                          {{ $t('i18n_aposta_gratis') }}
                        </small>
                      </label>
                      <input
                        :id="'input_main_free'"
                        class="form-check-input"
                        type="checkbox"
                        :checked="multiple.free_bet"
                        @change="event=>$emit('updateMultipleTicket', {free_bet: event.target.checked, value: event.target.checked ? +freeBetValue : null})"
                      >
                    </div>
                  </div>
                  <div class="col-6 px-0">
                    <fut-bet-field
                      :validate="errors?errors.errors:{}"
                      class="h-100"
                      nsx-validation
                      name="value_total"
                    >
                      <fut-bet-input
                        :disabled="multiple.free_bet"
                        :required="true"
                        :value="+multiple.value"
                        :limit-value="betMaxValue"
                        :min-value="betMinValue"
                        :prefix="'R$ '"
                        :current-layout-style="currentLayoutStyle"
                        ref-input="multiples_single"
                        nsx-input
                        @change="(value) => $emit('updateMultipleTicket', {value: value})"
                      />
                    </fut-bet-field>
                  </div>
                  <div class="col-6 px-0">
                    <nsx-fut-button
                      :block="true"
                      :loading="loading"
                      :gradient="true"
                      class="no-break fut-color-dynamic d-md-none h-100"
                      style="line-height: 15px;"
                      type="button"
                      @click="callSubmitBet()"
                    >
                      <small>
                        {{ $t('i18n_fazer_aposta') }}
                      </small>
                      <br>
                      <small><span style="color: #ff8800">{{ $t('i18n_retorno', 2) }} {{ getFormattedValue(getPreCashInTotalReturn) }}</span></small>
                    </nsx-fut-button>
                  </div>
                </div>
              </div>
              <div v-else>
                <p class="mb-0 bet-title bg-white p-2 text-center">
                  {{ $t('i18n_a_linha_as_odds_ou_a') }}
                </p>
                <nsx-fut-button
                  :block="true"
                  :gray_darker="true"
                  type="button"
                  class="no-break fut-color-dynamic"
                  @click="$emit('acceptAllChanges')"
                >
                  {{ $t('i18n_aceito_as_mudancas') }}
                </nsx-fut-button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { Money3Directive } from 'v-money3'
import NsxFutButton from '@/components/nsx/atoms/NsxFutButton'
import FutBetInput from '@/components/default/atoms/FutBetInput.vue'
import FutBetField from '@/components/default/molecules/FutBetField.vue'
import NsxBetsGroup from '@/components/nsx/molecules/NsxBetsGroup.vue'
import FutInplayField from '@/components/default/atoms/FutInplayField'

export default {
  name: 'TicketsSidebar',
  components: {
    NsxFutButton,
    FutBetInput,
    FutBetField,
    NsxBetsGroup,
    FutInplayField
  },
  directives: { money3: Money3Directive },
  props: {
    /**
     * This is all the user bets
     * @name userBets
     */
    userBets: {
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
     * Max value a bet can be.
     * @name betMaxValue
     */
    betMaxValue: {
      type: Number,
      default: null
    },
    /**
     * Max value a bet can be bet by user.
     * @name userBetMaxValue
     */
    userBetMaxValue: {
      type: Number,
      default: null
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
    },
    freeBetValue: {
      type: [String, Boolean],
      default: ''
    },
    /**
    * Current layout chosen by .env to change the app layout
    * @name currentLayoutStyle
    */
    currentLayoutStyle: {
      type: String,
      default: ''
    },
    /**
    * Current layout chosen by .env to change the app layout
    * @name livescoreId
    */
    livescoreId: {
      type: Number,
      default: null
    },
    /**
    * Current layout chosen by .env to change the app layout
    * @name statscoreConfig
    */
    statscoreConfig: {
      type: String,
      default: ''
    },
    cashoutLoading: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      open: true,
      showingField: true,
      previousTicket: null,
      previous: null,
      currentMenu: 0,
      /* bet types: full, simple, multiple */
      betType: 'full',
      valorDoPremio: '',
      cliente: '',
      price: '0',
      free_bet: false,
      errorMessage: null,
      currentSport: null,
      money: {
        decimal: ',',
        thousands: '.',
        prefix: 'R$ ',
        precision: 2,
        masked: false /* doesn't work with directive */
      },
      currentTickets: [],
      data: {
        /* eslint-disable-next-line */
        value_total: 0,
        /* eslint-disable-next-line */
        free_bet: false,
        value: 0,
        return: 0,
        events: []
      }
    }
  },
  fetch () {
    if (this.onMobile()) {
      this.open = false
    }
  },
  computed: {
    getMultipleTicketReturn () {
      return (this.tickets.reduce((partialSum, a) => partialSum * +a.odd.odds, 1) * this.multiple.value) - (this.multiple.free_bet ? this.multiple.value : 0)
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
      return this.tickets.reduce((partialSum, a) => partialSum * +a.odd.odds, 1).toFixed(2)
    }
  },
  watch: {
    betType (val) {
      this.resetValues()
    }
  },
  mounted () {
    // todo setTimeout that clear tickets in 5min
    // todo see if the user block bets without time
    this.currentSport = (this.$route.params.sportId) ? +this.$route.params.sportId : 6046
  },
  beforeDestroy () {
    this.$root.$off('selectBet')
  },
  methods: {
    totalValue (prev) {
      return prev.tickets.reduce((p, s) => p + +s.value, 0) + +prev.multiple.value
    },
    totalReturn (prev) {
      return prev.tickets.reduce((p, s) => p + +s.value * +s.odd.odds, 0) + +prev.multiple.value * this.totalOdds(prev.tickets)
    },
    totalOdds (tickets) {
      return tickets.reduce((p, s) => p + +s.odd.odds, 0)
    },
    fixedValue (value) {
      return value.toFixed(2)
    },
    onMobile () {
      return window.innerWidth < 992
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
    sameGame (values) {
      if (!Array.isArray(values)) {
        return true
      }
      const uniqueValues = new Set(values.map(v => v.gameId))
      if (uniqueValues.size < values.length) {
        return true
      }
      return false
    },
    resetValues () {
      this.price = '0'
      this.tickets.forEach((e) => {
        this.updateOddValue(0.00, e)
      })
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
      if (ticket.live) {
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
    },
    callSubmitBet () {
      this.$emit('submit', (ticketObject) => {
        this.previous = ticketObject
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "@/assets/layout/variables";
  @import "@/assets/layout/breakpoints";
  .btn-menu{
    white-space: nowrap;
    color: white;
    &.active{
      color: #ffa500 !important;
    }
  }
  .bg-gray{
    background: #8b8b8b;
    border-radius: 50%;
  }
  .bg-white-tickets{
    background: #dbdbdb;
    padding: .4rem !important;
  }
  .ods-guide{
    background-color: var(--fut-primary);
    padding-top: 15px;
  }
  .btn-select{
    color: #000;
  }
  .btn-select:hover{
    font-weight: bold;
    border-bottom: 1px solid #000;
  }
  .btn-select-active{
    font-weight: bold;
    border-bottom: 3px solid #000 !important;
  }
  .background-bets{
    background: #000000;
    height: 100vh;
    top: 0;
    position: fixed;
    left: 0;
    z-index: -1;
    opacity: .4;
  }
  .responsive-tickets.smaller{
    max-height: 0px;
  }
  .responsive-tickets{
    scroll-behavior: smooth;
    overflow: auto;
    max-height: 411px;
    @include lg{
      max-height: calc(100vh - 145px);
      overflow: auto;
    }
    @include lg{
      &::-webkit-scrollbar-track {
        opacity: .3;
        border-radius: 0.125rem;
        background-color: var(--nsx-dark-7);
      }
      &::-webkit-scrollbar {
        opacity: .3;
        width: 13px;
      }
      &::-webkit-scrollbar-thumb {
        border: solid 2px var(--nsx-dark-7);
        opacity: .3;
        border-radius:50px;
        width: 5px;
        background-color: var(--nsx-dark-6);
      }
    }
  }
  .responsive-tickets.with-field{
    @include lg{
      max-height: calc(100vh - 440px);
      overflow: auto;
    }
  }
  .responsive-tickets.with-field-collapsed{
    @include lg{
      max-height: calc(100vh - 195px);
      overflow: auto;
    }
  }
  .deleteBet{
    position: absolute;
    top: 0;
    left: 0;
    border-radius: 50%;
    margin-top: 2px;
  }
  .ticket-holder {
    position: fixed;
    border-radius: 18px;
    z-index: 1040;
    left: 0;
    bottom: 0;
    width: 100%;
    @include md {
      height: 100%;
      left: initial;
      bottom: initial;
      width: 250px;
      max-width: 400px;
      background: var(--nsx-dark-2);
    }
  }
  .tickets-title{
    color: $dark;
    font-weight: 600;
    span{
      color: $white;
      background: var(--fut-primary);
      border-radius: 40px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 30px;
      height: 30px;
    }
  }
  .ticket-mobile-header{
    height: 60px;
    background: $white;
    -webkit-box-shadow: 0px 0px 26px -6px rgba(0,0,0,0.74);
    box-shadow: 0px 0px 26px -6px rgba(0,0,0,0.74);
    border-radius: 10px;
    align-items: center;
    .text-qtd{
      color: var(--fut-primary);
      font-weight: 700;
      background: var(--fut-background-2-lightest);
      border: 15px solid var(--fut-background-2-lightest);
      height: 100%;
      width: 40%;
    }
  }
  .btn-mob-block{
    width: 100%;
    font-size: 20px;
  }
  .ticket-container{
    height: 100%;
    opacity: 1;
    padding: 5px;
    border-radius: 18px;
  }
  .ticket-header{
    background: var(--fut-background-2-lightest);
  }
  .font-weigth-bold{
    font-weight: bold;
  }
  .ticket-container.h-0{
    height: 0;
    opacity: 0;
  }
  .close-btn{
    font-size: 20px;
    padding-right: 30px;
  }
  .no-tickets{
    background: var(--fut-background-2-darkest);
    padding: 10px;
    border-radius: 10px;
    margin-top: 20px;
    color: $gray-600;
  }
  .img-gray{
    filter: grayscale(100%);
    -webkit-filter: grayscale(100%);
    -moz-filter: grayscale(100%);
    opacity: .2;
  }
  .nsx-delete{
    background: var(--nsx-gray-1);
    color: #c5c5c5;
    font-size: 8px;
  }
  .bet-title{
    font-size: 10pt;
    font-weight: 400;
  }
  .bottom-stick{
    position: fixed;
    bottom: 0;
    @include md{
      bottom: initial;
      position: initial;
    }
  }
  .fut-scrollbar{
    padding-bottom: 90px !important;
    @include md{
      padding-bottom: 8px !important;
    }
  }
  .odds-number{
    background: #ffa500;
    color: white;
    border-radius: 50%;
    line-height: 17px;
    width: 17px;
    font-size: 10.6px !important;
  }
  .previous{
    font-size: 12px;
  }
  .previous-header{
    background: #8b8b8b;
    color: #dbdbdb;
    font-size: 9pt;
    font-weight: 400;
    padding: 0.3rem;
  }
  .previous-title{
    background-color: #dbdbdb;
    color: var(--nsx-dark-3);
    font-size: 10pt;
    font-weight: 400;
    padding: 0.3rem;
  }
  .previous-item{
    background-color: #c5c5c5;
    color: var(--nsx-dark-5);
    border-color: var(--nsx-gray-0);
    border-top: 1px solid #b8b8b8;
    position: relative;
    width: 100%;
    transition: -webkit-transform .3s;
    transition: transform .3s;
    transition: transform .3s,-webkit-transform .3s;
    font-size: 9pt;
    padding: 0.5rem 0.3rem;
  }
  .title{
    font-size: 10pt;
    font-weight: 400;
    color: var(--nsx-dark-2);
  }
  .previous-footer{
    padding: 0.5rem 0.3rem;
    background-color: #dbdbdb;
    text-align: center;
    color: var(--nsx-dark-3);
    font-weight: 700;
  }
  .previous-footer-mobile{
    position: absolute;
    bottom: 0;
    width: 100%;
    p{
      font-size: 12px;
      color: var(--nsx-dark-3);
      font-weight: 500;
    }
    h4{
      color: var(--fut-primary-darkest);
      font-size: 18.66px;
    }
  }
  .tickets-header{
    background: var(--nsx-dark-2);
    span{
      font-size: 14.6px;
    }
  }
  .bg-nsx-gray{
    background-color: var(--nsx-dark-3);
  }
  .mobile-ticket-header{
    background-color: #8b8b8b;
    padding: 0.3rem;
    position: absolute;
    top: 35px;
    z-index: 10;
    width: 100%;
    h5{
      font-size: 16px;
      color: #dbdbdb;
    }
    p{
      font-size: 12px;
      color: #303030;
      font-weight: 700;
      margin-left: 23px;
    }
  }
  .mobile-spacing{
    height: 50px;
  }
  .mobile-spacing-footer{
    height: 60px;
  }
  .header-inplay-collapse{
    background: var(--nsx-dark-2);
    .header-item{
      width: 100%;
      text-align: center;
      border-right: 1px solid var(--nsx-dark-7);
      color: #ffba39;
      font-size: 13.3px;
      text-decoration: none;
      padding-top: 3px;
    }
    .header-collapse{
      color: #c5c5c5;
    }
  }
</style>

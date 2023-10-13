<template>
  <div class="ticket-holder">
    <div v-if="open" class="background-bets" @click="toggleTickets(false)" />
    <div :class="['transition', open?'open':'']">
      <div
        v-if="tickets.length > 0"
        class="ticket-mobile-header d-flex justify-content-between c-pointer"
        @click="toggleTickets(!open)"
      >
        <h5 class=" mb-0 pt-1 ps-3 tickets-title">
          <span> {{ tickets.length }} </span> {{ $t('i18n_bilhetes', 2) }}
        </h5>
        <fut-button v-if="open" class="btn close-btn">
          <font-awesome-icon class="text-primary icon" :icon="['fas', 'times']" />
        </fut-button>
      </div>
      <div :class="['ticket-container py-0 mt-2 pt-2 transition', (open)?'':'h-0']">
        <form class="responsive-tickets fut-scrollbar">
          <div v-if="tickets.length <= 0" class="no-tickets">
            <p>{{ $t('i18n_nenhuma_aposta_selecionada') }}</p>
            <p>{{ $t('i18n_selecione_uma_cotacao_valida') }}</p>
            <div class="text-center">
              <img
                src="/img/soccer.png"
                class="img-fluid img-gray"
                width="170"
                alt=""
              >
            </div>
          </div>
          <div v-if="tickets.length > 0 && open" class="current-tickets ">
            <div v-if="betType !== 'full'" class="d-flex mb-2">
              <fut-button
                :class="{'btn-select':true, 'fut-color-dynamic':true, 'btn-select-active': betType === 'simple'}"
                type="button"
                @click="()=>{betType = 'simple'}"
              >
                {{ $t('i18n_simples') }}
              </fut-button>
              <fut-button
                :disabled="tickets.length <= 1 || !multipleBetAvailable"
                :class="{'btn-select':true, 'fut-color-dynamic':true, 'btn-select-active': betType === 'multiple'}"
                type="button"
                @click="()=>{betType = 'multiple'}"
              >
                {{ $t('i18n_multipla', 1) }}
              </fut-button>
            </div>
            <div class="bets-content fut-scrollbar">
              <div
                v-for="(currentTicket, index) in tickets"
                :key="'bet_'+currentTicket.gameId + '_' + index"
                class="position-relative"
              >
                <div class="ps-4 row w-100 m-0">
                  <div :class="{'col-6': betType === 'simple' || betType === 'full', 'col-9': betType === 'multiple'}">
                    <div class="d-block">
                      <p class="text-white mb-0 fw-bold fut-color-dynamic">
                        <small>{{ currentTicket.odd.ticket }}</small>
                      </p>
                    </div>
                  </div>
                  <div
                    v-if="!currentTicket.odds_change && !outOfDate(currentTicket)"
                    :class="{'col-6': betType === 'simple' || betType === 'full', 'col-3': betType === 'multiple'}"
                  >
                    <div v-if="tickets.length > 1 && (betType === 'simple' || betType === 'full')">
                      <fut-bet-field
                        :validate="errors?errors.errors:{}"
                        name="value"
                        :odds="currentTicket.odd.odds"
                      >
                        <fut-bet-input
                          :disabled="currentTicket.free_bet"
                          style="max-width: 200px;"
                          :placeholder="$t('i18n_valor_da_aposta')"
                          prefix="R$"
                          :ref-input="'single_'+currentTicket.betId"
                          :required="true"
                          :value="currentTicket.value ? +currentTicket.value : null"
                          :limit-value="betMaxValue"
                          :min-value="betMinValue"
                          :current-layout-style="currentLayoutStyle"
                          @change="(value) => {updateOddValue(value, currentTicket)}"
                        />
                      </fut-bet-field>
                    </div>
                    <div v-else>
                      <p class="fw-bold text-white badge bg-secondary float-end">
                        {{ currentTicket.odd.odds }}
                      </p>
                    </div>
                    <!-- <div v-if="+freeBetValue > 0 && !multiple.free_bet && (!selectedFreebet(tickets) || currentTicket.free_bet)">
                      <div v-if="(tickets.length > 1 && betType === 'simple' || betType === 'full')" class="form-check float-end">
                        <label style="white-space: nowrap" class="form-check-label text-white fut-color-dynamic" :for="'input_'+currentTicket.odd.type">
                          {{ $t('i18n_aposta_gratis') }}
                        </label>
                        <input
                          :id="'input_'+currentTicket.odd.type"
                          class="form-check-input"
                          type="checkbox"
                          :checked="currentTicket.free_bet"
                          @change="event=>updateOddFreeBet(event.target.checked, +freeBetValue, currentTicket)"
                        >
                      </div>
                    </div> -->
                  </div>
                  <!-- // TODO check if odds is contained on the ticket -->
                  <div v-else :class="{'col-6': betType === 'simple' || betType === 'full', 'col-3': betType === 'multiple'}">
                    <p v-if="currentTicket.odds_change" class="text-danger mb-1 fw-bold text-end">
                      <small>{{ $t('i18n_odd_alterada') }}</small>
                    </p>
                    <p v-if="outOfDate(currentTicket)" class="text-danger mb-1 fw-bold text-end">
                      <small>{{ $t('i18n_jogo_ja_iniciado') }}</small>
                    </p>
                  </div>
                  <div class="col-12">
                    <p class="text-white mb-0 d-flex justify-content-between fut-color-dynamic">
                      <small>{{ currentTicket.market }}</small>
                      <small :class="['badge', 'ms-0', `${currentTicket.live ? 'bg-primary': 'bg-secondary'}`]">{{ currentTicket.live ? $t('i18n_ao_vivo') : $t('i18n_pre_jogo') }}</small>
                    </p>
                    <p class="text-white mb-0 d-flex justify-content-between fut-color-dynamic">
                      <small>{{ currentTicket.event }}</small>
                      <small
                        v-if="(betType === 'simple' || betType === 'full')"
                        :key="'return_' + currentTicket.odd.type + '' + currentTicket.value"
                        class="text-primary fw-bold"
                      >
                        <span class="text-white fut-color-dynamic">{{ $t('i18n_retorno', 1) }}:</span>
                        <span v-if="currentTicket.free_bet" class="fut-color-dynamic">{{ getFormattedValue((currentTicket.value * currentTicket.odd.odds) - currentTicket.value) }}</span>
                        <span v-else class="fut-color-dynamic">{{ getFormattedValue((currentTicket.value * currentTicket.odd.odds) > winMaxValue ? winMaxValue : (currentTicket.value * currentTicket.odd.odds)) }}</span>
                      </small>
                    </p>
                  </div>
                </div>
                <fut-button
                  type="button"
                  class="no-break deleteBet p-1"
                  :sm="true"
                  @click="()=>{$emit('toggleTicket', currentTicket); submenuType && tickets.length <= 1 ? betType = 'simple' : ()=>{}}"
                >
                  <strong class="text-uppercase font-weight-ligth">
                    <font-awesome-icon class="text-white icon fut-color-dynamic" :icon="['fas', 'times']" />
                  </strong>
                </fut-button>
                <hr class="bg-white my-1">
              </div>
              <div v-if="multipleBetAvailable">
                <fut-bet-field
                  :validate="errors?errors.errors:{}"
                  name="value_total"
                  :label="tickets.length > 1 ? `${$t('i18n_multipla', 2)}:` : `${$t('i18n_valor') }:`"
                  :odds="''+getPreCashInTicketsTotalOdds.toFixed(2)"
                >
                  <fut-bet-input
                    prefix="R$"
                    ref-input="multiples_single"
                    :placeholder="$t('i18n_valor_da_aposta')"
                    :disabled="multiple.free_bet"
                    :required="true"
                    :value="+multiple.value"
                    :limit-value="betMaxValue"
                    :min-value="betMinValue"
                    :current-layout-style="currentLayoutStyle"
                    @change="(value) => $emit('updateMultipleTicket', {value: value})"
                  />
                </fut-bet-field>
                <div v-if="+freeBetValue > 0 && !selectedFreebet(tickets)">
                  <div class="form-check float-end">
                    <label style="white-space: nowrap" class="form-check-label text-white" :for="'input_main_free'">
                      {{ $t('i18n_aposta_gratis') }}
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
                <br>
                <p class="text-white text-end fut-color-dynamic">
                  {{ $t('i18n_retorno_potencial') }}:  <span class="text-primary font-weigth-bold">{{ getMultipleTicketReturn > winMaxValue ? getFormattedValue(winMaxValue) : getFormattedValue(getMultipleTicketReturn) }}</span>
                </p>
              </div>
            </div>
            <p v-if="errorMessage" class="text-danger m-0 mb-0">
              {{ errorMessage }}
            </p>
            <fut-button
              v-if="!oddChange(tickets)"
              :primary="true"
              :loading="loading"
              :disabled="getPreCashInTicketsValidation"
              :block="true"
              type="button"
              class="no-break text-white font-weigth-bold mb-3"
              @click="$emit('submit')"
            >
              {{ $t('i18n_fazer_aposta') }} {{ getFormattedValue(getPreCashInTotalValue) }}
            </fut-button>
            <fut-button
              v-else
              :primary="true"
              :block="true"
              type="button"
              class="no-break text-white font-weigth-bold mb-3"
              @click="$emit('acceptAllChanges')"
            >
              {{ $t('i18n_aceito_as_mudancas') }}
            </fut-button>
            <fut-button
              type="button"
              class="no-break text-white fut-color-dynamic font-weigth-bold mb-3"
              :primary="false"
              :block="true"
              @click="()=>{$emit('clearAll'); open = false}"
            >
              {{ $t('i18n_remover_tudo') }}
            </fut-button>
          </div>
        </form>
      </div>
    </div>
    <fut-modal
      class="text-center"
      :open="freeBetWarning"
      :title="$t('i18n_regra_aposta_gratis')"
      @onClose="()=>{ freeBetWarning = false; }"
    >
      <p>{{ $t('i18n_voce_tem_uma_aposta_gratis_ativa') }}</p>
    </fut-modal>
  </div>
</template>
<script>
import { Money3Directive } from 'v-money3'
import FutButton from '@/components/default/atoms/FutButton.vue'
import FutModal from '@/components/default/organisms/FutModal.vue'
import FutBetInput from '@/components/default/atoms/FutBetInput.vue'
import FutBetField from '@/components/default/molecules/FutBetField.vue'

export default {
  components: { FutButton, FutBetInput, FutBetField, FutModal },
  directives: { money3: Money3Directive },
  props: {
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
    /**
    * Current layout chosen by .env to change the app layout
    * @name currentLayoutStyle
    */
    currentLayoutStyle: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      /* bet types: full, simple, multiple */
      betType: 'full',
      open: false,
      errorMessage: null,
      freeBetWarning: false,
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
    multipleBetAvailable () {
      const gameIds = {}

      this.tickets.forEach((ticket) => { gameIds[ticket.gameId] = true })

      return Object.keys(gameIds).length === this.tickets.length
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
  @import "@/assets/layout/variables";
  @import "@/assets/layout/breakpoints";
  .ods-guide{
    background-color: var(--fut-primary);
    padding-top: 15px;
  }
  .btn-select{
    color: #ffffff;
  }
  .btn-select:hover{
    font-weight: bold;
    border-bottom: 1px solid #ffffff;
  }
  .btn-select-active{
    font-weight: bold;
    border-bottom: 3px solid #ffffff !important;
  }
  .background-bets{
    background: #000000;
    width: 100vw;
    height: 100vh;
    top: 0;
    position: fixed;
    left: 0;
    z-index: -1;
    opacity: .4;
  }
  .responsive-tickets{
    height: 87vh;
    overflow: auto;
  }
  .deleteBet{
    position: absolute;
    top: 0;
    left: 0;
    border-radius: 50%;
  }
  .ticket-holder{
    position: fixed;
    width: 100%;
    bottom: -295px;
    border-radius: 18px;
    bottom: 10px;
    z-index: 1040;
    max-width: 400px;
    @include md {
      left: 37%;
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
      background: var(--fut-background-lightest);
      border: 15px solid var(--fut-background-lightest);
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
    background: var(--fut-background-darker);
    border-radius: 18px;
  }
  .ticket-header{
    background: var(--fut-background-lightest);
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
    background: var(--fut-background-darkest);
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
</style>

<template>
  <div
    :key="tickets.length"
    :class="{ 'ticket-wrapper': !collapsed }"
    @click="collapsed = true"
  >
    <div
      v-show="tickets.length > 0"
      id="ticket"
      :class="{ open: !collapsed }"
      @click.stop
    >
      <div id="ticket-title" @click="collapsed = !collapsed, tab = 'myBetsTab'">
        <p v-if="collapsed || !loggedInUser" class="mb-0 collapsed-title">
          <span>{{ $t('i18n_minhas_apostas') }}</span>
          <span class="tickets-counter">{{ bets.length }}</span>
        </p>
        <p v-else class="mb-0">
          {{ $t('i18n_saldo') }}: <span class="fw-normal">R$ {{ loggedInUser.balance }}</span>
        </p>
      </div>

      <div id="ticket-body">
        <div>
          <div
            v-show="collapsed"
            class="collapsed-infos"
          >
            <div class="bet-title">
              <div
                v-show="multipleBetAvailable"
                class="x-icon"
                @click="
                  toggleTickets(),
                  $emit('clearMultipleTicket'),
                  checked = null"
              >
                <font-awesome-icon class="icon" :icon="['fas', 'times']" />
              </div>
              <div
                :class="tickets.length!==1&&!multipleBetAvailable?'ms-4 w-100':'w-100'"
                @click="collapsed = false, tab = 'ticketTab'"
              >
                <p class="mb-0 d-flex">
                  <span
                    v-if="tickets.length === 1"
                    class="fw-bold ticket-name"
                  >
                    {{ tickets[0].event.replace(' x ', ' - ') }}
                  </span>
                  <!-- eslint-disable -->
                  <span
                    v-else-if="tickets.length > 1 && multipleBetAvailable && tickets.findIndex(item => item.live === true) !== -1"
                    class="fw-bold gray"
                    v-html="$t('i18n_ao_vivo_de')"
                  />
                  <!-- eslint-enable -->
                  <span
                    v-else-if="tickets.length > 1 && multipleBetAvailable"
                    class="fw-bold gray"
                  >
                    {{ $t('i18n_multipla_de') }}
                  </span>
                  <span
                    v-else
                    class="fw-bold"
                  >
                    {{ $t('i18n_seleções', 2) }}
                  </span>
                  <span
                    v-if="tickets.length > 1"
                    :class="[!multipleBetAvailable?'tickets-counter':'fw-bold ms-1 gray' , 'align-self-center']"
                  >
                    {{ tickets.length }}
                  </span>
                  <span v-if="multipleBetAvailable" class="ms-1 fw-bold">
                    {{ multipleBetOdd }}
                  </span>
                </p>
                <p class="mb-0 names gray">
                  <span v-if="tickets.length === 1">{{ tickets[0].market }}</span>
                  <span v-else class="bets-names">{{ ticketsNames }}</span>
                  <span v-if="tickets.length === 1 && tickets[0].live" class="live-badge">{{ $t('i18n_ao_vivo') }}</span>
                </p>
                <p v-if="tickets.length === 1" class="mb-0 odd-name">
                  {{ tickets[0].odd.odds }}
                  <span class="dot" />
                  {{ tickets[0].odd.header }}
                </p>
              </div>
            </div>
            <div class="collapse-icon" @click="collapsed = false, tab = 'ticketTab'">
              <font-awesome-icon :icon="['fas', 'chevron-up']" />
            </div>
          </div>
          <div
            v-if="
              +freeBetValue
                && (checked === null || (tickets.length === 1 && checked === 0) || (tickets.length > 1 && checked === -1))
                && tickets.length > 0
                && collapsed
                && multipleBetAvailable
            "
            class="ps-2"
          >
            <input
              :id="`freebet-collapsed`"
              type="checkbox"
              class="freebet-checkbox ms-4"
              :checked="tickets.length === 1 ? tickets[0].free_bet : multiple.free_bet"
              @change="
                tickets.length === 1 ?
                  updateOddFreeBet($event.target.checked, +freeBetValue, tickets.length === 1 ? tickets[0] : multiple) :
                  $emit(
                    'updateMultipleTicket',
                    {
                      free_bet: $event.target.checked,
                      value: $event.target.checked ? +freeBetValue : null
                    }
                  ),
                $event.target.checked && tickets.length === 1 ?
                  checked = 0 : tickets.length > 1 ?
                    checked = -1 :
                    checked = null
              "
            >
            <label :for="`freebet-collapsed`" class="freebet-label">Freebet: R$ {{ freeBetValue }}</label>
          </div>
          <div v-if="collapsed">
            <label
              for="acceptance-checkbox"
              class="d-flex justify-content-between align-items-center px-4 pb-2"
            >
              <span class="me-2">{{ $t('i18n_sempre_aceitar') }}</span>
              <input
                id="acceptance-checkbox"
                v-model="acceptAllChanges"
                type="checkbox"
              >
            </label>
            <p v-if="errors && errors.message" class="text-center text-danger m-0 mb-0">
              {{ errors.message }}
            </p>
          </div>
          <div
            v-if="tickets.length > 0 && collapsed && multipleBetAvailable"
            class="collapse-form"
          >
            <button
              v-if="errors && errors.message === 'Um ou mais eventos indisponíveis' && !acceptAllChanges"
              class="accept-changes-btn"
              @click="$emit('clearAll')"
            >
              {{ $t('i18n_limpar_boletim') }}
            </button>
            <button
              v-else-if="oddChange()"
              class="accept-changes-btn"
              @click="$emit('acceptAllChanges')"
            >
              {{ $t('i18n_aceito_as_mudancas') }}
            </button>
            <div v-else class="d-flex w-100">
              <md-bet-input
                v-if="tickets.length === 1"
                :value="tickets[0].value ? +tickets[0].value : null"
                :is-mobile="isMobile"
                :defocus="!betList[0].showKey"
                :limit-value="betMaxValue"
                :min-value="betMinValue"
                :disabled="tickets[0].free_bet"
                ref-input="single_0"
                class="w-50"
                @change="(value) => {updateOddValue(value, tickets[0])}"
                @focused="closeKeys(), betList[0].showKey = true"
              />
              <md-bet-input
                v-else
                :value="+multiple.value"
                :is-mobile="isMobile"
                :defocus="!multipleBet.showKey"
                :limit-value="betMaxValue"
                :min-value="betMinValue"
                :disabled="multiple.free_bet"
                ref-input="multi_bet"
                class="w-50"
                @focused="closeKeys(), multipleBet.showKey = true"
                @change="(value) => $emit('updateMultipleTicket', {value: value})"
              />
              <button
                v-if="!oddChange()"
                class="bet-button w-50"
                :class="{ disabled: tab === 'myBetsTab' || loading }"
                :disabled="loading"
                @click="$emit('submit')"
              >
                <p class="mb-0">
                  <font-awesome-icon v-if="loading" class="icon spinner-class" :icon="['fas', 'circle-notch']" />
                  {{ $t('i18n_fazer_aposta') }} <span v-if="betTotal">{{ getFormattedValue(betTotal) }}</span>
                </p>
                <p v-if="betTotalReturn" class="mb-0 potential-return ms-0">
                  {{ $t('i18n_retorno_total') }} {{ betTotalReturn > winMaxValue ? getFormattedValue(winMaxValue) : getFormattedValue(betTotalReturn) }}
                </p>
              </button>
            </div>
          </div>
          <md-mobile-keyboard
            v-if="tickets.length === 1 && collapsed && betList[0].showKey && !tickets[0].free_bet"
            :max-value="betMaxValue"
            class="d-md-none"
            @finish="betList[0].showKey = false"
            @keyPressed="updateOddValue($event, tickets[0])"
          />
          <md-mobile-keyboard
            v-if="multipleBetAvailable && collapsed && multipleBet.showKey && !multiple.free_bet"
            :max-value="betMaxValue"
            class="d-md-none"
            @finish="multipleBet.showKey = false"
            @keyPressed="(value) => $emit('updateMultipleTicket', {value: value})"
          />
        </div>

        <div
          v-show="!collapsed"
          class="open-infos"
          @click.stop
        >
          <div class="header-infos">
            <div class="header-btns">
              <button
                :class="{ active: tab === 'ticketTab' }"
                @click="tab = 'ticketTab'"
              >
                {{ $t('i18n_bilhetes', 1) }}
              </button>
              <button
                class="d-flex"
                :class="{ active: tab === 'myBetsTab' }"
                @click="tab = 'myBetsTab'"
              >
                {{ $t('i18n_minhas_apostas') }}
                <span class="tickets-counter">{{ bets.length }}</span>
              </button>
            </div>
            <div class="collapse-icon" @click="collapsed = true">
              <font-awesome-icon :icon="['fas', 'chevron-down']" />
            </div>
          </div>

          <div
            v-show="tab === 'ticketTab'"
            class="tickets-items fut-scrollbar mb-4"
            @click.stop
          >
            <div
              v-for="(ticket, idx) in tickets"
              :key="idx"
              class="mb-3"
            >
              <div class="d-flex justify-content-between">
                <div class="d-flex">
                  <div
                    class="x-icon"
                    @click="
                      $emit('toggleTicket', tickets[idx]),
                      $emit('clearMultipleTicket'),
                      checked = null
                    "
                  >
                    <font-awesome-icon class="icon" :icon="['fas', 'times']" />
                  </div>
                  <p class="mb-0 fw-bold">
                    {{ ticket.event.replace(' x ', ' - ') }}
                  </p>
                </div>
                <p v-if="ticket.live" class="mb-0 me-3 mt-1 live-badge">
                  {{ $t('i18n_ao_vivo') }}
                </p>
              </div>
              <p class="mb-0 names gray mrg-start">
                {{ ticket.market }}
              </p>
              <div class="d-flex mrg-start">
                <div class="w-100" style="max-width: 164px;">
                  <p class="odd-name mb-0 d-flex justify-content-between">
                    <span style="max-width: 125px;">{{ ticket.odd.header }}</span>
                    <span class="gray">{{ ticket.odd.odds }}</span>
                  </p>
                </div>
                <div v-if="(ticket.live && !oddChange()) || !ticket.live" class="input-wrapper">
                  <md-bet-input
                    :value="ticket.value ? +ticket.value : null"
                    :is-mobile="isMobile"
                    :defocus="!betList[idx].showKey"
                    :limit-value="betMaxValue"
                    :min-value="betMinValue"
                    :ref-input="'single_'+idx"
                    :disabled="ticket.free_bet"
                    @focused="closeKeys(), betList[idx].showKey = true"
                    @change="(value) => {updateOddValue(value, ticket)}"
                  />
                </div>
                <div v-else class="w-100">
                  <p class="text-danger mb-2 me-3 fw-bold text-end">
                    {{ $t('i18n_odd_alterada') }}
                  </p>
                  <p v-if="outOfDate(ticket)" class="text-danger mb-1 fw-bold text-end">
                    <small>{{ $t('i18n_jogo_ja_iniciado') }}</small>
                  </p>
                </div>
              </div>
              <div
                v-if="
                  +freeBetValue
                    && (
                      (!multipleBetAvailable && (checked === null || checked === idx))
                      || (multipleBetAvailable && (checked === null || checked === idx) && tickets.length === 1)
                    )"
              >
                <input
                  :id="`freebet-${idx}`"
                  type="checkbox"
                  class="freebet-checkbox"
                  :checked="ticket.free_bet"
                  @change="
                    updateOddFreeBet($event.target.checked, +freeBetValue, ticket),
                    $event.target.checked ? checked = idx : checked = null
                  "
                >
                <label :for="`freebet-${idx}`" class="freebet-label">Freebet: R$ {{ freeBetValue }}</label>
              </div>
              <p v-if="ticket.value" class="mb-0 potential-return gray">
                {{ $t('i18n_retorno_potencial') }} <span class="fw-bold"> {{ getFormattedValue((ticket.value * ticket.odd.odds) > winMaxValue ? winMaxValue : ticket.value * ticket.odd.odds) }}</span>
              </p>
              <md-mobile-keyboard
                v-if="betList[idx].showKey && !ticket.free_bet"
                :key="idx"
                :max-value="betMaxValue"
                row
                class="d-md-none"
                @finish="betList[idx].showKey = false"
                @keyPressed="updateOddValue($event, ticket)"
              />
            </div>
            <div
              v-if="tickets.length > 1 && multipleBetAvailable"
              class="mb-3 pt-2"
            >
              <div class="d-flex">
                <div class="d-flex w-100" style="max-width: 200px;">
                  <div
                    class="x-icon"
                    @click="
                      toggleTickets(),
                      $emit('clearMultipleTicket'),
                      checked = null"
                  >
                    <font-awesome-icon class="icon" :icon="['fas', 'times']" />
                  </div>
                  <p class="fw-bold mb-0 w-100 d-flex justify-content-between">
                    <span>{{ $t('i18n_multipla_de') }} {{ tickets.length }}</span>
                    <span>{{ multipleBetOdd }}</span>
                  </p>
                </div>
                <div class="input-wrapper mt-0">
                  <md-bet-input
                    :is-mobile="isMobile"
                    :value="+multiple.value"
                    :defocus="!multipleBet.showKey"
                    :limit-value="betMaxValue"
                    :min-value="betMinValue"
                    :disabled="multiple.free_bet"
                    ref-input="multi_bet"
                    @focused="closeKeys(), multipleBet.showKey = true"
                    @change="(value) => $emit('updateMultipleTicket', {value: value})"
                  />
                </div>
              </div>
              <div v-if="+freeBetValue && (checked === null || checked === -1)">
                <input
                  id="freebet-mult"
                  type="checkbox"
                  class="freebet-checkbox"
                  :checked="multiple.free_bet"
                  @change="
                    $emit(
                      'updateMultipleTicket',
                      {free_bet: $event.target.checked, value: $event.target.checked ? +freeBetValue : null}
                    ),
                    $event.target.checked ? checked = -1 : checked = null
                  "
                >
                <label for="freebet-mult" class="freebet-label">Freebet: R$ {{ freeBetValue }}</label>
              </div>
              <p v-if="multiple.value" class="mb-0 potential-return gray">
                {{ $t('i18n_retorno_potencial') }} <span class="fw-bold"> {{ getFormattedValue((multiple.value * multipleBetOdd) > winMaxValue ? winMaxValue : multiple.value * multipleBetOdd) }}</span>
              </p>
              <md-mobile-keyboard
                v-if="multipleBet.showKey && !multiple.free_bet"
                :key="idx"
                :max-value="betMaxValue"
                row
                class="d-md-none"
                @finish="multipleBet.showKey = false"
                @keyPressed="(value) => $emit('updateMultipleTicket', {value: value})"
              />
            </div>
          </div>

          <div v-if="!collapsed">
            <label
              for="acceptance-checkbox"
              class="d-flex justify-content-between align-items-center px-4 pb-2"
            >
              <span class="me-2">{{ $t('i18n_sempre_aceitar') }}</span>
              <input
                id="acceptance-checkbox"
                v-model="acceptAllChanges"
                type="checkbox"
              >
            </label>
            <p v-if="errors && errors.message" class="text-center text-danger m-0 mb-0">
              {{ errors.message }}
            </p>
          </div>

          <div
            v-if="tab === 'myBetsTab'"
            class="my-bets "
          >
            <div
              v-for="(bet, idx) in bets"
              :key="idx"
              class="bet-info"
            >
              <div class="id-staus">
                <p class="mb-0">
                  <span class="bet-id">Id: {{ bet.id }}</span>
                  <span class="gray">{{ bet.created_at.substring(0, 5) }}</span>
                </p>
                <p class="mb-0">
                  <span class="dot" />
                  <span>{{ $i18n.locale === 'EN' ? bet.result : bet.result_br }}</span>
                </p>
              </div>
              <div class="names-odds">
                <div class="w-50">
                  <NuxtLink
                    :to="localePath(`/user?tab=History&betId=${bet.id}`)"
                    class="bet-link"
                  >
                    <span v-if="bet.games.length === 1">{{ bet.games[0].odd_br.split(' - ')[1] }}</span>
                    <span v-else>{{ $t('i18n_multipla_de') }} {{ bet.games.length }}</span>
                  </NuxtLink>
                  <font-awesome-icon
                    :icon="['fas', 'external-link-alt']"
                    class="x-icon ps-0"
                    @click="redirect(bet.id)"
                  />
                  <p v-if="bet.games.length === 1" class="gray mb-0 names">
                    {{ bet.games[0].odd_br.split(' - ')[0] }}
                  </p>
                  <p class="names">
                    <span v-if="bet.games.length === 1">{{ bet.games[0].odd_br }}</span>
                    <span v-else class="mult-bet">{{ bet.games.map(item => item.odd_br).join(', ') }}</span>
                  </p>
                </div>
                <div class="w-50">
                  <p class="fw-bold gray mb-0 text-end">
                    {{ bet.games.reduce((sum, game) => sum * +game.odd, 1).toFixed(2) }}
                  </p>
                  <p class="names mb-0 text-end">
                    {{ $t('i18n_valor_apostado') }}: {{ bet.value }}
                  </p>
                  <p class="names text-end">
                    {{ $t('i18n_retorno_potencial') }}: {{ bet.return }}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <button
            v-if="errors && errors.message === 'Um ou mais eventos indisponíveis' && !acceptAllChanges"
            class="accept-changes-btn"
            @click="$emit('clearAll')"
          >
            {{ $t('i18n_limpar_boletim') }}
          </button>
          <button
            v-else-if="oddChange()"
            class="accept-changes-btn"
            @click="$emit('acceptAllChanges')"
          >
            {{ $t('i18n_aceito_as_mudancas') }}
          </button>
          <button
            v-else
            class="bet-button w-100"
            :class="{ disabled: tab === 'myBetsTab' || loading }"
            :disabled="loading || tab === 'myBetsTab'"
            @click="$emit('submit')"
          >
            <p class="mb-0">
              <font-awesome-icon v-if="loading" class="icon spinner-class" :icon="['fas', 'circle-notch']" />
              {{ $t('i18n_fazer_aposta') }} <span v-if="betTotal">{{ getFormattedValue(betTotal) }}</span>
            </p>
            <p v-if="betTotalReturn" class="mb-0 potential-return ms-0">
              {{ $t('i18n_retorno_total') }} {{ betTotalReturn > winMaxValue ? getFormattedValue(winMaxValue) : getFormattedValue(betTotalReturn) }}
            </p>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MdBetInput from '@/components/md/atoms/MdBetInput.vue'
import windowWidth from '@/mixins.js/windowWidth.js'

export default {
  name: 'MdTickets',
  components: {
    MdBetInput
  },
  mixins: [windowWidth],
  props: {
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
    loading: {
      type: Boolean,
      default: false
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
    }
  },
  data () {
    return {
      collapsed: true,
      tab: 'ticketTab',
      betList: [],
      multipleBet: {
        showKey: false,
        id: 'multiple'
      },
      checked: null,
      acceptAllChanges: false
    }
  },
  computed: {
    ticketsNames () {
      return this.tickets.map(item => item.odd.header).join(', ')
    },
    isMobile () {
      return this.width < 768
    },
    multipleBetAvailable () {
      const gameIds = {}

      this.tickets.forEach((ticket) => { gameIds[ticket.gameId] = true })

      return Object.keys(gameIds).length === this.tickets.length
    },
    multipleBetOdd () {
      return this.tickets.reduce((partialSum, a) => partialSum * +a.odd.odds, 1).toFixed(2)
    },
    betTotal () {
      let total = this.tickets.reduce((sum, ticket) => sum + +ticket.value, 0)
      total += +this.multiple.value

      return total
    },
    betTotalReturn () {
      const simpleTotalReturn = this.tickets.reduce((partialSum, a) => partialSum + (+a.odd.odds * +a.value), 0)
      return simpleTotalReturn + (this.multiple.value * this.multipleBetOdd)
    },
    bets () {
      if (this.userBets !== null) {
        return this.userBets.pending
      }

      return []
    },
    autoClean () {
      if (this.acceptAllChanges && this.errors && this.errors.message === 'Um ou mais eventos indisponíveis') {
        this.$emit('clearAll')
        return true
      }

      return false
    }
  },
  watch: {
    tickets (value, oldValue) {
      if (value.length === 0) {
        this.collapsed = true
        this.checked = null
        this.$store.commit('tickets-pre-cash-in/SET_ERRORS', null)
      }

      if (value.length === 1 && !this.tickets[0].free_bet) {
        this.checked = null
      }

      if (oldValue.length > value.length) {
        this.betList = this.betList.filter(item => value.map(ticket => ticket.odd.type).includes(item.id))
        return
      }

      if (this.betList.length < value.length) {
        this.$emit('clearMultipleTicket')
        this.checked = null
        this.betList.push({ showKey: false, id: value[value.length - 1].odd.type })
      }
    },
    collapsed (value) {
      if (this.betList.length > 0) {
        this.betList[0].showKey = false
      }

      this.closeKeys()
    },
    multipleBetAvailable (value) {
      if (value) {
        this.updateOddFreeBet(false, 0, this.tickets.find(item => item.free_bet))
      }
    }
  },
  created () {
    this.betList = this.tickets.map(item => ({ showKey: false, id: item.odd.type }))
  },
  methods: {
    oddChange () {
      return this.tickets.findIndex(item => item.odds_change === true) !== -1
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
    toggleTickets () {
      if (this.tickets.length === 1) {
        this.$emit('toggleTicket', this.tickets[0])
        return
      }

      this.tickets.forEach(ticket => this.$emit('toggleTicket', ticket))
    },
    closeKeys () {
      this.betList.forEach((item) => { item.showKey = false })
      this.multipleBet.showKey = false
    },
    getFormattedValue (value) {
      const formattedResult = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      })
      return formattedResult.format(value)
    },
    updateOddValue (value, ticket) {
      const newTicket = { ...ticket }
      newTicket.value = value
      this.$emit('updateTicket', newTicket)
    },
    updateOddFreeBet (freeBet, value, ticket) {
      const newTicket = { ...ticket }
      /* eslint-disable-next-line */
      newTicket.free_bet = freeBet
      /* eslint-disable-next-line */
      newTicket.value = freeBet ? value : null
      this.$emit('updateTicket', newTicket)
    },
    redirect (id) {
      this.$router.push(this.localePath(`/user?tab=History&betId=${id}`))
    }
  }
}
</script>

<style lang="scss" scoped>
.ticket-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 2200;
  background: #33333370;
}
#ticket {
  position: fixed;
  bottom: 30px;
  left: 0;
  right: 0;
  margin: 0 auto;
  z-index: 1100;
  width: 100%;
  max-width: 400px;
  background-image: linear-gradient(var(--md-highlight-darker) 70%, var(--md-comp-bg-color));
  border-radius: 6px;
  -webkit-box-shadow: 0 1px 10px 0 var(--md-ticket-shadow-color);
  box-shadow: 0 1px 10px 0 var(--md-ticket-shadow-color);
  color: var(--md-font-color);
  #ticket-title {
    color: #fff;
    font-size: 12px;
    font-weight: 700;
    margin: 6px 25px;
    cursor: pointer;
    .collapsed-title {
      display: flex;
      justify-content: space-between;
    }
  }

  #ticket-body {
    width: 100%;
    background: var(--md-comp-bg-color);
    border-radius: 6px;
    min-height: 60px;
    .collapsed-infos {
      padding: 6px 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      cursor: pointer;
      .bet-title {
        display: flex;
        width: 100%;

        .ticket-name {
          width: 80%;
          text-overflow: ellipsis;
        }
      }
      .tickets-counter {
        width: 15px;
        height: 15px;
        background: var(--md-highlight-darker);
        font-size: 10px;
        color: #fff;
        margin: 2px 0 0 6px;
      }
    }
    .collapse-form {
      display: flex;
    }
    .open-infos {
      .header-infos {
        display: flex;
        justify-content: space-between;
        margin-bottom: 10px;
        .header-btns {
          display: flex;
          width: 100%;
          button {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
            border: none;
            padding: 6px;
            color: var(--md-font-color);
            background: transparent;
            border-radius: 6px;
            margin: 4px;
            .tickets-counter {
              background: var(--md-highlight-darker);
              color: #fff;
              height: 17px;
              width: 17px;
              font-size: 12px;
              margin-left: 13px;
            }
            &:hover {
              background: #1267C230;
            }
            &:active {
              background: #157ae5;
              color: #fff;
            }
          }
          .active {
            background: var(--md-highlight-darker);
            color: #fff;
            &:hover {
              background: #0e539d;
              .tickets-counter {
                background: transparent;
              }
            }
            &:active {
              background: #157ae5;
              .tickets-counter {
                background: transparent;
              }
            }
          }
        }
        .collapse-icon {
          padding: 8px;
          cursor: pointer;
        }
      }
    }
  }
}
.tickets-counter {
  background: #fff;
  color: #707070;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20px;
  height: 20px;
  border-radius: 50%;
}
.open {
  #ticket-body {
    height: 100%;
    .open-infos {
      .tickets-items {
        max-height: calc(100vh - 250px);
        overflow: auto;
      }
      .my-bets {
        max-height: calc(100vh - 250px);
        overflow: auto;

        @media (min-width: 769px) {
          &::-webkit-scrollbar-track {
            opacity: .3;
            border-radius: 0.125rem;
            background-color: lightgray;
          }
          &::-webkit-scrollbar {
            opacity: .3;
            width: 4px;
            transition: all ease-in-out 400ms;
          }
          &::-webkit-scrollbar-thumb {
            opacity: .3;
            background-color: gray;
          }
        }

        .bet-info {
          .id-staus {
            display: flex;
            justify-content: space-between;
            padding: 12px;
            .bet-id {
              color: #fff;
              background: var(--md-highlight-darker);
              padding: 2px 8px;
              border-radius: 4px;
            }
            .dot {
              margin-bottom: 1px;
              width: 8px;
              height: 8px;
              border-radius: 4px;
              background: var(--md-menu-idx-font-color);
            }
          }
          .names-odds {
            display: flex;
            justify-content: space-between;
            padding: 0 12px;
            .bet-link {
              color: var(--md-font-color);
              font-weight: 700;
            }
            .mult-bet {
              white-space: inherit;
              display: -webkit-box;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 2;
              overflow: hidden;
            }
          }
        }
      }
    }
  }
}
.bet-button {
  color: #fff;
  padding: 8px 0;
  font-size: 14px;
  font-weight: 700;
  border: none;
  border-radius: 6px;
  background: #126E51;
  &:hover {
    background: #0c4936;
  }
  &:active {
    background: #18926b;
  }
}
.dot {
  display: inline-block;
  width: 4px;
  height: 4px;
  border-radius: 2px;
  margin: 3px 4px;
  background: var(--md-font-color);
}
.names {
  font-size: 11px;
}
.gray {
  color: var(--md-menu-idx-font-color);
}
.odd-name {
  font-weight: 700;
  font-size: 13px;
  color: var(--md-font-color);
}
.x-icon {
  padding: 5px 10px 0 10px;
  cursor: pointer;
  .icon {
    display: block;
    height: 14px;
    width: 14px;
  }
}
.collapse-icon {
  padding: 0 25px 0 15px;
  color: var(--md-highlight-darker);
}
.mrg-start {
  margin-left: 35px;
}
.input-wrapper {
  width: 100%;
  border: 1px solid #d9d9d9;
  border-radius: 2px;
  margin: -3px 8px 3px 6px;
}
span {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.bets-names {
  white-space: inherit;
}
.freebet-checkbox {
  margin-left: 50%;
}
.freebet-label {
  font-size: 12px;
}
.potential-return {
  margin-left: 50%;
  font-size: 11px;
}
.disabled {
  color: #fff;
  background: #555;
  cursor: initial;
  &:hover {
    background: #555;
  }
  &:active {
    background: #555;
  }
}
.live-badge {
  color: var(--md-highlight-darker);
  font-size: 12px;
  font-weight: 700;
  white-space: nowrap;
}
.accept-changes-btn {
  width: 100%;
  color: #fff;
  padding: 8px 0;
  font-size: 14px;
  font-weight: 700;
  border: none;
  border-radius: 6px;
  background: #126E51;
  &:hover {
    background: #0c4936;
  }
  &:active {
    background: #18926b;
  }
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

@media (max-width: 425px) {
  #ticket {
    bottom: 85px;
  }
}
</style>

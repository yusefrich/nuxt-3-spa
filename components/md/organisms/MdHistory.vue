<template>
  <md-card
    padding="0px"
    overflow
  >
    <md-chip class="chip">
      <font-awesome-icon :icon="['fas', 'book-open']" />
      {{ $t('i18n_minhas_apostas') }}
    </md-chip>

    <ul class="timeline">
      <li
        v-for="(bet, idx) in bets"
        :id="bet.id"
        :key="idx"
        class="event"
        :data-date="`${bet.created_at}\nid: ${bet.id}`"
      >
        <md-chip
          :color="colors[bet.result]"
          font-size="15px"
          class="mb-4 bet-status"
        >
          <font-awesome-icon class="dot-icon" :icon="['fas', 'circle']" />
          {{ bet.result_br }}
        </md-chip>

        <div
          v-for="(game, index) in bet.games"
          :key="index"
          class="d-flex justify-content-between"
        >
          <h6 class="fut-color-dynamic mb-0 fw-bold">
            {{ getTypeName(game.odd_br, game) }}
          </h6>
          <h6 class="fut-color-dynamic mb-0 fw-bold">
            {{ game.odd }}
          </h6>
        </div>

        <div class="d-flex justify-content-between mt-3">
          <div>
            <p class="fut-color-dynamic mb-1">
              ({{ bet.games.length > 1 ? $t('i18n_aposta_multipla') : $t('i18n_aposta_simples') }}): R$ {{ bet.value }}
            </p>
            <p v-if="bet.result_br === 'Aguardando'" class="fut-color-dynamic">
              {{ $t('i18n_retorno_potencial') }}: R$ {{ bet.return }}
            </p>
            <p v-else-if="bet.result_br === 'Ganha'" class="fut-color-dynamic">
              {{ $tc('i18n_retorno', 1) }}: R$ {{ bet.return }}
            </p>
            <p v-else class="fut-color-dynamic">
              {{ $tc('i18n_retorno', 1) }}: R$ 0,00
            </p>
          </div>
          <div v-if="bet.cashout">
            <md-button
              :loading="loading"
              padding="5px"
              @click="$emit('submitCashout', bet.id)"
            >
              {{ $t('i18n_encerrar_aposta') }} {{ bet.cashout.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }) }}
            </md-button>
          </div>
        </div>

        <md-button
          width="100%"
          padding="5px"
          @click="currentBet = bet, modalDetails = true"
        >
          {{ $t('i18n_detalhes_da_aposta') }}
        </md-button>
      </li>

      <button
        class="view-more transition"
        @click="$emit('addUserBets', { page: page++ })"
      >
        + {{ $t('i18n_ver_mais') }}
      </button>
    </ul>

    <md-modal-bet-details
      v-model="modalDetails"
      :bet="currentBet"
    />
  </md-card>
</template>

<script>
import dayjs from 'dayjs'
import MdCard from '@/components/md/atoms/MdCard.vue'
import MdChip from '@/components/md/atoms/MdChip.vue'
import MdButton from '@/components/md/atoms/MdButton.vue'
import MdModalBetDetails from '@/components/md/molecules/MdModalBetDetails.vue'

export default {
  name: 'MdHistory',
  components: {
    MdCard,
    MdChip,
    MdButton,
    MdModalBetDetails
  },
  data () {
    return {
      colors: {
        lost: '#ff4500',
        won: '#017401',
        waiting: '#cccccc60'
      },
      modalDetails: false,
      currentBet: {
        games: []
      },
      page: 1
    }
  },
  computed: {
    bets () {
      if (this.$attrs['user-bets'] !== null) {
        return this.$attrs['user-bets'].all
      }

      return []
    }
  },
  mounted () {
    this.$emit('fetchUserBets')

    if (this.$route.query.betId) {
      document.querySelector('.overflow').scrollTo({
        top: document.getElementById(`${this.$route.query.betId}`).offsetTop - 46,
        left: 0,
        behavior: 'smooth'
      })
    }
  },
  methods: {
    getTypeName (type, cBet) {
      let formatted = ''
      switch (type) {
        case 'full_time_result_home':
          formatted = cBet.event && cBet.event.home_team ? cBet.event.home_team : type
          break
        case 'full_time_result_draw':
          formatted = this.$t('i18n_empate')
          break
        case 'full_time_result_away':
          formatted = cBet.event && cBet.event.away_team ? cBet.event.away_team : type
          break
        case 'both_teams_to_score_yes':
          formatted = this.$t('i18n_ambos_marcam')
          break
        case 'both_teams_to_score_no':
          formatted = this.$t('i18n_ambos_nao_marcam')
          break
        case 'odds_total':
          formatted = 'Total'
          break
        default:
          formatted = type
          break
      }
      return formatted
    },
    getStatusName (status) {
      let formatted = ''
      switch (status) {
        case 0:
          formatted = this.$t('i18n_aguardando')
          break
        case 1:
          formatted = this.$t('i18n_venceu')
          break
        case 2:
          formatted = this.$t('i18n_perdida')
          break
        case 4:
          formatted = this.$t('i18n_reembolso')
          break
        default:
          formatted = null
          break
      }
      return formatted
    },
    formattedData (date) {
      return dayjs(date).format('DD/MM/YYYY HH:mm')
    }
  }
}
</script>

<style lang="scss" scoped>
.chip {
  position: absolute;
  top: 24px;
  left: 24px;
  z-index: 100;
}
.timeline {
  border-left: 3px solid var(--fut-primary);
  border-bottom-right-radius: 0.25rem;
  border-top-right-radius: 0.25rem;
  background: var(--fut-primary-transparent);
  color: var(--md-font-color);
  margin: 0 22% 0 28%;
  position: relative;
  padding: 50px 50px 110px 50px;
  list-style: none;
  @media(max-width: 767px) {
    max-width: 98%;
    padding: 25px 25px 100px 25px;
  }
  @media(max-width: 1024px) {
    margin: 0 0 0 35%;
  }
  @media(max-width: 620px) {
    margin: 0 0 0 10px;
  }

  .event {
    border-bottom: 1px dashed #e9ecef;
    padding-bottom: (50px * 0.5);
    margin-bottom: 25px;
    position: relative;

    .dot-icon {
      width: 7px;
      height: 7px;
      margin-bottom: 4px;
    }

    &:first-child {
      margin-top: 40px;
    }

    @media(max-width: 767px) {
      padding-top: 10px;
      .bet-status {
        margin-bottom: 60px !important;
      }
    }

    &:last-of-type {
      padding-bottom: 0;
      margin-bottom: 0;
      border: none;
    }

    &:before, &:after {
      position: absolute;
      display: block;
      top: 0;
    }

    &:before {
      left: (144px * 1.5) * -1;
      content: attr(data-date);
      white-space: pre-wrap;
      text-align: right;
      font-weight: 500;
      font-size: 0.9em;
      min-width: 120px;
      @media(max-width: 620px) {
        top: 45px;
        left: 0px;
        text-align: left;
      }
    }

    &:after {
      -webkit-box-shadow: 0 0 0 3px var(--fut-primary);
      box-shadow: 0 0 0 3px var(--fut-primary);
      left: (50px + 3px + (8px * 0.35)) * -1;
      background: #fff;
      border-radius: 50%;
      height: 9px;
      width: 9px;
      content: "";
      top: 5px;
      @media(max-width: 620px) {
        top: 50px;
        left: (25px + 4px + (8px * 0.35)) * -1;
      }
    }
  }
}

.view-more {
  position: absolute;
  bottom: 30px;
  left: 32%;
  border: none;
  background: var(--md-filter-bg-color);
  min-width: 140px;
  height: 35px;
  margin: 10px 0 0 0;
  padding: 0 20px;
  border-radius: 4px;
  color: var(--md-highlight);
  font-weight: 700;
  font-size: 13px;
  &:hover {
    background: var(--md-highlight-lighter);
    color: #fff;
  }
  &:active {
    background: var(--md-highlight);
  }
}
</style>

<template>
  <div>
    <div class="bet-wrapper d-flex justify-content-between px-2" :class="{'py-1':smaller, 'py-3':!smaller}">
      <p class="text-white fut-color-dynamic mb-0" :class="{smaller}">
        R$ {{ bet.value }} {{ bet.games.length > 1 ? $tc('i18n_multipla', 2) : $t('i18n_simples') }}
      </p>
      <p v-if="bet.result_br !== 'Ganha'" class="text-white fut-color-dynamic mb-0" :class="{smaller}">
        {{ bet.result_br }}
      </p>
      <p v-else-if="bet.result_br === 'Ganha'" class="text-white fut-color-dynamic mb-0" :class="{smaller}">
        {{ $tc('i18n_retorno', 1) }}: R$ {{ bet.return }}
      </p>
      <p v-else class="text-white fut-color-dynamic mb-0" :class="{smaller}">
        {{ $t('i18n_perdida') }}
      </p>
    </div>
    <div v-for="(game, index) in bet.games" :key="'pivot_'+game.id+index" class="d-flex justify-content-flex p-2 pb-0">
      <div class="d-flex w-100">
        <font-awesome-icon
          :class="[game.status===1?'green':'', game.status===2?'red':'', game.status===4?'yellow':'']"
          :icon="[game.status===0?'far':'fas', 'circle']"
          style="font-size: 10px"
          class="icon text-white fut-color-dynamic me-1 mt-1"
        />
        <div v-if="game.event">
          <p class="mb-0 text-bet-white fut-color-dynamic" :class="{smaller}">
            {{ getTypeName(game.odd_br, game) }}
          </p>
          <p class="mb-0 fut-color-dynamic" :class="{smaller}">
            {{ $t('i18n_resultado_final') }}
          </p>
          <p class="mb-0 fut-color-dynamic" :class="{smaller}">
            {{ game.event.home_team }} v {{ game.event.away_team }}
          </p>
        </div>
      </div>
      <p class="mb-0 text-bet-white fut-color-dynamic" :class="{smaller}">
        {{ game.odd }}
      </p>
    </div>
    <hr class="bg-nsx-gray my-1">
    <div class="d-block d-md-flex justify-content-between px-4 mb-1">
      <div class="d-flex justify-content-between w-100">
        <p class="text-bet-white fut-color-dynamic w-100 mb-0 mt-1" :class="{smaller}">
          {{ $t('i18n_valor_da_aposta') }}: <span class="nowrap">R$ {{ bet.value }}</span>
        </p>
        <p class="text-bet-white fut-color-dynamic w-100 mb-0 mt-1" :class="{smaller}">
          {{ $tc('i18n_retorno', 2) }}: <span class="nowrap">R$ {{ bet.result_br === 'Perdida' ? 0.00 : bet.return }}</span>
        </p>
      </div>
      <div v-if="!smaller" class="w-100 w-md-50">
        <nsx-fut-button
          v-if="bet.cashout"
          :loading="loading"
          :class="{active: focus}"
          class="nsx-cashout w-100"
          @click="submitCashout(bet.id)"
        >
          {{ focus ? $t('i18n_confirmar') : $t('i18n_encerrar_aposta') }} <span>{{ bet.cashout.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }) }}</span>
        </nsx-fut-button>
      </div>
    </div>
    <div v-if="smaller" class="mx-4 mb-1">
      <nsx-fut-button
        v-if="bet.cashout"
        :loading="loading"
        :class="{active: focus}"
        type="button"
        class="nsx-cashout w-100"
        @click="submitCashout(bet.id)"
      >
        {{ focus ? $t('i18n_confirmar') : $t('i18n_encerrar_aposta') }} <span>{{ bet.cashout.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }) }}</span>
      </nsx-fut-button>
    </div>
  </div>
</template>

<script>
import NsxFutButton from '@/components/nsx/atoms/NsxFutButton.vue'

export default {
  name: 'NsxBetItem',
  components: {
    NsxFutButton
  },
  props: {
    bet: {
      type: Object,
      default: () => ({})
    },
    smaller: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      focus: false
    }
  },
  methods: {
    submitCashout (id) {
      if (!this.focus) {
        this.focus = true
        return
      }

      this.$emit('submitCashout', id)
    },
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
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "@/assets/layout/variables";
  @import "@/assets/layout/breakpoints";
  .bg-nsx-gray{
    background-color: #8d8d8d;
  }
  .bet-wrapper{
    background: linear-gradient(var(--fut-primary),var(--fut-background-2)) !important;
    font-size: 13.3px;
  }
  p{
    font-size: 13.3px;
  }
  p.smaller{
    font-size: 12px;
  }
  .text-bet-white{
    color: #dbdbdb;
  }
  .red{
    color: orangered !important;
  }
  .green{
    color: #00c851 !important;
  }
  .yellow{
    color: rgb(170, 167, 14) !important;
  }
  .blue{
    color: rgb(66, 49, 223) !important;
  }
  .nowrap{
    white-space: nowrap;
  }
  .nsx-cashout{
    background-color: #bbbbbb;
    padding: 0.3rem;
    color: var(--nsx-dark-2);
    text-align: center;
    border: none!important;
    box-shadow: none!important;
    outline: 0!important;
    white-space: nowrap;
    min-height: 25px;
    border-radius: 5px !important;
    font-size: 13.3px;
    span{
      color: var(--fut-primary);
    }
  }
  .nsx-cashout.active{
    background-color: #ffba39;
  }
  .w-md-50{
    @include md {
      width: 50% !important;
    }
  }
</style>

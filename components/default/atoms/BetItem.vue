<template>
  <div class="bet-card mb-2">
    <div class="d-flex justify-content-between">
      <p class="text-white fut-color-dynamic mb-0">
        <small class="me-2 badge bg-secondary">id: {{ bet.id }}</small>
        <small>{{ bet.created_at }}</small>
      </p>
      <div :class="['bg-dark', 'rounded-pill', 'px-3', bet.result_class]">
        <font-awesome-icon style="font-size: 7px; margin-bottom: 2px" class="icon text-white fut-color-dynamic me-1" :icon="['fas', 'circle']" /> <small class="text-white fut-color-dynamic fw-bold">{{ bet.result_br }}</small>
      </div>
    </div>
    <hr>
    <div v-for="(game, index) in bet.games" :key="'pivot_'+game.id+index" class="d-flex justify-content-between">
      <h4 class="text-white fut-color-dynamic mb-0 fw-bold">
        {{ getTypeName(game.odd_br, game) }}
      </h4>
      <h4 class="text-white fut-color-dynamic mb-0 fw-bold">
        {{ game.odd }}
      </h4>
    </div>
    <div class="d-flex justify-content-between mt-3">
      <div>
        <p class="text-white fut-color-dynamic fw-bold mb-1">
          ({{ bet.games.length > 1 ? $t('i18n_aposta_multipla') : $t('i18n_aposta_simples') }}): R$ {{ bet.value }}
        </p>
        <p v-if="bet.result_br === 'Aguardando'" class="text-white fut-color-dynamic fw-bold">
          {{ $t('i18n_retorno_potencial') }}: R$ {{ bet.return }}
        </p>
        <p v-else-if="bet.result_br === 'Ganha'" class="text-white fut-color-dynamic fw-bold">
          {{ $tc('i18n_retorno', 1) }}: R$ {{ bet.return }}
        </p>
        <p v-else class="text-white fut-color-dynamic fw-bold">
          {{ $tc('i18n_retorno', 1) }}: R$ 0,00
        </p>
      </div>
      <div v-if="bet.cashout">
        <fut-button
          :loading="loading"
          class="ms-2 text-white fut-color-dynamic"
          primary
          @click="$emit('submitCashout', bet.id)"
        >
          {{ $t('i18n_encerrar_aposta') }} {{ bet.cashout.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }) }}
        </fut-button>
      </div>
    </div>
    <div :id="'acc_bet_item_'+bet.id" class="accordion accordion-flush">
      <div class="accordion-item">
        <h2 :id="'acc_bet_header_item_'+bet.id" class="accordion-header">
          <fut-button
            class="accordion-button collapsed"
            data-bs-toggle="collapse"
            :data-bs-target="'#acc_bet_item_detail_'+bet.id"
          >
            {{ $t('i18n_detalhes_da_aposta') }}.
          </fut-button>
        </h2>
        <div :id="'acc_bet_item_detail_'+bet.id" class="accordion-collapse collapse" :data-bs-parent="'#acc_bet_item_'+bet.id">
          <div class="accordion-body px-1 py-2">
            <div v-for="(game, index) in bet.games" :key="game.id+index" class="text-white fut-color-dynamic games-list">
              <div class="d-flex justify-content-between">
                <div>
                  <div v-if="game.event" class="d-flex justify-content-start">
                    <p class="mb-0">
                      {{ game.event.home_team }}
                    </p>
                    <p class="mx-3 mb-0">
                      X
                    </p>
                    <p class="mb-0">
                      {{ game.event.away_team }}
                    </p>
                  </div>
                  <div class="d-flex justify-content-start">
                    <p class="mb-0 fw-bold">
                      {{ $tc('i18n_aposta', 1) }}: {{ getTypeName(game.odd_br, game) }}
                    </p>
                    <p class="mb-0 ms-2">
                      <small>({{ game.odd }})</small>
                    </p>
                  </div>
                </div>
                <div>
                  <p v-if="game.event" class="mb-0">
                    {{ formattedData(game.event.start_date) }}
                  </p>
                  <p
                    class="badge mb-0 float-end mt-1"
                    :class="[
                      game.status===0?'bg-dark':'',
                      game.status===1?'bg-success':'',
                      game.status===2?'bg-danger':'',
                      game.status===4?'bg-secondary':''
                    ]"
                  >
                    {{ getStatusName(game.status) }}
                  </p>
                </div>
              </div>
              <hr>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import dayjs from 'dayjs'
import FutButton from '@/components/default/atoms/FutButton'

export default {
  components: { FutButton },
  props: {
    bet: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      loading: false
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
@import "@/assets/layout/variables";
.bg-dark{
  background-color: var(--fut-background-lightest) !important;
}
.bet-card{
  padding: 10px;
  background-color: var(--fut-background-lightest) !important;
}
.img-club{
  width: 20px;
  height: 20px;
  object-fit: contain;
}
.games-list{
  border: 1px solid var(--fut-background-lightest);
  padding: 10px;
  padding-bottom: 0px;
  border-radius: 5px;
}
.rounded-pill.red{
  background-color: orangered !important;
}
.rounded-pill.green{
  background-color: rgb(1, 116, 1) !important;
}
.rounded-pill.yellow{
  background-color: rgb(170, 167, 14) !important;
}
.rounded-pill.blue{
  background-color: rgb(66, 49, 223) !important;
}
</style>

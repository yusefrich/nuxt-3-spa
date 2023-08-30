<template>
  <div class="table-responsive">
    <table class="w-100">
      <thead>
        <tr>
          <th scope="col" class="text-start">
            {{ $t('i18n_resumo_da_aposta') }}
          </th>
          <th scope="col">
            {{ $t('i18n_data_hora') }}
          </th>
          <th scope="col">
            {{ $tc('i18n_aposta', 1) }}
          </th>
          <th scope="col">
            {{ $tc('i18n_retorno', 1) }}
          </th>
        </tr>
      </thead>
      <tbody>
        <template v-for="(bet, count) in bets">
          <tr
            :key="count+'_'+bet.id"
            style="cursor: pointer"
            @click="currentFocus === count+'_'+bet.id ? currentFocus = null : currentFocus = count+'_'+bet.id"
          >
            <td class="text-start fut-color-dynamic">
              <p v-for="(game, index) in bet.games" :key="'pivot_'+game.id+index" class="mb-0">
                {{ getTypeName(game.odd_br, game) }} @ {{ game.odd }}
              </p>
              <p v-if="bet.games.length > 1" class="mb-0">
                {{ bet.games.length }} {{ $tc('i18n_multipla', 2) }}
              </p>
              <p v-else class="mb-0">
                {{ $t('i18n_simples') }}
              </p>
              <p :class="{'text-success': bet.result_br === 'Ganha', 'text-danger':bet.result_br === 'Perdida'}" class="mb-0">
                {{ bet.result_br }}
              </p>
            </td>
            <td>
              <p class="mb-0 fut-color-dynamic">
                {{ bet.created_at.split(' ') ? bet.created_at.split(' ')[0] : bet.created_at }}
              </p>
              <small class="fut-color-dynamic">{{ bet.created_at.split(' ') ? bet.created_at.split(' ')[1] : bet.created_at }}</small>
            </td>
            <td class="fut-color-dynamic">
              R$ {{ bet.value }}
            </td>
            <td v-if="bet.result_br === 'Aguardando'" class="fut-color-dynamic">
              R$ {{ bet.return }}
            </td>
            <td v-else-if="bet.result_br === 'Ganha'" class="fut-color-dynamic">
              R$ {{ bet.return }}
            </td>
            <td v-else class="fut-color-dynamic">
              R$ 0,00
            </td>
          </tr>
          <tr v-if="currentFocus === count+'_'+bet.id" :key="bet.id">
            <td colspan="4">
              <table class="table-nsx-white w-100">
                <thead>
                  <tr>
                    <th scope="col" colspan="7">
                      {{ $t('i18n_confirmacao_da_aposta') }} - <span class="text-orange">{{ bet.id }}</span> {{ $t('i18n_hora_da_aposta') }}:{{ bet.created_at }}
                    </th>
                  </tr>
                </thead>
                <thead>
                  <tr>
                    <th scope="col">
                      Nº.
                    </th>
                    <th scope="col">
                      {{ $t('i18n_seleçoes') }}
                    </th>
                    <th scope="col" class="text-start">
                      {{ $t('i18n_evento') }}
                    </th>
                    <th scope="col">
                      {{ $t('i18n_data_do_evento') }}
                    </th>
                    <th scope="col">
                      {{ $tc('i18n_esporte', 1) }}
                    </th>
                    <th scope="col">
                      {{ $tc('i18n_cotacao', 1) }}
                    </th>
                    <th scope="col">
                      {{ $t('i18n_resultado') }}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(game, index) in bet.games" :key="'detail_table_'+index+'_'+game.id">
                    <td>
                      <p class="mb-0">
                        {{ game.id }}
                      </p>
                    </td>
                    <td>
                      <p class="mb-0">
                        {{ getTypeName(game.odd_br, game) }}
                      </p>
                    </td>
                    <td class="text-start">
                      <p v-if="game.event" class="mb-0">
                        {{ game.event.home_team }} v {{ game.event.away_team }}
                      </p>
                    </td>
                    <td>
                      <p v-if="game.event" class="mb-0">
                        {{ formattedData(game.event.start_date) }}
                      </p>
                    </td>
                    <td>
                      <p class="mb-0">
                        -
                      </p>
                    </td>
                    <td>
                      <p class="mb-0">
                        {{ game.odd }}
                      </p>
                    </td>
                    <td>
                      <p class="mb-0">
                        {{ getStatusName(game.status) }}
                      </p>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
</template>

<script>
import dayjs from 'dayjs'

export default {
  name: 'NsxBetsList',
  props: {
    bets: {
      type: Array,
      default: () => ([])
    }
  },
  data () {
    return {
      currentFocus: null
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

<style scoped lang="scss">
  table{
    border-radius: 6px;
    overflow: hidden;
  }
  td{
    background-color: var(--nsx-dark-1);
    color: #c5c5c5;
    border: 1px solid var(--nsx-dark-7);
    font-size: 13.3px;
    text-align: center;
    padding: 0.4rem;
  }
  th{
    font-size: 13.3px;
    background-color: var(--nsx-dark-0);
    padding: 0.4rem;
    border: 1px solid var(--nsx-dark-1);
    color: #ffa500;
    text-align: center;
    font-weight: 700;
  }
  .table-nsx-white{
    th{
      background-color: var(--nsx-gray-0);
      padding: 0.4rem;
      border: 1px solid var(--nsx-gray-1);
      color: var(--nsx-dark-7);
      text-align: center;
    }
    td{
      background-color: #dbdbdb;
      border: 1px solid #c5c5c5;
      margin: 0;
      padding: 0.3rem;
      color: var(--nsx-dark-7);
      text-align: center;
    }
  }
  .text-orange{
    color: #ff8800;
  }
  .text-success{
    color: #00c851 !important;
    font-weight: bold;
  }
  .text-danger{
    color: #c83900 !important;
    font-weight: bold;
  }
</style>

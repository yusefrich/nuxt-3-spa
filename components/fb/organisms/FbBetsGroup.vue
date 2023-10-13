<template>
  <div class="container px-0">
    <div class="section-title-bar d-flex justify-content-between">
      <div class="d-flex">
        <fa class="icon-size me-2 text-white fut-color-dynamic" :icon="['fas', 'chart-pie']" />
        <span class="title text-white fut-color-dynamic">{{ $t('i18n_detalhes') }}</span>
      </div>
      <span class="chevron-icon">
        <fa class="icon-size mt-1 text-white fut-color-dynamic" :icon="['fas', 'chevron-down']" />
      </span>
    </div>
    <div class="bs_data_grid_holder">
      <div class="bs_data_grid" style="display: block;">
        <table class="table table-striped w-100">
          <tbody>
            <tr class="pagination_row nohover pagination_no_hover">
              <td colspan="9">
                <div class="d-flex justify-content-between">
                  <span class="text-white fut-color-dynamic">
                    {{ $t('i18n_paginas') }}: <span class="text-primary me-2">{{ page }}</span> <fb-fut-button v-if="pagination" class="arrow" @click="$emit('next')">></fb-fut-button>
                  </span>
                </div>
              </td>
            </tr>
            <tr class="table-header-titles">
              <th class="text-center text-white fut-color-dynamic fw-bold">
                {{ $t('i18n_boletim_de_aposta') }}
              </th>
              <th class="text-center text-white fut-color-dynamic fw-bold">
                {{ $t('i18n_data_hora') }}
              </th>
              <th class="text-start text-white fut-color-dynamic fw-bold">
                {{ $t('i18n_selecione_a_chave_pix') }}
              </th>
              <th class="text-start text-white fut-color-dynamic fw-bold">
                {{ $t('i18n_estado_da_aposta') }}
              </th>
              <th class="text-end text-white fut-color-dynamic fw-bold">
                {{ $t('i18n_valor_apostado') }} (R$)
              </th>
              <th class="text-end text-white fut-color-dynamic fw-bold d-none d-md-table-cell">
                {{ $t('i18n_vitoria_potencial') }} (R$)
              </th>
              <th class="text-end text-white fut-color-dynamic fw-bold d-none d-md-table-cell">
                {{ $t('i18n_vitoria') }} (R$)
              </th>
              <th class="text-end text-white fut-color-dynamic fw-bold d-none d-md-table-cell">
                {{ $t('i18n_selecoes') }}
              </th>
            </tr>
            <tr v-for="(bet, i) in bets" :key="'transactions_item_'+i" class="odd">
              <td class="text-center text-white fut-color-dynamic pointer" @click="currentBet = bet">
                <span>
                  {{ bet.id }}
                </span>
              </td>
              <td class="text-center text-white fut-color-dynamic pointer" @click="currentBet = bet">
                <span>
                  {{ bet.created_at }}
                </span>
              </td>
              <td class="text-white fut-color-dynamic pointer" @click="currentBet = bet">
                <span>
                  {{ bet.games.length > 1 ? $tc('i18n_multipla', 1) : $t('i18n_simples') }}
                </span>
              </td>
              <td class="text-end text-white fut-color-dynamic pointer" @click="currentBet = bet">
                <span>
                  {{ bet.result_br }}
                </span>
              </td>
              <td class="text-end text-white fut-color-dynamic pointer" @click="currentBet = bet">
                <span>
                  {{ bet.value }}
                </span>
              </td>
              <td class="text-end text-white fut-color-dynamic pointer d-none d-md-table-cell" @click="currentBet = bet">
                <span>
                  {{ bet.return }}
                </span>
              </td>
              <td class="text-end text-white fut-color-dynamic pointer d-none d-md-table-cell" @click="currentBet = bet">
                <span>
                  {{ (+bet.return - +bet.value).toFixed(2) }}
                </span>
              </td>
              <td class="text-end text-white fut-color-dynamic pointer d-none d-md-table-cell" @click="currentBet = bet">
                <span>
                  {{ bet.games.length }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div v-if="currentBet" class="bet-detail-modal">
      <div class="bet-detail-content">
        <fb-fut-button class="bet-detail-toggle text-white fut-color-dynamic" @click="currentBet = null">
          <fa :icon="['fas', 'times']" />
        </fb-fut-button>
        <div class="header d-none d-md-block">
          <span class="text-white fut-color-dynamic"><fa class="me-2" :icon="['fas', 'chart-bar']" /> {{ $t('i18n_relatorios_de_apostas') }}</span>
        </div>
        <div class="bet-modal-content">
          <div class="d-flex content-heading justify-content-between">
            <div class="w-100">
              <div class="w-100">
                <span class="text-white title-w fut-color-dynamic">ID:</span>
                <span class="text-white fut-color-dynamic">{{ currentBet.id }}</span>
              </div>
              <div class="w-100">
                <span class="text-white title-w fut-color-dynamic">{{ $t('i18n_jogar_em') }}:</span>
                <span class="text-white fut-color-dynamic">{{ currentBet.created_at }}</span>
              </div>
            </div>
            <div class="d-none d-md-block">
              <fb-fut-button class="btn btn-fb-primary fut-color-dynamic" @click="printPage()">
                {{ $t('i18n_imprimir_aposta') }}
              </fb-fut-button>
            </div>
          </div>
          <div class="d-md-none">
            <div v-for="(bet, i) in currentBet.games" :key="'game_mobile_container_' + i" class="game-container">
              <div v-if="bet.event" class="game-league">
                <span>{{ bet.event.league_name }}</span>
              </div>
              <div class="d-flex game-date">
                <span>{{ bet.start_date }}</span>
              </div>
              <div v-if="bet.event" class="d-flex game-home">
                <span>{{ bet.event.home_team }}</span>
              </div>
              <div v-if="bet.event" class="d-flex game-away">
                <span>{{ bet.event.away_team }}</span>
              </div>
              <div class="d-flex justify-content-between game-market text-white px-2">
                <span class="w-100">{{ bet.odd_br }}</span>
                <span>{{ bet.odd }}</span>
              </div>
              <div class="game-result px-2 bg-dark">
                <span
                  class="text-danger"
                  :class="[
                    bet.status===0?'text-white':'',
                    bet.status===1?'text-success':'',
                    bet.status===2?'text-danger':'',
                    bet.status===4?'text-white':''
                  ]"
                >
                  {{ getStatusName(bet.status) }}
                </span>
              </div>
            </div>
          </div>
          <div class="d-none d-md-block">
            <div class="bs_data_grid table-responsive" style="display: block;">
              <table class="table table-striped w-100">
                <tbody>
                  <tr class="table-header-titles">
                    <th class="text-center text-white fut-color-dynamic fw-bold">
                      {{ $t('i18n_boletim_de_aposta') }}
                    </th>
                    <th class="text-center text-white fut-color-dynamic fw-bold">
                      {{ $t('i18n_data_hora') }}
                    </th>
                    <th class="text-start text-white fut-color-dynamic fw-bold">
                      {{ $t('i18n_evento') }}
                    </th>
                    <th class="text-start text-white fut-color-dynamic fw-bold">
                      {{ $t('i18n_liga') }}
                    </th>
                    <th class="text-start text-white fut-color-dynamic fw-bold">
                      {{ $t('i18n_tipo_de_aposta') }}
                    </th>
                    <th class="text-center text-white fut-color-dynamic fw-bold">
                      Odd
                    </th>
                    <th class="text-center text-white fut-color-dynamic fw-bold">
                      {{ $t('i18n_estado') }}
                    </th>
                  </tr>
                  <tr v-for="(bet, i) in currentBet.games" :key="'transactions_item_'+i" class="odd">
                    <td class="text-center text-white fut-color-dynamic">
                      <span>
                        {{ bet.id }}
                      </span>
                    </td>
                    <td class="text-center text-white fut-color-dynamic">
                      <span>
                        {{ bet.start_date }}
                      </span>
                    </td>
                    <td class="text-white fut-color-dynamic">
                      <span v-if="bet.event">
                        {{ bet.event.home_team }} - {{ bet.event.away_team }}
                      </span>
                    </td>
                    <td class="text-end text-white fut-color-dynamic">
                      <span v-if="bet.event">
                        {{ bet.event.league_name }}
                      </span>
                    </td>
                    <td class="text-end text-white fut-color-dynamic">
                      <span>
                        {{ bet.odd_br }}
                      </span>
                    </td>
                    <td class="text-white fut-color-dynamic">
                      <span>
                        {{ bet.odd }}
                      </span>
                    </td>
                    <td class="text-center text-white fut-color-dynamic">
                      <span>
                        <div
                          class="square"
                          :class="[
                            bet.status===0?'bg-dark':'',
                            bet.status===1?'bg-success':'',
                            bet.status===2?'bg-danger':'',
                            bet.status===4?'bg-secondary':''
                          ]"
                        />
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div class="d-md-flex">
            <div class="bet-values w-100">
              <div>
                <span class="text-white info-w fut-color-dynamic">{{ $t('i18n_estado_da_aposta') }}:</span>
                <span class="text-white fut-color-dynamic">{{ currentBet.result_br }}</span>
              </div>
              <div>
                <span class="text-white info-w fut-color-dynamic">{{ $t('i18n_linhas_totais') }}</span>
                <span class="text-white fut-color-dynamic">{{ currentBet.games.length }}</span>
              </div>
              <div>
                <span class="text-white info-w fut-color-dynamic">{{ $t('i18n_valor_apostado_total') }}:</span>
                <span class="text-white fut-color-dynamic">{{ currentBet.value }}</span>
              </div>
              <div>
                <span class="text-white info-w fut-color-dynamic">{{ $t('i18n_ganho_minimo') }}:</span>
                <span class="text-white fut-color-dynamic">0</span>
              </div>
              <div>
                <span class="text-white info-w fut-color-dynamic">{{ $t('i18n_ganho_maximo') }}:</span>
                <span class="text-white fut-color-dynamic">{{ currentBet.return }}</span>
              </div>
            </div>
            <div v-if="currentBet.cashout" class="bet-values">
              <div class="cashout-container">
                <p class="text-white fw-bold fut-color-dynamic">
                  R$ {{ currentBet.cashout.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }) }}
                </p>
                <fb-fut-button class="btn btn-fb-primary px-4 fw-bold" @click="$emit('submitCashout', currentBet.id)">
                  CASHOUT
                </fb-fut-button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import FbFutButton from '@/components/fb/atoms/FbFutButton.vue'

export default {
  name: 'FbBetsGroup',
  components: {
    FbFutButton
  },
  props: {
    bets: {
      type: Array,
      default: () => ([])
    },
    pagination: {
      type: Boolean,
      default: false
    },
    page: {
      type: Number,
      default: 1
    }
  },
  data () {
    return {
      currentBet: null
    }
  },
  methods: {
    printPage () {
      window.print()
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
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/layout/breakpoints";

.arrow {
  color: var(--fut-primary);
  text-decoration: underline;
  margin-top: -1px;
}
.title-w{
  max-width: 100px;
  width: 100%;
  display: inline-block;
}
.info-w{
  max-width: 150px;
  width: 100%;
  display: inline-block;
}
.square{
  width: 20px;
  height: 20px;
  border-radius: 5px;
  border: 1px solid gray;
  margin-left: auto;
  margin-right: auto;
}
.bet-detail-modal{
  position: fixed;
  width: 100%;
  height: 100vh;
  top: 0;
  left: 0;
  background: var(--fut-background-transparent);
  z-index: 9090;
  span{
    font-size: 16px;
    @include md {
      font-size: 11px;
    }
  }
  .bet-detail-content{
    max-width: 90vw;
    max-height: 90vh;
    margin: auto;
    margin-top: 6vh;
    background: var(--fut-background-darker);
    position: relative;
    .header{
      padding: 10px 20px;
      background: var(--fut-background-lighter);
      border-bottom: 1px solid var(--fut-background-lightest);
    }
    .bet-modal-content{
      background: var(--fut-background);
      min-height: calc(100vh - 200px);
      max-height: 90vh;
      overflow: auto;
      .bet-values{
        background: var(--fut-background-black);
        padding: 20px;
        margin: 20px;
        @include md {
          margin: 0px;
          background: var(--fut-background-lighter);
        }
        margin-top: 30px;
      }
    }
    .content-heading{
      padding: 20px;
      @include md {
        padding: 20px;
        background: var(--fut-background-lighter);
      }
    }
    .bet-detail-toggle{
      position: absolute;
      top: -30px;
      right: 0;
      @include _md {
        background: transparent;
        border: none;
        color: white;
        font-size: 24px !important;
      }
    }
  }
}
.section-title-bar{
  margin-top: 10px;
  padding: 10px 20px;
  background: var(--fut-background-lightest);
  .title{
    font-size: 12px;
  }
}
.chevron-icon{
  background: var(--fut-background-lighter);
  border-radius: 50%;
  width: 20px;
  height: 20px;
  text-align: center;
}
.table-striped{
  *{
    font-size: 11px;
    font-family: Arial, Helvetica, sans-serif;
  }
  tr, th, td{
    border: none;
  }
  td{
    padding: 5px;
    border-right: 1px solid var(--fut-background-lightest);
    border-bottom: 1px solid var(--fut-background-lightest);
  }
  tr:last-child {
    th{
      padding: 2px 5px;
    }
  }
  tr:first-child {
    td{
      padding: 5px 3px;
    }
  }
  tr:nth-child(2) {
    th{
      padding: 3px;
      border-right: 1px solid var(--fut-background-lightest);
      border-bottom: 1px solid var(--fut-background-lightest);
    }
  }
  tr:nth-child(3) {
    th{
      padding: 2px 5px;
    }
  }
  tr:nth-child(even){
    background: var(--fut-background-darker);
  }
  tr:nth-child(odd){
    background: var(--fut-background-lighter);
  }
}
.pointer{
  cursor: pointer;
}
.btn-fb-primary{
  font-weight: bold;
  font-size: 12px;
  border-radius: 5px;
  white-space: nowrap;
  background: linear-gradient(
    90deg,
    var(--fut-primary-darkest) 0%,
    var(--fut-primary) 100%
  );
}
.game-container{
  border-bottom: 2px solid var(--fut-background-white);
  margin-bottom: 10px;
  padding: 5px;
  padding-bottom: 10px;
  .game-league{
    padding: 3px 5px;
    font-weight: 600;
    background: var(--fut-primary);
    margin-bottom: 2px;
    span{
      font-size: 13px;
    }
  }
  .game-date{
    padding: 3px 5px;
    font-weight: 600;
    background: var(--fut-primary);
    margin-bottom: 2px;
    span{
      font-size: 13px;
    }
  }
  .game-home{
    padding: 3px 5px;
    font-weight: 600;
    background: var(--fut-primary);
    margin-bottom: 2px;
    span{
      font-size: 13px;
    }
  }
  .game-away{
    padding: 3px 5px;
    font-weight: 600;
    background: var(--fut-primary);
    margin-bottom: 2px;
    span{
      font-size: 13px;
    }
  }
}
.cashout-container{
  background: var(--fut-background-lightest);
  padding: 20px 100px;
  text-align: center;
}
</style>

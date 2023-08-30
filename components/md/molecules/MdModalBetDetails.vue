<template>
  <md-modal
    v-model="modal"
    close
    width="auto"
    min-height="auto"
  >
    <div class="title">
      <h6 class="fw-bold mb-0">
        {{ $t('i18n_detalhes_da_aposta') }}
      </h6>
    </div>

    <div v-for="(game, index) in bet.games" :key="game.id+index" class="fut-color-dynamic games-list">
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
  </md-modal>
</template>

<script>
import dayjs from 'dayjs'
import MdModal from '@/components/md/atoms/MdModal.vue'

export default {
  name: 'MdModalBetDetails',
  components: {
    MdModal
  },
  props: {
    value: {
      type: Boolean,
      default: false
    },
    bet: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    modal: {
      get () {
        return this.value
      },
      set (value) {
        this.$emit('input', value)
      }
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
.title {
  padding: 20px;
  border-bottom: 1px solid var(--md-comp-border-color);
  color: var(--md-font-color);
}
.games-list{
  padding: 10px;
  padding-bottom: 0px;
  border-radius: 5px;
  color: var(--md-font-color);
  margin: 10px 15px;
}
.bg-dark{
  background-color: var(--fut-background-lightest) !important;
}
</style>

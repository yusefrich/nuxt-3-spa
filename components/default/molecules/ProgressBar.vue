<template>
  <div v-if="rollover" class="col-6 text-white">
    <p class="fut-color-dynamic mb-0 text-start">
      {{ $t('i18n_bonus_e_rollover') }}
    </p>

    <div class="d-flex flex-column">
      <div class="d-flex flex-column mb-3">
        <div class="d-flex">
          <span class="fut-color-dynamic">
            R$ {{ rollover.rollover_completed }}
          </span>
          <span class="ms-auto fut-color-dynamic">
            R$ {{ rollover.rollover }}
          </span>
        </div>
        <div class="progress rounded-pill" style="height: 12px;">
          <div
            class="progress-bar bg-primary"
            role="progressbar"
            :style="`width: ${barWidth}%;`"
          >
            <small class="text-white">{{ parseInt(barWidth) }}%</small>
          </div>
        </div>
        <span v-if="rollover.completed" class="align-self-start fut-color-dynamic">
          {{ $t('i18n_bonus_disponivel') }}
        </span>
        <span v-else class="align-self-start fut-color-dynamic">
          {{ $t('i18n_valido_ate') }}: {{ formatedExpires }}
        </span>
      </div>
    </div>
    <div>
      <fut-button v-if="!confirmBonusCancelation" primary class="text-background" rounded @click="confirmBonusCancelation = true">
        {{ $t('i18n_cancelar_bonus') }}
      </fut-button>
      <fut-button v-if="confirmBonusCancelation" :disabled="loading" class="btn-danger me-2 transition" rounded @click="$emit('cancelUserBonus')">
        {{ loading ? $t('i18n_carregando') : $t('i18n_acao_sem_retorno') }}
      </fut-button>
    </div>
  </div>
  <div v-else class="col-6 text-white">
    <p class="fut-color-dynamic mb-0 text-start px-3 py-1 sub-title">
      {{ $t('i18n_progresso_inactive') }}
    </p>
  </div>
</template>

<script>
import FutButton from '@/components/default/atoms/FutButton'
export default {
  name: 'ProgressBar',
  components: {
    FutButton
  },
  props: {
    rollover: {
      type: Object,
      default: () => ({
        rollover_completed: 1700,
        rollover: 4000,
        expires: '2022-12-12'
      })
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      confirmBonusCancelation: false
    }
  },
  computed: {
    barWidth () {
      if (this.rollover.rollover_completed && this.rollover.rollover) {
        return (+this.rollover.rollover_completed * 100) / +this.rollover.rollover
      }

      return 0
    },
    formatedExpires () {
      if (this.rollover.expires) {
        const formated = this.rollover.expires.split('-')

        return `${formated[2]}/${formated[1]}/${formated[0]}`
      }

      return ''
    }
  }
}
</script>

<style scoped lang="scss">
.btn-danger{
  background: red !important;
}
.progress{
  background-color: var(--fut-primary-transparent-2) !important;
}
span {
  margin-top: 5px;
  font-size: 15px;
}
small {
  margin-top: 2px;
  color: #000
}
.btn {
  background-color: var(--fut-primary);
  color: #fff;
  box-shadow: none;
  &:hover {
    background-color: var(--fut-primary-darkest);
  }
}
</style>

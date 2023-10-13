<template>
  <div
    v-if="rollover"
    :style="`
      color: ${color};
    `"
  >
    <p class="label mb-0 text-start">
      {{ $t('i18n_bonus_e_rollover').toUpperCase() }}:
    </p>

    <div class="d-flex flex-column">
      <div class="d-flex flex-column mb-3">
        <div class="d-flex">
          <span>
            R$ {{ rollover.rollover_completed }}
          </span>
          <span class="ms-auto">
            R$ {{ rollover.rollover }}
          </span>
        </div>
        <div class="progress rounded-pill" style="height: 12px;">
          <div
            class="progress-bar bg-primary"
            role="progressbar"
            :style="`width: ${barWidth}%;`"
          >
            <small class="">{{ parseInt(barWidth) }}%</small>
          </div>
        </div>
        <span v-if="rollover.completed" class="align-self-start valid">
          {{ $t('i18n_bonus_disponivel') }}
        </span>
        <span v-else class="align-self-start valid">
          {{ $t('i18n_valido_ate') }}: {{ formatedExpires }}
        </span>
      </div>
    </div>
    <div>
      <md-button
        v-if="!confirmBonusCancelation && !hideBtn"
        padding="5px 10px"
        @click="confirmBonusCancelation = true"
      >
        {{ $t('i18n_cancelar_bonus') }}
      </md-button>
      <md-button
        v-if="confirmBonusCancelation"
        padding="5px 10px"
        :loading="loading"
        :disabled="loading"
        class="danger me-2 transition"
        @click="$emit('cancelUserBonus')"
      >
        {{ loading ? $t('i18n_carregando') : $t('i18n_acao_sem_retorno') }}
      </md-button>
    </div>
  </div>
  <div
    v-else
    class="col-6"
    :style="`
      color: ${color};
    `"
  >
    <p class="mb-0 text-start py-1 inactive">
      {{ $t('i18n_progresso_inactive') }}
    </p>
  </div>
</template>

<script>
import MdButton from '@/components/md/atoms/MdButton'

export default {
  name: 'MdProgressBar',
  components: {
    MdButton
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
    },
    color: {
      type: String,
      default: 'var(--md-font-color)'
    },
    hideBtn: {
      type: Boolean,
      default: false
    }
  },
  emits: [
    'cancelUserBonus'
  ],
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

<style lang="scss" scoped>
.label {
  font-size: 13px;
  font-weight: 600;
}
.danger{
  background: red !important;
  &:hover {
    background: rgb(222, 0, 0) !important;
  }
  &:active {
    background: rgb(255, 63, 63) !important;
  }
}
.valid {
  font-size: .75rem;
  margin-top: 3px;
}
.inactive {
  font-size: .875rem;
}
</style>

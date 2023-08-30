<template>
  <div v-if="rollover" class="col-6">
    <p class="fut-color-dynamic mb-0 text-start mx-3">
      {{ $t('i18n_bonus_e_rollover') }}
    </p>

    <div class="d-flex flex-column mx-3">
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
            <small>{{ parseInt(barWidth) }}%</small>
          </div>
        </div>
        <span v-if="rollover.completed" class="align-self-start">
          {{ $t('i18n_bonus_disponivel') }}
        </span>
        <span v-else class="align-self-start">
          {{ $t('i18n_valido_ate') }}: {{ formatedExpires }}
        </span>
      </div>
    </div>
    <div>
      <nsx-fut-button v-if="!confirmBonusCancelation" primary class="text-dark" rounded @click="confirmBonusCancelation = true">
        {{ $t('i18n_cancelar_bonus') }}
      </nsx-fut-button>
      <nsx-fut-button v-if="confirmBonusCancelation" :disabled="loading" class="btn-danger me-2 transition" rounded @click="$emit('cancelUserBonus')">
        {{ loading ? $t('i18n_carregando') : $t('i18n_acao_sem_retorno') }}
      </nsx-fut-button>
    </div>
  </div>
  <div v-else class="col-6">
    <p class="fut-color-dynamic mb-0 text-start px-3 py-1 sub-title">
      {{ $t('i18n_progresso_inactive') }}
    </p>
  </div>
</template>

<script>
import NsxFutButton from '@/components/nsx/atoms/NsxFutButton'
export default {
  name: 'NsxProgressBar',
  components: {
    NsxFutButton
  },
  props: {
    rollover: {
      type: Object,
      default: () => ({
        rollover_completed: 1700,
        rollover: 4000,
        expires: '2022-12-12'
      })
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

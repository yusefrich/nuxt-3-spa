<template>
  <div v-if="rollover" class="text-white fut-color-dynamic w-100">
    <p class="fut-color-dynamic mb-0 text-start px-3 py-1 sub-title">
      {{ $t('i18n_progresso') }}
    </p>

    <div class="d-flex flex-column mx-3">
      <div class="d-flex flex-column mb-3">
        <div class="d-flex">
          <span v-if="rollover">
            R$ {{ rollover.rollover_completed }}
          </span>
          <span v-if="rollover" class="ms-auto">
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
        <span v-if="rollover && rollover.completed" class="align-self-start">
          {{ $t('i18n_bonus_disponivel') }}
        </span>
        <span v-else class="align-self-start">
          {{ $t('i18n_valido_ate') }}: {{ formatedExpires }}
        </span>
      </div>
      <!-- <button class="align-self-start btn fut-color-dynamic">
        {{ $t('i18n_cancelar_bonus') }}
      </button> -->
    </div>
    <div class="p-1 ps-3">
      <fb-fut-button v-if="!confirmBonusCancelation" primary class="text-dark p-2" rounded @click="confirmBonusCancelation = true">
        {{ $t('i18n_cancelar_bonus') }}
      </fb-fut-button>
      <fb-fut-button v-if="confirmBonusCancelation" :disabled="loading" class="btn-danger me-2 p-2 transition" rounded @click="$emit('cancelUserBonus')">
        {{ loading ? $t('i18n_carregando') : $t('i18n_acao_sem_retorno') }}
      </fb-fut-button>
    </div>
  </div>
  <div v-else class="text-white fut-color-dynamic">
    <p class="fut-color-dynamic mb-0 text-start px-3 py-1 sub-title-italic">
      {{ $t('i18n_sem_nenhuum_bonus') }}
    </p>
  </div>
</template>

<script>
import FbFutButton from '@/components/fb/atoms/FbFutButton'
export default {
  name: 'FbProgressBar',
  components: {
    FbFutButton
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
      if (this.rollover && this.rollover.rollover_completed && this.rollover.rollover) {
        return (+this.rollover.rollover_completed * 100) / +this.rollover.rollover
      }

      return 0
    },
    formatedExpires () {
      if (this.rollover && this.rollover.expires) {
        const formated = this.rollover.expires.split('-')

        return `${formated[2]}/${formated[1]}/${formated[0]}`
      }

      return ''
    }
  }
}
</script>

<style scoped lang="scss">
@import "@/assets/layout/breakpoints";
.btn-danger {
  background: red !important;
}
.sub-title {
  border-bottom: 1px solid rgb(102, 99, 99);
}
.sub-title-italic {
  font-weight: bold;
  font-style: italic;
  font-size: 14px;
  @include md {
    font-size: 24px;
  }
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

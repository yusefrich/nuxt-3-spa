<template>
  <div class="sk-balance">
    <h1>{{ $t('i18n_saldo') }}</h1>

    <div :class="isMobile ? 'mobile-balance-content':'balance-content'">
      <div style="grid-area: balance;">
        <h5 class="label">
          {{ $t('i18n_disponivel').toUpperCase() }}:
        </h5>
        <p>R$ {{ loggedInUser.balance.toString().replace('.', ',') }}</p>
      </div>
      <div style="grid-area: bonus;">
        <h5 class="label">
          {{ $t('i18n_bonus').toUpperCase() }}:
        </h5>
        <p>R$ {{ loggedInUser.balance_bonus.toString().replace('.', ',') }}</p>
      </div>
      <div style="grid-area: freebet;">
        <h5 class="label">
          FREEBET:
        </h5>
        <p>R$ {{ loggedInUser.free_bet.toString().replace('.', ',') }}</p>
      </div>
      <div style="grid-area: block;">
        <h5 class="label">
          {{ $t('i18n_bloqueado').toUpperCase() }}:
        </h5>
        <p>R$ {{ loggedInUser.player.freebet_closed.toString().replace('.', ',') }}</p>
      </div>
      <div style="grid-area: rollover;">
        <md-progress-bar
          :rollover="loggedInUser.bonus"
          @cancelUserBonus="$emit('cancelUserBonus')"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SkBalance',
  props: {
    loggedInUser: {
      type: Object,
      default: () => ({})
    },
    isMobile: {
      type: Boolean,
      default: false
    }
  },
  emits: [
    'cancelUserBonus'
  ]
}
</script>

<style lang="scss" scoped>
.sk-balance {
  padding: 1.5rem;
  background: var(--fut-background-darkest);
  border-radius: .5rem;
  color: var(--fut-color-dynamic);

  h1 {
    font-weight: 600;
    font-size: 1.5rem;
  }

  .balance-content {
    display: grid;
    grid-template-areas:
      "balance bonus"
      "freebet block"
      "rollover ."
    ;

  }

  .mobile-balance-content {
    display: grid;
    grid-template-areas:
      "balance bonus"
      "freebet block"
      "rollover rollover"
    ;
  }

  .label {
    font-size: 14px;
    font-weight: 600;
  }
}
</style>

<template>
  <div>
    <div v-if="!bets || bets.length <= 0">
      <p class="text-white fut-color-dynamic">
        {{ $t('i18n_nenhuma_aposta_encontrada') }}
      </p>
    </div>
    <bet-item v-for="(bet) in bets" :key="bet.id" :bet="bet" @submitCashout="payload => $emit('submitCashout', payload)" />
  </div>
</template>
<script>
import BetItem from '@/components/default/atoms/BetItem.vue'
export default {
  components: { BetItem },
  props: {
    bets: {
      type: Array,
      default: () => ([])
    }
  }
}
</script>

<template>
  <div>
    <div v-if="!bets || bets.length <= 0">
      <p class="text-white fut-color-dynamic">
        {{ $t('i18n_nenhuma_aposta_encontrada') }}
      </p>
    </div>
    <bet-item
      v-for="(bet) in bets"
      :key="bet.id"
      :bet="bet"
    />
  </div>
</template>

<script>
import BetItem from '@/components/default/atoms/BetItem'

export default {
  components: {
    BetItem
  },
  props: {
    bets: {
      type: Array,
      default: () => ([])
    }
  }
}
</script>

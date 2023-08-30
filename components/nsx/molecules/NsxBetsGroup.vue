<template>
  <div>
    <nsx-bet-item
      v-for="(bet) in bets"
      :key="bet.id"
      :smaller="smaller"
      :bet="bet"
      :loading="loading"
      @submitCashout="$emit('submitCashout', $event)"
    />
  </div>
</template>

<script>
import NsxBetItem from '@/components/nsx/atoms/NsxBetItem.vue'

export default {
  name: 'NsxBetsGroup',
  components: {
    NsxBetItem
  },
  props: {
    bets: {
      type: Array,
      default: () => ([])
    },
    smaller: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<template>
  <div class="sk-bets-history">
    <div v-if="!items.length" class="empty-icon">
      <sk-chart-icon class="mx-auto" />
      <p class="mb-0">
        {{ $t('i18n_sem_apostas_ativas') }}
      </p>
      <p class="bet mt-0">
        {{ $t('i18n_comece_a_apostar_agora') }}
      </p>
    </div>

    <div v-else class="bets-list">
      <div
        v-for="(colItems, cIdx) in reorderedItems"
        :key="cIdx"
        class="list-columns text-white"
      >
        <div
          v-for="(rowItem, rIdx) in colItems"
          :key="rIdx"
          class="list-rows"
        >
          <sk-ticket-card
            v-if="rowItem"
            :item="rowItem"
            :logo="logo"
            :class="{ 'mb-3': isMobile }"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SkChartIcon from '@/components/sk/atoms/SkChartIcon.vue'
import SkTicketCard from '@/components/sk/molecules/SkTicketCard.vue'

export default {
  name: 'SkBetsHistory',
  components: {
    SkChartIcon,
    SkTicketCard
  },
  props: {
    items: {
      type: Array,
      default: () => ([])
    },
    logo: {
      type: String,
      default: ''
    },
    onTicket: {
      type: Boolean,
      default: false
    },
    isMobile: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    reorderedItems () {
      if (!this.items.length) {
        return []
      }

      if (this.onTicket || this.isMobile) {
        return [this.items]
      }

      const sliced = []

      for (let i = 0; i < this.items.length; i = i + 3) {
        sliced.push(this.items.slice(i, i + 3))
      }

      const reordered = [[], [], []]

      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < sliced.length; j++) {
          reordered[i].push(sliced[j][i])
        }
      }

      return reordered
    }
  }
}
</script>

<style lang="scss" scoped>
.sk-bets-history {

  .empty-icon {
    padding: 34px 16px 16px;

    p {
      font-size: .875rem;
      font-weight: 600;
      color: var(--fut-secondary);
      margin-top: 16px;
      text-align: center;
    }
    .bet {
      font-weight: 700;
      color: var(--fut-color-dynamic);
    }
  }

  .bets-list {
    display: flex;
    gap: .5rem;

    .list-columns {
      width: 100%;
      margin-right: .5rem;
      &:last-of-type {
        margin-right: 0;
      }

      .list-rows {
        margin-bottom: .5rem;
        position: relative;
      }
    }
  }
}
</style>

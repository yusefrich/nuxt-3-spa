<template>
  <div class="sk-withdrawals">
    <div class="currency">
      <span>
        {{ $t('i18n_dinheiro') }}
      </span>
    </div>

    <div class="withdrawals-list">
      <div v-if="!withdrawals.length" class="empty-icon">
        <sk-chart-icon class="mx-auto" />
        <p>
          {{ $t('i18n_sem_saques_em_dinheiro') }}
        </p>
      </div>

      <ul v-else>
        <li
          v-for="(item, idx) in withdrawals"
          :key="idx"
        >
          <div class="info">
            <div class="texts">
              <span>
                {{ item.status }}
              </span>
              <span>
                {{ formatDate(item.created_at) }}
              </span>
            </div>
          </div>
          <div class="value">
            <span>R$ {{ thousandsSeparators(item.amount) }}</span>
          </div>
        </li>
      </ul>
    </div>

    <div class="view-more">
      <button
        @click="$emit('concatBankWithdrawals')"
      >
        <span>{{ $t('i18n_ver_mais') }}</span>
      </button>
    </div>
  </div>
</template>

<script>
import SkChartIcon from '@/components/sk/atoms/SkChartIcon'

export default {
  name: 'SkWithdraws',
  components: {
    SkChartIcon
  },
  props: {
    withdrawals: {
      type: Array,
      default: () => ([])
    }
  },
  emits: [
    'concatBankWithdrawals'
  ],
  methods: {
    formatDate (date) {
      const formattedDate = new Date(date).toLocaleDateString('pt-BR')
      const formattedHour = new Date(date).toLocaleTimeString('pt-BR')

      return `${formattedHour} ${formattedDate}`
    },
    thousandsSeparators (num) {
      const numParts = num.toString().split('.')
      numParts[0] = numParts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.')

      return numParts.join(',')
    }
  }
}
</script>

<style lang="scss" scoped>
.sk-withdrawals {
  padding: 1.5rem;
  background: var(--fut-background-darkest);
  border-radius: .5rem;
  color: var(--fut-color-dynamic);

  .currency {
    display: inline-flex;
    background: var(--fut-background);
    padding: 5px;
    border-radius: 3rem;

    span {
      background: var(--fut-background-lightest-2);
      border-radius: 4rem;
      font-size: .875rem;
      font-weight: 600;
      padding: 11.5px 20px;
    }
  }

  .withdrawals-list {
    display: flex;
    justify-content: center;
    margin-top: 24px;

    .empty-icon {
      padding: 34px 16px 16px;

      p {
        font-size: .875rem;
        font-weight: 600;
        color: var(--fut-secondary);
        margin-top: 16px;
      }
    }

    ul {
      list-style: none;
      margin: 0;
      padding: 0;
      width: 100%;

      li {
        padding: 1rem;
        display: flex;
        justify-content: space-between;
        border-radius: .3rem;

        &:nth-child(odd) {
          background: var(--fut-background-lighter);
        }

        .info {
          display: flex;
          align-items: center;

          .texts {
            display: flex;
            flex-direction: column;

            span:first-of-type {
              color: var(--fut-color-dynamic);
              font-weight: 700;
            }
          }
        }
        .value {
          display: flex;
          align-items: center;
        }

        span {
          font-size: .875rem;
          font-weight: 400;
          color: var(--fut-secondary);
        }
      }
    }
  }

  .view-more {
    display: flex;
    justify-content: center;

    button {
      border: none;
      background: transparent;

      span {
        font-size: .875rem;
        font-weight: 600;
        color: var(--fut-secondary);
      }

      &:hover {
        span {
          color: var(--fut-color-dynamic);
        }
      }
      &:active {
        span {
          display: flex;
          transform: scale(.95);
        }
      }
    }
  }
}
</style>

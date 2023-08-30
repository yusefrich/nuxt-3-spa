<template>
  <div class="sk-casino-history">
    <div class="casino-history-list">
      <div v-if="!casinoHistory.length" class="empty-icon">
        <sk-chart-icon class="mx-auto" />
        <p>
          {{ $t('i18n_sem_historico_de_casino') }}
        </p>
      </div>

      <ul v-else>
        <li
          v-for="(item, idx) in casinoHistory"
          :key="idx"
        >
          <div class="info">
            <div class="texts">
              <span>
                {{ item.game }}
              </span>
              <span>
                {{ formatDate(item.created_at) }}
              </span>
            </div>
          </div>
          <div class="value">
            <span>R$ {{ thousandsSeparators(item.amount) }}</span>
            <div class="bet">
              <font-awesome-icon class="icon transition" :icon="['fas', 'tasks']" />
              <span class="id">{{ item.reference }}</span>
            </div>
          </div>
        </li>
      </ul>
    </div>

    <div class="view-more">
      <button
        @click="$emit('concatBankCasinoTransactions', { page: historyPage++ })"
      >
        <span>{{ $t('i18n_ver_mais') }}</span>
      </button>
    </div>
  </div>
</template>

<script>
import SkChartIcon from '@/components/sk/atoms/SkChartIcon.vue'

export default {
  name: 'SkCasinoHistory',
  components: {
    SkChartIcon
  },
  props: {
    casinoHistory: {
      type: Array,
      default: () => ([])
    }
  },
  data () {
    return {
      historyPage: 2
    }
  },
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
.sk-casino-history {
  padding: 1.5rem;
  background: var(--fut-background-darkest);
  border-radius: .5rem;
  color: var(--fut-color-dynamic);

  .casino-history-list {
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
          align-items: flex-end;
          flex-direction: column;

          .bet {
            cursor: pointer;

            .icon {
              color: var(--fut-secondary);
              width: 13px;
              height: 13px;
            }
            .id {
              color: var(--fut-color-dynamic);
              font-weight: 600;
            }

            &:hover {
              .icon {
                color: var(--fut-color-dynamic);
              }
            }
            &:active {
              transform: scale(.95);
            }
          }
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

<template>
  <div class="sk-deposits">
    <div class="currency">
      <span>
        {{ $t('i18n_dinheiro') }}
      </span>
    </div>

    <div class="deposits-list">
      <div v-if="!deposits.length" class="empty-icon">
        <sk-chart-icon class="mx-auto" />
        <p>
          {{ $t('i18n_sem_depositos_em_dinheiro') }}
        </p>
      </div>

      <ul v-else>
        <li
          v-for="(item, idx) in deposits"
          :key="idx"
        >
          <div class="info">
            <div>
              <div
                class="action"
                :class="item.situation === 'Pendente' ? 'action-true': 'action-false'"
                @click="openModalPix(item)"
              >
                <font-awesome-icon class="text-white icon" :icon="['fas', 'qrcode']" />
              </div>
            </div>
            <div class="texts">
              <span>
                {{ item.situation }}
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
        @click="$emit('concatBankDeposits')"
      >
        <span>{{ $t('i18n_ver_mais') }}</span>
      </button>
    </div>

    <sk-modal-pix
      v-model="modalPix"
      :item="pixInfos"
    />
  </div>
</template>

<script>
import SkChartIcon from '@/components/sk/atoms/SkChartIcon'
import SkModalPix from '@/components/sk/molecules/SkModalPix'

export default {
  name: 'SkDeposits',
  components: {
    SkChartIcon,
    SkModalPix
  },
  props: {
    deposits: {
      type: Array,
      default: () => ([])
    }
  },
  emits: [
    'concatBankDeposits'
  ],
  data () {
    return {
      modalPix: false,
      pixInfos: null
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
    },
    openModalPix (item) {
      if (item.situation === 'Pendente') {
        this.pixInfos = item.payment
        this.modalPix = true
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.sk-deposits {
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

  .deposits-list {
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

          .action {
            display: inline-block;
            margin: 4px 16px 0 0;
            padding: 4px 8px;
            border-radius: 5px;
          }
          .action-true {
            cursor: pointer;
            background: green;
            &:hover {
              background: rgb(1, 170, 1);
            }
            &:active {
              background: rgb(0, 88, 0);
            }
          }
          .action-false {
            background: #aaa;
          }

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

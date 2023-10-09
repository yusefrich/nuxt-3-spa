<template>
  <div class="sk-withdraw">
    <div v-if="(validWithdrawTime && midnightBlock === 1) || midnightBlock === 0">
      <div v-if="!withdrawResponse" class="withdraw-body">
        <div class="select-wrapper">
          <label for="pix-select" class="select-label">
            {{ $t('i18n_chave_pix') }}<span>*</span>
          </label>
          <select
            id="pix-select"
            v-model="pixKey"
            required
            name="pix"
          >
            <option :value="''">
              {{ $t('i18n_selecione_a_chave_pix') }}
            </option>
            <option value="CPF">
              CPF - {{ pixKeys['CPF'] }}
            </option>
            <option value="EMAIL">
              Email - {{ pixKeys['EMAIL'] }}
            </option>
            <option value="PHONE">
              {{ $t('i18n_celular') }} - {{ pixKeys['PHONE'] }}
            </option>
          </select>
        </div>

        <div class="min-max">
          <div class="d-flex flex-column align-items-center">
            <span class="fw-bold">Min</span>
            <span>R$ {{ thousandsSeparators(transactionLimitMin) }}</span>
          </div>
          <div class="line" />
          <div class="d-flex flex-column align-items-center">
            <span class="fw-bold">Max</span>
            <span>R$ {{ thousandsSeparators(transactionLimitMax) }}</span>
          </div>
        </div>

        <div class="input-wrapper">
          <label for="amount" class="input-label">
            {{ $t('i18n_valor_do_saque') }}<span>*</span>
          </label>
          <input
            id="amount"
            v-model="price"
            v-money="money"
            type="text"
            required
          >
          <error-badge
            name="amount"
            :validate="withdrawErrors?withdrawErrors:{}"
            class="error-badge"
          />
        </div>

        <div class="withdraw-btns my-3">
          <button
            v-for="(item, idx) in withdrawals"
            :key="idx"
            @click="price = item.value"
          >
            <span>{{ item.label }}</span>
          </button>
        </div>

        <div v-if="user && user.bonus">
          <sk-checkbox
            v-model="bonus"
            :label="$t('i18n_existe_um_bonus')"
            name="bonus"
          />
        </div>

        <button
          class="submit-btn mt-3 transition"
          :class="{ disabled: disableSubmit || loading }"
          :disabled="disableSubmit || loading"
          @click="withdraw()"
        >
          <span>{{ $t('i18n_sacar') }}</span>
        </button>
      </div>

      <div v-else class="withdraw-body">
        <h4 class="text-center">
          {{ $t('i18n_saque_realizado_com_sucesso') }}
        </h4>
        <button
          class="submit-btn mt-3 transition"
          @click="$emit('resetModal'), price = '', pixKey = ''"
        >
          <span>{{ $t('i18n_novo_saque') }}</span>
        </button>
      </div>

      <div class="withdraw-infos">
        <h6 class="fw-bold">
          info:
        </h6>

        <ul>
          <li>
            <!-- eslint-disable-next-line -->
            <span v-html="$t('i18n_so_e_permitido_solicitar_um')" />
          </li>
          <li>
            <!-- eslint-disable-next-line -->
            <span v-html="$t('i18n_para_solicitar_o_saque')" />
          </li>
          <li>
            <!-- eslint-disable-next-line -->
            <span v-html="$t('i18n_deve_solicitar_saques_apenas_para_contas')" />
          </li>
          <li>
            <!-- eslint-disable-next-line -->
            <span v-html="$t('i18n_para_ter_o_saldo_de_volta')" />
          </li>
        </ul>
      </div>
    </div>
    <div v-else class="text-center">
      <font-awesome-icon class="icon text-warning fut-color-dynamic me-1 py-3" style="font-size: 40px" :icon="['fas', 'info-circle']" />
      <h5 class="fut-color-dynamic">
        <small>{{ $t('i18n_saque_indisponivel_durante') }}</small>
      </h5>
    </div>
  </div>
</template>

<script>
import { VMoney } from 'v-money'
import SkCheckbox from '@/components/sk/atoms/SkCheckbox'
import ErrorBadge from '@/components/default/atoms/ErrorBadge'

export default {
  name: 'SkWithdraw',
  components: {
    ErrorBadge,
    SkCheckbox
  },
  directives: { money: VMoney },
  props: {
    transactionLimitMin: {
      type: [Number, String],
      default: 0
    },
    transactionLimitMax: {
      type: [Number, String],
      default: 0
    },
    withdrawResponse: {
      type: Object,
      default: () => ({})
    },
    withdrawErrors: {
      type: Object,
      default: () => ({})
    },
    loading: {
      type: Boolean,
      default: false
    },
    canWithdraw: {
      type: Number,
      default: null
    },
    pixKeys: {
      type: Object,
      default: () => ({})
    },
    user: {
      type: Object,
      default: null
    },
    midnightBlock: {
      type: Number,
      default: 0
    }
  },
  emits: [
    'resetModal',
    'submitWithdraw'
  ],
  data () {
    return {
      pixKey: '',
      price: '',
      money: {
        decimal: ',',
        thousands: '.',
        prefix: 'R$ ',
        precision: 2
      },
      bonus: false
    }
  },
  computed: {
    withdrawals () {
      const btnsValues = [
        { label: 'R$ 10,00', value: '10,00' },
        { label: 'R$ 20,00', value: '20,00' },
        { label: 'R$ 50,00', value: '50,00' },
        { label: 'R$ 100,00', value: '100,00' },
        { label: 'R$ 200,00', value: '200,00' },
        { label: 'R$ 400,00', value: '400,00' },
        { label: 'R$ 1000,00', value: '1000,00' }
      ]

      return btnsValues.filter(value => +value.value.replace(',', '.') >= +this.transactionLimitMin && +value.value.replace(',', '.') <= +this.transactionLimitMax)
    },
    disableSubmit () {
      if (
        +this.price.substring(3).replace(/\./g, '').replace(',', '.') < this.transactionLimitMin ||
        +this.price.substring(3).replace(/\./g, '').replace(',', '.') > this.transactionLimitMax ||
        this.pixKey === ''
      ) {
        return true
      }

      return false
    },
    validWithdrawTime () {
      return new Date().getHours() > 7 && new Date().getHours() <= 23
    }
  },
  methods: {
    withdraw () {
      const payload = {
        method: 'pix',
        amount: +this.price.substring(3).replace('.', '').replace(',', '.'),
        type: this.pixKey,
        pix: this.pixKeys[this.pixKey],
        bonus: this.bonus
      }

      this.$emit('submitWithdraw', payload)
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
.sk-withdraw {
  .withdraw-body {
    .select-label, .input-label {
      font-size: 15px;
      font-weight: 600;
      color: var(--fut-secondary);
      margin-bottom: 2px;

      span {
        color: red;
        font-weight: 400;
        font-size: 13px;
        margin-left: 3px;
      }
    }
    #pix-select, #amount {
      width: 100%;
      border: 2px solid var(--fut-background-lightest-2);
      background: var(--fut-background-darkest);
      color: var(--fut-color-dynamic);
      border-radius: .25rem;
      outline: 0;
      margin: 0;
      box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .2), 0 1px 2px 0 rgba(0, 0, 0, .12);
      padding: 6px 7px;
      font-weight: 600;
      font-size: 15px;

      &:focus, &:hover {
        border-color: var(--fut-secondary);
      }

      &.rounded {
        border-radius: 30px !important;
      }
      &.star-icon {
        padding-left: 40px
      }

      &::placeholder {
        color: var(--fut-background-lightest-2);
      }
    }

    .min-max {
      display: flex;
      background: var(--fut-background-darkest);
      border-radius: 3px;
      justify-content: space-evenly;
      align-items: center;
      padding: 1rem;
      margin: 16px 0;
      color: var(--fut-secondary);
      font-size: .857rem;

      .line {
        height: 44.8px;
        width: 2px;
        background: var(--fut-background-lighter);
      }
    }

    .withdraw-btns {
      button {
        border: none;
        background: var(--fut-primary);
        padding: 10px;
        border-radius: .25rem;
        font-size: .875rem;
        font-weight: 600;
        box-shadow: 0rem .0625rem .1875rem #00000033 , 0rem .0625rem .125rem #0000001f;
        margin-bottom: 5px;
        color: var(--fut-color-dynamic);

        &:not(:last-of-type) {
          margin-right: 8px;
        }
        &:hover {
          background: var(--fut-primary-darkest);
        }
        &:active {
          span {
            display: flex;
            transform: scale(.95);
          }
        }
      }
    }

    .submit-btn {
      display: flex;
      justify-content: center;
      align-items: center;
      border: none;
      background: var(--fut-primary);
      color: var(--fut-color-dynamic);
      padding: 10px;
      border-radius: .25rem;
      width: 100%;
      font-size: 1rem;
      font-weight: 700;
      box-shadow: 0rem .0625rem .1875rem #00000033 , 0rem .0625rem .125rem #0000001f;

      &:hover {
        background: var(--fut-primary-darkest);
      }
      &:active {
        span {
          display: flex;
          transform: scale(.95);
        }
      }
      &.disabled {
        opacity: .5;
        &:hover {
          background: var(--fut-primary);
        }
        &:active {
          span {
            transform: none;
          }
        }
      }
    }
  }

  .withdraw-infos {
    margin-top: 16px;
    background: var(--fut-background-darkest);
    border-radius: .5rem;
    padding: 12px;

    span {
      font-size: .875rem;
    }
  }
}
</style>

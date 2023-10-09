<template>
  <div class="sk-deposit">
    <div v-if="!depositResponse" class="before-submit">
      <label for="amount">
        {{ `${$t('i18n_valor_do_deposito')} (${$t('i18n_Depositar_moeda')})` }}<span>*</span>
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
        :validate="depositErrors?depositErrors:{}"
        class="error-badge"
      />
      <p class="mt-2 transaction-min">
        <font-awesome-icon class="me-2" :icon="['fas', 'info-circle']" />
        <span>Min: {{ transactionLimit }} BRL</span>
      </p>
      <div class="deposits-btns mb-3">
        <button
          v-for="(item, idx) in deposits"
          :key="idx"
          @click="price = item.value"
        >
          <span>{{ item.label }}</span>
        </button>
      </div>
      <sk-input
        v-model="code"
        name="code"
        type="text"
        :label="$t('i18n_codigo_de_bonus')"
      />
      <error-badge
        name="code"
        :validate="depositErrors?depositErrors:{}"
        class="error-badge"
      />
      <button
        class="submit-btn mt-3"
        :class="{ disabled: disableSubmit || loading }"
        :disabled="disableSubmit || loading"
        @click="deposit()"
      >
        <span>{{ $t('i18n_depositar') }}</span>
      </button>
    </div>

    <div v-else class="after-submit">
      <div class="sucess-container py-1">
        <font-awesome-icon class="ms-2" :icon="['fas', 'check']" />
        <span>{{ $t('i18n_transacao_bem_sucedida') }}</span>
      </div>

      <div class="section-qr">
        <div class="pix-code">
          <sk-input
            :value="depositResponse.payment.pix_value"
            :label="$t('i18n_copiar_codigo_pix')"
            name="pix-code"
            class="w-100 p-1"
            disabled
          />
          <button
            class="copy-pix text-uppercase"
            @click="copyURL(depositResponse.payment.pix_value)"
          >
            <span>{{ $t('i18n_copiar_codigo_pix') }}</span>
          </button>
        </div>

        <button
          class="reload-btn text-uppercase mt-2 mb-3"
          @click="redirect()"
        >
          <span class="text-center">{{ $t('i18n_ja_pagou_atualize') }}</span>
        </button>

        <p class="mb-1 label-control text-center fw-bold">
          QR code
        </p>
        <div class="d-flex justify-content-center">
          <img
            class="img-fluid mx-auto"
            style="width: 250px;"
            :src="depositResponse.payment.pix_url"
          >
        </div>
        <div>
          <button
            class="reset-btn text-uppercase my-3"
            @click="$emit('resetModal'), price = ''"
          >
            <span class="text-center">{{ $t('i18n_realizar_um_novo_deposito') }}</span>
          </button>
        </div>
      </div>
    </div>

    <div class="deposit-infos">
      <h6 class="fw-bold">
        info:
      </h6>
      <ul>
        <li>
          <!-- eslint-disable-next-line -->
            <span v-html="$t('i18n_sempre_que_quiser_fazer')" />
        </li>
        <li>
          <!-- eslint-disable-next-line -->
            <span v-html="$t('i18n_nao_deposite_usando_uma_chave')" />
        </li>
        <li>
          <!-- eslint-disable-next-line -->
            <span v-html="$t('i18n_nao_temos_codigo_bonus')" />
        </li>
        <li>
          <!-- eslint-disable-next-line -->
            <span v-html="$t('i18n_nao_use_o_banco_paypal')" />
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { VMoney } from 'v-money'
import SkInput from '@/components/sk/atoms/SkInput'
import ErrorBadge from '@/components/default/atoms/ErrorBadge'

export default {
  name: 'SkDeposit',
  components: {
    SkInput,
    ErrorBadge
  },
  directives: { money: VMoney },
  props: {
    transactionLimit: {
      type: Number,
      default: 0
    },
    depositResponse: {
      type: Object,
      default: () => ({})
    },
    depositErrors: {
      type: Object,
      default: () => ({})
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  emits: [
    'resetModal',
    'submitDeposit'
  ],
  data () {
    return {
      price: '',
      code: '',
      money: {
        decimal: ',',
        thousands: '.',
        prefix: 'R$ ',
        precision: 2
      }
    }
  },
  computed: {
    deposits () {
      const btnsValues = [
        { label: 'R$ 10,00', value: '10,00' },
        { label: 'R$ 20,00', value: '20,00' },
        { label: 'R$ 50,00', value: '50,00' },
        { label: 'R$ 100,00', value: '100,00' },
        { label: 'R$ 200,00', value: '200,00' },
        { label: 'R$ 400,00', value: '400,00' }
      ]

      return btnsValues.filter(value => +value.value.replace(',', '.') >= +this.transactionLimit)
    },
    disableSubmit () {
      return +this.price.substring(3).replace('.', '').replace(',', '.') < this.transactionLimit
    }
  },
  methods: {
    deposit () {
      const payload = {
        method: 'pix',
        amount: +this.price.substring(3).replace('.', '').replace(',', '.'),
        code: this.code,
        bank: null
      }

      this.$emit('submitDeposit', payload)
    },
    async copyURL (mytext) {
      try {
        await this.$copyText(mytext)
      } catch (e) {
        this.$toast.open({ message: e, type: 'warning' })
        return
      }
      this.$toast.open({ message: 'Texto copiado com sucesso', type: 'info' })
    },
    redirect () {
      window.location.reload()
    }
  }
}
</script>

<style lang="scss" scoped>
.sk-deposit {

  .before-submit {
    label {
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
    #amount {
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

    .transaction-min {
      color: var(--fut-secondary);
      font-size: .875rem;
    }

    .deposits-btns {
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
      padding: 10px;
      border-radius: .25rem;
      width: 100%;
      font-size: 1rem;
      font-weight: 700;
      box-shadow: 0rem .0625rem .1875rem #00000033 , 0rem .0625rem .125rem #0000001f;
      color: var(--fut-color-dynamic);

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

  .after-submit {
    .sucess-container {
      line-height: 30px;
      font-size: 11px;
      border: 1px solid #1fff20;
    }

    .section-qr {
      .pix-code {
        display: flex;
        margin: 10px 0;
        align-items: flex-end;

        .copy-pix {
          font-size: 14px;
          border: none;
          background: var(--fut-primary);
          border-radius: .25rem;
          height: 38px;
          margin-bottom: .25rem;

          span {
            white-space: nowrap;
            font-weight: 600;
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

      .reload-btn, .reset-btn {
        display: flex;
        justify-content: center;
        border: none;
        background: var(--fut-primary);
        width: 100%;
        padding: 10px;
        border-radius: .25rem;

        span {
          font-size: .875rem;
          font-weight: 600;
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
  }

  .deposit-infos {
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

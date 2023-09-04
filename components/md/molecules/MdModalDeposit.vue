<template>
  <md-modal
    v-model="modal"
    :width="width <= 425 ? '95%' : '65%'"
    :max-height="width <= 425 ? '90%' : 'auto'"
    close
  >
    <div class="m-body">
      <div class="title" @clicl.stop>
        <h6 class="fw-bold mb-0">
          {{ $t('i18n_deposito', 1) }}
        </h6>
      </div>

      <div class="m-row">
        <div v-if="!depositResponse" class="befere-submit">
          <div class="form">
            <label for="deposit" class="mb-2">{{ $t('i18n_valor_do_deposito') }} ({{ $t('i18n_Depositar_moeda') }})</label>
            <input
              id="deposit"
              v-model="price"
              v-money3="money"
              :validate="errors?errors:{}"
              name="amount"
              type="text"
              :placeholder="$t('i18n_valor_do_deposito')"
            >
            <error-badge name="amount" :validate="errors?errors:{}" />
            <p class="mt-2">
              <font-awesome-icon class="me-2" :icon="['fas', 'info-circle']" />Min: {{ transactionLimit }} BRL
            </p>
            <div class="deposits-btns">
              <md-button
                v-for="(item, idx) in deposits"
                :key="idx"
                padding="10px"
                @click="price = item.value"
              >
                {{ item.label }}
              </md-button>
            </div>
            <label for="bonusCode" class="mt-4 mb-2">{{ $t('i18n_codigo_de_bonus') }}</label>
            <input
              id="bonusCode"
              v-model="code"
              :validate="errors?errors:{}"
              name="code"
              type="text"
              :placeholder="$t('i18n_codigo_de_bonus')"
            >
            <error-badge name="code" :validate="errors?errors:{}" />
            <md-button
              class="submit-btn"
              width="95px"
              padding="10px"
              :disabled="disableSubmit"
              :loading="loading"
              @click="deposit()"
            >
              {{ $t('i18n_depositar') }}!
            </md-button>
          </div>
        </div>

        <div v-else class="after-submit">
          <div class="sucess-container py-1">
            <font-awesome-icon class="text-primary ms-2" :icon="['fas', 'check']" />
            <span>{{ $t('i18n_transacao_bem_sucedida') }}</span>
          </div>

          <div class="section-qr">
            <label class="label-control mt-4">{{ $t('i18n_copiar_codigo_pix') }}</label>

            <div class="pix-code">
              <input
                :value="depositResponse.payment.pix_value"
                class="w-100 p-1"
                disabled
              >
              <md-button
                class="button-deposit text-uppercase"
                width="40%"
                padding="5px"
                @click="copyURL(depositResponse.payment.pix_value)"
              >
                {{ $t('i18n_copiar_codigo_pix') }}
              </md-button>
            </div>

            <div>
              <md-button
                class="text-uppercase mt-2 mb-3"
                :width="width <= 425 ? '100%' : '50%'"
                padding="5px"
                @click="redirect()"
              >
                <span class="text-center">{{ $t('i18n_ja_pagou_atualize') }}</span>
              </md-button>
            </div>

            <p class="mb-1 label-control">
              QR code
            </p>
            <img class="img-fluid" style="width: 250px;" :src="depositResponse.payment.pix_url" alt="">
            <div>
              <md-button
                class="text-uppercase mt-2 mb-3"
                :width="width <= 425 ? '100%' : '50%'"
                padding="5px"
                @click="$emit('resetModal'), price = ''"
              >
                <span class="text-center">{{ $t('i18n_realizar_um_novo_deposito') }}</span>
              </md-button>
            </div>
          </div>
        </div>

        <div class="m-infos">
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
    </div>
  </md-modal>
</template>

<script>
import { Money3Directive } from 'v-money3'
import MdModal from '@/components/md/atoms/MdModal.vue'
import MdButton from '@/components/md/atoms/MdButton.vue'
import windowWidth from '~/mixins.js/windowWidth'

export default {
  name: 'MdModalDeposit',
  components: {
    MdButton,
    MdModal
  },
  directives: { money3: Money3Directive },
  mixins: [windowWidth],
  props: {
    value: {
      type: Boolean,
      default: false
    },
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
    modal: {
      get () {
        return this.value
      },
      set (value) {
        this.price = ''
        this.code = ''

        this.$emit('input', value)
      }
    },
    disableSubmit () {
      return +this.price.substring(3).replace('.', '').replace(',', '.') < this.transactionLimit
    },
    errors () {
      return this.depositErrors
    },
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
.m-body {
  color: var(--md-font-color);
  width: 100%;
  height: 100%;
  .title {
    padding: 20px;
    border-bottom: 1px solid var(--md-comp-border-color);
  }
  .m-row {
    display: flex;
    .befere-submit {
      display: flex;
      width: 70%;
      .form {
        width: 100%;
        padding: 20px;
        display: flex;
        flex-direction: column;
        input {
          padding: 6px 15px 4px 15px;
          border: 1px solid var(--md-comp-border-color);
          background: var(--md-comp-bg-color);
          color: var(--md-font-color);
          box-shadow: 0 0 0 0;
        }
        .deposits-btns {
          display: flex;
          button {
            margin: 10px;
          }
        }
        .submit-btn {
          margin-top: 30px;
        }
      }
    }
    .after-submit {
      width: 70%;
      padding: 20px;
      color: var(--md-font-color);
      .sucess-container {
        line-height: 30px;
        font-size: 11px;
        border: 1px solid var(--fut-primary);
      }
      .section-qr {
        .pix-code {
          display: flex;
          margin: 10px 0;
          input {
            padding: 6px 15px 4px 15px;
            border: 1px solid var(--md-comp-border-color);
            background: var(--md-comp-bg-color);
            color: var(--md-font-color);
            box-shadow: 0 0 0 0;
          }
          .button-deposit {
            font-size: 14px;
          }
        }
      }
    }
    .m-infos {
      width: 30%;
      margin: 20px;
      color: var(--md-font-color);
      background: var(--md-payment-bg-color);
      border: 3px solid var(--md-comp-border-color);
      border-radius: 5px;
      padding: 10px;
      height: 100%;
      overflow: auto;
      ul {
        color: var(--md-menu-idx-font-color);
        padding-left: 15px;
        li {
          margin-bottom: 8px;
          span {
            font-size: 11px;
            line-height: 16px;
          }
        }
      }
    }
  }
}

@media (max-width: 1114px) {
  .deposits-btns {
    flex-wrap: wrap;
    font-size: 14px;
    button {
      margin: 10px 10px 0 0 !important;
    }
  }
}

@media (max-width: 768px) {
  .m-body {
    position: relative;
    display: block;
  }
  .m-row {
    max-height: calc(90vh - 62px) !important;
    overflow: auto;
    flex-direction: column;
    align-items: center;
    .befere-submit {
      width: 100% !important;
      .deposits-btns {
        font-size: 12px;
      }
    }
    .after-submit {
      width: 100% !important;
    }
    .m-infos {
      width: 90% !important;
      margin: 0 0 20px 0 !important;
      overflow: initial !important;
    }
  }
}
</style>

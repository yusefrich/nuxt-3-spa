<template>
  <div class="section-input ms-0 px-3">
    <div v-if="!depositResponse" class="section-input-content">
      <div class="mt-1">
        <label class="label-control fut-color-dynamic">{{ $t('i18n_valor') }}</label>
        <div class="d-flex align-items-center fut-color-dynamic">
          <input
            v-model.lazy="price"
            v-money="money"
            class="input-control w-100 fut-color-dynamic"
            :validate="errors?errors:{}"
            name="amount"
            type="text"
          >
          <div class="prefix-container">
            <span>R$</span>
          </div>
        </div>
        <error-badge name="amount" :validate="errors?errors:{}" />
      </div>
      <div class="mt-2">
        <label class="label-control fut-color-dynamic">{{ $t('i18n_codigo_de_bonus') }}</label>
        <input
          v-model="payload.code"
          :validate="errors?errors:{}"
          class="input-control w-100 fut-color-dynamic"
          name="code"
          type="text"
        >
        <error-badge name="code" :validate="errors?errors:{}" />
      </div>
      <div>
        <fb-fut-button
          class="button-deposit text-uppercase text-background"
          :class="{'btn-fb-rounded-secondary': font === 'dark'}"
          :loading="loading"
          :disabled="depositLimitMin ? +getRawPrice(price) < depositLimitMin : +getRawPrice(price) < 1"
          @click="deposit"
        >
          {{ $t('i18n_deposito', 1) }}
        </fb-fut-button>
      </div>
    </div>
    <div v-if="depositResponse">
      <div class="px-3 mt-3">
        <div class="sucess-container py-1">
          <font-awesome-icon class="text-primary ms-2" :icon="['fas', 'check']" />
          <span>{{ $t('i18n_transacao_bem_sucedida') }}</span>
        </div>
        <div class="section-qr">
          <label v-if="ctype === 'pix'" class="label-control mt-4">{{ $t('i18n_copiar_codigo_pix') }}</label>
          <input
            v-if="ctype === 'pix'"
            v-model="depositResponse.payment.pix_value"
            class="input-control w-100 mt-2 p-1"
            disabled
            >
          <fb-fut-button
            v-if="ctype === 'pix'"
            class="button-deposit text-uppercase w-100"
            @click="copyURL(depositResponse.payment.pix_value)"
          >
            {{ $t('i18n_copiar_codigo_pix') }}
          </fb-fut-button>
          <p v-if="ctype === 'pix'" class="mb-1 label-control">
            QR code
          </p>
          <img
            v-if="ctype === 'pix'"
            class="img-fluid"
            style="width: 250px;"
            :src="depositResponse.payment.pix_url"
            alt=""
          >
          <span style="font-size: 13px;" class="text-white fut-color-dynamic">
            {{ $t('i18n_continuidade_pagamento') }}
          </span>
          <div class="text-center mt-4">
            <fb-fut-button v-if="ctype === 'picpay'" class="a-deposit text-uppercase w-100" target="_blank" :to="depositResponse.payment.pix_picpay" external>
              <span class="text-center">
                {{ $t('i18n_abrir_qrcode') }} <font-awesome-icon class="icon" :icon="['fas', 'sign-in-alt']" />
              </span>
            </fb-fut-button>
            <fb-fut-button v-if="ctype === 'credito'" class="button-deposit text-uppercase w-100" @click="redirectUser(depositResponse.payment.form_url)">
              <span class="text-center">
                {{ $t('i18n_abrir_qrcode') }} <font-awesome-icon class="icon" :icon="['fas', 'sign-in-alt']" />
              </span>
            </fb-fut-button>
            <fb-fut-button class="a-deposit text-uppercase w-100"  to="/user/bank/deposito">
              <span class="text-center" style="white-space: break-spaces">{{ $t('i18n_ja_pagou_atualize') }}</span>
            </fb-fut-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { VMoney } from 'v-money'
import ErrorBadge from '@/components/default/atoms/ErrorBadge.vue'
import FbFutButton from '@/components/fb/atoms/FbFutButton.vue'

export default {
  components: { FbFutButton, ErrorBadge },
  directives: { money: VMoney },
  props: {
    font: {
      type: String,
      default: null
    },
    ctype: {
      type: String,
      default: null
    },
    depositLimitMin: {
      type: Number,
      default: null
    },
    response: {
      type: Object,
      default: () => ({})
    },
    responseErrors: {
      type: Object,
      default: () => ({})
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  emits: [
    'submit'
  ],
  data () {
    return {
      money: {
        decimal: ',',
        thousands: '.',
        prefix: 'R$ ',
        precision: 2,
        masked: false /* doesn't work with directive */
      },
      price: '',
      bankOptions: [{ value: 8, label: 'Santander' }, { value: 14, label: 'Bradesco' }, { value: 15, label: 'Caixa Econômica' }],
      payload: {
        method: 'pix',
        amount: 0,
        code: null,
        bank: null
      }
    }
  },
  computed: {
    depositResponse () {
      return this.response
    },
    errors () {
      return this.responseErrors
    }
  },
  methods: {
    redirectUser (link) {
      window.location.replace(link)
    },
    depositDisabled () {
      return process.env.DISABLE_DEPOSIT === 'true'
    },
    manualDeposit () {
      return process.env.MANUAL_DEPOSIT === 'true'
    },
    manualPix () {
      return process.env.MANUAL_PIX
    },
    manualCpf () {
      return process.env.MANUAL_CPF
    },
    manualHolder () {
      return process.env.MANUAL_HOLDER
    },
    manualBank () {
      return process.env.MANUAL_BANK
    },
    async copyURL (mytext) {
      try {
        await this.$copyText(mytext)
      } catch (e) {
        // console.error(e)
        this.$toast.open({ message: e, type: 'warning' })
        return
      }
      this.$toast.open({ message: 'Texto copiado com sucesso', type: 'info' })
    },
    getRawPrice (price) {
      let currentPrice = price.replace(/\./g, '')
      currentPrice = currentPrice.replace(',', '.')
      currentPrice = currentPrice.replace('R$ ', '')
      return currentPrice
    },
    deposit () {
      this.payload.amount = +this.getRawPrice(this.price)
      this.$emit('submit', this.payload)
    }
  }
}
</script>
<style lang="scss" scoped>
@import '@/assets/layout/breakpoints';

*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: Arial, "Helvetica Neue", Helvetica, sans-serif;
}
.section-qr {
  width: 250px;
  @include _md {
    width: 100%;
    text-align: center;
  }
}
.sucess-container {
  line-height: 30px;
  font-size: 11px;
  border: 1px solid var(--fut-primary);
}
.section-input-content {
  @include md{
    max-width: 400px;
  }
  margin-left: auto;
  margin-right: auto;
}
.section-input {
  color: white;
  border-bottom: 1px solid var(--fut-background-darkest);
  overflow-x: hidden;
  margin: 0;
  background-color: var(--fut-background-black);
  @include md {
    border-left: 1px solid var(--fut-background-darkest);
    width: 70%;
    background-color: var(--fut-background-lighter);
  }
}
.label-control {
  color: white;
  font-size: 13px;
  @include md {
    font-size: 11px;
  }
  width: 100%;
}
.input-control {
  background-color: transparent;
  outline: none;
  border: none;
  color: white;
  height: 35px;
  font-size: 13px;
  background-color: var(--fut-background-darker);
  @include md {
    background-color: var(--fut-background-darker);
  }
  &::placeholder {
    color: white;
    @include md {
      color: white;
      font-weight: normal;
    }
  }
  &:focus {
    border: 2px solid var(--fut-primary);
  }
}
.a-deposit {
  span {
    vertical-align: -webkit-baseline-middle;
  }
  background-image: linear-gradient(
    to right,
    var(--fut-primary),
    var(--fut-secondary)
  );
  border: none;
  margin: 5% 0;
  font-size: 13px;
  font-weight: bold;
  min-width: 180px;
  text-align: center;
  white-space: nowrap;
  height: 35px;
  @include _md {
    width: 100%;
  }
}
.button-deposit {
  background-image: linear-gradient(
    to right,
    var(--fut-primary),
    var(--fut-secondary)
  );
  border: none;
  margin: 5% 0;
  font-size: 13px;
  font-weight: bold;
  min-width: 180px;
  text-align: center;
  white-space: nowrap;
  height: 35px;
  @include _md {
    width: 100%;
  }
}
.prefix-container{
  background-color: var(--fut-background-lightest);
  height: 35px;
  float: left;
  line-height: 35px;
  text-align: center;
  width: 20%;
  font-size: 12px;
}
.btn-fb-rounded-secondary{
  background: var(--fut-secondary);
  border-radius: 40px;
  padding: 10px 20px;
  color: white !important;
}
</style>

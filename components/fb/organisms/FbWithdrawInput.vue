<template>
  <div
    v-if="(validWithdrawTime && midnightBlock === 1) || midnightBlock === 0"
    class="section-input text-white px-2"
  >
    <form class="container-section-input mx-auto" @submit.prevent="withdraw">
      <span class="label-control">{{ $t('i18n_selecione_a_chave_pix') }}:</span>
      <div class="container mb-3 mt-1">
        <div class="d-flex align-items-center">
          <div>
            <div
              v-for="(type, idx) in pixTypes"
              :key="idx"
              class="d-flex align-items-center mb-2"
            >
              <input
                v-if="type !== 'CPF' ? checkWithdrawKey() : true"
                id="fut-radio-2"
                v-model="payload.type"
                class="input-control me-2 fut-color-dynamic"
                :value="type"
                type="radio"
                name="fut-radio"
              >
              <label
                v-if="type !== 'CPF' ? checkWithdrawKey() : true"
                class="label-control fut-color-dynamic"
                for="fut-radio-2"
              >
                {{ type }} : {{ pixTexts[type] }}
              </label>
            </div>
          </div>
        </div>
      </div>
      <div>
        <label class="label-control">{{ $t('i18n_valor') }}</label>
        <div class="d-flex align-items-center">
          <fb-input
            v-model.lazy="price"
            v-money="money"
            :info="'Valor precisa ser acima de ' + localString(withdrawLimitMin)"
            :validate="errors?errors:{}"
            class="py-2 w-100 fut-color-dynamic"
            name="amount"
            type="text"
          />
          <div class="prefix-container text-center text-white fut-color-dynamic">
            <span>R$</span>
          </div>
        </div>
      </div>
      <fb-fut-button
        :disabled="getRawPrice(price) < +withdrawLimitMin || (withdrawLimitMax ? (getRawPrice(price) > +withdrawLimitMax) : (getRawPrice(price) > getInfinity)) || !payload.type"
        :class="{'btn-fb-rounded-secondary': font === 'dark'}"
        type="submit"
        :loading="loading"
        class="button-saque text-uppercase text-white"
      >
        {{ $t('i18n_solicitar_saque') }}
      </fb-fut-button>
    </form>
    <div v-if="withdrawResponse" class="container-section-input mx-auto mt-4 response-container">
      <fa class="text-success me-2" :icon="['fas', 'check']" />
      <small v-if="canWithdraw" class="fut-color-dynamic">{{ $t('i18n_transacao_enviada_para') }}</small>
      <small v-else class="fut-color-dynamic">{{ $t('i18n_transacao_criada_e_pendente') }}</small>
    </div>
  </div>
  <div v-else class="section-input text-white px-2 text-center fut-color-dynamic">
    <fa class="icon text-warning fut-color-dynamic me-1 py-3" style="font-size: 40px" :icon="['fas', 'info-circle']" />
    <h5><small>{{ $t('i18n_saque_indisponivel_durante') }}</small></h5>
  </div>
</template>

<script>
import { VMoney } from 'v-money'
import FbFutButton from '@/components/fb/atoms/FbFutButton.vue'
import FbInput from '@/components/fb/atoms/FbInput.vue'

export default {
  name: 'FbWithdrawInput',
  components: {
    FbFutButton,
    FbInput
  },
  directives: { money: VMoney },
  props: {
    response: {
      type: Object,
      default: () => ({})
    },
    font: {
      type: String,
      default: null
    },
    midnightBlock: {
      type: Number,
      default: 0
    },
    canWithdraw: {
      type: Number,
      default: null
    },
    withdrawLimitMin: {
      type: Number,
      default: null
    },
    withdrawLimitMax: {
      type: Number,
      default: null
    },
    document: {
      type: String,
      default: ''
    },
    phone: {
      type: String,
      default: ''
    },
    email: {
      type: String,
      default: ''
    },
    responseErrors: {
      type: Object,
      default: () => ({})
    },
    loading: {
      type: Boolean,
      default: false
    },
    pixTypes: {
      type: Array,
      default: () => ([])
    }
  },
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
      bankOptions: [
        { value: 8, label: 'Santander' },
        { value: 14, label: 'Bradesco' },
        { value: 15, label: 'Caixa Econômica' }
      ],
      payload: {
        method: 'pix',
        amount: 0,
        type: null,
        pix: ''
      },
      warning: false
    }
  },
  computed: {
    errors () {
      return this.responseErrors
    },
    withdrawResponse () {
      return this.response
    },
    validWithdrawTime () {
      return new Date().getHours() > 7 && new Date().getHours() <= 23
    },
    getInfinity () {
      return Number.POSITIVE_INFINITY
    },
    pixTexts () {
      return {
        CPF: this.$t('i18n_sera_utilizado_o_cpf'),
        EMAIL: this.$t('i18n_sera_utilizado_o_email'),
        PHONE: this.$t('i18n_sera_utilizado_o_celular')
      }
    }
  },
  watch: {
    'payload.type' (newVal) {
      this.payload.pix = ''

      if (newVal === 'CPF') {
        this.payload.pix = this.document
      } else if (newVal === 'PHONE') {
        this.payload.pix = this.phone
      } else if (newVal === 'EMAIL') {
        this.payload.pix = this.email
      }
    }
  },
  methods: {
    checkWithdrawKey () {
      if (process.env.PIX_KEY_CPF && process.env.PIX_KEY_CPF === 'true') {
        this.payload.type = 'CPF'
        return false
      }

      return true
    },
    localString (value) {
      const number = +value

      return number.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
    },
    getRawPrice (price) {
      let currentPrice = price.replace(/\./g, '')
      currentPrice = currentPrice.replace(',', '.')
      currentPrice = currentPrice.replace('R$ ', '')

      return currentPrice
    },
    withdraw () {
      this.payload.amount = +this.getRawPrice(this.price)

      this.$emit('submit', this.payload)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/layout/breakpoints";

*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: Arial, "Helvetica Neue", Helvetica, sans-serif;
}
.section-input {
  color: white;
  border-bottom: 1px solid var(--fut-background-darkest);
  overflow-x: hidden;
  margin: 0;
  background-color: var(--fut-background-black);
  @include md {
    border-left: 1px solid var(--fut-background-darkest);
    width: 100%;
    background-color: var(--fut-background-lighter);
  }
}
.container-section-input {
  @include md{
    max-width: 300px;
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
  width: 30px;
  height: 30px;
  @include md {
    width: 18px;
    height: 18px;
  }
}
.input-control-radio[type="radio"] {
  width: 25px;
  height: 25px;
  vertical-align: middle;
  @include md {
    width: auto;
  }
}
.button-saque {
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
.response-container{
  font-size: 11px;
  border: 1px solid #72996D;
  padding: 10px 20px;
}
.btn-fb-rounded-secondary{
  background: var(--fut-secondary);
  border-radius: 40px;
  padding: 10px 20px;
  color: white !important;
}
</style>

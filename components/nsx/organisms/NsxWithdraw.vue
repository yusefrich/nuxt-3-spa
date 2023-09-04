<template>
  <div v-if="(validWithdrawTime && currentSettings.block_wd_midnight === 1) || currentSettings.block_wd_midnight === 0" class="deposit-content">
    <h5 class="text-start pt-3">
      {{ $t('i18n_saque', 1) }}
    </h5>
    <div class="p-4 pt-1">
      <div class="row">
        <div class="col-md-6 mb-2">
          <label class="text-start"><span class="required" />{{ $t('i18n_banco') }}</label>
          <fut-select
            value="PIX"
            :nsx-input="true"
            :validate="errors?errors:{}"
            :options="[{value: 'PIX', label: 'PIX'}]"
            name="country"
            nsx-validation
            class="mx-0"
          />
        </div>
        <div class="col-md-6" />
        <div v-if="getCurrentPixKeys().length" class="col-md-6 mb-2">
          <label class="text-start"><span class="required" />{{ $t('i18n_tipo_de_chave_pix') }}</label>

          <fut-select
            v-model="payload.type"
            :nsx-input="true"
            :validate="errors?errors:{}"
            :options="getCurrentPixKeys()"
            :placeholder="$t('i18n_selecione')"
            nsx-validation
            name="type"
            class="mx-0"
          />
        </div>
        <div class="col-md-6 mb-2">
          <label class="text-start"><span class="required" />{{ $t('i18n_chave_pix') }}</label>
          <fut-input
            v-if="!withdrawResponse"
            v-model="payload.pix"
            :validate="errors?errors:{}"
            :disabled="!checkIfWithdrawOpen()"
            :nsx-input="true"
            name="pix"
            nsx-validation
            type="email"
            class="mx-0"
          />
        </div>
        <div class="col-md-6 mb-2">
          <label class="text-start"><span class="required" />{{ $t('i18n_nome') }}</label>
          <fut-input
            :validate="errors?errors:{}"
            :value="loggedInUser.name"
            :readonly="true"
            :nsx-input="true"
            name="name"
            nsx-validation
            type="text"
            class="mx-0"
          />
        </div>
        <div class="col-md-6 mb-2">
          <label class="text-start"><span class="required" />CPF</label>
          <fut-input
            :validate="errors?errors:{}"
            :value="loggedInUser.player.document"
            :readonly="true"
            :nsx-input="true"
            name="doc"
            nsx-validation
            type="text"
            class="mx-0"
          />
        </div>
        <div class="col-md-6 mb-2">
          <label for="amount">{{ $t('i18n_valor') }}</label>
          <fut-input
            v-if="!withdrawResponse"
            v-model.lazy="price"
            v-money3="money"
            :validate="errors?errors:{}"
            :nsx-input="true"
            nsx-validation
            name="amount"
            type="text"
            class="mx-0"
          />
        </div>
      </div>
    </div>
    <div v-if="!withdrawResponse" class="text-end">
      <nsx-fut-button
        v-if="currentSettings"
        :loading="bankLoading"
        :disabled="!payload.type || getRawPrice(price) < +currentSettings.wd_limit_min || (currentSettings.wd_limit_max ? (getRawPrice(price) > +currentSettings.wd_limit_max) : (getRawPrice(price) > getInfinity))"
        class="nsx-button"
        @click="withdraw()"
      >
        {{ $t('i18n_solicitar_saque') }}
      </nsx-fut-button>
    </div>
    <div v-if="withdrawResponse" class="text-center">
      <h4 class="text-center">
        {{ $t('i18n_saque_realizado_com_sucesso') }}
      </h4>
      <nsx-fut-button class="nsx-button" @click="$emit('cleanDepositResponse')">
        {{ $t('i18n_novo_saque') }}
      </nsx-fut-button>
    </div>
    <div class="warning">
      <h5 class="text-center">
        <strong>{{ $t('i18n_atencao').toUpperCase() }}</strong>
      </h5>
      <ol class="warning-content" style="margin: 0;padding-left: 2rem;">
        <li>
          {{ $t('i18n_e_obrigatorio_que_o_titular') }}
        </li>
        <li>
          {{ $t('i18n_para_solicitar_o_saque') }}
        </li>
        <li>
          {{ $t('i18n_so_e_efetuado_um_saque') }}
        </li>
        <li v-if="currentSettings">
          {{ $t('i18n_valor_minimo_para_saque') }} {{ localString(currentSettings.wd_limit_min) }}
        </li>
        <li v-if="currentSettings && currentSettings.wd_limit_max">
          {{ $t('i18n_valor_maximo_para_saque') }} {{ localString(currentSettings.wd_limit_max) }}
        </li>
      </ol>
    </div>
    <fut-modal class="text-center" fixed :open="warning" :title="$t('i18n_saque_pendente')">
      <p>
        {{ $t('i18n_seu_saque_se_encontra') }}
      </p>
      <nsx-fut-button primary rounded class="fw-bold" @click="warning=false">
        {{ $t('i18n_continuar') }}
      </nsx-fut-button>
    </fut-modal>
  </div>
  <div v-else class="text-center">
    <font-awesome-icon class="icon text-warning fut-color-dynamic me-1 py-3" style="font-size: 40px" :icon="['fas', 'info-circle']" />
    <h5><small>Saque Indisponível durante as 23:59 e 08:00</small></h5>
  </div>
</template>

<script>
import { Money3Directive } from 'v-money3'
import NsxFutButton from '@/components/nsx/atoms/NsxFutButton.vue'
import FutInput from '@/components/default/atoms/FutInput.vue'
import FutModal from '@/components/default/organisms/FutModal.vue'
import FutSelect from '@/components/default/atoms/FutSelect.vue'

export default {
  name: 'NsxWithdraw',
  components: {
    FutInput,
    NsxFutButton,
    FutModal,
    FutSelect
  },
  directives: { money3: Money3Directive },
  props: {
    currentSettings: {
      type: Object,
      default: () => ({})
    },
    loggedInUser: {
      type: Object,
      default: () => ({})
    },
    bankLoading: {
      type: Boolean,
      default: false
    },
    withdrawResponse: {
      type: Object,
      default: () => ({})
    },
    errors: {
      type: Object,
      default: () => ({})
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
      payload: {
        method: 'pix',
        amount: 0,
        /* eslit-disable-next-line */
        type: null,
        pix: ''
      },
      warning: false
    }
  },
  computed: {
    getInfinity () {
      return Number.POSITIVE_INFINITY
    },
    validWithdrawTime () {
      return new Date().getHours() > 7 && new Date().getHours() <= 23
    }
  },
  watch: {
    'payload.type' (newVal) {
      this.payload.pix = ''

      if (newVal === 'CPF') {
        this.payload.pix = this.loggedInUser.player.document
      } else if (newVal === 'PHONE') {
        this.payload.pix = this.loggedInUser.phone
      } else if (newVal === 'EMAIL') {
        this.payload.pix = this.loggedInUser.email
      }
    }
  },
  methods: {
    checkIfWithdrawOpen () {
      return process.env.OPEN_PIX_FIELD === 'true'
    },
    localString (value) {
      const number = +value
      return number.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
    },
    getCurrentPixKeys () {
      if (process.env.PIX_KEY_CPF) {
        return [{ value: 'CPF', label: 'CPF' }]
      }

      return this.pixTypes.map(item => ({
        value: item,
        label: item
      }))
    },
    getRawPrice (price) {
      let currentPrice = price.replace(/\./g, '')
      currentPrice = currentPrice.replace(',', '.')
      currentPrice = currentPrice.replace('R$ ', '')

      return currentPrice
    },
    withdraw () {
      this.payload.amount = this.getRawPrice(this.price)

      if (this.payload.amount <= 0) {
        this.$toast.open({ message: 'Insira um valor válido para o saque!', type: 'error' })
        return
      }

      if (this.payload.method === 'boleto' && this.payload.amount < 30) {
        this.$toast.open({ message: 'Insira um valor válido para o saque!', type: 'error' })
        return
      }

      const rawPayload = {
        method: this.payload.method,
        amount: this.payload.amount
      }

      if (this.payload.method === 'transferencia') {
        rawPayload.bank = +this.payload.bank
      }

      if (this.payload.method === 'pix') {
        rawPayload.type = this.payload.type
        rawPayload.pix = this.payload.pix
      }

      this.$emit('submitWithdraw', rawPayload)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/layout/breakpoints";
@import "@/assets/layout/variables";

.active{
  background-color: var(--white);
}
.btn-deposit{
  border-radius: 10px !important;
}
.img-deposit{
  width: 100%;
  max-width: 90px;
  height: auto;
}
.nsx-button{
  background: linear-gradient(#ff8800,#ff6600);
  color: #fff;
  border: none;
  font-weight: 400;
  vertical-align: middle;
  border-radius: 5px !important;
  font-size: 14px;
  padding: 2px 10px;
  white-space: nowrap;
}
label{
  font-size: 13.3px;
}
.warning{
  h5{
    font-size: 13.3px;
  }
  .warning-content{
    background-color: #dbdbdb;
    border-radius: 5px;
    padding: 0.7rem;
    font-size: 13.3px;
  }
}
</style>

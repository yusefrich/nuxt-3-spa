<template>
  <div v-if="(validWithdrawTime && midnightBlock === 1) || midnightBlock === 0" class="withdraw-content p-4">
    <div class="d-flex justify-content-center mb-3">
      <fut-button
        :disabled="withdrawResponse"
        :class="{active: payload.method === 'pix'}"
        class="mx-2 btn-withdraw"
        @click="payload.method = 'pix'"
      >
        <font-awesome-icon v-if="payload.method === 'pix'" class="icon text-primary me-1" :icon="['fas', 'circle']" />
        <font-awesome-icon v-else class="icon text-white me-1" :icon="['far', 'circle']" />
        <img src="/img/pix.png" class="img-withdraw" alt="">
      </fut-button>
    </div>
    <div v-if="payload.method === 'transferencia'">
      <h4 class="text-center fut-color-dynamic">
        {{ $t('i18n_saque_por_transferencia_bancaria') }}
      </h4>
      <p class="text-center fut-color-dynamic">
        {{ $t('i18n_em_desenvolvimento') }}
      </p>
    </div>
    <div v-if="payload.method === 'pix'">
      <h4 class="text-center fut-color-dynamic">
        {{ $t('i18n_saque_por_pix') }}
      </h4>
      <ul>
        <li class="fut-color-dynamic">
          {{ $t('i18n_para_solicitar_o_saque') }}
        </li>
        <li class="fut-color-dynamic">
          {{ $t('i18n_tempo_de_processamento') }}: {{ $t('i18n_instantaneo') }}*
          <br>
          <small class="fut-color-dynamic">*{{ $t('i18n_apos_validacao_de_documentos') }}</small>
        </li>
        <li v-if="withdrawLimitMin" class="fut-color-dynamic">
          Min: {{ localString(withdrawLimitMin) }}
        </li>
        <li v-if="withdrawLimitMax" class="fut-color-dynamic">
          Max: {{ localString(withdrawLimitMax) }}
        </li>
      </ul>
      <label v-if="!withdrawResponse" for="amount" class="fut-color-dynamic">{{ $t('i18n_valor') }}</label>
      <fut-input
        v-if="!withdrawResponse"
        v-model.lazy="price"
        v-money3="money"
        :info="'Valor precisa ser acima de ' + localString(withdrawLimitMin)"
        :validate="errors?errors:{}"
        name="amount"
        type="text"
        class="mx-0 mb-3 mt-2"
      />
      <div v-if="!withdrawResponse">
        <div
          v-for="(type, idx) in pixTypes"
          :key="idx"
          class="form-check"
        >
          <input
            id="fut-radio-2"
            v-model="payload.type"
            class="form-check-input"
            :value="type"
            type="radio"
            name="fut-radio"
          >
          <label
            class="form-check-label fut-color-dynamic"
            for="fut-radio-2"
          >
            {{ type }}
          </label>
        </div>
      </div>
      <div v-if="!withdrawResponse">
        <div v-if="payload.type === 'EMAIL'">
          <label for="pix" class="fut-color-dynamic">{{ $t('i18n_seu_pix') }}</label>
          <fut-input
            v-model="payload.pix"
            :validate="errors?errors:{}"
            :disabled="true"
            name="pix"
            type="email"
            class="mx-0 mb-3 mt-2"
          />
        </div>
        <div v-if="payload.type === 'PHONE'">
          <label for="pix" class="fut-color-dynamic">{{ $t('i18n_seu_pix') }}</label>
          <fut-input
            v-model="payload.pix"
            :disabled="true"
            name="pix"
            type="text"
            class="mx-0 mb-3 mt-2"
          />
        </div>
        <div v-if="payload.type === 'CPF'">
          <label for="pix" class="fut-color-dynamic">{{ $t('i18n_seu_pix') }}</label>
          <fut-input
            v-model="payload.pix"
            :disabled="true"
            name="pix"
            type="text"
            class="mx-0 mb-3 mt-2"
          />
        </div>
      </div>
      <div v-if="user && user.bonus" class="mt-3">
        <div>
          <p class="mb-0 text-white badge bg-danger fut-color-dynamic">
            {{ $t('i18n_atencao').toUpperCase() }}!
          </p>
        </div>
        <input id="bonus-check" v-model="payload.bonus" type="checkbox">
        <label
          for="bonus-check"
          class="text-white fut-color-dynamic"
        >
          {{ $t('i18n_existe_um_bonus_ativo') }}
        </label>
      </div>
      <div v-if="!withdrawResponse" class="text-end">
        <fut-button
          v-if="withdrawLimitMin"
          :disabled="!payload.type || getRawPrice(price) < +withdrawLimitMin || (withdrawLimitMax ? (getRawPrice(price) > +withdrawLimitMax) : (getRawPrice(price) > getInfinity))"
          :loading="loading"
          :primary="true"
          class="text-white"
          @click="withdraw"
        >
          {{ $t('i18n_sacar') }}
        </fut-button>
      </div>
      <div v-if="withdrawResponse" class="text-center">
        <h4 class="text-center fut-color-dynamic">
          {{ $t('i18n_saque_realizado_com_sucesso') }}
        </h4>
        <fut-button :primary="true" class="text-white" @click="$emit('clearResponse')">
          {{ $t('i18n_novo_saque') }}
        </fut-button>
      </div>
    </div>
    <div v-if="payload.method === 'boleto'">
      <h4 class="text-center fut-color-dynamic">
        {{ $t('i18n_saque_por_boleto') }}
      </h4>
      <p class="text-center fut-color-dynamic">
        {{ $t('i18n_em_desenvolvimento') }}
      </p>
    </div>
    <fut-modal class="text-center" fixed :open="warning" :title="$t('i18n_saque_pendente')">
      <p class="fut-color-dynamic">
        {{ $t('i18n_seu_saque_se_encontra') }}
      </p>
      <fut-button primary rounded class="fw-bold" @click="warning=false">
        {{ $t('i18n_continuar') }}
      </fut-button>
    </fut-modal>
  </div>
  <div v-else class="text-center">
    <font-awesome-icon class="icon text-warning fut-color-dynamic me-1 py-3" style="font-size: 40px" :icon="['fas', 'info-circle']" />
    <h5 class="fut-color-dynamic">
      <small>Saque Indisponível durande as 23:59 e 08:00</small>
    </h5>
  </div>
</template>

<script>
import { Money3Directive } from 'v-money3'
import FutButton from '@/components/default/atoms/FutButton.vue'
import FutInput from '@/components/default/atoms/FutInput.vue'
import FutModal from '@/components/default/organisms/FutModal.vue'

export default {
  name: '',
  components: {
    FutInput,
    FutButton,
    FutModal
  },
  directives: { money3: Money3Directive },
  props: {
    response: {
      type: Object,
      default: () => ({})
    },
    midnightBlock: {
      type: Number,
      default: 0
    },
    user: {
      type: Object,
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
      bankOptions: [{ value: 8, label: 'Santander' }, { value: 14, label: 'Bradesco' }, { value: 15, label: 'Caixa Econômica' }],
      payload: {
        method: 'pix',
        amount: 0,
        type: null,
        bonus: false,
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
        this.payload.pix = this.document
      } else if (newVal === 'PHONE') {
        this.payload.pix = this.phone
      } else if (newVal === 'EMAIL') {
        this.payload.pix = this.email
      }
    }
  },
  methods: {
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
      this.payload.amount = this.getRawPrice(this.price)
      this.$emit('submit', this.payload)
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
.btn-withdraw{
  border-radius: 10px !important;
}
.img-withdraw{
  width: 100%;
  max-width: 90px;
  height: auto;
}
</style>

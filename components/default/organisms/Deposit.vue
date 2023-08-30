<template>
  <div v-if="!depositDisabled()">
    <div v-if="!manualDeposit()" class="deposit-content">
      <div class="d-flex justify-content-center mb-3">
        <div v-if="!availableMethods || (availableMethods && availableMethods.includes('pix'))" class="text-center">
          <fut-button :disabled="depositResponse !== null" class="mx-2 btn-deposit" :class="{active: payload.method === 'pix'}" @click="payload.method = 'pix'">
            <img src="/payments/pix_cor_sborda.png" class="img-deposit" alt="">
          </fut-button>
          <br>
          <font-awesome-icon v-if="payload.method === 'pix'" class="icon text-primary me0" :icon="['fas', 'circle']" />
          <font-awesome-icon v-else class="icon text-white me-1" :icon="['far', 'circle']" />
        </div>
        <div v-if="availableMethods && availableMethods.includes('picpay')" class="text-center">
          <fut-button :disabled="depositResponse !== null" class="mx-2 btn-deposit" :class="{active: payload.method === 'picpay'}" @click="payload.method = 'picpay'">
            <img src="/payments/picpay.png" class="img-deposit" style="height: 35px; object-fit: contain;" alt="">
          </fut-button>
          <br>
          <font-awesome-icon v-if="payload.method === 'picpay'" class="icon text-primary me-1" :icon="['fas', 'circle']" />
          <font-awesome-icon v-else class="icon text-white me-1" :icon="['far', 'circle']" />
        </div>
        <div v-if="availableMethods && availableMethods.includes('credito')" class="text-center">
          <fut-button :disabled="depositResponse !== null" class="mx-2 btn-deposit" :class="{active: payload.method === 'credito'}" @click="payload.method = 'credito'">
            <img src="/payments/credito.png" class="img-deposit" style="height: 35px; object-fit: contain; width: 90px;" alt="">
          </fut-button>
          <br>
          <font-awesome-icon v-if="payload.method === 'credito'" class="icon text-primary me-1" :icon="['fas', 'circle']" />
          <font-awesome-icon v-else class="icon text-white me-1" :icon="['far', 'circle']" />
        </div>
      </div>
      <div v-if="payload.method === 'credito'">
        <h4 class="text-center fut-color-dynamic">
          {{ $t('i18n_deposito_por_credito') }}
        </h4>
        <ul>
          <li class="fut-color-dynamic">
            {{ $t('i18n_tempo_de_processamento') }}: {{ $t('i18n_ate') }} 30 min
          </li>
          <li class="fut-color-dynamic">Min: R$ {{ depositLimitMin ? depositLimitMin : 1 }}</li>
        </ul>
        <div v-if="!depositResponse">
          <fut-input
            v-model.lazy="price"
            v-money3="money"
            :validate="errors?errors:{}"
            name="amount"
            type="text"
            class="mx-0 mb-3 mt-2"
          />
          <code>{{ errors }}</code>
          <fut-input
            v-model="payload.code"
            :validate="errors?errors:{}"
            :placeholder="`${$t('i18n_codigo_promocional')}...`"
            name="code"
            type="text"
            class="mx-0 mb-3 mt-2"
          />
        </div>
        <div v-if="depositResponse" class="text-center">
          <h4 class="text-center fut-color-dynamic">
            {{ $t('i18n_aguardando_pagamento_de_cartao') }}:
          </h4>
          <h4 class="fut-color-dynamic">{{ ` R$ ${depositResponse.amount}` }}</h4>
          <h5 class="fut-color-dynamic">{{ depositResponse.situation }}</h5>
          <br>
          <h4 class="fut-color-dynamic" v-if="depositResponse.payment">
            {{ depositResponse.payment.pix_message }}
          </h4>
          <br>
          <h4 class="fut-color-dynamic" v-if="depositResponse.payment">
            Você será redirecionado para o link de pagamento em breve!
          </h4>
          <p class="fut-color-dynamic" v-if="depositResponse.payment" style="word-break: break-all;">
            <small>{{ depositResponse.payment.pix_value }}</small>
          </p>
          <fut-button v-if="depositResponse.payment" class="text-white" primary @click="redirectUser(depositResponse.payment.form_url)">
            Acessar link de pagamento
          </fut-button>
          <fut-button :primary="true" class="text-white" @click="$emit('clearResponse')">
            {{ $t('i18n_novo_deposito') }}
          </fut-button>
        </div>
      </div>
      <div v-if="payload.method === 'picpay'">
        <h4 class="text-center fut-color-dynamic">
          {{ $t('i18n_deposito_por_picpay') }}
        </h4>
        <ul>
          <!-- <li class="fut-color-dynamic">{{ $t('i18n_tempo_de_processamento') }}: {{ $t('i18n_ate') }} 30 min</li> -->
          <li class="fut-color-dynamic">Min: R$ {{ depositLimitMin ? depositLimitMin : 1 }}</li>
          <!-- <li>Max: R$ 10.000,00</li> -->
        </ul>
        <div v-if="!depositResponse">
          <fut-input
            v-model.lazy="price"
            v-money3="money"
            :validate="errors?errors:{}"
            name="amount"
            type="text"
            class="mx-0 mb-3 mt-2"
          />
          <code>{{ errors }}</code>
          <fut-input
            v-model="payload.code"
            :validate="errors?errors:{}"
            :placeholder="`${$t('i18n_codigo_promocional')}...`"
            name="code"
            type="text"
            class="mx-0 mb-3 mt-2"
          />
        </div>
        <div v-if="depositResponse" class="text-center">
          <h4 class="text-center fut-color-dynamic">
            {{ $t('i18n_aguardando_pagamento_de_pix') }}:
          </h4>
          <h4 class="fut-color-dynamic">{{ ` R$ ${depositResponse.amount}` }}</h4>
          <h5 class="fut-color-dynamic">{{ depositResponse.situation }}</h5>
          <br>
          <h4 class="fut-color-dynamic" v-if="depositResponse.payment">
            {{ depositResponse.payment.pix_message }}
          </h4>
          <img v-if="depositResponse.payment" class="img-fluid" style="height: 300px" :src="depositResponse.payment.pix_url" alt="">
          <br>
          <p class="fut-color-dynamic" v-if="depositResponse.payment" style="word-break: break-all;">
            <small>{{ depositResponse.payment.pix_value }}</small>
          </p>
          <fut-button
            v-if="depositResponse.payment"
            class="text-white"
            primary
            target="_blank"
            :to="depositResponse.payment.pix_picpay"
            :external="true"
          >
            {{ $t('i18n_abrir_qrcode') }} <font-awesome-icon class="text-white icon" :icon="['fas', 'sign-in-alt']" />
          </fut-button>
          <fut-button :primary="true" class="text-white" @click="$emit('clearResponse')">
            {{ $t('i18n_novo_deposito') }}
          </fut-button>
          <!-- <fut-modal
            class="text-center"
            :max-width="'99%'"
            :open="modal"
            @onClose="()=>{ modal = false; }"
          >
            <iframe :src="externalModalLink" frameborder="0"></iframe>
          </fut-modal> -->
        </div>
      </div>
      <div v-if="payload.method === 'pix'">
        <h4 class="text-center fut-color-dynamic">
          {{ $t('i18n_deposito_por_pix') }}
        </h4>
        <ul>
          <li class="fut-color-dynamic">{{ $t('i18n_tempo_de_processamento') }}: {{ $t('i18n_instantaneo') }}</li>
          <li class="fut-color-dynamic">Min: R$ {{ depositLimitMin ? depositLimitMin : 1 }}</li>
        </ul>
        <div v-if="!depositResponse">
          <fut-input
            v-model.lazy="price"
            v-money3="money"
            :validate="errors?errors:{}"
            name="amount"
            type="text"
            class="mx-0 mb-3 mt-2"
          />
          <code>{{ errors }}</code>
          <fut-input
            v-model="payload.code"
            :validate="errors?errors:{}"
            :placeholder="`${$t('i18n_codigo_promocional')}...`"
            name="code"
            type="text"
            class="mx-0 mb-3 mt-2"
          />
        </div>
        <div v-if="depositResponse" class="text-center">
          <h4 class="text-center fut-color-dynamic">
            {{ $t('i18n_aguardando_pagamento_de_pix') }}:
          </h4>
          <h4 class="fut-color-dynamic">
            {{ ` R$ ${depositResponse.amount}` }}
          </h4>
          <h5 class="fut-color-dynamic">
            {{ depositResponse.situation }}
          </h5>
          <br>
          <h4 v-if="depositResponse.payment" class="fut-color-dynamic">
            {{ depositResponse.payment.pix_message }}
          </h4>
          <img v-if="depositResponse.payment" class="img-fluid" style="height: 300px" :src="depositResponse.payment.pix_url" alt="">
          <br>
          <p v-if="depositResponse.payment" class="fut-color-dynamic" style="word-break: break-all;">
            <small>{{ depositResponse.payment.pix_value }}</small>
          </p>
          <fut-button v-if="depositResponse.payment" primary @click="copyURL(depositResponse.payment.pix_value)">
            {{ $t('i18n_copiar_codigo') }}
          </fut-button>
          <fut-button :primary="true" class="text-white" @click="$emit('clearResponse')">
            {{ $t('i18n_novo_deposito') }}
          </fut-button>
        </div>
      </div>
      <div v-if="payload.method === 'boleto'">
        <h4 class="text-center fut-color-dynamic">
          {{ $t('i18n_deposito_por_boleto') }}
        </h4>
        <ul>
          <li class="fut-color-dynamic">
            {{ $t('i18n_tempo_de_processamento') }}: {{ $t('i18n_ate') }} 2 {{ $t('i18n_dias_uteis') }}
          </li>
          <li class="fut-color-dynamic">
            Min: 30,00 R$
          </li>
        </ul>
        <fut-input
          v-if="!depositResponse"
          v-model.lazy="price"
          v-money3="money"
          name="amount"
          type="text"
          info="Valor precisa ser acima de R$ 30,00"
          class="mx-0 mb-3 mt-2"
        />
        <div v-if="depositResponse" class="text-center">
          <h4 class="text-center fut-color-dynamic">
            {{ $t('i18n_aguardando_pagamento_de_pix') }}:
          </h4>
          <h4 class="fut-color-dynamic">
            {{ ` R$  ${depositResponse.amount}` }}
          </h4>
          <h5 class="fut-color-dynamic">
            {{ depositResponse.situation }}
          </h5>
          <br>
          <h4 class="fut-color-dynamic">
            {{ depositResponse.payment.boleto_message }}
          </h4>
          <img class="img-fluid" style="max-width: 300px;" :src="depositResponse.payment.pix_url" alt="">
          <br>
          <p class="fut-color-dynamic" style="word-break: break-all;">
            <small>{{ depositResponse.payment.boleto_pix_copiacola }}</small>
          </p>
          <br>
          <p class="fut-color-dynamic" style="word-break: break-all;">
            <small>{{ depositResponse.payment.boleto_code }}</small>
          </p>
          <div class="d-flex justify-content-center mb-5">
            <fut-button class="mx-2" :to="depositResponse.payment.boleto_url" target="_blank" :primary="true">
              <font-awesome-icon class="text-white icon" :icon="['fas', 'download']" />
            </fut-button>
            <fut-button :primary="true" class="text-white mx-2" @click="$emit('clearResponse')">
              {{ $t('i18n_novo_deposito') }}
            </fut-button>
          </div>
        </div>
      </div>
      <div v-if="!depositResponse" class="d-flex justify-content-between">
        <fut-button
          :disabled="depositLimitMin ? +getRawPrice(price) < depositLimitMin : +getRawPrice(price) < 1"
          :loading="loading"
          :primary="true"
          class="text-white"
          @click="deposit"
        >
          {{ $t('i18n_depositar') }}
        </fut-button>
      </div>
    </div>
    <div v-else>
      <h5 class="fut-color-dynamic">
        {{ $t('i18n_atencao') }}!
      </h5>
      <p class="fut-color-dynamic">
        {{ $t('i18n_para_depositar_valores_na_sua_conta') }}
      </p>
      <p class="mb-0 fut-color-dynamic">
        <span class="fw-bold">{{ $t('i18n_chave_pix') }}:</span> {{ manualPix() }}
      </p>
      <p v-if="manualCpf()" class="mb-0 fut-color-dynamic">
        <span class="fw-bold">Cpf:</span> {{ manualCpf() }}
      </p>
      <p v-if="manualHolder()" class="mb-0 fut-color-dynamic">
        <span class="fw-bold">{{ $t('i18n_titular') }}:</span> {{ manualHolder() }}
      </p>
      <p v-if="manualBank()" class="mb-0 fut-color-dynamic">
        <span class="fw-bold">{{ $t('i18n_banco') }}:</span> {{ manualBank() }}
      </p>
    </div>
  </div>
  <div v-else>
    <p class="mt-4 fw-bold fut-color-dynamic">
      {{ $t('i18n_deposito_desabilitado') }}
    </p>
  </div>
</template>

<script>
import { Money3Directive } from 'v-money3'
import FutButton from '@/components/default/atoms/FutButton.vue'
import FutInput from '@/components/default/atoms/FutInput.vue'
// import FutModal from '@/components/default/organisms/FutModal.vue'
// import FutSelect from '@/components/default/atoms/FutSelect.vue'
import sportradarTagManager from '@/mixins.js/sportradarTagManager.js'

export default {
  components: { FutInput, FutButton },
  directives: { money3: Money3Directive },
  mixins: [sportradarTagManager],
  props: {
    depositLimitMin: {
      type: Number,
      default: null
    },
    availableMethods: {
      type: Array,
      default: () => (null)
    },
    // externalModal: {
    //   type: Boolean,
    //   default: false
    // },
    // externalModalLink: {
    //   type: String,
    //   default: null
    // },
    response: {
      type: Object,
      default: () => ({})
    },
    responseErrors: {
      type: Object,
      default: null
    },
    loading: {
      type: Boolean,
      default: false
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
        code: null,
        bank: null
      }
    }
  },
  computed: {
    // modal: {
    //   get () {
    //     return this.externalModal
    //   },
    //   set (value) {
    //     this.$emit('closeExternalModal', value)
    //   }
    // },
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
.btn-deposit{
  background-color: var(--white);
  border-radius: 10px !important;
}
.img-deposit{
  width: 100%;
  max-width: 90px;
  height: auto;
}
</style>

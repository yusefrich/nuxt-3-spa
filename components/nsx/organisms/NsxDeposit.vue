<template>
  <div v-if="!depositDisabled()">
    <div v-if="!manualDeposit()" class="deposit-content">
      <ol
        v-if="!depositResponse && currentSettings"
        class="translate fw-bold mt-3"
      >
        <li>{{ $t('i18n_nao_sera_aceito_deposito') }} </li>
        <li>{{ $t('i18n_deposito_minimo') }} R$ {{ currentSettings.dp_limit_min ? currentSettings.dp_limit_min : 1 }} </li>
        <li>{{ $t('i18n_nao_e_permitido_transferencia_diretamente') }} </li>
        <li> {{ $t('i18n_informe_o_valor_do_deposito') }} </li>
        <li> {{ $t('i18n_faca_o_pagamento_pelo_qr_code') }} </li>
        <li> {{ $t('i18n_aguarde_alguns_segundos_para') }} </li>
      </ol>
      <div class="deposit-container">
        <div class="d-md-flex mx-4 mx-md-0">
          <fut-input
            v-if="!depositResponse"
            v-model.lazy="price"
            v-money3="money"
            name="amount"
            nsx-input
            nsx-validation
            nsx-prefix="R$"
            nsx-icon-spacing="35px"
            type="text"
            class="mx-0 mb-1 mt-2 me-3 w-100"
          />

          <fut-input
            v-if="!depositResponse"
            v-model="payload.code"
            :placeholder="`${$t('i18n_codigo_promocional')}...`"
            name="code"
            nsx-input
            rounded
            type="text"
            class="mx-0 mb-1 mt-2 w-100"
          />

          <div>
            <nsx-fut-button
              v-if="!depositResponse && currentSettings"
              :disabled="
                currentSettings.dp_limit_min
                  ? +getRawPrice(price) < currentSettings.dp_limit_min
                  : +getRawPrice(price) < 1
              "
              :loading="bankLoading"
              class="nsx-button mt-2 ms-2"
              @click="deposit"
            >
              {{ $t('i18n_gerar_qr_code_pix') }}
            </nsx-fut-button>
          </div>
        </div>

        <error-badge name="amount" :validate="errors?errors:{}" />
        <error-badge name="code" :validate="errors?errors:{}" />
      </div>
      <div v-if="depositResponse" class="text-center mt-3">
        <p class="mb-0">
          <strong>{{ $t('i18n_valor') }}:</strong> R$ {{ depositResponse.amount }}
        </p>
        <nsx-fut-button
          v-if="depositResponse.payment.pix_value"
          class="nsx-button"
          @click="copyURL(depositResponse.payment.pix_value)"
        >
          {{ $t('i18n_pix_copia_e_cola') }}
        </nsx-fut-button>
        <p class="mb-1">
          <b>{{ $t('i18n_atencao') }}:</b> {{ $t('i18n_esta_e_uma_chave') }} <b>{{ $t('i18n_pix_copia_e_cola').toUpperCase() }}</b>. {{ $t('i18n_para_utilizar_esta_funcao_clique') }} <b>{{ $t('i18n_pagar_qr_code') }}</b> {{ $t('i18n_no_app_do_seu_banco_e') }} <b>{{ $t('i18n_pix_copia_e_cola').toUpperCase() }}</b>.
        </p>
        <h4>{{ depositResponse.payment.pix_message }}</h4>
        <img
          class="img-fluid"
          style="height: 300px"
          :src="depositResponse.payment.pix_url"
        >
        <p style="word-break: break-all; font-size: 14px;">
          {{ depositResponse.payment.pix_value }}
        </p>
        <br>
        <nsx-fut-button
          :primary="true"
          class="text-white d-none"
          @click="$emit('cleanDepositResponse')"
        >
          {{ $t('i18n_novo_deposito') }}
        </nsx-fut-button>
      </div>
    </div>
    <div v-else>
      <h5>{{ $t('i18n_atencao') }}!</h5>
      <p>{{ $t('i18n_para_depositar_valores_na_sua_conta') }}</p>
      <p class="mb-0">
        <span class="fw-bold">{{ $t('i18n_chave_pix') }}:</span> {{ manualPix() }}
      </p>
      <p v-if="manualCpf()" class="mb-0">
        <span class="fw-bold">Cpf:</span> {{ manualCpf() }}
      </p>
      <p v-if="manualHolder()" class="mb-0">
        <span class="fw-bold">{{ $t('i18n_titular') }}:</span> {{ manualHolder() }}
      </p>
      <p v-if="manualBank()" class="mb-0">
        <span class="fw-bold">{{ $t('i18n_banco') }}:</span> {{ manualBank() }}
      </p>
    </div>
  </div>
  <div v-else>
    <p class="mt-4 fw-bold">
      {{ $t('i18n_deposito_desabilitado') }}
    </p>
  </div>
</template>

<script>
import { Money3Directive } from 'v-money3'
import NsxFutButton from '@/components/nsx/atoms/NsxFutButton.vue'
import FutInput from '@/components/default/atoms/FutInput.vue'
import ErrorBadge from '@/components/default/atoms/ErrorBadge.vue'

export default {
  name: 'NsxDeposit',
  components: {
    FutInput,
    NsxFutButton,
    ErrorBadge
  },
  directives: { money3: Money3Directive },
  props: {
    currentSettings: {
      type: Object,
      default: () => ({})
    },
    bankLoading: {
      type: Boolean,
      default: false
    },
    depositResponse: {
      type: Object,
      default: () => ({})
    },
    errors: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      money: {
        decimal: ',',
        thousands: '.',
        prefix: '',
        precision: 2,
        masked: false /* doesn't work with directive */
      },
      price: '',
      payload: {
        method: 'pix',
        amount: 0,
        code: '',
        bank: ''
      }
    }
  },
  methods: {
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
        /* eslint-disable-next-line */
        console.error(e)
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

      if (this.payload.amount <= 0) {
        this.$toast.open({ message: 'Insira um valor válido para o depósito!', type: 'error' })
        return
      }

      if (this.payload.method === 'boleto' && this.payload.amount < 30) {
        this.$toast.open({ message: 'Insira um valor válido para o depósito!', type: 'error' })
        return
      }

      const rawPayload = {
        method: this.payload.method,
        amount: this.payload.amount
      }

      if (this.payload.method === 'transferencia') {
        rawPayload.bank = +this.payload.bank
      }

      if (this.payload.code) {
        rawPayload.code = this.payload.code
      }

      this.$emit('submitDeposit', rawPayload)
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
.deposit-container{
  max-width: 500px;
}
ol{
  font-size: 12px;
}
p{
  font-size: 13.3px;
}
</style>

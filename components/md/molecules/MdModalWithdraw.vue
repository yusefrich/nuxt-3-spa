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
          {{ $t('i18n_saque', 1) }}
        </h6>
      </div>

      <div class="m-row">
        <div class="form">
          <label for="keyPix" class="mb-2">{{ $t('i18n_chave_pix') }}</label>
          <select
            v-if="pixTypes.length"
            id="keyPix"
            v-model="pixKey"
            name="pixKey"
            class="input py-2"
          >
            <option :value="''">
              {{ $t('i18n_selecione_a_chave_pix') }}
            </option>
            <option
              v-for="(type, idx) in pixTypes"
              :key="idx"
              :value="type"
            >
              {{ type }} - {{ pixKeys[type] }}
            </option>
          </select>

          <label for="withdraw" class="mt-4 mb-2">{{ $t('i18n_valor_do_saque') }}</label>
          <input
            id="withdraw"
            v-model="price"
            v-money3="money"
            type="text"
            class="input"
            :placeholder="$t('i18n_valor_do_saque')"
          >
          <p class="mt-2">
            <font-awesome-icon class="me-2" :icon="['fas', 'info-circle']" />Min: {{ transactionLimitMin }} BRL / Max: {{ transactionLimitMax }} BRL
          </p>

          <div class="withdraw-btns">
            <md-button
              v-for="(item, idx) in withdrawals"
              :key="idx"
              padding="10px"
              @click="price = item.value"
            >
              {{ item.label }}
            </md-button>
          </div>

          <md-button
            class="submit-btn"
            width="95px"
            padding="10px"
            :disabled="disableSubmit"
            :loading="loading"
            @click="withdraw()"
          >
            {{ $t('i18n_saque', 1) }}!
          </md-button>

          <div v-if="withdrawResponse" class="mx-auto mt-4 response-container">
            <font-awesome-icon class="text-success me-2" :icon="['fas', 'check']" />
            <small v-if="canWithdraw">{{ $t('i18n_transacao_enviada_para') }}</small>
            <small v-else>{{ $t('i18n_transacao_criada_e_pendente') }}</small>
          </div>
        </div>

        <div class="m-infos">
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
    </div>
  </md-modal>
</template>

<script>
import { Money3Directive } from 'v-money3'
import MdModal from '@/components/md/atoms/MdModal.vue'
import MdButton from '@/components/md/atoms/MdButton.vue'
import windowWidth from '~/mixins.js/windowWidth'

export default {
  name: 'MdModalWithdraw',
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
    transactionLimitMin: {
      type: String,
      default: ''
    },
    transactionLimitMax: {
      type: String,
      default: ''
    },
    canWithdraw: {
      type: Number,
      default: null
    },
    withdrawResponse: {
      type: Object,
      default: () => ({})
    },
    pixTypes: {
      type: Array,
      default: () => ([])
    },
    pixKeys: {
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
      pixKey: '',
      price: '',
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
        this.$emit('input', value)
      }
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
    }
  },
  methods: {
    withdraw () {
      const payload = {
        method: 'pix',
        amount: +this.price.substring(3).replace('.', '').replace(',', '.'),
        type: this.pixKey,
        pix: this.pixKeys[this.pixKey]
      }

      this.$emit('submitWithdraw', payload)
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
    .form {
      width: 70%;
      padding: 20px;
      display: flex;
      flex-direction: column;
      .input {
        padding: 6px 15px 4px 15px;
        border: 1px solid var(--md-comp-border-color);
        background: var(--md-comp-bg-color);
        color: var(--md-font-color);
        box-shadow: 0 0 0 0;
      }
      .withdraw-btns {
        display: flex;
        button {
          border: none;
          background: var(--fut-primary);
          padding: 10px;
          margin: 10px;
          border-radius: 4px;
          color: #fff;
          &:first-child {
            margin-left: 0;
          }
          &:hover {
            background: var(--fut-primary-darkest);
          }
          &:active {
            background: var(--fut-primary-lightest);
          }
        }
      }
      .submit-btn {
        margin-top: 30px;
      }
      .response-container{
        border: 1px solid #72996D;
        padding: 10px 20px;
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
      max-height: 400px;
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
  .withdraw-btns {
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
    .form {
      width: 100% !important;
      .withdraw-btns {
        font-size: 12px;
      }
    }
    .m-infos {
      width: 90% !important;
      margin: 0 0 20px 0 !important;
      overflow: initial !important;
    }
  }
}
</style>

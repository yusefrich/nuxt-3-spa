<template>
  <div>
    <div class="d-md-flex">
      <div class="profile-border me-1 d-flex align-items-center w-100 mt-md-0 my-2 p-2">
        <img
          class="mb-0 profile-content"
          :src="`https://ui-avatars.com/api/?background=eeeeee&name=${loggedInUser.username}&color=333333`"
          alt=""
        >
        <div class="ms-2">
          <h4 class="text-white mb-0 fw-bold">
            {{ loggedInUser.username }}
          </h4>
        </div>
      </div>
      <div class="profile-border ms-1 d-flex align-items-center w-100 p-2">
        <img class="mb-0" width="66px" height="66px" src="/Sg/Coin-2.png" alt="">
        <div class="d-flex align-items-center justify-content-between w-100">
          <div class="ms-2">
            <h4 class="text-white mb-0 fw-bold">
              {{ $t('i18n_saldo_principal') }}
            </h4>
            <p class="text-muted mb-0">
              BRL
            </p>
          </div>
          <div>
            <span class="fs-1 text-primary fw-bold">{{ getFormattedValue(loggedInUser.balance) }} </span>
          </div>
        </div>
      </div>
    </div>
    <div class="d-md-flex mt-3">
      <div class="w-100">
        <div class="border-content me-1 py-3 px-4">
          <div class="d-flex align-items-center">
            <img height="26px" src="/Sg/money-svgrepo-com.png" alt="">
            <span class="fw-bold text-white ms-2">{{ $t('i18n_saldo_de_bonus') }}</span>
          </div>
          <div class="border-bottom w-100 my-2" />
          <span class="fw-bold text-primary fs-1">{{ getFormattedValue(loggedInUser.balance_bonus) }}</span>
        </div>
      </div>
      <div class="w-100">
        <div class="border-content ms-1 py-3 px-4">
          <div class="d-flex align-items-center">
            <img height="26px" src="/Sg/ban-banned-block-svgrepo-com.png" alt="">
            <span class="fw-bold text-white ms-2">{{ $t('i18n_saldo') }} Free bet</span>
          </div>
          <div class="border-bottom w-100 my-2" />
          <span class="fw-bold text-white fs-1">{{ getFormattedValue(loggedInUser.free_bet) }}</span>
        </div>
      </div>
      <div class="w-100">
        <div class="border-content ms-1 py-3 px-4">
          <div class="d-flex align-items-center">
            <img height="26px" src="/Sg/ban-banned-block-svgrepo-com.png" alt="">
            <span class="fw-bold text-white ms-2">{{ $t('i18n_saldo_bloqueado') }}</span>
          </div>
          <div class="border-bottom w-100 my-2" />
          <span class="fw-bold text-danger fs-1">{{ getFormattedValue(loggedInUser.player.freebet_closed) }}</span>
        </div>
      </div>
    </div>
    <div class="d-md-flex mt-3">
      <div class="w-100 px-3">
        <button class="w-100 btn-wallet-solid mt-3 transition" @click="depositModal = true">
          <img src="/Sg/wallet-svgrepo-com.png" alt="">
          <span>{{ $t('i18n_fazer_um_novo_deposito') }}</span>
        </button>
      </div>
      <div class="w-100 px-3">
        <button class="w-100 btn-wallet-solid mt-3 transition" @click="withdrawModal = true">
          <img src="/Sg/wallet-svgrepo-com.png" alt="">
          <span>{{ $t('i18n_fazer_um_novo_saque') }}</span>
        </button>
      </div>
    </div>
    <div class="border-content py-3 my-3 px-4">
      <div class="ms-1 d-flex align-items-center">
        <img src="/Sg/steps.png" alt="Steps">
        <span class="fw-bold ms-1 text-white">{{ $t('i18n_historico_de_transacoes') }}</span>
      </div>
      <div class="d-flex">
        <button class="btn-wallet py-1 me-2 mt-3 transition" :class="{ active: list === 'depositos' }" @click="list = 'depositos'">
          <img src="/Sg/wallet-svgrepo-com.png" alt="">
          <span>{{ $t('i18n_deposito', 2) }}</span>
        </button>
        <button class="btn-wallet py-1 mt-3 transition" :class="{ active: list === 'saques' }" @click="list = 'saques'">
          <img src="/Sg/wallet-svgrepo-com.png" alt="">
          <span>{{ $t('i18n_saque', 2) }}</span>
        </button>
      </div>
      <div v-if="list === 'depositos'">
        <table class="w-100 mt-3">
          <tr class="w-100 tr-top">
            <th class="text-center">
              {{ $t('i18n_data_hora') }}
            </th>
            <th class="w-50 text-center">
              {{ $t('i18n_metodo') }}
            </th>
            <th class="text-center">
              {{ $t('i18n_valor') }}
            </th>
            <th class="w-25 text-center">
              Status
            </th>
            <th />
          </tr>
          <template v-if="getBankDeposits">
            <tr
              v-for="(deposit, index) in getBankDeposits.data"
              :key="'deposit_' + index"
              class="w-100 tr-bottom"
              :class="{ 'tr-bottom-2': index%2 === 0 }"
            >
              <th class="text-center">
                {{ formmated(deposit.created_at) }}
              </th>
              <th class="w-50 text-center">
                {{ deposit.method }}
              </th>
              <th class="text-center">
                {{ deposit.amount }}
              </th>
              <th class="w-25 text-center text-primary">
                {{ deposit.situation }}
              </th>
              <th class="w-25 text-center text-primary">
                <button class="btn btn-wallet px-2" @click="()=>{ detailModal = true; transPix = deposit }">
                  <font-awesome-icon class="text-primary icon" :icon="['fas', 'qrcode']" />
                </button>
              </th>
            </tr>
          </template>
        </table>
      </div>
      <div v-if="list === 'saques'">
        <table class="w-100 mt-3">
          <tr class="w-100 tr-top">
            <th class="text-center">
              {{ $t('i18n_data_hora') }}
            </th>
            <th class="w-50 text-center">
              {{ $t('i18n_metodo') }}
            </th>
            <th class="text-center">
              {{ $t('i18n_valor') }}
            </th>
            <th class="w-25 text-center">
              Status
            </th>
          </tr>
          <template v-if="getBankWithdraws">
            <tr
              v-for="(withdraw, index) in getBankWithdraws.data"
              :key="'witghdraw_' + index"
              class="w-100 tr-bottom"
              :class="{ 'tr-bottom-2': index%2 === 0 }"
            >
              <th class="text-center">
                {{ formmated(withdraw.created_at) }}
              </th>
              <th class="w-50 text-center">
                <strong>{{ withdraw.method }}</strong>
              </th>
              <th class="text-center">
                R$ {{ withdraw.amount }}
              </th>
              <th class="w-25 text-center text-primary">
                {{ withdraw.status }}
              </th>
            </tr>
          </template>
        </table>
      </div>
    </div>
    <sg-modal v-model="detailModal" width="md" close class="pt-0">
      <div class="px-3 h-100">
        <h5 class="fw-bold text-white ms-4">
          {{ $t('i18n_dados_do_deposito') }}
        </h5>
        <div class="content-modal">
          <img v-if="transPix" :src="transPix.pix_url" class="img-fluid mb-3" alt="">
          <p v-if="transPix" style="word-break: break-all;">
            <small>{{ transPix.pix_value }}</small>
          </p>
        </div>
      </div>
    </sg-modal>
    <sg-modal v-model="depositModal" width="md" close class="pt-0">
      <div class="px-3 h-100">
        <h5 class="fw-bold text-white ms-4">
          {{ $t('i18n_deposito', 1) }}
        </h5>
        <div class="content-modal">
          <sg-deposit
            :response="depositResponse"
            :settings="currentSettings"
            :loading="getBankLoading"
            :errors="getBankErrors"
            @submitDeposit="payload => submitDeposit(payload)"
            @clearResponse="depositResponse = null"
          />
        </div>
      </div>
    </sg-modal>
    <sg-modal v-model="withdrawModal" width="md" close class="pt-0">
      <div class="px-3 h-100 overflow-auto">
        <h5 class="fw-bold text-white ms-4">
          {{ $t('i18n_saque', 1) }}
        </h5>
        <div class="content-modal">
          <sg-withdraw
            :settings="currentSettings"
            :response="withdrawResponse"
            :loading="getBankLoading"
            :errors="getBankErrors"
            :user="loggedInUser"
            @submit="payload => submitWithdraw(payload)"
          />
        </div>
      </div>
    </sg-modal>
  </div>
</template>

<script>
import { mapState, mapActions } from 'pinia'
import { useBaseStore } from '@/stores/base'
import { useSettingsStore } from '@/stores/settings'
import { useOnboardingBankStore } from '@/stores/onboarding-bank'

import dayjs from 'dayjs'
import SgModal from '@/components/sg/atoms/SgModal'
import SgDeposit from '@/components/sg/organisms/SgDeposit'
import SgWithdraw from '@/components/sg/organisms/SgWithdraw'

export default {
  components: {
    SgDeposit,
    SgModal,
    SgWithdraw
  },
  data () {
    return {
      depositResponse: null,
      withdrawResponse: null,
      withdrawModal: false,
      depositModal: false,
      detailModal: false,
      transPix: null,
      list: 'depositos'
    }
  },
  computed: {
    ...mapState(useBaseStore, {
      loggedInUser: 'loggedInUser'
    }),
    ...mapState(useSettingsStore, {
      currentSettings: 'currentSettings'
    }),
    ...mapState(useOnboardingBankStore, {
      getBankErrors: 'getBankErrors',
      getBankLoading: 'getBankLoading',
      getBankDeposits: 'getBankDeposits',
      getBankWithdraws: 'getBankWithdraws',
    })
  },
  mounted () {
    this.fetchBankDeposits()
    this.fetchBankWithdraws()
  },
  methods: {
    ...mapActions(useOnboardingBankStore, {
      postBankDeposit: 'postBankDeposit',
      postBankWithdraw: 'postBankWithdraw',
      fetchBankDeposits: 'fetchBankDeposits',
      fetchBankWithdraws: 'fetchBankWithdraws'
    }),
    getFormattedValue (value) {
      const formattedResult = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      })
      return formattedResult.format(value)
    },
    switchStep () {
      this.stepOne = !this.stepOne
      this.stepTwo = !this.stepTwo
    },
    changePix (number) {
      this.step = number
    },
    confirmNext () {
      this.showConfirmValue = !this.showConfirmValue
      this.showConfirmNext = !this.showConfirmNext
    },
    submitWithdraw (payload) {
      this.postBankWithdraw(payload).then((result) => {
        this.withdrawResponse = result
      })
    },
    submitDeposit (payload) {
      this.fetchBankDeposits().then((deposits) => {
        this.postBankDeposit(payload).then((response) => {
          this.depositResponse = response.data
          if (deposits && deposits.length > 0) {
            this.srtmRecurringDeposit(response.data.player_id, response.data.id, response.data.amount, 'R$')
          } else {
            this.srtmFirstDeposit(response.data.player_id, response.data.id, response.data.amount, 'R$')
          }
        })
      })
    },
    formmated (date) {
      return dayjs(date).format('DD/MM/YYYY')
    }
  }
}
</script>

<style lang="scss" scoped>
.profile-border {
  background-color: var(--fut-background-darkest);
  border-radius: 50px;
}

.profile-content {
  width: 66px;
  height: 66px;
  border-radius: 100%;
  border: 2px solid var(--fut-primary);
}

.border-content {
  border-radius: 10px;
  border: 3px solid var(--fut-background-darkest);

  .border-bottom {
    border-bottom: 2px solid var(--fut-background-darkest) !important;
  }
}
.tr-top {
  background-color: var(--fut-background-darkest);
  color: white;
  th {
    border-left: 1px solid var(--fut-background-lighter);
    font-size: 13px;
  }
}
.tr-bottom {
  background-color: var(--fut-background-lightest);
  color: white;
  th {
    border-left: 1px solid var(--fut-background-lighter);
    font-size: 12px;
  }
}
.tr-bottom-2 {
  background-color: var(--fut-background-lighter);
  color: white;
  th {
    border-left: 1px solid var(--fut-background-lighter);
    font-size: 12px;
  }
}
.btn-wallet-solid {
  background-color: var(--fut-background-darkest);
  font-size: 14px;
  color: var(--fut-primary-darker);
  font-weight: bold;
  border-radius: 10px;
  padding: 10px 20px;
  border: 1px solid var(--fut-background-lighter);
  &:hover {
    box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
  }
}
.btn-wallet {
  background-color: var(--fut-background-darker);
  font-size: 13px;
  color: var(--fut-background-white);
  border-radius: 10px;
  font-weight: bold;
  padding-left: 20px;
  padding-right: 20px;
  border: 2px solid var(--fut-background-lightest);
  &:hover {
    border: 2px solid var(--fut-background-black);
  }
  &.active {
    background-color: var(--fut-background-lighter);
    color: white;
    border: 2px solid var(--fut-primary);
  }
}

</style>

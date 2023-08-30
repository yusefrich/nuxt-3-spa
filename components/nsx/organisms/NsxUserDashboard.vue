<template>
  <div>
    <nav class="nav-filter nsx-nav px-md-2">
      <div id="nav-tab" class="nav">
        <nsx-fut-button
          id="nav-inicio-tab"
          :class="{active: !deposit && !documents}"
          class="nsx-link px-1 px-md-2 py-1"
          data-bs-toggle="tab"
          data-bs-target="#nav-inicio"
          role="tab"
          aria-controls="nav-inicio"
          aria-selected="true"
        >
          <font-awesome-icon class="me-2" :icon="['fas', 'home']" /> <span class="d-none d-md-inline">{{ $t('i18n_inicio') }}</span>
        </nsx-fut-button>
        <nsx-fut-button
          id="nav-dados-tab"
          ref="data-link"
          class="nsx-link px-1 px-md-2 py-1"
          data-bs-toggle="tab"
          data-bs-target="#nav-dados"
          role="tab"
          aria-controls="nav-dados"
          aria-selected="true"
        >
          <font-awesome-icon class="me-2" :icon="['fas', 'user']" /> <span class="d-none d-md-inline">{{ $t('i18n_meus_dados') }}</span>
        </nsx-fut-button>
        <nsx-fut-button
          id="nav-history-tab"
          ref="history-link"
          class="nsx-link px-1 px-md-2 py-1"
          data-bs-toggle="tab"
          data-bs-target="#nav-history"
          role="tab"
          aria-controls="nav-history"
          aria-selected="true"
        >
          <font-awesome-icon class="me-2" :icon="['fas', 'list']" /> <span class="d-none d-md-inline">{{ $t('i18n_historico') }}</span>
        </nsx-fut-button>
        <nsx-fut-button
          id="nav-bank-tab"
          ref="bank-link"
          :class="{active: deposit}"
          class="nsx-link px-1 px-md-2 py-1"
          data-bs-toggle="tab"
          data-bs-target="#nav-bank"
          role="tab"
          aria-controls="nav-bank"
          aria-selected="true"
        >
          <font-awesome-icon class="me-2" :icon="['fas', 'money-check']" /> <span class="d-none d-md-inline">{{ $t('i18n_banco') }}</span>
        </nsx-fut-button>
        <nsx-fut-button
          id="nav-doc-tab"
          ref="doc-link"
          :class="{active: documents}"
          class="nsx-link px-1 px-md-2 py-1"
          data-bs-toggle="tab"
          data-bs-target="#nav-doc"
          role="tab"
          aria-controls="nav-doc"
          aria-selected="true"
        >
          <font-awesome-icon class="me-2" :icon="['fas', 'passport']" /> <span class="d-none d-md-inline">{{ $t('i18n_documentos') }}</span>
        </nsx-fut-button>
        <nsx-fut-button
          id="nav-message-tab"
          ref="message-link"
          class="nsx-link px-1 px-md-2 py-1"
          data-bs-toggle="tab"
          data-bs-target="#nav-message"
          role="tab"
          aria-controls="nav-message"
          aria-selected="true"
        >
          <font-awesome-icon class="me-2" :icon="['fas', 'edit']" /> <span class="d-none d-md-inline">{{ $t('i18n_mensagens') }}</span>
        </nsx-fut-button>
      </div>
    </nav>
    <div id="nav-tabContent" class="tab-content mt-2 mx-1 mx-md-4 mb-3 h-nsx">
      <div id="nav-inicio" class="tab-pane fade" :class="[deposit || documents ? '' : 'show active']">
        <div class="row m-0 pt-2 pb-3">
          <div class="col-md-6 pb-2 px-1">
            <div class="fade-nsx-button d-flex justify-content-between">
              <p class="mb-0">
                <font-awesome-icon class="me-2" :icon="['fas', 'coins']" /><strong>{{ $t('i18n_saldo') }}:</strong> R$ {{ loggedInUser.balance }}
              </p>
              <nsx-fut-button :class="loading ? 'spin' : ''" class="p-0 sync-icon" @click="$emit('authUser')">
                <font-awesome-icon :icon="['fas', 'sync-alt']" />
              </nsx-fut-button>
            </div>
          </div>
          <div v-if="loggedInUser && +loggedInUser.balance_bonus > 0" class="col-6 pb-2 px-1">
            <div class="fade-nsx-button text-start d-md-flex justify-content-between">
              <p class="mb-0">
                <font-awesome-icon class="me-2" :icon="['fas', 'coins']" /><small>{{ $t('i18n_saldo_de_bonus') }}: </small>
              </p>
              <p class="mb-0 ms-4">
                <small>R$ {{ loggedInUser.balance_bonus }}</small>
              </p>
            </div>
          </div>
          <div v-if="loggedInUser && +loggedInUser.player.freebet_closed > 0" class="col-6 pb-2 px-1">
            <div class="fade-nsx-button text-start d-md-flex justify-content-between">
              <p class="mb-0">
                <font-awesome-icon class="me-2" :icon="['fas', 'coins']" /><small>{{ $t('i18n_bloqueado') }}: </small>
              </p>
              <p class="mb-0 ms-4">
                <small>R$ {{ loggedInUser.player.freebet_closed }}</small>
              </p>
            </div>
          </div>
          <div v-if="loggedInUser && +loggedInUser.free_bet > 0" class="col-12 col-md-6 pb-2 px-1">
            <div class="fade-nsx-button text-center d-flex justify-content-between">
              <p class="mb-0">
                <font-awesome-icon class="me-2" :icon="['fas', 'coins']" /><small>{{ $t('i18n_aposta_gratis') }}: </small>
              </p>
              <p class="mb-0 ms-4">
                <small>R$ {{ loggedInUser.free_bet }}</small>
              </p>
            </div>
          </div>
          <div class="col-md-6 pb-2 px-1">
            <nsx-fut-button block class="nsx-button active text-start" @click="$refs['bank-link'] ? $refs['bank-link'].$el.click() : () => {}">
              <font-awesome-icon class="me-2" :icon="['fas', 'money-check']" /> {{ $t('i18n_depositar') }}
            </nsx-fut-button>
          </div>
          <div class="col-md-12 pb-2 px-1">
            <nsx-progress-bar
              :rollover="loggedInUser.bonus"
              :loading="authLoading"
              class="col-12 progress-comp px-2 py-3"
              @cancelUserBonus="$emit('cancelUserBonus')"
            />
          </div>
          <div class="col-md-6 pb-2 px-1">
            <nsx-fut-button block class="nsx-button text-start" @click="$refs['data-link'] ? $refs['data-link'].$el.click() : () => {}">
              <font-awesome-icon class="me-2" :icon="['fas', 'user']" /> {{ $t('i18n_meus_dados') }} ({{ loggedInUser.name }})
            </nsx-fut-button>
          </div>
          <div class="col-md-6 pb-2 px-1">
            <nsx-fut-button block class="nsx-button text-start" @click="$refs['history-link'] ? $refs['history-link'].$el.click() : () => {}">
              <font-awesome-icon class="me-2" :icon="['fas', 'list']" /> {{ $t('i18n_historico') }}
            </nsx-fut-button>
          </div>
          <div class="col-md-6 pb-2 px-1">
            <nsx-fut-button block class="nsx-button text-start" @click="$refs['bank-link'] ? $refs['bank-link'].$el.click() : () => {}">
              <font-awesome-icon class="me-2" :icon="['fas', 'money-check']" /> {{ $t('i18n_banco') }}
            </nsx-fut-button>
          </div>
          <div class="col-md-6 pb-2 px-1">
            <nsx-fut-button block class="nsx-button text-start" @click="$refs['message-link'] ? $refs['message-link'].$el.click() : () => {}">
              <font-awesome-icon class="me-2" :icon="['fas', 'edit']" /> {{ $t('i18n_mensagens') }}
            </nsx-fut-button>
          </div>
          <div class="col-md-12 pb-2 px-1">
            <nsx-fut-button to="/logout" class="nsx-button float-end dark text-start">
              <font-awesome-icon class="me-2" :icon="['fas', 'sign-out-alt']" /> {{ $t('i18n_sair') }}
            </nsx-fut-button>
          </div>
        </div>
      </div>
      <div id="nav-dados" class="tab-pane fade">
        <nsx-user-data
          :logged-in-user="loggedInUser"
          :loading="loading"
          :errors="errors"
          @updateUser="$emit('updateUser', $event)"
          @updatePassword="$emit('updatePassword', $event)"
          @clear="$emit('clear')"
        />
      </div>
      <div id="nav-history" class="tab-pane fade">
        <nsx-my-bets-group
          v-if="userBets.all"
          :pending="userBets.pending"
          :done="userBets.done"
          @fetchUserBets="$emit('fetchUserBets', $event)"
        />
      </div>
      <div id="nav-bank" class="tab-pane fade" :class="[deposit ? 'show active' : '']">
        <nsx-bank-options
          :current-settings="currentSettings"
          :logged-in-user="loggedInUser"
          :bank-loading="bankLoading"
          :bank-errors="bankErrors"
          :deposit-response="depositResponse"
          :withdraw-response="withdrawResponse"
          :withdraws="withdraws"
          @submitDeposit="$emit('submitDeposit', $event)"
          @submitWithdraw="$emit('submitWithdraw', $event)"
          @fetchWithdraws="$emit('fetchWithdraws')"
          @cleanDepositResponse="$emit('cleanDepositResponse')"
          @cleanWithdrawResponse="$emit('cleanWithdrawResponse')"
          @clearBankErrors="$emit('clearBankErrors')"
        />
      </div>
      <div id="nav-doc" class="tab-pane fade" :class="[documents ? 'show active' : '']">
        <nsx-fut-documents :logged-in-user="loggedInUser" />
      </div>
      <div id="nav-message" class="tab-pane fade">
        <nsx-messages />
      </div>
    </div>
  </div>
</template>

<script>
import NsxFutButton from '@/components/nsx/atoms/NsxFutButton.vue'
import NsxFutDocuments from '@/components/nsx/molecules/NsxFutDocuments.vue'
import NsxUserData from '@/components/nsx/organisms/NsxUserData.vue'
import NsxMyBetsGroup from '@/components/nsx/organisms/NsxMyBetsGroup.vue'
import NsxBankOptions from '@/components/nsx/organisms/NsxBankOptions.vue'
import NsxMessages from '@/components/nsx/organisms/NsxMessages.vue'
import NsxProgressBar from '@/components/nsx/molecules/NsxProgressBar.vue'

export default {
  name: 'NsxUserDashboard',
  components: {
    NsxFutButton,
    NsxUserData,
    NsxMyBetsGroup,
    NsxBankOptions,
    NsxMessages,
    NsxFutDocuments,
    NsxProgressBar
  },
  props: {
    deposit: {
      type: Boolean,
      default: false
    },
    documents: {
      type: Boolean,
      default: false
    },
    loggedInUser: {
      type: Object,
      default: () => ({})
    },
    userBets: {
      type: Object,
      default: () => ({})
    },
    authLoading: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    currentSettings: {
      type: Object,
      default: () => ({})
    },
    errors: {
      type: Object,
      default: () => ({})
    },
    bankLoading: {
      type: Boolean,
      default: false
    },
    bankErrors: {
      type: Object,
      default: () => ({})
    },
    depositResponse: {
      type: Object,
      default: () => ({})
    },
    withdrawResponse: {
      type: Object,
      default: () => ({})
    },
    withdraws: {
      type: Array,
      default: () => ([])
    }
  },
  mounted () {
    this.$emit('fetchUserBets')
  }
}
</script>

<style lang="scss" scoped>
.nsx-nav{
  background: var(--nsx-dark-0);
}
.nsx-link{
  background: transparent;
  border: none;
  color: #c5c5c5;
  font-size: 15px;
}
.nsx-link:hover{
  color: #e2e2e2;
}
.nsx-link.active{
  color: var(--nsx-dark-0);
  background: #c5c5c5;
  border-radius: 5px 5px 0px 0px;
  span{
    display: inline !important;
  }
}
.fade-nsx-button{
  background: #d2d2d2;
  border-radius: 5px;
  padding: 5px 20px;
  color: #000;
}
.sync-icon{
  color: var(--nsx-gray-1);
}
.sync-icon:hover{
  color: #ff8800;
}
.nsx-button{
  padding: 4px 15px;
  background: #dbdbdb;
  color: #000;
  border-radius: 5px !important;
}
.nsx-button:hover{
  background: white;
}
.nsx-button.active{
  background: linear-gradient(to bottom,#ff8800,#ff6600);
  color: #dbdbdb;
}
.nsx-button.dark{
  background: var(--nsx-dark-0);
  color: #dbdbdb;
}
.h-nsx{
  min-height: 500px !important;
}
.spin{
  animation-name: spin;
  animation-duration: 2000ms;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
}
@keyframes spin {
  from {
    transform:rotate(0deg);
  }
  to {
    transform:rotate(360deg);
  }
}
.progress-comp {
  background-color: #dbdbdb;
  border-radius: 5px;
}
</style>

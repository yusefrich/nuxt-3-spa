<template>
  <div>
    <sg-tabs v-if="initialSlug" class="mt-4 mt-md-0">
      <fb-wrapper name="Depositar" :selected="initialSlug === 'deposit'" image="/Sg/wallet-svgrepo-com.png">
        <sg-deposit
          :response="depositResponse"
          :settings="currentSettings"
          :loading="getBankLoading"
          :errors="getBankErrors"
          @submitDeposit="payload => submitDeposit(payload)"
          @clearResponse="depositResponse = null"
        />
      </fb-wrapper>
      <fb-wrapper name="Sacar" :selected="initialSlug === 'withdraw'" image="/Sg/walletSaq-w.png">
        <sg-withdraw
          :settings="currentSettings"
          :response="withdrawResponse"
          :loading="getBankLoading"
          :errors="getBankErrors"
          :user="loggedInUser"
          @submit="payload => submitWithdraw(payload)"
        />
      </fb-wrapper>
    </sg-tabs>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import SgTabs from '@/components/sg/molecules/SgTabs'
import SgDeposit from '@/components/sg/organisms/SgDeposit'
import SgWithdraw from '@/components/sg/organisms/SgWithdraw'
import FbWrapper from '~/components/fb/atoms/FbWrapper'
import sportradarTagManager from '@/mixins.js/sportradarTagManager.js'

export default {
  components: { SgTabs, FbWrapper, SgDeposit, SgWithdraw },
  mixins: [sportradarTagManager],
  data () {
    return {
      depositResponse: null,
      initialSlug: null,
      withdrawResponse: null
    }
  },
  computed: {
    ...mapGetters({
      getBankErrors: 'onboarding-bank/getBankErrors',
      getBankLoading: 'onboarding-bank/getBankLoading',
      loggedInUser: 'loggedInUser',
      currentSettings: 'settings/currentSettings'
    })
  },
  mounted () {
    if (this.$route.query.slug) {
      this.initialSlug = this.$route.query.slug
    } else {
      this.initialSlug = 'deposit'
    }
  },
  methods: {
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
    ...mapActions({
      postBankDeposit: 'onboarding-bank/postBankDeposit',
      postBankWithdraw: 'onboarding-bank/postBankWithdraw',
      fetchBankDeposits: 'onboarding-bank/fetchBankDeposits'
    })
  }
}
</script>
<style lang="scss" scoped>
@import "@/assets/layout/breakpoints";
.inside-cad-menu {
  background-color: var(--fut-background-darker);
  padding-bottom: 25px;
  padding-top: 25px;
  width: 100%;
  height: 100%;
  border-radius: 20px;
  @include md {
    width: 440px;
    height: auto;
  }

  h4 {
    font-size: 24px;
    color: white;
    margin-top: 31px;
    font-weight: bold;
  }

  p {
    font-size: 13px;
    color: white;
  }
  .btn-back {
    height: 45px;
    font-weight: bold;
    background: linear-gradient(var(--fut-primary), var(--fut-secondary));
    border: none;
    border-radius: 5px;
  }
.profile-pic {
  width: 50px;
  height: 50px;
  border-radius: 100%;
  border: 2px solid var(--fut-primary);
}
  .input-password {
    background-color: transparent;
    outline: none;
    border: none;
    color: white;
    margin-left: 10px;
    width: 81%;
  }
}

.notification {
  position: fixed;
  display: flex;
  z-index: 99;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.432);
}

.listing {
  list-style: none;
  font-size: 15px;
  display: inline;
  white-space: nowrap;
}
.listing-d {
  list-style: none;
  font-size: 15px;
  display: inline;
}
.listing li::before {
  content: "\2022";
  color: var(--fut-primary);
  font-weight: bold;
  display: inline-block;
  width: 1em;
}
.listing-d li::before {
  content: "\2022";
  color: var(--fut-primary);
  font-weight: bold;
  display: inline-block;
  width: 1em;
}

.nav-logo {
  width: 100%;
  height: 47px;
  max-width: 200px;
}

.form-check {
  label {
    font-size: 12px;
  }
}

.fs-15 {
  font-size: 15px;
}

.fs-13 {
  font-size: 13px;
}

.btn-cash {
  border: none;
  border-radius: 5px;
  height: 45px;
  font-weight: bold;
  width: 91px;
  background: linear-gradient(var(--fut-primary), var(--fut-secondary));
}
.btn-pix {
  border: none;
  border-radius: 5px;
  height: 45px;
  font-weight: bold;
  color: var(--fut-background-lightest);
  background-color: transparent;
  width: 100%;
  border: 2px solid var(--fut-background-lightest);
  max-width: 106px;
  &.is-active {
    background: linear-gradient(var(--fut-primary), var(--fut-secondary));
    color: var(--fut-background-darkest);
    border: none;
  }
}

.btn-confirm {
  font-size: 17px;
  font-weight: bold;
  text-transform: uppercase;
  color: var(--fut-primary);
  background-color: transparent;
  border: 2px solid var(--fut-primary);
  border-radius: 5px;
  height: 55px;
  width: 100%;
  @include md {
    width: 280px;
  }
}

.btn-copy {
  font-size: 14px;
  font-weight: bold;
  text-transform: uppercase;
  color: var(--fut-primary);
  background-color: transparent;
  border: 2px solid var(--fut-primary);
  border-radius: 5px;
  width: 170px;
  height: 45px;
}

.border-b {
  border: 1px solid var(--fut-background-darkest);
}

.btn-deposit {
  width: 132px;
  height: 42px;
  font-size: 13px;
  border-radius: 15px;
  font-weight: bold;
  color: white;
  background-color: var(--fut-background-lighter);
  border: 2px solid var(--fut-primary);
}

.input-controler {
  background-color: var(--fut-background-darkest);
  border-radius: 50px;
  width: 254px;
  border: 2px solid var(--fut-background-lightest);
  border: none;
  outline: none;
  width: 300px;
  height: 46px;
  font-size: 14px;
  color: white;
}

.input-content {
  background-color: var(--fut-background-darkest);
  border-radius: 50px;
  border: 2px solid var(--fut-background-lightest);
  width: 100%;
  @include md {
    width: 254px;
  }

  input {
    background-color: transparent;
    border: none;
    outline: none;
    width: auto;
    color: white;
  }
}
.input-content-d {
  background-color: var(--fut-background-darkest);
  border-radius: 50px;
  border: 2px solid var(--fut-background-lightest);
  width: 100%;
  @include md {
    width: 355px;
  }

  input {
    background-color: transparent;
    border: none;
    outline: none;
    width: 85%;
    color: white;
  }
}

.btn-deposit-d {
  width: 132px;
  height: 42px;
  font-size: 13px;
  border-radius: 15px;
  font-weight: bold;
  color: grey;
  background-color: var(--fut-background-lighter);
  border: 3px solid var(--fut-background-lightest);
}
</style>

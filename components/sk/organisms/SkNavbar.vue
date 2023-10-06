<template>
  <sk-header
    id="sk-navbar"
    background="var(--fut-background-header)"
  >
    <div class="container">
      <NuxtLink :to="localePath('/')">
        <img
          :src="logo"
          alt="Logo"
        >
      </NuxtLink>

      <div v-if="loggedInUser" class="balance">
        <button @click="$router.push(localePath('/user/bank/transactions?tab=balance'))">
          <span class="mx-2">R$ {{ thousandsSeparators(loggedInUser.balance) }}</span>
        </button>
        <button
          @click="$emit('modalWallet')"
        >
          <font-awesome-icon v-if="isMobile || openTicket" class="icon px-2" :icon="['fas', 'wallet']" />
          <span v-else class="mx-2">{{ $t('i18n_carteira') }}</span>
        </button>
      </div>

      <div v-if="loggedInUser" class="user-items">
        <button
          class="search"
          @click="modalSearch = !modalSearch"
        >
          <font-awesome-icon class="icon" :icon="['fas', 'search']" />
          <span v-if="!isMobile && !openTicket" class="ms-2">{{ $t('i18n_procurar') }}</span>
        </button>
        <sk-dropdown
          dropdown-id="sk-user-dropdown"
          :items="userDropdownItems"
          :is-mobile="isMobile"
        >
          <template #title>
            <button
              id="sk-user-dropdown"
              class="user-dropdown mx-1 dropdown-toggle"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <font-awesome-icon class="icon" :icon="['fas', 'user-alt']" />
            </button>
          </template>
        </sk-dropdown>
        <button
          v-if="!isMobile"
          class="user-ticket"
          @click="$emit('toggleTicket')"
        >
          <font-awesome-icon class="icon" :icon="['fas', 'receipt']" />
        </button>
      </div>

      <div v-if="!loggedInUser" class="login-register">
        <button @click="$emit('modalLogin')">
          <span>{{ $t('i18n_entrar') }}</span>
        </button>
        <button @click="$emit('modalRegister')">
          <span>{{ $t('i18n_registrar') }}</span>
        </button>
      </div>
    </div>

    <div class="search-wrapper">
      <sk-modal-search-all
        v-model="modalSearch"
        :items="foundItems"
        :not-found="notFound"
        @searchSports="$emit('searchSports', $event)"
        @searchCasino="$emit('searchCasino', $event)"
        @cleanSearch="$emit('cleanSearch')"
      />
    </div>
  </sk-header>
</template>

<script>
import SkHeader from '@/components/sk/atoms/SkHeader'
import SkDropdown from '@/components/sk/molecules/SkDropdown'
import SkModalSearchAll from '@/components/sk/molecules/SkModalSearchAll'

export default {
  name: 'SkNavbar',
  components: {
    SkHeader,
    SkDropdown,
    SkModalSearchAll
  },
  props: {
    loggedInUser: {
      type: Object,
      default: () => ({})
    },
    logo: {
      type: String,
      default: ''
    },
    foundItems: {
      type: Array,
      default: () => ([])
    },
    isMobile: {
      type: Boolean,
      default: false
    },
    notFound: {
      type: Boolean,
      default: false
    },
    openTicket: {
      type: Boolean,
      default: false
    }
  },
  emits: [
    'toggleTicket',
    'modalLogin',
    'modalRegister',
    'modalWallet',
    'logout',
    'searchSports',
    'searchCasino',
    'cleanSearch'
  ],
  data () {
    return {
      modalSearch: false
    }
  },
  computed: {
    userDropdownItems () {
      return [
        { text: this.$t('i18n_carteira'), action: () => this.$emit('modalWallet'), icon: ['fas', 'wallet'] },
        { text: this.$t('i18n_saldo'), link: '/user/bank/transactions?tab=balance', icon: ['fas', 'money-bill-wave-alt'] },
        { text: this.$t('i18n_afiliados'), link: '/affiliates', icon: ['fas', 'bezier-curve'] },
        { text: this.$t('i18n_configuracoes'), link: '/user/my-account/dados?tab=geral', icon: ['fas', 'cog'] },
        { text: this.$t('i18n_transacoes'), link: '/user/bank/transactions?tab=deposits', icon: ['fas', 'clipboard-list'] },
        { text: this.$t('i18n_apostas_esportivas'), link: '/my-bets?tab=active', icon: ['fas', 'basketball-ball'] },
        { text: this.$t('i18n_sair'), action: () => this.$emit('logout'), icon: ['fas', 'sign-out-alt'] }
      ]
    }
  },
  methods: {
    thousandsSeparators (num) {
      const numParts = num.toString().split('.')
      numParts[0] = numParts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.')

      return numParts.join(',')
    }
  }
}
</script>

<style lang="scss" scoped>
#sk-navbar {
  position: relative;

  .container {
    display: flex;
    justify-content: space-between;
    height: 100%;
    padding: 0 3vw;

    img {
      height: 100%;
    }

    .balance {
      display: flex;
      align-items: center;

      button {
        border: none;
        height: 42px;

        &:first-child {
          border-top-left-radius: 4px;
          border-bottom-left-radius: 4px;
          color: var(--fut-color-dynamic);
          background: var(--fut-background-darkest);
          font-weight: 600;

          span {
            white-space: nowrap;
          }

          &:hover {
            background: var(--fut-background-black-2);
          }

          .icon {
            color: var(--fut-secondary);
          }
        }
        &:last-child {
          border-top-right-radius: 4px;
          border-bottom-right-radius: 4px;
          background: var(--fut-primary);
          color: var(--fut-color-dynamic);
          font-weight: 600;
          font-size: 15px;

          &:hover {
            background: var(--fut-primary-darker);
          }
          &:active {
            span {
              display: flex;
              align-items: center;
              transform: scale(.95);
            }
          }
        }
      }
    }

    .user-items {
      display: flex;
      align-items: center;

      .search {
        display: flex;
        align-items: center;
        color: var(--fut-color-dynamic);
        font-weight: 600;
        font-size: 15px;

        .icon {
          color: var(--fut-color-dynamic);
        }
      }

      .user-dropdown,
      .user-ticket,
      .search {
        border: none;
        background: transparent;

        &:active {
          transform: scale(.95);
        }
        &::after {
          display: none;
        }

        .icon {
          color: var(--fut-color-dynamic);
        }
      }
    }

    .login-register {
      display: flex;
      align-items: center;

      button {
        height: 42px;
        border: none;
        font-weight: 600;
        font-size: 15px;
        color: var(--fut-color-dynamic);
        padding: 0 14px;

        &:first-child {
          background: transparent;
        }
        &:last-child {
          background: var(--fut-primary);
          border-radius: 4px;
          box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .2), 0 1px 2px 0 rgba(0, 0, 0, .12);

          &:hover {
            background: var(--fut-primary-darker);
          }
        }
      }
    }

    .icon {
      width: 14px;
      height: 14px;
    }
  }

  .search-wrapper {
    position: absolute;
    top: 60px;
    left: 0;
    width: 100%;
  }
}
</style>

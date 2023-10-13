<template>
  <md-card
    padding="0px"
  >
    <button
      class="btn-edit transition"
      @click="currentTab = 'Account'"
    >
      <i class="edit-icon" data-feather="edit" />
      <span>{{ $t('i18n_editar_perfil') }}</span>
    </button>

    <div>
      <div class="rows">
        <p>{{ loggedInUser.name }}</p>
      </div>

      <div class="rows">
        <ul v-show="!isMobile" class="tab">
          <li
            :class="{active: currentTab == 'History'}"
            @click="currentTab = 'History'"
          >
            <font-awesome-icon class="me-2 icon-md" :icon="['fas', 'book-open']" />
            <span>{{ $t('i18n_minhas_apostas') }}</span>
          </li>
          <li
            :class="{active: currentTab == 'Account'}"
            @click="currentTab = 'Account'"
          >
            <font-awesome-icon class="me-2 icon-md" :icon="['far', 'user']" />
            <span>{{ $t('i18n_minha_conta') }}</span>
          </li>
          <li
            :class="{active: currentTab == 'Deposits'}"
            @click="currentTab = 'Deposits'"
          >
            <font-awesome-icon class="mx-1" :icon="['fa-solid', 'piggy-bank']" />
            <span>{{ $t('i18n_deposito', 1) }}</span>
          </li>
          <li
            :class="{active: currentTab == 'Documents'}"
            @click="currentTab = 'Documents'"
          >
            <font-awesome-icon class="me-2 icon-md" :icon="['far', 'folder']" />
            <span>{{ $t('i18n_documentos') }}</span>
          </li>
          <li
            :class="{active: currentTab == 'Withdraw'}"
            @click="currentTab = 'Withdraw'"
          >
            <font-awesome-icon class="me-2 icon-md" :icon="['fas', 'money-bill-wave']" />
            <span>{{ $t('i18n_saque', 1) }}</span>
          </li>
          <li
            :class="{active: currentTab == 'CasinoHistory'}"
            @click="currentTab = 'CasinoHistory'"
          >
            <font-awesome-icon class="me-2 icon-md" :icon="['fas', 'list-ul']" />
            <span>{{ $t('i18n_historico_de_cassino') }}</span>
          </li>
        </ul>

        <div v-if="isMobile" class="mobile-tab">
          <div
            id="dropdownMenuButton1"
            class="current-tab"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <div class="text">
              <i class="me-1" :data-feather="tabs[currentTab].icon" />
              <span>{{ tabs[currentTab].text }}</span>
            </div>
            <i class="icon ms-4" data-feather="chevron-down" />
          </div>
          <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
            <li
              :class="{active: currentTab == 'History'}"
              @click="currentTab = 'History'"
            >
              <div>
                <font-awesome-icon class="me-2 icon-md" :icon="['fas', 'book-open']" />
                <span>{{ $t('i18n_minhas_apostas') }}</span>
              </div>
            </li>
            <li
              :class="{active: currentTab == 'Account'}"
              @click="currentTab = 'Account'"
            >
              <div>
                <font-awesome-icon class="me-2 icon-md" :icon="['far', 'user']" />
                <span>{{ $t('i18n_minha_conta') }}</span>
              </div>
            </li>
            <li
              :class="{active: currentTab == 'Deposits'}"
              @click="currentTab = 'Deposits'"
            >
              <div>
                <font-awesome-icon class="mx-1" :icon="['fa-solid', 'piggy-bank']" />
                <span>{{ $t('i18n_deposito', 1) }}</span>
              </div>
            </li>
            <li
              :class="{active: currentTab == 'Documents'}"
              @click="currentTab = 'Documents'"
            >
              <div>
                <font-awesome-icon class="me-2 icon-md" :icon="['far', 'folder']" />
                <span>{{ $t('i18n_documentos') }}</span>
              </div>
            </li>
            <li
              :class="{active: currentTab == 'Withdraw'}"
              @click="currentTab = 'Withdraw'"
            >
              <div>
                <font-awesome-icon class="me-2 icon-md" :icon="['fas', 'money-bill-wave']" />
                <span>{{ $t('i18n_saque', 1) }}</span>
              </div>
            </li>
            <li
              :class="{active: currentTab == 'CasinoHistory'}"
              @click="currentTab = 'CasinoHistory'"
            >
              <div>
                <font-awesome-icon class="me-2 icon-md" :icon="['fas', 'list-ul']" />
                <span>{{ $t('i18n_historico_de_cassino') }}</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </md-card>
</template>

<script>
import MdCard from '@/components/md/atoms/MdCard.vue'
import windowWidth from '@/mixins.js/windowWidth.js'

export default {
  name: 'MdUserTabs',
  components: {
    MdCard
  },
  mixins: [windowWidth],
  props: {
    tabValue: {
      type: String,
      default: 'history'
    },
    loggedInUser: {
      type: Object,
      default: () => ({})
    }
  },
  emits: [
    'updateTab'
  ],
  computed: {
    currentTab: {
      get () {
        return this.tabValue
      },
      set (value) {
        this.$emit('updateTab', value)
      }
    },
    tabs () {
      return {
        History: { text: this.$t('i18n_minhas_apostas'), icon: 'book-open' },
        Account: { text: this.$t('i18n_minha_conta'), icon: 'user' },
        Deposits: { text: this.$t('i18n_deposito', 1), icon: 'dollar-sign' },
        Documents: { text: this.$t('i18n_documentos'), icon: 'folder' },
        Withdraw: { text: this.$t('i18n_saque', 1), icon: 'dollar-sign' },
        CasinoHistory: { text: this.$t('i18n_historico_de_cassino'), icon: 'book-open' }
      }
    },
    isMobile () {
      return this.width <= 768
    }
  },
  mounted () {
    // eslint-disable-next-line
    feather.replace()
    console.log('uai:', this.currentTab)
  }
}
</script>

<style lang="scss" scoped>
.rows {
  height: 54px;

  &:first-child {
    background: var(--fut-primary);
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;

    p {
      margin: 0;
    }

    @media(max-width: 768px) {
      &:first-child {
        justify-content: start;
        padding-left: 10px;
      }
    }
  }

  &:last-child {
    display: flex;
    justify-content: center;
    align-items: center;

    .tab {
      list-style-type: none;
      display: flex;
      margin: 0;

      li {
        margin: 5px;
        cursor: pointer;
        color: var(--md-font-color);

        &:not(:first-child) {
          margin-left: 16px;
          padding-left: 16px;
          border-left: 1px solid var(--md-comp-border-color);
        }

        &.active {
          color: var(--fut-primary)
        }

        .icon {
          width: 16px;
          height: 16px;
        }

        span {
          font-size: 14px;
          font-weight: 500;
        }
      }
    }
  }
}

.btn-edit {
  position: absolute;
  right: 0;
  top: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  border-radius: 0.25rem;
  width: 140px;
  color: var(--fut-primary);
  background: #fff;
  padding: 4px;
  margin-right: 25px;

  .edit-icon {
    width: 20px;
    height: 20px;
    margin-right: 10px;
  }

  &:hover {
    background: #eee;
  }
  &:active {
    background: #fff;
  }
}

.mobile-tab {
  width: 100%;
  height: 100%;
  .current-tab {
    color: var(--fut-primary);
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    padding: 0 25px;
    align-items: center;
    &[aria-expanded="true"] {
      .icon{
        -webkit-transform: rotate(90deg);
        transform: rotate(180deg);
      }
    }
  }
  .dropdown-menu {
    background: var(--md-comp-bg-color);
    border: 1px solid var(--md-comp-border-color);
    width: 100%;
    li {
      margin: 3px 0;
      color: var(--md-font-color);
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  }
}

@media(max-width: 768px) {
  .btn-edit {
    width: 40px;
    height: 40px;
    border-radius: 20px;
    top: 0;
    background: #fff;
    color: var(--fut-primary-lighter);
    margin: 7px 7px 0 0;

    &:hover {
      background: #fff;
    }

    .edit-icon {
      margin: 0;
    }
    span {
      display: none;
    }
  }
}
</style>

<template>
  <div class="dropdown-wrapper">
    <div
      id="profileDropdown"
      class="profile-btn dropdown-toggle"
      role="button"
      data-bs-toggle="dropdown"
      aria-expanded="false"
    >
      <img
        class="wd-30 ht-30 rounded-circle"
        :src="`https://ui-avatars.com/api/?background=fafafa&name=${loggedInUser.username}&color=333333`"
        width="30px"
        height="30px"
        alt="profile"
      >
    </div>
    <div class="dropdown-menu p-0" aria-labelledby="profileDropdown">
      <div class="user-info">
        <div class="mb-3">
          <img
            class="wd-80 ht-80 rounded-circle"
            :src="`https://ui-avatars.com/api/?background=fafafa&name=${loggedInUser.username}&color=333333`"
            width="80px"
            height="80px"
            alt=""
          >
        </div>
        <div class="text-center">
          <p class="tx-16 fw-bolder mb-0">
            {{ loggedInUser.username }}
          </p>
          <p class="fw-bold mb-1">
            {{ $t('i18n_saldo') }}: R$ {{ loggedInUser.balance }}
          </p>
          <p class="tx-12 text-muted">
            {{ loggedInUser.email }}
          </p>
        </div>
      </div>
      <ul class="list-unstyled p-1">
        <li class="dropdown-item transition p-0">
          <div
            role="button"
            class="ms-0 btn-deposit mb-1 text-black transition"
            @click="redirect('Deposits')"
          >
            <font-awesome-icon class="me-3" :icon="['fa-solid', 'piggy-bank']" />
            <span>{{ $t('i18n_deposito', 1) }}</span>
          </div>
        </li>
        <li class="dropdown-item transition">
          <div
            role="button"
            class="ms-0"
            @click="redirect('Account')"
          >
            <font-awesome-icon class="me-2 icon-md" :icon="['far', 'user']" />
            <span>{{ $t('i18n_minha_conta') }}</span>
          </div>
        </li>
        <li class="dropdown-item transition">
          <div
            role="button"
            class="ms-0"
            @click="redirect('Documents')"
          >
            <font-awesome-icon class="me-2 icon-md" :icon="['far', 'folder']" />
            <span>{{ $t('i18n_documentos') }}</span>
          </div>
        </li>
        <li class="dropdown-item transition">
          <div
            role="button"
            class="ms-0"
            @click="redirect('Withdraw')"
          >
            <font-awesome-icon class="me-2 icon-md" :icon="['fas', 'money-bill-wave']" />
            <span>{{ $t('i18n_saque', 1) }}</span>
          </div>
        </li>
        <li class="dropdown-item transition">
          <div
            role="button"
            class="ms-0"
            @click="redirect('History')"
          >
            <font-awesome-icon class="me-2 icon-md" :icon="['fas', 'book-open']" />
            <span>{{ $t('i18n_minhas_apostas') }}</span>
          </div>
        </li>
        <li class="dropdown-item transition">
          <div
            role="button"
            class="ms-0"
            @click="redirect('CasinoHistory')"
          >
            <font-awesome-icon class="me-2 icon-md" :icon="['fas', 'list-ul']" />
            <span>{{ $t('i18n_historico_de_cassino') }}</span>
          </div>
        </li>
        <li class="dropdown-item transition">
          <div
            role="button"
            class="ms-0"
            @click="$emit('logout')"
          >
            <font-awesome-icon class="me-2 icon-md" :icon="['fas', 'sign-out-alt']" />
            <span>{{ $t('i18n_sair') }}</span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MdUserDropdown',
  props: {
    loggedInUser: {
      type: Object,
      default: () => ({})
    }
  },
  methods: {
    redirect (to) {
      this.$emit('changeTab', to)
      this.$router.push(this.localePath(`/user?tab=${to}`))
    }
  }
}
</script>

<style lang="scss" scoped>
.rounded-circle {
  -webkit-box-shadow: 0px 0px 30px -9px rgba(0,0,0,0.55);
  -moz-box-shadow: 0px 0px 30px -9px rgba(0,0,0,0.55);
  box-shadow: 0px 0px 30px -9px rgba(0,0,0,0.55);
}
.dropdown-wrapper {
  margin-left: 24px;
}
.profile-btn {
  &::after {
    display: none;
  }
}
.dropdown-menu {
  margin: 15px -8px 0 0 !important;
  background: var(--md-comp-bg-color);
  color: var(--md-font-color);
  border: 1px solid var(--md-comp-border-color);

  &::before {
    content: '';
    width: 13px;
    height: 13px;
    background: var(--md-comp-bg-color);
    position: absolute;
    top: -7px;
    right: 15px;
    transform: rotate(45deg);
    border-top: 1px solid var(--md-comp-border-color);
    border-left: 1px solid var(--md-comp-border-color);
  }
}
.user-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  border-bottom: 1px solid var(--md-comp-border-color);
  padding: 16px 48px;
}
.btn-deposit {
  display: flex;
  align-items: center;
  border: none;
  background: #fff;
  padding: 5px 10px;
  border-radius: 4px;
  box-shadow: 0 2px 6px 0 var(--md-menu-idx-font-color);
  -webkit-box-shadow: 0 2px 6px 0 var(--md-menu-idx-font-color);
  text-decoration: none;
  color: #000;
  &:hover {
    background: var(--fut-primary);
    color: #fff !important;
  }
  &:active {
    background: var(--fut-primary-darkest);
  }
}
.dropdown-item {
  color: var(--md-font-color);
  border-radius: 4px;
  &:hover {
    background: var(--fut-primary);
    color: #fff;
  }
}

@media (max-width: 425px) {
  .dropdown-wrapper {
    position: static;
  }
  .dropdown-menu {
    left: -10px !important;
    width: calc(100% - 20px) !important;
    &::before {
      right: 22px !important;
    }
  }
}
</style>

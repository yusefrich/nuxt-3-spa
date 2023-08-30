<template>
  <div class="me-2 balance-dropdown">
    <div class="d-flex align-items-center">
      <div>
        <a
          href="#"
          style="font-size: 12.3px;line-height: 10px;"
          class="nav-link p-0 text-nowrap text-secondary"
          @click.prevent="updateData"
        >
          <font-awesome-icon class="text-secondary mt-2 me-1 pt-0" :class="loading ? 'spin' : ''" :icon="['fas', 'sync-alt']" />
          {{ loading ? 'R$ ...' : balance }}
        </a>
        <a href="#" style="font-size: 12px;" class="text-decoration-none text-orange" @click.prevent="$emit('deposit')">{{ $t('i18n_depositar') }}</a>
      </div>
      <font-awesome-icon class="text-primary ms-1" :icon="['fas', 'angle-down']" />
    </div>

    <ul class="balance-dropdown-content">
      <li>
        <div><span class="text-white fut-color-dynamic op-6 text-user-dashboard fw-lighter">{{ $t('i18n_bonus') }}</span></div>
        <div><span class="text-primary">R$ {{ balanceBonus }}</span></div>
      </li>
      <li>
        <div><span class="text-white fut-color-dynamic op-6 text-user-dashboard fw-lighter">FreeBet</span></div>
        <div><span class="text-primary">R$ {{ freeBet }}</span></div>
      </li>
      <li>
        <div><span class="text-white fut-color-dynamic op-6 text-user-dashboard fw-lighter">{{ $t('i18n_bloqueado') }}</span></div>
        <div><span class="text-primary">R$ {{ blockedBalance }}</span></div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'NsxBalanceDropdown',
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    balance: {
      type: String,
      default: ''
    },
    balanceBonus: {
      type: String,
      default: ''
    },
    freeBet: {
      type: String,
      default: ''
    },
    blockedBalance: {
      type: String,
      default: ''
    }
  }
}
</script>

<style scoped lang="scss">

.profile-content {
  font-size: 14px;
  font-weight: bold;
}
.text-user-dashboard{
  font-size: 12px;
}
.op-6{
  opacity: .6;
}
.balance-dropdown {
  position: relative;
  display: inline-block;
}
.balance-dropdown-content {
  font-size: 12px;
  list-style: none;
  padding: 10px 10px 0 10px;
  margin: 22px 0 3px 0;
  display: none;
  background-color: var(--fut-background-2);
  color: #fff;
  position: absolute;
  left: -55px;
  white-space: nowrap;
  z-index: 9999 !important;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  border-radius: 0 0 5px 5px;
  li {
    display: flex;
    div:first-child {
      width: 60px;
      display: flex;
      justify-content: flex-end;
      margin-right: 6px;
    }
    margin-bottom: 5px;
  }
}
.balance-dropdown:hover .balance-dropdown-content {
  display: block;
}
.text-orange{
  color: #ff8800;
}
</style>

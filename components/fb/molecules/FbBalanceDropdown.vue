<template>
  <div class="profile-content mr-20 balance-dropdown">
    <span class="text-white op-6 text-user-dashboard fw-lighter fut-color-dynamic">{{ $t('i18n_saldo') }}</span>
    <span class="text-white text-user-dashboard fut-color-dynamic">BRL {{ balance }}</span>
    <font-awesome-icon class="text-white fut-color-dynamic" :icon="['fas', 'angle-down']" />

    <ul class="balance-dropdown-content fut-color-dynamic">
      <li>
        <div><span class="text-white op-6 text-user-dashboard fw-lighter fut-color-dynamic">{{ $t('i18n_bonus') }}</span></div>
        <div><span>BRL {{ balanceBonus }}</span></div>
      </li>
      <li>
        <div><span class="text-white op-6 text-user-dashboard fw-lighter fut-color-dynamic">FreeBet</span></div>
        <div><span>BRL {{ freeBet }}</span></div>
      </li>
      <li>
        <div><span class="text-white op-6 text-user-dashboard fw-lighter fut-color-dynamic">{{ $t('i18n_bloqueado') }}</span></div>
        <div><span>BRL {{ blockedBalance }}</span></div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
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
  padding: 0 10px;
  margin: 3px 0;
  display: none;
  background-image: linear-gradient(rgba(255,0,0,0) 23%, var(--fut-background-darker) 30%, var(--fut-background-darkest));
  color: #fff;
  position: absolute;
  left: -40px;
  white-space: nowrap;
  z-index: 1050;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  border-radius: 5px;
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
</style>

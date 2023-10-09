<template>
  <a
    class="nav-link py-1 text-nowrap text-primary balance-dropdown"
    href="#"
    @click.prevent="$emit('updateData')"
  >
    <font-awesome-icon class="text-primary mt-2 me-2 pt-0" :class="loading ? 'spin' : ''" :icon="['fas', 'sync-alt']" />
    {{ loading ? 'R$ ...' : balance }}
    <font-awesome-icon class="text-primary" :icon="['fas', 'angle-down']" />

    <ul class="balance-dropdown-content">
      <li>
        <div><span class="text-white op-6 text-user-dashboard fut-color-dynamic">FreeBet</span></div>
        <div><span class="text-primary">R$ {{ freeBet }}</span></div>
      </li>
      <li>
        <div><span class="text-white op-6 text-user-dashboard fut-color-dynamic">{{ $t('i18n_bloqueado') }}</span></div>
        <div><span class="text-primary">R$ {{ blockedBalance }}</span></div>
      </li>
    </ul>
  </a>
</template>

<script>
export default {
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    balance: {
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
  },
  emits: [
    'updateData'
  ]
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
  background-color: var(--fut-background);
  color: #fff;
  position: absolute;
  left: -10px;
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

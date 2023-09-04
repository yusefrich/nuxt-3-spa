<template>
  <div class="sk-mobile-navbar text-white">
    <button class="nav-btn" @click="$emit('toggleMobileSidebar')">
      <div v-if="mobileSidebar" class="selected-bar" />
      <font-awesome-icon class="icon" :icon="['fas', 'bars']" />
      <span>Browse</span>
    </button>
    <button class="nav-btn" @click="$router.push(localePath('/casino')), $emit('redirect')">
      <div v-if="!mobileSidebar && !mobileTicket && currentRoute('/casino')" class="selected-bar" />
      <font-awesome-icon class="icon" :icon="['fas', 'dice']" />
      <span>{{ $t('i18n_cassino') }}</span>
    </button>
    <button class="nav-btn" @click="$emit('toggleMobileTicket')">
      <div v-if="mobileTicket" class="selected-bar" />
      <font-awesome-icon class="icon" :icon="['fas', 'receipt']" />
      <span>{{ $t('i18n_boletim_de_aposta') }}</span>
    </button>
    <button class="nav-btn" @click="$router.push(localePath('/sports?tab=SkLobby')), $emit('redirect')">
      <div v-if="!mobileSidebar && !mobileTicket && (currentRoute('/sports') || currentRoute('/sport'))" class="selected-bar" />
      <font-awesome-icon class="icon" :icon="['fas', 'basketball-ball']" />
      <span>{{ $t('i18n_esporte', 2) }}</span>
    </button>
  </div>
</template>

<script>
export default {
  name: 'SkMobileNavbar',
  props: {
    mobileSidebar: {
      type: Boolean,
      default: false
    },
    mobileTicket: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    currentRoute (route) {
      return this.$route.fullPath.includes(route) || route === `${window.location.origin}${this.$route.fullPath}`
    }
  }
}
</script>

<style lang="scss" scoped>
.sk-mobile-navbar {
  position: fixed;
  left: 0;
  bottom: 0;
  height: 68px;
  width: 100%;
  display: grid;
  justify-items: center;
  grid-template-columns: repeat(4,1fr);
  padding: 0 1rem;
  background: var(--fut-background-darkest);
  box-shadow: 0 -1px 3px 0 rgba(0, 0, 0, .2), 0 -1px 2px 0 rgba(0, 0, 0, .12);

  .nav-btn {
    position: relative;
    border: none;
    background: transparent;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .selected-bar {
      position: absolute;
      top: 0;
      width: 60%;
      min-height: 4px;
      background: var(--fut-primary-lighter);
    }
    .icon {
      color: var(--fut-secondary);
    }
    span {
      white-space: nowrap;
      color: var(--fut-color-dynamic);
      font-weight: 600;
      font-size: .875rem;
    }
  }
}
</style>

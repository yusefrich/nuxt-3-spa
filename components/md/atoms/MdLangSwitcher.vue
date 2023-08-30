
<template>
  <div>
    <a
      id="languageDropdown"
      class="lang-switcher dropdown-toggle ps-2"
      href="#"
      role="button"
      data-bs-toggle="dropdown"
      aria-haspopup="true"
      aria-expanded="false"
    >
      <img :src="flags[$i18n.locale]" class="spanish-flag">
      <span class="px-2">{{ $i18n.locale.toUpperCase() }}</span>
      <font-awesome-icon class="arrow-down me-1" :icon="['fas', 'chevron-down']" />
    </a>
    <div class="dropdown-menu" aria-labelledby="languageDropdown">
      <div
        role="button"
        class="dropdown-item transition py-2"
        @click="$emit('changeLanguage', 'PT')"
      >
        <img src="/flags/14.png" class="ms-3"> <span class="ms-1">PT</span>
      </div>
      <div
        role="button"
        class="dropdown-item transition py-2"
        @click="$emit('changeLanguage', 'EN')"
      >
        <img src="/flags/1.png" class="ms-3"> <span class="ms-1">EN</span>
      </div>
      <div
        role="button"
        class="dropdown-item transition py-2"
        @click="$emit('changeLanguage', 'ES')"
      >
        <img src="/flags/espanha.png" class="spanish-flag ms-3"> <span class="ms-1">ES</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MdLangSwitcher',
  data () {
    return {
      flags: {
        PT: '/flags/14.png',
        EN: '/flags/1.png',
        ES: '/flags/espanha.png'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.lang-switcher {
  text-decoration: none;
  display: flex;
  align-items: center;
  padding: 0;
  height: 32px;
  color: var(--md-menu-items-font-color);
  &:hover {
    color: var(--fut-primary);
  }
  &:active {
    color: var(--fut-primary);
  }
  &::after {
    display: none;
  }
}
.dropdown-menu {
  background: var(--md-comp-bg-color);
  border: 1px solid var(--md-comp-border-color);
  margin: 15px 0 0 0 !important;
  &::before {
    content: '';
    width: 13px;
    height: 13px;
    background: var(--md-comp-bg-color);
    position: absolute;
    top: -7px;
    left: 20px;
    transform: rotate(45deg);
    border-top: 1px solid var(--md-comp-border-color);
    border-left: 1px solid var(--md-comp-border-color);
  }

  .dropdown-item {
    &:hover {
      background: var(--fut-primary);
      span {
        color: #fff;
      }
    }

    span {
      color: var(--md-font-color);
    }
  }
}
.spanish-flag {
  width: 16px !important;
  height: 13px !important;
}
.arrow-down {
  height: 10px !important;
  width: 10px !important;
}
#languageDropdown[aria-expanded="true"] {
  .arrow-down {
    -webkit-transform: rotate(90deg);
    transform: rotate(180deg);
  }
}
</style>

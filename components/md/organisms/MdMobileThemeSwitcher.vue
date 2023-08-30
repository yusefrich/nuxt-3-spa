<template>
  <nav class="settings-sidebar" :class="{ 'settings-open': themeSwitcher }">
    <div class="sidebar-body">
      <div class="settings-sidebar-toggler" @click="themeSwitcher = !themeSwitcher">
        <font-awesome-icon class="adjust-icon" :icon="['fas', 'adjust']" />
      </div>
      <div class="theme">
        <h6 class="text-muted mb-0">
          {{ $t('i18n_tema') }}:
        </h6>
        <md-theme-switcher
          :theme="theme"
          @changeTheme="theme => $emit('changeTheme', theme)"
        />
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'MdMobileThemeSwitcher',
  props: {
    value: {
      type: Boolean,
      default: false
    },
    theme: {
      type: String,
      default: 'light'
    }
  },
  computed: {
    themeSwitcher: {
      get () {
        return this.value
      },
      set (value) {
        this.$emit('input', value)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.settings-sidebar {
  position: fixed;
  right: -100px;
  top: 355px;
  width: 100px;
  background: var(--md-comp-bg-color);
  border: 1px solid var(--md-comp-border-color);
  -webkit-box-shadow: 0 0 10px 0 var(--md-shadow-color);
  box-shadow: 0 0 10px 0 var(--md-shadow-color);
  z-index: 6001;
  -webkit-transition: all .2s ease-in-out;
  transition: all .2s ease-in-out;

  .sidebar-body {
    position: relative;
    height: 48px;
    .settings-sidebar-toggler {
      width: 45px;
      position: absolute;
      left: -45px;
      top: -1px;
      padding: 12px;
      border-radius: 4px 0 0 4px;
      background: var(--md-comp-bg-color);
      border: 1px solid var(--md-comp-border-color);
      border-right: none;
      -webkit-box-shadow: 0 0 10px 0 var(--md-shadow-color);
      box-shadow: 0 0 10px 0 var(--md-shadow-color);
      -webkit-transition: all .2s ease-in-out;
      transition: all .2s ease-in-out;
    }
  }
}
.theme {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.adjust-icon {
  color: var(--md-inverse-comp-bg-color);
}
.settings-open {
  right: 0 !important;
}
</style>

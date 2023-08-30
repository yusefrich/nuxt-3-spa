<template>
  <div class="switcher">
    <input
      id="checkbox"
      v-model="checkboxValue"
      type="checkbox"
      class="checkbox"
      @change="changeTheme()"
    >
    <label for="checkbox" class="label">
      <font-awesome-icon class="theme-icon" :icon="['fa-solid', 'moon']" />
      <font-awesome-icon class="theme-icon" :icon="['fa-solid', 'sun']" />
      <div class="ball" />
    </label>
  </div>
</template>

<script>
export default {
  name: 'MdThemeSwitcher',
  props: {
    theme: {
      type: String,
      default: 'light'
    }
  },
  data () {
    return {
      checkboxValue: false
    }
  },
  watch: {
    theme (value) {
      if (value === 'dark') {
        this.checkboxValue = true
      }
    }
  },
  created () {
    this.checkboxValue = this.theme === 'dark'
  },
  methods: {
    changeTheme () {
      if (this.theme === 'light') {
        this.$emit('changeTheme', 'dark')
        return
      }

      this.$emit('changeTheme', 'light')
    }
  }
}
</script>

<style lang="scss" scoped>
.switcher {
  width: 62px;
  height: 24px;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  box-shadow: 0 2px 6px 0 var(--md-menu-idx-font-color);
  -webkit-box-shadow: 0 2px 6px 0 var(--md-menu-idx-font-color);
  .checkbox {
    opacity: 0;
    position: absolute;
  }
  .checkbox:checked + .label .ball{
    transform: translateX(24px);
  }
  .label {
    cursor: pointer;
    width: 38px;
    height: 14px;
    padding: 3px;
    background-color: var(--md-switcher-color);
    display: flex;
    border-radius:50px;
    align-items: center;
    justify-content: space-between;
    position: relative;
    transform: scale(1.5);
    .ball {
      width: 12px;
      height: 12px;
      margin: 1px 0 0 1px;
      background-color: white;
      position: absolute;
      top: 0;
      left: 0;
      border-radius: 50%;
      transition: transform 0.2s linear;
    }
    .theme-icon {
      width: 8px;
      height: 8px;
      color: #fff;
    }
  }
}
</style>

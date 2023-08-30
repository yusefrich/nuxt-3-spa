<template>
  <div class="text-center">
    <img
      v-if="currentSettings"
      class="nav-logo"
      :src="currentSettings.logo ? currentSettings.logo : ''"
    >
  </div>
</template>

<script>
export default {
  name: 'SgLogo',
  props: {
    currentSettings: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>

<style lang="scss" scoped>
.nav-logo {
  width: 100%;
  height: 47px;
  max-width: 200px;
  object-fit: contain;
}
</style>

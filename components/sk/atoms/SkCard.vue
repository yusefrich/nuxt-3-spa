<template>
  <div id="sk-card">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'SkCard'
}
</script>

<style lang="scss" scoped>
#sk-card {
  background: var(--fut-background);
  border-radius: .5rem;
  border: 1px solid var(--fut-background-lightest-2);
}
</style>

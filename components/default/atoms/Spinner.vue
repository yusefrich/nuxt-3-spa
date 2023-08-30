<template>
  <div class="loader" />
</template>
<script>
export default {
  name: 'Spinner'
}
</script>
<style lang="scss" scoped>
@import "@/assets/layout/variables";
.loader {
  border: 3px solid var(--fut-background-darker);
  border-top: 3px solid $gray-500;
  border-radius: 50%;
  width: 25px;
  height: 25px;
  animation: spin 2s linear infinite;
  margin-left: auto;
  margin-right: auto;
}
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>

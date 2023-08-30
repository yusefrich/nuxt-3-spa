<template>
  <div class="position-relative">
    <template v-if="validate">
      <p v-for="message in validate[name]" :key="message" class="error-text mb-0 pb-1 mt-2">
        {{ message }}
      </p>
    </template>
  </div>
</template>
<script>
export default {
  props: {
    validate: {
      type: Object,
      default: () => ({})
    },
    name: {
      type: String,
      default: 'default'
    }
  }
}
</script>
<style scoped lang="scss">
  @import "@/assets/layout/variables";
  .error-text{
    background: #24a83aaf;
    border: #3bdc35e5 solid 1px;
    color: white;
    padding: 2px 10px;
    border-radius: 5px;
    font-size: 12px;
  }
</style>

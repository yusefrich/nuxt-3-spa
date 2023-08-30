<template>
  <div class="content-contaniner container p-0">
    <div class="content-header p-2 px-3">
      <h3 class="text-white">
        {{ title }}
      </h3>
    </div>
    <div class="content-body p-2 px-3">
      <p v-if="description" class="text-white">
        {{ description }}
      </p>
      <slot />
    </div>
  </div>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    description: {
      type: String,
      default: ''
    }
  }
}
</script>
<style lang="scss" scoped>
  @import "@/assets/layout/variables";
  @import "@/assets/layout/breakpoints";
  .content-contaniner{
    background-color: var(--fut-background-lightest);
    border-radius: 5px;
    .content-header{
      border-top-left-radius: 5px;
      border-top-right-radius: 5px;
      background-color: var(--fut-background-darkest);
    }
  }
</style>

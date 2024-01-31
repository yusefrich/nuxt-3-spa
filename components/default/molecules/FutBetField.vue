<template>
  <div>
    <template v-if="validate && !nsxValidation">
      <p v-for="message in validate[name]" :key="message" class="error-text mb-0 pb-1">
        {{ message }}
      </p>
    </template>
    <div class="d-flex">
      <div v-if="label" class="input-label p-2">
        <p class="m-0 fut-color-dynamic">
          {{ label }}
        </p>
      </div>
      <div v-if="odds" class="input-odds p-2">
        <p class="m-0">
          {{ odds }}
        </p>
      </div>
      <div class="w-100">
        <slot />
      </div>
    </div>
    <template v-if="validate && nsxValidation">
      <p v-for="message in validate[name]" :key="message" class="nsx-error-text mb-0 pb-1">
        {{ message }}
      </p>
    </template>
  </div>
</template>

<script>
export default {
  name: 'FutBetField',
  props: {
    validate: {
      type: Object,
      default: () => ({})
    },
    name: {
      type: String,
      default: 'default'
    },
    nsxValidation: {
      type: Boolean,
      default: false
    },
    label: {
      type: String,
      default: ''
    },
    odds: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/layout/variables";
.input-label{
  background: var(--fut-background-darkest);

  color: #fff;
  max-width: 200px;
}
.input-odds{
  background-color: var(--fut-primary)!important;
  color: #fff;
}
.error{
  border: 2px solid $danger !important;
}
.error-text{
  background: $danger;
  color: white;
  padding: 5px;
}
.nsx-error-text{
  font-size: 12px;
  color: #83373e;
  background: #f8d7da;
  padding: 0px 2px;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
}
</style>
